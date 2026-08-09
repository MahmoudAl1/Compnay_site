import fs from 'fs';

let content = fs.readFileSync('components/Hero.tsx', 'utf-8');

// replace the grid
content = content.replace(/sm:grid-cols-3/g, 'sm:grid-cols-2 lg:grid-cols-4');

// add the 4th feature
content = content.replace(
  /<Truck size=\{24\} \/>\n\s*<\/div>\n\s*<div>\n\s*<h4 className="font-bold">\{t\.hero\.feature3Title\}<\/h4>\n\s*<p className="text-sm text-gray-400">\{t\.hero\.feature3Desc\}<\/p>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>/,
  `<Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold">{t.hero.feature3Title}</h4>
                <p className="text-sm text-gray-400">{t.hero.feature3Desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white group hover:bg-slate-800/50 p-4 rounded-xl transition">
              <div className="bg-slate-800 p-3 rounded-full text-blue-500 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold">{t.hero.feature4Title || (lang === 'ar' ? 'جميع الموديلات' : 'All Models')}</h4>
                <p className="text-sm text-gray-400">{t.hero.feature4Desc || (lang === 'ar' ? 'حلول بطاريات تناسب مختلف احتياجاتك' : 'Battery solutions to fit your needs')}</p>
              </div>
            </div>
          </div>`
);

fs.writeFileSync('components/Hero.tsx', content, 'utf-8');
console.log('Done update Hero.tsx');
