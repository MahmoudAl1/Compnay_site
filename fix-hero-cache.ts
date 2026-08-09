import fs from 'fs';
let hero = fs.readFileSync('components/Hero.tsx', 'utf-8');

hero = hero.replace(
  /const \[heroImages, setHeroImages\] = useState<string\[\]>\(IMAGES\);/,
  `const [heroImages, setHeroImages] = useState<string[]>(() => {
    try {
      const cached = localStorage.getItem('heroImages_cache');
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return IMAGES;
  });`
);

hero = hero.replace(
  /setHeroImages\(snapshot\.docs\.map\(doc => doc\.data\(\)\.url\)\);/,
  `const newImages = snapshot.docs.map(doc => doc.data().url);
        setHeroImages(newImages);
        localStorage.setItem('heroImages_cache', JSON.stringify(newImages));`
);

hero = hero.replace(
  /setHeroImages\(data\.heroImages\);/,
  `setHeroImages(data.heroImages);
            localStorage.setItem('heroImages_cache', JSON.stringify(data.heroImages));`
);

fs.writeFileSync('components/Hero.tsx', hero, 'utf-8');
console.log('Added cache');
