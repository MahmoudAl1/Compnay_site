import fs from 'fs';

let p = fs.readFileSync('components/Products.tsx', 'utf8');
if (!p.includes("import { Link }")) {
  p = p.replace(
    "import React, { useState, useEffect } from 'react';",
    "import React, { useState, useEffect } from 'react';\nimport { Link } from 'react-router-dom';"
  );
}

p = p.replace(
  /<div \n\s*key=\{product.id\} \n\s*onClick=\{\(\) => onProductSelect \? onProductSelect\(product\) : undefined\}\n\s*className="group cursor-pointer/g,
  "<Link \n              key={product.id} \n              to={`/product/${generateSlug(lang === 'ar' ? product.name : (product.name_en || product.name))}`}\n              className=\"group cursor-pointer block"
);

p = p.replace(
  /<\/div>\n\s*\{\/\* Overlay on hover \*\/\}/g,
  "</div>\n                {/* Overlay on hover */}"
);

// We need to properly find the closing tag of that div inside the map function and change it to Link.
// Because regex for nested tags is hard, let's use a simpler replace on the file text knowing its structure.

