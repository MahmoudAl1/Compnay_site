import fs from 'fs';
let content = fs.readFileSync('components/Hero.tsx', 'utf-8');

// We need to fix the wrapper to be flex items-center and relative height
content = content.replace(
  /<div className="relative w-full h-\[40vh\] sm:h-auto aspect-\[4\/3\] md:aspect-video bg-slate-900 overflow-hidden">/g,
  '<div className="relative w-full bg-slate-900 overflow-hidden flex items-center justify-center">'
);

// We need to fix the images map
content = content.replace(/\{heroImages\.map\(\(img, index\) => \([\s\S]*?\{Slide Indicators\}\*\//,
`{heroImages.map((img, index) => (
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
        {/* Slide Indicators */`);

fs.writeFileSync('components/Hero.tsx', content, 'utf-8');
console.log('Fixed hero 3');
