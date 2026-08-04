import fs from 'fs';

let content = fs.readFileSync('components/Products.tsx', 'utf8');

if (!content.includes("import { Helmet }")) {
  content = content.replace(
    "import React, { useState, useEffect } from 'react';",
    "import React, { useState, useEffect } from 'react';\nimport { Helmet } from 'react-helmet-async';"
  );
}

content = content.replace(
  "<div className=\"py-24 min-h-screen bg-slate-950 text-gray-100\">",
  `<Helmet><title>{lang === 'ar' ? fullActiveProduct.name : (fullActiveProduct.name_en || fullActiveProduct.name)} | Elsergany Company</title></Helmet>\n      <div className="py-24 min-h-screen bg-slate-950 text-gray-100">`
);

fs.writeFileSync('components/Products.tsx', content);

let blogContent = fs.readFileSync('components/Blog.tsx', 'utf8');

if (!blogContent.includes("import { Helmet }")) {
  blogContent = blogContent.replace(
    "import React, { useRef, useState, useEffect } from 'react';",
    "import React, { useRef, useState, useEffect } from 'react';\nimport { Helmet } from 'react-helmet-async';"
  );
}

blogContent = blogContent.replace(
  "<div className=\"py-24 min-h-screen bg-slate-950 text-gray-100\">",
  `<Helmet><title>{lang === 'ar' ? fullActivePost.title : (fullActivePost.title_en || fullActivePost.title)} | Elsergany Company</title></Helmet>\n      <div className="py-24 min-h-screen bg-slate-950 text-gray-100">`
);

fs.writeFileSync('components/Blog.tsx', blogContent);

