// Pagevory website generator → docs/ (published by GitHub Pages, custom domain pagevory.com)
// Usage: node build.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'docs');
const SRC = path.join(ROOT, 'src', 'assets');
const URL = 'https://pagevory.com';
const EMAIL = 'contact@pagevory.com';

// ---------- copy + optimise assets ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
const sips = (args) => execSync(`sips ${args}`, { stdio: 'ignore' });
sips(`-Z 256 "${SRC}/logo.png" --out "${OUT}/assets/logo.png"`);
sips(`-Z 64 "${SRC}/logo.png" --out "${OUT}/assets/favicon.png"`);
sips(`-Z 180 "${SRC}/logo.png" --out "${OUT}/assets/apple-touch-icon.png"`);
sips(`-s format jpeg -s formatOptions 80 -Z 1100 "${SRC}/concept.png" --out "${OUT}/assets/concept.jpg"`);
for (const f of fs.readdirSync(SRC).filter((f) => /^(cookbook|cover)-/.test(f))) {
  sips(`-s format jpeg -s formatOptions 80 -Z 1100 "${SRC}/${f}" --out "${OUT}/assets/${f}"`);
}
if (fs.existsSync(path.join(SRC, 'og.jpg'))) fs.copyFileSync(path.join(SRC, 'og.jpg'), path.join(OUT, 'assets/og.jpg'));

// ---------- copy ----------
const T = {
  en: {
    lang: 'en', path: '/', other: 'es', otherPath: '/es/', otherLabel: 'Español',
    title: 'Pagevory — Ebooks created with creators, 50/50 revenue share',
    desc: 'Pagevory is an independent publishing studio in Italy. We turn a creator’s expertise into a beautifully designed ebook — no upfront fee, net revenue shared 50/50.',
    nav: ['The process', 'Work', 'Partnership', 'FAQ'], cta: 'Let’s talk',
    eyebrow: 'Independent publishing studio · Italy',
    h1: ['Your expertise.', 'Beautifully', 'published.'],
    lead: 'You’ve built a real connection with your audience. We turn what you know into an ebook they’ll keep coming back to — written, designed and ready to sell.',
    ctaMain: 'Start a partnership', ctaSub: 'How it works',
    fine: 'No upfront creation fee. A shared venture, from the first page.',
    strip: ['Your voice at the centre', 'Editorial writing & design', 'Net revenue shared 50/50', 'Ebooks in any language'],
    introEy: 'More than another download', introH: ['Something your audience', 'can come back to.'],
    introP: ['The questions in your comments. The advice you give again and again. The experience that makes your perspective yours.', 'We shape it into a focused, useful ebook — from the first outline to the final layout — so it feels like a natural extension of you and your work.'],
    procEy: 'The process', procH: ['You bring the perspective.', 'We bring it to the page.'],
    steps: [
      ['Find the right idea', 'We talk about your audience, the questions they ask and what you know best. Together we agree on the topic, the outline and the timeline — in writing, before anything is produced.'],
      ['Create it together', 'You share your content: recipes, methods, photos, experience. We handle structure, editing and editorial design. You review every proof and approve the final PDF.'],
      ['Give it a home', 'We prepare the product page and sell it on Whop. You introduce it to your community, and your share of every sale is credited to your own Whop balance.'],
    ],
    workEy: 'Design concepts', workH: ['Any topic.', 'Any language.'],
    workTag: 'Illustrative concepts · not client work',
    workP: 'A Spanish cookbook, an English houseplant guide, an Italian slow-travel guide: three subjects, three languages, three visual identities. Each ebook is designed from scratch around the creator’s brand, voice and audience — never a one-size-fits-all template.',
    workNote: 'Concepts with demo content and illustrative stock photography (Unsplash). Final books use the creator’s own approved texts and photos.',
    work2H: 'Not just food.', work2P: 'Guides, planners and workbooks for wellbeing, family life, creative skills or money — wherever your audience keeps asking you the same questions.',
    partEy: 'Shared work · Shared upside', partH: ['A partnership,', 'not a production invoice.'],
    partP: 'We invest our time in writing, editing and design. You bring your expertise, your feedback and your audience. There is no upfront creation fee.',
    splitNote: 'Net revenue shared equally.',
    terms: 'Net revenue = what customers actually paid, minus sales taxes (VAT), platform and payment fees, and refunds. No hidden deductions: our hours, tools or advertising are never charged to you. Your share is credited automatically to your own Whop balance; withdrawals follow Whop’s verification and payout rules. Scope, rights and approvals are agreed in writing before work starts.',
    faqEy: 'Before the first page', faqH: 'Questions you might have',
    faq: [
      ['Do I need a finished idea?', 'No. A topic you know well and a sense of what your audience needs are enough. We’ll work out together whether there is a useful ebook to create.'],
      ['What do I need to contribute?', 'Your expertise and content (for example recipes, methods or photos you own), feedback on the drafts and final approval. You also introduce the ebook to your audience, in whatever way suits you — there’s no minimum number of posts.'],
      ['Is there really no upfront fee?', 'Yes. Instead of charging for writing and design, we share the net revenue 50/50. No other costs can be added without your written agreement.'],
      ['Do I keep the rights to my content?', 'Yes. You keep ownership of your texts, photos, name and brand. You only grant a limited licence to use them in this ebook and its approved promotion.'],
      ['Will I approve everything before it goes on sale?', 'Always. Nothing is published, priced or changed without your written approval of the PDF, the price and the product page.'],
      ['Do you use AI tools?', 'We may use AI tools to support layout and editing, always with human review, and only with your written permission for any unpublished content. We never imitate your voice or image.'],
      ['How do payments work?', 'We sell through Whop and set up its revenue-share feature, so your share of each sale goes straight to your Whop balance. You also get a monthly summary of sales and deductions.'],
      ['Do you work internationally?', 'Yes. We are based in Italy and create ebooks in any language, with creators all over the world — as long as Whop supports payouts in your country.'],
    ],
    contactEy: 'Let’s start a conversation', contactH: ['You have something to share.', 'Let’s make room for it.'],
    contactP: 'Tell us what you create, who you help and the idea you’ve been thinking about. We’ll reply within a few days to explore whether an ebook makes sense together.',
    contactBtn: 'Email us', mailSubject: 'Partnership — ebook idea',
    mailBody: 'Hi Pagevory,\n\nMy name is … and I create content about …\nMy audience: …\nThe ebook idea I have in mind: …\n\nThanks!',
    footer: 'Independent creative publishing · Italy · Ebooks in any language',
    concept: 'Concept',
  }
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const mailto = (t) => `mailto:${EMAIL}?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(t.mailBody)}`;

const CSS = fs.readFileSync(path.join(ROOT, 'src', 'style.css'), 'utf8');

const page = (t) => {
  const pre = t.lang === 'en' ? '' : '../';
  const ld = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Organization', '@id': URL + '/#org', name: 'Pagevory', url: URL + '/', logo: URL + '/assets/logo.png', email: EMAIL, description: t.desc, areaServed: 'Worldwide', address: { '@type': 'PostalAddress', addressCountry: 'IT' } },
      { '@type': 'WebSite', '@id': URL + '/#site', url: URL + '/', name: 'Pagevory', inLanguage: 'en', publisher: { '@id': URL + '/#org' } },
      { '@type': 'FAQPage', inLanguage: t.lang, mainEntity: t.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  };
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.desc)}">
<link rel="canonical" href="${URL}${t.path}">
<meta name="theme-color" content="#0a182b">
<link rel="icon" type="image/png" href="${pre}assets/favicon.png">
<link rel="apple-touch-icon" href="${pre}assets/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Pagevory">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.desc)}">
<meta property="og:url" content="${URL}${t.path}">
<meta property="og:image" content="${URL}/assets/og.jpg">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:locale" content="${t.lang === 'en' ? 'en_GB' : 'es_ES'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600&display=swap">
<style>${CSS}</style>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="skip" href="#main">${t.lang === 'en' ? 'Skip to content' : 'Ir al contenido'}</a>
<header class="nav">
  <a class="brand" href="${t.path}" aria-label="Pagevory"><img src="${pre}assets/logo.png" alt="" width="34" height="34">PAGEVORY</a>
  <nav class="links" aria-label="Main">
    <a href="#process">${t.nav[0]}</a><a href="#work">${t.nav[1]}</a><a href="#partnership">${t.nav[2]}</a><a href="#faq">${t.nav[3]}</a>
    <a class="btn sm" href="#contact">${t.cta}</a>
  </nav>
</header>
<main id="main">
  <section class="hero wrap">
    <div class="hero-copy">
      <p class="eyebrow">${t.eyebrow}</p>
      <h1>${t.h1[0]}<br><em>${t.h1[1]}</em><br>${t.h1[2]}</h1>
      <p class="lead">${t.lead}</p>
      <div class="actions"><a class="btn" href="#contact">${t.ctaMain} ↗</a><a class="btn ghost" href="#process">${t.ctaSub} ↓</a></div>
      <p class="fine">${t.fine}</p>
    </div>
    <div class="hero-art" aria-hidden="true">
      <img class="pg back" src="${pre}assets/cookbook-recipe.jpg" alt="" width="550" height="778">
      <img class="pg front" src="${pre}assets/cookbook-cover.jpg" alt="" width="550" height="778">
      <span class="badge">${t.concept}</span>
    </div>
  </section>
  <div class="strip">${t.strip.map((s) => `<span>${s}</span>`).join('<i>✦</i>')}</div>

  <section class="section wrap intro reveal">
    <div><p class="eyebrow">${t.introEy}</p><h2>${t.introH[0]}<br><em>${t.introH[1]}</em></h2></div>
    <div>${t.introP.map((p) => `<p>${p}</p>`).join('')}</div>
  </section>

  <section class="section light" id="process">
    <div class="wrap reveal">
      <p class="eyebrow">${t.procEy}</p>
      <h2>${t.procH[0]}<br><em>${t.procH[1]}</em></h2>
      <ol class="steps">${t.steps.map(([h, p], i) => `<li><span class="num">0${i + 1}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
    </div>
  </section>

  <section class="section" id="work">
    <div class="wrap work reveal">
      <div class="gallery">
        <figure class="g1"><img src="${pre}assets/cover-plants.jpg" alt="Concept cover in English: The Gentle Jungle, a beginner’s guide to houseplants" loading="lazy" width="550" height="778"></figure>
        <figure class="g2"><img src="${pre}assets/cookbook-cover.jpg" alt="Concept cover in Spanish: Cocina sin prisa, a quick and easy cookbook" loading="lazy" width="550" height="778"></figure>
        <figure class="g3"><img src="${pre}assets/cover-liguria.jpg" alt="Concept cover in Italian: Cinque Terre a passo lento, a slow-travel guide" loading="lazy" width="550" height="778"></figure>
      </div>
      <div class="work-copy">
        <p class="eyebrow">${t.workEy}</p>
        <h2>${t.workH[0]}<br><em>${t.workH[1]}</em></h2>
        <span class="tag">${t.workTag}</span>
        <p>${t.workP}</p>
        <p class="fine">${t.workNote}</p>
        <div class="also"><img src="${pre}assets/concept.jpg" alt="${t.lang === 'en' ? 'Concept: The Mindful Morning guide' : 'Concepto: guía The Mindful Morning'}" loading="lazy" width="120" height="150"><div><h3>${t.work2H}</h3><p>${t.work2P}</p></div></div>
      </div>
    </div>
  </section>

  <section class="section light" id="partnership">
    <div class="wrap partnership reveal">
      <div><p class="eyebrow">${t.partEy}</p><h2>${t.partH[0]}<br><em>${t.partH[1]}</em></h2><p>${t.partP}</p></div>
      <div><div class="split" aria-label="50/50">50<span>/</span>50</div><p class="split-note">${t.splitNote}</p><p class="terms">${t.terms}</p></div>
    </div>
  </section>

  <section class="section wrap faq reveal" id="faq">
    <p class="eyebrow center">${t.faqEy}</p>
    <h2 class="center">${t.faqH}</h2>
    ${t.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('\n    ')}
  </section>

  <section class="contact" id="contact">
    <p class="eyebrow">${t.contactEy}</p>
    <h2>${t.contactH[0]}<br><em>${t.contactH[1]}</em></h2>
    <p>${t.contactP}</p>
    <a class="btn" href="${esc(mailto(t))}">${t.contactBtn} ↗</a>
    <p class="mail"><a href="mailto:${EMAIL}">${EMAIL}</a></p>
  </section>
</main>
<footer class="foot">
  <a class="brand" href="${t.path}">PAGEVORY</a>
  <span>${t.footer}</span>
  <span><a href="mailto:${EMAIL}">${EMAIL}</a> · © <span id="y">2026</span> Pagevory</span>
</footer>
<script>
document.getElementById('y').textContent=new Date().getFullYear();
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>io.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
</script>
</body>
</html>
`;
};

fs.writeFileSync(path.join(OUT, 'index.html'), page(T.en));

// 404
fs.writeFileSync(path.join(OUT, '404.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page not found — Pagevory</title><meta name="robots" content="noindex"><link rel="icon" href="/assets/favicon.png"><style>${CSS}</style></head><body><main class="contact" style="min-height:100vh;display:flex;flex-direction:column;justify-content:center"><p class="eyebrow">404</p><h2>This page isn’t written yet.<br><em>Let’s go back to the start.</em></h2><p><a class="btn" href="/">Pagevory ↗</a></p></main></body></html>`);

// SEO files
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${URL}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${URL}/</loc><lastmod>${today}</lastmod></url>
</urlset>
`);
fs.writeFileSync(path.join(OUT, 'CNAME'), 'pagevory.com\n');
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
console.log('Built →', OUT);
