import fs from 'fs';
let content = fs.readFileSync('components/Hero.tsx', 'utf-8');
content = content.replace(/className="w-full h-auto object-contain md:object-cover"/g, 'className="w-full h-auto block"');
fs.writeFileSync('components/Hero.tsx', content, 'utf-8');

let pContent = fs.readFileSync('components/Products.tsx', 'utf-8');
pContent = pContent.replace(/className="w-full h-64 md:h-auto md:max-h-\[500px\] object-cover"/g, 'className="w-full h-auto max-h-[80vh] object-contain"');
fs.writeFileSync('components/Products.tsx', pContent, 'utf-8');
console.log('Fixed');
