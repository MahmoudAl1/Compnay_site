import fs from 'fs';
let hero = fs.readFileSync('components/Hero.tsx', 'utf-8');
hero = hero.replace(
  /<div className="relative w-full h-\[40vh\] md:h-\[60vh\] lg:h-\[75vh\] bg-slate-900 overflow-hidden">[\s\S]*?\{heroImages\.map\(\(_, idx\) => \(/,
  `<div className="relative w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        {heroImages.map((img, index) => (
          <div 
            key={index}
            className={\`\${index === 0 ? "relative" : "absolute inset-0"} transition-opacity duration-1000 ease-in-out w-full h-full \${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }\`}
          >
            <img 
              src={img} 
              alt={\`Slide \${index}\`} 
              className="w-full h-auto block"
            />
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none"></div>
          </div>
        ))}
        {/* Slide Indicators */}
        <div className="absolute bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {heroImages.map((_, idx) => (`
);
fs.writeFileSync('components/Hero.tsx', hero, 'utf-8');
console.log('Restored Hero.tsx');
