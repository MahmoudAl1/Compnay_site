import fs from 'fs';

let content = fs.readFileSync('components/Hero.tsx', 'utf-8');
let carCount = 0;
content = content.replace(/<Car size=\{24\} \/>/g, () => {
  carCount++;
  if (carCount === 1) return '<ShieldCheck size={24} />';
  return '<Car size={24} />';
});

fs.writeFileSync('components/Hero.tsx', content, 'utf-8');
console.log('Fixed icons');
