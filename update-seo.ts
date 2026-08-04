import fs from 'fs';

let productsContent = fs.readFileSync('components/Products.tsx', 'utf8');

const productHelmetTarget = "<Helmet><title>{lang === 'ar' ? fullActiveProduct.name : (fullActiveProduct.name_en || fullActiveProduct.name)} | Elsergany Company</title></Helmet>";
const productHelmetReplacement = `<Helmet>
        <title>{lang === 'ar' ? fullActiveProduct.name : (fullActiveProduct.name_en || fullActiveProduct.name)} | Elsergany Company</title>
        <meta name="description" content={lang === 'ar' ? fullActiveProduct.description : (fullActiveProduct.description_en || fullActiveProduct.description)} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": lang === 'ar' ? fullActiveProduct.name : (fullActiveProduct.name_en || fullActiveProduct.name),
            "image": fullActiveProduct.image.startsWith('http') ? fullActiveProduct.image : \`https://elserganycompany.com\${fullActiveProduct.image}\`,
            "description": lang === 'ar' ? fullActiveProduct.description : (fullActiveProduct.description_en || fullActiveProduct.description),
            "brand": {
              "@type": "Brand",
              "name": "Elsergany"
            }
          })}
        </script>
      </Helmet>`;

productsContent = productsContent.replace(productHelmetTarget, productHelmetReplacement);
fs.writeFileSync('components/Products.tsx', productsContent);


let blogContent = fs.readFileSync('components/Blog.tsx', 'utf8');

const blogHelmetTarget = "<Helmet><title>{lang === 'ar' ? fullActivePost.title : (fullActivePost.title_en || fullActivePost.title)} | Elsergany Company</title></Helmet>";
const blogHelmetReplacement = `<Helmet>
        <title>{lang === 'ar' ? fullActivePost.title : (fullActivePost.title_en || fullActivePost.title)} | Elsergany Company</title>
        <meta name="description" content={lang === 'ar' ? fullActivePost.excerpt : (fullActivePost.excerpt_en || fullActivePost.excerpt)} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": lang === 'ar' ? fullActivePost.title : (fullActivePost.title_en || fullActivePost.title),
            "image": fullActivePost.image.startsWith('http') ? fullActivePost.image : \`https://elserganycompany.com\${fullActivePost.image}\`,
            "datePublished": fullActivePost.date,
            "description": lang === 'ar' ? fullActivePost.excerpt : (fullActivePost.excerpt_en || fullActivePost.excerpt),
            "author": {
              "@type": "Organization",
              "name": "Elsergany Company"
            }
          })}
        </script>
      </Helmet>`;

blogContent = blogContent.replace(blogHelmetTarget, blogHelmetReplacement);
fs.writeFileSync('components/Blog.tsx', blogContent);

