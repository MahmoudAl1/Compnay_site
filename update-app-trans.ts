import fs from 'fs';

let content = fs.readFileSync('App.tsx', 'utf-8');

// EN replacements
content = content.replace(
  /feature3Title: 'Certified Warranty',\n\s*feature3Desc: 'Instant replacement in warranty'/,
  `feature3Title: 'Certified Warranty',\n      feature3Desc: 'Instant replacement in warranty',\n      feature4Title: 'All Models',\n      feature4Desc: 'Battery solutions to fit your needs'`
);
content = content.replace(
  /feature1Title: 'Free Testing',/,
  `feature1Title: 'Authorized Distribution',`
);
content = content.replace(
  /feature1Desc: 'Alternator & Battery check',/,
  `feature1Desc: 'Original products from reliable sources',`
);


// AR replacements
content = content.replace(
  /feature3Title: 'ضمان معتمد',\n\s*feature3Desc: 'استبدال فوري داخل الضمان'/,
  `feature3Title: 'ضمان معتمد',\n      feature3Desc: 'استبدال فوري داخل الضمان',\n      feature4Title: 'جميع الموديلات',\n      feature4Desc: 'حلول بطاريات تناسب مختلف احتياجاتك'`
);
content = content.replace(
  /feature1Title: 'كشف مجاني',/,
  `feature1Title: 'توزيع معتمد',`
);
content = content.replace(
  /feature1Desc: 'فحص الدينامو والبطارية',/,
  `feature1Desc: 'منتجات اصليه من مصادر موثوقه',`
);

fs.writeFileSync('App.tsx', content, 'utf-8');
console.log('Done App.tsx');
