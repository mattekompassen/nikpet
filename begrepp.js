// Matematiska begrepp (skiss). Läser begrepp, exempel och meningar från trana-ak7/8/9.js.
// Fel svar sparas i localStorage ('mk-svara-ord') och kommer tillbaka under "Mina svåra ord".
(function () {
  const el = document.getElementById('bg');
  if (!el) return;
  const r = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const val = a => a[r(0, a.length - 1)];
  const sv = x => String(Math.round(x * 1e6) / 1e6).replace('.', ',');
  const tus = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
  const sgn = n => n < 0 ? '(' + sv(n) + ')' : sv(n);
  const blanda = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = r(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));

  // Områden (kursplanens centrala innehåll). Procent hör till Samband och förändring.
  const OMR = [
    // Organic-färgskalan (Nikola 2026-11-07): (område, namn, huvudfärg, mörk nyans för text, symbol)
    ['tal', 'Taluppfattning', '#7597BC', '#35577A', '½'],
    ['alg', 'Algebra', '#818B72', '#4C5940', 'x'],
    ['geo', 'Geometri', '#CA8871', '#8A4532', '△'],
    ['sam', 'Samband och förändring', '#D8A964', '#75541C', '%'],
    ['sta', 'Sannolikhet och statistik', '#A29BBF', '#4F4880', '⚄']];
  // Egna linjeikoner (Organic 2026-11-07) i stället för emojis, som ser olika ut på iPhone och dator
  const IKON = {
    vinkel: '<path d="M4 20V4l16 16z"/><path d="M8.5 15.5v-3l3 3z"/><path d="M4 8h2M4 12h1.5M8 20v-2M12 20v-1.5"/>',
    lank: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    penna: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
    vag: '<path d="M12 4v16M8 20h8M5 7h14"/><path d="M5 7l-2.6 6h5.2zM19 7l-2.6 6h5.2z"/>',
    pilar: '<path d="M3 7h4c4.5 0 5.5 10 10 10h3M3 17h4c1.6 0 2.6-1.3 3.4-3M13.6 10c.8-1.7 1.8-3 3.4-3h3M17.5 4.5 20 7l-2.5 2.5M17.5 14.5 20 17l-2.5 2.5"/>',
    prat: '<path d="M4 5.5h16v10.5H10l-5 4v-4H4z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01" stroke-width="2.6"/>',
    sok: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',
    kort: '<rect x="3.5" y="7" width="11" height="14" rx="2"/><path d="M8 3.5h10.5a2 2 0 0 1 2 2V17"/>',
    mal: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12h.01" stroke-width="3"/>',
    stjarna: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z"/>',
    tarning: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="M8.5 8.5h.01M15.5 8.5h.01M12 12h.01M8.5 15.5h.01M15.5 15.5h.01" stroke-width="2.8"/>',
    hus: '<path d="M3.5 11.5 12 4l8.5 7.5"/><path d="M6 9.5V20h12V9.5M10 20v-5h4v5"/>',
    hogt: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    stapel: '<path d="M4 20h16"/><rect x="6" y="13" width="3" height="7"/><rect x="10.5" y="8" width="3" height="12"/><rect x="15" y="11" width="3" height="9"/>',
    tanke: '<path d="M7 17.5a5 5 0 0 1-1-9.6A6 6 0 0 1 17.6 7 4.6 4.6 0 0 1 17 17.5z"/><path d="M8 21h.01M5.5 19.5h.01" stroke-width="2.6"/>',
    bock: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="M8 12.5l3 3 5-6"/>',
    lampa: '<path d="M9 17.5h6M10 21h4"/><path d="M8.5 14.5a6 6 0 1 1 7 0c-.6.5-.5 1.5-.5 3H9c0-1.5.1-2.5-.5-3z"/>',
    pokal: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 5.5H5a3 3 0 0 0 3 4M16 5.5h3a3 3 0 0 1-3 4M12 13v4M8.5 20.5h7M9.5 17h5v3.5h-5z"/>',
    trappa: '<path d="M4 20h4v-4h4v-4h4V8h4"/><path d="M15 4h5v5"/>',
    rätta: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M15 20h5M17.5 17.5v5"/>'};
  const EMOJI = {'📐': 'vinkel', '🔗': 'lank', '📝': 'penna', '⚖️': 'vag', '🔀': 'pilar', '💬': 'prat', '🔍': 'sok', '🃏': 'kort', '🎯': 'mal', '★': 'stjarna', '⚄': 'tarning', '🎲': 'tarning', '🏠': 'hus', '🔊': 'hogt', '📊': 'stapel', '🧠': 'tanke', '🛠️': 'bock', '💡': 'lampa', '🔧': 'rätta'};
  const ik = n => `<svg class="ik" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IKON[n]}</svg>`;
  const sym = s => EMOJI[s] ? ik(EMOJI[s]) : s;
  // Färgade versioner i ikoncirklarna (som startsidan): mörk kontur + färger
  const FIK = {
    lank: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" stroke="#5B8DB8" stroke-width="2.4"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" stroke="#E07A5F" stroke-width="2.4"/>',
    penna: '<path d="M4 20h4L19 9l-4-4L4 16z" fill="#E9B949"/><path d="M15 5l4 4 1.2-1.2a1.6 1.6 0 0 0 0-2.3L18.5 3.8a1.6 1.6 0 0 0-2.3 0z" fill="#E07A5F"/><path d="M4 16l4 4"/>',
    vag: '<path d="M12 4v16M8 20h8M5 7h14"/><path d="M5 7l-2.6 6h5.2z" fill="#E9B949"/><path d="M19 7l-2.6 6h5.2z" fill="#E07A5F"/><circle cx="12" cy="4" r="1.5" fill="#5B8DB8"/>',
    pilar: '<path d="M3 7h4c4.5 0 5.5 10 10 10h3M17.5 14.5 20 17l-2.5 2.5" stroke="#5B8DB8" stroke-width="2.2"/><path d="M3 17h4c1.6 0 2.6-1.3 3.4-3M13.6 10c.8-1.7 1.8-3 3.4-3h3M17.5 4.5 20 7l-2.5 2.5" stroke="#E07A5F" stroke-width="2.2"/>',
    prat: '<path d="M4 5.5h16v10.5H10l-5 4v-4H4z" fill="#fff"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01" stroke="#E07A5F" stroke-width="2.8"/>',
    mal: '<circle cx="12" cy="12" r="8.5" fill="#E07A5F"/><circle cx="12" cy="12" r="5" fill="#fff"/><circle cx="12" cy="12" r="2" fill="#E07A5F"/>',
    stjarna: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" fill="#E9B949"/>',
    tarning: '<rect x="4" y="4" width="16" height="16" rx="3.5" fill="#fff"/><path d="M8.5 8.5h.01M15.5 8.5h.01M12 12h.01M8.5 15.5h.01M15.5 15.5h.01" stroke="#E07A5F" stroke-width="3"/>',
    triangel: '<path d="M12 3.5 21 19.5H3z" fill="#E9B949"/>'};
  const ikf = n => FIK[n] ? `<svg class="ik" viewBox="0 0 24 24" fill="none" stroke="#2E3A46" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${FIK[n]}</svg>` : ik(n);
  const SYMF = {'½': '<svg viewBox="4 0 16 24" width="24" height="34"><text x="12" y="10.6" text-anchor="middle" font-size="11.5" font-weight="800" fill="#D9583B" font-family="Inter,sans-serif">1</text><path d="M7 12.6h10" stroke="#2E3A46" stroke-width="1.8" stroke-linecap="round"/><text x="12" y="23" text-anchor="middle" font-size="11.5" font-weight="800" fill="#3D78B5" font-family="Inter,sans-serif">2</text></svg>', 'x': '<i style="color:#D9583B;font-size:1.25em">x</i>', '%': '<span style="color:#D9583B">%</span>'};
  const symf = s => s === '△' ? ikf('triangel') : SYMF[s] ? SYMF[s] : EMOJI[s] ? ikf(EMOJI[s]) : s;
  // Organic-skalan: huvudfärg -> ljus bakgrundsfärg (ur Nikolas bild)
  const LJUS = {'#7597BC': '#E8F2FA', '#818B72': '#EAF4EA', '#CA8871': '#FDEBE7', '#D8A964': '#FFF6E3', '#A29BBF': '#EFEAF9', '#7CABB4': '#E6F6F4',
                '#9DB5A6': '#EDF7F0', '#B5A6B9': '#F3EEF5', '#C4AE97': '#F9EFE3', '#DE9C8F': '#FFECE4', '#C0A993': '#F7EFE4', '#CC97A1': '#FCEEF1'};
  const LJ = c => LJUS[c] || '#F7F5F0';

  const OM = Object.fromEntries(OMR.map(o => [o[0], o]));
  const omrade = n => (n = n.toLowerCase(), /algebra/.test(n) ? 'alg' : /geometri/.test(n) ? 'geo' : /samband|procent/.test(n) ? 'sam' : /statistik|sannolik/.test(n) ? 'sta' : 'tal');

  // Bygg ordlistan: bara bokens begrepp (BG_BOK i begrepp-bok.js, Nikolas begreppslistor, ordagrant)
  const ORD = [], NYCKEL = {}, MENING = [], KAPNAMN = {};
  const stam = s => s.toLowerCase().replace(/[^a-zåäö ]/g, '').slice(0, 5);
  const text = h => { const d = document.createElement('div'); d.innerHTML = h; d.querySelectorAll('img').forEach(i => i.remove()); return d.textContent.replace(/\s+/g, ' ').trim(); };
  // Varje ord visas en gång (Nikola 2026-10-29). Samma ord i flera kapitel eller områden slås ihop till ett kort.
  // NAMN: ord som skrivs olika i olika listor får ett gemensamt namn (null = sammansatt rubrik vars delar redan finns som egna kort)
  const NAMN = {'minsta gemensam nämnare (mgn)': 'Minsta gemensamma nämnare (MGN)', 'minsta gemensam nämnare': 'Minsta gemensamma nämnare (MGN)',
    'vänster och höger led': 'Vänster led och höger led', 'mönster': 'Mönster / Talföljd', 'cirkel': 'Cirkel / Medelpunkt', 'cylinder / mantelyta': 'Cylinder',
    'koordinatsystem / koordinataxlar / x-axel och y-axel / koordinat / origo': null, 'potens / bas / exponent': null};
  const DELAR = {'potens / bas / exponent': ['potens', 'bas', 'exponent'], 'koordinatsystem / koordinataxlar / x-axel och y-axel / koordinat / origo': ['koordinatsystem / koordinater', 'x-axel och y-axel', 'origo']};
  // OMRADE: ord som finns i flera områden placeras i ett
  const OMRADE = {'enklaste form': 'tal', 'förkortning': 'tal', 'förlängning': 'tal'};
  const lagg = (b, ord) => {
    const id = ord.toLowerCase();
    if (NYCKEL[id]) { if (!NYCKEL[id].ak.includes(b.ak)) NYCKEL[id].ak.push(b.ak); NYCKEL[id].kaps.push(b.ak + ':' + b.kap); return; }
    const o = {id, kaps: [b.ak + ':' + b.kap], ord, delar: ord.replace(/ \([^)]*\)$/, '').split(' / '), forkl: text(b.besk), forklHtml: b.besk, om: OMRADE[id] || b.om, ak: [b.ak], kap: `Åk ${b.ak} kap ${b.kap}`, bild: b.ex, exText: text(b.ex)};
    ORD.push(o); NYCKEL[id] = o;
  };
  const SENARE = [];
  for (const b of window.BG_BOK || []) {
    const k = b.ord.toLowerCase();
    if (k in NAMN && NAMN[k] === null) { SENARE.push(b); continue; }
    lagg(b, NAMN[k] || b.ord);
  }
  for (const b of SENARE) for (const d of DELAR[b.ord.toLowerCase()]) if (NYCKEL[d]) lagg(b, NYCKEL[d].ord);
  // Kompletterande begrepp ur Skolverkets ordlista (BG_SKV i begrepp-skolverket.js), utan årskurs och kapitel
  for (const b of window.BG_SKV || []) {
    const id = b.ord.toLowerCase();
    if (NYCKEL[id]) continue;
    const o = {id, kaps: [], ord: b.ord, delar: b.ord.replace(/ \([^)]*\)$/, '').split(' / '), forkl: text(b.besk), forklHtml: b.besk + '<span class="bk-skv">Ur Skolverkets ordlista</span>', om: b.om, ak: [], kap: 'Skolverket', bild: b.ex, exText: text(b.ex), skv: true};
    ORD.push(o); NYCKEL[id] = o;
  }
  ORD.sort((a, b) => a.ord.localeCompare(b.ord, 'sv'));  // bokstavsordning
  const hitta = (s, om) => { const l = ORD.filter(o => !om || o.om === om); return l.find(o => o.delar.some(d => d.toLowerCase() === s.toLowerCase())) || l.find(o => o.delar.some(d => stam(d) === stam(s))); };
  // Meningar från Interaktiva övningar, bara de vars svar är ett av bokens begrepp
  for (const ak of [7, 8, 9]) {
    const fn = (window.BG_DATA || {})[ak]; if (!fn) continue;
    const D = fn({r, val, sv, tus, sgn, blanda});
    for (const kap in D) {
      KAPNAMN[ak + ':' + kap] = D[kap].namn;
      const om = omrade(D[kap].namn), dra = (D[kap].dra || []).map(([m, s_]) => ({m, s: s_, ord: hitta(s_, om)})).filter(x => x.ord);
      for (const x of dra) MENING.push({m: x.m, s: x.s, ak, om, ord: x.ord, andra: dra.map(y => y.s).filter(y => y !== x.s)});
    }
  }
  // Ordet döljs i förklaringen när eleven ska gissa ordet
  const dolj = (t, o) => o.delar.reduce((a, d) => a.replace(new RegExp(d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+') + '[a-zåäö]*', 'gi'), '___'), t);

  // Mina svåra ord: id -> antal rätt som behövs för att ordet ska försvinna
  let SVARA = {};
  try { SVARA = JSON.parse(localStorage.getItem('mk-svara-ord') || '{}') || {}; } catch (e) {}
  const spara = () => { try { localStorage.setItem('mk-svara-ord', JSON.stringify(SVARA)); } catch (e) {} raknare(); };
  const fel = o => { if (o) { SVARA[o.id] = 2; spara(); } };
  const ratt = o => { if (o && SVARA[o.id]) { SVARA[o.id]--; if (SVARA[o.id] <= 0) delete SVARA[o.id]; spara(); } };

  const tal = s => { try { const u = new SpeechSynthesisUtterance(s); u.lang = 'sv-SE'; u.rate = .9; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {} };
  const hogt = s => `<button class="bg-hogt" type="button" data-tal="${esc(s)}" aria-label="Lyssna på ordet" title="Lyssna">${ik('hogt')}</button>`;
  el.addEventListener('click', e => { const b = e.target.closest('.bg-hogt'); if (b) { e.stopPropagation(); tal(b.dataset.tal); } });

  // Filter
  const F = {ak: 0, om: '', sok: ''};
  // Sökningen jämför utan stora bokstäver, mellanslag och bindestreck
  const norm = t => String(t || '').toLowerCase().normalize('NFC').replace(/[\s\-–]+/g, ' ').trim();
  const passar = o => (!F.ak || o.ak.includes(F.ak)) && (!F.om || o.om === F.om);
  const urval = () => ORD.filter(passar);

  const $ = s => el.querySelector(s);
  function raknare() {}
  let FLIK = 'ova', TYP = '', sokruta = null;

  // ---------- Begreppskort ----------
  // Ord med bindestreck (t.ex. y-axel) hålls ihop på en rad
  const helord = t => esc(t).replace(/\S*-\S*/g, m => `<span style="white-space:nowrap">${m}</span>`);
  const kort = o => {
    const c = OM[o.om];
    return `<div class="bk" tabindex="0" role="button" aria-label="${esc(o.ord)}, vänd kortet" style="--o:${c[2]};--od:${c[3]};--ol:${LJ(c[2])}"><div class="bk-in">
<div class="bk-fram"><h3${o.ord.length > 13 ? ' class="lang"' : ''}>${helord(o.ord)}</h3></div>
<div class="bk-bak"><div class="bk-topp"><h4>${helord(o.ord)}</h4>${hogt(o.ord)}</div>${o.bild ? `<div class="bk-bild"><span>${o.bild}</span></div>` : ''}<div class="bk-text">${o.forklHtml}</div></div></div></div>`;
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
      if (l.length) h += `<section class="bg-omr"><h2><span class="bg-prick" style="--o:${o[2]};--od:${o[3]};--ol:${LJ(o[2])}">${sym(o[4])}</span>${o[1]} <small>${l.length} ord</small></h2><div class="bg-kortrad">${l.map(kort).join('')}</div></section>`;
    }
    (mal || $('#bg-kortlista')).innerHTML = h || (F.sok && !mal ? `<p class="bg-tom">Inget ord hittades för ”${esc(sokruta.value.trim())}”. Prova en kortare del av ordet.</p>` : '<p class="bg-tom">Inga ord matchar. Prova ett annat filter.</p>');
  }
  // Ord på korten avstavas aldrig: är ett ord för långt för kortet krymps texten tills det får plats
  const anpassa = () => el.querySelectorAll('.bk h3, .bk h4').forEach(h => {
    h.style.removeProperty('font-size');
    let f = parseFloat(getComputedStyle(h).fontSize);
    while (h.scrollWidth > h.clientWidth + 1 && f > 9) { f -= 0.5; h.style.setProperty('font-size', f + 'px', 'important'); }
  });
  let vantar = 0;
  const snart = () => { if (!vantar) vantar = requestAnimationFrame(() => { vantar = 0; anpassa(); }); };
  new MutationObserver(snart).observe(el, {childList: true, subtree: true});
  addEventListener('resize', snart);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(snart);
  el.addEventListener('click', e => { const k = e.target.closest('.bk'); if (k) k.classList.toggle('vand'); });
  el.addEventListener('keydown', e => { const k = e.target.closest('.bk'); if (k && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); k.classList.toggle('vand'); } });

  // ---------- Övningar ----------
  let POANG = {r: 0, n: 0};
  const yta = () => $('#bg-yta');
  const huvud = (rubrik, fraga) => `<div class="bg-ovhuvud"><h3>${rubrik}</h3><span class="bg-poang">Rätt: ${POANG.r} av ${POANG.n}</span></div>${fraga ? `<p class="bg-fraga">${fraga}</p>` : ''}`;
  const nasta = () => `<div class="bg-ovfot"><span class="bg-res" aria-live="polite"></span><button type="button" class="bg-nasta" hidden>Nästa →</button></div>`;
  const res = (txt, ok) => { const s = yta().querySelector('.bg-res'); s.innerHTML = txt; s.className = 'bg-res ' + (ok ? 'ok' : 'fel'); const n = yta().querySelector('.bg-nasta'); n.hidden = false; n.onclick = ova; n.focus(); };
  const BARA_SVARA = () => FLIK === 'svara';
  const kalla = () => { const u = urval(); if (!BARA_SVARA()) return u; const s = ORD.filter(o => SVARA[o.id]); return s.length ? s : u; };
  const forLite = () => yta().innerHTML = '<p class="bg-tom">För få ord med det här filtret. Välj fler områden eller årskurser.</p>';

  function starta() {
    if (FLIK === 'svara') return svaraTrana();
    if (!TYP) { yta().innerHTML = '<p class="bg-hj" style="margin-top:6px">Välj en övning ovanför.</p>'; return; }
    ({bild, mening, udda})[TYP]();
  }

  function bild() {
    // Bara bilder som inte avslöjar ordet
    const med = blanda(kalla().filter(o => /class="foto"/.test(o.bild) && o.exText.length < 40 && dolj(o.exText, o) === o.exText));
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
        if (--kvar === 0) { POANG.n++; if (!felen) POANG.r++; yta().querySelector('.bg-poang').textContent = `Rätt: ${POANG.r} av ${POANG.n}`; res(felen ? `Klart! Du gjorde ${felen} fel.` : 'Snyggt! Alla rätt på första försöket.', !felen); }
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
      res(r_ ? 'Rätt!' : `Det rätta ordet är <b>${esc(m.s)}</b>.` + (m.ord ? ` ${esc(m.ord.forkl)}` : ''), r_);
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

  // ---------- Ord som hjälper dig att resonera (nivå 2-ord, begrepp-kitt.js) ----------
  const KG = window.BG_KITT_GRUPPER || [], KO = (window.BG_KITT || []).slice().sort((a, b) => a.ord.localeCompare(b.ord, 'sv')), KGM = Object.fromEntries(KG.map(g => [g[0], g]));
  const ICKE = '(?<![a-zåäöA-ZÅÄÖ])', SLUT = '(?![a-zåäöA-ZÅÄÖ])';
  // Meningar ur ordlistorna där ordet används (förklaringar och exempel utan formelbilder)
  const BOKMEN = [];
  for (const b of window.BG_BOK || []) for (const m of [b.besk, /<img/.test(b.ex) ? '' : b.ex].flatMap(h => text(h.replace(/<sup>([^<]*)<\/sup>/g, (_, x) => [...x].map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'['0123456789'.indexOf(c)] || (c === '-' || c === '−' ? '⁻' : c)).join(''))).split(/(?<=[.!?])\s+/))) if (m.length >= 25 && m.length <= 170) BOKMEN.push({m, b});
  for (const k of KO) {
    k.re = new RegExp(ICKE + '(' + k.sok + ')' + SLUT, 'i');
    const t = BOKMEN.filter(x => k.re.test(x.m));
    k.bok = t.sort((x, y) => Math.abs(x.m.length - 90) - Math.abs(y.m.length - 90))[0] || null;  // lagom lång mening
    k.antal = new Set(t.map(x => x.b.ord)).size;
    k.lucka = k.lucka === false ? null : (k.lucka || ((k.ex || '').match(/\[([^\]]+)\]/) || [])[1] || null);
  }
  const markera = (t, re) => esc(t).replace(new RegExp(re.source, 'gi'), '<mark>$1</mark>');
  const exHtml = k => esc(k.ex).replace(/\[([^\]]+)\]/g, '<mark>$1</mark>');
  let KF = '', KFLIK = 'kort', KTYP = '', KP = {r: 0, n: 0};
  const kkort = k => {
    const g = KGM[k.g], bok = k.bok ? `<div class="kk-bok"><b>I ordlistan (${esc(k.bok.b.ord)}, åk ${k.bok.b.ak}):</b> ${markera(k.bok.m, k.re)}</div>` : '';
    const bak = k.g === 'fler'
      ? `<p class="kk-v"><b>I vardagen:</b> ${esc(k.vardag)}</p><p class="kk-m"><b>I matten:</b> ${esc(k.matte)}</p>`
      : `<p>${esc(k.forkl)}</p><p class="kk-ex"><b>Exempel:</b> ${exHtml(k)}</p>${bok}`;
    return `<div class="bk kw" tabindex="0" role="button" aria-label="${esc(k.ord)}, vänd kortet" style="--o:${g[2]};--od:${g[3]};--ol:${LJ(g[2])}"><div class="bk-in">
<div class="bk-fram"><h3>${helord(k.ord)}</h3></div>
<div class="bk-bak"><div class="bk-topp"><h4>${helord(k.ord)}</h4>${hogt(k.ord)}</div>${bak}</div></div></div>`;
  };
  const kyta = () => $('#bg-yta');
  const khuvud = (rub, fr) => `<div class="bg-ovhuvud"><h3>${rub}</h3><span class="bg-poang">Rätt: ${KP.r} av ${KP.n}</span></div>${fr ? `<p class="bg-fraga">${fr}</p>` : ''}`;
  const kres = (txt, ok) => { const s = kyta().querySelector('.bg-res'); s.innerHTML = txt; s.className = 'bg-res ' + (ok ? 'ok' : 'fel'); const n = kyta().querySelector('.bg-nasta'); n.hidden = false; n.onclick = ova; n.focus(); };
  const kurval = () => KO.filter(k => !KF || k.g === KF);
  function kval(alt, ratt, efter) {
    kyta().querySelectorAll('.bg-alt button').forEach(b => b.onclick = () => {
      const r_ = +b.dataset.i === ratt; KP.n++; if (r_) KP.r++;
      kyta().querySelectorAll('.bg-alt button').forEach(x => { x.disabled = true; if (+x.dataset.i === ratt) x.classList.add('par'); });
      if (!r_) b.classList.add('fel');
      kyta().querySelector('.bg-poang').textContent = `Rätt: ${KP.r} av ${KP.n}`;
      kres(efter(r_), r_);
    });
  }
  function kstart() {
    if (!KTYP) { kyta().innerHTML = '<p class="bg-hj" style="margin-top:6px">Välj en övning ovanför.</p>'; return; }
    if (KTYP === 'fler') {
      const k = val(KO.filter(x => x.g === 'fler')), mat = Math.random() < .5, men = mat ? k.ms : k.vs;
      const re = new RegExp(ICKE + '(' + k.sok + ')' + SLUT, 'i');
      kyta().innerHTML = khuvud('Vardag eller matte?', `”${markera(men, re)}”<br><small class="kk-fr">Vilken betydelse har ordet <b>${esc(k.ord)}</b> här?</small>`)
        + `<div class="bg-alt"><button type="button" data-i="0">${ik('hus')} Vardag</button><button type="button" data-i="1">${ik('vinkel')} Matte</button></div>` + nasta();
      return kval(null, mat ? 1 : 0, r_ => `${r_ ? 'Rätt! ' : ''}<b>I vardagen:</b> ${esc(k.vardag)}<br><b>I matten:</b> ${esc(k.matte)}`);
    }
    const l = kurval().filter(k => k.g !== 'fler' && (KTYP !== 'lucka' || k.lucka));
    if (l.length < 4) { kyta().innerHTML = '<p class="bg-tom">För få ord i den här gruppen. Välj Alla.</p>'; return; }
    const k = val(l), andra = blanda(l.filter(x => x !== k && x.g === k.g).length >= 3 ? l.filter(x => x !== k && x.g === k.g) : l.filter(x => x !== k)).slice(0, 3), alt = blanda([k, ...andra]);
    if (KTYP === 'lucka') {
      const borjan = /^\[|[.!?] \[/.test(k.ex), form = x => { const f = x.lucka; return borjan ? f[0].toUpperCase() + f.slice(1) : f.toLowerCase(); };
      kyta().innerHTML = khuvud('Vilket ord passar?', esc(k.ex).replace(/\[[^\]]+\]/, '<span class="bg-lucka">?</span>'))
        + `<div class="bg-alt">${alt.map((x, i) => `<button type="button" data-i="${i}">${esc(form(x))}</button>`).join('')}</div>` + nasta();
      return kval(alt, alt.indexOf(k), r_ => { kyta().querySelector('.bg-lucka').textContent = form(k); return `${r_ ? 'Rätt! ' : `Det rätta ordet är <b>${esc(form(k))}</b>. `}<b>${esc(k.ord)}</b>: ${esc(k.forkl)}`; });
    }
    kyta().innerHTML = khuvud('Vad betyder ordet?', `Vad betyder <b>${esc(k.ord)}</b>?`)
      + `<div class="bg-alt kk-lang">${alt.map((x, i) => `<button type="button" data-i="${i}">${esc(x.forkl)}</button>`).join('')}</div>` + nasta();
    kval(alt, alt.indexOf(k), r_ => `${r_ ? 'Rätt! ' : `<b>${esc(k.ord)}</b>: ${esc(k.forkl)}<br>`}Exempel: ${exHtml(k)}`);
  }
  // ---------- Upplägg: steg 1 Vilka ord? -> steg 2 Läs korten / Öva ----------
  const BILDOK = o => /class="foto"/.test(o.bild) && o.exText.length < 40 && dolj(o.exText, o) === o.exText;
  if (el.dataset.test) return testsida();

  // ---------- Testa dig (begrepp-test.html): 10 frågor, resultat och ord att öva på i slutet ----------
  function testsida() {
    const ANTAL = 10;
    // Kort förklaring: hela meningar tills den är lagom lång
    const korta = t => { let u = ''; for (const m of t.split(/(?<=[.!?])\s+/)) { if (u.length >= 50) break; u += (u ? ' ' : '') + m; } return u.length > 210 ? u.slice(0, 200).replace(/\s\S*$/, '') + ' …' : u; };
    // Om två begrepp får samma korta förklaring (t.ex. bas och exponent) visas hela förklaringen
    const KORT = {}; for (const o of ORD) { const k = korta(dolj(o.forkl, o)); (KORT[k] = KORT[k] || new Set()).add(o.ord.toLowerCase()); }
    const beskr = o => { const k = korta(dolj(o.forkl, o)); return KORT[k].size > 1 ? dolj(o.forkl, o) : k; };
    const OKF = o => o.forkl.length >= 12;
    const lika = (a, b) => a.ord.toLowerCase() === b.ord.toLowerCase();
    // Tre felaktiga alternativ, helst från samma område
    const andra = (o, pool, ok = () => true) => {
      const ut = [];
      for (const l of [pool.filter(x => x.om === o.om), pool, ORD.filter(x => x.om === o.om), ORD])
        for (const x of blanda(l)) { if (ut.length === 3) return ut; if (x !== o && !lika(x, o) && ok(x) && !ut.some(y => lika(x, y) || beskr(x) === beskr(y))) ut.push(x); }
      return ut;
    };
    // Frågor om bokens begrepp
    function fragaOrd(o, pool) {
      const typer = [];
      if (OKF(o)) typer.push('betyd', 'beskr', 'beskr');
      if (BILDOK(o)) typer.push('bild');
      const men = MENING.filter(m => m.ord === o && m.andra.length >= 3);
      if (men.length) typer.push('mening');
      const t = val(typer.length ? typer : ['beskr']), facit = {ord: o.ord, txt: o.forkl};
      if (t === 'mening') {
        const m = val(men), alt = blanda([m.s, ...blanda(m.andra).slice(0, 3)]);
        return {rub: 'Vilket ord passar?', q: esc(m.m).replace('___', '<span class="bg-lucka">?</span>'), alt: alt.map(esc), ratt: alt.indexOf(m.s), facit, lucka: m.s};
      }
      if (t === 'betyd') {
        const fel = andra(o, pool, OKF), alt = blanda([o, ...fel]);
        return {rub: 'Vad betyder ordet?', q: `Vad betyder <b>${esc(o.ord)}</b>?`, lang: true, alt: alt.map(x => esc(beskr(x))), ratt: alt.indexOf(o), facit};
      }
      const fel = andra(o, pool), alt = blanda([o, ...fel]);
      if (t === 'bild') return {rub: 'Vilket begrepp visar bilden?', q: '', bild: o.bild, alt: alt.map(x => esc(x.ord)), ratt: alt.indexOf(o), facit};
      return {rub: 'Vilket begrepp beskrivs?', q: `”${esc(beskr(o))}”`, alt: alt.map(x => esc(x.ord)), ratt: alt.indexOf(o), facit};
    }
    // Frågor om resonemangsord
    function fragaKitt(k) {
      const facit = {ord: k.ord, txt: k.g === 'fler' ? `I vardagen: ${k.vardag} I matten: ${k.matte}` : k.forkl};
      if (k.g === 'fler') {
        const mat = Math.random() < .5, re = new RegExp(ICKE + '(' + k.sok + ')' + SLUT, 'i');
        return {rub: 'Vardag eller matte?', q: `”${markera(mat ? k.ms : k.vs, re)}”<br><small class="kk-fr">Vilken betydelse har ordet <b>${esc(k.ord)}</b> här?</small>`, alt: [ik('hus') + ' Vardag', ik('vinkel') + ' Matte'], ratt: mat ? 1 : 0, facit};
      }
      const l = KO.filter(x => x.g !== 'fler' && x !== k), samma = l.filter(x => x.g === k.g);
      if (k.lucka && Math.random() < .5) {
        const fel = blanda((samma.filter(x => x.lucka).length >= 3 ? samma : l).filter(x => x.lucka)).slice(0, 3), alt = blanda([k, ...fel]);
        const borjan = /^\[|[.!?] \[/.test(k.ex), form = x => borjan ? x.lucka[0].toUpperCase() + x.lucka.slice(1) : x.lucka.toLowerCase();
        return {rub: 'Vilket ord passar?', q: esc(k.ex).replace(/\[[^\]]+\]/, '<span class="bg-lucka">?</span>'), alt: alt.map(x => esc(form(x))), ratt: alt.indexOf(k), facit, lucka: form(k)};
      }
      const fel = blanda(samma.length >= 3 ? samma : l).slice(0, 3), alt = blanda([k, ...fel]);
      return {rub: 'Vad betyder ordet?', q: `Vad betyder <b>${esc(k.ord)}</b>?`, lang: true, alt: alt.map(x => esc(x.forkl)), ratt: alt.indexOf(k), facit};
    }
    // Vad kan man testa? Nivå 1–3 per område, resonemangsord och allt blandat
    const kapOrd = (ak, kap) => ORD.filter(o => OKF(o) && o.kaps.some(x => kap ? x === ak + ':' + kap : x.startsWith(ak + ':')));
    const VAL_T = {};
  // Egna ikoner per nivå och område, så att nivåerna känns olika (Nikola 2026-11-07)
      var NIK_SVG = function (d) { return '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#2E3A46" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>'; };
      // Färgade som startsidans ikoner: mörk kontur, gul/röd/blå/grön fyllning (Nikola 2026-11-07)
      var NIK = {
        tal: ['<span style="color:#D9583B">1</span><span style="color:#3D78B5">2</span><span style="color:#4F8F3F">3</span>', '<svg viewBox="4 0 16 24" width="24" height="34"><text x="12" y="10.6" text-anchor="middle" font-size="11.5" font-weight="800" fill="#D9583B" font-family="Inter,sans-serif">1</text><path d="M7 12.6h10" stroke="#2E3A46" stroke-width="1.8" stroke-linecap="round"/><text x="12" y="23" text-anchor="middle" font-size="11.5" font-weight="800" fill="#3D78B5" font-family="Inter,sans-serif">2</text></svg>', '<span style="color:#3D78B5">10</span><sup style="color:#D9583B;font-size:.6em">3</sup>'],
        alg: ['<i style="color:#D9583B;font-size:1.25em">x</i>', '<span style="color:#3D78B5">2</span><i style="color:#D9583B;font-size:1.25em">x</i>', '<i style="color:#D9583B;font-size:1.25em">x</i><span style="color:#3D78B5">²</span>'],
        geo: [NIK_SVG('<path d="M12 3.5 21 19.5H3z" fill="#E9B949"/>'),
              NIK_SVG('<path d="M4.5 8 12 4l7.5 4L12 12z" fill="#E9B949"/><path d="M4.5 8 12 12v8.5L4.5 16.5z" fill="#5B8DB8"/><path d="M19.5 8 12 12v8.5l7.5-4z" fill="#fff"/>'),
              NIK_SVG('<path d="M4.5 19.5v-15l15 15z" fill="#5B8DB8"/><path d="M4.5 15.5h4v4" fill="#fff"/>')],
        sam: [NIK_SVG('<path d="M5 19 18 6" stroke="#E07A5F" stroke-width="2.6"/><path d="M9.5 5H19v9.5" stroke="#E07A5F" stroke-width="2.6"/>'), '<span style="color:#D9583B">%</span>',
              NIK_SVG('<path d="M4 3.5v16.5h16.5"/><path d="M6.5 17 19 6.5" stroke="#E07A5F" stroke-width="2.4"/><circle cx="10" cy="14" r="1.8" fill="#E9B949"/><circle cx="15.5" cy="9.5" r="1.8" fill="#E9B949"/>')],
        sta: [NIK_SVG('<rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="#fff"/><circle cx="8.5" cy="8.5" r="1.6" fill="#E07A5F" stroke="none"/><circle cx="15.5" cy="15.5" r="1.6" fill="#E07A5F" stroke="none"/><circle cx="15.5" cy="8.5" r="1.6" fill="#E07A5F" stroke="none"/><circle cx="8.5" cy="15.5" r="1.6" fill="#E07A5F" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="#E07A5F" stroke="none"/>'),
              NIK_SVG('<rect x="4" y="12" width="3.4" height="8" fill="#5B8DB8"/><rect x="8.6" y="6" width="3.4" height="14" fill="#E9B949"/><rect x="13.2" y="9" width="3.4" height="11" fill="#E07A5F"/><rect x="17.8" y="4" width="3.4" height="16" fill="#6F9F5A"/><path d="M2.5 20.5h19.5"/>'),
              NIK_SVG('<path d="M5 12l7-5.5M5 12l7 5.5M12 6.5l7-3M12 6.5l7 3M12 17.5l7-3M12 17.5l7 3"/><circle cx="4.5" cy="12" r="2.2" fill="#E9B949"/><circle cx="12" cy="6.5" r="2" fill="#5B8DB8"/><circle cx="12" cy="17.5" r="2" fill="#E07A5F"/><circle cx="19.5" cy="3.5" r="1.4" fill="#fff"/><circle cx="19.5" cy="9.5" r="1.4" fill="#fff"/><circle cx="19.5" cy="14.5" r="1.4" fill="#fff"/><circle cx="19.5" cy="20.5" r="1.4" fill="#fff"/>')]
      };
      var nivaIkon = function (ak, namn) {
      var o = /Algebra/.test(namn) ? 'alg' : /Geometri/.test(namn) ? 'geo' : /Samband|Procent/.test(namn) ? 'sam' : /Statistik|Sannolik/.test(namn) ? 'sta' : 'tal';
      return NIK[o][Math.max(0, Math.min(2, ak - 7))];
    };
    // Nivå 1–3 (åk 7–9 i datan) och områden i samma ordning som åk 7, utan kapitel (Nikola 2026-11-07)
    const NIVA = {7: 1, 8: 2, 9: 3}, RANG = ['tal', 'alg', 'geo', 'sam', 'sta'];
    const OMRNAMN = {tal: 'Tal', alg: 'Algebra', geo: 'Geometri', sam: 'Samband och förändring', sta: 'Statistik och sannolikhet'};
    let h = '<div class="kapblock bg-block"><h2>Vad vill du testa?</h2><p class="bg-btxt">Välj nivå och område. Nivå 1 är grundläggande begrepp och nivå 3 de mest utmanande. Du får ' + ANTAL + ' frågor och ser i slutet vilka ord du kan öva mer på.</p>';
    let flikar = '', delar = '';
    for (const ak of [7, 8, 9]) {
      const kaps = Object.keys(KAPNAMN).filter(x => x.startsWith(ak + ':') && kapOrd(ak, +x.split(':')[1]).length).map(x => +x.split(':')[1])
        .sort((a, b) => RANG.indexOf(omrade(KAPNAMN[ak + ':' + a])) - RANG.indexOf(omrade(KAPNAMN[ak + ':' + b])));
      if (!kaps.length) continue;
      const n = NIVA[ak];
      flikar += `<button type="button" class="bt-flik" data-niva="${ak}">Nivå ${n}<span>${'★★★'.slice(0, n)}</span></button>`;
      delar += `<div class="bt-val bt-niva" data-niva="${ak}">`;
      for (const kap of kaps) {
        const id = ak + ':' + kap, om = omrade(KAPNAMN[id]), c = OM[om], namn = OMRNAMN[om];
        VAL_T[id] = {namn: `Nivå ${n}: ${namn}`, pool: () => kapOrd(ak, kap)};
        delar += `<button type="button" class="bt-ruta" data-t="${id}" style="--o:${c[2]};--od:${c[3]};--ol:${LJ(c[2])}"><span class="bg-rsym">${nivaIkon(ak, namn)}</span><span><b>${esc(namn)}</b><small>${kapOrd(ak, kap).length} begrepp</small></span></button>`;
      }
      // Nivå 3 saknar statistikkapitel: egen ruta med statistik- och sannolikhetsbegreppen från nivå 1–2 (Nikola 2026-11-07)
      if (ak === 9 && !kaps.some(kap => omrade(KAPNAMN[ak + ':' + kap]) === 'sta')) {
        // Samma begrepp som Mattequiz nivå 3 (Statistik + Sannolikhet, quiz 9-5-1 och 9-5-2)
        const QORD = ['Medelvärde', 'Median', 'Typvärde', 'Variationsbredd', 'Frekvens', 'Relativ frekvens', 'Cirkeldiagram', 'Linjediagram', 'Stapeldiagram',
          'Utfall', 'Sannolikhet', 'Slumpmässigt försök', 'Likformig sannolikhetsfördelning', 'Olikformig sannolikhetsfördelning', 'Oberoende händelser', 'Beroende händelser', 'Träddiagram'];
        const c = OM.sta, pool = () => ORD.filter(o => OKF(o) && QORD.includes(o.ord) && o.ak.includes(Math.max(...ORD.filter(x => x.ord === o.ord).flatMap(x => x.ak))));
        VAL_T['9:sta'] = {namn: 'Nivå 3: Statistik och sannolikhet', pool};
        delar += `<button type="button" class="bt-ruta" data-t="9:sta" style="--o:${c[2]};--od:${c[3]};--ol:${LJ(c[2])}"><span class="bg-rsym">${nivaIkon(9, 'Statistik')}</span><span><b>Statistik och sannolikhet</b><small>${new Set(pool().map(o => o.ord)).size} begrepp</small></span></button>`;
      }
      VAL_T['ak' + ak] = {namn: `Hela nivå ${n}`, pool: () => kapOrd(ak)};
      delar += `<button type="button" class="bt-ruta hela" data-t="ak${ak}"><span class="bg-rsym">${n}</span><span><small>Blandat</small><b>Hela nivå ${n}</b><small>${kapOrd(ak).length} begrepp</small></span></button></div>`;
    }
    h += `<div class="bt-flikar">${flikar}</div>${delar}</div>`;
    VAL_T.kitt = {namn: 'Resonemangsord', kitt: true, pool: () => KO.filter(k => k.g !== 'fler' || (k.ms && k.vs))};
    VAL_T.alla = {namn: 'Alla begrepp blandat', pool: () => ORD.filter(OKF)};
    // Meningsstarter: exemplet visas med början bortplockad, eleven väljer rätt meningsstart
    const MS = (window.BG_MENINGAR || []).flatMap(([ik, rub, l]) => l.filter(x => x[2]).map(([b, e, t]) => ({ord: b, ex: e, t, rub})));
    const msDelar = b => b.replace(/[()]/g, '').split('…').map(x => x.trim().replace(/^,\s*/, '').replace(/,$/, '')).filter(x => x);
    // Fel alternativ ska inte kunna passa: starter som följs av en hel sats (… att/eftersom/när/om) blandas bara med starter som följs av något annat.
    const msSats = b => ['att', 'eftersom', 'när', 'om', 'både'].includes(msDelar(b)[0].split(' ').pop().toLowerCase());
    const msFacit = m => m.t.replace('_', msDelar(m.ord)[0]);
    function fragaMS(m) {
      const fel = blanda(MS.filter(x => x !== m && msSats(x.ord) !== msSats(m.ord))).slice(0, 3), alt = blanda([m, ...fel]);
      return {rub: 'Vilken meningsstart passar?', q: esc(m.t).replace('_', '<span class="bg-lucka">?</span>'), lang: true, alt: alt.map(x => esc(x.ord)), ratt: alt.indexOf(m), facit: {ord: m.ord, txt: msFacit(m)}};
    }
    VAL_T.ms = {namn: 'Meningsstarter', ms: true, pool: () => MS};
    h += `<div class="kapblock bg-block"><h2>Mer att testa</h2><p class="bg-btxt">Resonemangsord, meningsstarter och alla begrepp blandat.</p><div class="bt-val"><button type="button" class="bt-ruta" data-t="kitt" style="--o:#7CABB4;--od:#36666E;--ol:#E6F6F4"><span class="bg-rsym">${ikf('lank')}</span><span><small>Resonemangsord</small><b>Ord som hjälper dig att resonera</b><small>${VAL_T.kitt.pool().length} ord</small></span></button>`
      + `<button type="button" class="bt-ruta" data-t="ms" style="--o:#DE9C8F;--od:#8C4A3C;--ol:#FFECE4"><span class="bg-rsym">${ikf('prat')}</span><span><small>Meningsstarter</small><b>Så kan du börja en mening</b><small>${VAL_T.ms.pool().length} meningsstarter</small></span></button>`
      + `<button type="button" class="bt-ruta hela allab" data-t="alla"><span class="bg-rsym">${ikf('stjarna')}</span><span><small>Utmaning</small><b>Alla begrepp blandat</b><small>${VAL_T.alla.pool().length} begrepp</small></span></button></div></div>`;
    const startsida = h;
    let T = null;
    let nivaVald = {1: 7, 2: 8, 3: 9}[new URLSearchParams(location.search).get('niva')] || 7;
    function visaNiva() {
      el.querySelectorAll('.bt-flik').forEach(b => b.classList.toggle('on', +b.dataset.niva === nivaVald));
      el.querySelectorAll('.bt-niva').forEach(d => d.hidden = +d.dataset.niva !== nivaVald);
    }
    function valj() {
      el.innerHTML = startsida; el.querySelectorAll('[data-t]').forEach(b => b.onclick = () => starta_t(b.dataset.t));
      el.querySelectorAll('.bt-flik').forEach(b => b.onclick = () => { nivaVald = +b.dataset.niva; visaNiva(); });
      visaNiva();
    }
    function starta_t(id) {
      const v = VAL_T[id], pool = v.pool(), ord = [];
      for (const o of blanda(pool)) { if (!ord.some(x => x.ord.toLowerCase() === o.ord.toLowerCase())) ord.push(o); if (ord.length === ANTAL) break; }
      T = {id, v, fragor: ord.map(o => v.ms ? fragaMS(o) : v.kitt ? fragaKitt(o) : fragaOrd(o, pool)), nr: 0, ratt: 0, missar: []};
      visa(); el.scrollIntoView({block: 'start'});
    }
    function visa() {
      const f = T.fragor[T.nr], n = T.fragor.length;
      el.innerHTML = `<div class="bt-topp"><span><b>${esc(T.v.namn)}</b></span><span>Fråga ${T.nr + 1} av ${n}</span></div><div class="bt-bar"><i style="width:${T.nr / n * 100}%"></i></div>
        <div class="bt-kort"><h3>${f.rub}</h3>${f.q ? `<p class="bg-fraga">${f.q}</p>` : ''}${f.bild ? `<div class="bt-bild">${f.bild}</div>` : ''}
        <div class="bg-alt${f.lang ? ' kk-lang' : ''}${f.alt.length === 2 ? ' tva' : ''}">${f.alt.map((a, i) => `<button type="button" data-i="${i}">${a}</button>`).join('')}</div>
        <div class="bg-ovfot"><span class="bg-res" aria-live="polite"></span><button type="button" class="bg-nasta" hidden>${T.nr + 1 < n ? 'Nästa fråga →' : 'Se resultatet →'}</button></div></div>
        <button type="button" class="bt-avbryt">← Avbryt testet</button>`;
      el.querySelector('.bt-avbryt').onclick = valj;
      el.querySelectorAll('.bg-alt button').forEach(b => b.onclick = () => {
        const r_ = +b.dataset.i === f.ratt;
        el.querySelectorAll('.bg-alt button').forEach(x => { x.disabled = true; if (+x.dataset.i === f.ratt) x.classList.add('par'); });
        if (r_) T.ratt++; else { b.classList.add('fel'); T.missar.push(f.facit); }
        const l = el.querySelector('.bg-lucka'); if (l && f.lucka) l.textContent = f.lucka;
        const s = el.querySelector('.bg-res'); s.textContent = r_ ? 'Rätt!' : 'Fel. Det gröna svaret är rätt.'; s.className = 'bg-res ' + (r_ ? 'ok' : 'fel');
        const nb = el.querySelector('.bg-nasta'); nb.hidden = false; nb.focus();
        nb.onclick = () => { T.nr++; T.nr < T.fragor.length ? visa() : resultat(); };
      });
    }
    function resultat() {
      const n = T.fragor.length, p = T.ratt / n;
      const m = p >= .9 ? [ik('pokal'), 'Fantastiskt! Du kan begreppen mycket bra.'] : p >= .7 ? [ik('stjarna'), 'Bra jobbat! Du kan de flesta begreppen.'] : p >= .5 ? [ik('bock'), 'Bra kämpat! Öva lite till på orden nedanför.'] : [ik('trappa'), 'Bra att du testade! Läs korten och öva på orden, och gör sedan testet igen.'];
      el.innerHTML = `<div class="bt-kort bt-klar"><div class="bt-stor">${m[0]}</div><p class="bt-poang">${T.ratt} av ${n} rätt</p><p>${m[1]}</p>
        <p class="bt-namn">${esc(T.v.namn)}</p>
        ${T.missar.length ? `<div class="bt-missar"><h3>Ord att öva mer på</h3>${T.missar.map(x => `<div><b>${esc(x.ord)}</b><span>${esc(x.txt)}</span></div>`).join('')}</div>` : ''}
        <div class="bt-knappar"><button type="button" class="bg-nasta" data-a="igen">Gör ett nytt test</button><button type="button" class="bt-sek" data-a="val">Välj ett annat test</button><a class="bt-sek" href="begrepp.html">Träna på begreppen</a></div></div>`;
      el.querySelector('[data-a=igen]').onclick = () => starta_t(T.id);
      el.querySelector('[data-a=val]').onclick = () => { valj(); el.scrollIntoView({block: 'start'}); };
      el.scrollIntoView({block: 'start'});
    }
    valj();
    { const t = new URLSearchParams(location.search).get('t'); if (t && VAL_T[t]) starta_t(t); }  // ?t=ms startar ett test direkt
    window.BT_TEST = {VAL_T, fragaOrd, fragaKitt, fragaMS, MS, ORD, KO};  // för automatiska tester
  }
  const VALEN = [...OMR.map(o => ({typ: 'om', id: o[0], namn: o[1], ljus: o[2], mork: o[3], sym: o[4], antal: ORD.filter(x => x.om === o[0]).length})),
                 ...KG.map(g => ({typ: 'kg', id: g[0], namn: g[1], ljus: g[2], mork: g[3], sym: g[4], txt: g[5], antal: KO.filter(k => k.g === g[0]).length}))];
  const ruta = v => `<button type="button" class="bg-ruta" data-val="${v.typ}:${v.id}" style="--o:${v.ljus};--od:${v.mork};--ol:${LJ(v.ljus)}"><span class="bg-rsym">${symf(v.sym)}</span><b>${esc(v.namn)}</b><small>${v.antal} ord</small></button>`;
  const MSINNEHALL = (window.BG_MENINGAR || []).length ? `<div class="ms-grid">${window.BG_MENINGAR.map(([ik, rub, l]) => `<div class="ms-kort"><h4><span aria-hidden="true">${sym(ik)}</span> ${esc(rub)}</h4><ul>${l.map(([b, e]) => `<li><b>${esc(b)}</b><span>${esc(e)}</span></li>`).join('')}</ul></div>`).join('')}</div>
    ${window.BG_MODELL ? `<div class="ms-modell"><div class="ms-mod"><h4>${ik('trappa')} Så bygger du ett resonemang</h4><p class="ms-pil">${window.BG_MODELL.steg.map(s => `<span>${esc(s[0])}</span>`).join('<i>→</i>')}</p><p class="ms-upg"><b>Exempel:</b> ${esc(window.BG_MODELL.uppgift)}</p><ol>${window.BG_MODELL.steg.map(s => `<li><b>${esc(s[0])}:</b> ${esc(s[1])}</li>`).join('')}</ol></div>
    <div class="ms-chk"><h4>${ik('bock')} Checklista innan du lämnar in</h4><ul>${window.BG_MODELL.check.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div></div>` : ''}` : '';
  const MSANTAL = (window.BG_MENINGAR || []).reduce((n, g) => n + g[2].length, 0);
  const MSRUTA = MSANTAL ? `<button type="button" class="bg-ruta" data-ms="1" style="--o:#DE9C8F;--od:#8C4A3C;--ol:#FFECE4"><span class="bg-rsym">${ikf('prat')}</span><b>Så kan du börja en mening</b><small>${MSANTAL} meningsstarter</small></button>` : '';
  // Testa dig och Mattequiz som egna delar på sidan, nivå 1–3 (Nikola 2026-11-07, som Matematikverkstad)
  const LANK = (href, symb, namn, txt) => `<a class="bg-ruta bg-lankruta" href="${href}" style="--o:#B7D3D7;--od:#2F5459;--ol:#E6F2F3"><span class="bg-rsym">${symb}</span><b>${namn}</b><small>${txt}</small></a>`;
  const NIVALANK = (bas, txt) => [1, 2, 3].map(n => LANK(bas + n, (n === 3 ? '<span class="bg-stj bg-stj3">★<br>★★</span>' : '<span class="bg-stj bg-stj' + n + '">' + '★★★'.slice(0, n) + '</span>'), 'Nivå ' + n, txt)).join('');
  el.innerHTML = `
<label class="bg-sok"><span aria-hidden="true">${ik('sok')}</span><input type="search" placeholder="Sök ord" aria-label="Sök ett ord"></label>
<div id="bg-steg1">
  <div class="kapblock bg-block bg-matte" id="mattebegrepp"><h2><span class="bg-dik">${ik('vinkel')}</span>Mattebegrepp</h2><p class="bg-btxt">Ord som används i matematiken, till exempel nämnare, ekvation och omkrets. Välj ett område, vänd korten och öva.</p>
  <div class="bg-val">${VALEN.filter(v => v.typ === 'om').map(ruta).join('')}</div></div>
  <div class="kapblock bg-block bg-kitt" id="bg-resonera"><h2><span class="bg-dik">${ik('lank')}</span>Resonemangsord</h2><p class="bg-btxt">Ord som hjälper dig att förstå uppgifter och förklara hur du tänker.</p>
  <div class="bg-val">${VALEN.filter(v => v.typ === 'kg').map(ruta).join('')}${MSRUTA}</div></div>
  <div class="kapblock bg-block bg-testa" id="testa-dig"><h2><span class="bg-dik">${ik('mal')}</span>Testa dig</h2><p class="bg-btxt">Kolla vad du kan. Du får 10 frågor och ser i slutet vilka ord du kan öva mer på.</p>
  <div class="bg-val">${NIVALANK('begrepp-test.html?niva=', 'Testa begreppen')}${LANK('begrepp-test.html?t=kitt', ikf('lank'), 'Resonemangsord', 'Testa orden')}${LANK('begrepp-test.html?t=alla', ikf('stjarna'), 'Alla begrepp blandat', 'Utmaning')}</div></div>
  <div class="kapblock bg-block bg-quiz" id="mattequiz"><h2><span class="bg-dik">${ik('stjarna')}</span>Mattequiz</h2><p class="bg-btxt">Tävla om begreppen! Starta samma quiz, svara snabbt och jämför era poäng: en mot en, i par eller i lag.</p>
  <div class="bg-val">${NIVALANK('begrepp-quiz.html?niva=', 'Två quiz per område')}</div></div>
</div>
<div id="bg-steg2" hidden>
  <div class="bg-bar"><button type="button" class="bg-tillbaka">← Byt ord</button><span class="bg-var"></span>
    <div class="bg-lage" role="tablist"><button type="button" data-lage="kort" class="on">${ik('kort')} Läs korten</button><button type="button" data-lage="ova">${ik('mal')} Öva</button></div></div>
  <div id="bg-kortlista"></div><div id="bg-yta"></div>
</div>
<div id="bg-sokres" hidden><p class="bg-hj" id="bg-traff"></p><div id="bg-soklista"></div></div>`;
  let VAL = null, LAGE = 'kort';
  sokruta = $('.bg-sok input');
  function steg(n) { $('#bg-steg1').hidden = n !== 1; $('#bg-steg2').hidden = n !== 2; $('#bg-sokres').hidden = n !== 3; }
  function kittsektion(l, g) { return `<section class="bg-omr"><h2><span class="bg-prick" style="--o:${g[2]};--od:${g[3]};--ol:${LJ(g[2])}">${sym(g[4])}</span>${esc(g[1])} <small>${l.length} ord</small></h2>${g[5] ? `<p class="kk-gtxt">${esc(g[5])}</p>` : ''}<div class="bg-kortrad kk-rad">${l.map(kkort).join('')}</div></section>`; }
  function visaVal() {
    const v = VAL;
    $('.bg-var').innerHTML = `<span class="bg-prick" style="--o:${v.ljus};--od:${v.mork};--ol:${LJ(v.ljus)}">${sym(v.sym)}</span>${esc(v.namn)} <small>· ${LAGE === 'kort' ? 'Läs korten' : 'Öva'}</small>`;
    el.querySelectorAll('[data-lage]').forEach(b => b.classList.toggle('on', b.dataset.lage === LAGE));
    $('#bg-kortlista').hidden = LAGE !== 'kort'; $('#bg-yta').hidden = LAGE !== 'ova';
    if (LAGE === 'kort') {
      if (v.typ === 'om') kortlista(ORD.filter(o => o.om === v.id), $('#bg-kortlista'));
      else $('#bg-kortlista').innerHTML = kittsektion(KO.filter(k => k.g === v.id), KGM[v.id]);
      const h = $('#bg-kortlista h2'); if (h) h.remove();  // namnet står redan i raden ovanför
    } else ova();
  }
  // Öva: sidan väljer själv en övning som passar orden och blandar typerna
  function ova() {
    const v = VAL; if (!v) return;
    if (v.typ === 'om') {
      F.om = v.id; F.ak = 0;
      const typer = ['mening', 'udda', 'udda']; if (ORD.filter(o => o.om === v.id && BILDOK(o)).length >= 3) typer.push('bild', 'bild');
      if (MENING.filter(m => m.om === v.id && m.andra.length >= 3).length) typer.push('mening');
      TYP = val(typer); ({bild, mening, udda})[TYP]();
    } else {
      KF = v.id; KTYP = v.id === 'fler' ? 'fler' : val(['lucka', 'betyd']); kstart();
    }
  }
  el.querySelectorAll('[data-ms]').forEach(b => b.onclick = () => { VAL = null; steg(2); $('.bg-lage').hidden = true; $('.bg-var').innerHTML = `<span class="bg-prick" style="--o:#DE9C8F;--od:#8C4A3C;--ol:#FFECE4">${ik('prat')}</span>Så kan du börja en mening <a class="ms-ovaknapp" href="begrepp-test.html?t=ms">${ik('mal')} Öva</a>`; $('#bg-kortlista').innerHTML = `<div class="ms-vy">${MSINNEHALL}</div><a class="ms-ova" href="begrepp-test.html?t=ms"><span aria-hidden="true">${ik('mal')}</span><span><b>Öva på meningsstarterna</b><small>10 frågor: välj den meningsstart som passar i meningen.</small></span><span class="ms-ovapil">Öva →</span></a>`; $('#bg-yta').innerHTML = ''; el.scrollIntoView({block: 'start'}); });
  el.querySelectorAll('[data-val]').forEach(b => b.onclick = () => { $('.bg-lage').hidden = false; const [t, id] = b.dataset.val.split(':'); VAL = VALEN.find(x => x.typ === t && x.id === id); LAGE = 'kort'; steg(2); visaVal(); el.scrollIntoView({block: 'start'}); });
  el.querySelectorAll('[data-lage]').forEach(b => b.onclick = () => { LAGE = b.dataset.lage; visaVal(); });
  $('.bg-tillbaka').onclick = () => { VAL = null; steg(1); };
  // Sök bland alla ord, både mattebegrepp och resonemangsord
  const sok = () => {
    const q = norm(sokruta.value); if (q === F.sok) return; F.sok = q;
    if (!q) return steg(VAL ? 2 : 1);
    steg(3);
    const n = o => norm(o.ord), a = ORD.filter(o => n(o).startsWith(q)), b = ORD.filter(o => !a.includes(o) && n(o).includes(q)), c = ORD.filter(o => !a.includes(o) && !b.includes(o) && norm(o.forkl).includes(q));
    const om = [...a, ...b, ...c], ko = KO.filter(k => n(k).includes(q));
    $('#bg-traff').textContent = om.length + ko.length ? `${om.length + ko.length} ord hittades för ”${sokruta.value.trim()}”. Klicka på ett kort för att vända det.` : `Inget ord hittades för ”${sokruta.value.trim()}”. Prova en kortare del av ordet.`;
    const lista = $('#bg-soklista'); lista.innerHTML = '';
    if (om.length) { kortlista(om, lista); }
    if (ko.length) lista.insertAdjacentHTML('beforeend', kittsektion(ko, ['', 'Resonemangsord', '#7CABB4', '#36666E', '🔗', '']));
  };
  ['input', 'keyup', 'change', 'search'].forEach(h => sokruta.addEventListener(h, sok));
  // Från startsidan: ?flik=kitt hoppar till Resonemangsord
  const q = new URLSearchParams(location.search);
  // ?flik=mat / ?flik=kitt: visa bara den delen (genvägar från startsidan)
  const bara = {mat: '.bg-kitt,.bg-testa,.bg-quiz', kitt: '.bg-matte,.bg-testa,.bg-quiz'}[q.get('flik')];
  if (bara) {
    el.querySelectorAll(bara).forEach(x => x.hidden = true);
    // Sökrutan längst ner på Mattebegrepp- och Resonemangsord-sidan (Nikola 2026-11-04)
    $('#bg-steg2').insertAdjacentHTML('afterend', '<h3 class="bg-del bg-sokrub"><span class="bg-dik">' + ik('sok') + '</span>Sök ett ord <small>Hittar du inte ordet? Sök bland alla begrepp och resonemangsord.</small></h3>');
    $('.bg-sokrub').after($('.bg-sok'));
    setTimeout(() => el.scrollIntoView({block: 'start'}), 50);
  }
  if (q.get('flik') === 'sok') setTimeout(() => { sokruta.scrollIntoView({block: 'center'}); sokruta.focus(); }, 50);
  window.BG_ANTAL = ORD.length;
})();
