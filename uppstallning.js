/* Uppställningar: addition och subtraktion med växling (utkast 2026-11-21).
   Sidan har <div id="upst"></div>. Inget sparas utom valen (sessionStorage). */
(function () {
  var R = document.getElementById('upst'); if (!R) return;
  var PLATS = ['entalen', 'tiotalen', 'hundratalen', 'tusentalen', 'tiotusentalen', 'hundratusentalen'];
  var NIVA = { 1: 'Lätt', 2: 'Mellan', 3: 'Svår', 4: 'Decimaltal' };
  var ANTAL = 5;
  var S = { typ: 'add', niva: 1, lage: 'steg' };
  try { var sp = JSON.parse(sessionStorage.getItem('upst') || '{}'); if (sp.typ) S = Object.assign(S, sp); } catch (e) {}
  function spara() { try { sessionStorage.setItem('upst', JSON.stringify({ typ: S.typ, niva: S.niva, lage: S.lage })); } catch (e) {} }

  function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function talMed(n) { return rnd(Math.pow(10, n - 1), Math.pow(10, n) - 1); }
  function siffror(v, dec) { var s = String(v); while (s.length < dec + 1) s = '0' + s; return s; }
  function dig(s, c) { var i = s.length - 1 - c; return i >= 0 ? +s[i] : null; }
  function txt(v, dec) { var s = siffror(v, dec); if (!dec) return s.replace(/\B(?=(\d{3})+$)/g, ' '); return s.slice(0, -dec) + ',' + s.slice(-dec); }
  function namn(c, dec) { var p = c - dec; return p >= 0 ? PLATS[p] : (p === -1 ? 'tiondelarna' : 'hundradelarna'); }

  /* --- räkna växlingar --- */
  function minnen(a, b) { var k = 0, n = 0, sa = String(a), sb = String(b); for (var c = 0; c < Math.max(sa.length, sb.length); c++) { var s = (dig(sa, c) || 0) + (dig(sb, c) || 0) + k; k = s >= 10 ? 1 : 0; n += k; } return n; }
  function lan(a, b) { var sa = String(a), sb = String(b), bi = 0, n = 0, noll = false; for (var c = 0; c < sa.length; c++) { var t = dig(sa, c) - bi, u = dig(sb, c) || 0; if (bi && dig(sa, c) === 0) noll = true; if (t < u) { bi = 1; n++; } else bi = 0; } return { n: n, noll: noll }; }

  /* --- nya tal --- */
  function nyttTal() {
    for (var f = 0; f < 3000; f++) {
      var a, b, da = 0, db = 0;
      if (S.typ === 'add') {
        if (S.niva === 1) { a = talMed(rnd(2, 3)); b = talMed(rnd(2, String(a).length)); if (minnen(a, b)) continue; }
        else if (S.niva === 2) { a = talMed(3); b = talMed(rnd(2, 3)); var m = minnen(a, b); if (m < 1 || m > 2 || a + b > 999) continue; }
        else if (S.niva === 3) { a = talMed(4); b = talMed(rnd(3, 4)); if (minnen(a, b) < 2) continue; }
        else { da = rnd(1, 2); db = rnd(0, 2); if (da === db && Math.random() < .6) db = da === 2 ? 1 : 2; a = rnd(10 * Math.pow(10, da), 999 * Math.pow(10, da) / 10); b = rnd(Math.pow(10, db), 99 * Math.pow(10, db)); if (a % 10 === 0 || (db && b % 10 === 0)) continue; }
      } else {
        if (S.niva === 1) { a = talMed(rnd(2, 3)); b = talMed(rnd(1, String(a).length)); if (b >= a || lan(a, b).n) continue; }
        else if (S.niva === 2) { a = talMed(3); b = talMed(rnd(2, 3)); if (b >= a || /0/.test(String(a)) || lan(a, b).n !== 1) continue; }
        else if (S.niva === 3) { var noll = Math.random() < .55; a = talMed(rnd(3, 4)); b = talMed(rnd(2, String(a).length)); if (b >= a) continue; var L = lan(a, b); if (noll ? !L.noll : (L.n < 2 || L.noll)) continue; }
        else { da = rnd(0, 2); db = rnd(1, 2); a = rnd(2 * Math.pow(10, da), 99 * Math.pow(10, da)); b = rnd(Math.pow(10, db) / 2, 40 * Math.pow(10, db)); if ((da && a % 10 === 0) || b % 10 === 0) continue; }
      }
      var dec = Math.max(da, db), av = a * Math.pow(10, dec - da), bv = b * Math.pow(10, dec - db);
      if (S.typ === 'sub' && bv >= av) continue;
      if (S.niva === 4) { if (S.typ === 'add' ? minnen(av, bv) < 1 : lan(av, bv).n < 1) continue; }
      return bygg(av, da, bv, db, dec);
    }
  }
  function bygg(av, da, bv, db, dec) {
    var add = S.typ === 'add', rv = add ? av + bv : av - bv;
    var sa = siffror(av, dec), sb = siffror(bv, dec), sr = siffror(rv, dec);
    var W = add ? Math.max(sa.length, sb.length, sr.length) : sa.length;
    var P = { add: add, dec: dec, W: W, av: av, bv: bv, rv: rv, da: da, db: db, A: [], B: [], Apad: [], Bpad: [], r: [], k: [0] };
    for (var c = 0; c < W; c++) {
      P.A[c] = dig(sa, c); P.B[c] = dig(sb, c); P.r[c] = dig(sr, c) || 0;
      P.Apad[c] = P.A[c] !== null && c < dec - da; P.Bpad[c] = P.B[c] !== null && c < dec - db;
    }
    if (add) for (c = 0; c < W; c++) P.k[c + 1] = Math.floor(((P.A[c] || 0) + (P.B[c] || 0) + P.k[c]) / 10);
    P.titel = txt(av / Math.pow(10, dec - da), da) + (add ? ' + ' : ' − ') + txt(bv / Math.pow(10, dec - db), db);
    P.svar = txt(rv, dec);
    return P;
  }
  function ledande(c) { if (c <= P.dec) return false; for (var i = c; i < P.W; i++) if (P.r[i]) return false; return true; }

  /* --- tillstånd --- */
  var P, U, runda = [], nr = 0;
  function nyUppgift() {
    P = nyttTal();
    U = { ans: [], car: [], tv: P.A.map(function (d) { return d || 0; }), hist: [], sel: null, mark: [], cur: 0, fel: 0, felKol: 0, klar: false, mal: null, msg: '', msgTyp: '', okKol: [] };
    if (U.tv.length > P.W) U.tv.length = P.W;
    if (S.lage === 'steg') steg(); else { U.sel = { r: 'ans', c: 0 }; U.msg = P.add ? 'Börja längst till höger. Skriv minnessiffror i de små rutorna.' : 'Börja längst till höger. Tryck på en siffra i det övre talet för att växla.'; U.msgTyp = ''; }
    rita();
  }
  function nyRunda() { runda = []; nr = 0; nyUppgift(); }

  /* --- steg för steg --- */
  function delar(c) { var p = []; if (P.A[c] !== null) p.push(P.A[c]); if (P.B[c] !== null) p.push(P.B[c]); return p; }
  function steg() {
    U.felKol = 0; U.mal = null;
    var c = U.cur;
    if (c >= P.W) return klar();
    var nm = namn(c, P.dec);
    if (P.add) {
      var p = delar(c), k = P.k[c];
      if (!p.length) { U.msg = 'Minnessiffran ' + k + ' ska också ner i svaret. Skriv den i rutan längst till vänster.'; }
      else if (p.length === 1 && !k) { U.msg = 'I ' + nm + ' finns bara en siffra. Flytta ner den till svaret.'; }
      else { U.msg = 'Räkna ' + nm + ': <b>' + p.concat(k ? [k] : []).join(' + ') + '</b>' + (k ? ' (glöm inte minnessiffran)' : '') + '.'; }
      U.msgTyp = ''; U.sel = { r: 'ans', c: c };
    } else {
      var t = U.tv[c], b = P.B[c] || 0;
      if (t < b) {
        var L = c + 1; while (L < P.W && U.tv[L] === 0) L++;
        U.mal = L; U.sel = null; U.msgTyp = 'vx';
        if (U.tv[c + 1] >= 10) U.msg = 'Tryck nu på <b>' + U.tv[c + 1] + '</b> i ' + namn(c + 1, P.dec) + ' och växla igen.';
        else if (L === c + 1) U.msg = '<b>' + t + ' − ' + b + '</b> går inte, för ' + t + ' är mindre än ' + b + '. Du måste växla. Tryck på <b>' + U.tv[L] + '</b> i ' + namn(L, P.dec) + '.';
        else U.msg = '<b>' + t + ' − ' + b + '</b> går inte. Det står 0 i ' + namn(c + 1, P.dec) + ', så växla först från ' + namn(L, P.dec) + '. Tryck på <b>' + U.tv[L] + '</b>.';
      } else if (ledande(c)) {
        var i = c; while (i < P.W) { U.okKol[i] = 1; i++; }
        U.cur = P.W; U.msgTyp = '';
        return klar('Det blir 0 längst till vänster. En nolla först i ett tal skriver vi inte.');
      } else {
        U.msg = P.B[c] === null ? 'I ' + nm + ' ska du inte ta bort något. Flytta ner <b>' + t + '</b> till svaret.' : 'Räkna ' + nm + ': <b>' + t + ' − ' + b + '</b>.';
        U.msgTyp = ''; U.sel = { r: 'ans', c: c };
      }
    }
  }
  function stegSiffra(d) {
    var c = U.sel.c, nm;
    if (U.sel.r === 'car') {
      var s = (P.A[c - 1] || 0) + (P.B[c - 1] || 0) + P.k[c - 1];
      if (d === P.k[c]) { U.car[c] = String(d); U.cur = c; steg(); }
      else { U.fel++; skak('car', c); U.msg = 'Summan var ' + s + '. Skriv tiotalet <b>' + P.k[c] + '</b> i den lilla rutan.'; U.msgTyp = 'fel'; }
      return;
    }
    if (P.add) {
      var p = delar(c), k = P.k[c], sum = p.reduce(function (x, y) { return x + y; }, 0) + k, e = sum % 10, expr = p.concat(k ? [k] : []).join(' + ');
      if (d === e) {
        U.ans[c] = String(d); U.okKol[c] = 1;
        if (P.k[c + 1] && c + 1 < P.W) {
          U.sel = { r: 'car', c: c + 1 }; U.msgTyp = 'ok';
          U.msg = 'Rätt! ' + expr + ' = ' + sum + '. Skriv <b>' + P.k[c + 1] + ':an</b> som minnessiffra i den lilla rutan ovanför ' + namn(c + 1, P.dec) + '.';
        } else { U.cur = c + 1; steg(); if (!U.klar) { U.msg = 'Rätt! ' + U.msg; } }
        return;
      }
      U.fel++; U.felKol++; skak('ans', c); U.msgTyp = 'fel';
      if (sum >= 10 && d === Math.floor(sum / 10)) U.msg = 'Svaret är ' + sum + '. I rutan skriver du bara den sista siffran, <b>' + e + '</b>. ' + Math.floor(sum / 10) + ':an blir minnessiffra.';
      else if (k && d === (sum - k) % 10) U.msg = 'Glöm inte minnessiffran ' + k + '! Räkna <b>' + expr + '</b>.';
      else if (U.felKol >= 2) U.msg = expr + ' = ' + sum + '. Skriv <b>' + e + '</b>' + (sum >= 10 ? ' i rutan.' : '.');
      else U.msg = 'Inte riktigt. Räkna igen: <b>' + expr + '</b>.';
    } else {
      var t = U.tv[c], b = P.B[c] || 0, e2 = t - b;
      if (d === e2) { U.ans[c] = String(d); U.okKol[c] = 1; U.cur = c + 1; steg(); if (!U.klar) U.msg = 'Rätt! ' + U.msg; return; }
      U.fel++; U.felKol++; skak('ans', c); U.msgTyp = 'fel';
      U.msg = U.felKol >= 2 ? t + ' − ' + b + ' = ' + e2 + '. Skriv <b>' + e2 + '</b>.' : 'Inte riktigt. Räkna igen: <b>' + t + ' − ' + b + '</b>.';
    }
  }

  /* --- växla --- */
  function kedja(c) { return c >= 0 && U.tv[c] < 10 && (U.tv[c] < (P.B[c] || 0) || (U.tv[c] === 0 && kedja(c - 1))); }
  function vaxla(L) {
    var Rr = L - 1;
    if (Rr < 0) { meddela('Siffran längst till höger kan inte växla till någon.', 'fel'); return; }
    if (U.tv[L] === 0) { meddela('Här står det 0. Då måste du först växla från siffran till vänster.', 'fel'); return; }
    if (S.lage === 'steg') {
      if (U.mal === null) { meddela('Du behöver inte växla nu. ' + U.msg.replace(/^Rätt! /, ''), ''); return; }
      if (L !== U.mal) { meddela('Tryck på <b>' + U.tv[U.mal] + '</b> i ' + namn(U.mal, P.dec) + '.', 'fel'); return; }
    } else if (!(U.tv[Rr] < 10 && (U.tv[Rr] < (P.B[Rr] || 0) || (U.tv[Rr] === 0 && kedja(Rr - 1))))) {
      meddela('Du behöver inte växla här. Den övre siffran i ' + namn(Rr, P.dec) + ' är inte mindre än den undre.', 'fel'); return;
    }
    U.hist.push(U.tv.slice()); U.tv[L] -= 1; U.tv[Rr] += 10;
    if (S.lage === 'steg') { var nu = U.tv[L], till = U.tv[Rr]; steg(); if (U.msgTyp !== 'vx') U.msg = 'Bra! ' + namn(L, P.dec).replace(/^./, function (x) { return x.toUpperCase(); }) + ' får en mindre (' + nu + '), och ' + namn(Rr, P.dec) + ' får 10 till (' + till + '). ' + U.msg; }
    else meddela('Du växlade. ' + (U.tv[L] + 1) + ' blev ' + U.tv[L] + ', och i ' + namn(Rr, P.dec) + ' har du nu ' + U.tv[Rr] + '.', '');
    rita();
  }
  function angra() { if (U.hist.length) { U.tv = U.hist.pop(); meddela('Växlingen är ångrad.', ''); rita(); } }

  /* --- själv: rätta --- */
  function forklara(c) {
    var nm = namn(c, P.dec);
    if (P.add) {
      var p = delar(c), k = P.k[c], s = p.reduce(function (x, y) { return x + y; }, 0) + k;
      if (!p.length) return 'Längst till vänster: minnessiffran ' + k + ' ska ner i svaret.';
      return 'Kolla ' + nm + ': ' + p.concat(k ? [k] : []).join(' + ') + (k ? ' (med minnessiffran)' : '') + ' = ' + s + '. Skriv ' + (s % 10) + (s >= 10 ? ' och ' + Math.floor(s / 10) + ' som minnessiffra.' : '.');
    }
    var bi = 0, t, u, r = '';
    for (var i = 0; i <= c; i++) { t = (P.A[i] || 0) - bi; u = P.B[i] || 0; var vx = t < u; if (i === c) { var a0 = P.A[i] || 0; r = 'Kolla ' + nm + ': '; if (bi) r += 'du har växlat bort 1, så ' + a0 + ' blir ' + t + '. '; if (vx) r += t + ' − ' + u + ' går inte, så du växlar: ' + (t + 10) + ' − ' + u + ' = ' + (t + 10 - u) + '.'; else r += t + ' − ' + u + ' = ' + (t - u) + '.'; var uu = +U.ans[c]; if (vx && U.ans[c] !== '' && uu === u - t) r = 'I ' + nm + ' räknade du ' + u + ' − ' + t + ' (den undre minus den övre). Man räknar alltid övre minus undre. ' + r; } bi = vx ? 1 : 0; }
    return r;
  }
  function ratta() {
    var forst = -1;
    for (var c = 0; c < P.W; c++) {
      var u = U.ans[c] || '', ok = u === String(P.r[c]) || (ledande(c) && (u === '' || u === '0'));
      U.mark[c] = ok ? 'ok' : 'fel'; if (!ok && forst < 0) forst = c;
    }
    if (forst < 0) { klar(); return rita(); }
    U.fel++;
    var antal = U.mark.filter(function (m) { return m === 'fel'; }).length;
    U.msg = (antal === 1 ? 'Nästan! En ruta är fel. ' : 'Det blev fel i ' + antal + ' rutor. ') + forklara(forst) + ' Ändra och tryck Rätta igen.';
    U.msgTyp = 'fel'; U.sel = { r: 'ans', c: forst }; rita();
  }
  function klar(extra) {
    U.klar = true; U.sel = null; U.mal = null;
    for (var c = 0; c < P.W; c++) { if (!U.ans[c] && !ledande(c)) U.ans[c] = String(P.r[c]); U.mark[c] = 'ok'; }
    runda[nr] = U.fel ? 'halv' : 'hel';
    U.msg = (extra ? extra + ' ' : '') + '<b>Rätt! ' + P.titel + ' = ' + P.svar + '</b>' + (U.fel ? '' : ' Helt utan fel!');
    U.msgTyp = 'klar';
  }

  /* --- inmatning --- */
  function siffra(d) {
    if (!P || U.klar || !U.sel) { if (!U.klar && S.lage === 'steg' && U.mal !== null) meddela(U.msg, 'vx'); return; }
    if (S.lage === 'steg') { stegSiffra(d); rita(); return; }
    var c = U.sel.c;
    if (U.sel.r === 'car') { U.car[c] = String(d); U.sel = { r: 'ans', c: c }; }
    else { U.ans[c] = String(d); U.mark[c] = ''; if (c + 1 < P.W) U.sel = { r: 'ans', c: c + 1 }; }
    rita();
  }
  function sudda() {
    if (!U.sel || U.klar || S.lage === 'steg') return;
    var c = U.sel.c; if (U.sel.r === 'car') U.car[c] = ''; else { U.ans[c] = ''; U.mark[c] = ''; }
    rita();
  }
  function meddela(m, t) { U.msg = m; U.msgTyp = t; rita(); }
  var skakas = null;
  function skak(r, c) { skakas = r + c; }

  /* --- rita --- */
  function cell(inner, kl, data) { return '<div class="up-c ' + (kl || '') + '"' + (data || '') + '>' + inner + '</div>'; }
  function rad(fn, tecken, kl) {
    var h = cell(tecken || '', 'up-tk');
    for (var c = P.W - 1; c >= 0; c--) {
      h += fn(c);
      if (P.dec && c === P.dec) h += '<div class="up-c up-km">' + (/\bkomma\b/.test(kl || '') ? ',' : '') + '</div>';
    }
    return '<div class="up-rad ' + (kl || '') + '">' + h + '</div>';
  }
  function siffCell(d, pad, c, r) { return d === null ? cell('', 'up-tom') : cell(String(d), 'up-d' + (pad ? ' up-pad' : '')); }
  function rita() {
    var h = '';
    // val
    h += '<div class="up-val"><div class="up-grp" role="group" aria-label="Räknesätt">' +
      [['add', 'Addition +'], ['sub', 'Subtraktion −']].map(function (x) { return '<button data-typ="' + x[0] + '" class="' + (S.typ === x[0] ? 'on' : '') + '">' + x[1] + '</button>'; }).join('') + '</div>' +
      '<div class="up-grp" role="group" aria-label="Nivå">' + [1, 2, 3, 4].map(function (n) { return '<button data-niva="' + n + '" class="' + (S.niva === n ? 'on' : '') + '">' + NIVA[n] + '</button>'; }).join('') + '</div>' +
      '<div class="up-grp up-lage" role="group" aria-label="Hjälp">' + [['steg', 'Steg för steg'], ['sjalv', 'Själv']].map(function (x) { return '<button data-lage="' + x[0] + '" class="' + (S.lage === x[0] ? 'on' : '') + '">' + x[1] + '</button>'; }).join('') + '</div></div>';
    if (nr >= ANTAL) { rita_slut(h); return; }
    // progress
    h += '<div class="up-kort"><div class="up-topp"><span class="up-uppg">Tal ' + (nr + 1) + ' av ' + ANTAL + '</span><span class="up-prog">' +
      Array.apply(null, Array(ANTAL)).map(function (_, i) { return '<i class="' + (runda[i] || (i === nr ? 'nu' : '')) + '"></i>'; }).join('') + '</span></div>';
    h += '<p class="up-fraga">Räkna med uppställning: <b>' + P.titel + '</b></p>';
    // rutnät
    var g = '<div class="up-grid' + (S.lage === 'steg' && !U.klar ? ' steg' : '') + '" style="--n:' + (P.W + 1 + (P.dec ? 1 : 0)) + '">';
    if (P.add) {
      g += rad(function (c) {
        if (c === 0) return cell('', 'up-tom up-sm');
        var v = U.car[c] || '', kl = 'up-car' + (U.sel && U.sel.r === 'car' && U.sel.c === c ? ' sel' : '') + (skakas === 'car' + c ? ' skak' : '');
        return cell('<span>' + v + '</span>', kl + ' up-sm', ' data-r="car" data-c="' + c + '" role="button" aria-label="Minnessiffra ovanför ' + namn(c, P.dec) + '"');
      }, '', 'up-minne');
      g += rad(function (c) { return siffCell(P.A[c], P.Apad[c]); }, '', 'komma');
      g += rad(function (c) { return siffCell(P.B[c], P.Bpad[c]); }, '+', 'komma up-linje');
    } else {
      g += rad(function (c) { var ch = U.tv[c] !== (P.A[c] || 0); return cell(ch ? '<span>' + U.tv[c] + '</span>' : '', 'up-not up-sm'); }, '', 'up-minne');
      g += rad(function (c) {
        if (P.A[c] === null) return cell('', 'up-tom');
        var ch = U.tv[c] !== (P.A[c] || 0), mal = U.mal === c;
        return cell(String(P.A[c]), 'up-d up-top' + (P.Apad[c] ? ' up-pad' : '') + (ch ? ' strk' : '') + (mal ? ' mal' : ''), ' data-r="top" data-c="' + c + '" role="button" aria-label="Växla från ' + namn(c, P.dec) + '"');
      }, '', 'komma');
      g += rad(function (c) { return siffCell(P.B[c], P.Bpad[c]); }, '−', 'komma up-linje');
    }
    g += rad(function (c) {
      var v = U.ans[c] || '', kl = 'up-ans' + (U.sel && U.sel.r === 'ans' && U.sel.c === c ? ' sel' : '') + (U.mark[c] ? ' ' + U.mark[c] : '') + (U.okKol[c] && S.lage === 'steg' ? ' ok' : '') + (skakas === 'ans' + c ? ' skak' : '') + (U.klar && ledande(c) ? ' up-tomsvar' : '');
      return cell('<span>' + v + '</span>', kl, ' data-r="ans" data-c="' + c + '" role="button" aria-label="Svar, ' + namn(c, P.dec) + '"');
    }, '', 'komma up-svar');
    // markera aktuell kolumn i steg-läget
    g += '</div>';
    h += '<div class="up-yta">' + g + '</div>';
    h += '<div class="up-msg ' + U.msgTyp + '" aria-live="polite">' + U.msg + '</div>';
    if (U.klar) h += '<div class="up-knappar"><button class="up-nasta" data-g="nasta">' + (nr + 1 < ANTAL ? 'Nästa tal →' : 'Se resultatet →') + '</button></div>';
    else {
      h += '<div class="up-pad-wrap"><div class="up-tangent">' + [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (d) { return '<button data-d="' + d + '">' + d + '</button>'; }).join('') +
        (S.lage === 'sjalv' ? '<button data-g="sudda" class="up-gra" aria-label="Sudda">⌫</button>' : '<span></span>') + '<button data-d="0">0</button>' +
        (S.lage === 'sjalv' ? '<button data-g="ratta" class="up-ratta">Rätta</button>' : '<span></span>') + '</div>' +
        (!P.add && S.lage === 'sjalv' && U.hist.length ? '<button class="up-angra" data-g="angra">↶ Ångra växling</button>' : '') + '</div>';
    }
    h += '</div>';
    h += hjalp();
    R.innerHTML = h;
    // aktuell kolumn
    if (S.lage === 'steg' && !U.klar && U.cur < P.W) {
      var kol = U.cur;
      R.querySelectorAll('.up-rad').forEach(function (rd) { var cs = rd.querySelectorAll('.up-c:not(.up-km):not(.up-tk)'); var el = cs[P.W - 1 - kol]; if (el) el.classList.add('akt'); });
    }
    skakas = null;
  }
  function hjalp() {
    return '<details class="up-hj"><summary>Så gör du</summary>' + (S.typ === 'add'
      ? '<ol><li>Börja alltid längst till höger, med entalen.</li><li>Räkna ihop siffrorna i kolumnen.</li><li>Blir det 10 eller mer? Skriv den sista siffran i svaret. Skriv 1:an som <b>minnessiffra</b> i den lilla rutan ovanför nästa kolumn.</li><li>Räkna med minnessiffran i nästa kolumn.</li><li>Decimaltal: kommatecknen står under varandra. Grå nollor fyller ut så att talen har lika många decimaler.</li></ol>'
      : '<ol><li>Börja alltid längst till höger, med entalen.</li><li>Räkna den övre siffran minus den undre.</li><li>Är den övre siffran mindre? Då måste du <b>växla</b>. Tryck på siffran till vänster i det övre talet. Den blir 1 mindre, och din siffra får 10 till.</li><li>Står det 0 till vänster? Växla först från siffran längre till vänster.</li><li>Decimaltal: kommatecknen står under varandra. Grå nollor fyller ut så att talen har lika många decimaler.</li></ol>') + '</details>';
  }
  function rita_slut(h) {
    var hela = runda.filter(function (x) { return x === 'hel'; }).length;
    h += '<div class="up-kort up-slut"><h2>Bra jobbat!</h2><p>Du har räknat ' + ANTAL + ' tal. <b>' + hela + '</b> av dem blev rätt direkt, utan fel.</p><div class="up-stj">' +
      runda.map(function (x) { return x === 'hel' ? '★' : '<i>★</i>'; }).join('') + '</div>' +
      '<p>' + (hela === ANTAL ? (S.niva < 4 ? 'Prova en svårare nivå, eller prova att räkna <b>Själv</b>.' : 'Snyggt! Prova att räkna <b>Själv</b> utan hjälp.') : 'Träna en runda till, så blir det lättare.') + '</p>' +
      '<div class="up-knappar"><button class="up-nasta" data-g="igen">Spela igen</button></div></div>';
    R.innerHTML = h;
  }

  R.addEventListener('click', function (e) {
    var b = e.target.closest('button,[data-r]'); if (!b) return;
    if (b.dataset.typ) { S.typ = b.dataset.typ; spara(); return nyRunda(); }
    if (b.dataset.niva) { S.niva = +b.dataset.niva; spara(); return nyRunda(); }
    if (b.dataset.lage) { S.lage = b.dataset.lage; spara(); return nyRunda(); }
    if (b.dataset.d !== undefined) return siffra(+b.dataset.d);
    var g = b.dataset.g;
    if (g === 'sudda') return sudda();
    if (g === 'ratta') return ratta();
    if (g === 'angra') return angra();
    if (g === 'nasta') { nr++; if (nr < ANTAL) nyUppgift(); else rita(); return; }
    if (g === 'igen') return nyRunda();
    if (b.dataset.r && !U.klar) {
      var c = +b.dataset.c;
      if (b.dataset.r === 'top') return vaxla(c);
      if (S.lage === 'sjalv') { U.sel = { r: b.dataset.r, c: c }; rita(); }
    }
  });
  var AR = '٠١٢٣٤٥٦٧٨٩', FA = '۰۱۲۳۴۵۶۷۸۹';
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || !P || nr >= ANTAL) return;
    var k = e.key, i = AR.indexOf(k); if (i < 0) i = FA.indexOf(k); if (i >= 0) k = String(i);
    if (/^[0-9]$/.test(k)) { e.preventDefault(); return siffra(+k); }
    if (k === 'Backspace') { e.preventDefault(); return sudda(); }
    if (k === 'Enter') { if (U.klar) { e.preventDefault(); nr++; if (nr < ANTAL) nyUppgift(); else rita(); } else if (S.lage === 'sjalv') { e.preventDefault(); ratta(); } return; }
    if (S.lage === 'sjalv' && U.sel && (k === 'ArrowLeft' || k === 'ArrowRight')) { e.preventDefault(); var c = U.sel.c + (k === 'ArrowLeft' ? 1 : -1); if (c >= 0 && c < P.W) { U.sel = { r: 'ans', c: c }; rita(); } }
  });
  nyRunda();
  window.__upst = { P: function () { return P; }, U: function () { return U; }, S: S };
})();
