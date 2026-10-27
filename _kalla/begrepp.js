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

  // Bygg ordlistan: bara bokens begrepp (BG_BOK i begrepp-bok.js, Nikolas begreppslistor, ordagrant)
  const ORD = [], NYCKEL = {}, MENING = [], KAPNAMN = {};
  const stam = s => s.toLowerCase().replace(/[^a-zåäö ]/g, '').slice(0, 5);
  const text = h => { const d = document.createElement('div'); d.innerHTML = h; d.querySelectorAll('img').forEach(i => i.remove()); return d.textContent.replace(/\s+/g, ' ').trim(); };
  for (const b of window.BG_BOK || []) {
    const id = b.om + ':' + b.ord.toLowerCase();
    if (NYCKEL[id]) { if (!NYCKEL[id].ak.includes(b.ak)) NYCKEL[id].ak.push(b.ak); NYCKEL[id].kaps.push(b.ak + ':' + b.kap); continue; }
    const o = {id, kaps: [b.ak + ':' + b.kap], ord: b.ord, delar: b.ord.split(' / '), forkl: text(b.besk), forklHtml: b.besk, om: b.om, ak: [b.ak], kap: `Åk ${b.ak} kap ${b.kap}`, bild: b.ex, exText: text(b.ex)};
    ORD.push(o); NYCKEL[id] = o;
  }
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
  const hogt = s => `<button class="bg-hogt" type="button" data-tal="${esc(s)}" aria-label="Lyssna på ordet" title="Lyssna">🔊</button>`;
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
  const kort = o => {
    const c = OM[o.om];
    return `<div class="bk" tabindex="0" role="button" aria-label="${esc(o.ord)}, vänd kortet" style="--o:${c[2]};--od:${c[3]}"><div class="bk-in">
<div class="bk-fram"><h3${o.ord.length > 13 ? ' class="lang"' : ''}>${esc(o.ord)}</h3></div>
<div class="bk-bak"><div class="bk-topp"><h4>${esc(o.ord)}</h4>${hogt(o.ord)}</div>${o.bild ? `<div class="bk-bild"><span>${o.bild}</span></div>` : ''}<div class="bk-text">${o.forklHtml}</div></div></div></div>`;
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
  const KG = window.BG_KITT_GRUPPER || [], KO = window.BG_KITT || [], KGM = Object.fromEntries(KG.map(g => [g[0], g]));
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
    return `<div class="bk kw" tabindex="0" role="button" aria-label="${esc(k.ord)}, vänd kortet" style="--o:${g[2]};--od:${g[3]}"><div class="bk-in">
<div class="bk-fram"><span class="kk-grupp">${g[4]} ${esc(g[1])}</span><h3>${esc(k.ord)}</h3>${k.bok ? '' : '<span class="kk-extra">Extra ord</span>'}</div>
<div class="bk-bak"><div class="bk-topp"><h4>${esc(k.ord)}</h4>${hogt(k.ord)}</div>${bak}</div></div></div>`;
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
        + `<div class="bg-alt"><button type="button" data-i="0">🏠 Vardag</button><button type="button" data-i="1">📐 Matte</button></div>` + nasta();
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
        return {rub: 'Vardag eller matte?', q: `”${markera(mat ? k.ms : k.vs, re)}”<br><small class="kk-fr">Vilken betydelse har ordet <b>${esc(k.ord)}</b> här?</small>`, alt: ['🏠 Vardag', '📐 Matte'], ratt: mat ? 1 : 0, facit};
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
    // Vad kan man testa? Åk 7–9 per kapitel, resonemangsord och allt blandat
    const kapOrd = (ak, kap) => ORD.filter(o => OKF(o) && o.kaps.some(x => kap ? x === ak + ':' + kap : x.startsWith(ak + ':')));
    const VAL_T = {};
    let h = '<h2 class="bg-rub">Vad vill du testa?</h2><p class="bt-intro">Du får ' + ANTAL + ' frågor. Svara så gott du kan. När du är klar ser du ditt resultat och vilka ord du kan öva mer på.</p>';
    for (const ak of [7, 8, 9]) {
      const kaps = Object.keys(KAPNAMN).filter(x => x.startsWith(ak + ':') && kapOrd(ak, +x.split(':')[1]).length).map(x => +x.split(':')[1]).sort();
      if (!kaps.length) continue;
      h += `<h3 class="bg-del">Årskurs ${ak}</h3><div class="bt-val">`;
      for (const kap of kaps) {
        const id = ak + ':' + kap, c = OM[omrade(KAPNAMN[id])]; VAL_T[id] = {namn: `Åk ${ak} kapitel ${kap}: ${KAPNAMN[id]}`, pool: () => kapOrd(ak, kap)};
        h += `<button type="button" class="bt-ruta" data-t="${id}" style="--o:${c[2]};--od:${c[3]}"><span class="bg-rsym">${c[4]}</span><span><small>Kapitel ${kap}</small><b>${esc(KAPNAMN[id])}</b><small>${kapOrd(ak, kap).length} begrepp</small></span></button>`;
      }
      VAL_T['ak' + ak] = {namn: `Hela årskurs ${ak}`, pool: () => kapOrd(ak)};
      h += `<button type="button" class="bt-ruta hela" data-t="ak${ak}"><span class="bg-rsym">${ak}</span><span><small>Blandat</small><b>Hela åk ${ak}</b><small>${kapOrd(ak).length} begrepp</small></span></button></div>`;
    }
    VAL_T.kitt = {namn: 'Resonemangsord', kitt: true, pool: () => KO.filter(k => k.g !== 'fler' || (k.ms && k.vs))};
    VAL_T.alla = {namn: 'Alla begrepp blandat', pool: () => ORD.filter(OKF)};
    h += `<h3 class="bg-del">Mer</h3><div class="bt-val"><button type="button" class="bt-ruta" data-t="kitt" style="--o:#D5E3F0;--od:#1E4A73"><span class="bg-rsym">🔗</span><span><small>Resonemangsord</small><b>Ord som hjälper dig att resonera</b><small>${VAL_T.kitt.pool().length} ord</small></span></button>`
      + `<button type="button" class="bt-ruta hela" data-t="alla"><span class="bg-rsym">★</span><span><small>Utmaning</small><b>Alla begrepp blandat</b><small>${VAL_T.alla.pool().length} begrepp</small></span></button></div>`;
    const startsida = h;
    let T = null;
    function valj() { el.innerHTML = startsida; el.querySelectorAll('[data-t]').forEach(b => b.onclick = () => starta_t(b.dataset.t)); }
    function starta_t(id) {
      const v = VAL_T[id], pool = v.pool(), ord = [];
      for (const o of blanda(pool)) { if (!ord.some(x => x.ord.toLowerCase() === o.ord.toLowerCase())) ord.push(o); if (ord.length === ANTAL) break; }
      T = {id, v, fragor: ord.map(o => v.kitt ? fragaKitt(o) : fragaOrd(o, pool)), nr: 0, ratt: 0, missar: []};
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
      const m = p >= .9 ? ['🏆', 'Fantastiskt! Du kan begreppen mycket bra.'] : p >= .7 ? ['🌟', 'Bra jobbat! Du kan de flesta begreppen.'] : p >= .5 ? ['👍', 'Bra kämpat! Öva lite till på orden nedanför.'] : ['💪', 'Bra att du testade! Läs korten och öva på orden, och gör sedan testet igen.'];
      el.innerHTML = `<div class="bt-kort bt-klar"><div class="bt-stor">${m[0]}</div><p class="bt-poang">${T.ratt} av ${n} rätt</p><p>${m[1]}</p>
        <p class="bt-namn">${esc(T.v.namn)}</p>
        ${T.missar.length ? `<div class="bt-missar"><h3>Ord att öva mer på</h3>${T.missar.map(x => `<div><b>${esc(x.ord)}</b><span>${esc(x.txt)}</span></div>`).join('')}</div>` : ''}
        <div class="bt-knappar"><button type="button" class="bg-nasta" data-a="igen">Gör ett nytt test</button><button type="button" class="bt-sek" data-a="val">Välj ett annat test</button><a class="bt-sek" href="begrepp.html">Träna på begreppen</a></div></div>`;
      el.querySelector('[data-a=igen]').onclick = () => starta_t(T.id);
      el.querySelector('[data-a=val]').onclick = () => { valj(); el.scrollIntoView({block: 'start'}); };
      el.scrollIntoView({block: 'start'});
    }
    valj();
    window.BT_TEST = {VAL_T, fragaOrd, fragaKitt, ORD, KO};  // för automatiska tester
  }
  const VALEN = [...OMR.map(o => ({typ: 'om', id: o[0], namn: o[1], ljus: o[2], mork: o[3], sym: o[4], antal: ORD.filter(x => x.om === o[0]).length})),
                 ...KG.map(g => ({typ: 'kg', id: g[0], namn: g[1], ljus: g[2], mork: g[3], sym: g[4], txt: g[5], antal: KO.filter(k => k.g === g[0]).length}))];
  const ruta = v => `<button type="button" class="bg-ruta" data-val="${v.typ}:${v.id}" style="--o:${v.ljus};--od:${v.mork}"><span class="bg-rsym">${v.sym}</span><b>${esc(v.namn)}</b><small>${v.antal} ord</small></button>`;
  el.innerHTML = `
<label class="bg-sok"><span aria-hidden="true">🔍</span><input type="search" placeholder="Sök ett ord, t.ex. nämnare eller eftersom" aria-label="Sök ett ord"></label>
<div id="bg-steg1">
  <a class="bt-lank" href="begrepp-test.html"><span aria-hidden="true">🏁</span><span><b>Testa dig</b> Kolla vad du kan om begreppen. 10 frågor och resultat på slutet.</span><span class="bt-pil">Testa dig →</span></a>
  <h2 class="bg-rub">Vilka ord vill du träna på?</h2>
  <div class="bg-matte"><h3 class="bg-del">📐 Mattebegrepp <small>Ord som används i matematiken, till exempel nämnare, ekvation och omkrets</small></h3>
  <div class="bg-val">${VALEN.filter(v => v.typ === 'om').map(ruta).join('')}</div></div>
  <div class="bg-kitt"><h3 class="bg-del" id="bg-resonera">🔗 Resonemangsord <small>Ord som hjälper dig att förstå uppgifter och förklara hur du tänker</small></h3>
  <div class="bg-val">${VALEN.filter(v => v.typ === 'kg').map(ruta).join('')}</div></div>
  <p class="bg-allaord" hidden><a class="knapp2 sek" href="begrepp.html">← Visa alla ord</a></p>
  <p class="bg-saknar">💬 Saknar du ett ord, eller förstår du inte en förklaring? Fråga din lärare.</p>
</div>
<div id="bg-steg2" hidden>
  <div class="bg-bar"><button type="button" class="bg-tillbaka">← Byt ord</button><span class="bg-var"></span>
    <div class="bg-lage" role="tablist"><button type="button" data-lage="kort" class="on">🃏 Läs korten</button><button type="button" data-lage="ova">🎯 Öva</button></div></div>
  <div id="bg-kortlista"></div><div id="bg-yta"></div>
</div>
<div id="bg-sokres" hidden><p class="bg-hj" id="bg-traff"></p><div id="bg-soklista"></div></div>`;
  let VAL = null, LAGE = 'kort';
  sokruta = $('.bg-sok input');
  function steg(n) { $('#bg-steg1').hidden = n !== 1; $('#bg-steg2').hidden = n !== 2; $('#bg-sokres').hidden = n !== 3; }
  function kittsektion(l, g) { return `<section class="bg-omr"><h2><span class="bg-prick" style="background:${g[2]}">${g[4]}</span>${esc(g[1])} <small>${l.length} ord</small></h2>${g[5] ? `<p class="kk-gtxt">${esc(g[5])}</p>` : ''}<div class="bg-kortrad kk-rad">${l.map(kkort).join('')}</div></section>`; }
  function visaVal() {
    const v = VAL;
    $('.bg-var').innerHTML = `<span class="bg-prick" style="background:${v.ljus}">${v.sym}</span>${esc(v.namn)} <small>· ${LAGE === 'kort' ? 'Läs korten' : 'Öva'}</small>`;
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
  el.querySelectorAll('[data-val]').forEach(b => b.onclick = () => { const [t, id] = b.dataset.val.split(':'); VAL = VALEN.find(x => x.typ === t && x.id === id); LAGE = 'kort'; steg(2); visaVal(); el.scrollIntoView({block: 'start'}); });
  el.querySelectorAll('[data-lage]').forEach(b => b.onclick = () => { LAGE = b.dataset.lage; visaVal(); });
  $('.bg-tillbaka').onclick = () => { VAL = null; steg(1); };
  // Sök bland alla ord, både mattebegrepp och resonemangsord
  const sok = () => {
    const q = norm(sokruta.value); if (q === F.sok) return; F.sok = q;
    if (!q) return steg(VAL ? 2 : 1);
    steg(3);
    const n = o => norm(o.ord), a = ORD.filter(o => n(o).startsWith(q)), b = ORD.filter(o => !a.includes(o) && n(o).includes(q)), c = ORD.filter(o => !a.includes(o) && !b.includes(o) && norm(o.forkl).includes(q));
    const om = [...a, ...b, ...c], ko = KO.filter(k => n(k).includes(q));
    $('#bg-traff').textContent = om.length + ko.length ? `${om.length + ko.length} ord hittades för ”${sokruta.value.trim()}”. Klicka på ett kort för att vända det.` : `Inget ord hittades för ”${sokruta.value.trim()}”. Prova en kortare del av ordet. Saknar du ett ord, eller förstår du inte en förklaring? Fråga din lärare.`;
    const lista = $('#bg-soklista'); lista.innerHTML = '';
    if (om.length) { kortlista(om, lista); }
    if (ko.length) lista.insertAdjacentHTML('beforeend', kittsektion(ko, ['', 'Resonemangsord', '#D5E3F0', '#1E4A73', '🔗', '']));
  };
  ['input', 'keyup', 'change', 'search'].forEach(h => sokruta.addEventListener(h, sok));
  // Från startsidan: ?flik=kitt hoppar till Resonemangsord
  const q = new URLSearchParams(location.search);
  // ?flik=mat / ?flik=kitt: visa bara den delen (genvägar från startsidan)
  const bara = {mat: '.bg-kitt', kitt: '.bg-matte'}[q.get('flik')];
  if (bara) { $(bara).hidden = true; $('.bg-allaord').hidden = false; setTimeout(() => el.scrollIntoView({block: 'start'}), 50); }
  if (q.get('flik') === 'sok') setTimeout(() => { sokruta.scrollIntoView({block: 'center'}); sokruta.focus(); }, 50);
  window.BG_ANTAL = ORD.length;
})();
