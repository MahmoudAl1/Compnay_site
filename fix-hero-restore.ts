import fs from 'fs';
let hero = fs.readFileSync('components/Hero.tsx', 'utf-8');

hero = hero.replace(
  /<div className="relative w-full bg-slate-900 overflow-hidden flex items-center justify-center min-h-\[40vh\] md:min-h-\[60vh\]">[\s\S]*?\{heroImages\.map\(\(img, index\) => \(/,
  `<div className="relative w-full h-[40vh] md:h-[60vh] lg:h-[75vh] bg-slate-900 overflow-hidden">
        {isLoadingImages && heroImages.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse w-full h-full bg-slate-800"></div>
            <div className="absolute flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        {heroImages.map((img, index) => (`
);

hero = hero.replace(
  /className=\`\$\{index === 0 \? "relative" : "absolute inset-0"\} transition-opacity duration-1000 ease-in-out w-full h-full \$\{/,
  'className={`absolute inset-0 transition-opacity duration-1000 ease-in-out w-full h-full ${'
);

hero = hero.replace(
  /<img \s*src=\{img\} \s*alt=\{\`Slide \$\{index\}\`\} \s*className="w-full h-auto block"\s*fetchpriority=\{index === 0 \? "high" : "auto"\}\s*\/>/g,
  `<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img src={img} alt="" className="w-full h-full object-cover blur-xl opacity-30 scale-110" />
            </div>
            <img 
              src={img} 
              alt={\`Slide \${index}\`} 
              className="relative z-10 w-full h-full object-contain object-center"
              fetchpriority={index === 0 ? "high" : "auto"}
            />`
);


fs.writeFileSync('components/Hero.tsx', hero, 'utf-8');
console.log('Restored hero');
