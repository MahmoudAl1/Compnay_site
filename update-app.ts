import fs from 'fs';

let content = fs.readFileSync('App.tsx', 'utf8');

// Import slugify
content = content.replace(
  "import { Helmet } from 'react-helmet-async';",
  "import { Helmet } from 'react-helmet-async';\nimport { generateSlug } from './slugify';"
);

// Update ProductWrapper
content = content.replace(
  "const ProductWrapper = ({ lang, translations, onInquire }: any) => {",
  "const ProductWrapper = ({ lang, translations, onInquire }: any) => {"
);
content = content.replace(
  "const { id } = useParams();",
  "const { slug } = useParams();"
);
content = content.replace(
  "const activeProduct = { id: Number(id) } as any;",
  "const activeProduct = { id: slug } as any;"
);
content = content.replace(
  "<title>{`Elsergany Company | Product ${id}`}</title>",
  "<title>{`Elsergany Company | Product`}</title>"
);

// Update BlogWrapper
content = content.replace(
  "const activePost = { id } as any;",
  "const activePost = { id: slug } as any;"
);
content = content.replace(
  "<title>{`Elsergany Company | Blog Post ${id}`}</title>",
  "<title>{`Elsergany Company | Blog Post`}</title>"
);

// Update Route paths
content = content.replace(
  "<Route path=\"/product/:id\"",
  "<Route path=\"/product/:slug\""
);
content = content.replace(
  "<Route path=\"/blog/:id\"",
  "<Route path=\"/blog/:slug\""
);

// Update onProductSelect
content = content.replace(
  /onProductSelect=\{\(p\) => navigate\(`\/product\/\$\{p\.id\}`\)\}/g,
  "onProductSelect={(p) => navigate(`/product/${generateSlug(lang === 'ar' ? p.name : (p.name_en || p.name))}`)}"
);

// Update onReadMore
content = content.replace(
  /onReadMore=\{\(p\) => navigate\(`\/blog\/\$\{p\.id\}`\)\}/g,
  "onReadMore={(p) => navigate(`/blog/${generateSlug(lang === 'ar' ? p.title : (p.title_en || p.title))}`)}"
);

fs.writeFileSync('App.tsx', content);
