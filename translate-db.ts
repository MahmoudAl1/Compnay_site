import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const aiClient = new GoogleGenAI({ 
  apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '',
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function translate(text: string) {
  if (!text) return text;
  
  let retries = 3;
  while (retries > 0) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Translate the following text to English. Return ONLY the translated text, without any additional comments or quotes:\n\n${text}`,
        config: { temperature: 0.1 }
      });
      return (response.text || '').trim();
    } catch (e: any) {
      if (e.status === 429) {
        console.log("Rate limit hit, waiting 30 seconds...");
        await sleep(30000);
        retries--;
      } else {
        console.error("Translation error:", e);
        return text;
      }
    }
  }
  return text;
}

async function run() {
  console.log("Starting translation migration...");
  
  // Translate Products
  const productsSnap = await getDocs(collection(db, 'products'));
  for (const productDoc of productsSnap.docs) {
    const data = productDoc.data();
    let updates: any = {};
    if (data.name && !data.name_en) { updates.name_en = await translate(data.name); await sleep(3000); }
    if (data.description && !data.description_en) { updates.description_en = await translate(data.description); await sleep(3000); }
    
    if (Object.keys(updates).length > 0) {
      console.log(`Updating product ${productDoc.id}...`);
      await updateDoc(doc(db, 'products', productDoc.id), updates);
    }
  }

  // Translate Posts
  const postsSnap = await getDocs(collection(db, 'posts'));
  for (const postDoc of postsSnap.docs) {
    const data = postDoc.data();
    let updates: any = {};
    if (data.title && !data.title_en) { updates.title_en = await translate(data.title); await sleep(3000); }
    if (data.category && !data.category_en) { updates.category_en = await translate(data.category); await sleep(3000); }
    if (data.excerpt && !data.excerpt_en) { updates.excerpt_en = await translate(data.excerpt); await sleep(3000); }
    if (data.content && !data.content_en) { updates.content_en = await translate(data.content); await sleep(3000); }
    
    if (Object.keys(updates).length > 0) {
      console.log(`Updating post ${postDoc.id}...`);
      await updateDoc(doc(db, 'posts', postDoc.id), updates);
    }
  }
  
  console.log("Done!");
  process.exit(0);
}

run();
