// Träningsövningar med slumpade tal. Varje generator ger {q, svar, ledtrad}.
// svar är ett tal (eller bråk som "a/b"); elevens svar rättas numeriskt.
(function () {
  const r = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const val = a => a[r(0, a.length - 1)];
  const sv = x => String(Math.round(x * 1e6) / 1e6).replace('.', ',');
  const tus = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const sgn = n => n < 0 ? '(' + sv(n) + ')' : sv(n);

  const AVSNITT = {
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
  };

  const tal = s => {
    s = String(s).trim().replace(/\s/g, '').replace(',', '.').replace('−', '-');
    if (/^-?\d+\/\d+$/.test(s)) { const [a, b] = s.split('/'); return +b ? a / b : NaN; }
    return s === '' ? NaN : Number(s);
  };

  const el = document.getElementById('trana');
  const BEGREPP = [
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
  ];
  const blanda = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = r(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // Quiz: [fråga, [rätt svar, fel, fel, fel], förklaring]
  const QUIZ = [
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
  ];
  // Fyll i svaret: [mening med ___, [godkända svar], förklaring]
  const FYLL = [
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
  ];
  const lika = (g, svar) => svar.some(a => {
    const x = tal(g), y = tal(a);
    if (!isNaN(x) && !isNaN(y)) return Math.abs(x - y) < 1e-9;
    return g.trim().toLowerCase().replace(/[.\s-]+$/, '').replace(/\s+/g, ' ') === a.toLowerCase().replace(/-$/, '');
  });
  const RUNDA_Q = 10;
  function slut(ratt, n, igen, rubrik) {
    const m = ratt >= n * .9 ? 'Fantastiskt! 🏆' : ratt >= n * .6 ? 'Bra jobbat! 🌟' : 'Bra kämpat! Träna en gång till så går det ännu bättre. 💪';
    el.innerHTML = `<div class="kort-t"><p class="fraga">${m}</p><p>Du fick ${ratt} av ${n} rätt${rubrik}.</p>
      <button class="knapp2" data-a="om">Träna igen</button> <a class="knapp2 sek" href="trana.html">Andra övningar</a></div>`;
    el.querySelector('[data-a=om]').onclick = igen;
  }
  function quiz() {
    const fr = blanda(QUIZ).slice(0, RUNDA_Q); let i = 0, ratt = 0;
    (function visa() {
      if (i === fr.length) return slut(ratt, fr.length, quiz, '');
      const [q, alt, forkl] = fr[i++];
      el.innerHTML = `<div class="kort-t"><div class="topp"><span>❓ Quiz</span><span>Fråga ${i} av ${fr.length} · ⭐ ${ratt}</span></div>
        <div class="bar"><i style="width:${(i - 1) / fr.length * 100}%"></i></div>
        <p class="fraga">${q}</p><div class="alt">${blanda(alt).map(a => `<button class="mb">${a}</button>`).join('')}</div>
        <p class="fb" aria-live="polite"></p></div>`;
      const fb = el.querySelector('.fb');
      el.querySelectorAll('.alt .mb').forEach(b => b.onclick = () => {
        const ok = b.textContent === alt[0];
        if (ok) ratt++;
        el.querySelectorAll('.alt .mb').forEach(x => { x.disabled = true; if (x.textContent === alt[0]) x.classList.add('par'); });
        if (!ok) b.classList.add('fel', 'kvar');
        fb.className = 'fb ' + (ok ? 'ok' : 'nej');
        fb.innerHTML = `${ok ? val(['Rätt! 🎉', 'Snyggt! ✅', 'Precis! 👏']) : 'Inte riktigt.'} <span class="forkl">${forkl}</span> <button class="lank" type="button">Nästa →</button>`;
        fb.querySelector('button').onclick = visa; fb.querySelector('button').focus();
      });
    })();
  }
  function fyll() {
    const fr = blanda(FYLL).slice(0, RUNDA_Q); let i = 0, ratt = 0;
    (function visa() {
      if (i === fr.length) return slut(ratt, fr.length, fyll, ' på första försöket');
      const [q, svar, forkl] = fr[i++]; let fel = 0;
      const ord = isNaN(tal(svar[0]));
      el.innerHTML = `<div class="kort-t"><div class="topp"><span>✏️ Fyll i svaret</span><span>Uppgift ${i} av ${fr.length} · ⭐ ${ratt}</span></div>
        <div class="bar"><i style="width:${(i - 1) / fr.length * 100}%"></i></div>
        <p class="fraga">${q.replace('___', '<span class="lucka">?</span>')}</p>
        <form><input ${ord ? 'inputmode="text" autocapitalize="off"' : 'inputmode="decimal"'} autocomplete="off" spellcheck="false" aria-label="Ditt svar" placeholder="${ord ? 'Skriv ordet' : 'Ditt svar'}"><button>Svara</button></form>
        <p class="fb" aria-live="polite"></p></div>`;
      const inp = el.querySelector('input'), fb = el.querySelector('.fb'), lucka = el.querySelector('.lucka');
      inp.focus();
      el.querySelector('form').onsubmit = e => {
        e.preventDefault();
        if (inp.disabled) return;
        if (!inp.value.trim()) { fb.className = 'fb'; fb.textContent = 'Skriv ett svar först.'; return; }
        if (lika(inp.value, svar)) {
          if (!fel) ratt++;
          lucka.textContent = svar[0]; lucka.classList.add('fylld');
          fb.className = 'fb ok'; fb.textContent = val(['Rätt! 🎉', 'Snyggt! ✅', 'Precis! 👏', 'Helt rätt! 💪']);
          inp.disabled = true; setTimeout(visa, 1100);
        } else if (++fel < 2) {
          fb.className = 'fb nej'; fb.textContent = 'Inte riktigt. Försök en gång till!'; inp.select();
        } else {
          inp.disabled = true; lucka.textContent = svar[0]; lucka.classList.add('fylld');
          fb.className = 'fb nej';
          fb.innerHTML = `Rätt svar är <b>${svar[0]}</b>. ${forkl} <button class="lank" type="button">Nästa →</button>`;
          fb.querySelector('button').onclick = visa; fb.querySelector('button').focus();
        }
      };
    })();
  }
  const PAR = 6;
  function matcha() {
    const par = blanda(BEGREPP).slice(0, PAR);
    let forsok = 0, klara = 0, vald = null;
    const knapp = (i, t, sida) => `<button class="mb" data-i="${i}" data-s="${sida}">${t}</button>`;
    el.innerHTML = `<div class="kort-t match-kort"><div class="topp"><span>🧩 Matcha begrepp</span><span class="stat">Par 0 av ${PAR}</span></div>
      <p>Klicka på ett begrepp och sedan på förklaringen som hör ihop med det.</p>
      <div class="match"><div>${par.map((p, i) => knapp(i, p[0], 'b')).join('')}</div><div>${blanda(par.map((p, i) => [i, p[1]])).map(([i, t]) => knapp(i, t, 'f')).join('')}</div></div>
      <p class="fb" aria-live="polite"></p></div>`;
    const fb = el.querySelector('.fb'), stat = el.querySelector('.stat');
    el.querySelectorAll('.mb').forEach(b => b.onclick = () => {
      if (b.disabled) return;
      if (!vald || vald.dataset.s === b.dataset.s) { if (vald) vald.classList.remove('vald'); vald = b; b.classList.add('vald'); return; }
      forsok++;
      const a = vald; vald = null; a.classList.remove('vald');
      if (a.dataset.i === b.dataset.i) {
        [a, b].forEach(x => { x.classList.add('par'); x.disabled = true; });
        klara++; stat.textContent = `Par ${klara} av ${PAR}`;
        fb.className = 'fb ok'; fb.textContent = val(['Rätt! 🎉', 'Snyggt! ✅', 'Precis! 👏']);
        if (klara === PAR) setTimeout(() => {
          const m = forsok === PAR ? 'Felfritt! 🏆' : forsok <= PAR + 3 ? 'Bra jobbat! 🌟' : 'Bra kämpat! 💪';
          el.innerHTML = `<div class="kort-t"><p class="fraga">${m}</p><p>Du hittade alla ${PAR} par på ${forsok} försök.</p>
            <button class="knapp2" data-a="om">Nya begrepp</button> <a class="knapp2 sek" href="trana.html">Andra övningar</a></div>`;
          el.querySelector('[data-a=om]').onclick = matcha;
        }, 900);
      } else {
        [a, b].forEach(x => { x.classList.add('fel'); setTimeout(() => x.classList.remove('fel'), 600); });
        fb.className = 'fb nej'; fb.textContent = 'De hör inte ihop. Försök igen!';
      }
    });
  }

  const RUNDA = 10;
  let avs = null, nr = 0, ratt = 0, svit = 0, fraga = null, fel = 0;

  function meny() {
    el.innerHTML = '<p class="ingress">Välj ett avsnitt. Du får ' + RUNDA + ' uppgifter med nya tal varje gång.</p><div class="valj">' +
      Object.entries(AVSNITT).map(([k, a]) => `<button data-k="${k}"><b>${k}</b>${a.namn}</button>`).join('') + '</div>';
    el.querySelectorAll('button[data-k]').forEach(b => b.onclick = () => start(b.dataset.k));
  }
  function start(k) { avs = k; nr = 0; ratt = 0; svit = 0; ny(); }
  function ny() {
    if (nr === RUNDA) return klar();
    nr++; fel = 0; fraga = AVSNITT[avs].gen.call({});
    el.innerHTML = `<div class="kort-t"><div class="topp"><span>${avs} ${AVSNITT[avs].namn}</span><span>Uppgift ${nr} av ${RUNDA} · ⭐ ${ratt}${svit >= 3 ? ' · 🔥 ' + svit + ' i rad' : ''}</span></div>
      <div class="bar"><i style="width:${(nr - 1) / RUNDA * 100}%"></i></div>
      <p class="fraga">${fraga.q}</p>
      <form><input inputmode="decimal" autocomplete="off" aria-label="Ditt svar" placeholder="Ditt svar"><button>Svara</button></form>
      <p class="fb" aria-live="polite"></p><button class="lank tips" type="button">Visa ledtråd</button></div>`;
    const inp = el.querySelector('input'), fb = el.querySelector('.fb');
    inp.focus();
    el.querySelector('.tips').onclick = () => { fb.className = 'fb tipsrad'; fb.textContent = '💡 ' + fraga.ledtrad; };
    el.querySelector('form').onsubmit = e => {
      e.preventDefault();
      const g = tal(inp.value), f = tal(fraga.svar);
      if (isNaN(g)) { fb.className = 'fb'; fb.textContent = 'Skriv ett tal, till exempel 12 eller 0,5.'; return; }
      if (Math.abs(g - f) < 1e-9) {
        if (!fel) { ratt++; svit++; } else svit = 0;
        fb.className = 'fb ok'; fb.textContent = val(['Rätt! 🎉', 'Snyggt! ✅', 'Precis! 👏', 'Helt rätt! 💪']);
        inp.disabled = true; setTimeout(ny, 900);
      } else if (++fel < 2) {
        fb.className = 'fb nej'; fb.textContent = 'Inte riktigt. Försök en gång till! 💡 ' + fraga.ledtrad;
        inp.select();
      } else {
        svit = 0; fb.className = 'fb nej'; inp.disabled = true;
        fb.innerHTML = `Rätt svar är <b>${String(fraga.svar).replace('.', ',')}</b>. ${fraga.ledtrad} <button class="lank" type="button">Nästa →</button>`;
        fb.querySelector('button').onclick = ny;
      }
    };
  }
  function klar() {
    const m = ratt >= 9 ? 'Fantastiskt! 🏆' : ratt >= 6 ? 'Bra jobbat! 🌟' : 'Bra kämpat! Träna en gång till så går det ännu bättre. 💪';
    el.innerHTML = `<div class="kort-t klar"><p class="fraga">${m}</p><p>Du fick ${ratt} av ${RUNDA} rätt på första försöket.</p>
      <button class="knapp2" data-a="om">Träna igen</button> <button class="knapp2 sek" data-a="meny">Välj annat avsnitt</button></div>`;
    el.querySelector('[data-a=om]').onclick = () => start(avs);
    el.querySelector('[data-a=meny]').onclick = meny;
  }
  ({begrepp: matcha, quiz, fyll}[el.dataset.lage] || meny)();
})();
