// Övningsdata för åk 7, per kapitel. Läses av trana.js.
var TRANA_DATA = ({r, val, sv, tus, sgn, blanda}) => ({
  '1': {namn: 'Taluppfattning',
  avsnitt: {
    '1.1': {namn: 'Naturliga tal', gen() {
      const n = r(10000, 999999), s = String(n);
      const pos = val([['ental', 1], ['tiotal', 2], ['hundratal', 3], ['tusental', 4], ['tiotusental', 5]]);
      return {q: `Vilken siffra står på ${pos[0]}splatsen i talet ${tus(n)}?`, svar: +s[s.length - pos[1]],
        ledtrad: 'Räkna från höger: ental, tiotal, hundratal, tusental, tiotusental.'};
    }},
    '1.2': {namn: 'Numeriska uttryck', gen() {
      const a = r(2, 9), b = r(2, 9), c = r(2, 9);
      return val([
        {q: `${a} + ${b} · ${c} =`, svar: a + b * c, ledtrad: 'Multiplikation görs före addition.'},
        {q: `(${a} + ${b}) · ${c} =`, svar: (a + b) * c, ledtrad: 'Räkna först det som står inom parentes.'},
        {q: `${a * c + 10} − ${a} · ${c} =`, svar: 10, ledtrad: 'Multiplikation görs före subtraktion.'},
        {q: `${a * b} / ${b} + ${c} =`, svar: a + c, ledtrad: 'Division görs före addition.'}]);
    }},
    '1.3': {namn: 'Hela tal', gen() {
      const a = r(-12, 12), b = r(-12, 12);
      return val([
        {q: `${sv(a)} + ${sgn(b)} =`, svar: a + b, ledtrad: 'Att addera ett negativt tal är samma sak som att subtrahera.'},
        {q: `${sv(a)} − ${sgn(b)} =`, svar: a - b, ledtrad: 'Att subtrahera ett negativt tal är samma sak som att addera.'},
        {q: `${sv(a)} · ${sgn(b)} =`, svar: a * b, ledtrad: 'Lika tecken ger plus, olika tecken ger minus.'}]);
    }},
    '1.4': {namn: 'Rationella tal', gen() {
      const [t, n] = val([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [1, 10], [7, 10], [1, 8], [3, 8], [1, 20]]);
      return val([
        {q: `Skriv ${t}/${n} i decimalform.`, svar: t / n, ledtrad: `Dela täljaren med nämnaren: ${t} / ${n}.`},
        {q: `Hur många procent är ${t}/${n}?`, svar: t / n * 100, ledtrad: 'Skriv bråket i decimalform och multiplicera med 100.'}]);
    }},
    '1.5': {namn: 'Räkna med bråk', gen() {
      const n = val([3, 4, 5, 6, 7, 8, 9, 10]), a = r(1, n - 1), b = r(1, n - 1), k = r(2, 5);
      return val([
        {q: `${a}/${n} + ${b}/${n} =`, svar: `${a + b}/${n}`, ledtrad: 'Samma nämnare: addera täljarna och behåll nämnaren. Svara som bråk, t.ex. 5/7.'},
        {q: `${Math.max(a, b)}/${n} − ${Math.min(a, b)}/${n} =`, svar: `${Math.max(a, b) - Math.min(a, b)}/${n}`, ledtrad: 'Samma nämnare: subtrahera täljarna. Svara som bråk.'},
        {q: `${k} · ${a}/${n} =`, svar: `${k * a}/${n}`, ledtrad: 'Multiplicera täljaren med heltalet och behåll nämnaren.'}]);
    }},
    '1.6': {namn: 'Multiplikation och division', gen() {
      const a = r(2, 9), b = r(2, 9);
      return val([
        {q: `0,${a} · ${b} =`, svar: a * b / 10, ledtrad: `Räkna ${a} · ${b} och flytta decimaltecknet ett steg.`},
        {q: `${a * b} / ${b} =`, svar: a, ledtrad: `Vilket tal gånger ${b} blir ${a * b}?`},
        {q: `${a},5 · 2 =`, svar: a * 2 + 1, ledtrad: 'Dubbla heltalet och dubbla halvan.'}]);
    }},
    '1.7': {namn: 'Division med stora och små tal', gen() {
      const a = r(2, 99), f = val([10, 100, 1000]);
      return val([
        {q: `${tus(a * f)} / ${tus(f)} =`, svar: a, ledtrad: `Dela med ${tus(f)}: ta bort ${String(f).length - 1} nollor.`},
        {q: `${a} / ${f} =`, svar: a / f, ledtrad: `Flytta decimaltecknet ${String(f).length - 1} steg åt vänster.`},
        {q: `${a} / 0,5 =`, svar: a * 2, ledtrad: 'Hur många halvor går det på talet? Dela med 0,5 är samma som att gånga med 2.'},
        {q: `${a} / 0,1 =`, svar: a * 10, ledtrad: 'Dela med 0,1 är samma som att gånga med 10.'}]);
    }},
    '1.8': {namn: 'Avrundning och överslagsräkning', gen() {
      const n = r(1000, 99999), d = r(100, 9999) / 100;
      return val([
        {q: `Avrunda ${tus(n)} till närmaste tiotal.`, svar: Math.round(n / 10) * 10, ledtrad: 'Titta på entalssiffran: 5 eller mer betyder avrunda uppåt.'},
        {q: `Avrunda ${tus(n)} till närmaste hundratal.`, svar: Math.round(n / 100) * 100, ledtrad: 'Titta på tiotalssiffran: 5 eller mer betyder avrunda uppåt.'},
        {q: `Avrunda ${sv(d)} till en decimal.`, svar: Math.round(d * 10) / 10, ledtrad: 'Titta på andra decimalen: 5 eller mer betyder avrunda uppåt.'}]);
    }},
  },
  begrepp: [
    ['Siffra', 'Tecknen 0–9 som vi skriver tal med'],
    ['Positionssystem', 'Siffrans värde beror på var i talet den står'],
    ['Naturliga tal', '0, 1, 2, 3, 4 …'],
    ['Heltal', '… −2, −1, 0, 1, 2 …'],
    ['Negativt tal', 'Ett tal som är mindre än noll'],
    ['Motsatta tal', 'Tal på samma avstånd från noll, t.ex. 5 och −5'],
    ['Rationellt tal', 'Ett tal som kan skrivas som ett bråk'],
    ['Decimaltal', 'Ett tal med decimaltecken, t.ex. 3,75'],
    ['Summa', 'Svaret i en addition'],
    ['Differens', 'Svaret i en subtraktion'],
    ['Produkt', 'Svaret i en multiplikation'],
    ['Kvot', 'Svaret i en division'],
    ['Term', 'Ett tal som adderas eller subtraheras'],
    ['Faktor', 'Ett tal som multipliceras'],
    ['Täljare', 'Talet ovanför bråkstrecket'],
    ['Nämnare', 'Talet under bråkstrecket'],
    ['Prioriteringsregler', 'Regler för i vilken ordning man räknar'],
    ['Avrunda', 'Ändra ett tal till ett närmevärde som är lättare att räkna med'],
    ['Överslagsräkning', 'Räkna ungefär för att se om svaret är rimligt'],
    ['Procent', 'Hundradelar, t.ex. 25 % = 25/100'],
  ],
  quiz: [
    ['Vilket värde har siffran 7 i talet 3 724?', ['700', '7', '70', '7 000'], '7 står på hundratalsplatsen, alltså 700.'],
    ['Vad är 2 + 3 · 4?', ['14', '20', '24', '9'], 'Multiplikation först: 3 · 4 = 12. Sedan 2 + 12 = 14.'],
    ['Vilket tal är störst?', ['−2', '−5', '−8', '−10'], 'På tallinjen ligger −2 längst till höger, så det är störst.'],
    ['Vad är −3 − 5?', ['−8', '2', '−2', '8'], 'Börja på −3 och gå 5 steg åt vänster på tallinjen: −8.'],
    ['Vilket bråk är lika med 0,25?', ['1/4', '2/5', '1/25', '25/10'], '0,25 är 25 hundradelar, och 25/100 = 1/4.'],
    ['Hur många procent är 3/4?', ['75 %', '34 %', '43 %', '25 %'], '3/4 = 0,75 = 75 hundradelar = 75 %.'],
    ['Vad är 2/7 + 3/7?', ['5/7', '5/14', '6/7', '1/7'], 'Samma nämnare: addera täljarna, 2 + 3 = 5. Nämnaren är kvar: 5/7.'],
    ['Vad är 4,5 / 10?', ['0,45', '45', '0,045', '4,05'], 'Dela med 10: flytta decimaltecknet ett steg åt vänster.'],
    ['Vad är 12 / 0,5?', ['24', '6', '12,5', '0,6'], 'Det går två halvor på varje hel, så 12 / 0,5 = 12 · 2 = 24.'],
    ['Vad blir 3 678 avrundat till närmaste hundratal?', ['3 700', '3 600', '3 680', '4 000'], 'Tiotalssiffran är 7, alltså 5 eller mer. Avrunda uppåt till 3 700.'],
    ['Vilket är ett bra överslag för 48 · 21?', ['50 · 20 = 1 000', '40 · 20 = 800', '50 · 30 = 1 500', '48 · 2 = 96'], 'Avrunda båda talen till närmaste tiotal: 50 · 20 = 1 000.'],
    ['Vad kallas svaret i en division?', ['Kvot', 'Produkt', 'Differens', 'Summa'], 'Division ger kvot. Multiplikation ger produkt, subtraktion differens och addition summa.'],
    ['Vilket av talen är ett negativt heltal?', ['−4', '4', '0,4', '−0,4'], '−4 är mindre än noll och har inga decimaler. −0,4 är negativt men inget heltal.'],
    ['Vad är (−4) · (−3)?', ['12', '−12', '−7', '7'], 'Två negativa faktorer ger en positiv produkt: 4 · 3 = 12.'],
    ['Vilket tal ligger mitt emellan −6 och 2?', ['−2', '−4', '0', '4'], 'Avståndet är 8 steg. Hälften är 4 steg: −6 + 4 = −2.'],
    ['Vad är 0,3 · 0,2?', ['0,06', '0,6', '0,5', '6'], '3 · 2 = 6. Faktorerna har tillsammans två decimaler, så svaret är 0,06.'],
    ['Vilket är det motsatta talet till 9?', ['−9', '1/9', '0,9', '90'], 'Motsatta tal ligger lika långt från noll på var sin sida: 9 och −9.'],
    ['Vad är (5 + 3) · 2 − 4?', ['12', '9', '6', '20'], 'Parentesen först: 8. Sedan 8 · 2 = 16 och 16 − 4 = 12.'],
    ['Vilket bråk är störst?', ['3/4', '2/3', '3/5', '1/2'], 'I decimalform: 0,75 > 0,67 > 0,6 > 0,5.'],
    ['Vad är 1/5 i decimalform?', ['0,2', '0,5', '1,5', '0,15'], '1 / 5 = 0,2.'],
  ],
  fyll: [
    ['Svaret i en addition kallas ___.', ['summa', 'summan'], 'Addition ger summa.'],
    ['Svaret i en multiplikation kallas ___.', ['produkt', 'produkten'], 'Multiplikation ger produkt.'],
    ['Svaret i en subtraktion kallas ___.', ['differens', 'differensen'], 'Subtraktion ger differens.'],
    ['Talet under bråkstrecket kallas ___.', ['nämnare', 'nämnaren'], 'Nämnaren står under strecket och talar om hur många delar det helas delas i.'],
    ['Talet ovanför bråkstrecket kallas ___.', ['täljare', 'täljaren'], 'Täljaren står ovanför strecket och räknar hur många delar man har.'],
    ['Tal som är mindre än noll kallas ___ tal.', ['negativa'], 'Negativa tal är mindre än noll, t.ex. −3.'],
    ['Ett tal som multipliceras kallas en ___.', ['faktor'], 'I 3 · 5 = 15 är 3 och 5 faktorer.'],
    ['I talet 5 382 står siffran 3 på ___platsen.', ['hundratals', 'hundratal', 'hundratals-'], 'Räkna från höger: ental (2), tiotal (8), hundratal (3).'],
    ['7 + 3 · 5 = ___', ['22'], 'Multiplikation först: 3 · 5 = 15. Sedan 7 + 15 = 22.'],
    ['−6 + 10 = ___', ['4'], 'Börja på −6 och gå 10 steg åt höger: 4.'],
    ['3/4 = ___ %', ['75'], '3/4 = 0,75 = 75 %.'],
    ['0,05 = ___ %', ['5'], '0,05 är 5 hundradelar, alltså 5 %.'],
    ['2,5 · 4 = ___', ['10'], '2 · 4 = 8 och 0,5 · 4 = 2. Tillsammans 10.'],
    ['360 / 10 = ___', ['36'], 'Dela med 10: ta bort en nolla.'],
    ['4,86 avrundat till en decimal är ___', ['4,9'], 'Andra decimalen är 6, alltså avrunda uppåt till 4,9.'],
    ['1 000 · 0,07 = ___', ['70'], 'Gånger 1 000: flytta decimaltecknet tre steg åt höger.'],
    ['Det motsatta talet till −12 är ___', ['12'], 'Motsatta tal ligger lika långt från noll: −12 och 12.'],
    ['1/2 + 1/4 = ___/4', ['3'], '1/2 = 2/4. Sedan 2/4 + 1/4 = 3/4.'],
    ['8 / 0,1 = ___', ['80'], 'Dela med 0,1 är samma som att gånga med 10.'],
    ['(−5) · 3 = ___', ['-15', '−15'], 'Olika tecken ger minus: −15.'],
  ]},
  '2': {namn: 'Algebra',
  avsnitt: {
    '2.1': {namn: 'Algebraiska uttryck', gen() {
      const a = r(2, 9), b = r(1, 12), x = r(2, 10);
      return val([
        {q: `Beräkna ${a}x + ${b} om x = ${x}.`, svar: a * x + b, ledtrad: `${a}x betyder ${a} · x. Byt ut x mot ${x}.`},
        {q: `Beräkna ${a}x − ${Math.min(b, a * x - 1)} om x = ${x}.`, svar: a * x - Math.min(b, a * x - 1), ledtrad: `${a}x betyder ${a} · x. Byt ut x mot ${x}.`},
        {q: `Beräkna 2a + b om a = ${x} och b = ${b}.`, svar: 2 * x + b, ledtrad: `Byt ut a mot ${x} och b mot ${b}: 2 · ${x} + ${b}.`},
        {q: `Beräkna x/2 + ${b} om x = ${2 * x}.`, svar: x + b, ledtrad: `Dela först ${2 * x} med 2 och addera sedan ${b}.`}]);
    }},
    '2.2': {namn: 'Mönster', gen() {
      const a = r(1, 9), d = r(2, 7), n = r(8, 20), s = r(40, 60);
      return val([
        {q: `Vilket tal kommer härnäst? ${a}, ${a + d}, ${a + 2 * d}, ${a + 3 * d}, …`, svar: a + 4 * d, ledtrad: `Talen ökar med ${d} varje gång.`},
        {q: `Vilket tal kommer härnäst? ${s}, ${s - d}, ${s - 2 * d}, ${s - 3 * d}, …`, svar: s - 4 * d, ledtrad: `Talen minskar med ${d} varje gång.`},
        {q: `Figur n består av ${d}n + ${a} stickor. Hur många stickor har figur ${n}?`, svar: d * n + a, ledtrad: `Byt ut n mot ${n}: ${d} · ${n} + ${a}.`}]);
    }},
    '2.3': {namn: 'Förenkling av uttryck', gen() {
      const a = r(2, 9), b = r(2, 9), c = r(1, 9), e = r(1, 9);
      return val([
        {q: `${a}x + ${b}x = ▢x`, svar: a + b, ledtrad: 'Addera koefficienterna, alltså talen framför x.'},
        {q: `${a + b}a − ${b}a = ▢a`, svar: a, ledtrad: 'Subtrahera koefficienterna, alltså talen framför a.'},
        {q: `${a}(x + ${c}) = ${a}x + ▢`, svar: a * c, ledtrad: `Multiplicera in ${a} i parentesen: ${a} · x och ${a} · ${c}.`},
        {q: `${a}x + ${c} + ${b}x + ${e} = ${a + b}x + ▢`, svar: c + e, ledtrad: 'Samla x-termerna för sig och talen för sig.'}]);
    }},
    '2.4': {namn: 'Ekvationer', gen() {
      const x = r(2, 12), a = r(2, 9), b = r(1, 20);
      return val([
        {q: `Lös ekvationen: x + ${b} = ${x + b}`, svar: x, ledtrad: `Subtrahera ${b} från båda leden.`},
        {q: `Lös ekvationen: x − ${b} = ${x}`, svar: x + b, ledtrad: `Addera ${b} till båda leden.`},
        {q: `Lös ekvationen: ${a}x = ${a * x}`, svar: x, ledtrad: `Dela båda leden med ${a}.`},
        {q: `Lös ekvationen: ${a}x + ${b} = ${a * x + b}`, svar: x, ledtrad: `Subtrahera först ${b} från båda leden och dela sedan med ${a}.`},
        {q: `Lös ekvationen: x/${a} = ${x}`, svar: a * x, ledtrad: `Multiplicera båda leden med ${a}.`}]);
    }},
    '2.5': {namn: 'Problemlösning med ekvation', gen() {
      const x = r(2, 12), a = r(2, 6), b = r(1, 15), p = r(8, 40);
      return val([
        {q: `Jag tänker på ett tal. Om jag multiplicerar det med ${a} och lägger till ${b} får jag ${a * x + b}. Vilket tal tänker jag på?`, svar: x, ledtrad: `Ställ upp ekvationen ${a}x + ${b} = ${a * x + b}.`},
        {q: `${a} pennor och ett sudd för ${b} kr kostar tillsammans ${a * p + b} kr. Vad kostar en penna (kr)?`, svar: p, ledtrad: `Kalla priset för en penna x. Då gäller ${a}x + ${b} = ${a * p + b}.`},
        {q: `Lisa är ${a} gånger så gammal som sin lillebror. Tillsammans är de ${(a + 1) * x} år. Hur gammal är lillebror?`, svar: x, ledtrad: `Kalla lillebrors ålder x. Då gäller x + ${a}x = ${(a + 1) * x}.`}]);
    }},
    '2.6': {namn: 'Ekvationer med obekanta i båda leden', gen() {
      const x = r(1, 9), c = r(1, 5), a = c + r(1, 4), b = r(1, 15), d = (a - c) * x + b;
      return {q: `Lös ekvationen: ${a}x + ${b} = ${c === 1 ? '' : c}x + ${d}`, svar: x, ledtrad: `Samla x i vänster led: subtrahera ${c === 1 ? '' : c}x från båda leden. Sedan ${a - c}x + ${b} = ${d}.`};
    }},
  },
  begrepp: [
    ['Variabel', 'En bokstav som står för ett tal som kan variera'],
    ['Uttryck', 'Tal, variabler och räknesätt utan likhetstecken'],
    ['Ekvation', 'Två uttryck med likhetstecken emellan, t.ex. x + 3 = 7'],
    ['Lösning', 'Det värde på x som gör att ekvationen stämmer'],
    ['Koefficient', 'Talet framför variabeln, t.ex. 5 i 5x'],
    ['Term', 'En del av ett uttryck som skiljs åt med + eller −'],
    ['Förenkla', 'Skriva ett uttryck kortare, t.ex. 2x + 3x = 5x'],
    ['Led', 'Det som står på var sin sida om likhetstecknet'],
    ['Mönster', 'Något som upprepas eller växer enligt en regel'],
    ['Obekant', 'Det tal man söker i en ekvation'],
    ['Prövning', 'Sätta in lösningen i ekvationen för att kontrollera den'],
    ['Likhetstecken', 'Visar att båda sidor har samma värde'],
    ['Parentes', 'Visar vad som ska räknas först'],
    ['Formel', 'En regel skriven med variabler, t.ex. A = b · h'],
    ['Balansmetoden', 'Göra samma sak i båda leden för att lösa en ekvation'],
  ],
  quiz: [
    ['Vad är värdet av 3x + 2 om x = 4?', ['14', '34', '9', '20'], '3 · 4 = 12 och 12 + 2 = 14.'],
    ['Förenkla 5a + 2a − a.', ['6a', '7a', '8a', '6'], '5 + 2 − 1 = 6, alltså 6a.'],
    ['Lös ekvationen x + 7 = 15.', ['x = 8', 'x = 22', 'x = 7', 'x = 15'], 'Subtrahera 7 från båda leden: x = 8.'],
    ['Lös ekvationen 4x = 28.', ['x = 7', 'x = 24', 'x = 32', 'x = 112'], 'Dela båda leden med 4: x = 7.'],
    ['Vilket uttryck betyder ”ett tal plus 5, sedan gånger 2”?', ['(x + 5) · 2', 'x + 5 · 2', '2x + 5', 'x · 5 + 2'], 'Additionen ska göras först, därför behövs en parentes.'],
    ['Mönstret är 4, 7, 10, 13 … Vilket tal kommer sedan?', ['16', '15', '17', '14'], 'Talen ökar med 3 varje gång.'],
    ['Vad är koefficienten i 9y?', ['9', 'y', '9y', '1'], 'Koefficienten är talet framför variabeln.'],
    ['Multiplicera in: 3(x + 4)', ['3x + 12', '3x + 4', 'x + 12', '3x + 7'], 'Både x och 4 ska multipliceras med 3.'],
    ['Lös ekvationen 2x + 5 = 17.', ['x = 6', 'x = 11', 'x = 8,5', 'x = 12'], 'Subtrahera 5: 2x = 12. Dela med 2: x = 6.'],
    ['Lös ekvationen 5x = 2x + 12.', ['x = 4', 'x = 12', 'x = 3', 'x = 6'], 'Subtrahera 2x från båda leden: 3x = 12. Dela med 3: x = 4.'],
    ['Vilket av dessa är en ekvation?', ['x + 2 = 9', 'x + 2', '3x − 4y', '2 · 5'], 'En ekvation har ett likhetstecken.'],
    ['Figur n har 2n + 1 prickar. Hur många prickar har figur 5?', ['11', '7', '10', '25'], '2 · 5 + 1 = 11.'],
    ['Förenkla 4x + 3 + 2x + 5.', ['6x + 8', '14x', '6x + 3', '8x + 6'], 'x-termerna blir 6x och talen blir 8.'],
    ['Lös ekvationen x/3 = 6.', ['x = 18', 'x = 2', 'x = 9', 'x = 3'], 'Multiplicera båda leden med 3: x = 18.'],
    ['Hur kontrollerar du att x = 5 är lösningen till 3x − 4 = 11?', ['Sätter in 5 i stället för x', 'Delar 11 med 3', 'Lägger till 4 i ena ledet', 'Gissar ett annat tal'], 'Sätt in x = 5: 3 · 5 − 4 = 11. Det stämmer.'],
  ],
  fyll: [
    ['En bokstav som står för ett tal kallas en ___.', ['variabel'], 'I 3x + 2 är x en variabel.'],
    ['Talet framför x i 7x kallas ___.', ['koefficient', 'koefficienten'], 'Koefficienten i 7x är 7.'],
    ['x + 9 = 20 ger x = ___', ['11'], 'Subtrahera 9 från båda leden.'],
    ['6x = 42 ger x = ___', ['7'], 'Dela båda leden med 6.'],
    ['3x − 2 = 13 ger x = ___', ['5'], 'Addera 2: 3x = 15. Dela med 3: x = 5.'],
    ['2x + 3x = ___x', ['5'], 'Addera koefficienterna: 2 + 3 = 5.'],
    ['5(x + 2) = 5x + ___', ['10'], 'Multiplicera in: 5 · 2 = 10.'],
    ['Mönstret 2, 6, 10, 14 … Nästa tal är ___', ['18'], 'Talen ökar med 4.'],
    ['Om a = 4 är 3a + 1 = ___', ['13'], '3 · 4 + 1 = 13.'],
    ['En ekvation har alltid ett ___.', ['likhetstecken'], 'Likhetstecknet visar att leden har samma värde.'],
    ['7x = 4x + 9 ger x = ___', ['3'], 'Subtrahera 4x: 3x = 9. Dela med 3: x = 3.'],
    ['x/4 = 5 ger x = ___', ['20'], 'Multiplicera båda leden med 4.'],
    ['Det som står på var sin sida om likhetstecknet kallas ___.', ['led', 'leden'], 'Man säger vänster led och höger led.'],
    ['8y − 3y + y = ___y', ['6'], '8 − 3 + 1 = 6.'],
    ['Om x = 3 är x · x = ___', ['9'], '3 · 3 = 9.'],
  ]},
  '3': {namn: 'Geometri',
  avsnitt: {
    '3.1': {namn: 'Prefix och enheter', gen() {
      const m = r(11, 99) / 10, c = r(120, 990), k = r(2, 9) / 2, g = r(12, 95) * 100, l = r(11, 49) / 10;
      const [p, v] = val([['kilo', 1000], ['deci', 0.1], ['centi', 0.01], ['milli', 0.001]]);
      return val([
        {q: `${sv(m)} m = ? cm`, svar: m * 100, ledtrad: '1 m = 100 cm. Multiplicera med 100.'},
        {q: `${c} cm = ? m`, svar: c / 100, ledtrad: '100 cm = 1 m. Dela med 100.'},
        {q: `${sv(k)} km = ? m`, svar: k * 1000, ledtrad: '1 km = 1 000 m. Multiplicera med 1 000.'},
        {q: `${tus(g)} g = ? kg`, svar: g / 1000, ledtrad: '1 000 g = 1 kg. Dela med 1 000.'},
        {q: `${sv(l)} liter = ? dl`, svar: l * 10, ledtrad: '1 liter = 10 dl. Multiplicera med 10.'},
        {q: `Vad betyder prefixet ${p}? Svara med ett tal.`, svar: v, ledtrad: 'kilo = tusen, deci = en tiondel, centi = en hundradel, milli = en tusendel.'}]);
    }},
    '3.2': {namn: 'Längd och skala', gen() {
      const s = val([50, 100, 200]), d = r(2, 12), ks = val([10000, 50000, 100000]), kd = r(2, 9), f = val([2, 5, 10]), v = r(2, 9);
      return val([
        {q: `Skala 1:${s}. En vägg är ${d} cm på ritningen. Hur många meter är den i verkligheten?`, svar: d * s / 100, ledtrad: `Verkligheten är ${s} gånger större: ${d} · ${s} cm. Gör sedan om till meter.`},
        {q: `Skala 1:${tus(ks)}. Avståndet på kartan är ${kd} cm. Hur många km är det i verkligheten?`, svar: kd * ks / 100000, ledtrad: `Räkna ${kd} · ${tus(ks)} cm. 100 000 cm = 1 km.`},
        {q: `Skala ${f}:1. En insekt är ${f * v} mm lång på bilden. Hur lång är den i verkligheten (mm)?`, svar: v, ledtrad: `Bilden är ${f} gånger större än verkligheten. Dela med ${f}.`},
        {q: `Ett bord som är ${sv(d * s / 100)} m långt ritas ${d} cm långt. Skalan är 1:?`, svar: s, ledtrad: `Gör om till cm: ${tus(d * s)} cm. Hur många gånger större är det än ${d} cm?`}]);
    }},
    '3.3': {namn: 'Vinklar', gen() {
      const a = r(15, 165), b = r(10, 80), c = r(60, 150), d = r(60, 150);
      return val([
        {q: `Två sidovinklar är tillsammans 180°. Den ena är ${a}°. Hur stor är den andra (grader)?`, svar: 180 - a, ledtrad: 'Sidovinklar bildar tillsammans en rak vinkel, 180°.'},
        {q: `Två vinklar bildar tillsammans en rät vinkel. Den ena är ${b}°. Hur stor är den andra (grader)?`, svar: 90 - b, ledtrad: 'En rät vinkel är 90°.'},
        {q: `Två linjer korsar varandra. En av vinklarna är ${a}°. Hur stor är vertikalvinkeln (grader)?`, svar: a, ledtrad: 'Vertikalvinklar är lika stora.'},
        {q: `Tre vinklar ligger runt en punkt. Två av dem är ${c}° och ${d}°. Hur stor är den tredje (grader)?`, svar: 360 - c - d, ledtrad: 'Vinklarna runt en punkt är tillsammans 360°.'}]);
    }},
    '3.4': {namn: 'Vinkelsumma', gen() {
      const a = r(20, 100), b = r(20, 150 - a), c = r(60, 120), d = r(60, 120), e = r(60, Math.min(120, 330 - c - d)), t = 2 * r(10, 70);
      return val([
        {q: `Två vinklar i en triangel är ${a}° och ${b}°. Hur stor är den tredje vinkeln (grader)?`, svar: 180 - a - b, ledtrad: 'Vinkelsumman i en triangel är 180°.'},
        {q: `Tre vinklar i en fyrhörning är ${c}°, ${d}° och ${e}°. Hur stor är den fjärde vinkeln (grader)?`, svar: 360 - c - d - e, ledtrad: 'Vinkelsumman i en fyrhörning är 360°.'},
        {q: `En likbent triangel har toppvinkeln ${t}°. Hur stor är var och en av basvinklarna (grader)?`, svar: (180 - t) / 2, ledtrad: 'Basvinklarna är lika stora. Dela det som blir kvar av 180° med 2.'}]);
    }},
    '3.5': {namn: 'Omkrets', gen() {
      const a = r(2, 15), b = r(2, 15), c = r(3, 12);
      return val([
        {q: `En rektangel är ${a} cm lång och ${b} cm bred. Vad är omkretsen (cm)?`, svar: 2 * (a + b), ledtrad: 'Omkretsen är summan av alla fyra sidorna.'},
        {q: `En kvadrat har sidan ${a} cm. Vad är omkretsen (cm)?`, svar: 4 * a, ledtrad: 'En kvadrat har fyra lika långa sidor.'},
        {q: `En triangel har sidorna ${a} cm, ${b} cm och ${c} cm. Vad är omkretsen (cm)?`, svar: a + b + c, ledtrad: 'Addera alla tre sidorna.'},
        {q: `En kvadrat har omkretsen ${4 * a} cm. Hur lång är en sida (cm)?`, svar: a, ledtrad: 'Dela omkretsen med 4.'},
        {q: `En rektangel har omkretsen ${2 * (a + b)} cm och är ${a} cm lång. Hur bred är den (cm)?`, svar: b, ledtrad: `Två långsidor är ${2 * a} cm. Det som blir kvar delas på två kortsidor.`}]);
    }},
    '3.6': {namn: 'Area', gen() {
      const a = r(2, 12), b = r(2, 12), bas = 2 * r(2, 8), h = r(2, 12);
      return val([
        {q: `En rektangel är ${a} cm lång och ${b} cm bred. Vad är arean (cm²)?`, svar: a * b, ledtrad: 'Arean = längd · bredd.'},
        {q: `En kvadrat har sidan ${a} cm. Vad är arean (cm²)?`, svar: a * a, ledtrad: 'Arean = sida · sida.'},
        {q: `En triangel har basen ${bas} cm och höjden ${h} cm. Vad är arean (cm²)?`, svar: bas * h / 2, ledtrad: 'Arean = bas · höjd / 2.'},
        {q: `Ett parallellogram har basen ${a} cm och höjden ${b} cm. Vad är arean (cm²)?`, svar: a * b, ledtrad: 'Arean = bas · höjd.'},
        {q: `${a} m² = ? dm²`, svar: a * 100, ledtrad: '1 m² = 10 dm · 10 dm = 100 dm².'}]);
    }},
  },
  begrepp: [
    ['Prefix', 'Förled som visar storlek, t.ex. kilo och milli'],
    ['Skala', 'Förhållandet mellan längden på en bild och i verkligheten'],
    ['Förminskning', 'Bilden är mindre än verkligheten, t.ex. skala 1:100'],
    ['Förstoring', 'Bilden är större än verkligheten, t.ex. skala 5:1'],
    ['Rät vinkel', 'En vinkel som är 90°'],
    ['Spetsig vinkel', 'En vinkel som är mindre än 90°'],
    ['Trubbig vinkel', 'En vinkel mellan 90° och 180°'],
    ['Rak vinkel', 'En vinkel som är 180°'],
    ['Vertikalvinklar', 'Motstående vinklar när två linjer korsas, de är lika stora'],
    ['Sidovinklar', 'Två vinklar bredvid varandra som tillsammans är 180°'],
    ['Vinkelsumma', 'Alla vinklar i en figur tillsammans, i en triangel 180°'],
    ['Omkrets', 'Längden runt en figur'],
    ['Area', 'Hur stor yta en figur har'],
    ['Gradskiva', 'Ett verktyg för att mäta vinklar'],
    ['Likbent triangel', 'En triangel med två lika långa sidor'],
    ['Liksidig triangel', 'En triangel där alla sidor är lika långa'],
  ],
  quiz: [
    ['Hur många cm är 2,5 m?', ['250', '25', '2 500', '0,25'], '1 m = 100 cm, så 2,5 · 100 = 250.'],
    ['Vad betyder prefixet milli?', ['En tusendel', 'En tiondel', 'En hundradel', 'Tusen'], '1 mm = 0,001 m.'],
    ['Skala 1:100. En linje på ritningen är 5 cm. Hur lång är den i verkligheten?', ['5 m', '50 cm', '500 m', '0,5 m'], '5 · 100 = 500 cm = 5 m.'],
    ['Bilden är 10 gånger större än verkligheten. Vilken är skalan?', ['10:1', '1:10', '1:100', '100:1'], 'Vid förstoring står det större talet först.'],
    ['Hur stor är en rät vinkel?', ['90°', '180°', '45°', '360°'], 'En rät vinkel är 90°, som hörnet på ett papper.'],
    ['En vinkel är 130°. Vilken sorts vinkel är det?', ['Trubbig', 'Spetsig', 'Rät', 'Rak'], 'En trubbig vinkel är mellan 90° och 180°.'],
    ['Två vinklar i en triangel är 50° och 60°. Hur stor är den tredje?', ['70°', '110°', '80°', '250°'], '180° − 50° − 60° = 70°.'],
    ['Vad är vinkelsumman i en fyrhörning?', ['360°', '180°', '270°', '540°'], 'En fyrhörning kan delas i två trianglar: 2 · 180° = 360°.'],
    ['En rektangel är 8 cm lång och 3 cm bred. Vad är omkretsen?', ['22 cm', '24 cm', '11 cm', '24 cm²'], '8 + 3 + 8 + 3 = 22 cm.'],
    ['En rektangel är 8 cm lång och 3 cm bred. Vad är arean?', ['24 cm²', '22 cm²', '11 cm²', '24 cm'], '8 · 3 = 24 cm².'],
    ['En triangel har basen 6 cm och höjden 4 cm. Vad är arean?', ['12 cm²', '24 cm²', '10 cm²', '20 cm²'], '6 · 4 / 2 = 12 cm².'],
    ['Vertikalvinklar är …', ['lika stora', 'tillsammans 180°', 'tillsammans 90°', 'alltid räta'], 'Motstående vinklar där två linjer korsas är lika stora.'],
    ['Hur många gram är 1,2 kg?', ['1 200 g', '120 g', '12 g', '12 000 g'], '1 kg = 1 000 g.'],
    ['En kvadrat har omkretsen 20 cm. Vad är arean?', ['25 cm²', '20 cm²', '16 cm²', '100 cm²'], 'Sidan är 20 / 4 = 5 cm. Arean är 5 · 5 = 25 cm².'],
    ['Vilken enhet passar för area?', ['cm²', 'cm', 'cm³', 'kg'], 'Area mäts i kvadratenheter.'],
  ],
  fyll: [
    ['1 km = ___ m', ['1000'], '1 km = 1 000 m.'],
    ['35 mm = ___ cm', ['3,5'], '10 mm = 1 cm. Dela med 10.'],
    ['En rät vinkel är ___°', ['90'], 'Som hörnet på ett papper.'],
    ['Vinkelsumman i en triangel är ___°', ['180'], 'Alla tre vinklarna blir tillsammans 180°.'],
    ['Längden runt en figur kallas ___.', ['omkrets', 'omkretsen'], 'Omkretsen är summan av alla sidor.'],
    ['En vinkel som är mindre än 90° kallas ___.', ['spetsig', 'spetsig vinkel', 'en spetsig vinkel'], 'Spetsig vinkel: mindre än 90°.'],
    ['Skala 1:50. 2 cm på ritningen är ___ cm i verkligheten.', ['100'], '2 · 50 = 100 cm.'],
    ['Arean av en rektangel som är 7 cm lång och 4 cm bred är ___ cm².', ['28'], '7 · 4 = 28.'],
    ['Omkretsen av en kvadrat med sidan 6 cm är ___ cm.', ['24'], '4 · 6 = 24.'],
    ['En triangel har vinklarna 90° och 35°. Den tredje vinkeln är ___°.', ['55'], '180 − 90 − 35 = 55.'],
    ['Arean av en triangel med basen 10 cm och höjden 3 cm är ___ cm².', ['15'], '10 · 3 / 2 = 15.'],
    ['1 m² = ___ dm²', ['100'], '10 dm · 10 dm = 100 dm².'],
    ['Ett verktyg för att mäta vinklar heter ___.', ['gradskiva', 'gradskivan', 'en gradskiva'], 'Med en gradskiva mäter du vinklar i grader.'],
    ['4,5 l = ___ dl', ['45'], '1 l = 10 dl.'],
    ['Sidovinklar är tillsammans ___°.', ['180'], 'De bildar en rak vinkel.'],
  ]},
  '4': {namn: 'Samband och förändring',
  avsnitt: {
    '4.1': {namn: 'Proportionalitet', gen() {
      const n = r(2, 5), p = r(4, 30), m = n + r(1, 4), k = r(2, 9), x = r(2, 9), g = r(1, 5) * 100;
      return val([
        {q: `${n} kg kostar ${n * p} kr. Vad kostar ${m} kg (kr)?`, svar: m * p, ledtrad: `Räkna först ut priset för 1 kg: ${n * p} / ${n}.`},
        {q: `y är proportionell mot x. När x = ${x} är y = ${k * x}. Vad är y när x = ${x + 3}?`, svar: k * (x + 3), ledtrad: `y = kx. Räkna först ut k = ${k * x} / ${x}.`},
        {q: `y = ${k}x. Vad är y när x = ${x}?`, svar: k * x, ledtrad: `Byt ut x mot ${x}: ${k} · ${x}.`},
        {q: `Ett recept för 4 personer behöver ${g} g mjöl. Hur många gram behövs för 6 personer?`, svar: g * 1.5, ledtrad: `Räkna ut för 2 personer först: hälften av ${g} g.`}]);
    }},
    '4.2': {namn: 'Tid och rörelse', gen() {
      const tid = m => `${Math.floor(m / 60)}.${String(m % 60).padStart(2, '0')}`;
      const h = val([0.25, 0.5, 0.75, 1.5, 2.5, 1.25]), mi = val([90, 150, 45, 30, 75, 135]);
      const start = r(8, 15) * 60 + 5 * r(0, 11), dur = 5 * r(5, 30), s = r(2, 9);
      return val([
        {q: `${sv(h)} h = ? min`, svar: h * 60, ledtrad: '1 h = 60 min. Multiplicera med 60.'},
        {q: `${mi} min = ? h`, svar: mi / 60, ledtrad: 'Dela antalet minuter med 60.'},
        {q: `Hur många minuter är det från klockan ${tid(start)} till ${tid(start + dur)}?`, svar: dur, ledtrad: 'Räkna först fram till nästa hela timme och sedan resten.'},
        {q: `Hur många sekunder är ${s} min?`, svar: s * 60, ledtrad: '1 min = 60 s.'}]);
    }},
    '4.3': {namn: 'Sträcka, tid och hastighet', gen() {
      const v = r(3, 12) * 10, t = r(2, 5), c = 2 * r(6, 12);
      return val([
        {q: `En bil kör i ${v} km/h i ${t} timmar. Hur långt kör den (km)?`, svar: v * t, ledtrad: 'Sträcka = hastighet · tid.'},
        {q: `Ett tåg kör ${v * t} km på ${t} h. Vad är medelhastigheten (km/h)?`, svar: v, ledtrad: 'Hastighet = sträcka / tid.'},
        {q: `Hur många timmar tar det att köra ${v * t} km i ${v} km/h?`, svar: t, ledtrad: 'Tid = sträcka / hastighet.'},
        {q: `Du cyklar i ${c} km/h i 30 minuter. Hur långt cyklar du (km)?`, svar: c / 2, ledtrad: '30 min = 0,5 h. Sträcka = hastighet · tid.'}]);
    }},
    '4.4': {namn: 'Andel i bråkform', gen() {
      const [t, n] = val([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5]]), m = r(2, 8);
      return val([
        {q: `${t * m} av ${n * m} elever cyklar till skolan. Hur stor andel cyklar? Svara i bråkform.`, svar: `${t}/${n}`, ledtrad: `Andelen är ${t * m}/${n * m}. Förkorta gärna med ${m}.`},
        {q: `Hur mycket är ${t}/${n} av ${n * m}?`, svar: t * m, ledtrad: `Dela ${n * m} med ${n} och multiplicera sedan med ${t}.`},
        {q: `${t}/${n} av klassen är ${t * m} elever. Hur många elever är det i klassen?`, svar: n * m, ledtrad: `1/${n} av klassen är ${m} elever.`}]);
    }},
    '4.5': {namn: 'Andel i procentform (I)', gen() {
      const p = r(1, 99), [t, n] = val([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [1, 10], [3, 10], [1, 20], [1, 25]]);
      return val([
        {q: `Skriv ${sv(p / 100)} i procentform. ? %`, svar: p, ledtrad: 'Multiplicera med 100. Hundradelar blir procent.'},
        {q: `Skriv ${p} % i decimalform.`, svar: p / 100, ledtrad: 'Procent betyder hundradelar. Dela med 100.'},
        {q: `Hur många procent är ${t}/${n}?`, svar: t / n * 100, ledtrad: 'Skriv bråket i decimalform och multiplicera med 100.'}]);
    }},
    '4.6': {namn: 'Andel i procentform (II)', gen() {
      const hel = val([20, 25, 50]), del = r(1, hel - 1);
      return val([
        {q: `I en klass med ${hel} elever har ${del} elever en katt. Hur många procent har en katt?`, svar: del * 100 / hel, ledtrad: `Andelen är ${del}/${hel}. Förläng så att nämnaren blir 100.`},
        {q: `Hur många procent är ${del} av ${hel}?`, svar: del * 100 / hel, ledtrad: `Andelen är ${del}/${hel}. Förläng så att nämnaren blir 100.`}]);
    }},
    '4.7': {namn: 'Hur stor är delen', gen() {
      const hel = 20 * r(2, 30), p = val([5, 10, 20, 25, 30, 40, 50, 75]);
      return val([
        {q: `Hur mycket är ${p} % av ${hel}?`, svar: hel * p / 100, ledtrad: `${p} % = ${sv(p / 100)}. Räkna ${sv(p / 100)} · ${hel}.`},
        {q: `En jacka kostar ${hel} kr. Priset sänks med ${p} %. Hur många kronor sänks priset?`, svar: hel * p / 100, ledtrad: `Räkna ${p} % av ${hel}. 10 % är ${hel / 10}.`},
        {q: `Det går ${hel} elever på skolan. ${p} % av dem går i åk 7. Hur många elever är det?`, svar: hel * p / 100, ledtrad: `1 % är ${sv(hel / 100)} elever. Multiplicera med ${p}.`}]);
    }},
  },
  begrepp: [
    ['Proportionalitet', 'Två storheter växer i samma takt, y = kx'],
    ['Proportionalitetskonstant', 'Talet k i y = kx'],
    ['Hastighet', 'Hur lång sträcka man färdas per tidsenhet'],
    ['Sträcka', 'Hur långt något har förflyttat sig'],
    ['Medelhastighet', 'Hela sträckan delat med hela tiden'],
    ['km/h', 'Kilometer per timme'],
    ['Andel', 'Hur stor del något är av det hela'],
    ['Delen', 'Den del av det hela som andelen gäller'],
    ['Det hela', 'Hela mängden som man jämför med'],
    ['Procent', 'Hundradelar'],
    ['Rabatt', 'Hur mycket priset sänks'],
    ['Tabell', 'Värden ordnade i rader och kolumner'],
    ['Graf', 'En linje eller kurva som visar ett samband i ett koordinatsystem'],
    ['Koordinatsystem', 'En x-axel och en y-axel som korsar varandra'],
    ['Origo', 'Punkten (0, 0) där axlarna möts'],
  ],
  quiz: [
    ['3 kg äpplen kostar 60 kr. Vad kostar 5 kg?', ['100 kr', '120 kr', '80 kr', '300 kr'], '1 kg kostar 20 kr. 5 · 20 = 100 kr.'],
    ['Vilken formel visar proportionalitet?', ['y = 4x', 'y = 4x + 2', 'y = x + 4', 'y = 4'], 'Proportionalitet skrivs y = kx, utan något tillägg.'],
    ['Hur många minuter är 1,5 timmar?', ['90 min', '150 min', '105 min', '15 min'], '1 h = 60 min och 0,5 h = 30 min.'],
    ['En bil kör i 80 km/h i 3 timmar. Hur långt kör den?', ['240 km', '83 km', '26,7 km', '160 km'], 'Sträcka = hastighet · tid = 80 · 3.'],
    ['Du cyklar 30 km på 2 timmar. Vad är medelhastigheten?', ['15 km/h', '60 km/h', '32 km/h', '28 km/h'], 'Hastighet = sträcka / tid = 30 / 2.'],
    ['Hur stor andel är 5 av 20?', ['1/4', '1/5', '5/15', '4/5'], '5/20 kan förkortas till 1/4.'],
    ['Vad är 3/4 av 40?', ['30', '10', '120', '34'], '40 / 4 = 10 och 3 · 10 = 30.'],
    ['Hur många procent är 0,08?', ['8 %', '80 %', '0,8 %', '0,08 %'], '0,08 är 8 hundradelar, alltså 8 %.'],
    ['Hur många procent är 9 av 25?', ['36 %', '9 %', '25 %', '34 %'], '9/25 = 36/100 = 36 %.'],
    ['Vad är 20 % av 150?', ['30', '20', '7,5', '300'], '10 % är 15, så 20 % är 30.'],
    ['En tröja kostar 400 kr och sänks med 25 %. Hur mycket billigare blir den?', ['100 kr', '25 kr', '300 kr', '75 kr'], '25 % är en fjärdedel. 400 / 4 = 100.'],
    ['Hur skrivs 45 % i decimalform?', ['0,45', '4,5', '45', '0,045'], 'Procent betyder hundradelar: 45/100 = 0,45.'],
    ['Du går i 6 km/h i 30 minuter. Hur långt går du?', ['3 km', '6 km', '12 km', '30 km'], '30 min = 0,5 h. 6 · 0,5 = 3 km.'],
    ['Hur mycket är 1 % av 700?', ['7', '70', '0,7', '1'], '1 % är en hundradel: 700 / 100 = 7.'],
    ['Vilket tal är störst?', ['3/5', '55 %', '0,5', '0,58'], '3/5 = 0,6, vilket är mer än 0,58.'],
  ],
  fyll: [
    ['2 h = ___ min', ['120'], '1 h = 60 min.'],
    ['45 min = ___ h', ['0,75'], '45 / 60 = 0,75.'],
    ['Sträcka = hastighet · ___', ['tid', 'tiden'], 's = v · t.'],
    ['6 kg kostar 90 kr. 1 kg kostar ___ kr.', ['15'], '90 / 6 = 15.'],
    ['y = 3x. Om x = 7 är y = ___', ['21'], '3 · 7 = 21.'],
    ['1/4 = ___ %', ['25'], '1/4 = 25/100.'],
    ['12 av 48 är ___ %', ['25'], '12/48 = 1/4 = 25 %.'],
    ['10 % av 260 = ___', ['26'], 'Dela med 10.'],
    ['50 % av 84 = ___', ['42'], '50 % är hälften.'],
    ['0,6 = ___ %', ['60'], '0,6 = 0,60 = 60 hundradelar.'],
    ['En bil kör 150 km på 2 h. Medelhastigheten är ___ km/h.', ['75'], '150 / 2 = 75.'],
    ['Procent betyder ___.', ['hundradelar', 'hundradel', 'per hundra'], 'Procent kommer från latin och betyder per hundra.'],
    ['2/5 av 35 = ___', ['14'], '35 / 5 = 7 och 2 · 7 = 14.'],
    ['Ett tåg kör 240 km i 80 km/h. Det tar ___ h.', ['3'], 'Tid = sträcka / hastighet = 240 / 80.'],
    ['En vara kostar 200 kr och sänks med 15 %. Priset sänks med ___ kr.', ['30'], '10 % är 20 kr och 5 % är 10 kr.'],
  ]},
  '5': {namn: 'Sannolikhet och statistik',
  avsnitt: {
    '5.1': {namn: 'Sannolikhet', gen() {
      const [e, n] = val([['en sexa', 1], ['ett udda tal', 3], ['ett tal större än 4', 2], ['en etta eller en tvåa', 2], ['ett jämnt tal', 3]]);
      const rd = r(1, 9), bl = r(1, 9), p = 5 * r(2, 18);
      return val([
        {q: `Du kastar en vanlig tärning. Vad är sannolikheten att få ${e}? Svara i bråkform.`, svar: `${n}/6`, ledtrad: 'Sannolikhet = antal gynnsamma utfall / antal möjliga utfall. En tärning har 6 möjliga utfall.'},
        {q: `I en påse finns ${rd} röda och ${bl} blå kulor. Du tar en kula utan att titta. Vad är sannolikheten att den är röd? Svara i bråkform.`, svar: `${rd}/${rd + bl}`, ledtrad: `Det finns ${rd + bl} kulor och ${rd} av dem är röda.`},
        {q: `Sannolikheten att det regnar i morgon är ${p} %. Hur stor är sannolikheten att det inte regnar (%)?`, svar: 100 - p, ledtrad: 'Att det händer och att det inte händer är tillsammans 100 %.'}]);
    }},
    '5.2': {namn: 'Tabeller och diagram', gen() {
      const dagar = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre'], v = dagar.map(() => r(3, 20));
      const tab = `<table class="tab"><tr>${dagar.map(d => `<th>${d}</th>`).join('')}</tr><tr>${v.map(x => `<td>${x}</td>`).join('')}</tr></table>`;
      const i = r(0, 4), j = (i + r(1, 4)) % 5, [hi, lo] = v[i] >= v[j] ? [i, j] : [j, i];
      const intro = 'Tabellen visar hur många elever som lånade böcker i skolbiblioteket.';
      return val([
        {q: `${intro}${tab}Hur många lånade böcker totalt under veckan?`, svar: v.reduce((a, b) => a + b, 0), ledtrad: 'Addera alla dagarna.'},
        {q: `${intro}${tab}Hur många fler lånade på ${dagar[hi].toLowerCase()}dagen än på ${dagar[lo].toLowerCase()}dagen?`, svar: v[hi] - v[lo], ledtrad: 'Subtrahera det mindre antalet från det större.'},
        {q: `${intro}${tab}Hur många lånade böcker på ${dagar[i].toLowerCase()}dagen och ${dagar[j].toLowerCase()}dagen tillsammans?`, svar: v[i] + v[j], ledtrad: 'Leta upp de två dagarna i tabellen och addera.'}]);
    }},
    '5.3': {namn: 'Relativ frekvens', gen() {
      const n = val([20, 25, 50]), k = r(1, n - 1), p = val([20, 40, 60, 80]);
      return val([
        {q: `En tärning kastas ${n} gånger och visar sexa ${k} gånger. Vad är den relativa frekvensen för sexa i procent?`, svar: k * 100 / n, ledtrad: `Relativ frekvens = ${k}/${n}. Förläng så att nämnaren blir 100.`},
        {q: `Ett mynt singlas ${n} gånger och visar krona ${k} gånger. Skriv den relativa frekvensen för krona i decimalform.`, svar: k / n, ledtrad: `Räkna ${k} / ${n}.`},
        {q: `Efter ${n} kast var den relativa frekvensen för krona ${p} %. Hur många gånger blev det krona?`, svar: n * p / 100, ledtrad: `Räkna ${p} % av ${n}.`}]);
    }},
    '5.4': {namn: 'Lägesmått', gen() {
      const fem = blanda([...Array(20)].map((_, i) => i + 1)).slice(0, 5);
      const sort = fem.slice().sort((a, b) => a - b);
      let medel; do { medel = [...Array(4)].map(() => r(1, 20)); medel.push(5 * r(6, 12) - medel.reduce((a, b) => a + b, 0)); } while (medel[4] < 0 || medel[4] > 30);
      const typ = fem.slice(); typ.push(fem[0]);
      return val([
        {q: `Vad är medianen av talen ${fem.join(', ')}?`, svar: sort[2], ledtrad: 'Sortera talen i storleksordning. Medianen är talet i mitten.'},
        {q: `Vad är medelvärdet av talen ${medel.join(', ')}?`, svar: medel.reduce((a, b) => a + b, 0) / 5, ledtrad: 'Addera alla talen och dela med antalet tal, alltså 5.'},
        {q: `Vad är typvärdet av talen ${blanda(typ).join(', ')}?`, svar: fem[0], ledtrad: 'Typvärdet är det tal som förekommer flest gånger.'},
        {q: `Vad är variationsbredden för talen ${fem.join(', ')}?`, svar: sort[4] - sort[0], ledtrad: 'Variationsbredd = största talet − minsta talet.'}]);
    }},
    '5.5': {namn: 'Lägesmått från tabeller och diagram', gen() {
      const f = [0, 1, 2, 3, 4].map(() => r(1, 7)); f[r(0, 4)] += 4;
      if (f.reduce((a, b) => a + b, 0) % 2 === 0) f[r(0, 4)] += 1;
      const n = f.reduce((a, b) => a + b, 0), max = Math.max(...f);
      if (f.filter(x => x === max).length > 1) f[f.indexOf(max)] += 1;
      const N = f.reduce((a, b) => a + b, 0), lista = f.flatMap((x, i) => Array(x).fill(i));
      const tab = `<table class="tab"><tr><th>Antal syskon</th>${f.map((_, i) => `<th>${i}</th>`).join('')}</tr><tr><th>Antal elever</th>${f.map(x => `<td>${x}</td>`).join('')}</tr></table>`;
      const intro = 'Tabellen visar hur många syskon eleverna i en klass har.';
      const minst2 = f[2] + f[3] + f[4];
      return val([
        {q: `${intro}${tab}Hur många elever finns det i klassen?`, svar: N, ledtrad: 'Addera antalet elever i alla kolumner.'},
        {q: `${intro}${tab}Vad är typvärdet för antal syskon?`, svar: f.indexOf(Math.max(...f)), ledtrad: 'Typvärdet är det antal syskon som flest elever har.'},
        {q: `${intro}${tab}Hur många elever har minst 2 syskon?`, svar: minst2, ledtrad: 'Minst 2 betyder 2, 3 eller 4 syskon. Addera de kolumnerna.'},
        {q: `${intro}${tab}Vad är medianen för antal syskon?`, svar: N % 2 ? lista[(N - 1) / 2] : (lista[N / 2 - 1] + lista[N / 2]) / 2, ledtrad: `Det finns ${N} elever. Räkna fram till eleven i mitten.`}]);
    }},
    '5.6': {namn: 'Cirkeldiagram', gen() {
      const p = val([5, 10, 20, 25, 30, 40, 50, 75]), deg = val([18, 36, 54, 72, 90, 108, 180]);
      const [n, k] = val([[20, r(1, 19)], [30, r(1, 29)], [40, r(1, 39)], [60, r(1, 59)]]);
      return val([
        {q: `En sektor i ett cirkeldiagram är ${p} % av cirkeln. Hur många grader är sektorn?`, svar: p * 3.6, ledtrad: 'Hela cirkeln är 360°. 10 % av cirkeln är 36°.'},
        {q: `En sektor i ett cirkeldiagram är ${deg}°. Hur många procent av cirkeln är det?`, svar: deg / 3.6, ledtrad: `Andelen är ${deg}/360. 36° är 10 %.`},
        {q: `Av ${n} elever valde ${k} fotboll som favoritsport. Hur många grader blir fotbollssektorn i ett cirkeldiagram?`, svar: k * 360 / n, ledtrad: `Andelen är ${k}/${n}. Varje elev motsvarar ${360 / n}°.`}]);
    }},
  },
  begrepp: [
    ['Sannolikhet', 'Hur troligt det är att något inträffar'],
    ['Utfall', 'Ett möjligt resultat av ett slumpförsök'],
    ['Gynnsamt utfall', 'Ett utfall som är det man söker'],
    ['Slumpförsök', 'Ett försök där resultatet inte går att förutsäga'],
    ['Frekvens', 'Hur många gånger något förekommer'],
    ['Relativ frekvens', 'Frekvensen delat med det totala antalet'],
    ['Medelvärde', 'Summan av värdena delat med antalet värden'],
    ['Median', 'Värdet i mitten när värdena är sorterade'],
    ['Typvärde', 'Det värde som förekommer flest gånger'],
    ['Variationsbredd', 'Största värdet minus minsta värdet'],
    ['Lägesmått', 'Samlingsnamn för medelvärde, median och typvärde'],
    ['Stapeldiagram', 'Diagram där staplarnas höjd visar antalet'],
    ['Cirkeldiagram', 'Diagram där sektorer visar andelar av en helhet'],
    ['Sektor', 'En ”tårtbit” i ett cirkeldiagram'],
    ['Linjediagram', 'Diagram som visar hur något förändras över tid'],
    ['Frekvenstabell', 'Tabell som visar hur många gånger varje värde förekommer'],
  ],
  quiz: [
    ['Du kastar en tärning. Vad är sannolikheten att få en fyra?', ['1/6', '1/4', '4/6', '1/2'], 'Ett gynnsamt utfall av sex möjliga.'],
    ['I en påse finns 3 röda och 7 gröna kulor. Vad är sannolikheten att dra en röd?', ['3/10', '3/7', '7/10', '1/3'], '3 gynnsamma av 10 möjliga.'],
    ['Vad är medianen av 2, 9, 4, 7, 5?', ['5', '4', '7', '5,4'], 'Sortera: 2, 4, 5, 7, 9. Talet i mitten är 5.'],
    ['Vad är medelvärdet av 4, 6, 8, 10?', ['7', '6', '8', '28'], 'Summan är 28. 28 / 4 = 7.'],
    ['Vad är typvärdet av 3, 5, 5, 6, 8, 5, 3?', ['5', '3', '6', '8'], '5 förekommer tre gånger, oftast av alla.'],
    ['Vad är variationsbredden för 12, 4, 9, 15, 7?', ['11', '15', '4', '8'], '15 − 4 = 11.'],
    ['Ett mynt singlas 40 gånger och visar krona 18 gånger. Vad är den relativa frekvensen för krona?', ['45 %', '18 %', '40 %', '50 %'], '18/40 = 0,45 = 45 %.'],
    ['Hur många grader är hela cirkeln i ett cirkeldiagram?', ['360°', '180°', '100°', '90°'], 'Ett helt varv är 360°.'],
    ['En sektor är 25 % av cirkeln. Hur många grader är det?', ['90°', '25°', '45°', '120°'], '25 % av 360° är 90°.'],
    ['Vilket diagram visar bäst hur temperaturen ändras under en vecka?', ['Linjediagram', 'Cirkeldiagram', 'Frekvenstabell', 'Inget diagram'], 'Ett linjediagram visar förändring över tid.'],
    ['Sannolikheten för regn är 30 %. Vad är sannolikheten att det inte regnar?', ['70 %', '30 %', '60 %', '130 %'], '100 % − 30 % = 70 %.'],
    ['Vilket värde kan en sannolikhet INTE ha?', ['1,5', '0', '0,5', '1'], 'En sannolikhet ligger alltid mellan 0 och 1, alltså mellan 0 % och 100 %.'],
    ['Vad är medianen av 3, 8, 10, 12?', ['9', '8', '10', '8,25'], 'Det finns två tal i mitten: (8 + 10) / 2 = 9.'],
    ['Av 20 elever valde 5 basket. Hur många grader blir basket i ett cirkeldiagram?', ['90°', '5°', '25°', '72°'], '5/20 = 25 %, och 25 % av 360° = 90°.'],
    ['Vilket lägesmått påverkas mest av ett mycket högt värde?', ['Medelvärdet', 'Medianen', 'Typvärdet', 'Inget av dem'], 'Ett extremt värde ändrar summan och därmed medelvärdet.'],
  ],
  fyll: [
    ['Det värde som förekommer flest gånger kallas ___.', ['typvärde', 'typvärdet'], 'Typvärdet är det vanligaste värdet.'],
    ['Värdet i mitten när talen är sorterade kallas ___.', ['median', 'medianen'], 'Medianen delar talen i två lika stora halvor.'],
    ['Medelvärdet av 2, 4 och 9 är ___', ['5'], '(2 + 4 + 9) / 3 = 15 / 3 = 5.'],
    ['Medianen av 1, 3, 8, 9, 12 är ___', ['8'], 'Talet i mitten är 8.'],
    ['Variationsbredden för 5, 11, 2, 8 är ___', ['9'], '11 − 2 = 9.'],
    ['Sannolikheten att få krona när man singlar slant är ___ %.', ['50'], 'Ett av två lika troliga utfall.'],
    ['I en påse finns 2 blå och 6 gula kulor. Sannolikheten att få blå är ___/8.', ['2'], 'Det finns 2 blå av totalt 8 kulor.'],
    ['En tärning kastas 50 gånger och visar sexa 10 gånger. Den relativa frekvensen är ___ %.', ['20'], '10/50 = 20/100 = 20 %.'],
    ['En sektor på 180° är ___ % av cirkeln.', ['50'], '180° är halva cirkeln.'],
    ['10 % av en cirkel är ___°.', ['36'], '360 / 10 = 36.'],
    ['Ett möjligt resultat av ett slumpförsök kallas ett ___.', ['utfall'], 'När du kastar en tärning finns sex möjliga utfall.'],
    ['Medelvärde = summan delat med ___.', ['antalet', 'antal', 'antalet värden', 'antalet tal'], 'Dela summan med hur många värden det är.'],
    ['Sannolikheten 1/4 är ___ %.', ['25'], '1/4 = 25/100.'],
    ['Hur många gånger något förekommer kallas ___.', ['frekvens', 'frekvensen'], 'Frekvens betyder hur ofta.'],
    ['Typvärdet av 7, 2, 7, 4, 2, 7 är ___', ['7'], '7 förekommer tre gånger.'],
  ]},
});
