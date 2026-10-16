// Träningsövningar med slumpade tal. Varje generator ger {q, svar, ledtrad}.
// svar är ett tal (eller bråk som "a/b"); elevens svar rättas numeriskt.
(function () {
  const r = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const val = a => a[r(0, a.length - 1)];
  const sv = x => String(Math.round(x * 1e6) / 1e6).replace('.', ',');
  const tus = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const sgn = n => n < 0 ? '(' + sv(n) + ')' : sv(n);


  const tal = s => {
    s = String(s).trim().replace(/\s/g, '').replace(',', '.').replace('−', '-');
    if (/^-?\d+\/\d+$/.test(s)) { const [a, b] = s.split('/'); return +b ? a / b : NaN; }
    return s === '' ? NaN : Number(s);
  };

  const el = document.getElementById('trana');
  if (!el) return;
  const ALLA = TRANA_DATA({r, val, sv, tus, sgn, blanda: a => blanda(a)});
  const kap = ALLA[new URLSearchParams(location.search).get('kap')] ? new URLSearchParams(location.search).get('kap') : '1';
  const D = ALLA[kap], AVSNITT = D.avsnitt, BEGREPP = D.begrepp, QUIZ = D.quiz, FYLL = D.fyll, EX = D.exempel || [], DRA = D.dra || [];
  const rub = document.getElementById('kaprubrik');
  if (rub) rub.innerHTML = `Kapitel ${kap} <span style="font-weight:500;opacity:.7">${D.namn}</span>`;
  const TILLBAKA = 'trana.html#kap' + kap;
  document.querySelectorAll('a[href="trana.html"]').forEach(a => a.href = TILLBAKA);
  const blanda = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = r(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  const lika = (g, svar) => svar.some(a => {
    const x = tal(g), y = tal(a);
    if (!isNaN(x) && !isNaN(y)) return Math.abs(x - y) < 1e-9;
    return g.trim().toLowerCase().replace(/[.\s-]+$/, '').replace(/\s+/g, ' ') === a.toLowerCase().replace(/-$/, '');
  });
  const RUNDA_Q = 10;
  function slut(ratt, n, igen, rubrik) {
    const m = ratt >= n * .9 ? 'Fantastiskt! 🏆' : ratt >= n * .6 ? 'Bra jobbat! 🌟' : 'Bra kämpat! Träna en gång till så går det ännu bättre. 💪';
    el.innerHTML = `<div class="kort-t"><p class="fraga">${m}</p><p>Du fick ${ratt} av ${n} rätt${rubrik}.</p>
      <button class="knapp2" data-a="om">Träna igen</button> <a class="knapp2 sek" href="${TILLBAKA}">Andra övningar</a></div>`;
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

  const andra = (lista, svar, n) => blanda([...new Set(lista.filter(x => x !== svar))]).slice(0, n);
  function exempel() {
    const fr = blanda(EX).slice(0, RUNDA_Q); let i = 0, ratt = 0;
    (function visa() {
      if (i === fr.length) return slut(ratt, fr.length, exempel, ' på första försöket');
      const [ex, svar, forkl, fraga] = fr[i++]; let fel = 0;
      const alt = blanda([svar, ...andra(EX.map(e => e[1]), svar, 3)]);
      el.innerHTML = `<div class="kort-t"><div class="topp"><span>🔍 Från exempel till ord</span><span>Uppgift ${i} av ${fr.length} · ⭐ ${ratt}</span></div>
        <div class="bar"><i style="width:${(i - 1) / fr.length * 100}%"></i></div>
        <div class="exempel">${ex}</div><p class="fraga liten">${fraga || 'Vad kallas det markerade?'}</p>
        <div class="alt">${alt.map(a => `<button class="mb">${a}</button>`).join('')}</div>
        <p class="fb" aria-live="polite"></p></div>`;
      const fb = el.querySelector('.fb');
      el.querySelectorAll('.alt .mb').forEach(b => b.onclick = () => {
        if (b.textContent === svar) {
          if (!fel) ratt++;
          el.querySelectorAll('.alt .mb').forEach(x => x.disabled = true); b.classList.add('par');
          fb.className = 'fb ok';
          fb.innerHTML = `${val(['Rätt! 🎉', 'Snyggt! ✅', 'Precis! 👏'])} <span class="forkl">${forkl}</span> <button class="lank" type="button">Nästa →</button>`;
          fb.querySelector('button').onclick = visa; fb.querySelector('button').focus();
        } else {
          fel++; b.disabled = true; b.classList.add('fel', 'kvar');
          fb.className = 'fb nej'; fb.textContent = 'Inte rätt ord. Försök igen!';
        }
      });
    })();
  }
  function dra() {
    const fr = blanda(DRA).slice(0, RUNDA_Q); let i = 0, ratt = 0;
    (function visa() {
      if (i === fr.length) return slut(ratt, fr.length, dra, ' på första försöket');
      const [q, svar] = fr[i++]; let fel = 0, drar = null, klar = false;
      const ord = blanda([svar, ...andra(DRA.map(d => d[1]), svar, 3)]);
      el.innerHTML = `<div class="kort-t"><div class="topp"><span>🧲 Dra ordet till rätt lucka</span><span>Mening ${i} av ${fr.length} · ⭐ ${ratt}</span></div>
        <div class="bar"><i style="width:${(i - 1) / fr.length * 100}%"></i></div>
        <div class="fraga mening">${q.replace('___', '<span class="lucka drop"></span>')}</div>
        <p class="hj">Dra ordet till luckan, eller tryck på ordet.</p>
        <div class="ordbank">${ord.map(o => `<button class="ordk" draggable="true">${o}</button>`).join('')}</div>
        <p class="fb" aria-live="polite"></p></div>`;
      const lucka = el.querySelector('.drop'), fb = el.querySelector('.fb');
      const prova = b => {
        if (b.disabled || klar) return;
        if (b.textContent === svar) {
          klar = true; if (!fel) ratt++;
          lucka.textContent = svar; lucka.classList.add('fylld'); b.classList.add('par');
          el.querySelectorAll('.ordk').forEach(x => x.disabled = true);
          fb.className = 'fb ok'; fb.textContent = val(['Rätt! 🎉', 'Snyggt! ✅', 'Precis! 👏', 'Helt rätt! 💪']);
          setTimeout(visa, 1300);
        } else {
          fel++; b.disabled = true; b.classList.add('fel');
          fb.className = 'fb nej'; fb.textContent = `”${b.textContent}” passar inte här. Försök igen!`;
        }
      };
      el.querySelectorAll('.ordk').forEach(b => {
        b.onclick = () => prova(b);
        b.ondragstart = e => { drar = b; e.dataTransfer.setData('text/plain', b.textContent); };
      });
      lucka.ondragover = e => { e.preventDefault(); lucka.classList.add('over'); };
      lucka.ondragleave = () => lucka.classList.remove('over');
      lucka.ondrop = e => { e.preventDefault(); lucka.classList.remove('over'); if (drar) prova(drar); };
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
            <button class="knapp2" data-a="om">Nya begrepp</button> <a class="knapp2 sek" href="${TILLBAKA}">Andra övningar</a></div>`;
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
      <div class="fraga">${fraga.q}</div>
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
  ({begrepp: matcha, quiz, fyll, exempel, dra}[el.dataset.lage] || meny)();
})();
