// Generates concept cover images (A4 ratio, 1100x1556) into src/assets/. Usage: node covers.js
// Photos: Unsplash free licence — plants 1598764557991-b9f211b73b81, Liguria 1534445867742-43195f401b6c
const fs = require('fs'); const path = require('path');
const puppeteer = require('puppeteer-core');
const A = (f) => 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, 'src/assets', f)).toString('base64');
const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400&display=block">';
const base = 'html,body{margin:0}body{width:1100px;height:1556px;overflow:hidden;position:relative;-webkit-font-smoothing:antialiased}';

const plants = `<html><head>${FONTS}<style>${base}
body{background:#E9E6DE;color:#1F3A2B;font-family:'DM Sans'}
.photo::before{content:'';position:absolute;left:0;right:0;top:0;height:45%;background:linear-gradient(180deg,#E9E6DE 0%,rgba(233,230,222,0) 100%)}
.photo{position:absolute;left:0;right:0;bottom:0;height:62%;background:url(${A('photo-plants.jpg')}) center 40%/cover}
.top{position:absolute;left:90px;right:90px;top:84px}
.k{display:flex;justify-content:space-between;font:700 17px 'DM Sans';letter-spacing:.32em;text-transform:uppercase;color:#4E7A5A;border-bottom:2px solid #1F3A2B;padding-bottom:22px}
h1{font:400 150px/.86 'Fraunces';font-variation-settings:"SOFT" 100,"WONK" 1;letter-spacing:-.035em;margin:56px 0 0}
h1 i{color:#4E7A5A;font-weight:300}
.sub{font:400 30px/1.35 'Fraunces';font-style:italic;margin-top:30px;max-width:640px;color:#2F4F3B}
.seal{position:absolute;right:90px;top:520px;width:190px;height:190px;border-radius:50%;background:#D9E86A;display:flex;align-items:center;justify-content:center;text-align:center;font:700 18px/1.25 'DM Sans';letter-spacing:.14em;text-transform:uppercase;transform:rotate(-10deg);z-index:2}
.seal b{display:block;font:400 64px/1 'Fraunces';letter-spacing:0;text-transform:none}
.foot{position:absolute;left:90px;right:90px;bottom:64px;display:flex;justify-content:space-between;font:700 16px 'DM Sans';letter-spacing:.3em;text-transform:uppercase;color:#1F3A2B;z-index:2}
.foot span:first-child{background:#E9E6DE;padding:6px 10px;margin:-6px -10px}.foot span:last-child{color:#fff}
</style></head><body>
<div class="top"><div class="k"><span>The Plant Shelf</span><span>Vol. 01</span></div>
<h1>The gentle<br><i>jungle</i></h1>
<p class="sub">A calm beginner’s guide to keeping houseplants happy — light, water, soil and a little patience.</p></div>
<div class="seal"><span><b>40</b>plant<br>profiles</span></div>
<div class="photo"></div>
<div class="foot"><span>Concept · English edition</span><span>Pagevory</span></div>
</body></html>`;

const liguria = `<html><head>${FONTS}<style>${base}
body{background:#123;font-family:'DM Sans'}
.photo{position:absolute;inset:0;background:url(${A('photo-liguria.jpg')}) 55% 50%/cover}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,22,34,.72) 0%,rgba(8,22,34,.25) 34%,rgba(8,22,34,0) 55%,rgba(8,22,34,.55) 100%)}
.top{position:absolute;left:84px;right:84px;top:80px;color:#fff;text-align:center}
.k{font:700 17px 'DM Sans';letter-spacing:.42em;text-transform:uppercase;color:#F7D774}
h1{font:400 128px/.9 'Bodoni Moda';letter-spacing:-.02em;margin:34px 0 0}
h1 i{font-style:italic;color:#F7D774}
.rule{width:90px;height:3px;background:#F7D774;margin:34px auto}
.sub{font:400 30px/1.35 'Bodoni Moda';font-style:italic;max-width:760px;margin:0 auto;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.55)}
.stamp{position:absolute;left:84px;bottom:150px;border:3px solid #fff;color:#fff;padding:20px 26px;font:700 18px/1.5 'DM Sans';letter-spacing:.22em;text-transform:uppercase;transform:rotate(-4deg)}
.stamp b{display:block;font:400 46px/1 'Bodoni Moda';font-style:italic;letter-spacing:0;text-transform:none;color:#F7D774}
.foot{position:absolute;left:84px;right:84px;bottom:60px;display:flex;justify-content:space-between;font:700 16px 'DM Sans';letter-spacing:.3em;text-transform:uppercase;color:#fff}
</style></head><body>
<div class="photo"></div><div class="shade"></div>
<div class="top"><div class="k">Guida di viaggio · Liguria</div>
<h1>Cinque Terre<br><i>a passo lento</i></h1><div class="rule"></div>
<p class="sub">Sentieri, borghi e piccole trattorie: tre giorni per viverle senza fretta.</p></div>
<div class="stamp"><b>3 giorni</b>itinerari &amp; mappe</div>
<div class="foot"><span>Concept · Edizione italiana</span><span>Pagevory</span></div>
</body></html>`;

(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  for (const [name, html] of [['cover-plants', plants], ['cover-liguria', liguria]]) {
    const p = await b.newPage(); await p.setViewport({ width: 1100, height: 1556 });
    await p.setContent(html, { waitUntil: 'networkidle0', timeout: 120000 }); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, 'src/assets', name + '.jpg'), type: 'jpeg', quality: 86 });
  }
  await b.close(); console.log('covers done');
})();
