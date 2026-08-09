import fs from 'fs';
let hero = fs.readFileSync('components/Hero.tsx', 'utf-8');

hero = hero.replace(
  '<div className="relative w-full h-[40vh] md:h-[60vh] lg:h-[75vh] bg-slate-900 overflow-hidden">',
  '<div className="relative w-full bg-slate-900 overflow-hidden flex items-center justify-center min-h-[40vh]">'
);

hero = hero.replace(
  /className=\`absolute inset-0 transition-opacity duration-1000 ease-in-out w-full h-full \$\{/g,
  'className={`${index === 0 ? "relative" : "absolute inset-0"} transition-opacity duration-1000 ease-in-out w-full h-full ${'
);

hero = hero.replace(
  /className="w-full h-full object-fill"/g,
  'className="w-full h-auto block"'
);

fs.writeFileSync('components/Hero.tsx', hero, 'utf-8');
console.log('Reverted hero img');
