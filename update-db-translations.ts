import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import fs from 'fs';

const firebaseConfigPath = './firebase-applet-config.json';
const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function run() {
  const settingsRef = doc(db, 'settings', 'global');
  const snap = await getDoc(settingsRef);
  if (snap.exists()) {
    const data = snap.data();
    
    let needsUpdate = false;
    let updates: any = {};
    
    if (data.translations && data.translations.ar) {
      const ar = data.translations.ar;
      
      const newAr = JSON.parse(JSON.stringify(ar)); // deep copy
      
      let changed = false;
      
      const replaceAll = (str: string) => {
        if (!str) return str;
        let s = str.replace(/الموتوسيكلات/g, 'الدراجات النارية');
        s = s.replace(/موتوسيكلات/g, 'دراجات نارية');
        s = s.replace(/للموتوسيكلات/g, 'للدراجات النارية');
        s = s.replace(/بفضل الابتكار وعقود من الخبرة، /g, '');
        s = s.replace(/بفضل الابتكار وعقود من الخبرة/g, '');
        s = s.replace(/بفضل الابتكار وعقود من الخبره، /g, '');
        s = s.replace(/بفضل الابتكار وعقود من الخبره/g, '');
        s = s.replace(/خدمات السرجاني للبطاريات/g, 'السرجاني للبطاريات');
        s = s.replace(/خدمات السرجانى للبطاريات/g, 'السرجاني للبطاريات');
        s = s.replace(/أفضل ماركات البطاريات/g, 'منتجاتنا');
        s = s.replace(/افضل ماركات البطاريات/g, 'منتجاتنا');
        return s;
      };

      for (const key in newAr) {
        if (typeof newAr[key] === 'string') {
          newAr[key] = replaceAll(newAr[key]);
          if (newAr[key] !== ar[key]) changed = true;
        }
      }
      
      if (changed) {
        updates['translations.ar'] = newAr;
        needsUpdate = true;
      }
    }
    
    if (needsUpdate) {
      await updateDoc(settingsRef, updates);
      console.log('Database translations updated.');
    } else {
      console.log('No database updates needed.');
    }
  }
  process.exit(0);
}

run();
