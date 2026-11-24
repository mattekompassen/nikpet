/* Uppställningar: addition och subtraktion med växling (utkast 2026-11-21).
   Sidan har <div id="upst"></div>. Inget sparas utom valen (sessionStorage). */
(function () {
  var R = document.getElementById('upst'); if (!R) return;
  var PLATS = ['entalen', 'tiotalen', 'hundratalen', 'tusentalen', 'tiotusentalen', 'hundratusentalen'];
  var NIVA = { 1: 'Lätt', 2: 'Mellan', 3: 'Svår', 4: 'Decimaltal' };
  var ANTAL = 5, vald = false;
  var S = { typ: 'add', niva: 1, lage: 'steg', metod: 'kort' };
  try { var sp = JSON.parse(sessionStorage.getItem('upst') || '{}'); if (sp.typ) S = Object.assign(S, sp); } catch (e) {}
  function spara() { try { sessionStorage.setItem('upst', JSON.stringify({ typ: S.typ, niva: S.niva, lage: S.lage, metod: S.metod })); } catch (e) {} }

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
    if (S.typ === 'mul') return nyMul();
    if (S.typ === 'div') return nyDiv();
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

  /* ===== multiplikation och kort division (2026-11-21) ===== */
  function F(r, c) { return U.f[r + ':' + c] || ''; }
  function satt(r, c, v) { U.f[r + ':' + c] = v; }
  function inCell(r, c, small, extra) {
    var k = r + ':' + c, v = U.f[k] || '', sel = U.sel && U.sel.r === r && U.sel.c === c;
    var kl = (small ? 'up-car up-sm' : 'up-ans') + (sel ? ' sel' : '') + (U.m[k] ? ' ' + U.m[k] : '') + (skakas === k ? ' skak' : '') + (extra || '');
    return cell('<span>' + v + '</span>', kl, ' data-r="' + r + '" data-c="' + c + '" role="button"');
  }
  function felSkak(r, c) { U.fel++; U.felKol++; skakas = r + ':' + c; U.msgTyp = 'fel'; }
  function hl(k) { return U.hl[k] ? ' akt' : ''; }

  /* --- multiplikation --- */
  function nyMul() {
    for (var f = 0; f < 3000; f++) {
      var a, b, da = 0;
      if (S.niva === 1) { a = talMed(2); b = rnd(2, 9); if (minMul(a, b) < 1) continue; }
      else if (S.niva === 2) { a = talMed(3); b = rnd(3, 9); if (minMul(a, b) < 2) continue; }
      else if (S.niva === 3) { a = talMed(rnd(2, 3)); b = rnd(12, 59); if (b % 10 === 0 || (String(a).length === 3 && b > 39)) continue; }
      else { da = rnd(1, 2); a = rnd(Math.pow(10, da) + 1, (da === 1 ? 999 : 999)); b = rnd(3, 9); if (a % 10 === 0 || minMul(a, b) < 1) continue; }
      return byggMul(a, da, b);
    }
  }
  function minMul(a, b) { var s = String(a), k = 0, n = 0; for (var i = 0; i < s.length; i++) { var p = dig(s, i) * b + k; k = Math.floor(p / 10); if (k && i < s.length - 1) n++; } return n; }
  function byggMul(a, da, b) {
    var sa = siffror(a, da), bs = String(b), rv = a * b, sr = siffror(rv, da);
    var P = { md: 'mul', dec: da, A: [], Bd: [], la: sa.length, rows: bs.length, W: sr.length, r: [], pp: [], ppLen: [], kr: [], ks: [0] };
    for (var i = 0; i < P.la; i++) P.A[i] = dig(sa, i);
    for (var j = 0; j < P.rows; j++) P.Bd[j] = dig(bs, j);
    for (j = 0; j < P.rows; j++) {
      var k = 0, row = []; P.kr[j] = [0];
      for (i = 0; i < P.la; i++) { var p = P.A[i] * P.Bd[j] + k; row[i + j] = p % 10; k = Math.floor(p / 10); P.kr[j][i + 1] = k; }
      if (k) row[P.la + j] = k;
      P.pp[j] = row; P.ppLen[j] = row.length;
    }
    for (var c = 0; c < P.W; c++) P.r[c] = dig(sr, c);
    if (P.rows > 1) for (c = 0; c < P.W; c++) { var s = (P.pp[0][c] || 0) + (c >= 1 ? (P.pp[1][c] || 0) : 0) + P.ks[c]; P.ks[c + 1] = Math.floor(s / 10); }
    P.titel = txt(a, da) + ' · ' + b; P.svar = txt(rv, da);
    P.rk = function (j) { return P.rows === 1 ? 'res' : 'p' + j; };
    return P;
  }
  function mulStart() { U.ph = 'rad'; U.j = 0; U.i = 0; if (S.lage === 'steg') mulSteg(); else { U.sel = { r: P.rk(0), c: 0 }; U.msg = 'Börja längst till höger. Skriv minnessiffror i de små rutorna om du vill.'; U.msgTyp = ''; } }
  function mulSteg() {
    U.felKol = 0; U.hl = {};
    if (U.ph === 'rad') {
      var j = U.j, i = U.i, b = P.Bd[j], rk = P.rk(j);
      if (i < P.la) {
        var k = P.kr[j][i];
        U.hl['a:' + i] = 1; U.hl['b:' + j] = 1;
        U.msg = 'Räkna <b>' + P.A[i] + ' · ' + b + '</b>' + (k ? ' och lägg till minnessiffran <b>' + k + '</b>' : '') + '.';
        U.sel = { r: rk, c: i + j }; U.msgTyp = ''; return;
      }
      if (P.ppLen[j] > P.la + j && !F(rk, P.la + j)) { U.msg = 'Minnessiffran <b>' + P.kr[j][P.la] + '</b> ska också ner. Skriv den längst till vänster i raden.'; U.sel = { r: rk, c: P.la + j }; U.msgTyp = ''; return; }
      if (j + 1 < P.rows) {
        U.j++; U.i = 0; for (var x in U.f) if (/^mc:/.test(x)) delete U.f[x];
        mulSteg(); U.msg = 'Första raden är klar! Nu räknar du med tiotalssiffran <b>' + P.Bd[1] + '</b>. Den grå nollan står där eftersom du räknar med tiotal. ' + U.msg; U.msgTyp = 'ok'; return;
      }
      if (P.rows === 1) return klar();
      U.ph = 'sum'; U.c = 0;
    }
    var c = U.c; if (c >= P.W) return klar();
    var d = [], kk = P.ks[c]; if (P.pp[0][c] !== undefined) d.push(P.pp[0][c]); if (c >= 1 && P.pp[1][c] !== undefined) d.push(P.pp[1][c]); else if (c === 0) d.push(0);
    U.hl['sum:' + c] = 1;
    U.msg = (c === 0 ? 'Nu adderar du raderna. ' : '') + (d.length + (kk ? 1 : 0) === 1 ? 'Flytta ner <b>' + (d[0] !== undefined ? d[0] : kk) + '</b> till svaret.' : 'Räkna <b>' + d.concat(kk ? [kk] : []).join(' + ') + '</b>.');
    U.sel = { r: 'res', c: c }; U.msgTyp = '';
  }
  function mulSiffra(d) {
    var s = U.sel, k;
    if (s.r === 'mc') {
      k = P.kr[U.j][s.c];
      if (d === k) { satt('mc', s.c, String(d)); U.i = s.c; mulSteg(); U.msg = 'Bra! ' + U.msg; } else { felSkak('mc', s.c); U.msg = 'Skriv tiotalet, <b>' + k + '</b>, som minnessiffra.'; }
      return;
    }
    if (s.r === 'sc') {
      if (d === P.ks[s.c]) { satt('sc', s.c, String(d)); U.c = s.c; mulSteg(); U.msg = 'Bra! ' + U.msg; } else { felSkak('sc', s.c); U.msg = 'Skriv <b>' + P.ks[s.c] + '</b> som minnessiffra.'; }
      return;
    }
    if (U.ph === 'rad') {
      var j = U.j, i = U.i, rk = P.rk(j);
      if (i >= P.la) { var e0 = P.kr[j][P.la]; if (d === e0) { satt(rk, s.c, String(d)); U.m[rk + ':' + s.c] = 'ok'; mulSteg(); if (!U.klar) U.msg = 'Rätt! ' + U.msg; } else { felSkak(rk, s.c); U.msg = 'Minnessiffran var <b>' + e0 + '</b>. Skriv den här.'; } return; }
      k = P.kr[j][i]; var p = P.A[i] * P.Bd[j] + k, e = p % 10, kut = Math.floor(p / 10), ex = P.A[i] + ' · ' + P.Bd[j] + (k ? ' + ' + k : '');
      if (d === e) {
        satt(rk, s.c, String(d)); U.m[rk + ':' + s.c] = 'ok';
        if (kut && i + 1 < P.la) { U.sel = { r: 'mc', c: i + 1 }; U.msgTyp = 'ok'; U.msg = 'Rätt! ' + ex + ' = ' + p + '. Skriv <b>' + kut + ':an</b> som minnessiffra i den lilla rutan ovanför nästa siffra.'; return; }
        U.i = i + 1; mulSteg(); if (!U.klar) U.msg = 'Rätt! ' + U.msg; return;
      }
      felSkak(rk, s.c);
      if (p >= 10 && d === kut) U.msg = 'Svaret är ' + p + '. I rutan skriver du bara den sista siffran, <b>' + e + '</b>.' + (i + 1 < P.la ? ' ' + kut + ':an blir minnessiffra.' : '');
      else if (k && d === (p - k) % 10) U.msg = 'Glöm inte minnessiffran ' + k + '! Räkna <b>' + ex + '</b>.';
      else if (U.felKol >= 2) U.msg = ex + ' = ' + p + '. Skriv <b>' + e + '</b>.';
      else U.msg = 'Inte riktigt. Räkna igen: <b>' + ex + '</b>.';
      return;
    }
    var c = U.c, dd = [], kk = P.ks[c]; if (P.pp[0][c] !== undefined) dd.push(P.pp[0][c]); if (c >= 1 && P.pp[1][c] !== undefined) dd.push(P.pp[1][c]);
    var sum = dd.reduce(function (x, y) { return x + y; }, 0) + kk, e2 = sum % 10, ex2 = dd.concat(kk ? [kk] : []).join(' + ') || '0';
    if (d === e2) {
      satt('res', c, String(d)); U.m['res:' + c] = 'ok';
      if (P.ks[c + 1] && c + 1 < P.W) { U.sel = { r: 'sc', c: c + 1 }; U.msgTyp = 'ok'; U.msg = 'Rätt! ' + ex2 + ' = ' + sum + '. Skriv <b>' + P.ks[c + 1] + ':an</b> som minnessiffra i den lilla rutan.'; return; }
      U.c = c + 1; mulSteg(); if (!U.klar) U.msg = 'Rätt! ' + U.msg; return;
    }
    felSkak('res', c);
    U.msg = U.felKol >= 2 ? ex2 + ' = ' + sum + '. Skriv <b>' + e2 + '</b>.' : (sum >= 10 && d === Math.floor(sum / 10) ? 'Svaret är ' + sum + '. Skriv bara den sista siffran.' : 'Inte riktigt. Räkna igen: <b>' + ex2 + '</b>.');
  }
  function mulKontroll() {
    var lista = [];
    if (P.rows > 1) for (var j = 0; j < 2; j++) for (var c = j; c < P.ppLen[j]; c++) lista.push(['p' + j, c, P.pp[j][c]]);
    for (c = 0; c < P.W; c++) lista.push(['res', c, P.r[c]]);
    return lista;
  }
  function mulForklara(r, c) {
    if (r === 'res' && P.rows > 1) { var d = [P.pp[0][c], c >= 1 ? P.pp[1][c] : 0].filter(function (x) { return x !== undefined; }), k = P.ks[c], s = d.reduce(function (x, y) { return x + y; }, 0) + k; return 'Kolla svaret: ' + d.concat(k ? [k] : []).join(' + ') + ' = ' + s + '.'; }
    var j = r === 'res' ? 0 : +r[1], i = c - j;
    if (i >= P.la) return 'Längst till vänster i raden ska minnessiffran ' + P.kr[j][P.la] + ' stå.';
    var k2 = P.kr[j][i], p = P.A[i] * P.Bd[j] + k2;
    return 'Kolla ' + P.A[i] + ' · ' + P.Bd[j] + (k2 ? ' + minnessiffran ' + k2 : '') + ' = ' + p + '. Skriv ' + (p % 10) + (p >= 10 && i + 1 < P.la ? ' och ' + Math.floor(p / 10) + ' som minnessiffra.' : '.');
  }
  function mulGrid() {
    var n = P.W + 1 + (P.dec ? 1 : 0), g = '<div class="up-grid" style="--n:' + n + '">';
    var self = S.lage === 'sjalv';
    g += rad(function (c) { return c >= 1 && c < P.la ? inCell('mc', c, true) : cell('', 'up-tom up-sm'); }, '', 'up-minne');
    g += rad(function (c) { return c < P.la ? cell(String(P.A[c]), 'up-d' + hl('a:' + c)) : cell('', 'up-tom'); }, '', 'komma');
    g += rad(function (c) { return c < P.rows ? cell(String(P.Bd[c]), 'up-d' + hl('b:' + c)) : cell('', 'up-tom'); }, '·', 'up-linje');
    if (P.rows > 1) {
      if (self || U.ph === 'sum' || U.klar) g += rad(function (c) { return c >= 1 && c < P.W ? inCell('sc', c, true) : cell('', 'up-tom up-sm'); }, '', 'up-minne');
      for (var j = 0; j < 2; j++) g += rad((function (j) { return function (c) {
        if (c < j) return cell('0', 'up-d up-pad' + hl('sum:' + c));
        if (c >= P.ppLen[j]) return cell('', 'up-tom' + hl('sum:' + c));
        return inCell('p' + j, c, false, hl('sum:' + c));
      }; })(j), j === 1 ? '+' : '', j === 1 ? 'up-linje' : '');
    }
    g += rad(function (c) { return inCell('res', c, false); }, '', 'komma up-svar');
    return g + '</div>';
  }

  /* --- kort division --- */
  function nyDiv() {
    for (var f = 0; f < 3000; f++) {
      var D, d = rnd(2, 9), dd = 0;
      if (S.niva === 1) { d = rnd(2, 5); D = talMed(2); if (D % d || +String(D)[0] < d) continue; }
      else if (S.niva === 2) { d = rnd(3, 9); D = talMed(3); if (D % d || +String(D)[0] < d || /0/.test(String(D / d))) continue; }
      else if (S.niva === 3) { d = rnd(3, 9); D = talMed(rnd(3, 4)); if (D % d) continue; var q = String(D / d); if (!(+String(D)[0] < d) && !/0/.test(q.slice(0, -1))) continue; if (Math.random() < .5 && !/0/.test(q)) continue; }
      else { d = [2, 4, 5, 8, 2, 4, 5][rnd(0, 6)]; dd = Math.random() < .4 ? 1 : 0; D = dd ? rnd(11, 199) : rnd(5, 99); if (dd && D % 10 === 0) continue; var sk = D * 100; if (sk % d || D % d === 0 || (dd === 0 && D * 10 % d === 0 && Math.random() < .3)) continue; }
      var Pd = byggDiv(D, dd, d); if (S.metod === 'trappa') { P = Pd; Pd.tr = byggTrappa(Pd); } return Pd;
    }
  }
  function byggDiv(D, dd, d) {
    var dq = dd; while ((D * Math.pow(10, dq - dd)) % d) dq++;
    var s = siffror(D * Math.pow(10, dq - dd), dq), nInt = s.length - dq;
    var P = { md: 'div', d: d, dg: [], n: s.length, nInt: nInt, dec: dq, padFran: s.length - (dq - dd), q: [], rin: [0], lead: 0 };
    var r = 0;
    for (var t = 0; t < P.n; t++) { P.dg[t] = +s[t]; var cur = r * 10 + P.dg[t]; P.q[t] = Math.floor(cur / d); r = cur % d; P.rin[t + 1] = r; }
    while (P.lead < P.nInt - 1 && P.q[P.lead] === 0) P.lead++;
    P.titel = txt(D, dd) + ' / ' + d; P.svar = txt(D * Math.pow(10, dq - dd) / d, dq);
    return P;
  }
  function divCur(t) { return P.rin[t] * 10 + P.dg[t]; }
  function divStart() { if (P.tr) return trStart(); U.t = 0; if (S.lage === 'steg') divSteg(); else { U.sel = { r: 'q', c: P.lead }; U.msg = 'Börja längst till vänster. Skriv svaret efter likhetstecknet. Det som blir över skriver du som en liten siffra ovanför, mellan siffrorna.'; U.msgTyp = ''; } }
  function divSteg() {
    U.felKol = 0; U.hl = {};
    var t = U.t, pre = '';
    if (t >= P.n) return klar();
    while (t < P.lead) { pre += '<b>' + P.d + '</b> går inte i <b>' + divCur(t) + '</b>. Då tar du med nästa siffra också. '; t++; }
    U.t = t;
    for (var k = 0; k < P.lead; k++) U.hl['d:' + k] = 1;
    if (t === P.nInt && P.dec) pre += 'Nu passerar du kommat. Kommat kommer med upp i svaret. ' + (t >= P.padFran ? 'De grå nollorna kan du lägga till efter kommat. ' : '');
    else if (t >= P.padFran && t > P.nInt) pre += 'Lägg till en nolla till. ';
    U.hl['d:' + t] = 1;
    U.msg = pre + 'Hur många gånger går <b>' + P.d + '</b> i <b>' + divCur(t) + '</b>?';
    U.sel = { r: 'q', c: t }; U.msgTyp = '';
  }
  function divSiffra(x) {
    if (P.tr) return trSiffra(x);
    var s = U.sel;
    if (s.r === 'rest') {
      var er = P.rin[s.c];
      if (x === er) { satt('rest', s.c, String(x)); U.m['rest:' + s.c] = 'ok'; U.t = s.c; divSteg(); U.msg = 'Bra! ' + U.msg; } else { felSkak('rest', s.c); U.msg = 'Det blev <b>' + er + '</b> kvar. Skriv ' + er + ' i den lilla rutan.'; }
      return;
    }
    var t = U.t, cur = divCur(t), q = P.q[t], r = cur - q * P.d;
    if (x === q) {
      satt('q', t, String(x)); U.m['q:' + t] = 'ok';
      var ex = q + ' · ' + P.d + ' = ' + q * P.d;
      if (t + 1 >= P.n) return klar();
      if (r) { U.sel = { r: 'rest', c: t + 1 }; U.hl = {}; U.hl['d:' + (t + 1)] = 1; U.msgTyp = 'ok'; U.msg = 'Rätt! ' + ex + '. Det blir <b>' + cur + ' − ' + q * P.d + ' = ' + r + '</b> kvar. Skriv ' + r + ':an som en liten siffra ovanför, mellan siffrorna.'; return; }
      U.t = t + 1; divSteg(); U.msg = 'Rätt! ' + ex + ', inget blir kvar. ' + U.msg; return;
    }
    felSkak('q', t);
    if (x * P.d > cur) U.msg = x + ' · ' + P.d + ' = ' + x * P.d + '. Det är mer än ' + cur + '. Prova ett mindre tal.';
    else if (U.felKol >= 2) U.msg = P.d + ' går <b>' + q + '</b> gånger i ' + cur + ', eftersom ' + q + ' · ' + P.d + ' = ' + q * P.d + '.';
    else U.msg = x + ' · ' + P.d + ' = ' + x * P.d + '. Då blir ' + (cur - x * P.d) + ' kvar, och det är mer än ' + P.d + '. ' + P.d + ' går fler gånger.';
  }
  function divKontroll() { var l = []; for (var t = 0; t < P.n; t++) l.push(['q', t, P.q[t], t < P.lead]); return l; }
  function divForklara(r, t) { var cur = divCur(t), q = P.q[t]; return 'Kolla svarssiffran för ' + P.dg[t] + ':an: ' + P.d + ' går ' + q + ' gånger i ' + cur + (P.rin[t] ? ' (med ' + P.rin[t] + ' kvar från förut)' : '') + '. ' + q + ' · ' + P.d + ' = ' + q * P.d + (cur - q * P.d ? ', och ' + (cur - q * P.d) + ' blir kvar.' : '.'); }
  function divGrid() {
    if (P.tr) return trGrid();
    // kort division i bråkform: täljaren över bråkstrecket, nämnaren under, "= svar" till höger
    var komma = function (t) { return P.dec && t === P.nInt - 1; }, steg = S.lage === 'steg';
    var anv = function (t) { return U.klar || (steg && U.m['q:' + Math.max(t, P.lead)] === 'ok'); };
    var r0 = '', r1 = '', sv = '', nk = P.n + (P.dec ? .32 : 0), na = P.n - P.lead + (P.dec ? .32 : 0);
    for (var t = 0; t < P.n; t++) {
      var visaRest = t > P.lead && !(U.klar && !F('rest', t)) && !(steg && !F('rest', t) && !(U.sel && U.sel.r === 'rest' && U.sel.c === t));
      var rest = visaRest ? '<i class="up-rest' + (U.sel && U.sel.r === 'rest' && U.sel.c === t ? ' sel' : '') + (U.m['rest:' + t] ? ' ' + U.m['rest:' + t] : '') + (skakas === 'rest:' + t ? ' skak' : '') + (anv(t) ? ' up-strk' : '') + '" data-r="rest" data-c="' + t + '" role="button" aria-label="Det som blev över">' + F('rest', t) + '</i>' : '';
      r0 += '<div class="up-c up-kr">' + rest + '</div>';
      r1 += cell(String(P.dg[t]), 'up-d up-kt' + (t >= P.padFran ? ' up-pad' : '') + (anv(t) ? ' up-strk' : '') + hl('d:' + t));
      if (komma(t)) { r0 += '<div class="up-c up-km up-kr"></div>'; r1 += '<div class="up-c up-km up-kt">,</div>'; }
      if (t >= P.lead) { sv += inCell('q', t, false); if (komma(t)) sv += '<div class="up-c up-km">,</div>'; }
    }
    return '<div class="up-kd" style="--kdn:' + (nk + na + 1.2) + '"><div class="up-kd-v"><div class="up-rad up-kd-rest">' + r0 + '</div><div class="up-rad up-kd-t">' + r1 + '</div>' +
      '<div class="up-kd-n">' + P.d + '</div></div><div class="up-kd-h"><div class="up-c up-kd-lika">=</div>' + sv + '</div></div>';
  }

  /* ===== trappan (division med subtraktioner under, 2026-11-24) ===== */
  // P.tr = rader under talet: { typ: 'p' (produkt) | 'r' (rest), t, c: {kol: siffra}, ned: {kol: 1}, minus: kol, linje: [från, till] }
  function byggTrappa(P) {
    var rader = [], akt = -1; // -1 = själva talet
    for (var t = P.lead; t < P.n; t++) {
      var cur = divCur(t), q = P.q[t];
      if (q === 0 && t > P.lead) {
        if (t + 1 < P.n) { rader[akt].c[t + 1] = P.dg[t + 1]; rader[akt].ned[t + 1] = 1; }
        continue;
      }
      var p = q * P.d, ps = String(p), cs = String(cur), r = cur - p, pr = { typ: 'p', t: t, c: {}, ned: {}, minus: t - ps.length, linje: [t - Math.max(ps.length, cs.length) + 1, t] };
      for (var i = 0; i < ps.length; i++) pr.c[t - ps.length + 1 + i] = +ps[i];
      var rr = { typ: 'r', t: t, c: {}, ned: {} }; rr.c[t] = r;
      if (t + 1 < P.n) { rr.c[t + 1] = P.dg[t + 1]; rr.ned[t + 1] = 1; }
      rader.push(pr, rr); akt = rader.length - 1;
    }
    return rader;
  }
  function trRad(t, typ) { for (var i = 0; i < P.tr.length; i++) if (P.tr[i].t === t && P.tr[i].typ === typ) return i; return -1; }
  function trKols(i) { return Object.keys(P.tr[i].c).map(Number).sort(function (a, b) { return a - b; }); }
  // raden där talet "cur" för steg t står (-1 = talet högst upp)
  function trAktRad(t) { var a = -1; for (var i = 0; i < P.tr.length; i++) if (P.tr[i].typ === 'r' && P.tr[i].t < t) a = i; return a; }
  function trMarkCur(t) {
    U.hl = {}; var a = trAktRad(t), cs = String(divCur(t)).length;
    for (var k = t - cs + 1; k <= t; k++) U.hl[(a < 0 ? 'd' : 'tr' + a) + ':' + k] = 1;
  }
  function trStart() {
    U.t = P.lead; U.ph = 'q';
    if (S.lage === 'steg') return trSteg(P.lead > 0 ? '<b>' + P.d + '</b> går inte i <b>' + P.dg[0] + '</b>. Då tar du med nästa siffra också. ' : '');
    U.sel = { r: 'q', c: P.lead }; U.msg = 'Skriv svaret ovanför strecket. Skriv gångertalen och det som blir kvar i trappan under talet.'; U.msgTyp = '';
  }
  function trSteg(pre) {
    var t = U.t; U.felKol = 0; U.ph = 'q'; trMarkCur(t);
    if (t === P.nInt && P.dec) pre = (pre || '') + 'Nu passerar du kommat. Sätt kommat i svaret. ';
    U.msg = (pre || '') + 'Hur många gånger går <b>' + P.d + '</b> i <b>' + divCur(t) + '</b>?';
    U.sel = { r: 'q', c: t }; U.msgTyp = '';
  }
  function trNed(t, rad, pre) {
    // flytta ner siffran i kolumn t+1 till raden rad
    U.ph = 'ned'; U.felKol = 0; U.hl = {}; U.hl['d:' + (t + 1)] = 1;
    U.sel = { r: rad < 0 ? 'd' : 'tr' + rad, c: t + 1 };
    U.msg = (pre || '') + 'Flytta ner nästa siffra, <b>' + P.dg[t + 1] + '</b>.' + (t + 1 >= P.padFran ? ' (Den grå nollan.)' : ''); U.msgTyp = 'ok';
  }
  function trSiffra(x) {
    var t = U.t, cur = divCur(t), q = P.q[t], p = q * P.d, r = cur - p, s = U.sel, ip = trRad(t, 'p'), ir = trRad(t, 'r');
    if (U.ph === 'q') {
      if (x !== q) {
        felSkak('q', t);
        if (x * P.d > cur) U.msg = x + ' · ' + P.d + ' = ' + x * P.d + '. Det är mer än ' + cur + '. Prova ett mindre tal.';
        else if (U.felKol >= 2) U.msg = P.d + ' går <b>' + q + '</b> gånger i ' + cur + ', eftersom ' + q + ' · ' + P.d + ' = ' + p + '.';
        else U.msg = x + ' · ' + P.d + ' = ' + x * P.d + '. Då blir ' + (cur - x * P.d) + ' kvar, och det är mer än ' + P.d + '. ' + P.d + ' går fler gånger.';
        return;
      }
      satt('q', t, String(x)); U.m['q:' + t] = 'ok';
      if (q === 0 && t > P.lead) {
        if (t + 1 >= P.n) return klar();
        return trNed(t, trAktRad(t), 'Rätt! ' + P.d + ' går 0 gånger i ' + cur + '. ');
      }
      U.ph = 'p'; U.felKol = 0; U.sel = { r: 'tr' + ip, c: trKols(ip)[0] }; U.msgTyp = 'ok';
      U.msg = 'Rätt! Räkna <b>' + q + ' · ' + P.d + '</b> och skriv svaret under ' + cur + '.';
      return;
    }
    var k = s.r + ':' + s.c;
    if (U.ph === 'p') {
      var e = P.tr[ip].c[s.c];
      if (x !== e) { felSkak(s.r, s.c); U.msg = U.felKol >= 2 || String(p).length > 1 ? q + ' · ' + P.d + ' = <b>' + p + '</b>. Skriv ' + p + ' under ' + cur + (String(p).length > 1 ? ', en siffra i varje ruta.' : '.') : 'Inte riktigt. Räkna <b>' + q + ' · ' + P.d + '</b>.'; return; }
      satt(s.r, s.c, String(x)); U.m[k] = 'ok';
      var ks = trKols(ip), nx = ks[ks.indexOf(s.c) + 1];
      if (nx !== undefined) { U.sel = { r: s.r, c: nx }; U.msgTyp = 'ok'; U.msg = 'Bra! Skriv nästa siffra i ' + p + '.'; return; }
      U.ph = 'r'; U.felKol = 0; U.sel = { r: 'tr' + ir, c: t }; U.hl = {}; U.msgTyp = 'ok';
      U.msg = 'Rätt! Subtrahera: <b>' + cur + ' − ' + p + '</b>. Hur mycket blir kvar?';
      return;
    }
    if (U.ph === 'r') {
      if (x !== r) { felSkak(s.r, s.c); U.msg = U.felKol >= 2 ? cur + ' − ' + p + ' = <b>' + r + '</b>.' : 'Inte riktigt. Räkna <b>' + cur + ' − ' + p + '</b>.'; return; }
      satt(s.r, s.c, String(x)); U.m[k] = 'ok';
      if (t + 1 >= P.n) return klar(r === 0 ? 'Det blir 0 kvar.' : '');
      return trNed(t, ir, 'Rätt! ' + cur + ' − ' + p + ' = ' + r + '. ');
    }
    if (U.ph === 'ned') {
      if (x !== P.dg[t + 1]) { felSkak(s.r, s.c); U.msg = 'Titta på talet högst upp. Nästa siffra efter den du nyss använde är <b>' + P.dg[t + 1] + '</b>.'; return; }
      satt(s.r, s.c, String(x)); U.m[k] = 'ok';
      U.t = t + 1; trSteg('Bra! ');
    }
  }
  function trFyll() { P.tr.forEach(function (rd, i) { Object.keys(rd.c).forEach(function (c) { U.f['tr' + i + ':' + c] = String(rd.c[c]); U.m['tr' + i + ':' + c] = 'ok'; }); }); }
  function trGrid() {
    var self = S.lage === 'sjalv', g = '<div class="up-grid up-div up-trappa">';
    var kol = function (fn) { var h = ''; for (var k = -2; k < P.n; k++) { h += fn(k); if (P.dec && k === P.nInt - 1) h += fn('km'); } return h; };
    var tom = function (x) { return cell(x || '', 'up-tom'); };
    g += '<div class="up-rad">' + kol(function (k) { return k === 'km' ? '<div class="up-c up-km">,</div>' : k < 0 ? tom() : inCell('q', k, false, (U.klar && k < P.lead ? ' up-tomsvar' : '')); }) + '</div>';
    g += '<div class="up-rad">' + kol(function (k) {
      if (k === 'km') return '<div class="up-c up-km up-ddv">,</div>';
      if (k === -2) return cell(String(P.d), 'up-d up-dd');
      if (k === -1) return cell(')', 'up-dstol');
      return cell(String(P.dg[k]), 'up-d up-ddv' + (k >= P.padFran ? ' up-pad' : '') + hl('d:' + k));
    }) + '</div>';
    P.tr.forEach(function (rd, i) {
      var key = 'tr' + i, syns = self || U.klar || (U.sel && U.sel.r === key) || Object.keys(rd.c).some(function (c) { return F(key, c) !== ''; });
      if (!syns) return;
      g += '<div class="up-rad up-tr up-tr-' + rd.typ + '">' + kol(function (k) {
        if (k === 'km') return '<div class="up-c up-km' + (rd.linje && P.nInt - 1 >= rd.linje[0] && P.nInt - 1 < rd.linje[1] ? ' up-trl' : '') + '"></div>';
        var lin = rd.linje && k >= rd.linje[0] && k <= rd.linje[1] ? ' up-trl' : '';
        if (rd.c[k] !== undefined) {
          var visa = self || U.klar || F(key, k) !== '' || (U.sel && U.sel.r === key && U.sel.c === k);
          return visa ? inCell(key, k, false, lin + (rd.ned[k] ? ' up-ned' : '') + hl(key + ':' + k)) : cell('', 'up-tom' + lin);
        }
        if (k === rd.minus) return cell('−', 'up-tom up-trm' + lin);
        return cell('', 'up-tom' + lin);
      }) + '</div>';
    });
    return g + '</div>';
  }

  /* gemensamt för mul/div */
  function mdStart() { U.f = {}; U.m = {}; U.hl = {}; (P.md === 'mul' ? mulStart : divStart)(); }
  function mdKontroll() { return P.md === 'mul' ? mulKontroll() : divKontroll(); }
  function mdRatta() {
    var forst = null, antal = 0;
    mdKontroll().forEach(function (x) { var k = x[0] + ':' + x[1], u = U.f[k] || '', ok = u === String(x[2]) || (x[3] && (u === '' || u === '0')); U.m[k] = ok ? 'ok' : 'fel'; if (!ok) { antal++; if (!forst || P.md === 'mul') { if (!forst) forst = x; } } });
    if (!forst) { klar(); return rita(); }
    U.fel++;
    U.msg = (antal === 1 ? 'Nästan! En ruta är fel. ' : 'Det blev fel i ' + antal + ' rutor. ') + (P.md === 'mul' ? mulForklara(forst[0], forst[1]) : divForklara(forst[0], forst[1])) + ' Ändra och tryck Rätta igen.';
    U.msgTyp = 'fel'; U.sel = { r: forst[0], c: forst[1] }; rita();
  }
  function mdFyll() { if (P.tr) trFyll(); else if (P.md === 'div') for (var t = 1; t < P.n; t++) { var e = t > P.lead && P.rin[t] ? String(P.rin[t]) : ''; satt('rest', t, e); U.m['rest:' + t] = e ? 'ok' : ''; } mdKontroll().forEach(function (x) { var k = x[0] + ':' + x[1]; if (!x[3]) U.f[k] = String(x[2]); U.m[k] = 'ok'; }); U.hl = {}; }
  function mdSjalvSiffra(d) {
    var s = U.sel; satt(s.r, s.c, String(d)); U.m[s.r + ':' + s.c] = ''; (U.skr = U.skr || []).push({ r: s.r, c: s.c });
    if (s.r === 'q') { if (s.c + 1 < P.n) U.sel = { r: 'q', c: s.c + 1 }; }
    else if (/^tr/.test(s.r)) { var ks = trKols(+s.r.slice(2)), nx = ks[ks.indexOf(s.c) + 1]; if (nx !== undefined) U.sel = { r: s.r, c: nx }; }
    else if (s.r === 'res' || s.r === 'p0' || s.r === 'p1') { var max = s.r === 'res' ? P.W : P.ppLen[+s.r[1]]; if (s.c + 1 < max) U.sel = { r: s.r, c: s.c + 1 }; }
  }

  /* --- tillstånd --- */
  var P, U, runda = [], nr = 0;
  function nyUppgift() {
    P = nyttTal();
    if (P.md) { U = { f: {}, m: {}, hl: {}, sel: null, fel: 0, felKol: 0, klar: false, msg: '', msgTyp: '' }; mdStart(); rita(); return; }
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
    if (P.md) return mdRatta();
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
    if (P.md) mdFyll(); else for (var c = 0; c < P.W; c++) { if (!U.ans[c] && !ledande(c)) U.ans[c] = String(P.r[c]); U.mark[c] = 'ok'; }
    runda[nr] = U.fel ? 'halv' : 'hel';
    U.msg = (extra ? extra + ' ' : '') + '<b>Rätt! ' + P.titel + ' = ' + P.svar + '</b>' + (U.fel ? '' : ' Helt utan fel!');
    U.msgTyp = 'klar';
  }

  /* --- inmatning --- */
  function siffra(d) {
    if (!P || U.klar || !U.sel) { if (!U.klar && S.lage === 'steg' && U.mal !== null) meddela(U.msg, 'vx'); return; }
    if (P.md) { if (S.lage === 'steg') (P.md === 'mul' ? mulSiffra : divSiffra)(d); else mdSjalvSiffra(d); rita(); return; }
    if (S.lage === 'steg') { stegSiffra(d); rita(); return; }
    var c = U.sel.c;
    (U.skr = U.skr || []).push({ r: U.sel.r, c: c });
    if (U.sel.r === 'car') { U.car[c] = String(d); U.sel = { r: 'ans', c: c }; }
    else { U.ans[c] = String(d); U.mark[c] = ''; if (c + 1 < P.W) U.sel = { r: 'ans', c: c + 1 }; }
    rita();
  }
  function sudda() {
    if (!U.sel || U.klar || S.lage === 'steg') return;
    // Som backsteg: är den markerade rutan tom, gå tillbaka till den senast skrivna siffran och sudda den.
    var varde = function (x) { return P.md ? F(x.r, x.c) : (x.r === 'car' ? U.car[x.c] : U.ans[x.c]); };
    var skr = U.skr || [];
    if (!varde(U.sel)) { while (skr.length && !varde(skr[skr.length - 1])) skr.pop(); if (skr.length) U.sel = skr.pop(); }
    if (P.md) { satt(U.sel.r, U.sel.c, ''); U.m[U.sel.r + ':' + U.sel.c] = ''; return rita(); }
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
    if (!vald) return rita_start();
    h += valRad();
    if (nr >= ANTAL) { rita_slut(h); return; }
    // progress
    h += '<div class="up-kort"><div class="up-topp"><span class="up-uppg">Tal ' + (nr + 1) + ' av ' + ANTAL + '</span><span class="up-prog">' +
      Array.apply(null, Array(ANTAL)).map(function (_, i) { return '<i class="' + (runda[i] || (i === nr ? 'nu' : '')) + '"></i>'; }).join('') + '</span></div>';
    h += '<p class="up-fraga">Räkna med uppställning: <b>' + P.titel + '</b></p>';
    // rutnät
    var g = '<div class="up-grid' + (S.lage === 'steg' && !U.klar ? ' steg' : '') + '" style="--n:' + (P.W + 1 + (P.dec ? 1 : 0)) + '">';
    if (P.md) g = (P.md === 'mul' ? mulGrid() : divGrid()) + '<!--';
    if (P.add) {
      g += rad(function (c) {
        if (c === 0) return cell('', 'up-tom up-sm');
        var v = U.car[c] || '', kl = 'up-car' + (U.sel && U.sel.r === 'car' && U.sel.c === c ? ' sel' : '') + (skakas === 'car' + c ? ' skak' : '');
        return cell('<span>' + v + '</span>', kl + ' up-sm', ' data-r="car" data-c="' + c + '" role="button" aria-label="Minnessiffra ovanför ' + namn(c, P.dec) + '"');
      }, '', 'up-minne');
      g += rad(function (c) { return siffCell(P.A[c], P.Apad[c]); }, '', 'komma');
      g += rad(function (c) { return siffCell(P.B[c], P.Bpad[c]); }, '+', 'komma up-linje');
    } else if (!P.md) {
      g += rad(function (c) { var ch = U.tv[c] !== (P.A[c] || 0); return cell(ch ? '<span>' + U.tv[c] + '</span>' : '', 'up-not up-sm'); }, '', 'up-minne');
      g += rad(function (c) {
        if (P.A[c] === null) return cell('', 'up-tom');
        var ch = U.tv[c] !== (P.A[c] || 0), mal = U.mal === c;
        return cell(String(P.A[c]), 'up-d up-top' + (P.Apad[c] ? ' up-pad' : '') + (ch ? ' strk' : '') + (mal ? ' mal' : ''), ' data-r="top" data-c="' + c + '" role="button" aria-label="Växla från ' + namn(c, P.dec) + '"');
      }, '', 'komma');
      g += rad(function (c) { return siffCell(P.B[c], P.Bpad[c]); }, '−', 'komma up-linje');
    }
    if (!P.md) g += rad(function (c) {
      var v = U.ans[c] || '', kl = 'up-ans' + (U.sel && U.sel.r === 'ans' && U.sel.c === c ? ' sel' : '') + (U.mark[c] ? ' ' + U.mark[c] : '') + (U.okKol[c] && S.lage === 'steg' ? ' ok' : '') + (skakas === 'ans' + c ? ' skak' : '') + (U.klar && ledande(c) ? ' up-tomsvar' : '');
      return cell('<span>' + v + '</span>', kl, ' data-r="ans" data-c="' + c + '" role="button" aria-label="Svar, ' + namn(c, P.dec) + '"');
    }, '', 'komma up-svar');
    // markera aktuell kolumn i steg-läget
    g += '</div>';
    if (P.md) g = g.split('<!--')[0];
    h += '<div class="up-yta">' + g + '</div>';
    h += '<div class="up-msg ' + U.msgTyp + '" aria-live="polite">' + U.msg + '</div>';
    if (U.klar) h += '<div class="up-knappar"><button class="up-nasta" data-g="nasta">' + (nr + 1 < ANTAL ? 'Nästa tal →' : 'Se resultatet →') + '</button></div>';
    else {
      h += '<div class="up-pad-wrap"><div class="up-tangent">' + [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (d) { return '<button data-d="' + d + '">' + d + '</button>'; }).join('') +
        (S.lage === 'sjalv' ? '<button data-g="sudda" class="up-gra" aria-label="Sudda">⌫</button>' : '<span></span>') + '<button data-d="0">0</button>' +
        (S.lage === 'sjalv' ? '<button data-g="ratta" class="up-ratta">Rätta</button>' : '<span></span>') + '</div>' +
        (S.typ === 'sub' && S.lage === 'sjalv' && U.hist.length ? '<button class="up-angra" data-g="angra">↶ Ångra växling</button>' : '') + '</div>';
    }
    h += '</div>';
    h += hjalp();
    R.innerHTML = h;
    // aktuell kolumn
    if (!P.md && S.lage === 'steg' && !U.klar && U.cur < P.W) {
      var kol = U.cur;
      R.querySelectorAll('.up-rad').forEach(function (rd) { var cs = rd.querySelectorAll('.up-c:not(.up-km):not(.up-tk)'); var el = cs[P.W - 1 - kol]; if (el) el.classList.add('akt'); });
    }
    skakas = null;
  }
  function hjalp() {
    if (S.typ === 'mul') return '<details class="up-hj"><summary>Så gör du</summary><ol><li>Börja längst till höger. Multiplicera siffran i det undre talet med varje siffra i det övre talet, en i taget.</li><li>Blir det 10 eller mer? Skriv den sista siffran och sätt tiotalet som <b>minnessiffra</b> ovanför nästa siffra. Lägg till minnessiffran efter nästa multiplikation.</li><li>Har det undre talet två siffror? Gör en rad för varje siffra. Den andra raden börjar med en nolla, eftersom du räknar med tiotal. Addera sedan raderna.</li><li>Decimaltal: räkna som om kommat inte fanns. Svaret får lika många decimaler som talet.</li></ol></details>';
    if (S.typ === 'div' && S.metod === 'trappa') return '<details class="up-hj"><summary>Så gör du</summary><ol><li>Börja längst till vänster. Hur många gånger går talet du delar med i siffran? Skriv svaret ovanför strecket.</li><li>Gångra: skriv svaret gånger talet du delar med under siffran.</li><li>Subtrahera. Det som blir kvar skriver du under strecket.</li><li>Flytta ner nästa siffra och skriv den bredvid. Börja om med det nya talet.</li><li>Går det inte en enda gång? Skriv 0 i svaret och flytta ner nästa siffra.</li><li>Blir det något kvar på slutet? Sätt ett komma och lägg till nollor. Kommat kommer med upp i svaret.</li></ol></details>';
    if (S.typ === 'div') return '<details class="up-hj"><summary>Så gör du</summary><ol><li>Börja längst till vänster i talet ovanför strecket. Hur många gånger går talet under strecket i siffran? Skriv svaret efter likhetstecknet.</li><li>Det som blir över skriver du som en liten siffra ovanför, mellan siffrorna. Då blir det ett nytt tal, till exempel 2 och 6 blir 26.</li><li>Går det inte en enda gång? Ta med nästa siffra också. Mitt i talet skriver du 0 i svaret.</li><li>Blir det något över på slutet? Sätt ett komma och lägg till nollor. Kommat kommer med i svaret.</li></ol></details>';
    return '<details class="up-hj"><summary>Så gör du</summary>' + (S.typ === 'add'
      ? '<ol><li>Börja alltid längst till höger, med entalen.</li><li>Räkna ihop siffrorna i kolumnen.</li><li>Blir det 10 eller mer? Skriv den sista siffran i svaret. Skriv 1:an som <b>minnessiffra</b> i den lilla rutan ovanför nästa kolumn.</li><li>Räkna med minnessiffran i nästa kolumn.</li><li>Decimaltal: kommatecknen står under varandra. Grå nollor fyller ut så att talen har lika många decimaler.</li></ol>'
      : '<ol><li>Börja alltid längst till höger, med entalen.</li><li>Räkna den övre siffran minus den undre.</li><li>Är den övre siffran mindre? Då måste du <b>växla</b>. Tryck på siffran till vänster i det övre talet. Den blir 1 mindre, och din siffra får 10 till.</li><li>Står det 0 till vänster? Växla först från siffran längre till vänster.</li><li>Decimaltal: kommatecknen står under varandra. Grå nollor fyller ut så att talen har lika många decimaler.</li></ol>') + '</details>';
  }
  var METOD = [['kort', 'Kort division', 'Resten som liten siffra'], ['trappa', 'Trappan', 'Subtrahera under talet']];
  var SATT = [['add', '+', 'Addition'], ['sub', '−', 'Subtraktion'], ['mul', '·', 'Multiplikation'], ['div', '÷', 'Division']];
  function rita_start() {
    R.innerHTML = '<div class="v-box"><span class="v-et">1. Välj räknesätt</span><div class="v-satt" role="group" aria-label="Räknesätt">' +
      SATT.map(function (x) { return '<button data-typ="' + x[0] + '" class="' + (S.typ === x[0] ? 'on' : '') + '" aria-pressed="' + (S.typ === x[0]) + '"><b aria-hidden="true">' + x[1] + '</b><span>' + x[2] + '</span></button>'; }).join('') + '</div>' +
      '<div class="v-tva"><div><span class="v-et">2. Välj nivå</span><div class="v-seg" role="group" aria-label="Nivå">' +
      [1, 2, 3, 4].map(function (n) { return '<button data-niva="' + n + '" class="' + (S.niva === n ? 'on' : '') + '" aria-pressed="' + (S.niva === n) + '">' + (n === 4 ? 'Decimal&shy;tal' : NIVA[n]) + '</button>'; }).join('') + '</div></div>' +
      '<div><span class="v-et">3. Hur vill du räkna?</span><div class="v-seg" role="group" aria-label="Hjälp">' +
      [['steg', 'Steg för steg', 'Du får hjälp'], ['sjalv', 'Själv', 'Utan hjälp']].map(function (x) { return '<button data-lage="' + x[0] + '" class="' + (S.lage === x[0] ? 'on' : '') + '" aria-pressed="' + (S.lage === x[0]) + '">' + x[1] + '<small>' + x[2] + '</small></button>'; }).join('') + '</div></div></div>' +
      (S.typ === 'div' ? '<div class="v-metod"><span class="v-et">4. Välj metod</span><div class="v-seg" role="group" aria-label="Metod">' +
        METOD.map(function (x) { return '<button data-metod="' + x[0] + '" class="' + (S.metod === x[0] ? 'on' : '') + '" aria-pressed="' + (S.metod === x[0]) + '">' + x[1] + '<small>' + x[2] + '</small></button>'; }).join('') + '</div></div>' : '') +
      '<div class="v-start"><button data-g="borja">Börja räkna →</button></div></div>';
  }
  function valRad() {
    var t = SATT.filter(function (x) { return x[0] === S.typ; })[0];
    return '<div class="v-bar"><span class="v-chip"><b>' + t[1] + ' ' + t[2] + '</b> · ' + NIVA[S.niva] + (S.typ === 'div' && S.metod === 'trappa' ? ' · Trappan' : '') + ' · ' + (S.lage === 'steg' ? 'Steg för steg' : 'Själv') + '</span><button class="v-byt" data-g="byt">Byt övning</button></div>';
  }
  function rita_slut(h) {
    var hela = runda.filter(function (x) { return x === 'hel'; }).length;
    h += '<div class="up-kort up-slut"><h2>Bra jobbat!</h2><p>Du har räknat ' + ANTAL + ' tal. <b>' + hela + '</b> av dem blev rätt direkt, utan fel.</p><div class="up-stj">' +
      runda.map(function (x) { return x === 'hel' ? '★' : '<i>★</i>'; }).join('') + '</div>' +
      '<p>' + (hela === ANTAL ? (S.niva < 4 ? 'Prova en svårare nivå, eller prova att räkna <b>Själv</b>.' : 'Snyggt! Prova att räkna <b>Själv</b> utan hjälp.') : 'Träna en runda till, så blir det lättare.') + '</p>' +
      '<div class="up-knappar"><button class="v-byt" data-g="byt">Byt övning</button><button class="up-nasta" data-g="igen">Spela igen</button></div></div>';
    R.innerHTML = h;
  }

  R.addEventListener('click', function (e) {
    var b = e.target.closest('button,[data-r]'); if (!b) return;
    if (b.dataset.typ) { S.typ = b.dataset.typ; spara(); return rita_start(); }
    if (b.dataset.niva) { S.niva = +b.dataset.niva; spara(); return rita_start(); }
    if (b.dataset.metod) { S.metod = b.dataset.metod; spara(); return rita_start(); }
    if (b.dataset.lage) { S.lage = b.dataset.lage; spara(); return rita_start(); }
    if (b.dataset.d !== undefined) return siffra(+b.dataset.d);
    var g = b.dataset.g;
    if (g === 'borja') { vald = true; nyRunda(); R.scrollIntoView({ block: 'start', behavior: 'smooth' }); return; }
    if (g === 'byt') { vald = false; rita_start(); return; }
    if (g === 'sudda') return sudda();
    if (g === 'ratta') return ratta();
    if (g === 'angra') return angra();
    if (g === 'nasta') { nr++; if (nr < ANTAL) nyUppgift(); else rita(); return; }
    if (g === 'igen') return nyRunda();
    if (b.dataset.r && !U.klar) {
      var c = +b.dataset.c;
      if (b.dataset.r === 'top' && !P.md) return vaxla(c);
      if (S.lage === 'sjalv') { U.sel = { r: b.dataset.r, c: c }; rita(); }
      else if (P.md) return;
    }
  });
  var AR = '٠١٢٣٤٥٦٧٨٩', FA = '۰۱۲۳۴۵۶۷۸۹';
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || !vald || !P || nr >= ANTAL) return;
    var k = e.key, i = AR.indexOf(k); if (i < 0) i = FA.indexOf(k); if (i >= 0) k = String(i);
    if (/^[0-9]$/.test(k)) { e.preventDefault(); return siffra(+k); }
    if (k === 'Backspace') { e.preventDefault(); return sudda(); }
    if (k === 'Enter') { if (U.klar) { e.preventDefault(); nr++; if (nr < ANTAL) nyUppgift(); else rita(); } else if (S.lage === 'sjalv') { e.preventDefault(); ratta(); } return; }
    if (!P.md && S.lage === 'sjalv' && U.sel && (k === 'ArrowLeft' || k === 'ArrowRight')) { e.preventDefault(); var c = U.sel.c + (k === 'ArrowLeft' ? 1 : -1); if (c >= 0 && c < P.W) { U.sel = { r: 'ans', c: c }; rita(); } }
  });
  rita_start();
  window.__upst = { P: function () { return P; }, U: function () { return U; }, S: S, K: function () { return P && P.md ? mdKontroll() : []; } };
})();
