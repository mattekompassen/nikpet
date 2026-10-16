// Övningsdata för åk 8, per kapitel. Läses av trana.js.
var TRANA_DATA = ({r, val, sv, tus, sgn, blanda}) => {
  const M = '#E5AD45', I = '#164E63', G = '#C9D3C5';
  const br = (t, n) => `<span class="br"><span>${t}</span><span>${n}</span></span>`;
  const svg = (w, h, inner) => `<svg class="fig" viewBox="0 0 ${w} ${h}" width="${Math.round(w * 1.5)}" aria-hidden="true">${inner}</svg>`;
  const f1 = x => x.toFixed(1);
  const vinkel = d => {
    const a = d * Math.PI / 180, x = 90 + 80 * Math.cos(a), y = 100 - 80 * Math.sin(a), ax = 90 + 24 * Math.cos(a), ay = 100 - 24 * Math.sin(a);
    const bage = d === 90 ? `<path d="M110 100 V80 H90" fill="none" stroke="${M}" stroke-width="5"/>` : `<path d="M114 100 A24 24 0 0 0 ${f1(ax)} ${f1(ay)}" fill="none" stroke="${M}" stroke-width="6"/>`;
    return svg(180, 110, `${bage}<path d="M170 100 H90 L${f1(x)} ${f1(y)}" fill="none" stroke="${I}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="90" cy="100" r="4" fill="${I}"/>`);
  };
  const txt = (x, y, t) => `<text x="${x}" y="${y}" font-size="13" font-weight="700" fill="${I}" font-family="Inter,sans-serif">${t}</text>`;
  const paj = (delar, mark) => {
    let v = 0, ut = '';
    delar.forEach((d, i) => {
      const a1 = v / 100 * 2 * Math.PI - Math.PI / 2; v += d; const a2 = v / 100 * 2 * Math.PI - Math.PI / 2;
      const p = (a) => `${f1(80 + 45 * Math.cos(a))} ${f1(55 + 45 * Math.sin(a))}`;
      const farg = mark === undefined ? ['#3E5A3A', '#82B8D4', '#E5AD45', '#D97870'][i] : (i === mark ? M : G);
      ut += `<path d="M80 55 L${p(a1)} A45 45 0 ${d > 50 ? 1 : 0} 1 ${p(a2)} Z" fill="${farg}" stroke="#fff" stroke-width="2"/>`;
    });
    return svg(160, 110, ut);
  };
  const axlar = `<path d="M20 95 H150 M30 105 V10" stroke="${I}" stroke-width="2.5"/>`;
  const sgd = (a, b) => b ? sgd(b, a % b) : a;
  const fr = (t, n) => { const g = sgd(Math.abs(t), n); return `${t / g}/${n / g}`; };
  const ups = (b, e) => `${b}<sup>${e}</sup>`;
  const pi = (v) => ({svar: Math.round(v), tol: Math.max(1, Math.round(v) * 0.004)});
  const S = `stroke="${M}" stroke-width="4" fill="none" stroke-linejoin="round"`;
  const tradd = svg(160, 115, `<path d="M15 57 L70 27 M15 57 L70 87 M78 27 L135 12 M78 27 L135 40 M78 87 L135 74 M78 87 L135 102" stroke="${M}" stroke-width="3"/>${txt(66, 22, 'K')}${txt(66, 104, 'H')}${txt(140, 16, 'K')}${txt(140, 44, 'H')}${txt(140, 78, 'K')}${txt(140, 106, 'H')}<circle cx="15" cy="57" r="4" fill="${I}"/>`);
  return ({
  '1': {namn: 'Tal',
  avsnitt: {
    '1.1': {namn: 'Räkna med bråk', gen() {
      const [t, n] = val([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [3, 8], [5, 8]]), m = r(2, 6), h = r(1, 5);
      return val([
        {q: `Förkorta ${br(t * m, n * m)} så långt det går.`, svar: `${t}/${n}`, ledtrad: `Dela både täljaren och nämnaren med ${m}.`},
        {q: `${br(t, n)} = ${br('?', n * m)}`, svar: t * m, ledtrad: `Nämnaren har multiplicerats med ${m}. Gör samma sak med täljaren.`},
        {q: `Skriv ${h} ${br(t, n)} i bråkform. Svara med täljaren: ${br('?', n)}`, svar: h * n + t, ledtrad: `${h} hela är ${h * n}/${n}. Lägg till ${t}/${n}.`}]);
    }},
    '1.2': {namn: 'Addition och subtraktion av bråk', gen() {
      const [n1, n2] = val([[2, 3], [2, 4], [3, 4], [2, 5], [3, 6], [4, 8], [2, 6], [5, 10], [4, 6], [3, 5]]), a = r(1, n1 - 1), b = r(1, n2 - 1);
      const plus = {q: `${br(a, n1)} + ${br(b, n2)} = ?<br><small>Svara i bråkform, t.ex. 5/6.</small>`, svar: fr(a * n2 + b * n1, n1 * n2), ledtrad: 'Skriv om bråken så att de får samma nämnare. Addera sedan täljarna.'};
      const [s1, s2] = a / n1 >= b / n2 ? [[a, n1], [b, n2]] : [[b, n2], [a, n1]];
      const minus = {q: `${br(...s1)} − ${br(...s2)} = ?<br><small>Svara i bråkform.</small>`, svar: fr(s1[0] * s2[1] - s2[0] * s1[1], s1[1] * s2[1]), ledtrad: 'Skriv om bråken så att de får samma nämnare. Subtrahera sedan täljarna.'};
      return val([plus, minus]);
    }},
    '1.3': {namn: 'Multiplikation av bråk', gen() {
      const a = r(1, 5), b = r(a + 1, 9), c = r(1, 5), d = r(c + 1, 9), k = r(2, 6);
      return val([
        {q: `${br(a, b)} · ${br(c, d)} = ?<br><small>Svara i bråkform.</small>`, svar: fr(a * c, b * d), ledtrad: 'Multiplicera täljare med täljare och nämnare med nämnare.'},
        {q: `${k} · ${br(a, b)} = ?<br><small>Svara i bråkform.</small>`, svar: fr(k * a, b), ledtrad: `Multiplicera täljaren med ${k}. Nämnaren är kvar.`},
        {q: `Hur mycket är ${br(a, b)} av ${b * k}?`, svar: a * k, ledtrad: `Dela ${b * k} med ${b} och multiplicera sedan med ${a}.`}]);
    }},
    '1.4': {namn: 'Division av bråk', gen() {
      const a = r(1, 5), b = r(a + 1, 9), c = r(1, 5), d = r(c + 1, 9), n = r(2, 9), k = r(2, 5);
      return val([
        {q: `${br(a, b)} / ${br(c, d)} = ?<br><small>Svara i bråkform.</small>`, svar: fr(a * d, b * c), ledtrad: `Multiplicera med det inverterade talet: ${br(a, b)} · ${br(d, c)}.`},
        {q: `${n} / ${br(1, k)} = ?`, svar: n * k, ledtrad: `Hur många ${k}-delar går det på ${n}? Det är samma som ${n} · ${k}.`},
        {q: `${br(a, b)} / ${k} = ?<br><small>Svara i bråkform.</small>`, svar: fr(a, b * k), ledtrad: `Att dela med ${k} är samma som att multiplicera med ${br(1, k)}.`}]);
    }},
    '1.5': {namn: 'Potenser', gen() {
      const b = r(2, 5), e = r(2, 4), c = r(2, 4), d = r(2, 3);
      return val([
        {q: `${ups(b, e)} = ?`, svar: b ** e, ledtrad: `${ups(b, e)} betyder att ${b} multipliceras med sig självt ${e} gånger.`},
        {q: `${ups(c, 2)} + ${ups(d, 3)} = ?`, svar: c * c + d ** 3, ledtrad: 'Räkna ut potenserna först och addera sedan.'},
        {q: `Skriv ${Array(e).fill(b).join(' · ')} som en potens. Vad blir exponenten?`, svar: e, ledtrad: `Räkna hur många gånger ${b} står som faktor.`},
        {q: `(−${c})<sup>${d}</sup> = ?`, svar: (-c) ** d, ledtrad: 'Jämn exponent ger positivt svar. Udda exponent ger negativt svar.'}]);
    }},
    '1.6': {namn: 'Tiopotenser', gen() {
      const e = r(2, 6), a = r(2, 9), f = r(2, 5), g = r(1, 3), d = r(11, 99) / 10;
      return val([
        {q: `${ups(10, e)} = ?`, svar: 10 ** e, ledtrad: `${ups(10, e)} är en etta följd av ${e} nollor.`},
        {q: `${a} · ${ups(10, f)} = ?`, svar: a * 10 ** f, ledtrad: `Multiplicera ${a} med ${tus(10 ** f)}.`},
        {q: `${sv(d)} · ${ups(10, f)} = ?`, svar: Math.round(d * 10 ** f), ledtrad: `Flytta decimaltecknet ${f} steg åt höger.`},
        {q: `${tus(a * 10 ** f)} = ${a} · ${ups(10, '?')}`, svar: f, ledtrad: 'Räkna antalet nollor.'},
        {q: `${ups(10, '−' + g)} = ?<br><small>Svara i decimalform.</small>`, svar: 10 ** -g, ledtrad: `${ups(10, '−' + g)} = 1 / ${ups(10, g)}.`}]);
    }},
  },
  begrepp: [
    ['Täljare', 'Talet ovanför bråkstrecket'],
    ['Nämnare', 'Talet under bråkstrecket'],
    ['Förkorta', 'Dela täljare och nämnare med samma tal'],
    ['Förlänga', 'Multiplicera täljare och nämnare med samma tal'],
    ['Blandad form', 'Heltal och bråk tillsammans, t.ex. 2 1/3'],
    ['Gemensam nämnare', 'Samma nämnare i flera bråk'],
    ['Inverterat tal', 'Täljare och nämnare har bytt plats, t.ex. 3/4 och 4/3'],
    ['Potens', 'Ett tal skrivet med bas och exponent, t.ex. 2³'],
    ['Bas', 'Talet som multipliceras med sig självt i en potens'],
    ['Exponent', 'Visar hur många gånger basen är faktor'],
    ['Kvadrat', 'Ett tal upphöjt till 2, t.ex. 5²'],
    ['Tiopotens', 'Talet 10 upphöjt till ett tal, t.ex. 10⁴'],
    ['Grundpotensform', 'Ett tal skrivet som t.ex. 3,5 · 10⁴'],
    ['Negativ exponent', 'Visar en del av en hel, t.ex. 10⁻² = 0,01'],
    ['Prefix', 'Förled som kilo (10³) och milli (10⁻³)'],
  ],
  exempel: [
    [br('<mark>5</mark>', '8'), 'täljare', 'Talet ovanför bråkstrecket heter täljare.'],
    [br('5', '<mark>8</mark>'), 'nämnare', 'Talet under bråkstrecket heter nämnare.'],
    ['<mark>2 ' + br('1', '3') + '</mark>', 'blandad form', 'Ett heltal och ett bråk tillsammans är blandad form.'],
    [br('6', '8') + ' = <mark>' + br('3', '4') + '</mark>', 'förkortning', 'Täljare och nämnare har delats med 2. Bråket är förkortat.', 'Vad har vi gjort med bråket?'],
    [br('3', '4') + ' = <mark>' + br('6', '8') + '</mark>', 'förlängning', 'Täljare och nämnare har multiplicerats med 2. Bråket är förlängt.', 'Vad har vi gjort med bråket?'],
    [br('3', '4') + ' &nbsp;och&nbsp; <mark>' + br('4', '3') + '</mark>', 'inverterat tal', 'Täljare och nämnare har bytt plats. 4/3 är det inverterade talet till 3/4.'],
    ['<mark>5</mark><sup>3</sup>', 'bas', 'Talet som multipliceras med sig självt heter bas.'],
    ['5<sup><mark>3</mark></sup>', 'exponent', 'Det lilla talet uppe till höger heter exponent.'],
    ['<mark>2<sup>4</sup></mark> = 16', 'potens', '2⁴ är en potens med basen 2 och exponenten 4.'],
    ['<mark>10<sup>6</sup></mark>', 'tiopotens', '10 upphöjt till ett tal heter tiopotens.'],
    ['4 500 = <mark>4,5 · 10<sup>3</sup></mark>', 'grundpotensform', 'Ett tal mellan 1 och 10 gånger en tiopotens är grundpotensform.'],
    [br('1', '4') + ' + ' + br('1', '6') + ' = ' + br('3', '<mark>12</mark>') + ' + ' + br('2', '<mark>12</mark>'), 'gemensam nämnare', 'Båda bråken har nu nämnaren 12. Det är en gemensam nämnare.'],
  ],
  dra: [
    ['I bråket 3/7 är 7 ___.', 'nämnaren'],
    ['I bråket 3/7 är 3 ___.', 'täljaren'],
    ['Att skriva 6/8 som 3/4 kallas att ___.', 'förkorta'],
    ['Att skriva 3/4 som 6/8 kallas att ___.', 'förlänga'],
    ['2 1/3 är skrivet i ___ form.', 'blandad'],
    ['3/4 och 4/3 är ___ tal.', 'inverterade'],
    ['I 2⁵ är 2 ___.', 'basen'],
    ['I 2⁵ är 5 ___.', 'exponenten'],
    ['10⁴ är en ___.', 'tiopotens'],
    ['3,2 · 10⁵ är skrivet i ___.', 'grundpotensform'],
    ['4 · 4 · 4 kan skrivas som en ___: 4³.', 'potens'],
    ['Ett tal upphöjt till 2 kallas ett tal i ___.', 'kvadrat'],
  ],
  quiz: [
    ['Förkorta 12/18 så långt det går.', ['2/3', '6/9', '4/6', '3/2'], 'Dela täljare och nämnare med 6.'],
    ['Vad är 1/2 + 1/3?', ['5/6', '2/5', '1/5', '2/6'], 'Gemensam nämnare 6: 3/6 + 2/6 = 5/6.'],
    ['Vad är 3/4 − 1/2?', ['1/4', '1/2', '2/6', '3/8'], '1/2 = 2/4. 3/4 − 2/4 = 1/4.'],
    ['Vad är 2/3 · 3/5?', ['2/5', '5/8', '6/8', '10/9'], '2 · 3 = 6 och 3 · 5 = 15. 6/15 = 2/5.'],
    ['Hur många halvor går det på 3? (3 / 1/2)', ['6', '1,5', '3,5', '2'], 'Varje hel har två halvor: 3 · 2 = 6.'],
    ['Skriv 2 1/4 i bråkform.', ['9/4', '3/4', '8/4', '6/4'], '2 hela = 8/4. 8/4 + 1/4 = 9/4.'],
    ['Vad är 2⁴?', ['16', '8', '6', '24'], '2 · 2 · 2 · 2 = 16.'],
    ['Vad kallas 3 i 5³?', ['Exponent', 'Bas', 'Potens', 'Faktor'], 'Det lilla talet uppe till höger är exponenten.'],
    ['Vad är 10⁵?', ['100 000', '10 000', '50', '1 000 000'], 'En etta följd av fem nollor.'],
    ['Vad är 4,2 · 10³?', ['4 200', '420', '42 000', '0,0042'], 'Flytta decimaltecknet tre steg åt höger.'],
    ['Vilken tiopotens är 0,001?', ['10⁻³', '10³', '10⁻²', '10⁻⁴'], '0,001 = 1/1 000 = 10⁻³.'],
    ['Vilket tal är skrivet i grundpotensform?', ['3,6 · 10⁴', '36 · 10³', '0,36 · 10⁵', '360 · 10²'], 'Talet framför tiopotensen ska vara mellan 1 och 10.'],
    ['Vad är (−3)²?', ['9', '−9', '6', '−6'], '(−3) · (−3) = 9.'],
    ['Hur mycket är 3/8 av 40?', ['15', '24', '5', '12'], '40 / 8 = 5 och 3 · 5 = 15.'],
    ['Vilket är det inverterade talet till 2/7?', ['7/2', '−2/7', '1/7', '2/14'], 'Byt plats på täljare och nämnare.'],
  ]},
  '2': {namn: 'Procent',
  avsnitt: {
    '2.1': {namn: 'Andelen', gen() {
      const hel = val([20, 25, 50, 200, 400]), del = hel <= 50 ? r(1, hel - 1) : hel / 100 * 5 * r(1, 19), p = r(1, 99);
      return val([
        {q: `Hur många procent är ${del} av ${hel}?`, svar: del * 100 / hel, ledtrad: `Andelen är ${del}/${hel}. Dela och multiplicera med 100.`},
        {q: `Skriv ${p} % i decimalform.`, svar: p / 100, ledtrad: 'Procent betyder hundradelar. Dela med 100.'},
        {q: `Skriv ${sv(p / 100)} i procentform. ? %`, svar: p, ledtrad: 'Multiplicera med 100.'}]);
    }},
    '2.2': {namn: 'Jämförelser och förändringar', gen() {
      const a = val([50, 80, 100, 200, 400, 500]), p = val([5, 10, 20, 25, 50]), x = r(10, 60), y = x + r(2, 15);
      return val([
        {q: `Priset ökar från ${a} kr till ${sv(a * (1 + p / 100))} kr. Med hur många procent ökar priset?`, svar: p, ledtrad: `Ökningen är ${a * p / 100} kr. Hur stor andel är det av ${a} kr?`},
        {q: `Priset sänks från ${a} kr till ${sv(a * (1 - p / 100))} kr. Med hur många procent sänks priset?`, svar: p, ledtrad: `Sänkningen är ${a * p / 100} kr. Jämför med det ursprungliga priset ${a} kr.`},
        {q: `Andelen ökar från ${x} % till ${y} %. Hur många procentenheter är ökningen?`, svar: y - x, ledtrad: 'Procentenheter är skillnaden mellan procentsatserna.'},
        {q: `Vilken förändringsfaktor motsvarar en ökning med ${p} %?`, svar: 1 + p / 100, ledtrad: `100 % + ${p} % = ${100 + p} % = ${sv(1 + p / 100)}.`},
        {q: `Vilken förändringsfaktor motsvarar en minskning med ${p} %?`, svar: 1 - p / 100, ledtrad: `100 % − ${p} % = ${100 - p} % = ${sv(1 - p / 100)}.`}]);
    }},
    '2.3': {namn: 'Det hela', gen() {
      const hel = 20 * r(2, 30), p = val([5, 10, 20, 25, 40, 50]), d = hel * p / 100;
      return val([
        {q: `${p} % av ett tal är ${d}. Vilket är talet?`, svar: hel, ledtrad: `Räkna först ut 1 %: ${d} / ${p}. Multiplicera sedan med 100.`},
        {q: `${d} elever är ${p} % av alla elever på skolan. Hur många elever går på skolan?`, svar: hel, ledtrad: `${p} % är ${d} elever. Hur många är 100 %?`},
        {q: `Rabatten är ${d} kr, vilket är ${p} % av priset. Vad var priset från början (kr)?`, svar: hel, ledtrad: `Det hela = delen / andelen = ${d} / ${sv(p / 100)}.`}]);
    }},
    '2.4': {namn: 'Delen', gen() {
      const hel = 20 * r(2, 30), p = val([5, 10, 15, 20, 25, 30, 40, 75]), a = 100 * r(2, 12), q = val([10, 20, 25, 30]);
      return val([
        {q: `Hur mycket är ${p} % av ${hel}?`, svar: hel * p / 100, ledtrad: `${p} % = ${sv(p / 100)}. Räkna ${sv(p / 100)} · ${hel}.`},
        {q: `En vara kostar ${a} kr och höjs med ${q} %. Vad blir det nya priset (kr)?`, svar: a * (1 + q / 100), ledtrad: `Förändringsfaktorn är ${sv(1 + q / 100)}. Räkna ${a} · ${sv(1 + q / 100)}.`},
        {q: `En vara kostar ${a} kr och sänks med ${q} %. Vad blir det nya priset (kr)?`, svar: a * (1 - q / 100), ledtrad: `Förändringsfaktorn är ${sv(1 - q / 100)}. Räkna ${a} · ${sv(1 - q / 100)}.`}]);
    }},
    '2.5': {namn: 'Ränta', gen() {
      const K = val([500, 1000, 2000, 5000, 10000]), rs = val([1, 2, 3, 4, 5, 1.5, 2.5]);
      return val([
        {q: `Du sätter in ${tus(K)} kr på ett konto med räntan ${sv(rs)} % per år. Hur mycket ränta får du efter ett år (kr)?`, svar: K * rs / 100, ledtrad: `Räkna ${sv(rs)} % av ${tus(K)} kr.`},
        {q: `Du sätter in ${tus(K)} kr på ett konto med räntan ${sv(rs)} % per år. Hur mycket finns på kontot efter ett år (kr)?`, svar: K * (1 + rs / 100), ledtrad: `Förändringsfaktorn är ${sv(1 + rs / 100)}. Räkna ${tus(K)} · ${sv(1 + rs / 100)}.`},
        {q: `Ett lån på ${tus(K)} kr har räntan ${sv(rs)} % per år. Hur mycket ränta betalar du på ett år (kr)?`, svar: K * rs / 100, ledtrad: `Räkna ${sv(rs)} % av ${tus(K)} kr.`},
        {q: `Du sätter in ${tus(K)} kr med räntan ${sv(rs)} % per år. Hur mycket finns på kontot efter två år med ränta på ränta (kr)?`, svar: Math.round(K * (1 + rs / 100) ** 2 * 100) / 100, ledtrad: `Multiplicera med förändringsfaktorn ${sv(1 + rs / 100)} två gånger.`}]);
    }},
  },
  begrepp: [
    ['Andel', 'Hur stor del något är av det hela'],
    ['Det hela', 'Hela mängden man jämför med'],
    ['Delen', 'Den del av det hela som andelen gäller'],
    ['Procent', 'Hundradelar'],
    ['Procentenhet', 'Skillnaden mellan två procentsatser'],
    ['Förändringsfaktor', 'Talet man multiplicerar med vid en förändring, t.ex. 1,25'],
    ['Ökning', 'När något blir större'],
    ['Minskning', 'När något blir mindre'],
    ['Ränta', 'Pengar man får när man sparar eller betalar när man lånar'],
    ['Räntesats', 'Räntan i procent per år'],
    ['Kapital', 'Pengarna man har på kontot'],
    ['Lån', 'Pengar man får låna och betala tillbaka'],
    ['Rabatt', 'Hur mycket priset sänks'],
    ['Promille', 'Tusendelar'],
    ['Ränta på ränta', 'Räntan räknas också på tidigare ränta'],
  ],
  exempel: [
    ['<mark>15</mark> av 60 elever', 'delen', '15 är den del vi talar om. Det är delen.'],
    ['15 av <mark>60</mark> elever', 'det hela', '60 är alla elever. Det är det hela.'],
    [br('15', '60') + ' = <mark>25 %</mark>', 'andel', '25 % visar hur stor del 15 är av 60. Det är andelen.'],
    ['200 kr · <mark>1,25</mark> = 250 kr', 'förändringsfaktor', 'Talet man multiplicerar med vid en förändring heter förändringsfaktor.'],
    ['Från 40 % till 46 %: <mark>6</mark>', 'procentenheter', 'Skillnaden mellan två procentsatser mäts i procentenheter.', 'Vad mäts det markerade i?'],
    ['1 000 kr · 0,03 = <mark>30 kr</mark>', 'ränta', 'Pengarna du får för att du sparar heter ränta.'],
    ['Räntan är <mark>3 %</mark> per år.', 'räntesats', 'Räntan i procent heter räntesats.'],
    ['Du har <mark>1 000 kr</mark> på kontot.', 'kapital', 'Pengarna på kontot heter kapital.'],
    ['Pris 400 kr &nbsp;<mark>−25 %</mark>', 'rabatt', 'Priset sänks. Det är en rabatt.'],
    ['<mark>5 ‰</mark>', 'promille', '‰ betyder promille, tusendelar.'],
    ['200 kr → <mark>250 kr</mark>', 'ökning', 'Priset har blivit större. Det är en ökning.', 'Vad har hänt med priset?'],
    ['250 kr → <mark>200 kr</mark>', 'minskning', 'Priset har blivit mindre. Det är en minskning.', 'Vad har hänt med priset?'],
  ],
  dra: [
    ['Hur stor del något är av det hela kallas ___.', 'andelen'],
    ['I ”15 av 60 elever” är 60 ___.', 'det hela'],
    ['I ”15 av 60 elever” är 15 ___.', 'delen'],
    ['Vid en ökning med 25 % är ___ 1,25.', 'förändringsfaktorn'],
    ['Från 40 % till 46 % är en ökning med 6 ___.', 'procentenheter'],
    ['Pengar som banken ger dig för att du sparar kallas ___.', 'ränta'],
    ['Räntan i procent per år kallas ___.', 'räntesats'],
    ['Pengarna du har på kontot kallas ___.', 'kapital'],
    ['När priset sänks får man ___.', 'rabatt'],
    ['Tusendelar kallas ___.', 'promille'],
    ['Om priset går från 200 kr till 250 kr är det en ___.', 'ökning'],
    ['Om priset går från 250 kr till 200 kr är det en ___.', 'minskning'],
  ],
  quiz: [
    ['Hur många procent är 15 av 60?', ['25 %', '15 %', '40 %', '4 %'], '15/60 = 1/4 = 25 %.'],
    ['Priset ökar från 200 kr till 250 kr. Hur stor är ökningen i procent?', ['25 %', '50 %', '20 %', '125 %'], 'Ökningen är 50 kr. 50/200 = 25 %.'],
    ['Vilken förändringsfaktor motsvarar en ökning med 30 %?', ['1,3', '0,3', '1,03', '0,7'], '100 % + 30 % = 130 % = 1,3.'],
    ['Vilken förändringsfaktor motsvarar en minskning med 20 %?', ['0,8', '1,2', '0,2', '0,98'], '100 % − 20 % = 80 % = 0,8.'],
    ['20 % av ett tal är 14. Vilket är talet?', ['70', '2,8', '34', '280'], '1 % är 0,7. 100 % är 70.'],
    ['Andelen ökar från 40 % till 46 %. Hur stor är ökningen?', ['6 procentenheter', '6 %', '15 procentenheter', '46 %'], 'Skillnaden mellan procentsatserna mäts i procentenheter.'],
    ['Du sparar 1 000 kr med räntan 3 % per år. Hur mycket ränta får du efter ett år?', ['30 kr', '300 kr', '3 kr', '1 030 kr'], '3 % av 1 000 kr = 30 kr.'],
    ['En jacka kostar 800 kr och sänks med 25 %. Vad blir det nya priset?', ['600 kr', '200 kr', '775 kr', '1 000 kr'], '800 · 0,75 = 600.'],
    ['Hur skrivs 0,07 i procent?', ['7 %', '70 %', '0,7 %', '0,07 %'], '0,07 = 7 hundradelar = 7 %.'],
    ['Hur mycket är 120 % av 50?', ['60', '10', '170', '6'], '50 · 1,2 = 60.'],
    ['Vilket uttryck ger priset när 400 kr höjs med 15 %?', ['400 · 1,15', '400 · 0,15', '400 + 15', '400 · 1,5'], 'Förändringsfaktorn för +15 % är 1,15.'],
    ['Priset sänks från 500 kr till 400 kr. Hur stor är sänkningen i procent?', ['20 %', '25 %', '100 %', '80 %'], 'Sänkningen är 100 kr. 100/500 = 20 %.'],
    ['Hur mycket är 5 ‰ i procent?', ['0,5 %', '5 %', '50 %', '0,05 %'], '5 tusendelar = 0,5 hundradelar = 0,5 %.'],
    ['Du sparar 2 000 kr med räntan 5 % per år. Hur mycket finns efter två år med ränta på ränta?', ['2 205 kr', '2 200 kr', '2 100 kr', '2 010 kr'], '2 000 · 1,05 · 1,05 = 2 205.'],
    ['Hur mycket är 1 % av 3 500 kr?', ['35 kr', '350 kr', '3,5 kr', '3 500 kr'], 'Dela med 100.'],
  ]},
  '3': {namn: 'Geometri',
  avsnitt: {
    '3.1': {namn: 'Omkrets och area', gen() {
      const a = r(2, 12), b = r(2, 12), h = r(2, 10), t1 = r(2, 9), t2 = t1 + 2 * r(1, 3);
      return val([
        {q: `En rektangel är ${a} cm lång och ${b} cm bred. Vad är omkretsen (cm)?`, svar: 2 * (a + b), ledtrad: 'Addera alla fyra sidorna.'},
        {q: `En rektangel är ${a} cm lång och ${b} cm bred. Vad är arean (cm²)?`, svar: a * b, ledtrad: 'Arean = längd · bredd.'},
        {q: `Ett parallellogram har basen ${a} cm och höjden ${h} cm. Vad är arean (cm²)?`, svar: a * h, ledtrad: 'Arean = bas · höjd.'},
        {q: `En triangel har basen ${2 * a} cm och höjden ${h} cm. Vad är arean (cm²)?`, svar: a * h, ledtrad: 'Arean = bas · höjd / 2.'},
        {q: `En parallelltrapets har de parallella sidorna ${t1} cm och ${t2} cm och höjden ${h} cm. Vad är arean (cm²)?`, svar: (t1 + t2) * h / 2, ledtrad: 'Arean = (a + b) · h / 2.'}]);
    }},
    '3.2': {namn: 'Cirkelns area', gen() {
      const rr = r(2, 12);
      return val([
        {q: `En cirkel har radien ${rr} cm. Beräkna arean (cm²). Avrunda till heltal.`, ...pi(Math.PI * rr * rr), ledtrad: 'Arean = π · r · r. Använd π ≈ 3,14.'},
        {q: `En cirkel har diametern ${2 * rr} cm. Beräkna omkretsen (cm). Avrunda till heltal.`, ...pi(Math.PI * 2 * rr), ledtrad: 'Omkretsen = π · d. Använd π ≈ 3,14.'},
        {q: `En cirkel har radien ${rr} cm. Hur lång är diametern (cm)?`, svar: 2 * rr, ledtrad: 'Diametern är dubbelt så lång som radien.'},
        {q: `En cirkel har diametern ${2 * rr} cm. Beräkna arean (cm²). Avrunda till heltal.`, ...pi(Math.PI * rr * rr), ledtrad: `Radien är hälften av diametern: ${rr} cm. Arean = π · r · r.`}]);
    }},
    '3.3': {namn: 'Volym och begränsningsarea', gen() {
      const a = r(2, 10), b = r(2, 8), c = r(2, 6), s = r(2, 8);
      return val([
        {q: `Ett rätblock är ${a} cm långt, ${b} cm brett och ${c} cm högt. Vad är volymen (cm³)?`, svar: a * b * c, ledtrad: 'Volymen = längd · bredd · höjd.'},
        {q: `En kub har sidan ${s} cm. Vad är volymen (cm³)?`, svar: s ** 3, ledtrad: 'Volymen = s · s · s.'},
        {q: `En kub har sidan ${s} cm. Vad är begränsningsarean (cm²)?`, svar: 6 * s * s, ledtrad: 'En kub har 6 lika stora kvadratiska sidor.'},
        {q: `Ett rätblock är ${a} cm långt, ${b} cm brett och ${c} cm högt. Vad är begränsningsarean (cm²)?`, svar: 2 * (a * b + a * c + b * c), ledtrad: 'Det finns tre par lika stora sidor: 2 · (l · b + l · h + b · h).'}]);
    }},
    '3.4': {namn: 'Enheter för volym', gen() {
      const a = r(2, 9), d = r(11, 95) / 10, c = r(2, 9) * 10;
      return val([
        {q: `${a} dm³ = ? liter`, svar: a, ledtrad: '1 dm³ = 1 liter.'},
        {q: `${sv(d)} liter = ? cm³`, svar: Math.round(d * 1000), ledtrad: '1 liter = 1 000 cm³.'},
        {q: `${a} m³ = ? dm³`, svar: a * 1000, ledtrad: '1 m³ = 1 000 dm³.'},
        {q: `${c} cl = ? dl`, svar: c / 10, ledtrad: '1 dl = 10 cl.'},
        {q: `${c * 10} ml = ? dl`, svar: c / 10, ledtrad: '1 dl = 100 ml.'},
        {q: `${a * 1000} cm³ = ? liter`, svar: a, ledtrad: '1 000 cm³ = 1 liter.'}]);
    }},
    '3.5': {namn: 'Prisma och pyramid', gen() {
      const B = r(4, 30), h = 3 * r(1, 5), b = 2 * r(2, 6), th = r(2, 8), l = r(3, 12);
      return val([
        {q: `Ett prisma har basytan ${B} cm² och höjden ${h} cm. Vad är volymen (cm³)?`, svar: B * h, ledtrad: 'Volymen = basytan · höjden.'},
        {q: `En pyramid har basytan ${B} cm² och höjden ${h} cm. Vad är volymen (cm³)?`, svar: B * h / 3, ledtrad: 'Volymen = basytan · höjden / 3.'},
        {q: `Ett prisma har en triangel som basyta med basen ${b} cm och höjden ${th} cm. Prismat är ${l} cm långt. Vad är volymen (cm³)?`, svar: b * th / 2 * l, ledtrad: `Räkna först triangelns area: ${b} · ${th} / 2. Multiplicera sedan med ${l}.`}]);
    }},
    '3.6': {namn: 'Cylinder, kon och klot', gen() {
      const rr = r(2, 8), h = r(3, 15);
      return val([
        {q: `En cylinder har radien ${rr} cm och höjden ${h} cm. Beräkna volymen (cm³). Avrunda till heltal.`, ...pi(Math.PI * rr * rr * h), ledtrad: 'Volymen = π · r² · h.'},
        {q: `En kon har radien ${rr} cm och höjden ${h} cm. Beräkna volymen (cm³). Avrunda till heltal.`, ...pi(Math.PI * rr * rr * h / 3), ledtrad: 'Volymen = π · r² · h / 3.'},
        {q: `Ett klot har radien ${rr} cm. Beräkna volymen (cm³). Avrunda till heltal.`, ...pi(4 * Math.PI * rr ** 3 / 3), ledtrad: 'Volymen = 4 · π · r³ / 3.'}]);
    }},
  },
  begrepp: [
    ['Radie', 'Avståndet från cirkelns mittpunkt till randen'],
    ['Diameter', 'Sträckan tvärs över cirkeln genom mittpunkten'],
    ['π (pi)', 'Omkretsen delat med diametern, ungefär 3,14'],
    ['Volym', 'Hur mycket som ryms i en kropp'],
    ['Begränsningsarea', 'Summan av alla sidoytors area'],
    ['Rätblock', 'En kropp med sex rektangulära sidor'],
    ['Kub', 'Ett rätblock där alla kanter är lika långa'],
    ['Prisma', 'En kropp med två likadana parallella basytor'],
    ['Pyramid', 'En kropp med en basyta och en spets'],
    ['Cylinder', 'En kropp med två cirklar som basytor'],
    ['Kon', 'En kropp med en cirkel som bas och en spets'],
    ['Klot', 'En rund kropp där alla punkter på ytan är lika långt från mitten'],
    ['Basyta', 'Den yta som kroppen står på'],
    ['Liter', 'Samma volym som 1 dm³'],
    ['Parallelltrapets', 'En fyrhörning med två parallella sidor'],
  ],
  exempel: [
    [svg(160, 110, `<circle cx="80" cy="55" r="42" fill="#fff" stroke="${I}" stroke-width="3"/><path d="M80 55 H122" stroke="${M}" stroke-width="6"/><circle cx="80" cy="55" r="4" fill="${I}"/>`), 'radie', 'Sträckan från mittpunkten till randen heter radie.', 'Vad heter den markerade sträckan?'],
    [svg(160, 110, `<circle cx="80" cy="55" r="42" fill="#fff" stroke="${I}" stroke-width="3"/><path d="M38 55 H122" stroke="${M}" stroke-width="6"/><circle cx="80" cy="55" r="4" fill="${I}"/>`), 'diameter', 'Sträckan tvärs över cirkeln genom mittpunkten heter diameter.', 'Vad heter den markerade sträckan?'],
    [svg(160, 115, `<path d="M35 45 H95 V105 H35Z" fill="#fff" ${S}/><path d="M35 45 L55 25 H115 L95 45 M115 25 V85 L95 105" ${S}/>`), 'kub', 'Alla kanter är lika långa. Kroppen heter kub.', 'Vad heter kroppen?'],
    [svg(160, 115, `<path d="M15 55 H115 V100 H15Z" fill="#fff" ${S}/><path d="M15 55 L40 30 H140 L115 55 M140 30 V75 L115 100" ${S}/>`), 'rätblock', 'Sex rektangulära sidor. Kroppen heter rätblock.', 'Vad heter kroppen?'],
    [svg(160, 115, `<ellipse cx="80" cy="22" rx="40" ry="10" ${S}/><path d="M40 22 V92 M120 22 V92 M40 92 A40 10 0 0 0 120 92" ${S}/>`), 'cylinder', 'Två cirklar som basytor. Kroppen heter cylinder.', 'Vad heter kroppen?'],
    [svg(160, 115, `<path d="M80 8 L40 95 M80 8 L120 95" ${S}/><ellipse cx="80" cy="95" rx="40" ry="10" ${S}/>`), 'kon', 'En cirkel som bas och en spets. Kroppen heter kon.', 'Vad heter kroppen?'],
    [svg(160, 115, `<circle cx="80" cy="57" r="46" ${S}/><ellipse cx="80" cy="57" rx="46" ry="12" stroke="${M}" stroke-width="2.5" fill="none" stroke-dasharray="5 4"/>`), 'klot', 'En rund kropp. Den heter klot.', 'Vad heter kroppen?'],
    [svg(160, 115, `<path d="M25 100 H105 L135 78 H55 Z" ${S}/><path d="M25 100 L80 12 L105 100 M80 12 L135 78 M80 12 L55 78" ${S}/>`), 'pyramid', 'En basyta och en spets. Kroppen heter pyramid.', 'Vad heter kroppen?'],
    [svg(160, 115, `<path d="M20 100 H70 L45 55 Z" fill="#fff" ${S}/><path d="M45 55 L105 30 L130 75 L70 100 M105 30" ${S}/><path d="M20 100 L80 75 L130 75 M80 75 L105 30" stroke="${M}" stroke-width="2.5" stroke-dasharray="5 4" fill="none"/>`), 'prisma', 'Två likadana basytor (trianglar). Kroppen heter prisma.', 'Vad heter kroppen?'],
    ['<mark>24 cm³</mark>', 'volym', 'cm³ är en enhet för volym.', 'Vilken storhet mäts i cm³?'],
    ['<mark>3,14</mark>…', 'pi (π)', 'Talet 3,14… heter pi och skrivs π.', 'Vad heter talet?'],
  ],
  dra: [
    ['Avståndet från cirkelns mittpunkt till randen kallas ___.', 'radien'],
    ['Sträckan tvärs över cirkeln genom mittpunkten kallas ___.', 'diametern'],
    ['Hur mycket som ryms i en kropp kallas ___.', 'volym'],
    ['Summan av alla sidoytors area kallas ___.', 'begränsningsarea'],
    ['En kropp med sex kvadratiska sidor är en ___.', 'kub'],
    ['En burk har formen av en ___.', 'cylinder'],
    ['En glasstrut har formen av en ___.', 'kon'],
    ['En fotboll har formen av ett ___.', 'klot'],
    ['1 dm³ är lika mycket som 1 ___.', 'liter'],
    ['Volymen av ett prisma är ___ gånger höjden.', 'basytan'],
    ['Cirkelns area är π gånger radien i ___.', 'kvadrat'],
    ['De kända byggnaderna i Egypten har formen av en ___.', 'pyramid'],
  ],
  quiz: [
    ['En cirkel har radien 5 cm. Hur lång är diametern?', ['10 cm', '2,5 cm', '25 cm', '15,7 cm'], 'Diametern är dubbelt så lång som radien.'],
    ['Vilken formel ger cirkelns area?', ['π · r²', '2 · π · r', 'π · d', 'r · r'], 'Arean = π · r · r.'],
    ['En cirkel har diametern 10 cm. Vad är omkretsen? (π ≈ 3,14)', ['31,4 cm', '78,5 cm', '15,7 cm', '314 cm'], 'Omkretsen = π · d = 3,14 · 10.'],
    ['Hur mycket är 1 dm³?', ['1 liter', '1 dl', '1 cl', '10 liter'], '1 dm³ = 1 liter.'],
    ['Ett rätblock är 2 cm, 3 cm och 4 cm. Vad är volymen?', ['24 cm³', '9 cm³', '52 cm²', '24 cm²'], '2 · 3 · 4 = 24 cm³.'],
    ['En kub har sidan 3 cm. Vad är volymen?', ['27 cm³', '9 cm³', '18 cm³', '54 cm³'], '3 · 3 · 3 = 27 cm³.'],
    ['En kub har sidan 3 cm. Vad är begränsningsarean?', ['54 cm²', '27 cm²', '9 cm²', '36 cm²'], '6 sidor · 9 cm² = 54 cm².'],
    ['Hur många dm³ är 1 m³?', ['1 000', '100', '10', '10 000'], '10 · 10 · 10 = 1 000.'],
    ['En pyramid har basytan 12 cm² och höjden 5 cm. Vad är volymen?', ['20 cm³', '60 cm³', '17 cm³', '30 cm³'], '12 · 5 / 3 = 20 cm³.'],
    ['Vilken kropp har en cirkel som bas och en spets?', ['Kon', 'Cylinder', 'Pyramid', 'Klot'], 'En kon har en cirkel som bas och en spets.'],
    ['En parallelltrapets har de parallella sidorna 6 cm och 4 cm och höjden 3 cm. Vad är arean?', ['15 cm²', '30 cm²', '13 cm²', '72 cm²'], '(6 + 4) · 3 / 2 = 15 cm².'],
    ['Hur räknar man ut volymen av ett prisma?', ['basytan · höjden', 'basytan · höjden / 3', 'längd + bredd + höjd', '2 · basytan'], 'Volymen = basytan · höjden.'],
    ['Hur mycket är 250 ml?', ['2,5 dl', '25 dl', '0,25 dl', '2,5 cl'], '100 ml = 1 dl.'],
    ['Vilket mått är en volym?', ['3 liter', '3 cm²', '3 m', '3 kg'], 'Liter är en enhet för volym.'],
    ['En kon och en cylinder har samma bas och höjd. Hur stor är konens volym?', ['En tredjedel av cylinderns', 'Hälften av cylinderns', 'Lika stor', 'Tre gånger större'], 'Konens volym = π · r² · h / 3.'],
  ]},
  '4': {namn: 'Algebra',
  avsnitt: {
    '4.1': {namn: 'Algebraiska uttryck', gen() {
      const a = r(2, 9), b = r(1, 5), x = r(2, 9), c = r(1, 15);
      return val([
        {q: `Beräkna 3a − 2b om a = ${a} och b = ${b}.`, svar: 3 * a - 2 * b, ledtrad: `Byt ut a mot ${a} och b mot ${b}: 3 · ${a} − 2 · ${b}.`},
        {q: `Beräkna x² + ${c} om x = ${x}.`, svar: x * x + c, ledtrad: `x² betyder x · x = ${x} · ${x}.`},
        {q: `Beräkna 2x² om x = ${x}.`, svar: 2 * x * x, ledtrad: `Räkna först x² = ${x * x}. Multiplicera sedan med 2.`},
        {q: `Beräkna 5 − x om x = −${x}.`, svar: 5 + x, ledtrad: `5 − (−${x}) = 5 + ${x}.`}]);
    }},
    '4.2': {namn: 'Mönster', gen() {
      const a = r(1, 9), d = r(2, 7), n = r(6, 25), c = r(0, 5);
      return val([
        {q: `Talföljden är ${a}, ${a + d}, ${a + 2 * d}, ${a + 3 * d}, … Vilket tal står på plats ${n}?`, svar: a + (n - 1) * d, ledtrad: `Talen ökar med ${d}. Från plats 1 till plats ${n} är det ${n - 1} steg.`},
        {q: `Figur n består av ${d}n + ${c} stickor. Vilken figur består av ${d * n + c} stickor?`, svar: n, ledtrad: `Lös ekvationen ${d}n + ${c} = ${d * n + c}.`},
        {q: `Talföljden är ${d + c}, ${2 * d + c}, ${3 * d + c}, ${4 * d + c}, … Uttrycket för plats n är ${d}n + ▢`, svar: c, ledtrad: `Talen ökar med ${d}, alltså ${d}n. Vad ska läggas till för att plats 1 blir ${d + c}?`}]);
    }},
    '4.3': {namn: 'Uttryck med parenteser', gen() {
      const a = r(2, 9), b = r(1, 9), c = r(1, 9), e = a + r(1, 5);
      return val([
        {q: `${a}(x + ${b}) = ${a}x + ▢`, svar: a * b, ledtrad: `Multiplicera in ${a}: ${a} · ${b}.`},
        {q: `${a}(${b}x − ${c}) = ▢x − ${a * c}`, svar: a * b, ledtrad: `Multiplicera in ${a}: ${a} · ${b}x.`},
        {q: `−(x − ${b}) = −x + ▢`, svar: b, ledtrad: 'Ett minustecken framför parentesen ändrar tecknen inuti.'},
        {q: `${e}x − (${a}x − ${b}) = ▢x + ${b}`, svar: e - a, ledtrad: `Ta bort parentesen: ${e}x − ${a}x + ${b}.`}]);
    }},
    '4.4': {namn: 'Multiplikation av parenteser', gen() {
      const a = r(1, 7), b = r(1, 7);
      return val([
        {q: `(x + ${a})(x + ${b}) = x² + ▢x + ${a * b}`, svar: a + b, ledtrad: `Multiplicera varje term: x · ${b} + ${a} · x = ${a + b}x.`},
        {q: `(x + ${a})(x + ${b}) = x² + ${a + b}x + ▢`, svar: a * b, ledtrad: `Den sista termen är ${a} · ${b}.`},
        {q: `(x + ${a})² = x² + ▢x + ${a * a}`, svar: 2 * a, ledtrad: 'Kvadreringsregeln: (x + a)² = x² + 2ax + a².'},
        {q: `(x + ${a})(x − ${a}) = x² − ▢`, svar: a * a, ledtrad: 'Konjugatregeln: (x + a)(x − a) = x² − a².'}]);
    }},
    '4.5': {namn: 'Uttryck med potenser', gen() {
      const a = r(2, 6), b = r(2, 5), c = r(2, 9), d = r(2, 9);
      return val([
        {q: `x${'<sup>' + a + '</sup>'} · x<sup>${b}</sup> = x<sup>▢</sup>`, svar: a + b, ledtrad: 'Samma bas: addera exponenterna.'},
        {q: `x<sup>${a + b}</sup> / x<sup>${b}</sup> = x<sup>▢</sup>`, svar: a, ledtrad: 'Samma bas: subtrahera exponenterna.'},
        {q: `(x<sup>${a}</sup>)<sup>${b}</sup> = x<sup>▢</sup>`, svar: a * b, ledtrad: 'Potens av en potens: multiplicera exponenterna.'},
        {q: `${c}x² + ${d}x² = ▢x²`, svar: c + d, ledtrad: 'x²-termerna är av samma sort. Addera koefficienterna.'}]);
    }},
    '4.6': {namn: 'Ekvationer', gen() {
      const x = r(1, 12), a = r(2, 9), b = r(1, 20), c = r(1, a - 1), d = (a - c) * x - b;
      return val([
        {q: `Lös ekvationen: ${a}x + ${b} = ${a * x + b}`, svar: x, ledtrad: `Subtrahera ${b} och dela sedan med ${a}.`},
        {q: `Lös ekvationen: ${a}x − ${b} = ${c === 1 ? '' : c}x ${d < 0 ? '− ' + (-d) : '+ ' + d}`, svar: x, ledtrad: `Samla x i vänster led och talen i höger led.`},
        {q: `Lös ekvationen: x/${a} + ${b} = ${x + b}`, svar: a * x, ledtrad: `Subtrahera ${b} och multiplicera sedan med ${a}.`}]);
    }},
    '4.7': {namn: 'Ekvationer med parenteser', gen() {
      const x = r(1, 10), a = r(2, 6), b = r(1, 8), c = r(1, a - 1), d = (a - c) * x + a * b;
      return val([
        {q: `Lös ekvationen: ${a}(x + ${b}) = ${a * (x + b)}`, svar: x, ledtrad: `Multiplicera in ${a} eller dela båda leden med ${a}.`},
        {q: `Lös ekvationen: ${a}(x − ${b}) = ${a * x}`, svar: x + b, ledtrad: `Dela båda leden med ${a} och addera sedan ${b}.`},
        {q: `Lös ekvationen: ${a}(x + ${b}) = ${c === 1 ? '' : c}x + ${d}`, svar: x, ledtrad: `Multiplicera in: ${a}x + ${a * b} = ${c === 1 ? '' : c}x + ${d}. Samla sedan x.`}]);
    }},
    '4.8': {namn: 'Problemlösning med ekvationer', gen() {
      const w = r(2, 15), k = r(1, 8), n = r(5, 40), b = r(5, 15), v = r(10, 40), bp = r(20, 60);
      return val([
        {q: `En rektangel är ${k} cm längre än den är bred. Omkretsen är ${2 * (2 * w + k)} cm. Hur bred är rektangeln (cm)?`, svar: w, ledtrad: `Kalla bredden x. Då gäller 2x + 2(x + ${k}) = ${2 * (2 * w + k)}.`},
        {q: `Summan av tre heltal som följer på varandra är ${3 * n + 3}. Vilket är det minsta talet?`, svar: n, ledtrad: `Kalla talen x, x + 1 och x + 2. Då är 3x + 3 = ${3 * n + 3}.`},
        {q: `Anna är ${k} år äldre än Ben. Tillsammans är de ${2 * b + k} år. Hur gammal är Ben?`, svar: b, ledtrad: `Kalla Bens ålder x. Då gäller x + (x + ${k}) = ${2 * b + k}.`},
        {q: `En vuxenbiljett kostar ${v} kr mer än en barnbiljett. 2 vuxenbiljetter och 3 barnbiljetter kostar ${2 * (bp + v) + 3 * bp} kr. Vad kostar en barnbiljett (kr)?`, svar: bp, ledtrad: `Kalla barnbiljetten x. Då gäller 2(x + ${v}) + 3x = ${2 * (bp + v) + 3 * bp}.`}]);
    }},
  },
  begrepp: [
    ['Variabel', 'En bokstav som står för ett tal'],
    ['Uttryck', 'Tal, variabler och räknesätt utan likhetstecken'],
    ['Ekvation', 'Två uttryck med likhetstecken emellan'],
    ['Koefficient', 'Talet framför variabeln'],
    ['Term', 'En del av ett uttryck som skiljs åt med + eller −'],
    ['Multiplicera in', 'Multiplicera talet framför parentesen med varje term inuti'],
    ['Förenkla', 'Skriva ett uttryck kortare'],
    ['Potens', 'Ett tal skrivet med bas och exponent, t.ex. x³'],
    ['Exponent', 'Visar hur många gånger basen är faktor'],
    ['Kvadreringsregeln', '(a + b)² = a² + 2ab + b²'],
    ['Konjugatregeln', '(a + b)(a − b) = a² − b²'],
    ['Lösning', 'Det värde på x som gör att ekvationen stämmer'],
    ['Prövning', 'Sätta in lösningen för att kontrollera den'],
    ['Formel', 'En regel skriven med variabler'],
    ['Talföljd', 'Tal som följer på varandra enligt en regel'],
  ],
  exempel: [
    ['3(x + 2) = <mark>3x + 6</mark>', 'multiplicera in', 'Vi har multiplicerat 3 med varje term i parentesen.', 'Vad har vi gjort?'],
    ['(x + 3)² = <mark>x² + 6x + 9</mark>', 'kvadreringsregeln', '(a + b)² = a² + 2ab + b² heter kvadreringsregeln.', 'Vilken regel används?'],
    ['(x + 4)(x − 4) = <mark>x² − 16</mark>', 'konjugatregeln', '(a + b)(a − b) = a² − b² heter konjugatregeln.', 'Vilken regel används?'],
    ['x<sup><mark>5</mark></sup>', 'exponent', 'Det lilla talet uppe till höger heter exponent.'],
    ['<mark>x</mark><sup>5</sup>', 'bas', 'Det som multipliceras med sig självt heter bas.'],
    ['2x + 3x = <mark>5x</mark>', 'förenkling', 'Uttrycket har skrivits kortare. Det är en förenkling.', 'Vad har vi gjort?'],
    ['<mark>4(x + 1) = 12</mark>', 'ekvation', 'Det finns ett likhetstecken och ett okänt tal. Det är en ekvation.'],
    ['<mark>4</mark>x²', 'koefficient', 'Talet framför variabeln heter koefficient.'],
    ['<mark>x²</mark> + 3x + 2', 'term', 'Delarna som adderas heter termer.'],
    ['4(x + 1) = 12 &nbsp;→&nbsp; <mark>x = 2</mark>', 'lösning', 'x = 2 gör att ekvationen stämmer. Det är lösningen.'],
    ['x = 2: &nbsp;<mark>4 · 2 − 1 = 7</mark> ✓', 'prövning', 'Vi sätter in lösningen för att kontrollera. Det är en prövning.', 'Vad gör vi här?'],
    ['<mark>3, 7, 11, 15 …</mark>', 'talföljd', 'Tal som följer en regel heter talföljd.'],
  ],
  dra: [
    ['Att räkna ut 3(x + 2) = 3x + 6 kallas att ___ in.', 'multiplicera'],
    ['(a + b)² = a² + 2ab + b² kallas ___.', 'kvadreringsregeln'],
    ['(a + b)(a − b) = a² − b² kallas ___.', 'konjugatregeln'],
    ['I x⁵ är 5 ___.', 'exponenten'],
    ['I 7x är 7 en ___.', 'koefficient'],
    ['En bokstav som står för ett tal kallas en ___.', 'variabel'],
    ['x = 2 är ___ till ekvationen 3x = 6.', 'lösningen'],
    ['Ett minustecken framför en parentes ___ tecknen inuti.', 'ändrar'],
    ['x² · x³ = x⁵, eftersom man ___ exponenterna.', 'adderar'],
    ['(x²)³ = x⁶, eftersom man ___ exponenterna.', 'multiplicerar'],
    ['2x + 3 är ett ___.', 'uttryck'],
    ['2x + 3 = 9 är en ___.', 'ekvation'],
  ],
  quiz: [
    ['Multiplicera in: 3(x − 4)', ['3x − 12', '3x − 4', 'x − 12', '3x + 12'], 'Både x och 4 multipliceras med 3.'],
    ['(x + 2)(x + 3) = ?', ['x² + 5x + 6', 'x² + 6x + 5', 'x² + 6', '2x + 5'], 'x · x + 3x + 2x + 2 · 3.'],
    ['(x + 4)² = ?', ['x² + 8x + 16', 'x² + 16', 'x² + 4x + 16', '2x + 8'], 'Kvadreringsregeln: x² + 2 · 4x + 4².'],
    ['(x + 5)(x − 5) = ?', ['x² − 25', 'x² + 25', 'x² − 10x − 25', '2x'], 'Konjugatregeln: x² − 5².'],
    ['x³ · x⁴ = ?', ['x⁷', 'x¹²', '2x⁷', 'x'], 'Addera exponenterna: 3 + 4 = 7.'],
    ['5x − (2x − 3) = ?', ['3x + 3', '3x − 3', '7x − 3', '3x'], 'Minustecknet ändrar tecknen: 5x − 2x + 3.'],
    ['Lös ekvationen 4(x + 2) = 20.', ['x = 3', 'x = 4,5', 'x = 5', 'x = 12'], 'Dela med 4: x + 2 = 5. x = 3.'],
    ['Lös ekvationen 5x − 7 = 2x + 8.', ['x = 5', 'x = 1/3', 'x = 15', 'x = 3'], '3x = 15, alltså x = 5.'],
    ['Vad är 2a² om a = 3?', ['18', '36', '12', '9'], 'a² = 9 och 2 · 9 = 18.'],
    ['Talföljden är 5, 9, 13, 17 … Vilket uttryck ger talet på plats n?', ['4n + 1', 'n + 4', '5n', '4n + 5'], 'Talen ökar med 4. Plats 1: 4 · 1 + 1 = 5.'],
    ['−(x − 6) = ?', ['−x + 6', '−x − 6', 'x + 6', 'x − 6'], 'Minustecknet ändrar tecknen inuti parentesen.'],
    ['(x²)³ = ?', ['x⁶', 'x⁵', 'x⁸', '3x²'], 'Multiplicera exponenterna: 2 · 3 = 6.'],
    ['Summan av tre heltal som följer på varandra är 33. Vilket är det minsta talet?', ['10', '11', '9', '12'], 'x + (x + 1) + (x + 2) = 33 ger x = 10.'],
    ['Vad heter regeln (a + b)² = a² + 2ab + b²?', ['Kvadreringsregeln', 'Konjugatregeln', 'Prioriteringsregeln', 'Potensregeln'], 'Den heter kvadreringsregeln.'],
    ['Lös ekvationen x/4 + 3 = 8.', ['x = 20', 'x = 44', 'x = 5', 'x = 1,25'], 'x/4 = 5, alltså x = 20.'],
  ]},
  '5': {namn: 'Statistik och sannolikhet',
  avsnitt: {
    '5.1': {namn: 'Hur stor är sannolikheten', gen() {
      const [f, n] = val([['hjärter', 13], ['ett ess', 4], ['en kung eller en dam', 8], ['ett rött kort', 26]]), a = r(1, 6), b = r(1, 6), c = r(1, 6), p = 5 * r(2, 18);
      return val([
        {q: `Du drar ett kort ur en vanlig kortlek med 52 kort. Vad är sannolikheten att få ${f}? Svara i bråkform.`, svar: `${n}/52`, ledtrad: 'Sannolikhet = antal gynnsamma utfall / antal möjliga utfall.'},
        {q: `I en påse finns ${a} röda, ${b} gröna och ${c} gula kulor. Vad är sannolikheten att dra en grön? Svara i bråkform.`, svar: `${b}/${a + b + c}`, ledtrad: `Det finns ${a + b + c} kulor och ${b} av dem är gröna.`},
        {q: `Sannolikheten att vinna är ${p} %. Vad är sannolikheten att inte vinna (%)?`, svar: 100 - p, ledtrad: 'Att det händer och att det inte händer är tillsammans 100 %.'},
        {q: `Sannolikheten att vinna är ${sv(p / 100)}. Vad är sannolikheten att inte vinna? Svara i decimalform.`, svar: 1 - p / 100, ledtrad: 'Komplementhändelsen: 1 − sannolikheten.'}]);
    }},
    '5.2': {namn: 'Oberoende och beroende händelser', gen() {
      const rd = r(2, 6), bl = r(2, 6), n = rd + bl;
      return val([
        {q: 'Du singlar två mynt. Vad är sannolikheten att båda visar krona? Svara i bråkform.', svar: '1/4', ledtrad: '1/2 · 1/2.'},
        {q: 'Du kastar två tärningar. Vad är sannolikheten att båda visar sexa? Svara i bråkform.', svar: '1/36', ledtrad: '1/6 · 1/6.'},
        {q: 'Du singlar ett mynt och kastar en tärning. Vad är sannolikheten för krona och sexa? Svara i bråkform.', svar: '1/12', ledtrad: '1/2 · 1/6.'},
        {q: `I en påse finns ${rd} röda och ${bl} blå kulor. Du drar två kulor utan att lägga tillbaka. Vad är sannolikheten att båda är röda? Svara i bråkform.`, svar: fr(rd * (rd - 1), n * (n - 1)), ledtrad: `Första: ${rd}/${n}. Sedan finns ${rd - 1} röda av ${n - 1} kvar. Multiplicera.`},
        {q: `I en påse finns ${rd} röda och ${bl} blå kulor. Du drar en kula, lägger tillbaka den och drar igen. Vad är sannolikheten att båda är röda? Svara i bråkform.`, svar: fr(rd * rd, n * n), ledtrad: `Båda gångerna är sannolikheten ${rd}/${n}. Multiplicera.`}]);
    }},
    '5.3': {namn: 'Kombinatorik', gen() {
      const a = r(2, 6), b = r(2, 6), n = r(3, 5), k = r(2, 4), m = r(4, 10);
      const fak = x => x <= 1 ? 1 : x * fak(x - 1);
      return val([
        {q: `Du har ${a} tröjor och ${b} byxor. På hur många sätt kan du kombinera en tröja och en byxa?`, svar: a * b, ledtrad: 'Multiplikationsprincipen: multiplicera antalet val.'},
        {q: `På hur många sätt kan ${n} personer ställa sig i en kö?`, svar: fak(n), ledtrad: `Första platsen har ${n} val, nästa ${n - 1} och så vidare.`},
        {q: `En kod har ${k} siffror. Varje siffra kan vara 0–9. Hur många olika koder finns det?`, svar: 10 ** k, ledtrad: `Varje siffra har 10 val: 10 · 10 …, ${k} gånger.`},
        {q: `I en klass med ${m} elever ska en ordförande och en sekreterare väljas. På hur många sätt kan det göras?`, svar: m * (m - 1), ledtrad: `Ordförande: ${m} val. Sekreterare: ${m - 1} val.`},
        {q: `${m} personer hälsar på varandra en gång var. Hur många handskakningar blir det?`, svar: m * (m - 1) / 2, ledtrad: `Varje person hälsar på ${m - 1}. Dela med 2 eftersom varje handskakning räknas två gånger.`}]);
    }},
    '5.4': {namn: 'Tabeller och diagram', gen() {
      const sporter = ['Fotboll', 'Basket', 'Simning', 'Dans'], tot = val([20, 25, 50]);
      let v; do { v = [0, 0, 0].map(() => r(2, tot / 2)); v.push(tot - v.reduce((x, y) => x + y, 0)); } while (v[3] < 1);
      const tab = `<table class="tab"><tr><th>Sport</th>${sporter.map(s => `<th>${s}</th>`).join('')}</tr><tr><th>Antal</th>${v.map(x => `<td>${x}</td>`).join('')}</tr></table>`;
      const i = r(0, 3), j = (i + r(1, 3)) % 4, [hi, lo] = v[i] >= v[j] ? [i, j] : [j, i];
      const intro = `Tabellen visar vilken sport ${tot} elever tycker bäst om.`;
      return val([
        {q: `${intro}${tab}Hur många procent valde ${sporter[i].toLowerCase()}?`, svar: v[i] * 100 / tot, ledtrad: `Andelen är ${v[i]}/${tot}. Gör om till procent.`},
        {q: `${intro}${tab}Hur många grader blir ${sporter[i].toLowerCase()} i ett cirkeldiagram?`, svar: v[i] * 360 / tot, ledtrad: `Andelen är ${v[i]}/${tot}. Hela cirkeln är 360°.`},
        {q: `${intro}${tab}Hur många fler valde ${sporter[hi].toLowerCase()} än ${sporter[lo].toLowerCase()}?`, svar: v[hi] - v[lo], ledtrad: 'Subtrahera det mindre antalet från det större.'}]);
    }},
  },
  begrepp: [
    ['Sannolikhet', 'Hur troligt det är att något inträffar'],
    ['Utfall', 'Ett möjligt resultat av ett slumpförsök'],
    ['Utfallsrum', 'Alla möjliga utfall'],
    ['Gynnsamt utfall', 'Ett utfall som är det man söker'],
    ['Komplementhändelse', 'Att händelsen inte inträffar'],
    ['Oberoende händelser', 'Det första påverkar inte det andra'],
    ['Beroende händelser', 'Det första påverkar det andra'],
    ['Träddiagram', 'Diagram som visar alla utfall i flera steg'],
    ['Kombinatorik', 'Läran om på hur många sätt något kan ordnas'],
    ['Multiplikationsprincipen', 'Antalet val i varje steg multipliceras'],
    ['Relativ frekvens', 'Frekvensen delat med det totala antalet'],
    ['Frekvenstabell', 'Tabell som visar hur ofta varje värde förekommer'],
    ['Cirkeldiagram', 'Diagram där sektorer visar andelar av en helhet'],
    ['Stapeldiagram', 'Diagram där staplarnas höjd visar antalet'],
    ['Medelvärde', 'Summan av värdena delat med antalet värden'],
  ],
  exempel: [
    ['Chansen att få sexa är <mark>' + br('1', '6') + '</mark>', 'sannolikhet', '1/6 visar hur troligt det är. Det är sannolikheten.'],
    ['Du kastar en tärning och får <mark>5</mark>.', 'utfall', '5 är ett av de möjliga resultaten. Det är ett utfall.'],
    ['<mark>{1, 2, 3, 4, 5, 6}</mark>', 'utfallsrum', 'Alla möjliga utfall tillsammans heter utfallsrum.', 'Vad kallas alla möjliga utfall?'],
    ['Sexa: ' + br('1', '6') + ' &nbsp; <mark>Inte sexa: ' + br('5', '6') + '</mark>', 'komplementhändelse', 'Att händelsen inte inträffar heter komplementhändelse.'],
    ['Kasta en tärning <mark>två gånger</mark>', 'oberoende händelser', 'Första kastet påverkar inte det andra. Händelserna är oberoende.', 'Vad är det för sorts händelser?'],
    ['Dra två kulor <mark>utan att lägga tillbaka</mark>', 'beroende händelser', 'Första dragningen påverkar den andra. Händelserna är beroende.', 'Vad är det för sorts händelser?'],
    [tradd, 'träddiagram', 'Diagrammet visar alla utfall i två steg. Det är ett träddiagram.', 'Vad heter diagrammet?'],
    ['3 tröjor · 4 byxor = <mark>12</mark> sätt', 'multiplikationsprincipen', 'Antalet val multipliceras. Det är multiplikationsprincipen.', 'Vilken princip används?'],
    [svg(160, 115, `${axlar}<rect x="42" y="45" width="18" height="50" fill="${M}"/><rect x="70" y="25" width="18" height="70" fill="${M}"/><rect x="98" y="60" width="18" height="35" fill="${M}"/><rect x="126" y="38" width="18" height="57" fill="${M}"/>`), 'stapeldiagram', 'Staplarnas höjd visar antalet. Det är ett stapeldiagram.', 'Vad heter diagrammet?'],
    [paj([45, 30, 25]), 'cirkeldiagram', 'Cirkeln är delad i sektorer som visar andelar. Det är ett cirkeldiagram.', 'Vad heter diagrammet?'],
    ['<table class="tab"><tr><th>Mål</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>Frekvens</th><td>4</td><td>7</td><td>5</td><td>2</td></tr></table>', 'frekvenstabell', 'Tabellen visar hur ofta varje värde förekommer. Det är en frekvenstabell.', 'Vad heter tabellen?'],
    ['Krona 18 gånger av 40: &nbsp;<mark>45 %</mark>', 'relativ frekvens', 'Antal gånger delat med totala antalet är den relativa frekvensen.'],
  ],
  dra: [
    ['Alla möjliga utfall kallas ___.', 'utfallsrummet'],
    ['Att händelsen inte inträffar kallas ___.', 'komplementhändelsen'],
    ['Om det första försöket inte påverkar det andra är händelserna ___.', 'oberoende'],
    ['Om man drar kulor utan att lägga tillbaka är händelserna ___.', 'beroende'],
    ['Ett ___ visar alla utfall i flera steg.', 'träddiagram'],
    ['3 tröjor och 4 byxor ger 3 · 4 = 12 kombinationer enligt ___.', 'multiplikationsprincipen'],
    ['Hur troligt något är kallas ___.', 'sannolikhet'],
    ['Läran om på hur många sätt något kan ordnas kallas ___.', 'kombinatorik'],
    ['Antal gånger delat med totala antalet kallas relativ ___.', 'frekvens'],
    ['I ett ___ visar sektorerna andelar av en helhet.', 'cirkeldiagram'],
    ['I ett ___ visar staplarnas höjd antalet.', 'stapeldiagram'],
    ['Summan delat med antalet kallas ___.', 'medelvärde'],
  ],
  quiz: [
    ['Du singlar två mynt. Vad är sannolikheten att båda visar krona?', ['1/4', '1/2', '1/3', '2/2'], '1/2 · 1/2 = 1/4.'],
    ['Du kastar en tärning. Vad är sannolikheten att inte få en sexa?', ['5/6', '1/6', '1/5', '6/5'], '1 − 1/6 = 5/6.'],
    ['Du har 3 tröjor och 4 byxor. Hur många kombinationer finns det?', ['12', '7', '3', '24'], '3 · 4 = 12.'],
    ['På hur många sätt kan tre personer ställa sig i en kö?', ['6', '3', '9', '27'], '3 · 2 · 1 = 6.'],
    ['En påse har 2 röda och 3 blå kulor. Du drar två utan att lägga tillbaka. Sannolikheten att båda är röda?', ['1/10', '4/25', '2/5', '1/5'], '2/5 · 1/4 = 2/20 = 1/10.'],
    ['Vilka händelser är oberoende?', ['Att kasta en tärning två gånger', 'Att dra två kulor utan att lägga tillbaka', 'Att dra två kort utan att lägga tillbaka', 'Att välja två elever ur en grupp'], 'Tärningen minns inte förra kastet.'],
    ['Sannolikheten för regn är 0,3. Vad är sannolikheten att det inte regnar?', ['0,7', '0,3', '1,3', '0,03'], '1 − 0,3 = 0,7.'],
    ['Hur många tresiffriga koder kan man göra med siffrorna 0–9?', ['1 000', '30', '999', '729'], '10 · 10 · 10 = 1 000.'],
    ['Du kastar två tärningar. Vad är sannolikheten att båda visar sexa?', ['1/36', '1/6', '1/12', '2/6'], '1/6 · 1/6 = 1/36.'],
    ['En kortlek har 52 kort och 4 ess. Vad är sannolikheten att dra ett ess?', ['1/13', '1/4', '4/13', '1/52'], '4/52 = 1/13.'],
    ['Vad visar ett träddiagram?', ['Alla möjliga utfall i flera steg', 'Medelvärdet', 'En förändring över tid', 'Andelar av en helhet'], 'Varje gren är ett möjligt utfall.'],
    ['8 lag möter varandra en gång var. Hur många matcher blir det?', ['28', '56', '16', '64'], '8 · 7 / 2 = 28.'],
    ['Av 25 elever valde 10 fotboll. Hur många procent är det?', ['40 %', '10 %', '25 %', '35 %'], '10/25 = 40/100.'],
    ['Hur skrivs sannolikheten 0,25 i procent?', ['25 %', '2,5 %', '0,25 %', '75 %'], '0,25 = 25 hundradelar.'],
    ['Du singlar ett mynt och kastar en tärning. Vad är sannolikheten för krona och sexa?', ['1/12', '1/8', '2/6', '1/2'], '1/2 · 1/6 = 1/12.'],
  ]},
});
};
