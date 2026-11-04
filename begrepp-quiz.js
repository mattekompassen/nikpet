// Begreppsquiz i klassrummet (begrepp-quiz.html). Frågor per kapitel i QUIZ_DATA.
// Rätt svar står alltid först i 'a'; ordningen blandas när quizet startar.
// 'ord' = bokens begrepp (BG_BOK) vars förklaring visas efter svaret.
var QUIZ_DATA = {
  '7-1': { titel: 'Åk 7 · Kapitel 1 Tal', fragor: [
    { q: 'Vilket tal är ett primtal?', a: ['13', '9', '15', '21'], ord: 'Primtal' },
    { q: 'Vad kallas talen 0, 1, 2, 3, 4, …?', a: ['Naturliga tal', 'Negativa tal', 'Udda tal', 'Blandad form'], ord: 'Naturliga tal' },
    { q: 'Vilket tal är ett udda tal?', a: ['–7', '14', '0', '–20'], ord: 'Udda tal' },
    { q: 'Vilket påstående om talet 0 stämmer?', a: ['0 är ett jämnt tal', '0 är ett udda tal', '0 är ett negativt tal', '0 är ett primtal'], ord: 'Jämna tal' },
    { q: '6 · 3 = 18<br><small>Vilket räknesätt är det?</small>', a: ['Multiplikation', 'Addition', 'Subtraktion', 'Division'], ord: 'Multiplikation' },
    { q: 'Vilket räknesätt används när man vill veta hur många gånger ett tal ryms i ett annat?', a: ['Division', 'Multiplikation', 'Addition', 'Subtraktion'], ord: 'Division' },
    { q: '4 327 = 4 000 + 300 + 20 + 7<br><small>Hur är talet skrivet till höger?</small>', a: ['I utvecklad form', 'I blandad form', 'I bråkform', 'I decimalform'], ord: 'Utvecklad form' },
    { q: 'Vilket tal är skrivet i blandad form?', a: ['2<span class="fr"><i>1</i><i>2</i></span>', '<span class="fr"><i>5</i><i>2</i></span>', '2,5', '25'], ord: 'Blandad form' },
    { q: 'Vilket tal är skrivet i decimalform?', a: ['1,75', '<span class="fr"><i>7</i><i>4</i></span>', '1<span class="fr"><i>3</i><i>4</i></span>', '<span class="fr"><i>175</i><i>100</i></span>'], ord: 'Decimalform' },
    { q: 'Vad betyder <i>x</i> &gt; 0?', a: ['<i>x</i> är större än 0', '<i>x</i> är mindre än 0', '<i>x</i> är lika med 0', '<i>x</i> är inte lika med 0'], ord: 'Olikhetstecken' },
    { q: 'Vilket tecken betyder ”är inte lika med”?', a: ['≠', '&lt;', '&gt;', '≈'], ord: 'Olikhetstecken' },
    { q: '30 / 4 = 7,5<br><small>Vad visar det?</small>', a: ['30 är inte delbart med 4', '30 är delbart med 4', '7,5 är ett heltal', '4 är ett udda tal'], ord: 'Delbarhet' },
    { q: 'Vilket tal är ett negativt tal?', a: ['–2,5', '2,5', '0', '<span class="fr"><i>1</i><i>2</i></span>'], ord: 'Negativa tal' },
    { q: 'Vilket påstående stämmer?', a: ['Alla hela tal är rationella tal', 'Talet 1 är ett primtal', 'Negativa tal är större än noll', 'Alla primtal är udda'], ord: 'Rationella tal' },
    { q: 'I talet 3 582, vilket värde har siffran 5?', a: ['500', '50', '5', '5 000'], ord: 'Positionssystemet' },
    { q: '4,7 ≈ 5<br><small>Vad har man gjort?</small>', a: ['Avrundat', 'Adderat', 'Skrivit i utvecklad form', 'Dividerat'], ord: 'Avrundning' },
    { q: '9,2 ≈ 9<br><small>Vad kallas talet 9 här?</small>', a: ['Ett närmevärde', 'Ett primtal', 'Ett negativt tal', 'Ett tal i bråkform'], ord: 'Närmevärde' },
    { q: '4,7 + 9,2 ≈ 5 + 9 = 14<br><small>Vad kallas det här sättet att räkna?</small>', a: ['Överslagsräkning', 'Utvecklad form', 'Positionssystemet', 'Division'], ord: 'Överslagsräkning' }
  ] }
};

(function () {
  var rot = document.getElementById('kq');
  if (!rot) return;
  var FARG = [['A', 'kq-r'], ['B', 'kq-b'], ['C', 'kq-g'], ['D', 'kq-gr']];
  var inst = { kap: '7-1', tid: 20, ljud: true };
  var spel, timer, ac;

  function besk(ord) {
    var b = (window.BG_BOK || []).filter(function (x) { return x.ord === ord; })[0];
    return b ? b.besk.replace(/\n/g, ' ') : '';
  }
  function blanda(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pip(f, d) {
    if (!inst.ljud) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      var o = ac.createOscillator(), g = ac.createGain();
      o.frequency.value = f; o.connect(g); g.connect(ac.destination);
      g.gain.setValueAtTime(.12, ac.currentTime); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + d);
      o.start(); o.stop(ac.currentTime + d);
    } catch (e) {}
  }
  function val(namn, alt, nu) {
    return '<div class="kq-val"><b>' + namn + '</b><div>' + alt.map(function (x) {
      return '<button type="button" data-v="' + x[0] + '" class="' + (String(x[0]) === String(nu) ? 'on' : '') + '">' + x[1] + '</button>';
    }).join('') + '</div></div>';
  }

  function start() {
    clearInterval(timer);
    var d = QUIZ_DATA[inst.kap];
    rot.innerHTML = '<div class="kq-start"><div class="kq-logo">?</div><h2>Begreppsquiz</h2><p class="kq-kap">' + d.titel + ' · ' + d.fragor.length + ' frågor</p>'
      + val('Tid per fråga', [[10, '10 s'], [20, '20 s'], [30, '30 s'], [0, 'Ingen tid']], inst.tid)
      + val('Ljud', [[1, 'På'], [0, 'Av']], inst.ljud ? 1 : 0)
      + '<button type="button" class="kq-go">Starta quizet ▶</button>'
      + '<p class="kq-tips">Tips: visa quizet på tavlan i helskärm. Klassen svarar tillsammans: klicka på svaret och få poäng efter hur snabbt ni svarar.</p></div>';
    var grupper = rot.querySelectorAll('.kq-val');
    [['tid'], ['ljud']].forEach(function (k, i) {
      grupper[i].querySelectorAll('button').forEach(function (b) {
        b.onclick = function () {
          var v = +b.dataset.v; if (k[0] === 'ljud') inst.ljud = !!v; else inst[k[0]] = v;
          grupper[i].querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
        };
      });
    });
    rot.querySelector('.kq-go').onclick = function () {
      spel = { fragor: blanda(d.fragor), i: 0, poang: 0, ratt: 0, svit: 0 };
      fraga();
    };
  }

  function huvud() {
    return '<div class="kq-top"><span>Fråga ' + (spel.i + 1) + ' av ' + spel.fragor.length + '</span>'
      + '<span class="kq-p">' + spel.poang + ' poäng</span>'
      + '<button type="button" class="kq-hel" title="Helskärm">⛶ Helskärm</button></div>';
  }

  function fraga() {
    var f = spel.fragor[spel.i];
    var alt = blanda(f.a.map(function (t, i) { return { t: t, r: i === 0 }; }));
    var kvar = inst.tid, t0 = Date.now(), klar = false;
    rot.innerHTML = huvud() + '<div class="kq-fraga"><div class="kq-q">' + f.q + '</div>'
      + (inst.tid ? '<div class="kq-klocka"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" class="kq-bg"/><circle cx="22" cy="22" r="19" class="kq-fg"/></svg><span>' + kvar + '</span></div>' : '')
      + '</div><div class="kq-svar">' + alt.map(function (x, i) {
        return '<button type="button" class="kq-alt ' + FARG[i][1] + '" data-i="' + i + '"><span class="kq-bok">' + FARG[i][0] + '</span><span class="kq-t">' + x.t + '</span></button>';
      }).join('') + '</div><div class="kq-under"><button type="button" class="kq-visa">Visa svaret</button></div>';
    rot.querySelector('.kq-hel').onclick = helskarm;
    var fg = rot.querySelector('.kq-fg'), sp = rot.querySelector('.kq-klocka span');
    if (inst.tid) {
      timer = setInterval(function () {
        var gatt = (Date.now() - t0) / 1000, k = Math.max(0, Math.ceil(inst.tid - gatt));
        fg.style.strokeDashoffset = 119.4 * Math.min(1, gatt / inst.tid);
        if (k !== kvar) { kvar = k; sp.textContent = k; if (k <= 5 && k > 0) pip(660, .12); }
        if (gatt >= inst.tid) visa(null);
      }, 100);
    }
    function visa(valt) {
      if (klar) return; klar = true; clearInterval(timer);
      var tid = (Date.now() - t0) / 1000, ratt = valt !== null && alt[valt].r;
      rot.querySelectorAll('.kq-alt').forEach(function (b, i) {
        b.disabled = true;
        b.classList.add(alt[i].r ? 'kq-ratt' : 'kq-fel');
        if (i === valt) b.classList.add('kq-vald');
      });
      var ut = '';
      if (valt !== null) {
        if (ratt) {
          spel.svit++; spel.ratt++;
          var p = inst.tid ? Math.round(1000 * (1 - Math.min(1, tid / inst.tid) / 2)) : 1000;
          var bonus = spel.svit >= 3 ? 100 : 0;
          spel.poang += p + bonus;
          var pp = rot.querySelector('.kq-p'); if (pp) pp.textContent = spel.poang + ' poäng';
          ut = '<div class="kq-resultat ok">✔ Rätt! +' + p + (bonus ? ' <small>(+100 för ' + spel.svit + ' rätt i rad)</small>' : '') + '</div>';
          pip(880, .25); setTimeout(function () { pip(1175, .3); }, 120);
        } else { spel.svit = 0; ut = '<div class="kq-resultat nej">✘ Inte rätt den här gången</div>'; pip(220, .4); }
      } else { spel.svit = 0; ut = '<div class="kq-resultat nej">⏰ Tiden är slut</div>'; pip(220, .4); }
      var b = besk(f.ord);
      ut += b ? '<div class="kq-forkl"><b>' + f.ord + '</b> ' + b + '</div>' : '';
      ut += '<button type="button" class="kq-nasta">' + (spel.i + 1 < spel.fragor.length ? 'Nästa fråga ▶' : 'Se resultatet ▶') + '</button>';
      rot.querySelector('.kq-under').innerHTML = ut;
      rot.querySelector('.kq-nasta').onclick = function () {
        spel.i++;
        if (spel.i < spel.fragor.length) fraga(); else slut();
      };
    }
    rot.querySelectorAll('.kq-alt').forEach(function (b) { b.onclick = function () { visa(+b.dataset.i); }; });
    rot.querySelector('.kq-visa').onclick = function () { visa(null); };
  }

  function slut() {
    var n = spel.fragor.length, h;
    h = '<h2>Bra jobbat!</h2><p class="kq-stor">' + spel.poang + ' poäng</p><p class="kq-kap">' + spel.ratt + ' av ' + n + ' rätt</p>';
    rot.innerHTML = '<div class="kq-start kq-slutet">' + h + '<div class="kq-knappar"><button type="button" class="kq-go kq-igen">Spela igen ↻</button><button type="button" class="kq-go kq-ny">Ändra inställningar</button></div></div>';
    pip(523, .2); setTimeout(function () { pip(659, .2); }, 150); setTimeout(function () { pip(784, .35); }, 300);
    rot.querySelector('.kq-igen').onclick = function () { spel = { fragor: blanda(QUIZ_DATA[inst.kap].fragor), i: 0, poang: 0, ratt: 0, svit: 0 }; fraga(); };
    rot.querySelector('.kq-ny').onclick = start;
  }

  function helskarm() {
    var el = rot;
    if (document.fullscreenElement) document.exitFullscreen();
    else if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  start();
})();
