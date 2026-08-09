import fs from 'fs';
let hero = fs.readFileSync('components/Hero.tsx', 'utf-8');

hero = hero.replace(
  'className={`absolute inset-0 transition-opacity duration-1000 ease-in-out w-full h-full ${',
  'className={`${index === 0 ? "relative" : "absolute inset-0"} transition-opacity duration-1000 ease-in-out w-full h-full ${'
);

fs.writeFileSync('components/Hero.tsx', hero, 'utf-8');
console.log('Fixed hero layout');
