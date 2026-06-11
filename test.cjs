const https = require('https');
const check = (url) => {
  https.get(url, (res) => {
    console.log(url, res.statusCode);
  }).on('error', (e) => {
    console.log(url, e.message);
  });
};
check("https://upload.wikimedia.org/wikipedia/commons/9/92/%C5%A0koda_Auto_logo_%282016%29.svg");
check("https://upload.wikimedia.org/wikipedia/commons/f/ed/Jeep_logo.svg");
check("https://upload.wikimedia.org/wikipedia/commons/thumb/f/ed/Jeep_logo.svg/512px-Jeep_logo.svg.png");
check("https://upload.wikimedia.org/wikipedia/commons/4/42/Skoda_Auto_logo.svg");
check("https://upload.wikimedia.org/wikipedia/commons/a/a9/Skoda-logo.svg");


