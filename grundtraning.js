// Grundträning: huvudräkning, gångertabell och klockan. Gemensam för alla årskurser, inget sparas.
// Varje övning har val (nivåer eller tabeller) och en generator som ger en fråga:
//   {typ:'tal', q, svar, ledtrad}       eleven skriver ett tal
//   {typ:'val', q, alt:[rätt, ...], ledtrad}  eleven väljer bland knappar
//   {typ:'tid', q, svar:[h, m], ledtrad}  eleven skriver en tid (tt:mm)
//   {typ:'langd', q, svar: minuter, ledtrad} eleven skriver timmar och minuter
//   {typ:'stall', q, mal: minuter, steg, ledtrad} eleven ställer visarna
(function () {
  const el = document.getElementById('trana');
  if (!el) return;
  const r = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const val = a => a[r(0, a.length - 1)];
  const blanda = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = r(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sv = x => String(Math.round(x * 1e6) / 1e6).replace('.', ',');
  const pad = n => String(n).padStart(2, '0');
  const tt = (h, m) => pad(((h % 24) + 24) % 24) + ':' + pad(m);
  const h12 = h => ((h % 12) + 12) % 12 || 12;
  const tal = s => { s = String(s).trim().replace(/\s/g, '').replace(',', '.').replace('−', '-'); return s === '' ? NaN : Number(s); };
  const BRA = ['Rätt! 🎉', 'Snyggt! ✅', 'Precis! 👏', 'Helt rätt! 💪'];
  const RUNDA = 10;

  // ---------- Klockan ----------
  const ORD = {5: 'fem över', 10: 'tio över', 15: 'kvart över', 20: 'tjugo över', 25: 'fem i halv', 30: 'halv', 35: 'fem över halv', 40: 'tjugo i', 45: 'kvart i', 50: 'tio i', 55: 'fem i'};
  const fras = (h, m) => m === 0 ? `klockan ${h12(h)}` : `${ORD[m]} ${h12(m < 25 ? h : h + 1)}`;
  const del = h => h < 5 ? 'på natten' : h < 10 ? 'på morgonen' : h < 12 ? 'på förmiddagen' : h < 18 ? 'på eftermiddagen' : 'på kvällen';
  const fem = m => ((m % 60) + 60) % 60;
  function klocka(h, m, cls = '') {
    let t = '';
    for (let i = 0; i < 60; i++) {
      const a = i * Math.PI / 30, r1 = i % 5 ? 85 : 79;
      t += `<line x1="${(100 + r1 * Math.sin(a)).toFixed(1)}" y1="${(100 - r1 * Math.cos(a)).toFixed(1)}" x2="${(100 + 90 * Math.sin(a)).toFixed(1)}" y2="${(100 - 90 * Math.cos(a)).toFixed(1)}" class="${i % 5 ? 'kl-s' : 'kl-t'}"/>`;
    }
    for (let i = 1; i <= 12; i++) {
      const a = i * Math.PI / 6;
      t += `<text x="${(100 + 64 * Math.sin(a)).toFixed(1)}" y="${(100 - 64 * Math.cos(a) + 6.5).toFixed(1)}">${i}</text>`;
    }
    return `<svg class="klocka ${cls}" viewBox="0 0 200 200" role="img" aria-label="Analog klocka"><circle cx="100" cy="100" r="95" class="kl-y"/>${t}
      <g class="kl-h" transform="rotate(${((h % 12) + m / 60) * 30} 100 100)"><line x1="100" y1="112" x2="100" y2="52"/></g>
      <g class="kl-m" transform="rotate(${m * 6} 100 100)"><line x1="100" y1="116" x2="100" y2="22"/></g><circle cx="100" cy="100" r="6" class="kl-c"/></svg>`;
  }
  // Fyra svarsalternativ: rätt svar först, sedan tre olika felaktiga.
  const fyra = (ratt, kandidater) => [ratt, ...blanda([...new Set(kandidater)].filter(x => x !== ratt)).slice(0, 3)];
  function tidslinje(a, b) {
    const x = t => 40 + (t - a) / (b - a) * 520;
    let s = '';
    for (let t = Math.ceil(a / 60) * 60; t < b; t += 60) if (x(t) - x(a) > 70 && x(b) - x(t) > 70) s += `<line x1="${x(t)}" y1="44" x2="${x(t)}" y2="66" class="tl-h"/><text x="${x(t)}" y="88" class="tl-ht">${tt(t / 60, 0)}</text>`;
    return `<svg class="tidslinje" viewBox="0 0 600 100" aria-hidden="true"><path d="M40 20 Q300 -6 560 20" class="tl-b"/><text x="300" y="16" class="tl-q">?</text>
      <line x1="40" y1="55" x2="560" y2="55" class="tl-l"/>${s}
      <circle cx="40" cy="55" r="8" class="tl-p"/><circle cx="560" cy="55" r="8" class="tl-p"/>
      <text x="40" y="88" class="tl-t">${tt(Math.floor(a / 60), a % 60)}</text><text x="560" y="88" class="tl-t">${tt(Math.floor(b / 60), b % 60)}</text></svg>`;
  }
  function tiorad(a) {  // tioruta med a fyllda prickar
    let s = '';
    for (let i = 0; i < 10; i++) s += `<circle cx="${22 + (i % 5) * 36}" cy="${i < 5 ? 22 : 58}" r="13" class="${i < a ? 'tr-f' : 'tr-t'}"/>`;
    return `<svg class="tioruta" viewBox="0 0 188 80" aria-hidden="true"><rect x="2" y="2" width="184" height="76" rx="10" class="tr-r"/>${s}</svg>`;
  }

  // ---------- Övningarna ----------
  const NIVA = (a, b, c) => [['1', 'Nivå 1', a], ['2', 'Nivå 2', b], ['3', 'Nivå 3', c]];
  const tus = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const d1 = x => Math.round(x * 1e6) / 1e6;  // undvik avrundningsfel med decimaltal
  // De fyra räknesätten: eleven väljer räknesätt och nivå. Blandat har värdena '1'–'3' (som förut).
  const RS_NAMN = {bland: ['Blandat', ['plus och minus inom 20', 'inom 100, gånger och delat', 'tiotal, hundratal och decimaltal']],
    plus: ['Addition', ['inom 20', 'tvåsiffriga tal', 'hundratal']], minus: ['Subtraktion', ['inom 20', 'tvåsiffriga tal', 'hundratal och 1000']],
    ganger: ['Multiplikation', ['2, 5 och 10', 'hela tabellen', 'tiotal och tvåsiffriga tal']], delat: ['Division', ['med 2, 5 och 10', 'hela tabellen', 'tiotal och tvåsiffriga tal']]};
  const RS_VAL = Object.entries(RS_NAMN).flatMap(([op, [namn, niv]]) => niv.map((t, i) => [op === 'bland' ? String(i + 1) : `${op}-${i + 1}`, `${namn}, nivå ${i + 1}`, t]));
  const RS = {
    plus(n) {
      if (n === '1') { const a = r(3, 12), b = r(2, 20 - a); return {typ: 'tal', q: `${a} + ${b} =`, svar: a + b, ledtrad: a + b > 10 ? `Fyll först upp till 10: ${a} + ${10 - a} = 10. Lägg sedan till resten.` : 'Börja med det största talet och räkna vidare.'}; }
      if (n === '2') { const a = r(12, 68), b = r(12, 99 - a); return {typ: 'tal', q: `${a} + ${b} =`, svar: a + b, ledtrad: `Ta tiotalen först: ${a - a % 10} + ${b - b % 10} = ${a - a % 10 + b - b % 10}. Lägg sedan till entalen ${a % 10} och ${b % 10}.`}; }
      const p = r(1, 6) * 100 + r(1, 9) * 10, q = r(1, 3) * 100 + r(1, 9) * 10;
      return {typ: 'tal', q: `${p} + ${q} =`, svar: p + q, ledtrad: `Ta hundratalen först: ${p - p % 100} + ${q - q % 100} = ${p - p % 100 + q - q % 100}. Lägg sedan till ${p % 100} och ${q % 100}.`};
    },
    minus(n) {
      if (n === '1') { const c = r(11, 20), d = r(2, c - 1); return {typ: 'tal', q: `${c} − ${d} =`, svar: c - d, ledtrad: c - d < d ? `Räkna uppåt från ${d} till ${c}.` : `Ta först bort ner till 10: ${c} − ${c - 10} = 10. Ta sedan bort resten.`}; }
      if (n === '2') { const c = r(41, 99), d = r(11, c - 10); return {typ: 'tal', q: `${c} − ${d} =`, svar: c - d, ledtrad: `Ta bort tiotalen först: ${c} − ${d - d % 10} = ${c - d + d % 10}. Ta sedan bort ${d % 10}.`}; }
      const a = r(2, 8), b = r(1, 9);
      return val([
        {typ: 'tal', q: `1000 − ${a * 100 + b * 10} =`, svar: 1000 - a * 100 - b * 10, ledtrad: `Tänk: ${a * 100 + b * 10} + ? = 1000. Fyll först upp till ${a * 100 + 100}.`},
        (() => { const p = r(4, 9) * 100 + r(1, 9) * 10, q = r(1, 3) * 100 + r(1, 9) * 10; return {typ: 'tal', q: `${p} − ${q} =`, svar: p - q, ledtrad: `Ta bort hundratalen först: ${p} − ${q - q % 100} = ${p - q + q % 100}. Ta sedan bort ${q % 100}.`}; })()]);
    },
    ganger(n) {
      if (n === '1') { const a = val([2, 5, 10]), b = r(1, 10), [x, y] = Math.random() < .5 ? [a, b] : [b, a]; return {typ: 'tal', q: `${x} · ${y} =`, svar: x * y, ledtrad: multTips(x, y)}; }
      if (n === '2') { const x = r(2, 9), y = r(2, 9); return {typ: 'tal', q: `${x} · ${y} =`, svar: x * y, ledtrad: multTips(x, y)}; }
      const a = r(2, 9), b = r(2, 9), t = r(11, 29);
      return val([
        {typ: 'tal', q: `${a * 10} · ${b} =`, svar: a * b * 10, ledtrad: `Räkna ${a} · ${b} och lägg sedan till en nolla.`},
        {typ: 'tal', q: `${a * 10} · ${b * 10} =`, svar: a * b * 100, ledtrad: `Räkna ${a} · ${b} och lägg sedan till två nollor.`},
        {typ: 'tal', q: `${t} · ${b} =`, svar: t * b, ledtrad: `Dela upp ${t} i ${t - t % 10} och ${t % 10}: ${t - t % 10} · ${b} + ${t % 10} · ${b}.`}]);
    },
    delat(n) {
      if (n === '1') { const d = val([2, 5, 10]), k = r(1, 10); return {typ: 'tal', q: `${d * k} / ${d} =`, svar: k, ledtrad: `Tänk: ${d} · ? = ${d * k}.`}; }
      if (n === '2') { const d = r(2, 9), k = r(2, 9); return {typ: 'tal', q: `${d * k} / ${d} =`, svar: k, ledtrad: `Tänk: ${d} · ? = ${d * k}.`}; }
      const a = r(2, 9), b = r(2, 9), d = r(2, 4), k = r(11, 24);
      return val([
        {typ: 'tal', q: `${a * b * 100} / ${a * 10} =`, svar: b * 10, ledtrad: `Stryk en nolla i båda talen: ${a * b * 10} / ${a}.`},
        {typ: 'tal', q: `${a * b * 10} / ${a} =`, svar: b * 10, ledtrad: `Räkna ${a * b} / ${a} och lägg sedan till en nolla.`},
        {typ: 'tal', q: `${d * k} / ${d} =`, svar: k, ledtrad: `Dela upp ${d * k} i ${d * (k - k % 10)} och ${d * (k % 10)}. Dela båda med ${d}.`}]);
    }};
  const TABELL = [...[2, 3, 4, 5, 6, 7, 8, 9, 10].map(t => [String(t), '', `${t}:ans tabell`]), ['2-5', 'Blandat', 'tabell 2–5'], ['6-10', 'Blandat', 'tabell 6–10'], ['alla', 'Blandat', 'alla tabeller']];
  const tabeller = v => v === '2-5' ? [2, 3, 4, 5] : v === '6-10' ? [6, 7, 8, 9, 10] : v === 'alla' ? [2, 3, 4, 5, 6, 7, 8, 9, 10] : [+v];
  function multTips(a, b) {
    if (b === 2 || a === 2) return 'Gånger 2 är dubbelt så mycket.';
    if (b === 10 || a === 10) return 'Gånger 10: lägg till en nolla.';
    if (b === 5 || a === 5) { const x = a === 5 ? b : a; return `Gånger 5 är hälften av gånger 10. Vad är ${x} · 10?`; }
    if (b === 9 || a === 9) { const x = a === 9 ? b : a; return `Gånger 9 = gånger 10 minus en gång: ${x} · 10 − ${x}.`; }
    if (b === 4 || a === 4) { const x = a === 4 ? b : a; return `Gånger 4: dubbla två gånger. ${x} → ${2 * x} → ?`; }
    if (b === 1 || a === 1) return 'Ett tal gånger 1 är talet självt.';
    return `${a} · ${b} = ${a} · ${b - 1} + ${a}. Vad är ${a} · ${b - 1}?`;
  }
  // ---------- Enheter (längd, volym, vikt) ----------
  const fmt = x => { const [h, d] = String(Math.round(x * 1e6) / 1e6).split('.'); return tus(h) + (d ? ',' + d : ''); };
  const ENH = {  // enheter från störst till minst, med värdet i grundenheten
    langd: {e: [['km', 1000], ['m', 1], ['dm', .1], ['cm', .01], ['mm', .001]], mest: 'längst', trappa: [['km', 1000], ['m', 10], ['dm', 10], ['cm', 10], ['mm']],
      saker: [['En penna är ungefär 15 ___ lång.', 'cm'], ['Ett rum är ungefär 4 ___ brett.', 'm'], ['Från Malmö till Stockholm är det ungefär 600 ___.', 'km'],
        ['En myra är ungefär 5 ___ lång.', 'mm'], ['En dörr är ungefär 2 ___ hög.', 'm'], ['En linjal är 30 ___ lång.', 'cm'], ['En fotbollsplan är ungefär 100 ___ lång.', 'm'],
        ['Ett mynt är ungefär 2 ___ tjockt.', 'mm'], ['Du går 1 ___ på ungefär 15 minuter.', 'km'], ['Ett A4-papper är ungefär 2 ___ brett.', 'dm'], ['En nagel är ungefär 1 ___ bred.', 'cm']]},
    volym: {e: [['l', 1], ['dl', .1], ['cl', .01], ['ml', .001]], mest: 'mest', trappa: [['l', 10], ['dl', 10], ['cl', 10], ['ml']],
      saker: [['Ett glas mjölk rymmer ungefär 2 ___.', 'dl'], ['En hink rymmer ungefär 10 ___.', 'l'], ['En tesked rymmer ungefär 5 ___.', 'ml'], ['En läskburk rymmer 33 ___.', 'cl'],
        ['Ett badkar rymmer ungefär 200 ___.', 'l'], ['En kopp te är ungefär 2 ___.', 'dl'], ['En mjölkförpackning rymmer 1 ___.', 'l'], ['En droppe är mindre än 1 ___.', 'ml'], ['En vattenflaska rymmer 50 ___.', 'cl']]},
    vikt: {e: [['ton', 1000], ['kg', 1], ['hg', .1], ['g', .001]], mest: 'tyngst', trappa: [['ton', 1000], ['kg', 10], ['hg', 100], ['g']],
      saker: [['Ett paket mjöl väger 2 ___.', 'kg'], ['En bil väger ungefär 1,5 ___.', 'ton'], ['Ett äpple väger ungefär 150 ___.', 'g'], ['En elefant väger ungefär 5 ___.', 'ton'],
        ['En godispåse väger ungefär 2 ___.', 'hg'], ['En vuxen människa väger ungefär 70 ___.', 'kg'], ['Ett brev väger ungefär 20 ___.', 'g'], ['Ett paket smör väger 500 ___.', 'g'], ['En lastbil kan väga 20 ___.', 'ton']]}};
  const trappa = typ => `<span class="gt-trappa">${ENH[typ].trappa.map(([u, f]) => `<b>${u}</b>${f ? `<i>· ${tus(f)} →</i>` : ''}`).join('')}</span>`;
  function byt(typ, dec) {  // n stor enhet = ? liten enhet, eller tvärtom
    const E = ENH[typ].e;
    let i, j, R;
    do { i = r(0, E.length - 2); j = r(i + 1, E.length - 1); R = Math.round(E[i][1] / E[j][1]); } while (R > 1000);
    const [st, sm] = [E[i][0], E[j][0]];
    const tips = `1 ${st} = ${tus(R)} ${sm}.`;
    if (!dec) {
      const n = R >= 100 ? r(2, 9) : r(2, 15);
      return Math.random() < .5 ? {typ: 'tal', q: `${n} ${st} = ? ${sm}`, svar: n * R, ledtrad: `${tips} Räkna ${n} · ${tus(R)}.`}
        : {typ: 'tal', q: `${tus(n * R)} ${sm} = ? ${st}`, svar: n, ledtrad: `${tips} Räkna ${tus(n * R)} / ${tus(R)}.`};
    }
    const n = d1(r(1, 9) + val([.5, .2, .25, .8, .1]));
    return Math.random() < .5 ? {typ: 'tal', q: `${fmt(n)} ${st} = ? ${sm}`, svar: d1(n * R), ledtrad: `${tips} Räkna ${fmt(n)} · ${tus(R)}.`}
      : {typ: 'tal', q: `${fmt(d1(n * R))} ${sm} = ? ${st}`, svar: n, ledtrad: `${tips} Räkna ${fmt(d1(n * R))} / ${tus(R)}.`};
  }
  function enhetOv(typ, ikon, namn, kort) {
    const E = ENH[typ].e;
    return {del: 'enhet', ikon, namn, kort, typ,
      exempel: `Enhetstrappan: ${trappa(typ)}<br>Neråt i trappan räknar du gånger, uppåt räknar du delat med.`,
      val: NIVA('välj rätt enhet', 'byt enhet', 'decimaltal och blandat'),
      gen(v) {
        if (v === '1') { const [t, u] = val(ENH[typ].saker); return {typ: 'val', q: t.replace('___', '<span class="lucka">?</span>'), alt: fyra(u, E.map(e => e[0])), ledtrad: `Tänk på hur stor saken är. ${trappa(typ)}`}; }
        if (v === '2') return byt(typ, false);
        if (typ === 'volym' && Math.random() < .25) { const n = r(2, 9); return val([
          {typ: 'tal', q: `${n} l = ? dm³`, svar: n, ledtrad: '1 dm³ = 1 l.'}, {typ: 'tal', q: `${n * 100} ml = ? cm³`, svar: n * 100, ledtrad: '1 cm³ = 1 ml.'},
          {typ: 'tal', q: `${n} dm³ = ? dl`, svar: n * 10, ledtrad: '1 dm³ = 1 l = 10 dl.'}]); }
        const k = r(0, 2);
        if (k === 0) return byt(typ, true);
        if (k === 1) {  // t.ex. 3 m 40 cm = ? cm
          let i, R; do { i = r(0, E.length - 2); R = Math.round(E[i][1] / E[i + 1][1]); } while (R > 1000);
          const a = r(1, 9), b = r(1, R - 1);
          return {typ: 'tal', q: `${a} ${E[i][0]} ${tus(b)} ${E[i + 1][0]} = ? ${E[i + 1][0]}`, svar: a * R + b, ledtrad: `1 ${E[i][0]} = ${tus(R)} ${E[i + 1][0]}. Gör om ${a} ${E[i][0]} och lägg till ${tus(b)} ${E[i + 1][0]}.`};
        }
        // Vilket är längst/tyngst/mest? Fyra mängder i olika enheter
        let mangder;
        do {
          const T = r(2, 9) * E[r(0, E.length - 2)][1], ok = E.filter(([, w]) => T / w >= .1 && T / w <= 20000);
          mangder = [.5, .8, 1, 1.25, 2, 3].map(m => { const [u, w] = val(ok); const x = d1(T * m / w); return [x, u, x * w]; });
          mangder = blanda(mangder).filter((m, i, a) => a.findIndex(z => Math.abs(z[2] - m[2]) < 1e-9) === i).slice(0, 4);
        } while (mangder.length < 4 || new Set(mangder.map(m => m[1])).size < 2);
        const text = m => `${fmt(m[0])} ${m[1]}`, max = mangder.reduce((a, b) => b[2] > a[2] ? b : a);
        return {typ: 'val', q: `Vilket är ${ENH[typ].mest}?`, alt: [text(max), ...mangder.filter(m => m !== max).map(text)], ledtrad: `Gör om alla till samma enhet först. ${trappa(typ)}`};
      }};
  }
  const OV = {
    tiokamrater: {del: 'rakna', ikon: '🔟', namn: 'Tiokamrater och hundrakamrater', kort: 'Fyll upp till 10, 100 och 1000',
      exempel: '<b>7 + 3 = 10</b>. 7 och 3 är tiokamrater.<br><b>60 + 40 = 100</b>. 60 och 40 är hundrakamrater.',
      val: NIVA('upp till 10', 'tiotal upp till 100', 'upp till 100 och 1000'),
      gen(v) {
        if (v === '1') { const a = r(1, 9); return val([
          {typ: 'tal', q: `${a} + ? = 10`, bild: tiorad(a), svar: 10 - a, ledtrad: 'Räkna de tomma rutorna.'},
          {typ: 'tal', q: `10 − ${a} =`, bild: tiorad(10 - a), svar: 10 - a, ledtrad: `Vilket tal ska du lägga till ${a} för att få 10?`}]); }
        if (v === '2') { const a = r(1, 9) * 10; return val([
          {typ: 'tal', q: `${a} + ? = 100`, svar: 100 - a, ledtrad: `Tänk tiokamrater: ${a / 10} + ? = 10.`},
          {typ: 'tal', q: `100 − ${a} =`, svar: 100 - a, ledtrad: `Tänk: ${a} + ? = 100.`}]); }
        const a = r(11, 89); if (a % 10 === 0) return this.gen(v);
        const b = r(1, 9) * 100;
        return val([
          {typ: 'tal', q: `${a} + ? = 100`, svar: 100 - a, ledtrad: `Fyll först upp till närmaste tiotal: ${a} + ${10 - a % 10} = ${a + 10 - a % 10}. Hur mycket är det sedan kvar till 100?`},
          {typ: 'tal', q: `100 − ${a} =`, svar: 100 - a, ledtrad: `Tänk: ${a} + ? = 100. Fyll först upp till ${a + 10 - a % 10}.`},
          {typ: 'tal', q: `${b} + ? = 1000`, svar: 1000 - b, ledtrad: `Tänk tiokamrater: ${b / 100} + ? = 10.`}]);
      }},
    gangertabell: {del: 'rakna', ikon: '✖️', namn: 'Multiplikation', kort: 'Gångertabellen: välj tabell eller blandat',
      exempel: '<b>3 · 4 = 12</b>. Tre grupper med fyra i varje: 4 + 4 + 4 = 12.', valrubrik: 'Välj tabell', val: TABELL,
      lista(v) {  // tio olika uppgifter per runda
        const t = tabeller(v);
        const par = t.length === 1 ? blanda([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(n => [t[0], n]) : blanda(t.flatMap(a => [2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => [a, n]))).slice(0, RUNDA);
        return par.map(([a, n]) => { const [x, y] = Math.random() < .5 ? [a, n] : [n, a]; return {typ: 'tal', q: `${x} · ${y} =`, svar: x * y, ledtrad: multTips(x, y), fakta: `${x} · ${y} = ${x * y}`}; });
      }},
    division: {del: 'rakna', ikon: '➗', namn: 'Division', kort: 'Division som omvänd multiplikation',
      exempel: '<b>12 / 4 = 3</b>, eftersom <b>4 · 3 = 12</b>.', valrubrik: 'Välj tabell', val: TABELL,
      lista(v) {
        const t = tabeller(v);
        const par = t.length === 1 ? blanda([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(n => [t[0], n]) : blanda(t.flatMap(a => [2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => [a, n]))).slice(0, RUNDA);
        return par.map(([d, n]) => ({typ: 'tal', q: `${d * n} / ${d} =`, svar: n, ledtrad: `Tänk: ${d} · ? = ${d * n}.`, fakta: `${d * n} / ${d} = ${n}`}));
      }},
    raknesatt: {del: 'rakna', ikon: '🧮', namn: 'De fyra räknesätten i huvudet', kort: 'Välj räknesätt och nivå',
      exempel: '<b>47 + 28</b>: ta tiotalen först, 40 + 20 = 60. Sedan entalen, 7 + 8 = 15. Till sist 60 + 15 = 75.',
      rs: true, val: RS_VAL,
      gen(v) {
        if (v.includes('-')) { const [op, n] = v.split('-'); return RS[op](n); }
        if (v === '1') {
          const a = r(2, 12), b = r(2, 20 - a), c = r(11, 20), d = r(2, c - 1);
          return val([
            {typ: 'tal', q: `${a} + ${b} =`, svar: a + b, ledtrad: a + b > 10 ? `Fyll först upp till 10: ${a} + ${Math.max(0, 10 - a)} = ${Math.max(a, 10)}. Lägg sedan till resten.` : 'Börja med det största talet och räkna vidare.'},
            {typ: 'tal', q: `${c} − ${d} =`, svar: c - d, ledtrad: c - d < d ? `Räkna uppåt från ${d} till ${c}.` : `Ta först bort ner till 10: ${c} − ${c - 10} = 10. Ta sedan bort resten.`}]);
        }
        if (v === '2') {
          const a = r(12, 68), b = r(12, 99 - a), c = r(41, 99), d = r(11, c - 10), x = r(2, 9), y = r(2, 9);
          return val([
            {typ: 'tal', q: `${a} + ${b} =`, svar: a + b, ledtrad: `Ta tiotalen först: ${a - a % 10} + ${b - b % 10} = ${a - a % 10 + b - b % 10}. Lägg sedan till entalen ${a % 10} och ${b % 10}.`},
            {typ: 'tal', q: `${c} − ${d} =`, svar: c - d, ledtrad: `Ta bort tiotalen först: ${c} − ${d - d % 10} = ${c - d + d % 10}. Ta sedan bort ${d % 10}.`},
            {typ: 'tal', q: `${x} · ${y} =`, svar: x * y, ledtrad: multTips(x, y)},
            {typ: 'tal', q: `${x * y} / ${x} =`, svar: y, ledtrad: `Tänk: ${x} · ? = ${x * y}.`}]);
        }
        const a = r(2, 9), b = r(2, 9), n = r(11, 95) / 10, p = a * 100 + r(1, 9) * 10, q = b * 100 + 50;
        return val([
          {typ: 'tal', q: `${a * 10} · ${b} =`, svar: a * b * 10, ledtrad: `Räkna ${a} · ${b} och lägg sedan till en nolla.`},
          {typ: 'tal', q: `${a * 10} · ${b * 10} =`, svar: a * b * 100, ledtrad: `Räkna ${a} · ${b} och lägg sedan till två nollor.`},
          {typ: 'tal', q: `${a * b * 100} / ${a * 10} =`, svar: b * 10, ledtrad: `Stryk en nolla i båda talen: ${a * b * 10} / ${a}.`},
          {typ: 'tal', q: `${p} + ${q} =`, svar: p + q, ledtrad: `Ta hundratalen först: ${p - p % 100} + ${q - q % 100} = ${p - p % 100 + q - q % 100}. Lägg sedan till ${p % 100} och ${q % 100}.`},
          {typ: 'tal', q: `${sv(n)} · 10 =`, svar: n * 10, ledtrad: 'Gånger 10: varje siffra flyttar ett steg till vänster, så kommat hamnar ett steg längre åt höger.'},
          {typ: 'tal', q: `${sv(n * 10)} / 10 =`, svar: n, ledtrad: 'Delat med 10: kommat flyttar ett steg åt vänster.'},
          {typ: 'tal', q: `1000 − ${a * 100 + b * 10} =`, svar: 1000 - a * 100 - b * 10, ledtrad: `Tänk: ${a * 100 + b * 10} + ? = 1000. Fyll först upp till ${a * 100 + 100}.`}]);
      }},
    dubbelt: {del: 'rakna', ikon: '⚖️', namn: 'Dubbelt och hälften', kort: 'Dubbla och halvera snabbt',
      exempel: 'Dubbelt så mycket som <b>8</b> är <b>16</b> (8 + 8).<br>Hälften av <b>16</b> är <b>8</b>.',
      val: NIVA('tal upp till 20 och 40', 'tvåsiffriga tal', 'stora tal och decimaltal'),
      gen(v) {
        const [a, b] = v === '1' ? [r(2, 20), r(1, 20) * 2] : v === '2' ? [r(13, 49), val([r(12, 99) * 2, r(3, 19) * 10])] : [val([r(11, 49) / 10, r(11, 49) * 10]), val([r(3, 19), r(11, 49) * 20, r(11, 99) / 5])];
        return val([
          {typ: 'tal', q: `Dubbelt så mycket som ${sv(a)} =`, svar: 2 * a, ledtrad: a >= 10 && a % 10 ? `Dela upp talet: dubbla ${sv(a - a % 10)} och dubbla ${sv(Math.round(a % 10 * 10) / 10)}. Lägg ihop.` : `Räkna ${sv(a)} + ${sv(a)}.`},
          {typ: 'tal', q: `Hälften av ${sv(b)} =`, svar: b / 2, ledtrad: b >= 20 && b % 20 ? `Dela upp talet: hälften av ${sv(b - b % 20)} och hälften av ${sv(Math.round(b % 20 * 10) / 10)}. Lägg ihop.` : `Vilket tal + samma tal blir ${sv(b)}?`}]);
      }},

    decimal: {del: 'rakna', ikon: '🔢', namn: 'Decimaltal', kort: 'Räkna med decimaltal i huvudet',
      exempel: '<b>2,5 + 1,8</b>: räkna i tiondelar. 25 + 18 = 43 tiondelar, alltså <b>4,3</b>.<br><b>4 · 0,3</b>: 4 · 3 = 12 tiondelar, alltså <b>1,2</b>.',
      val: NIVA('plus och minus med tiondelar', 'gånger och delat med heltal', 'gånger och delat med 10, 100 och 1000'),
      gen(v) {
        if (v === '1') {
          const a = r(11, 59), b = r(11, 39);
          return val([
            {typ: 'tal', q: `${sv(a / 10)} + ${sv(b / 10)} =`, svar: d1((a + b) / 10), ledtrad: `Räkna i tiondelar: ${a} + ${b} tiondelar. Sätt sedan tillbaka kommat.`},
            {typ: 'tal', q: `${sv((a + b) / 10)} − ${sv(b / 10)} =`, svar: d1(a / 10), ledtrad: `Räkna i tiondelar: ${a + b} − ${b} tiondelar. Sätt sedan tillbaka kommat.`},
            {typ: 'tal', q: `${sv(a / 10)} + ? = ${Math.ceil(a / 10)}`, svar: d1(Math.ceil(a / 10) - a / 10), ledtrad: `Hur många tiondelar saknas upp till ${Math.ceil(a / 10)}?`}].filter(f => f.svar > 0));
        }
        if (v === '2') {
          const k = r(2, 9), t = r(2, 9);
          return val([
            {typ: 'tal', q: `${k} · ${sv(t / 10)} =`, svar: d1(k * t / 10), ledtrad: `Räkna ${k} · ${t} = ${k * t}. Det är tiondelar, så svaret blir ${k * t} tiondelar.`},
            {typ: 'tal', q: `${sv(k * t / 10)} / ${k} =`, svar: d1(t / 10), ledtrad: `${sv(k * t / 10)} är ${k * t} tiondelar. Räkna ${k * t} / ${k} tiondelar.`},
            {typ: 'tal', q: `0,5 · ${2 * k} =`, svar: k, ledtrad: `0,5 är en halv. Hälften av ${2 * k}.`},
            {typ: 'tal', q: `${sv(k + .5)} · 2 =`, svar: 2 * k + 1, ledtrad: `Dubbla ${k} och dubbla 0,5. Lägg ihop.`}].filter(f => f.svar !== null));
        }
        const x = r(11, 999) / 100, g = val([10, 100, 1000]);
        return Math.random() < .5
          ? {typ: 'tal', q: `${sv(x)} · ${tus(g)} =`, svar: d1(x * g), ledtrad: `Gånger ${tus(g)}: talet blir ${tus(g)} gånger större. Kommat flyttar ${String(g).length - 1} steg åt höger.`}
          : {typ: 'tal', q: `${sv(x)} / ${tus(g)} =`, svar: d1(x / g), ledtrad: `Delat med ${tus(g)}: talet blir ${tus(g)} gånger mindre. Kommat flyttar ${String(g).length - 1} steg åt vänster.`};
      }},
    overslag: {del: 'rakna', ikon: '🎯', namn: 'Överslagsräkning', kort: 'Ungefär hur mycket? Välj det rimliga svaret',
      exempel: 'Ungefär hur mycket är <b>49 · 21</b>?<br>Avrunda: 49 ≈ 50 och 21 ≈ 20. Räkna 50 · 20 = <b>1 000</b>.',
      val: NIVA('plus och minus', 'gånger och delat', 'pengar och decimaltal'),
      gen(v) {
        const runt = x => { const e = Math.pow(10, Math.floor(Math.log10(x))); return Math.round(x / e) * e; };
        const alt = (ratt, ...fel) => fyra(tus(ratt), [tus(ratt * 10), tus(ratt / 10), ...fel.map(tus)].filter(x => !x.includes('.')));
        if (v === '1') {
          const a = r(2, 9) * 10 + val([-1, -2, 1, 2]), b = r(2, 9) * 10 + val([-1, 1, 2]), ra = Math.round(a / 10) * 10, rb = Math.round(b / 10) * 10;
          if (Math.random() < .5) return {typ: 'val', q: `Ungefär hur mycket är <b>${a} + ${b}</b>?`, alt: alt(ra + rb, ra + rb + 30, Math.abs(ra - rb) || ra + rb - 20), ledtrad: `Avrunda till hela tiotal: ${a} ≈ ${ra} och ${b} ≈ ${rb}.`};
          const [p, q] = ra >= rb ? [a + 100, b] : [b + 100, a], rp = Math.round(p / 10) * 10, rq = Math.round(q / 10) * 10;
          return {typ: 'val', q: `Ungefär hur mycket är <b>${p} − ${q}</b>?`, alt: alt(rp - rq, rp + rq, rp - rq + 40), ledtrad: `Avrunda till hela tiotal: ${p} ≈ ${rp} och ${q} ≈ ${rq}.`};
        }
        if (v === '2') {
          const a = r(2, 9) * 10 + val([-1, -2, 1, 2]), b = val([r(2, 9), r(2, 9) * 10 + val([-1, 1, 2])]), ra = runt(a), rb = runt(b);
          if (Math.random() < .55) return {typ: 'val', q: `Ungefär hur mycket är <b>${a} · ${b}</b>?`, alt: alt(ra * rb, ra * rb * 2, ra + rb), ledtrad: `Avrunda: ${a} ≈ ${ra} och ${b} ≈ ${rb}. Räkna ${ra} · ${rb}.`};
          const d = r(2, 9), k = r(2, 9) * (Math.random() < .5 ? 10 : 100), t = d * k + val([-3, -2, 2, 3, 4]);
          return {typ: 'val', q: `Ungefär hur mycket är <b>${tus(t)} / ${d}</b>?`, alt: alt(k, k * 2, k + k / 2), ledtrad: `${tus(t)} ligger nära ${tus(d * k)}. Räkna ${tus(d * k)} / ${d}.`};
        }
        const pris = d1(r(1, 9) * 10 - val([0.1, 0.5, 0.05])), st = r(2, 6), sak = val(['glassar', 'böcker', 'biljetter', 'tröjor', 'pennor']), rp = Math.round(pris / 10) * 10;
        if (Math.random() < .6) return {typ: 'val', q: `Du köper ${st} ${sak} för <b>${sv(pris)} kr</b> styck. Ungefär hur mycket kostar det?`, alt: fyra(`${tus(rp * st)} kr`, [`${tus(rp * st * 10)} kr`, `${tus(rp * st + rp)} kr`, `${tus(rp + st)} kr`, `${tus(rp * st * 2)} kr`]),
          ledtrad: `${sv(pris)} kr är nästan ${rp} kr. Räkna ${st} · ${rp}.`};
        const ra = r(2, 9), rb = r(2, 9), a = d1(ra + val([-.2, -.1, .1, .2])), b = d1(rb + val([-.1, .1])), p = ra * rb;
        return {typ: 'val', q: `Ungefär hur mycket är <b>${sv(a)} · ${sv(b)}</b>?`, alt: fyra(sv(p), [sv(p * 10), sv(p / 10), sv(p * 100)]),
          ledtrad: `Avrunda till heltal: ${sv(a)} ≈ ${ra} och ${sv(b)} ≈ ${rb}.`};
      }},

    lasklockan: {del: 'tid', ikon: '🕒', namn: 'Läs klockan', kort: 'Titta på klockan och välj rätt tid',
      exempel: 'Den <b>korta</b> visaren visar timmen. Den <b>långa</b> visaren visar minuterna.<br><b>Halv 8</b> betyder 7.30, halvvägs till 8.',
      val: NIVA('hel och halv', 'kvart och fem minuter', 'på minuten'),
      gen(v) {
        const h = r(1, 12);
        if (v === '3') {
          const m = r(1, 59); if (m % 5 === 0) return this.gen(v);
          const d = (hh, mm) => `${h12(hh)}.${pad(fem(mm))}`;
          return {typ: 'val', q: 'Vad är klockan?', bild: klocka(h, m), alt: fyra(d(h, m), [d(h + 1, m), d(h - 1, m), d(h, 60 - m), d(h, m + 5), d(h, m - 5), d(Math.round(m / 5) || 12, h * 5)]),
            ledtrad: `Den korta visaren har passerat ${h12(h)} men inte ${h12(h + 1)}. Räkna minuterna fem i taget: 5, 10, 15 …`};
        }
        const m = v === '1' ? val([0, 30]) : val([5, 10, 15, 20, 25, 35, 40, 45, 50, 55]);
        const k = v === '1' ? [fras(h + 1, m), fras(h - 1, 30 - m || 30), fras(h, 30 - m), fras(h + 1, 30 - m), fras(h - 1, m)]
          : [fras(h + 1, m), fras(h - 1, m), fras(h, fem(60 - m)), fras(h + 1, fem(60 - m)), fras(h, fem(m + 30))];
        return {typ: 'val', q: 'Vad är klockan?', bild: klocka(h, m), alt: fyra(fras(h, m), k),
          ledtrad: m === 30 ? `Den långa visaren pekar på 6. Den korta är mellan ${h12(h)} och ${h12(h + 1)}. Halv betyder halvvägs till nästa timme.`
            : m === 0 ? 'Den långa visaren pekar rakt upp på 12. Då är det hel timme.'
            : m < 30 ? 'Den långa visaren är på högra sidan. Då säger vi ”över”.' : 'Den långa visaren är på vänstra sidan. Då säger vi ”i” (minuter kvar till nästa timme).'};
      }},
    stallklockan: {del: 'tid', ikon: '👆', namn: 'Ställ klockan', kort: 'Dra visarna till rätt tid',
      exempel: 'Dra den <b>långa</b> visaren runt. Den korta visaren följer med.<br>Du kan också använda knapparna.',
      val: NIVA('hel och halv', 'kvart och fem minuter', 'digital tid, på minuten'),
      gen(v) {
        const h = r(1, 12);
        if (v === '3') { const m = r(1, 59), hh = h === 12 ? 12 : val([h, h + 12]); return {typ: 'stall', q: `Ställ klockan på <b>${tt(hh, m)}</b>`, mal: (h % 12) * 60 + m, steg: 1, ledtrad: hh > 12 ? `${tt(hh, m)} är på eftermiddagen. Dra bort 12 timmar: det blir ${h12(hh)}.${pad(m)}.` : 'Ställ först den långa visaren på minuterna. Kolla sedan att den korta pekar på rätt timme.'}; }
        const m = v === '1' ? val([0, 30]) : val([5, 10, 15, 20, 25, 35, 40, 45, 50, 55]);
        return {typ: 'stall', q: `Ställ klockan på <b>${fras(h, m)}</b>`, mal: (h % 12) * 60 + m, steg: 5,
          ledtrad: m === 30 ? `Halv ${h12(h + 1)} är 30 minuter innan ${h12(h + 1)}. Den långa visaren ska peka på 6.` : m === 0 ? 'Den långa visaren ska peka rakt upp på 12.' : m < 30 ? '”Över” betyder minuter efter hel timme. Den långa visaren hamnar på högra sidan.' : '”I” betyder minuter kvar till nästa timme. Den långa visaren hamnar på vänstra sidan.'};
      }},
    digital: {del: 'tid', ikon: '📱', namn: 'Analog och digital tid', kort: 'Från ord till digital tid, och tillbaka',
      exempel: '<b>Kvart över 3 på eftermiddagen</b> skrivs <b>15:15</b>.<br>På eftermiddagen och kvällen lägger du till 12 på timmen.',
      val: NIVA('morgon och förmiddag', 'eftermiddag och kväll (24 timmar)', 'från digital tid till ord'),
      gen(v) {
        const m = val([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
        if (v === '3') {
          const h = val([6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]), s = (hh, mm) => `${fras(hh, mm)} ${del(hh)}`, mot = h < 12 ? h + 12 : h - 12;
          return {typ: 'val', q: `Hur säger man <b>${tt(h, m)}</b>?`, alt: fyra(s(h, m), [`${fras(h, m)} ${del(mot)}`, s(h + 1, m), s(h - 1, m), s(h, fem(60 - m)), s(h, fem(m + 15)), s(h + 2, m)].filter(x => !x.includes('natten'))),
            ledtrad: h >= 12 ? `${pad(h)} är efter 12. Dra bort 12: ${h} − 12 = ${h - 12}.` : 'Titta först på minuterna. Är det mindre än 30 så säger vi ”över”, annars ”i” eller ”halv”.'};
        }
        const h = v === '1' ? r(6, 11) : r(13, 22);
        const fel = [tt(h, fem(60 - m)), tt(h, fem(m + 15)), tt(h + 1, m), tt(h - 1, m), v === '1' ? tt(h + 12, m) : tt(h - 12, m), tt(h, fem(m + 30))];
        return {typ: 'val', q: `Hur skrivs <b>${fras(h, m)} ${del(h)}</b> digitalt?`, alt: fyra(tt(h, m), fel),
          ledtrad: (m >= 25 ? `”${fras(h, m)}” är före ${h12(h + 1)}, så timmen blir ${h12(h)}. ` : '') + (v === '2' ? 'På eftermiddagen och kvällen lägger du till 12 på timmen.' : '')};
      }},
    tidsskillnad: {del: 'tid', ikon: '⏱️', namn: 'Hur lång tid?', kort: 'Räkna ut tiden mellan två klockslag',
      exempel: 'Från <b>08:40</b> till <b>09:15</b>: först 20 min till 09:00, sedan 15 min till. Totalt <b>35 min</b>.',
      val: NIVA('inom samma timme', 'över en hel timme', 'mer än en timme'),
      gen(v) {
        const vad = val([['Bussen går', 'och kommer fram', 'resan'], ['Lektionen börjar', 'och slutar', 'lektionen'], ['Filmen börjar', 'och slutar', 'filmen'],
          ['Matchen börjar', 'och slutar', 'matchen'], ['Du börjar plugga', 'och slutar', 'det'], ['Tåget går', 'och kommer fram', 'resan']]);
        const h = r(7, 19);
        let a, b;
        if (v === '1') { const m = r(0, 8) * 5; a = h * 60 + m; b = a + r(2, 11 - m / 5) * 5; }
        else if (v === '2') { a = h * 60 + r(7, 11) * 5; b = a + r(2, 11) * 5; if (b % 60 === 0 || b - a < 10 || Math.floor(b / 60) === h) return this.gen(v); }
        else {
          a = h * 60 + r(0, 11) * 5; b = a + r(13, 40) * 5;
          if (Math.random() < .4) { const d = b - a; return {typ: 'tid', q: `${vad[0]} ${tt(h, a % 60)}. Den tar ${Math.floor(d / 60)} h ${d % 60} min. När är ${vad[2]} slut?`, svar: [Math.floor(b / 60) % 24, b % 60],
            ledtrad: `Lägg först till ${Math.floor(d / 60)} h: det blir ${tt(h + Math.floor(d / 60), a % 60)}. Lägg sedan till ${d % 60} min.`}; }
        }
        const tim = Math.ceil(a / 60) * 60;
        return {typ: v === '3' ? 'langd' : 'tal', enhet: 'min', q: `${vad[0]} ${tt(Math.floor(a / 60), a % 60)} ${vad[1]} ${tt(Math.floor(b / 60), b % 60)}. Hur lång tid tar ${vad[2]}?`, bild: tidslinje(a, b), svar: b - a,
          ledtrad: v === '1' ? `Räkna minuterna från ${a % 60} till ${b % 60}.` : `Räkna först till hel timme: från ${tt(Math.floor(a / 60), a % 60)} till ${tt(tim / 60, 0)} är det ${tim - a} min. Hur mycket är det sedan kvar?`};
      }},
    langd: enhetOv('langd', '📏', 'Längd', 'km, m, dm, cm och mm'),
    volym: enhetOv('volym', '🥛', 'Volym', 'l, dl, cl och ml'),
    vikt: enhetOv('vikt', '⚖️', 'Vikt', 'ton, kg, hg och g'),
    enheter: {del: 'enhet', ikon: '⏳', namn: 'Tid', kort: 'Sekunder, minuter, timmar, dygn och år',
      exempel: '<b>1 h = 60 min</b> &nbsp; <b>1 min = 60 s</b> &nbsp; <b>1 dygn = 24 h</b><br>En halvtimme = 30 min, en kvart = 15 min.',
      val: NIVA('hela timmar och minuter', 'halvtimme, kvart och sekunder', 'dygn och blandade enheter'),
      gen(v) {
        const n = r(2, 5);
        if (v === '1') return val([
          {typ: 'tal', q: `${n} h = ? min`, svar: 60 * n, ledtrad: `1 h = 60 min. Räkna ${n} · 60.`},
          {typ: 'tal', q: `${60 * n} min = ? h`, svar: n, ledtrad: 'Hur många gånger får 60 plats?'},
          {typ: 'tal', q: '1 h = ? min', svar: 60, ledtrad: 'En timme har lika många minuter som en minut har sekunder.'}]);
        if (v === '2') return val([
          {typ: 'tal', q: val(['½ h = ? min', 'En halvtimme = ? min']), svar: 30, ledtrad: 'Hälften av 60 min.'},
          {typ: 'tal', q: val(['¼ h = ? min', 'En kvart = ? min']), svar: 15, ledtrad: 'En fjärdedel av 60 min. 60 / 4.'},
          {typ: 'tal', q: '¾ h = ? min', svar: 45, ledtrad: 'Tre kvartar: 15 + 15 + 15.'},
          {typ: 'tal', q: `${n - 1},5 h = ? min`, svar: 60 * (n - 1) + 30, ledtrad: `${n - 1} h = ${60 * (n - 1)} min. Lägg till en halvtimme.`},
          {typ: 'tal', q: `${n} min = ? s`, svar: 60 * n, ledtrad: `1 min = 60 s. Räkna ${n} · 60.`},
          {typ: 'tal', q: `${60 * n} s = ? min`, svar: n, ledtrad: 'Hur många gånger får 60 plats?'}]);
        const t = r(1, 3), mm = r(1, 11) * 5;
        return val([
          {typ: 'tal', q: `${n} dygn = ? h`, svar: 24 * n, ledtrad: `1 dygn = 24 h. Räkna ${n} · 24.`},
          {typ: 'tal', q: `${t} h ${mm} min = ? min`, svar: 60 * t + mm, ledtrad: `${t} h = ${60 * t} min. Lägg till ${mm} min.`},
          {typ: 'langd', q: `${60 * t + mm} min = ? h ? min`, svar: 60 * t + mm, ledtrad: `Hur många hela timmar (60 min) får plats i ${60 * t + mm} min? Resten är minuter.`},
          {typ: 'tal', q: `${n} veckor = ? dygn`, svar: 7 * n, ledtrad: `En vecka har 7 dygn. Räkna ${n} · 7.`},
          {typ: 'tal', q: `${48 * n / 2} h = ? dygn`, svar: n, ledtrad: 'Hur många gånger får 24 plats?'},
          {typ: 'tal', q: `${n} år = ? månader`, svar: 12 * n, ledtrad: `Ett år har 12 månader. Räkna ${n} · 12.`},
          {typ: 'tal', q: 'Ett kvartal = ? månader', svar: 3, ledtrad: 'Ett kvartal är en fjärdedel av ett år. 12 / 4.'},
          {typ: 'tal', q: `${n} kvartal = ? månader`, svar: 3 * n, ledtrad: `Ett kvartal är 3 månader. Räkna ${n} · 3.`},
          {typ: 'tal', q: 'Ett vanligt år har ? dygn', svar: 365, ledtrad: 'Ett skottår har 366 dygn. Ett vanligt år har ett dygn mindre.'},
          {typ: 'tal', q: 'Ett skottår har ? dygn', svar: 366, ledtrad: 'Ett skottår har ett dygn mer än ett vanligt år (29 februari).'}]);
      }},
  };

  // ---------- Visning ----------
  const DELAR = [['rakna', 'Huvudräkning', 'Räkna i huvudet. Du får 10 uppgifter med nya tal varje gång.'], ['tid', 'Klockan och tid', 'Läs klockan, ställ visarna och räkna med tid.'], ['enhet', 'Enheter', 'Längd, volym, vikt och tid. Välj rätt enhet och byt mellan enheter.']];
  const KLOCKORD = [[7, 0, 'klockan 7', '7.00'], [7, 30, 'halv 8', '7.30'], [7, 15, 'kvart över 7', '7.15'], [7, 45, 'kvart i 8', '7.45'], [7, 5, 'fem över 7', '7.05'], [7, 55, 'fem i 8', '7.55']];
  function meny() {
    el.innerHTML = DELAR.map(([d, rub, txt]) => `<div class="kapblock gt-del"><h2>${rub}</h2><p class="gt-txt">${txt}</p><div class="gt-typer">` +
      Object.entries(OV).filter(([, o]) => o.del === d).map(([k, o]) => `<a class="typ" href="#${k}"><span class="gt-ik" aria-hidden="true">${o.ikon}</span>${o.namn}<b>${o.kort}</b></a>`).join('') + '</div>' +
      (d === 'tid' ? `<details class="gt-ord"><summary>📖 Klockord</summary><div class="gt-ordgrid">${KLOCKORD.map(([h, m, f, d]) => `<div>${klocka(h, m, 'liten')}<b>${f}</b><span>${d}</span></div>`).join('')}</div>
        <ul><li><b>över</b> = minuter efter hel timme</li><li><b>i</b> = minuter kvar till nästa timme</li><li><b>halv 8</b> = halvvägs till 8, alltså 7.30</li>
        <li><b>morgon</b> ca 05–10, <b>förmiddag</b> 10–12, <b>eftermiddag</b> 12–18, <b>kväll</b> 18–24</li><li><b>1 h</b> (timme) = 60 min, <b>1 min</b> (minut) = 60 s (sekunder), <b>1 dygn</b> = 24 h</li></ul></details>` : '') +
      (d === 'enhet' ? `<details class="gt-ord"><summary>📖 Enhetstrappan</summary><div class="gt-trappor"><p><b>Längd</b>${trappa('langd')}</p><p><b>Volym</b>${trappa('volym')}</p><p><b>Vikt</b>${trappa('vikt')}</p>
        <ul><li>Från stor till liten enhet (neråt i trappan): räkna <b>gånger</b>.</li><li>Från liten till stor enhet (uppåt): räkna <b>delat med</b>.</li><li><b>1 dm³ = 1 l</b> och <b>1 cm³ = 1 ml</b></li></ul></div></details>` : '') + '</div>').join('');
  }
  function valmeny(k) {
    const o = OV[k];
    el.innerHTML = `<div class="kort-t gt-val"><div class="topp"><span>${o.ikon} ${o.namn}</span></div>
      <div class="gt-ex"><span aria-hidden="true">💡</span><div><b>Så gör du</b><p>${o.exempel}</p></div></div>
      <h3>${o.valrubrik || 'Välj nivå'}</h3><div class="valj gt-niva">${o.val.map(([v, n, p]) => `<button data-v="${v}">${n ? `<b>${n}</b>` : ''}${p || ''}</button>`).join('')}</div>
      <a class="knapp2 sek gt-tillbaka" href="#">← Alla övningar</a></div>`;
    el.querySelectorAll('[data-v]').forEach(b => b.onclick = () => { location.hash = k + '/' + b.dataset.v; });
    if (o.rs) {  // först räknesätt, sedan nivå
      const niva = el.querySelector('.gt-niva'), h3 = el.querySelector('.gt-val h3');
      h3.insertAdjacentHTML('beforebegin', `<h3>Välj räknesätt</h3><div class="gt-op">${Object.entries(RS_NAMN).map(([op, [n]]) => `<button type="button" data-op="${op}">${n}</button>`).join('')}</div>`);
      const visa = op => {
        el.querySelectorAll('[data-op]').forEach(b => b.classList.toggle('vald', b.dataset.op === op));
        niva.innerHTML = RS_NAMN[op][1].map((t, i) => `<button data-v="${op === 'bland' ? i + 1 : op + '-' + (i + 1)}"><b>Nivå ${i + 1}</b>${t}</button>`).join('');
        niva.querySelectorAll('[data-v]').forEach(b => b.onclick = () => { location.hash = k + '/' + b.dataset.v; });
      };
      el.querySelectorAll('[data-op]').forEach(b => b.onclick = () => visa(b.dataset.op));
      visa('plus');
    }
  }

  let O, V, lista, nr, ratt, svit, missar, fraga, fel;
  function start(k, v) {
    O = OV[k]; V = v; nr = 0; ratt = 0; svit = 0; missar = [];
    if (O.lista) lista = O.lista(v);
    else {  // tio uppgifter, helst olika
      lista = []; const sedda = new Set();
      for (let i = 0; lista.length < RUNDA && i < 200; i++) { const f = O.gen(v); const nyckel = f.q + (f.bild || ''); if (!sedda.has(nyckel) || i > 150) { sedda.add(nyckel); lista.push(f); } }
    }
    ny();
  }
  const namnVal = () => { const x = O.val.find(a => a[0] === V); return !x ? '' : x[1] === '' ? x[2] : x[1] === 'Blandat' ? 'blandat, ' + x[2] : x[1]; };
  function ny() {
    if (nr === lista.length) return klar();
    fraga = lista[nr++]; fel = 0;
    const f = fraga;
    let svar = '';
    if (f.typ === 'tal') svar = `<form><input inputmode="decimal" autocomplete="off" aria-label="Ditt svar" placeholder="Svar">${f.enhet ? `<span class="gt-enh">${f.enhet}</span>` : ''}<button>Svara</button></form>`;
    else if (f.typ === 'tid') svar = '<form class="gt-tid"><input inputmode="numeric" maxlength="2" aria-label="Timmar" placeholder="tt"><span class="gt-kolon">:</span><input inputmode="numeric" maxlength="2" aria-label="Minuter" placeholder="mm"><button>Svara</button></form>';
    else if (f.typ === 'langd') svar = '<form class="gt-tid"><input inputmode="numeric" maxlength="2" aria-label="Timmar"><span class="gt-enh">h</span><input inputmode="numeric" maxlength="2" aria-label="Minuter"><span class="gt-enh">min</span><button>Svara</button></form>';
    else if (f.typ === 'val') svar = `<div class="alt">${blanda(f.alt).map(a => `<button class="mb" type="button">${a}</button>`).join('')}</div>`;
    else if (f.typ === 'stall') svar = `<div class="gt-stall"><div class="gt-knappar"><button type="button" data-d="-60">− 1 h</button><button type="button" data-d="60">+ 1 h</button>
      <button type="button" data-d="-${f.steg}">− ${f.steg} min</button><button type="button" data-d="${f.steg}">+ ${f.steg} min</button></div><button class="knapp2 gt-klar" type="button">Klar</button></div>`;
    el.innerHTML = `<div class="kort-t gt-kort"><div class="topp"><span>${O.ikon} ${O.namn} · ${namnVal()}</span><span>Uppgift ${nr} av ${lista.length} · ⭐ ${ratt}${svit >= 3 ? ' · 🔥 ' + svit + ' i rad' : ''}</span></div>
      <div class="bar"><i style="width:${(nr - 1) / lista.length * 100}%"></i></div>
      <div class="fraga${f.q.length > 40 ? ' liten' : ''}">${f.q}</div>
      ${f.typ === 'stall' ? klocka(0, 0, 'stor drag') : f.bild ? `<div class="gt-bild">${f.bild}</div>` : ''}
      ${svar}<p class="fb" aria-live="polite"></p><button class="lank tips" type="button">Visa ledtråd</button></div>`;
    const fb = el.querySelector('.fb');
    el.querySelector('.tips').onclick = () => { fb.className = 'fb tipsrad'; fb.textContent = '💡 ' + f.ledtrad; };
    const ratta = () => { if (!fel) { ratt++; svit++; } else svit = 0; fb.className = 'fb ok'; fb.textContent = val(BRA); setTimeout(ny, 1000); };
    const nasta = (text) => {
      svit = 0;
      const q = f.q.replace(/<[^>]+>/g, '');
      if (!(f.typ === 'val' && f.bild)) missar.push(f.fakta || (/=\s*$/.test(q) ? `${q} ${text}` : f.typ === 'langd' && q.includes('? h') ? q.replace('? h ? min', text) : f.typ === 'tal' && q.includes('?') ? q.replace('?', text) : `${q} → ${text}`));
      fb.className = 'fb nej'; fb.innerHTML = `Rätt svar är <b>${text}</b>. ${f.ledtrad} <button class="lank" type="button">Nästa →</button>`;
      fb.querySelector('button').onclick = ny; fb.querySelector('button').focus();
    };
    const igen = () => { fb.className = 'fb nej'; fb.textContent = 'Inte riktigt. Försök en gång till! 💡 ' + f.ledtrad; };
    if (f.typ === 'val') {
      el.querySelectorAll('.alt .mb').forEach(b => b.onclick = () => {
        if (b.textContent === f.alt[0]) { el.querySelectorAll('.alt .mb').forEach(x => x.disabled = true); b.classList.add('par'); ratta(); return; }
        b.disabled = true; b.classList.add('fel', 'kvar');
        if (++fel < 2) return igen();
        el.querySelectorAll('.alt .mb').forEach(x => { x.disabled = true; if (x.textContent === f.alt[0]) x.classList.add('par'); });
        nasta(f.alt[0]);
      });
      return;
    }
    if (f.typ === 'stall') return stall(f, fb, ratta, nasta, igen);
    const inp = [...el.querySelectorAll('form input')];
    inp[0].focus();
    if (inp.length === 2) inp[0].oninput = () => { if (inp[0].value.length === 2) inp[1].focus(); };
    el.querySelector('form').onsubmit = e => {
      e.preventDefault();
      if (inp[0].disabled) return;
      let ok, visa;
      if (f.typ === 'tal') {
        const g = tal(inp[0].value);
        if (isNaN(g)) { fb.className = 'fb'; fb.textContent = 'Skriv ett tal, till exempel 12 eller 0,5.'; return; }
        ok = Math.abs(g - f.svar) < 1e-9; visa = sv(f.svar) + (f.enhet ? ' ' + f.enhet : '');
      } else {
        const a = inp[0].value.trim() === '' && f.typ === 'langd' ? 0 : tal(inp[0].value), b = inp[1].value.trim() === '' ? 0 : tal(inp[1].value);
        if (isNaN(a) || isNaN(b) || (f.typ === 'tid' && inp[0].value.trim() === '')) { fb.className = 'fb'; fb.textContent = f.typ === 'tid' ? 'Skriv timmar och minuter, till exempel 14 : 05.' : 'Skriv timmar och minuter.'; return; }
        if (b >= 60) { fb.className = 'fb'; fb.textContent = 'Minuterna ska vara färre än 60. 60 min är 1 h.'; return; }
        if (f.typ === 'tid') { ok = a % 24 === f.svar[0] && b === f.svar[1]; visa = tt(f.svar[0], f.svar[1]); }
        else { ok = a * 60 + b === f.svar; visa = `${Math.floor(f.svar / 60)} h ${f.svar % 60} min`; }
      }
      if (ok) { inp.forEach(i => i.disabled = true); return ratta(); }
      if (++fel < 2) { igen(); inp[0].select(); return; }
      inp.forEach(i => i.disabled = true); nasta(visa);
    };
  }
  function stall(f, fb, ratta, nasta, igen) {
    const svg = el.querySelector('svg.drag'), H = svg.querySelector('.kl-h'), M = svg.querySelector('.kl-m');
    let t = r(0, 11) * 60 + (f.steg === 5 ? r(0, 11) * 5 : r(0, 59)), klart = false;
    if (t === f.mal) t = (t + 180) % 720;
    const rita = () => { H.setAttribute('transform', `rotate(${t / 2} 100 100)`); M.setAttribute('transform', `rotate(${(t % 60) * 6} 100 100)`); };
    rita();
    el.querySelectorAll('[data-d]').forEach(b => b.onclick = () => { if (!klart) { t = (t + +b.dataset.d + 720) % 720; rita(); } });
    let drar = false;
    const flytta = e => {
      const k = svg.getBoundingClientRect(), x = (e.clientX - k.left) / k.width * 200 - 100, y = (e.clientY - k.top) / k.height * 200 - 100;
      let m = Math.round((Math.atan2(x, -y) * 180 / Math.PI + 360) % 360 / 6 / f.steg) * f.steg % 60;
      const gammal = t % 60; let h = Math.floor(t / 60);
      if (gammal > 40 && m < 20) h++; else if (gammal < 20 && m > 40) h--;
      t = ((h * 60 + m) % 720 + 720) % 720; rita();
    };
    svg.onpointerdown = e => { if (klart) return; drar = true; svg.setPointerCapture(e.pointerId); flytta(e); };
    svg.onpointermove = e => { if (drar) flytta(e); };
    svg.onpointerup = svg.onpointercancel = () => { drar = false; };
    el.querySelector('.gt-klar').onclick = () => {
      if (klart) return;
      if (t === f.mal) { klart = true; return ratta(); }
      if (++fel < 2) return igen();
      klart = true; t = f.mal; rita(); svg.classList.add('visad');
      nasta(`${Math.floor(f.mal / 60) || 12}.${pad(f.mal % 60)}`);
    };
  }
  function klar() {
    const n = lista.length, m = ratt >= n * .9 ? 'Fantastiskt! 🏆' : ratt >= n * .6 ? 'Bra jobbat! 🌟' : 'Bra kämpat! Träna en gång till så går det ännu bättre. 💪';
    const k = location.hash.slice(1).split('/')[0];
    el.innerHTML = `<div class="kort-t klar"><p class="fraga">${m}</p><p>Du fick ${ratt} av ${n} rätt på första försöket.</p>
      ${missar.length ? `<div class="gt-missar"><b>Öva lite till på:</b><ul>${missar.map(x => `<li>${x}</li>`).join('')}</ul></div>` : ''}
      <button class="knapp2" data-a="om">Träna igen</button> <a class="knapp2 sek" href="#${k}">Byt nivå</a> <a class="knapp2 sek" href="#">Alla övningar</a></div>`;
    el.querySelector('[data-a=om]').onclick = () => start(k, V);
  }
  function route() {
    const [k, v] = decodeURIComponent(location.hash.slice(1)).split('/');
    if (OV[k] && v && OV[k].val.some(a => a[0] === v)) start(k, v);
    else if (OV[k]) valmeny(k);
    else meny();
    if (k) el.scrollIntoView({block: 'start', behavior: 'smooth'});
  }
  window.GT_TEST = {OV, fras, del, tt, ENH};  // för automatiska tester
  window.addEventListener('hashchange', route);
  route();
})();
