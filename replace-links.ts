import fs from 'fs';

let productsContent = fs.readFileSync('components/Products.tsx', 'utf8');

// We need to import Link and generateSlug
if (!productsContent.includes("import { Link } from 'react-router-dom';")) {
  productsContent = productsContent.replace(
    "import React, { useState, useEffect } from 'react';",
    "import React, { useState, useEffect } from 'react';\nimport { Link } from 'react-router-dom';"
  );
}

// Replace <div key={product.id} onClick={...} className="..."> with <Link to={...} className="...">
productsContent = productsContent.replace(
  /onClick=\{\(\) => onProductSelect \? onProductSelect\(product\) : undefined\}/g,
  "to={`/product/${generateSlug(lang === 'ar' ? product.name : (product.name_en || product.name))}`}"
);

// We need to change the div to Link. Since it's <div \n key={product.id} \n to={...} ... > it will be <Link ...
productsContent = productsContent.replace(
  /<div\s+key=\{product\.id\}\s+to=\{`/g,
  "<Link \n              key={product.id} \n              to={`"
);

// And the closing </div> for that block needs to be </Link>
// This might be tricky with regex, let's write a script that replaces the specific outer div.
