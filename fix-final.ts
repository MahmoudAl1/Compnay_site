import fs from 'fs';

// 1. Fix Hero.tsx
let hero = fs.readFileSync('components/Hero.tsx', 'utf-8');
hero = hero.replace(
  /<div className="relative w-full bg-slate-900 overflow-hidden flex items-center justify-center">/,
  '<div className="relative w-full h-[40vh] md:h-[60vh] lg:h-[75vh] bg-slate-900 overflow-hidden">'
);
hero = hero.replace(
  /className={\`\$\{index === 0 \? "relative" : "absolute inset-0"\} transition-opacity duration-1000 ease-in-out w-full h-full \$\{/,
  'className={`absolute inset-0 transition-opacity duration-1000 ease-in-out w-full h-full ${'
);
hero = hero.replace(
  /className="w-full h-auto block"/,
  'className="w-full h-full object-cover object-center"'
);
fs.writeFileSync('components/Hero.tsx', hero, 'utf-8');

// 2. Fix Products.tsx
let prod = fs.readFileSync('components/Products.tsx', 'utf-8');
prod = prod.replace(
  /className="w-full h-auto max-h-\[80vh\] object-contain"/,
  'className="w-full h-auto object-cover"'
);
fs.writeFileSync('components/Products.tsx', prod, 'utf-8');

console.log('Fixed final');
