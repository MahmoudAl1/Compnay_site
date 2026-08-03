import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function run() {
  const postsSnap = await getDocs(collection(db, 'posts'));
  postsSnap.docs.forEach(doc => {
    console.log(doc.id, "Title EN:", doc.data().title_en, "Excerpt EN:", doc.data().excerpt_en);
  });
  
  const prodsSnap = await getDocs(collection(db, 'products'));
  prodsSnap.docs.forEach(doc => {
    console.log(doc.id, "Name EN:", doc.data().name_en, "Desc EN:", doc.data().description_en);
  });
  process.exit(0);
}
run();
