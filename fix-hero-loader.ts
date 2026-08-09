import fs from 'fs';
let hero = fs.readFileSync('components/Hero.tsx', 'utf-8');

hero = hero.replace(
  /<div className="relative w-full bg-slate-900 overflow-hidden flex items-center justify-center">/,
  `<div className="relative w-full bg-slate-900 overflow-hidden flex items-center justify-center min-h-[40vh] md:min-h-[60vh]">
        {isLoadingImages && heroImages.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse w-full h-full bg-slate-800"></div>
            <div className="absolute flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}`
);

fs.writeFileSync('components/Hero.tsx', hero, 'utf-8');
console.log('Fixed hero loader');
