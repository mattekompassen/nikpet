// Övningsdata för åk 9, per kapitel. Läses av trana.js.
var TRANA_DATA = ({r, val, sv, tus, sgn, blanda}) => {
  const M = '#E5AD45', I = '#5C2A45', G = '#C9D3C5';
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
  const S = `stroke="${M}" stroke-width="4" fill="none" stroke-linejoin="round"`;
  const rtri = (mark) => svg(160, 115, `<path d="M25 100 H135 L25 20 Z" fill="#fff" stroke="${I}" stroke-width="3" stroke-linejoin="round"/><path d="M25 88 H37 V100" fill="none" stroke="${I}" stroke-width="2"/>${mark}`);
  return ({
  '1': {namn: 'Tal',
  avsnitt: {
    '1.1': {namn: 'Tal och beräkningar', gen() {
      const a = r(2, 9), b = r(2, 9), c = r(2, 9), d = r(2, 9);
      return val([
        {q: `${a} + ${b} · ${c} − ${d} = ?`, svar: a + b * c - d, ledtrad: 'Multiplikation före addition och subtraktion.'},
        {q: `(${a} + ${b}) · ${c} − ${d} = ?`, svar: (a + b) * c - d, ledtrad: 'Parentesen först, sedan multiplikation.'},
        {q: `${a * b} / ${b} + ${c} · ${d} = ?`, svar: a + c * d, ledtrad: 'Division och multiplikation före addition.'},
        {q: `${a} · (${b + c} − ${c}) = ?`, svar: a * b, ledtrad: 'Räkna parentesen först.'}]);
    }},
    '1.2': {namn: 'Räkna med bråk', gen() {
      const [n1, n2] = val([[2, 3], [3, 4], [2, 5], [4, 6], [3, 5], [4, 5]]), a = r(1, n1 - 1), b = r(1, n2 - 1), c = r(1, 5), d = r(c + 1, 9);
      return val([
        {q: `${br(a, n1)} + ${br(b, n2)} = ?<br><small>Svara i bråkform.</small>`, svar: fr(a * n2 + b * n1, n1 * n2), ledtrad: 'Skriv om bråken med gemensam nämnare. Addera sedan täljarna.'},
        {q: `${br(a, n1)} · ${br(c, d)} = ?<br><small>Svara i bråkform.</small>`, svar: fr(a * c, n1 * d), ledtrad: 'Täljare gånger täljare, nämnare gånger nämnare.'},
        {q: `${br(a, n1)} / ${br(c, d)} = ?<br><small>Svara i bråkform.</small>`, svar: fr(a * d, n1 * c), ledtrad: `Multiplicera med det inverterade talet ${br(d, c)}.`}]);
    }},
    '1.3': {namn: 'Räkna med negativa tal', gen() {
      const a = r(2, 12), b = r(2, 12);
      return val([
        {q: `(−${a}) · ${b} = ?`, svar: -a * b, ledtrad: 'Olika tecken ger minus.'},
        {q: `(−${a}) · (−${b}) = ?`, svar: a * b, ledtrad: 'Lika tecken ger plus.'},
        {q: `−${a * b} / (−${b}) = ?`, svar: a, ledtrad: 'Lika tecken ger plus.'},
        {q: `−${a} − ${b} = ?`, svar: -a - b, ledtrad: `Börja på −${a} och gå ${b} steg åt vänster.`},
        {q: `${a} − (−${b}) = ?`, svar: a + b, ledtrad: 'Att subtrahera ett negativt tal är samma som att addera.'}]);
    }},
    '1.4': {namn: 'Räkna med potenser', gen() {
      const b = r(2, 5), m = r(2, 5), n = r(2, 4), k = r(3, 8);
      return val([
        {q: `${ups(b, m)} · ${ups(b, n)} = ${ups(b, '▢')}`, svar: m + n, ledtrad: 'Samma bas: addera exponenterna.'},
        {q: `(${ups(b, m)})<sup>${n}</sup> = ${ups(b, '▢')}`, svar: m * n, ledtrad: 'Potens av potens: multiplicera exponenterna.'},
        {q: `${ups(b, m + n)} / ${ups(b, n)} = ${ups(b, '▢')}`, svar: m, ledtrad: 'Samma bas: subtrahera exponenterna.'},
        {q: `${ups(b * 3 + 1, 0)} = ?`, svar: 1, ledtrad: 'Alla tal (utom 0) upphöjt till 0 är 1.'},
        {q: `${ups(2, k)} = ?`, svar: 2 ** k, ledtrad: `Multiplicera 2 med sig självt ${k} gånger.`}]);
    }},
    '1.5': {namn: 'Små tal och tiopotenser', gen() {
      const d = r(1, 9), e = r(2, 6), g = r(1, 4);
      const [p, v] = val([['milli', -3], ['mikro', -6], ['nano', -9], ['centi', -2], ['deci', -1]]);
      return val([
        {q: `0,${'0'.repeat(e - 1)}${d} = ${d} · ${ups(10, '▢')}`, svar: -e, ledtrad: 'Räkna hur många steg decimaltecknet flyttas. Små tal får negativ exponent.'},
        {q: `${ups(10, '−' + g)} = ?<br><small>Svara i decimalform.</small>`, svar: +(1 / 10 ** g).toFixed(g), ledtrad: `${ups(10, '−' + g)} = 1 / ${ups(10, g)}.`},
        {q: `Prefixet ${p} motsvarar ${ups(10, '?')}`, svar: v, ledtrad: 'deci 10⁻¹, centi 10⁻², milli 10⁻³, mikro 10⁻⁶, nano 10⁻⁹.'}]);
    }},
    '1.6': {namn: 'Räkna med tal i grundpotensform', gen() {
      const a = r(1, 3), b = r(1, 3), m = r(2, 6), n = r(2, 6), c = r(11, 99) / 10, e = r(3, 5);
      return val([
        {q: `(${a} · ${ups(10, m)}) · (${b} · ${ups(10, n)}) = ${a * b} · ${ups(10, '▢')}`, svar: m + n, ledtrad: 'Multiplicera talen och addera exponenterna.'},
        {q: `(${a * b} · ${ups(10, m + n)}) / (${b} · ${ups(10, n)}) = ${a} · ${ups(10, '▢')}`, svar: m, ledtrad: 'Dela talen och subtrahera exponenterna.'},
        {q: `${tus(Math.round(c * 10 ** e))} = ${sv(c)} · ${ups(10, '▢')}`, svar: e, ledtrad: 'Hur många steg flyttas decimaltecknet åt vänster?'},
        {q: `${sv(c / 10 ** e)} = ${sv(c)} · ${ups(10, '▢')}`, svar: -e, ledtrad: 'Små tal får negativ exponent. Räkna stegen.'}]);
    }},
    '1.7': {namn: 'Kvadrater och kvadratrötter', gen() {
      const n = r(2, 15), v = n * n + r(1, 2 * n);
      return val([
        {q: `√${n * n} = ?`, svar: n, ledtrad: `Vilket tal gånger sig självt blir ${n * n}?`},
        {q: `${ups(n, 2)} = ?`, svar: n * n, ledtrad: `${n} · ${n}.`},
        {q: `En kvadrat har arean ${n * n} cm². Hur lång är sidan (cm)?`, svar: n, ledtrad: 'Sidan = √arean.'},
        {q: `√${v} ligger mellan ${n} och ?`, svar: n + 1, ledtrad: `${n}² = ${n * n} och ${n + 1}² = ${(n + 1) ** 2}.`}]);
    }},
  },
  begrepp: [
    ['Prioriteringsregler', 'Regler för i vilken ordning man räknar'],
    ['Negativt tal', 'Ett tal som är mindre än noll'],
    ['Motsatta tal', 'Tal på samma avstånd från noll, t.ex. 4 och −4'],
    ['Potens', 'Ett tal skrivet med bas och exponent'],
    ['Bas', 'Talet som multipliceras med sig självt i en potens'],
    ['Exponent', 'Visar hur många gånger basen är faktor'],
    ['Tiopotens', 'Talet 10 upphöjt till ett tal'],
    ['Grundpotensform', 'Ett tal skrivet som t.ex. 5 · 10⁻³'],
    ['Kvadrat', 'Ett tal upphöjt till 2'],
    ['Kvadratrot', 'Talet som multiplicerat med sig självt ger talet, t.ex. √49 = 7'],
    ['Mikro', 'En miljondel, 10⁻⁶'],
    ['Nano', 'En miljarddel, 10⁻⁹'],
    ['Milli', 'En tusendel, 10⁻³'],
    ['Gemensam nämnare', 'Samma nämnare i flera bråk'],
    ['Inverterat tal', 'Täljare och nämnare byter plats, t.ex. 2/5 och 5/2'],
  ],
  exempel: [
    ['<mark>√49</mark> = 7', 'kvadratrot', '√49 är det tal som gånger sig självt blir 49. Det heter kvadratrot.'],
    ['<mark>7<sup>2</sup></mark> = 49', 'kvadrat', 'Ett tal upphöjt till 2 kallas kvadrat.'],
    ['<mark>3</mark><sup>4</sup>', 'bas', 'Talet som multipliceras med sig självt heter bas.'],
    ['3<sup><mark>4</mark></sup>', 'exponent', 'Det lilla talet uppe till höger heter exponent.'],
    ['0,005 = <mark>5 · 10<sup>−3</sup></mark>', 'grundpotensform', 'Ett tal mellan 1 och 10 gånger en tiopotens är grundpotensform.'],
    ['<mark>10<sup>−6</sup></mark>', 'mikro', '10⁻⁶ är en miljondel. Prefixet heter mikro.', 'Vilket prefix motsvarar det markerade?'],
    ['<mark>10<sup>3</sup></mark>', 'kilo', '10³ är tusen. Prefixet heter kilo.', 'Vilket prefix motsvarar det markerade?'],
    ['<mark>−7</mark>', 'negativt tal', '−7 är mindre än noll. Det är ett negativt tal.'],
    ['<mark>4</mark> och <mark>−4</mark>', 'motsatta tal', 'Talen ligger lika långt från noll. De är motsatta tal.'],
    ['2 + 3 · 4 = 2 + <mark>12</mark>', 'prioriteringsregler', 'Multiplikation görs före addition enligt prioriteringsreglerna.', 'Vilka regler säger att 3 · 4 räknas först?'],
    [br('1', '2') + ' + ' + br('1', '3') + ' = ' + br('3', '<mark>6</mark>') + ' + ' + br('2', '<mark>6</mark>'), 'gemensam nämnare', 'Båda bråken har nämnaren 6. Det är en gemensam nämnare.'],
    [br('2', '5') + ' &nbsp;och&nbsp; <mark>' + br('5', '2') + '</mark>', 'inverterat tal', 'Täljare och nämnare har bytt plats. Det är det inverterade talet.'],
  ],
  dra: [
    ['Talet som gånger sig självt blir 49 kallas ___ ur 49.', 'kvadratroten'],
    ['7² kallas 7 i ___.', 'kvadrat'],
    ['I 3⁴ är 3 ___.', 'basen'],
    ['I 3⁴ är 4 ___.', 'exponenten'],
    ['5 · 10⁻³ är skrivet i ___.', 'grundpotensform'],
    ['Prefixet ___ betyder en miljondel, 10⁻⁶.', 'mikro'],
    ['Prefixet ___ betyder tusen, 10³.', 'kilo'],
    ['−3 och 3 är ___ tal.', 'motsatta'],
    ['Multiplikation görs före addition enligt ___.', 'prioriteringsreglerna'],
    ['Två negativa faktorer ger en ___ produkt.', 'positiv'],
    ['För att addera 1/2 och 1/3 behövs en gemensam ___.', 'nämnare'],
    ['Tal som är mindre än noll kallas ___ tal.', 'negativa'],
  ],
  quiz: [
    ['Vad är 8 − 2 · 3 + 4?', ['6', '22', '14', '−2'], 'Multiplikation först: 8 − 6 + 4 = 6.'],
    ['Vad är (−4) · (−5)?', ['20', '−20', '−9', '9'], 'Lika tecken ger plus.'],
    ['Vad är −12 / 3?', ['−4', '4', '−9', '−36'], 'Olika tecken ger minus.'],
    ['Vad är 2³ · 2²?', ['32', '64', '1 024', '10'], '2³ · 2² = 2⁵ = 32.'],
    ['Vad är 5⁰?', ['1', '0', '5', '50'], 'Alla tal (utom 0) upphöjt till 0 är 1.'],
    ['Hur skrivs 0,0007 i grundpotensform?', ['7 · 10⁻⁴', '7 · 10⁴', '7 · 10⁻³', '0,7 · 10⁻³'], 'Decimaltecknet flyttas 4 steg åt höger.'],
    ['Vad är (2 · 10³) · (3 · 10⁴)?', ['6 · 10⁷', '6 · 10¹²', '5 · 10⁷', '6 · 10¹'], '2 · 3 = 6 och 3 + 4 = 7.'],
    ['Vad är √81?', ['9', '40,5', '18', '8'], '9 · 9 = 81.'],
    ['Mellan vilka heltal ligger √50?', ['7 och 8', '6 och 7', '24 och 25', '8 och 9'], '7² = 49 och 8² = 64.'],
    ['Vad är 2/3 + 1/4?', ['11/12', '3/7', '3/12', '2/12'], '8/12 + 3/12 = 11/12.'],
    ['Vad är 3/5 · 10/9?', ['2/3', '30/14', '13/14', '6/5'], '30/45 = 2/3.'],
    ['Vad är (−2)³?', ['−8', '8', '−6', '6'], '(−2) · (−2) · (−2) = −8.'],
    ['Hur lång är 1 nanometer?', ['10⁻⁹ m', '10⁻⁶ m', '10⁻³ m', '10⁹ m'], 'Nano betyder en miljarddel.'],
    ['Vad är (3²)²?', ['81', '12', '36', '18'], '3² = 9 och 9² = 81.'],
    ['Vad är (9 · 10⁶) / (3 · 10²)?', ['3 · 10⁴', '3 · 10³', '6 · 10⁴', '3 · 10⁸'], '9 / 3 = 3 och 6 − 2 = 4.'],
  ]},
  '2': {namn: 'Samband och förändring',
  avsnitt: {
    '2.1': {namn: 'Procent', gen() {
      const hel = 20 * r(2, 30), p = val([5, 10, 15, 20, 25, 40, 75]), h2 = val([20, 25, 50]), d2 = r(1, h2 - 1);
      return val([
        {q: `Hur mycket är ${p} % av ${hel}?`, svar: hel * p / 100, ledtrad: `${p} % = ${sv(p / 100)}. Räkna ${sv(p / 100)} · ${hel}.`},
        {q: `${hel * p / 100} är ${p} % av ett tal. Vilket är talet?`, svar: hel, ledtrad: `Det hela = delen / andelen = ${hel * p / 100} / ${sv(p / 100)}.`},
        {q: `Hur många procent är ${d2} av ${h2}?`, svar: d2 * 100 / h2, ledtrad: `Andelen = ${d2}/${h2}. Gör om till procent.`}]);
    }},
    '2.2': {namn: 'Förändringsfaktor', gen() {
      const p = val([5, 10, 15, 20, 25, 30]), a = val([100, 200, 500, 1000, 2000]), n = r(2, 4);
      const v = 10000 * 0.9 ** n;
      return val([
        {q: `Vilken förändringsfaktor motsvarar en ökning med ${p} %?`, svar: 1 + p / 100, ledtrad: `100 % + ${p} % = ${100 + p} %.`},
        {q: `Vilken förändringsfaktor motsvarar en minskning med ${p} %?`, svar: 1 - p / 100, ledtrad: `100 % − ${p} % = ${100 - p} %.`},
        {q: `Förändringsfaktorn är ${sv(1 - p / 100)}. Med hur många procent minskar värdet?`, svar: p, ledtrad: `${sv(1 - p / 100)} = ${100 - p} %. Hur mycket saknas till 100 %?`},
        {q: `Ett pris på ${tus(a)} kr höjs med ${p} % två gånger. Vad blir priset (kr)?`, svar: Math.round(a * (1 + p / 100) ** 2 * 100) / 100, ledtrad: `Multiplicera med ${sv(1 + p / 100)} två gånger.`},
        {q: `En moped värd 10 000 kr minskar i värde med 10 % per år. Vad är den värd efter ${n} år (kr)? Avrunda till heltal.`, svar: Math.round(v), tol: 1, ledtrad: `Räkna 10 000 · 0,9<sup>${n}</sup>.`}]);
    }},
    '2.3': {namn: 'Funktioner', gen() {
      const a = r(2, 6), b = r(1, 9), x = r(1, 8), c = r(1, 10);
      return val([
        {q: `f(x) = ${a}x + ${b}. Beräkna f(${x}).`, svar: a * x + b, ledtrad: `Byt ut x mot ${x}: ${a} · ${x} + ${b}.`},
        {q: `f(x) = x² + ${c}. Beräkna f(${x}).`, svar: x * x + c, ledtrad: `${x}² + ${c}.`},
        {q: `f(x) = ${a}x − ${b}. För vilket x är f(x) = ${a * x - b}?`, svar: x, ledtrad: `Lös ekvationen ${a}x − ${b} = ${a * x - b}.`}]);
    }},
    '2.4': {namn: 'Linjära funktioner', gen() {
      const k = val([-3, -2, 2, 3, 4, 5]), m = r(1, 9), x1 = r(0, 3), x2 = x1 + r(1, 3);
      const ks = k < 0 ? `−${-k}` : k;
      return val([
        {q: `Vad är k-värdet (lutningen) i y = ${ks}x + ${m}?`, svar: k, ledtrad: 'I y = kx + m är k talet framför x.'},
        {q: `Vad är m-värdet i y = ${ks}x + ${m}?`, svar: m, ledtrad: 'm är där linjen skär y-axeln.'},
        {q: `En rät linje går genom (${x1}, ${k * x1 + m}) och (${x2}, ${k * x2 + m}). Vad är k-värdet?`, svar: k, ledtrad: 'k = ändringen i y / ändringen i x.'},
        {q: `Linjen y = ${ks}x + m går genom punkten (${x2}, ${k * x2 + m}). Vad är m?`, svar: m, ledtrad: `Sätt in punkten: ${k * x2 + m} = ${ks} · ${x2} + m.`}]);
    }},
    '2.5': {namn: 'Tillämpning av linjära funktioner', gen() {
      const m = val([40, 50, 60]), k = r(8, 15), d = r(3, 20), g = val([200, 300, 400]), gb = r(30, 60), n = r(4, 15);
      return val([
        {q: `En taxi kostar ${m} kr i start och ${k} kr per km. Vad kostar en resa på ${d} km (kr)?`, svar: m + k * d, ledtrad: `Kostnaden y = ${k}x + ${m}.`},
        {q: `En taxi kostar ${m} kr i start och ${k} kr per km. En resa kostade ${m + k * d} kr. Hur många km var resan?`, svar: d, ledtrad: `Lös ${k}x + ${m} = ${m + k * d}.`},
        {q: `Ett gym kostar ${g} kr i startavgift och ${gb} kr per besök. Vad kostar ${n} besök (kr)?`, svar: g + gb * n, ledtrad: `y = ${gb}x + ${g}.`},
        {q: `Ett gym kostar ${g} kr i startavgift och ${gb} kr per besök. Samir betalade ${g + gb * n} kr. Hur många gånger tränade han?`, svar: n, ledtrad: `Lös ${gb}x + ${g} = ${g + gb * n}.`}]);
    }},
  },
  begrepp: [
    ['Procentenhet', 'Skillnaden mellan två procentsatser'],
    ['Förändringsfaktor', 'Talet man multiplicerar med vid en förändring'],
    ['Upprepad förändring', 'Samma förändringsfaktor används flera gånger'],
    ['Funktion', 'En regel som ger exakt ett y-värde för varje x-värde'],
    ['Linjär funktion', 'En funktion vars graf är en rät linje, y = kx + m'],
    ['k-värde', 'Linjens lutning, hur mycket y ändras när x ökar med 1'],
    ['m-värde', 'Där linjen skär y-axeln'],
    ['Koordinatsystem', 'En x-axel och en y-axel som korsar varandra'],
    ['Origo', 'Punkten (0, 0)'],
    ['x-axel', 'Den vågräta axeln'],
    ['y-axel', 'Den lodräta axeln'],
    ['Värdetabell', 'En tabell med x-värden och y-värden'],
    ['Graf', 'Linjen eller kurvan som visar en funktion'],
    ['Proportionalitet', 'y = kx, linjen går genom origo'],
    ['Procent', 'Hundradelar'],
  ],
  exempel: [
    ['y = <mark>3</mark>x + 2', 'k-värde', 'Talet framför x visar lutningen. Det heter k-värde.'],
    ['y = 3x + <mark>2</mark>', 'm-värde', 'Talet där linjen skär y-axeln heter m-värde.'],
    ['<mark>y = 3x + 2</mark>', 'linjär funktion', 'y = kx + m är en linjär funktion. Grafen är en rät linje.'],
    ['500 · <mark>1,08</mark>', 'förändringsfaktor', 'Talet man multiplicerar med vid en förändring heter förändringsfaktor.'],
    ['Från 20 % till 25 %: <mark>5</mark>', 'procentenheter', 'Skillnaden mellan procentsatser mäts i procentenheter.', 'Vad mäts det markerade i?'],
    [svg(160, 115, `${axlar}<path d="M30 85 L140 20" stroke="${M}" stroke-width="5" stroke-linecap="round"/>`), 'graf', 'Linjen visar funktionen. Den heter graf.', 'Vad heter den markerade linjen?'],
    [svg(160, 115, `${axlar}<circle cx="30" cy="95" r="8" fill="${M}"/>`), 'origo', 'Punkten (0, 0) där axlarna möts heter origo.', 'Vad heter den markerade punkten?'],
    [svg(160, 115, `<path d="M30 105 V10" stroke="${I}" stroke-width="2.5"/><path d="M20 95 H150" stroke="${M}" stroke-width="6"/>`), 'x-axel', 'Den vågräta axeln heter x-axel.', 'Vad heter den markerade axeln?'],
    [svg(160, 115, `<path d="M20 95 H150" stroke="${I}" stroke-width="2.5"/><path d="M30 105 V10" stroke="${M}" stroke-width="6"/>`), 'y-axel', 'Den lodräta axeln heter y-axel.', 'Vad heter den markerade axeln?'],
    ['<table class="tab"><tr><th>x</th><td>0</td><td>1</td><td>2</td></tr><tr><th>y</th><td>2</td><td>5</td><td>8</td></tr></table>', 'värdetabell', 'En tabell med x- och y-värden heter värdetabell.', 'Vad heter tabellen?'],
    ['<mark>y = 4x</mark>', 'proportionalitet', 'y = kx utan m. Linjen går genom origo. Det är proportionalitet.'],
    ['1 000 · 1,05 · 1,05 · 1,05 = 1 000 · <mark>1,05<sup>3</sup></mark>', 'upprepad förändring', 'Samma förändringsfaktor tre gånger. Det är en upprepad förändring.'],
  ],
  dra: [
    ['I y = 3x + 2 är 3 linjens ___.', 'lutning'],
    ['I y = 3x + 2 är 2 linjens ___.', 'm-värde'],
    ['En funktion vars graf är en rät linje kallas ___.', 'linjär'],
    ['Vid en ökning med 8 % är ___ 1,08.', 'förändringsfaktorn'],
    ['Från 20 % till 25 % är en ökning med 5 ___.', 'procentenheter'],
    ['Punkten (0, 0) kallas ___.', 'origo'],
    ['Den vågräta axeln kallas ___.', 'x-axeln'],
    ['Den lodräta axeln kallas ___.', 'y-axeln'],
    ['En tabell med x- och y-värden kallas en ___.', 'värdetabell'],
    ['Om y = 4x är y och x ___.', 'proportionella'],
    ['En ___ ger exakt ett y-värde för varje x-värde.', 'funktion'],
    ['Linjen som visar en funktion kallas funktionens ___.', 'graf'],
  ],
  quiz: [
    ['f(x) = 2x + 5. Vad är f(3)?', ['11', '10', '16', '7'], '2 · 3 + 5 = 11.'],
    ['Vad är k-värdet i y = −4x + 1?', ['−4', '1', '4', '−1'], 'k är talet framför x.'],
    ['Vad är m-värdet i y = 2x − 7?', ['−7', '2', '7', 'x'], 'm är konstanten, här −7.'],
    ['En linje går genom (0, 1) och (2, 7). Vad är k?', ['3', '4', '1/3', '6'], '(7 − 1) / (2 − 0) = 3.'],
    ['Vilken förändringsfaktor motsvarar en minskning med 15 %?', ['0,85', '1,15', '0,15', '0,985'], '100 % − 15 % = 85 %.'],
    ['Ett pris på 800 kr höjs med 10 % två gånger. Vad blir priset?', ['968 kr', '960 kr', '880 kr', '1 000 kr'], '800 · 1,1 · 1,1 = 968.'],
    ['En taxi kostar 50 kr + 12 kr per km. Vad kostar 10 km?', ['170 kr', '120 kr', '620 kr', '62 kr'], '50 + 12 · 10 = 170.'],
    ['Vilken graf går genom origo?', ['y = 5x', 'y = 5x + 1', 'y = x − 5', 'y = 5'], 'Utan m-värde går linjen genom (0, 0).'],
    ['Andelen ökar från 30 % till 36 %. Hur många procent är ökningen?', ['20 %', '6 %', '36 %', '16 %'], 'Ökningen är 6 procentenheter. 6/30 = 20 %.'],
    ['Linjen y = 3x + m går genom (2, 10). Vad är m?', ['4', '10', '6', '2'], '10 = 3 · 2 + m ger m = 4.'],
    ['Vilket uttryck ger förändringsfaktorn för tre års ökning med 5 % per år?', ['1,05³', '1,15', '3 · 1,05', '1,5'], 'Multiplicera med 1,05 tre gånger.'],
    ['x = 1 ger y = 4, x = 2 ger y = 7, x = 3 ger y = 10. Vilken regel?', ['y = 3x + 1', 'y = 4x', 'y = x + 3', 'y = 3x + 4'], 'y ökar med 3, och 3 · 1 + 1 = 4.'],
    ['Hur mycket är 25 % av 640?', ['160', '25', '615', '256'], '640 / 4 = 160.'],
    ['Vad betyder k = 0 i y = kx + m?', ['Linjen är vågrät', 'Linjen är lodrät', 'Linjen går genom origo', 'Linjen lutar uppåt'], 'y ändras inte när x ändras.'],
    ['Ett värde på 10 000 kr minskar med 20 % per år. Vad är det värt efter 2 år?', ['6 400 kr', '6 000 kr', '8 000 kr', '9 600 kr'], '10 000 · 0,8 · 0,8 = 6 400.'],
  ]},
  '3': {namn: 'Algebra',
  avsnitt: {
    '3.1': {namn: 'Uttryck och mönster', gen() {
      const x = r(2, 6), a = r(1, 9), d = r(2, 7), c = r(0, 5), n = r(6, 25);
      return val([
        {q: `Beräkna 2x² − 3x om x = ${x}.`, svar: 2 * x * x - 3 * x, ledtrad: `2 · ${x}² − 3 · ${x}.`},
        {q: `Talföljden är ${a}, ${a + d}, ${a + 2 * d}, ${a + 3 * d}, … Vilket tal står på plats ${n}?`, svar: a + (n - 1) * d, ledtrad: `Talen ökar med ${d}. Det är ${n - 1} steg från plats 1.`},
        {q: `Talföljden är ${d + c}, ${2 * d + c}, ${3 * d + c}, … Uttrycket för plats n är ${d}n + ▢`, svar: c, ledtrad: `Plats 1: ${d} · 1 + ? = ${d + c}.`}]);
    }},
    '3.2': {namn: 'Förenkling av uttryck', gen() {
      const a = r(3, 9), b = r(2, 9), c = r(1, a - 1), e = r(1, 9), f = r(2, Math.min(5, a - 1));
      return val([
        {q: `${a}x + ${b}x − ${c}x = ▢x`, svar: a + b - c, ledtrad: 'Räkna med koefficienterna.'},
        {q: `${a}x − ${f}(x − ${e}) = ${a - f}x + ▢`, svar: f * e, ledtrad: `Multiplicera in −${f}: −${f}x + ${f * e}.`},
        {q: `(x + ${e})² = x² + ▢x + ${e * e}`, svar: 2 * e, ledtrad: 'Kvadreringsregeln: (x + a)² = x² + 2ax + a².'},
        {q: `(x − ${e})(x + ${e}) = x² − ▢`, svar: e * e, ledtrad: 'Konjugatregeln: (x − a)(x + a) = x² − a².'}]);
    }},
    '3.3': {namn: 'Ekvationer', gen() {
      const x = r(1, 12), c = r(1, 5), a = c + r(1, 5), b = r(1, 15), d = (a - c) * x + b, f = r(2, 5), g = r(1, x);
      return val([
        {q: `Lös ekvationen: ${a}x + ${b} = ${c === 1 ? '' : c}x + ${d}`, svar: x, ledtrad: 'Samla x i ena ledet och talen i det andra.'},
        {q: `Lös ekvationen: ${f}(x − ${g}) = ${f * (x - g)}`, svar: x, ledtrad: `Dela båda leden med ${f}, addera sedan ${g}.`},
        {q: `Lös ekvationen: x/${f} + ${b} = ${x + b}`, svar: f * x, ledtrad: `Subtrahera ${b} och multiplicera med ${f}.`}]);
    }},
    '3.4': {namn: 'Procent och ekvationer', gen() {
      const x = 100 * r(2, 12), p = val([10, 20, 25, 50]);
      return val([
        {q: `Efter en höjning med ${p} % kostar en vara ${sv(x * (1 + p / 100))} kr. Vad kostade den innan (kr)?`, svar: x, ledtrad: `Lös x · ${sv(1 + p / 100)} = ${sv(x * (1 + p / 100))}.`},
        {q: `Efter ${p} % rabatt kostar en vara ${sv(x * (1 - p / 100))} kr. Vad var det ordinarie priset (kr)?`, svar: x, ledtrad: `Lös x · ${sv(1 - p / 100)} = ${sv(x * (1 - p / 100))}.`},
        {q: `Ett tal ökat med ${p} % blir ${sv(x * (1 + p / 100))}. Vilket är talet?`, svar: x, ledtrad: `Talet · ${sv(1 + p / 100)} = ${sv(x * (1 + p / 100))}.`}]);
    }},
    '3.5': {namn: 'Proportion', gen() {
      const c = val([2, 3, 4, 5, 6, 8, 10]), b = r(1, 9), m = r(2, 4), a = c * m, n = r(2, 5), p = r(4, 30), k = n + r(1, 4);
      return val([
        {q: `Lös proportionen: x/${a} = ${b}/${c}`, svar: b * m, ledtrad: `Korsvis multiplikation: ${c}x = ${a} · ${b}.`},
        {q: `Lös proportionen: ${a}/x = ${c}/${b}`, svar: b * m, ledtrad: `Korsvis multiplikation: ${c}x = ${a} · ${b}.`},
        {q: `${n} kg kostar ${n * p} kr. Vad kostar ${k} kg (kr)?`, svar: k * p, ledtrad: `Ställ upp x/${k} = ${n * p}/${n}.`}]);
    }},
    '3.6': {namn: 'Ekvationssystem', gen() {
      const x = r(2, 10), y = r(1, x - 1), k = r(2, 4);
      return val([
        {q: `x + y = ${x + y}<br>x − y = ${x - y}<br>Vad är x?`, svar: x, ledtrad: 'Addera ekvationerna så försvinner y: 2x = ' + (2 * x) + '.'},
        {q: `x + y = ${x + y}<br>x − y = ${x - y}<br>Vad är y?`, svar: y, ledtrad: 'Subtrahera ekvationerna så försvinner x.'},
        {q: `y = ${k}x<br>x + y = ${(k + 1) * x}<br>Vad är x?`, svar: x, ledtrad: `Sätt in y = ${k}x: x + ${k}x = ${(k + 1) * x}.`},
        {q: `2x + y = ${2 * x + y}<br>x − y = ${x - y}<br>Vad är x?`, svar: x, ledtrad: `Addera ekvationerna: 3x = ${3 * x}.`}]);
    }},
  },
  begrepp: [
    ['Variabel', 'En bokstav som står för ett tal'],
    ['Uttryck', 'Tal, variabler och räknesätt utan likhetstecken'],
    ['Term', 'En del av ett uttryck som skiljs åt med + eller −'],
    ['Koefficient', 'Talet framför variabeln'],
    ['Förenkla', 'Skriva ett uttryck kortare'],
    ['Ekvation', 'Två uttryck med likhetstecken emellan'],
    ['Lösning', 'Det värde som gör att ekvationen stämmer'],
    ['Prövning', 'Sätta in lösningen för att kontrollera'],
    ['Proportion', 'Två lika förhållanden, t.ex. x/4 = 6/8'],
    ['Korsvis multiplikation', 'a/b = c/d ger a · d = b · c'],
    ['Ekvationssystem', 'Två ekvationer med två obekanta'],
    ['Substitutionsmetoden', 'Sätta in ett uttryck i den andra ekvationen'],
    ['Additionsmetoden', 'Addera ekvationerna så att en variabel försvinner'],
    ['Grafisk lösning', 'Skärningspunkten mellan två linjer'],
    ['Talföljd', 'Tal som följer på varandra enligt en regel'],
  ],
  exempel: [
    ['<mark>x</mark> + y = 10', 'variabel', 'En bokstav som står för ett tal heter variabel.'],
    ['<mark>5</mark>x', 'koefficient', 'Talet framför variabeln heter koefficient.'],
    ['2x + 3x − x = <mark>4x</mark>', 'förenkling', 'Uttrycket har skrivits kortare. Det är en förenkling.', 'Vad har vi gjort?'],
    ['<mark>3x − 2 = 10</mark>', 'ekvation', 'Det finns ett likhetstecken och ett okänt tal. Det är en ekvation.'],
    ['3x − 2 = 10 &nbsp;→&nbsp; <mark>x = 4</mark>', 'lösning', 'x = 4 gör att ekvationen stämmer. Det är lösningen.'],
    ['<mark>' + br('x', '4') + ' = ' + br('6', '8') + '</mark>', 'proportion', 'Två lika förhållanden heter proportion.'],
    [br('x', '4') + ' = ' + br('6', '8') + ' &nbsp;→&nbsp; <mark>8x = 24</mark>', 'korsvis multiplikation', 'a/b = c/d ger a · d = b · c. Det är korsvis multiplikation.', 'Vilken metod används?'],
    ['<mark>x + y = 10<br>x − y = 4</mark>', 'ekvationssystem', 'Två ekvationer med två obekanta heter ekvationssystem.'],
    ['y = 2x &nbsp;→&nbsp; x + <mark>2x</mark> = 9', 'substitutionsmetoden', 'Vi sätter in y = 2x i den andra ekvationen. Det är substitutionsmetoden.', 'Vilken metod används?'],
    [svg(160, 115, `${axlar}<path d="M30 90 L145 25 M30 30 L145 90" stroke="${I}" stroke-width="3"/><circle cx="88" cy="58" r="7" fill="${M}"/>`), 'skärningspunkt', 'Punkten där linjerna möts heter skärningspunkt. Den är lösningen till ekvationssystemet.', 'Vad heter den markerade punkten?'],
    ['x = 4: &nbsp;<mark>3 · 4 − 2 = 10</mark> ✓', 'prövning', 'Vi sätter in lösningen för att kontrollera. Det är en prövning.', 'Vad gör vi här?'],
    ['<mark>3x</mark> + 7', 'term', 'Delarna som adderas heter termer.'],
  ],
  dra: [
    ['En bokstav som står för ett tal kallas ___.', 'variabel'],
    ['I 5x är 5 en ___.', 'koefficient'],
    ['2x + 3x kan ___ till 5x.', 'förenklas'],
    ['x/4 = 6/8 är en ___.', 'proportion'],
    ['Två ekvationer med två obekanta kallas ett ___.', 'ekvationssystem'],
    ['Att sätta in y = 2x i den andra ekvationen kallas ___.', 'substitutionsmetoden'],
    ['Att addera ekvationerna så att y försvinner kallas ___.', 'additionsmetoden'],
    ['Två linjer möts i en ___.', 'skärningspunkt'],
    ['x = 4 är ___ till ekvationen 3x − 2 = 10.', 'lösningen'],
    ['Vi sätter in lösningen i ekvationen för att göra en ___.', 'prövning'],
    ['a/b = c/d ger a · d = b · c. Det kallas korsvis ___.', 'multiplikation'],
    ['3x + 7 är ett ___.', 'uttryck'],
  ],
  quiz: [
    ['Förenkla 4x − 2(x − 3).', ['2x + 6', '2x − 6', '2x − 3', '6x + 6'], '4x − 2x + 6 = 2x + 6.'],
    ['Lös ekvationen 7x − 4 = 3x + 12.', ['x = 4', 'x = 2', 'x = 8', 'x = 1,6'], '4x = 16, alltså x = 4.'],
    ['Lös proportionen x/5 = 12/20.', ['x = 3', 'x = 4', 'x = 48', 'x = 2,4'], '20x = 60, alltså x = 3.'],
    ['Efter en höjning med 25 % kostar en vara 500 kr. Vad kostade den innan?', ['400 kr', '375 kr', '625 kr', '475 kr'], 'x · 1,25 = 500 ger x = 400.'],
    ['Lös: x + y = 12 och x − y = 4.', ['x = 8 och y = 4', 'x = 4 och y = 8', 'x = 6 och y = 6', 'x = 10 och y = 2'], 'Addera: 2x = 16, x = 8. Då är y = 4.'],
    ['y = 3x och x + y = 20. Vad är x?', ['5', '15', '4', '20'], 'x + 3x = 20 ger 4x = 20.'],
    ['Lös ekvationen 3(x + 4) = 2x + 20.', ['x = 8', 'x = 2', 'x = 32', 'x = 6,4'], '3x + 12 = 2x + 20 ger x = 8.'],
    ['Vad är 2x² − 3 om x = −2?', ['5', '−11', '13', '11'], '2 · 4 − 3 = 5.'],
    ['Talföljden är 3, 8, 13, 18 … Vilket uttryck ger plats n?', ['5n − 2', '5n + 3', 'n + 5', '3n + 5'], 'Ökar med 5. Plats 1: 5 − 2 = 3.'],
    ['Efter 20 % rabatt kostar en vara 240 kr. Vad var det ordinarie priset?', ['300 kr', '288 kr', '260 kr', '192 kr'], 'x · 0,8 = 240 ger x = 300.'],
    ['Vad är ett ekvationssystem?', ['Två ekvationer med två obekanta', 'En ekvation med två lösningar', 'En formel', 'En tabell'], 'Man söker x och y som passar i båda ekvationerna.'],
    ['Vad är den grafiska lösningen till ett ekvationssystem?', ['Skärningspunkten mellan linjerna', 'Linjernas lutning', 'Origo', 'm-värdet'], 'Punkten där linjerna möts passar i båda ekvationerna.'],
    ['(x − 3)² = ?', ['x² − 6x + 9', 'x² − 9', 'x² + 9', 'x² − 6x − 9'], 'Kvadreringsregeln: x² − 2 · 3x + 3².'],
    ['4 kg kostar 60 kr. Vad kostar 7 kg?', ['105 kr', '64 kr', '420 kr', '90 kr'], '1 kg kostar 15 kr. 7 · 15 = 105.'],
    ['Lös ekvationen 0,8x = 64.', ['x = 80', 'x = 51,2', 'x = 8', 'x = 800'], '64 / 0,8 = 80.'],
  ]},
  '4': {namn: 'Geometri',
  avsnitt: {
    '4.1': {namn: 'Spegling och symmetri', gen() {
      const a = r(1, 9) * val([1, -1]), b = r(1, 9) * val([1, -1]);
      const [f, n] = val([['en kvadrat', 4], ['en rektangel', 2], ['en liksidig triangel', 3], ['en likbent triangel', 1], ['en regelbunden sexhörning', 6], ['en romb', 2]]);
      const t = v => v < 0 ? `−${-v}` : v;
      return val([
        {q: `Punkten (${t(a)}, ${t(b)}) speglas i x-axeln. Vad blir y-koordinaten?`, svar: -b, ledtrad: 'Vid spegling i x-axeln byter y-koordinaten tecken.'},
        {q: `Punkten (${t(a)}, ${t(b)}) speglas i y-axeln. Vad blir x-koordinaten?`, svar: -a, ledtrad: 'Vid spegling i y-axeln byter x-koordinaten tecken.'},
        {q: `Hur många symmetrilinjer har ${f}?`, svar: n, ledtrad: 'En symmetrilinje delar figuren i två spegelvända halvor. Rita gärna!'}]);
    }},
    '4.2': {namn: 'Skala', gen() {
      const k = val([2, 3, 4, 5, 10]), s = val([25000, 50000, 100000]), d = r(2, 9);
      return val([
        {q: `Längdskalan är 1:${k}. Hur många gånger större är arean i verkligheten än på bilden?`, svar: k * k, ledtrad: 'Areaskalan är längdskalan i kvadrat.'},
        {q: `En figur förstoras ${k} gånger på längden. Hur många gånger större blir volymen?`, svar: k ** 3, ledtrad: 'Volymskalan är längdskalan i kubik.'},
        {q: `Skala 1:${tus(s)}. Avståndet på kartan är ${d} cm. Hur många km är det i verkligheten?`, svar: d * s / 100000, ledtrad: `${d} · ${tus(s)} cm. 100 000 cm = 1 km.`},
        {q: `Ett ${d * k} cm långt föremål ritas ${d} cm långt. Skalan är 1:?`, svar: k, ledtrad: `Hur många gånger större är ${d * k} än ${d}?`}]);
    }},
    '4.3': {namn: 'Ekvationer med flera nämnare', gen() {
      const [a, b, L] = val([[2, 3, 6], [2, 4, 4], [3, 4, 12], [2, 5, 10], [3, 6, 6], [4, 6, 12]]), x = L * r(1, 5);
      return val([
        {q: `Lös ekvationen: x/${a} + x/${b} = ${x / a + x / b}`, svar: x, ledtrad: `Multiplicera alla termer med minsta gemensamma nämnaren ${L}.`},
        {q: `Lös ekvationen: x/${a} − x/${b} = ${x / a - x / b}`, svar: x, ledtrad: `Multiplicera alla termer med minsta gemensamma nämnaren ${L}.`}]);
    }},
    '4.4': {namn: 'Likformighet', gen() {
      const [p, q, s] = val([[3, 4, 5], [5, 12, 13], [6, 8, 10], [2, 3, 4], [4, 5, 6], [4, 7, 9]]), k = r(2, 4);
      return val([
        {q: `Triangel A har sidorna ${p}, ${q} och ${s} cm. Triangel B är likformig med A och dess kortaste sida är ${p * k} cm. Hur lång är B:s längsta sida (cm)?`, svar: s * k, ledtrad: `B är ${k} gånger större än A.`},
        {q: `Triangel A har sidorna ${p}, ${q} och ${s} cm. Den likformiga triangeln B har sidorna ${p * k}, ${q * k} och ${s * k} cm. Hur många gånger större är B:s sidor?`, svar: k, ledtrad: `Dela en sida i B med motsvarande sida i A: ${p * k} / ${p}.`},
        {q: `Två likformiga figurer har längdskalan 1:${k}. Hur många gånger större är den stora figurens area?`, svar: k * k, ledtrad: 'Areaskalan är längdskalan i kvadrat.'}]);
    }},
    '4.5': {namn: 'Pythagoras sats', gen() {
      const [a, b, c] = val([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [12, 16, 20], [7, 24, 25]]);
      const x = r(2, 9), y = r(2, 9), h = Math.sqrt(x * x + y * y);
      return val([
        {q: `En rätvinklig triangel har kateterna ${a} cm och ${b} cm. Hur lång är hypotenusan (cm)?`, svar: c, ledtrad: `c² = ${a}² + ${b}² = ${a * a + b * b}. c = √${a * a + b * b}.`},
        {q: `En rätvinklig triangel har hypotenusan ${c} cm och en katet ${a} cm. Hur lång är den andra kateten (cm)?`, svar: b, ledtrad: `b² = ${c}² − ${a}² = ${c * c - a * a}.`},
        {q: `En rätvinklig triangel har kateterna ${x} cm och ${y} cm. Hur lång är hypotenusan (cm)? Avrunda till en decimal.`, svar: Math.round(h * 10) / 10, tol: 0.051, ledtrad: `c = √(${x}² + ${y}²) = √${x * x + y * y}.`}]);
    }},
  },
  begrepp: [
    ['Spegling', 'En figur vänds som i en spegel'],
    ['Symmetrilinje', 'En linje som delar en figur i två spegelvända delar'],
    ['Rotationssymmetri', 'Figuren ser likadan ut efter att ha vridits'],
    ['Skala', 'Förhållandet mellan längden på en bild och i verkligheten'],
    ['Areaskala', 'Längdskalan i kvadrat'],
    ['Likformiga figurer', 'Samma form men olika storlek'],
    ['Motsvarande sidor', 'Sidor som har samma plats i likformiga figurer'],
    ['Rätvinklig triangel', 'En triangel med en vinkel som är 90°'],
    ['Hypotenusa', 'Den längsta sidan, mittemot den räta vinkeln'],
    ['Katet', 'En av de två sidorna som bildar den räta vinkeln'],
    ['Pythagoras sats', 'a² + b² = c² i en rätvinklig triangel'],
    ['Minsta gemensamma nämnare', 'Den minsta nämnare som alla nämnare går jämnt upp i'],
    ['Koordinater', 'Talpar som visar var en punkt ligger, t.ex. (3, −2)'],
    ['Förstoring', 'Bilden är större än verkligheten'],
    ['Förminskning', 'Bilden är mindre än verkligheten'],
  ],
  exempel: [
    [rtri(`<path d="M135 100 L25 20" stroke="${M}" stroke-width="6" stroke-linecap="round"/>`), 'hypotenusa', 'Den längsta sidan, mittemot den räta vinkeln, heter hypotenusa.', 'Vad heter den markerade sidan?'],
    [rtri(`<path d="M25 100 H135" stroke="${M}" stroke-width="6" stroke-linecap="round"/>`), 'katet', 'En av sidorna som bildar den räta vinkeln heter katet.', 'Vad heter den markerade sidan?'],
    ['<mark>a² + b² = c²</mark>', 'Pythagoras sats', 'a² + b² = c² heter Pythagoras sats.', 'Vad heter sambandet?'],
    [svg(160, 115, `<path d="M80 10 L130 100 H30 Z" fill="#fff" stroke="${I}" stroke-width="3" stroke-linejoin="round"/><path d="M80 4 V110" stroke="${M}" stroke-width="4" stroke-dasharray="7 5"/>`), 'symmetrilinje', 'Linjen delar figuren i två spegelvända delar. Den heter symmetrilinje.', 'Vad heter den markerade linjen?'],
    [svg(160, 115, `<path d="M15 100 H55 L15 60 Z" fill="#fff" stroke="${I}" stroke-width="3"/><path d="M70 100 H150 L70 20 Z" fill="#fff" stroke="${M}" stroke-width="4"/>`), 'likformiga figurer', 'Samma form men olika storlek. Figurerna är likformiga.', 'Vad kallas figurerna?'],
    ['Längdskala 1:3 &nbsp;→&nbsp; <mark>1:9</mark>', 'areaskala', 'Längdskalan i kvadrat är areaskalan.', 'Vad kallas 1:9 här?'],
    ['<mark>(3, −2)</mark>', 'koordinater', 'Talparet visar var punkten ligger. Det är punktens koordinater.'],
    [svg(160, 115, `<path d="M80 5 V110" stroke="${I}" stroke-width="2.5" stroke-dasharray="6 5"/><path d="M30 30 L65 30 L65 90 Z" fill="#fff" stroke="${I}" stroke-width="3"/><path d="M130 30 L95 30 L95 90 Z" fill="#fff" stroke="${M}" stroke-width="4"/>`), 'spegling', 'Figuren har vänts som i en spegel. Det är en spegling.', 'Vad har hänt med figuren?'],
    [br('x', '2') + ' + ' + br('x', '3') + ' = 10 &nbsp;→&nbsp; ' + br('3x', '<mark>6</mark>') + ' + ' + br('2x', '<mark>6</mark>'), 'minsta gemensamma nämnare', '6 är den minsta nämnaren som både 2 och 3 går jämnt upp i.'],
    ['Skala <mark>1:100</mark>', 'förminskning', 'Bilden är 100 gånger mindre än verkligheten. Det är en förminskning.', 'Vad visar skalan?'],
    ['Skala <mark>20:1</mark>', 'förstoring', 'Bilden är 20 gånger större än verkligheten. Det är en förstoring.', 'Vad visar skalan?'],
  ],
  dra: [
    ['Den längsta sidan i en rätvinklig triangel kallas ___.', 'hypotenusan'],
    ['De två sidorna som bildar den räta vinkeln kallas ___.', 'kateter'],
    ['a² + b² = c² kallas ___.', 'Pythagoras sats'],
    ['Figurer med samma form men olika storlek är ___.', 'likformiga'],
    ['En linje som delar en figur i två spegelvända delar kallas ___.', 'symmetrilinje'],
    ['Om längdskalan är 1:3 är ___ 1:9.', 'areaskalan'],
    ['En karta i skala 1:50 000 är en ___.', 'förminskning'],
    ['En bild i skala 20:1 är en ___.', 'förstoring'],
    ['(3, −2) är punktens ___.', 'koordinater'],
    ['För att lösa x/2 + x/3 = 10 multiplicerar vi med minsta gemensamma ___.', 'nämnaren'],
    ['I likformiga figurer är ___ sidor proportionella.', 'motsvarande'],
    ['När en figur vänds som i en spegel kallas det ___.', 'spegling'],
  ],
  quiz: [
    ['Kateterna är 6 cm och 8 cm. Hur lång är hypotenusan?', ['10 cm', '14 cm', '48 cm', '100 cm'], '6² + 8² = 100. √100 = 10.'],
    ['Hypotenusan är 13 cm och en katet 5 cm. Hur lång är den andra kateten?', ['12 cm', '8 cm', '18 cm', '144 cm'], '13² − 5² = 144. √144 = 12.'],
    ['Hur många symmetrilinjer har en kvadrat?', ['4', '2', '1', '8'], 'Två diagonaler och två mittlinjer.'],
    ['Punkten (4, 3) speglas i x-axeln. Var hamnar den?', ['(4, −3)', '(−4, 3)', '(−4, −3)', '(3, 4)'], 'y-koordinaten byter tecken.'],
    ['Längdskalan är 1:2. Hur många gånger större är arean?', ['4', '2', '8', '1/2'], 'Areaskalan är 2² = 4.'],
    ['Triangeln 3, 4, 5 cm är likformig med en triangel vars kortaste sida är 6 cm. Längsta sidan?', ['10 cm', '8 cm', '12 cm', '15 cm'], 'Förstoringen är 2. 5 · 2 = 10.'],
    ['Lös ekvationen x/2 + x/3 = 10.', ['x = 12', 'x = 2', 'x = 60', 'x = 5'], 'Multiplicera med 6: 3x + 2x = 60.'],
    ['Skala 1:50 000. Hur långt är 4 cm på kartan i verkligheten?', ['2 km', '200 m', '20 km', '0,2 km'], '4 · 50 000 = 200 000 cm = 2 km.'],
    ['Vad säger Pythagoras sats?', ['a² + b² = c²', 'a + b = c', 'a · b = c²', 'a² − b² = c'], 'Gäller i rätvinkliga trianglar.'],
    ['Vilken triangel är rätvinklig?', ['5, 12, 13', '4, 5, 6', '2, 3, 4', '6, 7, 8'], '5² + 12² = 169 = 13².'],
    ['Vad har likformiga figurer gemensamt?', ['Samma form', 'Samma area', 'Samma omkrets', 'Samma storlek'], 'Storleken kan skilja, men formen är densamma.'],
    ['Hur många symmetrilinjer har en liksidig triangel?', ['3', '1', '2', '6'], 'En från varje hörn.'],
    ['Lös ekvationen x/4 − x/6 = 2.', ['x = 24', 'x = 12', 'x = 48', 'x = 4'], 'Multiplicera med 12: 3x − 2x = 24.'],
    ['En 5 m lång stege står 3 m från väggen. Hur högt når den?', ['4 m', '2 m', '8 m', '5,8 m'], '5² − 3² = 16. √16 = 4.'],
    ['Punkten (−2, 5) speglas i y-axeln. Var hamnar den?', ['(2, 5)', '(−2, −5)', '(2, −5)', '(5, −2)'], 'x-koordinaten byter tecken.'],
  ]},
});
};
