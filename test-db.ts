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
    console.log(data.translations.ar);
  }
  process.exit(0);
}
run();
