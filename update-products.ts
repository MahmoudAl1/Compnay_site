import fs from 'fs';

let content = fs.readFileSync('components/Products.tsx', 'utf8');

if (!content.includes('generateSlug')) {
  content = content.replace(
    "import { Product, Language } from '../types';",
    "import { Product, Language } from '../types';\nimport { generateSlug } from '../slugify';"
  );
}

content = content.replace(
  "const fullActiveProduct = activeProduct ? (products.find(p => p.id == activeProduct.id) || activeProduct) : null;",
  "const fullActiveProduct = activeProduct ? (products.find(p => String(p.id) === String(activeProduct.id) || generateSlug(p.name) === activeProduct.id || generateSlug(p.name_en || '') === activeProduct.id) || activeProduct) : null;"
);

fs.writeFileSync('components/Products.tsx', content);
