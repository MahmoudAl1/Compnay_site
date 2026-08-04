import fs from 'fs';
let appTsx = fs.readFileSync('App.tsx', 'utf8');
appTsx = appTsx.replace(
  '<meta name="description" content="Elsergany Company - The leading provider of car and motorcycle batteries in Egypt. Authorized dealer for top global brands." />',
  '<meta name="description" content="Elsergany Company - A leading company in the field of car and motorcycle batteries in Egypt. Authorized dealer for top global brands. شركة رائدة في عالم بطاريات السيارات والموتوسيكلات في مصر." />'
);
fs.writeFileSync('App.tsx', appTsx);
