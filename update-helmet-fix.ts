import fs from 'fs';

let content = fs.readFileSync('components/Products.tsx', 'utf8');

content = content.replace(
  "<Helmet><title>{lang === 'ar' ? fullActiveProduct.name : (fullActiveProduct.name_en || fullActiveProduct.name)} | Elsergany Company</title></Helmet>\n      <div className=\"py-24 min-h-screen bg-slate-950 text-gray-100\">",
  `<>\n      <Helmet><title>{lang === 'ar' ? fullActiveProduct.name : (fullActiveProduct.name_en || fullActiveProduct.name)} | Elsergany Company</title></Helmet>\n      <div className="py-24 min-h-screen bg-slate-950 text-gray-100">`
);

// We must also find where this div closes and add </>. Since we are returning the view directly, we can just replace the final `</div>\n    );\n  }` with `</div>\n    </>\n    );\n  }`
// Let's just do a string replacement on the last closing div of that return statement.

content = content.replace(
  "      </div>\n    );\n  }\n\n  return (",
  "      </div>\n    </>\n    );\n  }\n\n  return ("
);

fs.writeFileSync('components/Products.tsx', content);

let blogContent = fs.readFileSync('components/Blog.tsx', 'utf8');

blogContent = blogContent.replace(
  "<Helmet><title>{lang === 'ar' ? fullActivePost.title : (fullActivePost.title_en || fullActivePost.title)} | Elsergany Company</title></Helmet>\n      <div className=\"py-24 min-h-screen bg-slate-950 text-gray-100\">",
  `<>\n      <Helmet><title>{lang === 'ar' ? fullActivePost.title : (fullActivePost.title_en || fullActivePost.title)} | Elsergany Company</title></Helmet>\n      <div className="py-24 min-h-screen bg-slate-950 text-gray-100">`
);

blogContent = blogContent.replace(
  "      </div>\n    );\n  }\n\n  return (",
  "      </div>\n    </>\n    );\n  }\n\n  return ("
);

fs.writeFileSync('components/Blog.tsx', blogContent);

