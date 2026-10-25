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
    ['tal', 'Taluppfattning', '#E07A5F', '#9A4630', '½'],
    ['alg', 'Algebra', '#4F9BA8', '#1E5560', 'x'],
    ['geo', 'Geometri', '#E9B949', '#7A5A12', '△'],
    ['sam', 'Samband och förändring', '#8A9A5B', '#4F5A2E', '%'],
    ['sta', 'Sannolikhet och statistik', '#A97CB8', '#5A3A6B', '⚄']];
  const OM = Object.fromEntries(OMR.map(o => [o[0], o]));
  const omrade = n => (n = n.toLowerCase(), /algebra/.test(n) ? 'alg' : /geometri/.test(n) ? 'geo' : /samband|procent/.test(n) ? 'sam' : /statistik|sannolik/.test(n) ? 'sta' : 'tal');

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
        const o = {id, ord, forkl, om, ak: [ak], kap: `Åk ${ak} kap ${kap}`, bild: e ? e[0] : '', exText: e ? e[2] : ''};
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
  const passar = o => (!F.ak || o.ak.includes(F.ak)) && (!F.om || o.om === F.om);
  const urval = () => ORD.filter(passar);

  el.innerHTML = `
<div class="bg-filter">
  <div class="bg-grupp"><span>Årskurs</span>${[['Alla', 0], ['Åk 7', 7], ['Åk 8', 8], ['Åk 9', 9]].map(([t, v]) => `<button type="button" data-ak="${v}" class="${v ? '' : 'on'}">${t}</button>`).join('')}</div>
  <div class="bg-grupp"><span>Område</span><button type="button" data-om="" class="on">Alla</button>${OMR.map(o => `<button type="button" data-om="${o[0]}"><i style="background:${o[2]}"></i>${o[1]}</button>`).join('')}</div>
</div>
<div class="bg-flikar" role="tablist">
  <button type="button" data-flik="kort" class="on"><span class="em">🃏</span> Begreppskort</button>
  <button type="button" data-flik="ova"><span class="em">🎯</span> Öva</button>
  <button type="button" data-flik="svara"><span class="em">⭐</span> Mina svåra ord <b id="bg-antal">0</b></button>
</div>
<div id="bg-kort"><label class="bg-sok"><span aria-hidden="true">🔍</span><input type="search" placeholder="Sök ett ord, t.ex. nämnare" aria-label="Sök ett ord"></label><p class="bg-hj">Klicka på ett kort för att vända det.</p><div id="bg-kortlista"></div></div>
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
  $('.bg-sok input').oninput = e => { F.sok = e.target.value.trim().toLowerCase(); kortlista(); };
  let FLIK = 'kort', TYP = '';
  el.querySelectorAll('[data-flik]').forEach(b => b.onclick = () => { FLIK = b.dataset.flik; el.querySelectorAll('[data-flik]').forEach(x => x.classList.toggle('on', x === b)); visa(); });
  el.querySelectorAll('[data-typ]').forEach(b => b.onclick = () => { TYP = b.dataset.typ; el.querySelectorAll('[data-typ]').forEach(x => x.classList.toggle('on', x === b)); starta(); });

  // ---------- Begreppskort ----------
  const kort = o => {
    const c = OM[o.om];
    return `<div class="bk" tabindex="0" role="button" aria-label="${esc(o.ord)}, vänd kortet" style="--o:${c[2]};--od:${c[3]}"><div class="bk-in">
<div class="bk-fram"><div class="bk-topp"><span class="bk-om">${c[4]} ${c[1]}</span>${hogt(o.ord)}</div><h3>${esc(o.ord)}</h3>
${o.bild ? `<div class="bk-bild"><span>${o.bild}</span></div>` : `<div class="bk-bild tom" aria-hidden="true">${c[4]}</div>`}<span class="bk-ak">${o.ak.map(a => 'Åk ' + a).join(' · ')}</span></div>
<div class="bk-bak"><h3>${esc(o.ord)}</h3><p>${esc(o.forkl)}.</p>${o.exText ? `<p class="bk-ex"><b>Exempel:</b> ${esc(o.exText)}</p>` : ''}<span class="bk-vand">↺ Vänd tillbaka</span></div></div></div>`;
  };
  function kortlista(lista, mal) {
    lista = lista || urval().filter(o => !F.sok || o.ord.toLowerCase().includes(F.sok) || o.forkl.toLowerCase().includes(F.sok));
    let h = '';
    for (const o of OMR) {
      const l = lista.filter(x => x.om === o[0]);
      if (l.length) h += `<section class="bg-omr"><h2><span class="bg-prick" style="background:${o[2]}">${o[4]}</span>${o[1]} <small>${l.length} ord</small></h2><div class="bg-kortrad">${l.map(kort).join('')}</div></section>`;
    }
    (mal || $('#bg-kortlista')).innerHTML = h || '<p class="bg-tom">Inga ord matchar. Prova ett annat filter.</p>';
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
