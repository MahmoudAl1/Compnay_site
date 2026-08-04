import fs from 'fs';

let content = fs.readFileSync('components/Blog.tsx', 'utf8');

if (!content.includes('generateSlug')) {
  content = content.replace(
    "import { BlogPost, Language } from '../types';",
    "import { BlogPost, Language } from '../types';\nimport { generateSlug } from '../slugify';"
  );
}

content = content.replace(
  "const fullActivePost = activePost ? (posts.find(p => p.id == activePost.id) || activePost) : null;",
  "const fullActivePost = activePost ? (posts.find(p => String(p.id) === String(activePost.id) || generateSlug(p.title) === activePost.id || generateSlug(p.title_en || '') === activePost.id) || activePost) : null;"
);

fs.writeFileSync('components/Blog.tsx', content);
