// Begreppsquiz i klassrummet (begrepp-quiz.html). Frågor per kapitel i QUIZ_DATA.
// Nyckel 'åk-kapitel-quiz', t.ex. '7-1-1' = åk 7, kapitel 1, Quiz 1. Två quiz per kapitel.
// Kapitlens namn kommer från lankar.json (QUIZ_KAP, skrivs in av begrepp_quiz.py).
// Rätt svar står alltid först i 'a'; ordningen blandas när quizet startar.
// 'ord' = bokens begrepp (BG_BOK) vars förklaring visas efter svaret.
var QUIZ_DATA = {
  // Åk 7 kap 1: Quiz 1 = tal och talmängder, Quiz 2 = räknesätt, skrivsätt och avrundning (olika begrepp)
  '7-1-1': { fragor: [
    { q: 'Vad kallas talen 0, 1, 2, 3, 4, …?', a: ['Naturliga tal', 'Negativa tal', 'Udda tal', 'Primtal'], ord: 'Naturliga tal' },
    { typ: 'sf', q: '–3 är ett naturligt tal.', svar: false, ord: 'Naturliga tal' },
    { q: 'Vilket tal är ett udda tal?', a: ['–7', '14', '0', '–20'], ord: 'Udda tal' },
    { typ: 'sf', q: '0 är ett jämnt tal.', svar: true, ord: 'Jämna tal' },
    { q: 'I vilket alternativ är alla tal jämna?', a: ['–4, 0, 8', '2, 5, 8', '1, 3, 6', '–2, 7, 10'], ord: 'Jämna tal' },
    { q: 'Vilket tal är ett primtal?', a: ['13', '9', '15', '21'], ord: 'Primtal' },
    { typ: 'sf', q: '1 är ett primtal.', svar: false, ord: 'Primtal' },
    { q: '30 / 4 = 7,5<br><small>Vad visar det?</small>', a: ['30 är inte delbart med 4', '30 är delbart med 4', '7,5 är ett heltal', '4 är ett udda tal'], ord: 'Delbarhet' },
    { q: 'Vilket tal är delbart med 3?', a: ['27', '25', '28', '32'], ord: 'Delbarhet' },
    { q: 'Vilket tal är ett negativt tal?', a: ['–2,5', '2,5', '0', '<span class="fr"><i>1</i><i>2</i></span>'], ord: 'Negativa tal' },
    { typ: 'ordning', q: 'Klicka på talen från minst till störst', a: ['–8', '–3', '0', '5'], ord: 'Negativa tal' },
    { q: 'Vad betyder <i>x</i> &gt; 0?', a: ['<i>x</i> är större än 0', '<i>x</i> är mindre än 0', '<i>x</i> är lika med 0', '<i>x</i> är inte lika med 0'], ord: 'Olikhetstecken' },
    { q: '–5 ▢ –2<br><small>Vilket tecken ska stå i rutan?</small>', a: ['&lt;', '&gt;', '=', '≈'], ord: 'Olikhetstecken' },
    { typ: 'sf', q: 'Alla hela tal är rationella tal.', svar: true, ord: 'Rationella tal' },
    { typ: 'ordning', q: 'Klicka på talen från minst till störst', a: ['–1,5', '–<span class="fr"><i>1</i><i>4</i></span>', '<span class="fr"><i>1</i><i>2</i></span>', '2'], ord: 'Rationella tal' },
    { q: 'Vilket tal är skrivet i bråkform?', a: ['<span class="fr"><i>3</i><i>4</i></span>', '0,75', '75', '2<span class="fr"><i>3</i><i>4</i></span>'], ord: 'Bråkform' },
    { q: 'Vad kallas talet under bråkstrecket i ett tal i bråkform?', a: ['Nämnare', 'Täljare', 'Kvot', 'Produkt'], ord: 'Bråkform' },
    { q: 'Vilket tal är skrivet i blandad form?', a: ['2<span class="fr"><i>1</i><i>2</i></span>', '<span class="fr"><i>5</i><i>2</i></span>', '2,5', '25'], ord: 'Blandad form' },
    { typ: 'ordning', q: 'Klicka på talen från minst till störst', a: ['<span class="fr"><i>1</i><i>2</i></span>', '<span class="fr"><i>3</i><i>4</i></span>', '1<span class="fr"><i>1</i><i>4</i></span>', '<span class="fr"><i>7</i><i>4</i></span>'], ord: 'Blandad form' }
  ] },
  '7-1-2': { fragor: [
    { q: 'Vilket tal är skrivet i decimalform?', a: ['1,75', '<span class="fr"><i>7</i><i>4</i></span>', '1<span class="fr"><i>3</i><i>4</i></span>', '<span class="fr"><i>175</i><i>100</i></span>'], ord: 'Decimalform' },
    { typ: 'ordning', q: 'Klicka på talen från minst till störst', a: ['0,09', '0,1', '0,25', '0,3'], ord: 'Decimalform' },
    { q: 'I talet 3 582, vilket värde har siffran 5?', a: ['500', '50', '5', '5 000'], ord: 'Positionssystemet' },
    { q: 'I talet 4,26, vilket värde har siffran 6?', a: ['6 hundradelar', '6 tiondelar', '6 ental', '6 tiotal'], ord: 'Positionssystemet' },
    { typ: 'sf', q: 'I talet 7 405 har siffran 4 värdet 40.', svar: false, ord: 'Positionssystemet' },
    { typ: 'ordning', q: 'Klicka på talen från minst till störst', a: ['1 009', '1 090', '1 099', '1 900'], ord: 'Positionssystemet' },
    { q: 'Vilket räknesätt används när tal läggs ihop?', a: ['Addition', 'Subtraktion', 'Multiplikation', 'Division'], ord: 'Addition' },
    { typ: 'sf', q: 'I en subtraktion dras ett tal från ett annat tal.', svar: true, ord: 'Subtraktion' },
    { q: '3 + 3 + 3 + 3 + 3 + 3<br><small>Hur kan det skrivas som multiplikation?</small>', a: ['6 · 3', '6 + 3', '3 – 6', '6 / 3'], ord: 'Multiplikation' },
    { q: 'Vilket räknesätt används när man vill veta hur många gånger ett tal ryms i ett annat?', a: ['Division', 'Multiplikation', 'Addition', 'Subtraktion'], ord: 'Division' },
    { typ: 'sf', q: '12 / 3 = 4 betyder att 3 ryms 4 gånger i 12.', svar: true, ord: 'Division' },
    { q: '4 327 = 4 000 + 300 + 20 + 7<br><small>Hur är talet skrivet till höger?</small>', a: ['I utvecklad form', 'I blandad form', 'I bråkform', 'I decimalform'], ord: 'Utvecklad form' },
    { q: 'Hur skrivs 5 064 i utvecklad form?', a: ['5 000 + 60 + 4', '5 000 + 600 + 4', '500 + 60 + 4', '5 + 0 + 6 + 4'], ord: 'Utvecklad form' },
    { q: 'Avrunda 4,7 till ett heltal.', a: ['5', '4', '4,8', '47'], ord: 'Avrundning' },
    { q: '9,2 ≈ 9<br><small>Vad kallas talet 9 här?</small>', a: ['Ett närmevärde', 'Ett primtal', 'Ett negativt tal', 'Ett tal i bråkform'], ord: 'Närmevärde' },
    { typ: 'sf', q: 'Ett närmevärde är ett exakt värde.', svar: false, ord: 'Närmevärde' },
    { q: '4,7 + 9,2 ≈ 5 + 9 = 14<br><small>Vad kallas det här sättet att räkna?</small>', a: ['Överslagsräkning', 'Utvecklad form', 'Positionssystemet', 'Division'], ord: 'Överslagsräkning' },
    { q: 'Vilket överslag passar bäst för 19,8 + 30,1?', a: ['20 + 30 = 50', '19 + 30 = 49', '20 + 31 = 51', '10 + 30 = 40'], ord: 'Överslagsräkning' }
  ] }
};

(function () {
  var rot = document.getElementById('kq');
  if (!rot) return;
  var FARG = [['A', 'kq-r'], ['B', 'kq-b'], ['C', 'kq-g'], ['D', 'kq-gr']];
  var inst = { kap: null, ak: 7, tid: 20, ljud: true };
  var KAP = window.QUIZ_KAP || {};
  var AKF = { 7: '#3E8A32', 8: '#1A86B0', 9: '#8A4A78' };
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

  function titel(id) {
    var p = id.split('-'), namn = ((KAP[p[0]] || []).filter(function (k) { return k[0] === p[1]; })[0] || [])[1] || '';
    return 'Åk ' + p[0] + ' · Kapitel ' + p[1] + (namn ? ' ' + namn : '') + ' · Quiz ' + p[2];
  }

  // Välj årskurs, kapitel och quiz
  function valj() {
    clearInterval(timer);
    var flikar = [7, 8, 9].map(function (a) {
      return '<button type="button" data-ak="' + a + '" class="' + (a === inst.ak ? 'on' : '') + '" style="--f:' + AKF[a] + '">Åk ' + a + '</button>';
    }).join('');
    var kap = (KAP[inst.ak] || []).map(function (k) {
      var q = [1, 2].map(function (n) {
        var id = inst.ak + '-' + k[0] + '-' + n, d = QUIZ_DATA[id];
        return d ? '<button type="button" class="kq-qk" data-id="' + id + '">Quiz ' + n + ' <small>' + d.fragor.length + ' frågor</small></button>'
          : '<span class="kq-qk kq-snart">Quiz ' + n + ' <small>Kommer snart</small></span>';
      }).join('');
      return '<div class="kq-kaprad" style="--f:' + AKF[inst.ak] + '"><span class="kq-knr">' + k[0] + '</span><b>Kapitel ' + k[0] + '<small>' + k[1] + '</small></b><div class="kq-qs">' + q + '</div></div>';
    }).join('');
    rot.innerHTML = '<div class="kq-valj"><div class="kq-vh"><div class="kq-logo kq-logo-s">?</div><div><h2>Mattequiz</h2><p>Välj årskurs och kapitel. Varje kapitel har två quiz om begreppen.</p></div></div>'
      + '<div class="kq-flikar">' + flikar + '</div><div class="kq-kaplista">' + kap + '</div></div>';
    rot.querySelectorAll('[data-ak]').forEach(function (b) { b.onclick = function () { inst.ak = +b.dataset.ak; valj(); }; });
    rot.querySelectorAll('[data-id]').forEach(function (b) { b.onclick = function () { inst.kap = b.dataset.id; start(); rot.scrollIntoView({ block: 'start' }); }; });
  }

  function start() {
    clearInterval(timer);
    var d = QUIZ_DATA[inst.kap];
    rot.innerHTML = '<div class="kq-start"><button type="button" class="kq-bak">← Välj ett annat quiz</button><div class="kq-logo">?</div><h2>Mattequiz</h2><p class="kq-kap">' + titel(inst.kap) + ' · ' + d.fragor.length + ' frågor</p>'
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
    rot.querySelector('.kq-bak').onclick = valj;
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

  // Frågetyper: vanlig (a: fyra svar, rätt först), typ 'sf' = sant eller falskt (svar: true/false),
  // typ 'ordning' = klicka rutorna i rätt ordning (a: rätt ordning).
  function fraga() {
    var f = spel.fragor[spel.i], typ = f.typ || 'val';
    var alt, kvar = inst.tid, t0 = Date.now(), klar = false, foljd = [];
    if (typ === 'sf') alt = [{ t: '✔ Sant', r: f.svar === true }, { t: '✘ Falskt', r: f.svar === false }];
    else if (typ === 'ordning') alt = blanda(f.a.map(function (t, i) { return { t: t, n: i }; }));
    else alt = blanda(f.a.map(function (t, i) { return { t: t, r: i === 0 }; }));
    var etikett = { sf: 'Sant eller falskt?', ordning: 'Sätt i ordning' }[typ];
    var farg = typ === 'sf' ? [['', 'kq-b'], ['', 'kq-r']] : FARG;
    rot.innerHTML = huvud() + '<div class="kq-fraga"><div class="kq-q">' + (etikett ? '<span class="kq-typ">' + etikett + '</span>' : '') + f.q + '</div>'
      + (inst.tid ? '<div class="kq-klocka"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" class="kq-bg"/><circle cx="22" cy="22" r="19" class="kq-fg"/></svg><span>' + kvar + '</span></div>' : '')
      + '</div>' + (typ === 'ordning' ? '<div class="kq-foljd">' + f.a.map(function (_, i) { return '<span class="kq-plats">' + (i + 1) + '</span>'; }).join('') + '</div>' : '')
      + '<div class="kq-svar' + (typ === 'sf' ? ' kq-sf' : '') + '">' + alt.map(function (x, i) {
        return '<button type="button" class="kq-alt ' + farg[i][1] + '" data-i="' + i + '">' + (farg[i][0] ? '<span class="kq-bok">' + farg[i][0] + '</span>' : '') + '<span class="kq-t">' + x.t + '</span></button>';
      }).join('') + '</div><div class="kq-under">' + (typ === 'ordning' ? '<button type="button" class="kq-angra">↶ Ångra</button>' : '') + '<button type="button" class="kq-visa">Visa svaret</button></div>';
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
    // svar: true = rätt, false = fel, null = inget svar (tiden slut eller Visa svaret)
    function visa(svar, valt) {
      if (klar) return; klar = true; clearInterval(timer);
      var tid = (Date.now() - t0) / 1000, ratt = svar === true;
      if (typ === 'ordning') {
        rot.querySelectorAll('.kq-alt').forEach(function (b) { b.disabled = true; b.classList.add('kq-fel'); });
        var platser = rot.querySelectorAll('.kq-plats');
        f.a.forEach(function (t, i) { platser[i].innerHTML = '<b>' + (i + 1) + '</b> ' + t; platser[i].className = 'kq-plats kq-fylld kq-rattplats'; });
      } else {
        rot.querySelectorAll('.kq-alt').forEach(function (b, i) {
          b.disabled = true;
          b.classList.add(alt[i].r ? 'kq-ratt' : 'kq-fel');
          if (i === valt) b.classList.add('kq-vald');
        });
      }
      var ut = '';
      if (svar !== null) {
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
      var b = f.forkl || besk(f.ord);
      ut += b ? '<div class="kq-forkl"><b>' + f.ord + '</b> ' + b + '</div>' : '';
      ut += '<button type="button" class="kq-nasta">' + (spel.i + 1 < spel.fragor.length ? 'Nästa fråga ▶' : 'Se resultatet ▶') + '</button>';
      rot.querySelector('.kq-under').innerHTML = ut;
      rot.querySelector('.kq-nasta').onclick = function () {
        spel.i++;
        if (spel.i < spel.fragor.length) fraga(); else slut();
      };
    }
    if (typ === 'ordning') {
      var rita = function () {
        var platser = rot.querySelectorAll('.kq-plats');
        platser.forEach(function (pl, i) {
          var x = foljd[i] !== undefined ? alt[foljd[i]] : null;
          pl.innerHTML = x ? '<b>' + (i + 1) + '</b> ' + x.t : (i + 1); pl.classList.toggle('kq-fylld', !!x);
        });
        rot.querySelectorAll('.kq-alt').forEach(function (b, i) { b.classList.toggle('kq-tagen', foljd.indexOf(i) >= 0); });
      };
      rot.querySelectorAll('.kq-alt').forEach(function (b) {
        b.onclick = function () {
          var i = +b.dataset.i; if (klar || foljd.indexOf(i) >= 0) return;
          foljd.push(i); pip(523 + 60 * foljd.length, .08); rita();
          if (foljd.length === alt.length) setTimeout(function () { visa(foljd.every(function (k, n) { return alt[k].n === n; })); }, 350);
        };
      });
      rot.querySelector('.kq-angra').onclick = function () { if (!klar) { foljd.pop(); rita(); } };
    } else {
      rot.querySelectorAll('.kq-alt').forEach(function (b) { b.onclick = function () { var i = +b.dataset.i; visa(alt[i].r, i); }; });
    }
    rot.querySelector('.kq-visa').onclick = function () { visa(null); };
  }

  function slut() {
    var n = spel.fragor.length, h;
    h = '<h2>Bra jobbat!</h2><p class="kq-stor">' + spel.poang + ' poäng</p><p class="kq-kap">' + spel.ratt + ' av ' + n + ' rätt</p>';
    rot.innerHTML = '<div class="kq-start kq-slutet">' + h + '<div class="kq-knappar"><button type="button" class="kq-go kq-igen">Spela igen ↻</button><button type="button" class="kq-go kq-ny">Ändra inställningar</button><button type="button" class="kq-go kq-ny kq-annat">Välj ett annat quiz</button></div></div>';
    pip(523, .2); setTimeout(function () { pip(659, .2); }, 150); setTimeout(function () { pip(784, .35); }, 300);
    rot.querySelector('.kq-igen').onclick = function () { spel = { fragor: blanda(QUIZ_DATA[inst.kap].fragor), i: 0, poang: 0, ratt: 0, svit: 0 }; fraga(); };
    rot.querySelector('.kq-ny').onclick = start;
    rot.querySelector('.kq-annat').onclick = valj;
  }

  function helskarm() {
    var el = rot;
    if (document.fullscreenElement) document.exitFullscreen();
    else if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  // ?ak=8 öppnar årskursen, ?quiz=7-1-1 startar ett quiz direkt
  var u = new URLSearchParams(location.search);
  if (KAP[u.get('ak')]) inst.ak = +u.get('ak');
  if (QUIZ_DATA[u.get('quiz')]) { inst.kap = u.get('quiz'); inst.ak = +inst.kap.split('-')[0]; start(); } else valj();
})();
