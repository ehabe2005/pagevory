// Generates src/assets/og.jpg (1200x630 social preview). Usage: node og.js
const path = require('path'); const fs = require('fs');
const puppeteer = require('puppeteer-core');
const A = (f) => 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, 'src/assets', f)).toString('base64');
const html = `<html><head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@600&display=block"><style>
body{margin:0;width:1200px;height:630px;background:#0b1a2c;color:#f5efe4;font-family:'Instrument Sans';overflow:hidden;position:relative}
.t{position:absolute;left:80px;top:150px;width:620px}.e{font-size:15px;letter-spacing:.26em;color:#c2a46a;text-transform:uppercase;margin-bottom:26px}
h1{font:400 92px/.95 'Instrument Serif';margin:0}h1 i{color:#e2cb98}.s{margin-top:30px;font-size:22px;color:#c9cfd6;font-weight:600}
.b{position:absolute;left:80px;top:62px;font-size:18px;letter-spacing:.34em}
img{position:absolute;width:300px;box-shadow:0 30px 60px #000a;border-radius:4px}
.a{right:70px;top:70px;transform:rotate(6deg)}.c{right:230px;top:150px;transform:rotate(-5deg)}
</style></head><body><div class="b">PAGEVORY</div><div class="t"><div class="e">Independent publishing studio · Italy</div><h1>Your expertise.<br><i>Beautifully</i> published.</h1><div class="s">Ebooks created with creators · 50/50 revenue share</div></div>
<img class="a" src="${A('cookbook-recipe.jpg')}"><img class="c" src="${A('cookbook-cover.jpg')}"></body></html>`;
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); await p.setViewport({ width: 1200, height: 630 });
  await p.setContent(html, { waitUntil: 'networkidle0' }); await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(__dirname, 'src/assets/og.jpg'), type: 'jpeg', quality: 85 });
  await b.close(); console.log('og.jpg done');
})();
