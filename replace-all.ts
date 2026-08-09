import fs from 'fs';
import path from 'path';

function replaceInFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replacements
  content = content.replace(/الموتوسيكلات/g, 'الدراجات النارية');
  content = content.replace(/موتوسيكلات/g, 'دراجات نارية');
  content = content.replace(/للموتوسيكلات/g, 'للدراجات النارية');
  
  // Contact Phone
  content = content.replace(/\+20 120 400 2646/g, '01014137107');
  
  // "من نحن"
  content = content.replace(/بفضل الابتكار وعقود من الخبرة، /g, '');
  content = content.replace(/بفضل الابتكار وعقود من الخبرة/g, '');
  content = content.replace(/بفضل الابتكار وعقود من الخبره، /g, '');
  content = content.replace(/بفضل الابتكار وعقود من الخبره/g, '');
  
  // Title update
  content = content.replace(/خدمات السرجاني للبطاريات/g, 'السرجاني للبطاريات');
  content = content.replace(/خدمات السرجانى للبطاريات/g, 'السرجاني للبطاريات');
  
  // "افضل ماركات البطاريات"
  content = content.replace(/أفضل ماركات البطاريات/g, 'منتجاتنا');
  content = content.replace(/افضل ماركات البطاريات/g, 'منتجاتنا');

  fs.writeFileSync(filePath, content, 'utf-8');
}

['App.tsx', 'components/Contact.tsx', 'index.html', 'server.ts', 'api/chat.ts'].forEach(replaceInFile);
console.log('Done replacing!');
