import fs from 'fs';
let hero = fs.readFileSync('components/Hero.tsx', 'utf-8');
hero = hero.replace(
  /<img \n\s*src=\{img\} \n\s*alt=\{\`Slide \$\{index\}\`\} \n\s*className="w-full h-full object-cover object-center"\n\s*\/>/,
  `<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img src={img} alt="" className="w-full h-full object-cover blur-xl opacity-30 scale-110" />
            </div>
            <img 
              src={img} 
              alt={\`Slide \${index}\`} 
              className="relative z-10 w-full h-full object-contain object-center"
            />`
);
fs.writeFileSync('components/Hero.tsx', hero, 'utf-8');
console.log('Added blur bg');
