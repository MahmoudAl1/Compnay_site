import fs from 'fs';
let hero = fs.readFileSync('components/Hero.tsx', 'utf-8');

// replace fetchPriority
hero = hero.replace(/fetchPriority/g, 'fetchpriority');

// restore the original fixed height container
hero = hero.replace(
  /<div className="relative w-full bg-slate-900 overflow-hidden flex items-center justify-center min-h-\[40vh\] md:min-h-\[60vh\]">[\s\S]*?\{heroImages\.map\(\(img, index\) => \(/,
  `<div className="relative w-full h-[40vh] md:h-[60vh] lg:h-[75vh] bg-slate-900 overflow-hidden">
        {heroImages.map((img, index) => (`
);

// fix the inner divs
hero = hero.replace(
  /className={\`\$\{index === 0 \? "relative" : "absolute inset-0"\} transition-opacity duration-1000 ease-in-out w-full h-full \$\{/,
  'className={`absolute inset-0 transition-opacity duration-1000 ease-in-out w-full h-full ${'
);

hero = hero.replace(
  /className="w-full h-auto block"/g,
  'className="w-full h-full object-cover object-center"'
);

fs.writeFileSync('components/Hero.tsx', hero, 'utf-8');
console.log('Fixed hero');
