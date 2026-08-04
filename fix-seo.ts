import fs from 'fs';

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace('<meta property="og:title" content="Elsergany Company | السرجاني للبطاريات" />', '<meta property="og:title" content="Elsergany Company" />');
indexHtml = indexHtml.replace('<meta property="og:description" content="السرجاني للبطاريات - الاسم الأول في عالم بطاريات السيارات والموتوسيكلات في مصر. وكلاء كبرى الشركات العالمية." />', '<meta property="og:description" content="شركة رائدة في عالم بطاريات السيارات والموتوسيكلات في مصر. وكلاء كبرى الشركات العالمية." />');
// also standard meta description
indexHtml = indexHtml.replace('<meta name="description" content="Elsergany Company - The leading provider of car and motorcycle batteries in Egypt. Authorized dealer for top global brands.">', '<meta name="description" content="Elsergany Company - A leading provider of car and motorcycle batteries in Egypt. Authorized dealer for top global brands.">');
indexHtml = indexHtml.replace('<title>Elsergany Company</title>', '<title>Elsergany Company</title>'); // already correct

fs.writeFileSync('index.html', indexHtml);

let appTsx = fs.readFileSync('App.tsx', 'utf8');
appTsx = appTsx.replace(
  "يقع المقر الرئيسي في المنزلة (الدقهلية)، مع فرع ثانٍ في دمياط الجديدة.",
  "نحن شركة رائدة في مجال بطاريات السيارات والموتوسيكلات في مصر، ونقدم أفضل الخدمات لعملائنا."
);
appTsx = appTsx.replace(
  "Our headquarters is located in El Manzala (Dakahlia), with a second branch in New Damietta.",
  "We are a leading company in the field of car and motorcycle batteries in Egypt, providing the best services to our customers."
);

// replace all Arabic | السرجاني with | Elsergany Company
appTsx = appTsx.replace(/ \| السرجاني/g, ' | Elsergany Company');

fs.writeFileSync('App.tsx', appTsx);

// Update Blog.tsx and Products.tsx for title
let blogTsx = fs.readFileSync('components/Blog.tsx', 'utf8');
blogTsx = blogTsx.replace(/ \| Elsergany Company/g, ' | Elsergany Company'); // just ensuring it's english
fs.writeFileSync('components/Blog.tsx', blogTsx);

let productsTsx = fs.readFileSync('components/Products.tsx', 'utf8');
productsTsx = productsTsx.replace(/ \| Elsergany Company/g, ' | Elsergany Company');
fs.writeFileSync('components/Products.tsx', productsTsx);

