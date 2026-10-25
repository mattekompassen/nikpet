// Matematiska begrepp (skiss). Läser begrepp, exempel och meningar från trana-ak7/8/9.js.
// Fel svar sparas i localStorage ('mk-svara-ord') och kommer tillbaka under "Mina svåra ord".
(function () {
  const el = document.getElementById('bg');
  if (!el) return;
  const r = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const val = a => a[r(0, a.length - 1)];
  const sv = x => String(Math.round(x * 1e6) / 1e6).replace('.', ',');
  const tus = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const sgn = n => n < 0 ? '(' + sv(n) + ')' : sv(n);
  const blanda = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = r(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));

  // Områden (kursplanens centrala innehåll). Procent hör till Samband och förändring.
  const OMR = [
    // Nikolas pastellfärger (2026-10-25): (område, namn, pastell, mörk nyans för text, symbol)
    ['tal', 'Taluppfattning', '#A7CBEA', '#2C5A85', '½'],
    ['alg', 'Algebra', '#B7E3C6', '#2E6B45', 'x'],
    ['geo', 'Geometri', '#F7B1B1', '#9A3A3A', '△'],
    ['sam', 'Samband och förändring', '#FCEEC0', '#7A5A12', '%'],
    ['sta', 'Sannolikhet och statistik', '#C7B8F9', '#4B3A99', '⚄']];
  const OM = Object.fromEntries(OMR.map(o => [o[0], o]));
  const omrade = n => (n = n.toLowerCase(), /algebra/.test(n) ? 'alg' : /geometri/.test(n) ? 'geo' : /samband|procent/.test(n) ? 'sam' : /statistik|sannolik/.test(n) ? 'sta' : 'tal');

  // Egna bilder till begrepp som saknar exempel i övningsdatan (2026-10-25)
  const K = '#2E3A46', Y = '#E9B949', sv_ = (w, h, i) => `<svg class="fig" viewBox="0 0 ${w} ${h}" width="${w}" aria-hidden="true" fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${i}</svg>`;
  const b_ = (t, n) => `<span class="br"><span>${t}</span><span>${n}</span></span>`;
  const txt = (x, y, t, s = 16) => `<text x="${x}" y="${y}" font-size="${s}" font-weight="700" fill="${K}" stroke="none" font-family="Inter,sans-serif">${t}</text>`;
  const EGNA = {
    'siffra': '<mark>4</mark> <mark>7</mark> <mark>2</mark>',
    'positionssystem': '3<mark>5</mark>2<br><small>5 tiotal = 50</small>',
    'naturliga tal': '<mark>0, 1, 2, 3 …</mark>',
    'heltal': '… −2, −1, <mark>0</mark>, 1, 2 …',
    'rationellt tal': '0,5 = <mark>' + b_('1', '2') + '</mark>',
    'överslagsräkning': '49 · 21 ≈ <mark>50 · 20</mark>',
    'negativ exponent': '10<sup><mark>−2</mark></sup> = 0,01',
    'prefix': '<mark>kilo</mark>meter',
    'nano': '1 <mark>n</mark>m = 10<sup>−9</sup> m',
    'milli': '1 <mark>m</mark>m = 0,001 m',
    'led': '<mark>2x + 3</mark> = <mark>11</mark>',
    'obekant': '2<mark>x</mark> + 3 = 11',
    'balansmetoden': 'x + 3 <mark>− 3</mark> = 8 <mark>− 3</mark>',
    'potens': '<mark>x<sup>3</sup></mark>',
    'additionsmetoden': '<small>x + y = 5<br>x − y = 1</small><br><mark>2x = 6</mark>',
    'grafisk lösning': sv_(170, 120, `<path d="M15 105H160M25 115V8" stroke-width="2"/><path d="M30 100L150 20" /><path d="M30 25L150 95" stroke="#4F9BA8"/><circle cx="90" cy="60" r="8" fill="${Y}" stroke="${K}"/>`),
    'skala': '<mark>1 : 100</mark>',
    'vertikalvinklar': sv_(170, 120, `<path d="M20 20L150 100M20 100L150 20"/><path d="M62 46A28 28 0 0 1 62 74" stroke="${Y}" stroke-width="6"/><path d="M108 46A28 28 0 0 0 108 74" stroke="${Y}" stroke-width="6"/>`),
    'sidovinklar': sv_(180, 110, `<path d="M15 90H165M90 90L130 20"/><path d="M120 90A30 30 0 0 0 105 64" stroke="${Y}" stroke-width="6"/><path d="M60 90A30 30 0 0 1 102 63" stroke="#4F9BA8" stroke-width="6"/>${txt(28, 70, '120°', 15)}${txt(132, 76, '60°', 15)}`),
    'gradskiva': sv_(180, 105, `<path d="M15 95A75 75 0 0 1 165 95Z" fill="#FBF1DA"/>${[...Array(19)].map((_, i) => { const a = Math.PI * i / 18, l = i % 3 ? 8 : 15; return `<path d="M${(90 - 75 * Math.cos(a)).toFixed(1)} ${(95 - 75 * Math.sin(a)).toFixed(1)}L${(90 - (75 - l) * Math.cos(a)).toFixed(1)} ${(95 - (75 - l) * Math.sin(a)).toFixed(1)}" stroke-width="2"/>`; }).join('')}<path d="M90 95L140 40" stroke="${Y}" stroke-width="4"/><circle cx="90" cy="95" r="4" fill="${K}"/>`),
    'π (pi)': '<mark>π</mark> ≈ 3,14',
    'begränsningsarea': sv_(170, 120, `<path d="M30 45H110V105H30Z" fill="${Y}"/><path d="M30 45L60 20H140L110 45Z" fill="#F3D88E"/><path d="M110 45L140 20V80L110 105Z" fill="#F7E3AE"/>`),
    'basyta': sv_(170, 125, `<path d="M40 30V95M130 30V95"/><ellipse cx="85" cy="30" rx="45" ry="13"/><ellipse cx="85" cy="95" rx="45" ry="13" fill="${Y}"/>`),
    'liter': '1 <mark>l</mark> = 1 dm<sup>3</sup>',
    'parallelltrapets': sv_(170, 110, `<path d="M55 20H115L150 95H20Z"/><path d="M55 20H115M20 95H150" stroke="${Y}" stroke-width="6"/><path d="M80 15l6 5-6 5M80 90l6 5-6 5" stroke-width="2"/>`),
    'rotationssymmetri': sv_(170, 125, `<path d="M85 60L85 15L110 40ZM85 60L130 60L105 85ZM85 60L85 105L60 80ZM85 60L40 60L65 35Z" fill="${Y}"/><path d="M140 30A60 60 0 0 1 145 90" stroke="#4F9BA8"/><path d="M137 82l8 9 5-11" stroke="#4F9BA8"/>`),
    'motsvarande sidor': sv_(190, 110, `<path d="M15 95H75L15 50Z"/><path d="M95 95H185L95 28Z"/><path d="M15 95H75M95 95H185" stroke="${Y}" stroke-width="6"/>`),
    'rätvinklig triangel': sv_(170, 115, `<path d="M30 100H145L30 20Z" fill="#FBF1DA"/><path d="M30 82H48V100" stroke="${Y}" stroke-width="4"/>`),
    'medelhastighet': 'v = <mark>' + b_('s', 't') + '</mark>',
    'km/h': '90 <mark>km/h</mark>',
    'koordinatsystem': sv_(160, 120, `<path d="M15 95H150M40 112V8" stroke-width="2.5"/><path d="M140 90l10 5-10 5M35 18l5-10 5 10" stroke-width="2"/><circle cx="100" cy="45" r="7" fill="${Y}" stroke="${K}"/>${txt(108, 40, '(3, 2)', 13)}${txt(148, 112, 'x', 14)}${txt(48, 16, 'y', 14)}`),
    'lån': '🏦 → <mark>5 000 kr</mark>',
    'funktion': '<mark>y = 2x + 1</mark>',
    'gynnsamt utfall': '⚀ ⚁ ⚂ ⚃ ⚄ <mark>⚅</mark>',
    'slumpförsök': '🪙 <mark>krona?</mark>',
    'lägesmått': '<small><mark>medelvärde</mark><br><mark>median</mark><br><mark>typvärde</mark></small>',
    'kombinatorik': '3 · 2 = <mark>6</mark> sätt',
  };
  // Bygg ordlistan
  const ORD = [], NYCKEL = {}, MENING = [];
  const stam = s => s.toLowerCase().replace(/[^a-zåäö ]/g, '').slice(0, 5);
  for (const ak of [7, 8, 9]) {
    const fn = (window.BG_DATA || {})[ak]; if (!fn) continue;
    const D = fn({r, val, sv, tus, sgn, blanda});
    for (const kap in D) {
      const k = D[kap], om = omrade(k.namn), ex = k.exempel || [];
      const egna = [];
      for (const [ord, forkl] of k.begrepp || []) {
        const id = om + ':' + ord.toLowerCase();
        const e = ex.find(x => x[1].toLowerCase() === ord.toLowerCase()) || ex.find(x => stam(x[1]) === stam(ord) && ord.length > 4);
        if (NYCKEL[id]) { if (!NYCKEL[id].ak.includes(ak)) NYCKEL[id].ak.push(ak); if (!NYCKEL[id].bild && e) Object.assign(NYCKEL[id], {bild: e[0], exText: e[2]}); egna.push(NYCKEL[id]); continue; }
        const o = {id, ord, forkl, om, ak: [ak], kap: `Åk ${ak} kap ${kap}`, bild: e ? e[0] : (EGNA[ord.toLowerCase()] || ''), exText: e ? e[2] : ''};
        ORD.push(o); NYCKEL[id] = o; egna.push(o);
      }
      const svar = (k.dra || []).map(d => d[1]);
      for (const [m, s] of k.dra || []) {
        const o = egna.find(x => x.ord.toLowerCase() === s.toLowerCase()) || egna.find(x => stam(x.ord) === stam(s));
        MENING.push({m, s, ak, om, ord: o, andra: svar.filter(x => x !== s)});
      }
    }
  }

  // Mina svåra ord: id -> antal rätt som behövs för att ordet ska försvinna
  let SVARA = {};
  try { SVARA = JSON.parse(localStorage.getItem('mk-svara-ord') || '{}') || {}; } catch (e) {}
  const spara = () => { try { localStorage.setItem('mk-svara-ord', JSON.stringify(SVARA)); } catch (e) {} raknare(); };
  const fel = o => { if (o) { SVARA[o.id] = 2; spara(); } };
  const ratt = o => { if (o && SVARA[o.id]) { SVARA[o.id]--; if (SVARA[o.id] <= 0) delete SVARA[o.id]; spara(); } };

  const tal = s => { try { const u = new SpeechSynthesisUtterance(s); u.lang = 'sv-SE'; u.rate = .9; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {} };
  const hogt = s => `<button class="bg-hogt" type="button" data-tal="${esc(s)}" aria-label="Lyssna på ordet" title="Lyssna">🔊</button>`;
  el.addEventListener('click', e => { const b = e.target.closest('.bg-hogt'); if (b) { e.stopPropagation(); tal(b.dataset.tal); } });

  // Filter
  const F = {ak: 0, om: '', sok: ''};
  // Sökningen jämför utan stora bokstäver, mellanslag och bindestreck
  const norm = t => String(t || '').toLowerCase().normalize('NFC').replace(/[\s\-–]+/g, ' ').trim();
  const passar = o => (!F.ak || o.ak.includes(F.ak)) && (!F.om || o.om === F.om);
  const urval = () => ORD.filter(passar);

  el.innerHTML = `
<div class="bg-filter">
  <div class="bg-grupp"><span>Område</span><button type="button" data-om="" class="on">Alla</button>${OMR.map(o => `<button type="button" data-om="${o[0]}"><i style="background:${o[2]}"></i>${o[1]}</button>`).join('')}</div>
</div>
<div class="bg-flikar" role="tablist">
  <button type="button" data-flik="kort" class="on"><span class="em">🃏</span> Begreppskort</button>
  <button type="button" data-flik="ova"><span class="em">🎯</span> Öva</button>
  <button type="button" data-flik="svara"><span class="em">⭐</span> Mina svåra ord <b id="bg-antal">0</b></button>
</div>
<div id="bg-kort"><label class="bg-sok"><span aria-hidden="true">🔍</span><input type="search" placeholder="Sök ett ord, t.ex. nämnare" aria-label="Sök ett ord"></label><p class="bg-hj" id="bg-traff" aria-live="polite">Klicka på ett kort för att vända det.</p><div id="bg-kortlista"></div></div>
<div id="bg-ova" hidden>
  <div class="bg-typer">
    <button type="button" data-typ="bild"><span>🖼️</span><b>Para ihop ord och bild</b><small>Vilket ord hör till vilken bild?</small></button>
    <button type="button" data-typ="mening"><span>✏️</span><b>Vilket ord passar?</b><small>Välj ordet som passar i meningen.</small></button>
    <button type="button" data-typ="udda"><span>🧐</span><b>Vilken passar inte in?</b><small>Tre ord hör ihop. Hitta det fjärde.</small></button>
    <button type="button" data-typ="egna"><span>💬</span><b>Förklara med egna ord</b><small>Skriv eller säg högt. Kolla själv.</small></button>
  </div>
  <div id="bg-yta"></div>
</div>
<div id="bg-svara" hidden></div>`;

  const $ = s => el.querySelector(s);
  function raknare() { const n = Object.keys(SVARA).length, b = $('#bg-antal'); if (b) { b.textContent = n; b.className = n ? 'har' : ''; } }

  el.querySelectorAll('[data-ak]').forEach(b => b.onclick = () => { F.ak = +b.dataset.ak; el.querySelectorAll('[data-ak]').forEach(x => x.classList.toggle('on', x === b)); visa(); });
  el.querySelectorAll('[data-om]').forEach(b => b.onclick = () => { F.om = b.dataset.om; el.querySelectorAll('[data-om]').forEach(x => x.classList.toggle('on', x === b)); visa(); });
  const sokruta = $('.bg-sok input');
  const sok = () => { const v = norm(sokruta.value); if (v !== F.sok) { F.sok = v; kortlista(); } };
  ['input', 'keyup', 'change', 'search'].forEach(h => sokruta.addEventListener(h, sok));
  let FLIK = 'kort', TYP = '';
  el.querySelectorAll('[data-flik]').forEach(b => b.onclick = () => { FLIK = b.dataset.flik; el.querySelectorAll('[data-flik]').forEach(x => x.classList.toggle('on', x === b)); visa(); });
  el.querySelectorAll('[data-typ]').forEach(b => b.onclick = () => { TYP = b.dataset.typ; el.querySelectorAll('[data-typ]').forEach(x => x.classList.toggle('on', x === b)); starta(); });

  // ---------- Begreppskort ----------
  const kort = o => {
    const c = OM[o.om];
    return `<div class="bk" tabindex="0" role="button" aria-label="${esc(o.ord)}, vänd kortet" style="--o:${c[2]};--od:${c[3]}"><div class="bk-in">
<div class="bk-fram"><h3${o.ord.length > 13 ? ' class="lang"' : ''}>${esc(o.ord)}</h3></div>
<div class="bk-bak"><div class="bk-topp"><h4>${esc(o.ord)}</h4>${hogt(o.ord)}</div>${o.bild ? `<div class="bk-bild"><span>${o.bild}</span></div>` : ''}<p>${esc(o.forkl)}.</p>${o.exText ? `<p class="bk-ex">${esc(o.exText)}</p>` : ''}</div></div></div>`;
  };
  function kortlista(lista, mal) {
    const t = $('#bg-traff');
    if (!lista && F.sok) {
      // Sök i alla områden: först ord som börjar på sökordet, sedan ord som innehåller det, sist förklaringar
      const q = F.sok, n = o => norm(o.ord);
      const a = ORD.filter(o => n(o).startsWith(q)), b = ORD.filter(o => !a.includes(o) && n(o).includes(q)), c = ORD.filter(o => !a.includes(o) && !b.includes(o) && norm(o.forkl).includes(q));
      lista = [...a, ...b, ...c];
      if (t && !mal) t.textContent = lista.length ? `${lista.length} ord hittades för ”${sokruta.value.trim()}” i alla områden. Klicka på ett kort för att vända det.` : '';
    } else if (t && !mal) t.textContent = 'Klicka på ett kort för att vända det.';
    lista = lista || urval();
    let h = '';
    for (const o of OMR) {
      const l = lista.filter(x => x.om === o[0]);
      if (l.length) h += `<section class="bg-omr"><h2><span class="bg-prick" style="background:${o[2]}">${o[4]}</span>${o[1]} <small>${l.length} ord</small></h2><div class="bg-kortrad">${l.map(kort).join('')}</div></section>`;
    }
    (mal || $('#bg-kortlista')).innerHTML = h || (F.sok && !mal ? `<p class="bg-tom">Inget ord hittades för ”${esc(sokruta.value.trim())}”. Prova en kortare del av ordet.</p>` : '<p class="bg-tom">Inga ord matchar. Prova ett annat filter.</p>');
  }
  el.addEventListener('click', e => { const k = e.target.closest('.bk'); if (k) k.classList.toggle('vand'); });
  el.addEventListener('keydown', e => { const k = e.target.closest('.bk'); if (k && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); k.classList.toggle('vand'); } });

  // ---------- Övningar ----------
  let POANG = {r: 0, n: 0};
  const yta = () => $('#bg-yta');
  const huvud = (rubrik, fraga) => `<div class="bg-ovhuvud"><h3>${rubrik}</h3><span class="bg-poang">Rätt: ${POANG.r} av ${POANG.n}</span></div>${fraga ? `<p class="bg-fraga">${fraga}</p>` : ''}`;
  const nasta = () => `<div class="bg-ovfot"><span class="bg-res" aria-live="polite"></span><button type="button" class="bg-nasta" hidden>Nästa →</button></div>`;
  const res = (txt, ok) => { const s = yta().querySelector('.bg-res'); s.innerHTML = txt; s.className = 'bg-res ' + (ok ? 'ok' : 'fel'); const n = yta().querySelector('.bg-nasta'); n.hidden = false; n.onclick = starta; n.focus(); };
  const BARA_SVARA = () => FLIK === 'svara';
  const kalla = () => { const u = urval(); if (!BARA_SVARA()) return u; const s = ORD.filter(o => SVARA[o.id]); return s.length ? s : u; };
  const forLite = () => yta().innerHTML = '<p class="bg-tom">För få ord med det här filtret. Välj fler områden eller årskurser.</p>';

  function starta() {
    if (FLIK === 'svara') return svaraTrana();
    if (!TYP) { yta().innerHTML = '<p class="bg-hj" style="margin-top:6px">Välj en övning ovanför.</p>'; return; }
    ({bild, mening, udda, egna})[TYP]();
  }

  function bild() {
    const med = blanda(kalla().filter(o => o.bild));
    const fyra = [];
    for (const o of med) { if (!fyra.some(x => x.ord.toLowerCase() === o.ord.toLowerCase())) fyra.push(o); if (fyra.length === 4) break; }
    if (fyra.length < 3) return forLite();
    const bilder = blanda(fyra);
    yta().innerHTML = huvud('Para ihop ord och bild', 'Klicka på ett ord och sedan på bilden som hör ihop med det.')
      + `<div class="bg-ordrad">${fyra.map((o, i) => `<button type="button" class="bg-ord" data-i="${i}">${esc(o.ord)}</button>`).join('')}</div>`
      + `<div class="bg-bilder">${bilder.map(o => `<button type="button" class="bg-bildv" data-i="${fyra.indexOf(o)}"><span>${o.bild}</span></button>`).join('')}</div>` + nasta();
    let vald = null, kvar = fyra.length, felen = 0;
    yta().querySelectorAll('.bg-ord').forEach(b => b.onclick = () => { if (b.disabled) return; vald = b; yta().querySelectorAll('.bg-ord').forEach(x => x.classList.toggle('vald', x === b)); });
    yta().querySelectorAll('.bg-bildv').forEach(b => b.onclick = () => {
      if (!vald || b.disabled) return;
      const o = fyra[+vald.dataset.i];
      if (vald.dataset.i === b.dataset.i) {
        b.disabled = vald.disabled = true; b.classList.add('par'); vald.classList.add('par'); vald.classList.remove('vald');
        b.insertAdjacentHTML('beforeend', `<span class="bg-etik">${esc(o.ord)}</span>`); ratt(o); vald = null;
        if (--kvar === 0) { POANG.n++; if (!felen) POANG.r++; yta().querySelector('.bg-poang').textContent = `Rätt: ${POANG.r} av ${POANG.n}`; res(felen ? `Klart! Du gjorde ${felen} fel. Orden har lagts till i Mina svåra ord.` : 'Snyggt! Alla rätt på första försöket.', !felen); }
      } else { felen++; fel(o); b.classList.add('skak'); setTimeout(() => b.classList.remove('skak'), 450); }
    });
  }

  function mening() {
    const ok = m => (!F.ak || m.ak === F.ak) && (!F.om || m.om === F.om) && m.andra.length >= 3;
    let l = MENING.filter(ok);
    if (BARA_SVARA()) { const s = l.filter(m => m.ord && SVARA[m.ord.id]); if (s.length) l = s; }
    if (!l.length) return forLite();
    const m = val(l), alt = blanda([m.s, ...blanda(m.andra).slice(0, 3)]);
    yta().innerHTML = huvud('Vilket ord passar?', m.m.replace('___', '<span class="bg-lucka">?</span>')) + `<div class="bg-alt">${alt.map(a => `<button type="button">${esc(a)}</button>`).join('')}</div>` + nasta();
    yta().querySelectorAll('.bg-alt button').forEach(b => b.onclick = () => {
      const r_ = b.textContent === m.s; POANG.n++; if (r_) POANG.r++;
      yta().querySelectorAll('.bg-alt button').forEach(x => { x.disabled = true; if (x.textContent === m.s) x.classList.add('par'); });
      if (!r_) b.classList.add('fel');
      yta().querySelector('.bg-lucka').textContent = m.s; yta().querySelector('.bg-poang').textContent = `Rätt: ${POANG.r} av ${POANG.n}`;
      r_ ? ratt(m.ord) : fel(m.ord);
      res(r_ ? 'Rätt!' : `Det rätta ordet är <b>${esc(m.s)}</b>.` + (m.ord ? ` ${esc(m.ord.ord)}: ${esc(m.ord.forkl).toLowerCase()}.` : ''), r_);
    });
  }

  function udda() {
    const u = kalla(), grupper = OMR.map(o => u.filter(x => x.om === o[0])).filter(g => g.length >= 3);
    if (!grupper.length) return forLite();
    const g = val(grupper), tre = blanda(g).slice(0, 3);
    let annan = ORD.filter(x => x.om !== g[0].om && (!F.ak || x.ak.includes(F.ak)));
    if (!annan.length) return forLite();
    const ut = val(annan), alla = blanda([...tre, ut]);
    yta().innerHTML = huvud('Vilken passar inte in?', 'Tre av orden hör ihop. Vilket ord passar inte in?') + `<div class="bg-alt fyra">${alla.map((o, i) => `<button type="button" data-i="${i}">${esc(o.ord)}</button>`).join('')}</div>` + nasta();
    yta().querySelectorAll('.bg-alt button').forEach(b => b.onclick = () => {
      const o = alla[+b.dataset.i], r_ = o === ut; POANG.n++; if (r_) POANG.r++;
      yta().querySelectorAll('.bg-alt button').forEach(x => { x.disabled = true; if (alla[+x.dataset.i] === ut) x.classList.add('par'); });
      if (!r_) b.classList.add('fel');
      yta().querySelector('.bg-poang').textContent = `Rätt: ${POANG.r} av ${POANG.n}`;
      res(`<b>${esc(ut.ord)}</b> hör till ${OM[ut.om][1].toLowerCase()}. De andra orden hör till ${OM[g[0].om][1].toLowerCase()}.`, r_);
    });
  }

  function egna() {
    const u = kalla(); if (!u.length) return forLite();
    const o = val(u);
    yta().innerHTML = huvud('Förklara med egna ord', `Vad betyder <b>${esc(o.ord)}</b>? ${hogt(o.ord)}`)
      + `<textarea class="bg-text" rows="3" placeholder="Skriv din förklaring här, eller säg den högt för en kompis."></textarea>
<p class="bg-hj">Ingen dator rättar det här. Du kollar själv.</p><button type="button" class="bg-klar">Jag är klar, visa checklistan</button><div class="bg-check" hidden>
<h4>Kolla din förklaring</h4>
<label><input type="checkbox"> Jag har sagt vad ordet betyder.</label>
<label><input type="checkbox"> Jag har gett ett exempel (ett tal, en bild eller en situation).</label>
<label><input type="checkbox"> Jag har använt minst ett annat matteord.</label>
<label><input type="checkbox"> En kompis skulle förstå min förklaring.</label>
<div class="bg-jmf"><b>Jämför med kortet:</b> ${esc(o.forkl)}.${o.exText ? ' ' + esc(o.exText) : ''}</div>
<div class="bg-sjalv"><button type="button" data-v="1">😊 Jag kunde det</button><button type="button" data-v="0">🤔 Jag vill öva mer på ordet</button></div></div>` + nasta();
    yta().querySelector('.bg-klar').onclick = e => { e.target.hidden = true; yta().querySelector('.bg-check').hidden = false; };
    yta().querySelectorAll('.bg-sjalv button').forEach(b => b.onclick = () => {
      yta().querySelectorAll('.bg-sjalv button').forEach(x => x.disabled = true); b.classList.add('vald');
      if (b.dataset.v === '1') { ratt(o); res('Bra jobbat!', true); } else { fel(o); res('Ordet finns nu i Mina svåra ord.', false); }
    });
  }

  // Mina svåra ord: korten + en blandad träning som bara använder de orden
  function svaraTrana() {
    const s = ORD.filter(o => SVARA[o.id]);
    if (!s.length) { yta().innerHTML = ''; return; }
    const o = val(s), andra = blanda(ORD.filter(x => x.om === o.om && x.ord !== o.ord)).slice(0, 3), alt = blanda([o, ...andra]);
    yta().innerHTML = huvud('Vilket ord menas?', `<span class="bg-def">”${esc(o.forkl)}”</span>`) + `<div class="bg-alt">${alt.map((x, i) => `<button type="button" data-i="${i}">${esc(x.ord)}</button>`).join('')}</div>` + nasta();
    yta().querySelectorAll('.bg-alt button').forEach(b => b.onclick = () => {
      const r_ = alt[+b.dataset.i] === o; POANG.n++; if (r_) POANG.r++;
      yta().querySelectorAll('.bg-alt button').forEach(x => { x.disabled = true; if (alt[+x.dataset.i] === o) x.classList.add('par'); });
      if (!r_) b.classList.add('fel');
      r_ ? ratt(o) : fel(o);
      const kvar = SVARA[o.id];
      res(r_ ? (kvar ? 'Rätt! Ett rätt till så försvinner ordet från listan.' : 'Rätt! Ordet är borttaget från dina svåra ord. 🎉') : `Det var <b>${esc(o.ord)}</b>.`, r_);
      setTimeout(svaraLista, 0);
    });
  }
  function svaraLista() {
    const s = ORD.filter(o => SVARA[o.id]);
    const box = $('#bg-svara');
    if (!s.length) { box.innerHTML = `<div class="bg-tomruta"><span>⭐</span><h3>Inga svåra ord just nu</h3><p>När du svarar fel i en övning hamnar ordet här. Svara rätt två gånger så försvinner det. Listan sparas bara i den här webbläsaren.</p></div>`; return; }
    const lista = box.querySelector('#bg-svarakort');
    if (!lista) box.innerHTML = `<p class="bg-hj">${s.length} ord att öva på. Svara rätt två gånger så försvinner ordet. Listan sparas bara i den här webbläsaren. <button type="button" class="bg-rensa">Töm listan</button></p><div id="bg-yta-svara"></div><div id="bg-svarakort"></div>`;
    kortlista(s, box.querySelector('#bg-svarakort'));
    const rensa = box.querySelector('.bg-rensa'); if (rensa) rensa.onclick = () => { SVARA = {}; spara(); visa(); };
  }

  function visa() {
    $('#bg-kort').hidden = FLIK !== 'kort'; $('#bg-ova').hidden = FLIK !== 'ova'; $('#bg-svara').hidden = FLIK !== 'svara';
    el.querySelector('.bg-filter').hidden = FLIK === 'svara';
    if (FLIK === 'kort') kortlista();
    if (FLIK === 'ova') { const y = $('#bg-yta-svara'); if (y) y.id = ''; ytaFlytta($('#bg-ova')); starta(); }
    if (FLIK === 'svara') { $('#bg-svara').innerHTML = ''; svaraLista(); const y = $('#bg-yta-svara'); if (y) { ytaFlytta(y); svaraTrana(); } }
  }
  // Övningsytan används både under Öva och under Mina svåra ord
  function ytaFlytta(mal) { const g = $('#bg-yta'); if (g) g.remove(); const n = document.createElement('div'); n.id = 'bg-yta'; mal.appendChild(n); }
  // Startläge: ?flik=ova&typ=mening&ak=8 går också att länka till
  const q = new URLSearchParams(location.search);
  if (q.get('ak')) el.querySelector(`[data-ak="${+q.get('ak')}"]`)?.click();
  if (q.get('flik')) el.querySelector(`[data-flik="${q.get('flik')}"]`)?.click();
  if (q.get('typ')) el.querySelector(`[data-typ="${q.get('typ')}"]`)?.click();
  raknare(); visa();
  window.BG_ANTAL = ORD.length;
})();
