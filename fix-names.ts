import fs from 'fs';
import path from 'path';

function replaceInFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace "Elsergany Company" with "El Sergany Company"
    content = content.replace(/Elsergany Company/g, 'El Sergany Company');
    content = content.replace(/ElserganyCompany/g, 'ElSerganyCompany'); // just in case
    
    fs.writeFileSync(filePath, content);
  }
}

['index.html', 'App.tsx', 'components/Blog.tsx', 'components/Products.tsx'].forEach(replaceInFile);
