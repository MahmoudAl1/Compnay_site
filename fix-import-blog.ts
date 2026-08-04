import fs from 'fs';
let content = fs.readFileSync('components/Blog.tsx', 'utf8');
if (!content.includes("import { Link } from 'react-router-dom';")) {
  content = content.replace(
    "import { Helmet } from 'react-helmet-async';",
    "import { Helmet } from 'react-helmet-async';\nimport { Link } from 'react-router-dom';"
  );
  fs.writeFileSync('components/Blog.tsx', content);
}
