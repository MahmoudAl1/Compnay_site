import fs from 'fs';
let content = fs.readFileSync('components/Products.tsx', 'utf8');
if (!content.includes("import { Link } from 'react-router-dom';")) {
  content = content.replace(
    "import React, { useState, useEffect } from 'react';",
    "import React, { useState, useEffect } from 'react';\nimport { Link } from 'react-router-dom';"
  );
  fs.writeFileSync('components/Products.tsx', content);
}
