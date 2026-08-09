import fs from 'fs';

let hero = fs.readFileSync('components/Hero.tsx', 'utf-8');
hero = hero.replace(
  /h-\[40vh\] md:h-\[60vh\] lg:h-\[75vh\] min-h-\[300px\]/,
  'h-[40vh] sm:h-auto sm:aspect-video lg:aspect-[21/9]'
);
fs.writeFileSync('components/Hero.tsx', hero, 'utf-8');

let products = fs.readFileSync('components/Products.tsx', 'utf-8');
products = products.replace(
  /className="w-full h-64 md:h-\[400px\] object-contain p-8"/,
  'className="w-full h-64 md:h-[400px] object-cover"'
);
fs.writeFileSync('components/Products.tsx', products, 'utf-8');
console.log('Fixed styles');
