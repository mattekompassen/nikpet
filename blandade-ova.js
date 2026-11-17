// Interaktiva övningar till Blandade uppgifter (blockmodellen-blandade.html → blockmodellen-ova-blandade.html?l=N).
// Samma tre uppgifter som i genomgångens PPT (Exempel, I par, Själv): samma sammanhang och modell, bara nya tal.
// Motor: blockmodell-ova.js (läser BM_LEKTIONER_FN). 2026-11-17
window.BM_LEKTIONER_FN = function (H) {
  const { R, P, F, tal, EN_DEL, gen } = H;
  const V = (rub, q, alt, klar, sedan) => ({ typ: 'val', rub, q, alt, klar, sedan });
  const T = (rub, q, svar, tips, klar, sedan, enh) => ({ typ: 'tal', rub, q, svar, tips, klar, sedan, enh });
  const mult = (m, a, b) => m * R(Math.ceil(a / m), Math.floor(b / m));
  const ORD = { 2: 'två', 3: 'tre', 4: 'fyra', 5: 'fem', 6: 'sex', 7: 'sju' };
  const L = {};

  // 1 Campingproblemet: del av det hela, sedan del av de andra
  function camping(c) {
    const u = R(c.u[0], c.u[1]), K = (c.p2 - 1) * u, V2 = c.p2 * u, Tot = V2 * c.p1 / (c.p1 - 1), h = V2 / (c.p1 - 1);
    const sista = c.p1 == 2 ? [`${c.a} är lika många som ${c.b}. Multiplicera: 2 · ${V2}.`, [{ e: 'r', h: `2 · ${V2} = ${Tot}` }]]
      : [`${c.b} är ${c.p1 - 1} av ${c.p1} delar. En del: ${V2} / ${c.p1 - 1} = ${h}. Allt: ${c.p1} · ${h}.`, [{ e: 'r', h: `${F(V2, c.p1 - 1)} = ${h}` }, { e: 'r', h: `${c.p1} · ${h} = ${Tot}` }]];
    return { titel: c.titel, text: c.text(K), fraga: c.fraga, rader: [{ n: c.hel, f: 'g' }], start: [{ e: 'kl', id: 'q', rad: 0, t: '?', pos: 'o', niva: 2 }],
      steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', [`Antal ${c.alla} totalt`, `Antal ${c.b}`, `Antal ${c.a}`], `Vi söker antal ${c.alla} totalt.`),
        { typ: 'delar', rub: 'Rita blocket', q: `${c.ord1} av ${c.allaB} är ${c.a}. Hur många lika stora delar ska blocket ha?`, rader: [{ rad: 0, n: c.p1 }],
          tips: `${c.ord1} betyder att vi delar blocket i ${c.p1} lika stora delar.`, klar: `${c.p1} delar: ${c.a} och ${c.b}.`,
          sedan: [{ e: 'fyll', rad: 0, fr: 0, ti: 0, t: c.a }, { e: 'stil', rad: 0, fr: 0, ti: 0, s: 'f:b' }, { e: 'kl', id: 'v', rad: 0, fr: 1, ti: c.p1 - 1, t: c.b, pos: 'o' }] },
        T('Rita blocket', c.q3, c.p2, `${c.ord2} betyder ${c.p2} lika stora delar.`, `De ${c.b} delas i ${c.p2} delar.`,
          [{ e: 'dela', rad: 0, fr: 1, ti: c.p1 - 1, n: c.p2 }, { e: 'fyll', rad: 0, fr: 1, ti: 1, t: c.c }, { e: 'stil', rad: 0, fr: 1, ti: 1, s: 'f:y' }, { e: 'kl', id: 'v', rad: 0, fr: 1, ti: c.p2, t: c.b, pos: 'o' }]),
        { typ: 'markera', rub: 'Skriv in det du vet', q: c.q4(K), rad: 0, antal: c.p2 - 1, plats: 2,
          tips: `${c.c} är en del. De andra ${c.p2 - 1} delarna av de ${c.b} är ${K}.`, klar: `${c.p2 - 1} delar är ${K}.`,
          sedan: [{ e: 'stil', rad: 0, fr: 2, ti: c.p2, s: 'kand' }, { e: 'kl', id: 'k', rad: 0, fr: 2, ti: c.p2, t: tal(K), pos: 'u' }] },
        T('Hur mycket är en del?', 'Hur många är det i varje ruta?', u, `${K} fördelas på ${c.p2 - 1} rutor. Dividera ${K} med ${c.p2 - 1}.`, `Det är ${u} i varje ruta.`,
          [{ e: 'fyll', rad: 0, fr: 1, ti: c.p2, t: tal(u) }, { e: 'r', h: `${F(K, c.p2 - 1)} = ${u}` }]),
        T('Räkna vidare', `Hur många ${c.b} är det?`, V2, `De ${c.b} är ${c.p2} rutor: ${c.p2} · ${u}.`, `Det är ${V2} ${c.b}.`,
          [{ e: 'kl', id: 'v', rad: 0, fr: 1, ti: c.p2, t: tal(V2), pos: 'o' }, { e: 'r', h: `${c.p2} · ${u} = ${V2}` }]),
        T('Räkna ut det du söker', `Hur många ${c.alla} är det totalt?`, Tot, sista[0], `Det är ${Tot} ${c.alla} totalt.`,
          [{ e: 'fyll', rad: 0, fr: 0, ti: 0, t: tal(Tot - V2) }, { e: 'kl', id: 'q', rad: 0, t: tal(Tot), pos: 'o', niva: 2 }].concat(sista[1]))],
      svar: c.svar(Tot), koll: c.koll(Tot, V2, u, K) };
  }
  L[1] = { titel: 'Campingproblemet', omr: 'brak', uppg: [
    () => camping({ titel: 'Campingen', p1: 2, p2: 3, u: [8, 30], hel: 'Gäster', alla: 'gäster', allaB: 'gästerna', a: 'barn', b: 'vuxna', c: 'tält', ord1: 'Hälften', ord2: 'En tredjedel',
      text: K => `På en camping är hälften av gästerna barn. En tredjedel av de vuxna sover i tält och ${K} vuxna sover i husvagn.`, fraga: 'Hur många gäster är det totalt?',
      q3: 'En tredjedel av de vuxna sover i tält. I hur många lika stora delar delar vi de vuxnas block?', q4: K => `${K} vuxna sover i husvagn. Klicka på de delar som är husvagn.`,
      svar: t => `Det är ${t} gäster totalt.`, koll: (t, v, u) => `Hälften av ${t} är ${v} vuxna. En tredjedel av ${v} är ${u} i tält. ${v} − ${u} = ${v - u} i husvagn.` }),
    () => camping({ titel: 'Bion', p1: 3, p2: 4, u: [5, 20], hel: 'Besökare', alla: 'besökare', allaB: 'besökarna', a: 'barn', b: 'vuxna', c: 'pens.', ord1: 'En tredjedel', ord2: 'En fjärdedel',
      text: K => `På en bio är en tredjedel av besökarna barn. En fjärdedel av de vuxna är pensionärer och ${K} vuxna är inte pensionärer.`, fraga: 'Hur många besökare är det totalt?',
      q3: 'En fjärdedel av de vuxna är pensionärer. I hur många lika stora delar delar vi de vuxnas block?', q4: K => `${K} vuxna är inte pensionärer. Klicka på de delarna.`,
      svar: t => `Det är ${t} besökare på bion.`, koll: (t, v, u) => `En tredjedel av ${t} är ${t - v} barn. ${t} − ${t - v} = ${v} vuxna. En fjärdedel av ${v} är ${u}. ${v} − ${u} = ${v - u}.` }),
    () => camping({ titel: 'Klassen', p1: 2, p2: 4, u: [3, 12], hel: 'Elever', alla: 'elever', allaB: 'eleverna', a: 'flickor', b: 'pojkar', c: 'glas.', ord1: 'Hälften', ord2: 'En fjärdedel',
      text: K => `I en klass är hälften av eleverna flickor. En fjärdedel av pojkarna har glasögon och ${K} pojkar har inte glasögon.`, fraga: 'Hur många elever går i klassen?',
      q3: 'En fjärdedel av pojkarna har glasögon. I hur många lika stora delar delar vi pojkarnas block?', q4: K => `${K} pojkar har inte glasögon. Klicka på de delarna.`,
      svar: t => `Det går ${t} elever i klassen.`, koll: (t, v, u) => `Hälften av ${t} är ${v} pojkar. En fjärdedel av ${v} är ${u} med glasögon. ${v} − ${u} = ${v - u}.` })] };

  // 2 Pärlproblemet: gånger så många, ge bort så att det blir lika
  function parl(c) {
    const u = R(c.u[0], c.u[1]), m = (c.k - 1) / 2, g = m * u, Tot = (c.k + 1) * u, A = c.A, B = c.B, k = c.k;
    return { titel: c.titel, text: `${A} har ${ORD[k]} gånger så många ${c.sak} som ${B}. Om ${A} ger ${B} ${g} ${c.sak} så har de lika många.`, fraga: `Hur många ${c.sak} har de tillsammans?`,
      rader: [{ n: B, f: 'b' }, { n: A, f: 'g' }],
      steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', [`Hur många ${c.sak} de har tillsammans`, `Hur många ${c.sak} ${A} har`, `Hur många ${c.sak} ${B} har`], `Vi söker hur många ${c.sak} de har tillsammans.`),
        { typ: 'delar', rub: 'Rita blocken', q: `${B} har minst och får 1 block. ${A} har ${ORD[k]} gånger så många. Hur många block får ${A}?`, rader: [{ rad: 0, n: 1, fast: 1 }, { rad: 1, n: k }],
          tips: `${ORD[k][0].toUpperCase() + ORD[k].slice(1)} gånger så många betyder ${k} lika stora block.`, klar: `${A} får ${k} block.` },
        { typ: 'markera', rub: 'Hur många block flyttar vi?', q: `${A} ger ${B} ${g} ${c.sak}. Sedan har de lika många. Klicka på de block som ${A} ger till ${B}.`, rad: 1, antal: m, plats: k - m,
          tips: `Tillsammans har de ${k + 1} block. Lika många betyder ${(k + 1) / 2} block var. ${A} har ${k} block och ger bort ${m}.`, klar: `${A} ger ${m} ${m == 1 ? 'block' : 'block'}, och ${m == 1 ? 'det är' : 'de är'} ${g} ${c.sak}.`,
          sedan: [{ e: 'stil', rad: 1, fr: k - m, ti: k - 1, s: 'stryk' }, { e: 'lagg', rad: 0, n: m, s: 'ny' }, { e: 'kl', id: 'g', rad: 1, fr: k - m, ti: k - 1, t: tal(g), pos: 'o' }] },
        m == 1 ? T('Hur mycket är ett block?', 'Hur många är det i varje block?', u, `Ett block är ${g}.`, `Ett block är ${u}.`, [{ e: 'fyll', rad: '*', t: tal(u) }])
          : EN_DEL(g, m, u, ''),
        T('Vad ska vi ta reda på?', 'Hur många block har de tillsammans?', k + 1, `${A} har ${k} block och ${B} 1 block från början. De flyttade blocken räknas bara en gång.`, `Tillsammans är det ${k + 1} block.`, [{ e: 'hog', t: '?' }]),
        T('Räkna ut det du söker', `Hur många ${c.sak} har de tillsammans?`, Tot, `${k + 1} block: ${k + 1} · ${u}.`, `De har ${Tot} ${c.sak} tillsammans.`, [{ e: 'hog', t: tal(Tot) }, { e: 'r', h: `${k + 1} · ${u} = ${Tot}` }])],
      svar: `De har ${Tot} ${c.sak} tillsammans.`, koll: `${B} har ${u} och ${A} ${k} · ${u} = ${k * u}. ${A} ger ${g}: ${k * u} − ${g} = ${k * u - g} och ${u} + ${g} = ${u + g}.` };
  }
  L[2] = { titel: 'Pärlproblemet', omr: 'nat', uppg: [
    () => parl({ titel: 'Pärlorna', A: 'Nora', B: 'Viktor', sak: 'pärlor', k: 5, u: [6, 20] }),
    () => parl({ titel: 'Klistermärkena', A: 'Ali', B: 'Sara', sak: 'klistermärken', k: 3, u: [8, 25] }),
    () => parl({ titel: 'Korten', A: 'Leo', B: 'Mira', sak: 'kort', k: 7, u: [4, 12] })] };

  // 3 Rabatt i procent
  function rabatt(c) {
    const n = 100 / c.pct, u = mult(c.m, c.u[0], c.u[1]), Rp = (n - 1) * u;
    return { titel: c.titel, text: `Priset på ${c.sak} sänktes med ${c.pct} % och ${c.verb} nu ${tal(Rp)} kronor.`, fraga: 'Vad var ursprungspriset?',
      rader: [{ n: 'Priset', f: 'y' }], start: [{ e: 'kl', id: 'q', rad: 0, t: '?', pos: 'o' }],
      steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', ['Ursprungspriset', 'Rabatten i kronor', 'Priset nu'], 'Vi söker ursprungspriset.'),
        { typ: 'delar', rub: 'Hur synliggör vi rabatten?', q: `Priset sänktes med ${c.pct} %. Hur synliggör vi ${c.pct} %? Hur många lika stora delar ska blocket ha?`, rader: [{ rad: 0, n }],
          tips: `Hela priset är 100 %. 100 % / ${c.pct} % = ${n} delar.`, klar: `${n} delar, ${c.pct} % i varje.`, sedan: [{ e: 'fyll', rad: 0, t: c.pct + ' %' }] },
        { typ: 'markera', rub: 'Vilken del är borta?', q: 'Vilken del är borta? Klicka på rabatten.', rad: 0, antal: 1, plats: n - 1,
          tips: `Rabatten är ${c.pct} %, alltså en del.`, klar: 'En del, rabatten, är borta.',
          sedan: [{ e: 'stil', rad: 0, fr: n - 1, ti: n - 1, s: 'stryk' }, { e: 'kl', id: 'rab', rad: 0, fr: n - 1, ti: n - 1, t: 'borta', pos: 'u' }] },
        T('Vet vi något mer?', `Nu kostar ${c.best} ${tal(Rp)} kr. Hur många delar är kvar?`, n - 1, `${n} − 1`, `${n - 1} delar är ${tal(Rp)} kr.`,
          [{ e: 'stil', rad: 0, fr: 0, ti: n - 2, s: 'kand' }, { e: 'kl', id: 'nu', rad: 0, fr: 0, ti: n - 2, t: 'nu ' + tal(Rp) + ' kr', pos: 'u' }]),
        EN_DEL(Rp, n - 1, u, ' kr'),
        T('Räkna ut det du söker', 'Vad var ursprungspriset?', n * u, `Ursprungspriset är alla ${n} delar: ${n} · ${u}.`, `Ursprungspriset var ${tal(n * u)} kr.`,
          [{ e: 'kl', id: 'q', rad: 0, t: tal(n * u) + ' kr', pos: 'o' }, { e: 'r', h: `${n} · ${u} = ${tal(n * u)}` }], ' kr')],
      svar: `Ursprungspriset var ${tal(n * u)} kronor.`, koll: `${c.pct} % av ${tal(n * u)} kr är ${tal(u)} kr. ${tal(n * u)} − ${tal(u)} = ${tal(Rp)} kr.` };
  }
  L[3] = { titel: 'Rabatt i procent', omr: 'proc', uppg: [
    () => rabatt({ titel: 'Hörlurarna', sak: 'ett par hörlurar', best: 'hörlurarna', verb: 'är', pct: 20, m: 10, u: [50, 250] }),
    () => rabatt({ titel: 'Jackan', sak: 'en jacka', best: 'jackan', verb: 'kostar', pct: 25, m: 10, u: [40, 200] }),
    () => rabatt({ titel: 'Cykeln', sak: 'en cykel', best: 'cykeln', verb: 'kostar', pct: 10, m: 50, u: [100, 600] })] };

  // 4 Ryggsäcksproblemet: tre personer, gånger så många och en skillnad
  function rygg(c) {
    const u = c.m ? mult(c.m, c.u[0], c.u[1]) : R(c.u[0], c.u[1]), d = c.dm ? mult(c.dm, c.d[0], c.d[1]) : R(c.d[0], c.d[1]);
    const minus = c.tecken < 0, S = (1 + c.k + c.bas) * u + c.tecken * d, S2 = S - c.tecken * d, del = 1 + c.k + c.bas, svar = c.svar(u, d), e = c.enh;
    return { titel: c.titel, text: c.text(d, S), fraga: c.fraga, rader: [{ n: c.A, f: 'b' }, { n: c.B, f: 'g' }, { n: c.C, f: 'y' }],
      steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', c.las, `Vi söker ${c.las[0].charAt(0).toLowerCase() + c.las[0].slice(1)}.`),
        { typ: 'delar', rub: 'Rita blocken', q: `${c.A} får ett block. ${c.qB} Hur många block får ${c.B}?`, rader: [{ rad: 0, n: 1, fast: 1 }, { rad: 1, n: c.k }, { rad: 2, n: 1, fast: 1 }],
          tips: `${c.qB} Då får ${c.B} ${c.k} lika stora block.`, klar: `${c.B} får ${c.k} block.` },
        V('Rita blocken', `${c.qC(d)} Hur ritar vi ${gen(c.C)} block?`, c.altC(d), c.klarC(d),
          [{ e: 'antal', rad: 2, n: c.bas }].concat(minus ? [{ e: 'minus', rad: 2, t: '−' + d, w: .45 }] : [{ e: 'x', rad: 2, t: tal(d), w: .5 }])),
        V('Vet vi något mer?', 'Vilket tal visar alla block tillsammans?', [tal(S) + e, tal(d) + e, del + ' block'], `Tillsammans ${tal(S)}${e}.`, [{ e: 'hog', t: tal(S) }]),
        { typ: 'markera', rub: 'Är det något som stör?', q: minus ? `Tänk om ${c.C} hade ${d}${e} till? Klicka på biten som saknas.` : `Tänk om vi tar bort ${d}${e}? Klicka på det som stör.`, rad: 2, mal: 'x',
          tips: minus ? `Det är biten som saknas i ${gen(c.C)} block (−${d}).` : `Det är den extra biten på ${d}${e} hos ${c.C}.`,
          klar: minus ? `Vi lägger till ${d}${e}, så att alla block blir lika stora.` : `Vi tar bort ${d}${e}, så att alla block blir lika stora.`,
          sedan: minus ? [{ e: 'minus', rad: 2, t: '+' + d, w: .45 }, { e: 'xs', rad: 2, s: 'fylld' }] : [{ e: 'xs', rad: 2, s: 'stryk' }] },
        T('Är det något som stör?', minus ? 'Hur mycket blir det då tillsammans?' : `Hur mycket är kvar när vi tar bort ${d}${e}?`, S2, minus ? `${S} + ${d}` : `${S} − ${d}`,
          minus ? `Då blir det ${tal(S2)}${e}.` : `Kvar är ${tal(S2)}${e}.`, [{ e: 'hog', t: tal(S2) }, { e: 'r', h: minus ? `${S} + ${d} = ${S2}` : `${S} − ${d} = ${S2}` }], e),
        EN_DEL(S2, del, u, e),
        T('Räkna ut det du söker', c.fraga, svar[0], svar[1], svar[2], [{ e: 'r', h: svar[3] }], e)],
      svar: svar[2], koll: c.koll(u, d, S) };
  }
  L[4] = { titel: 'Ryggsäcksproblemet', omr: 'nat', uppg: [
    () => rygg({ titel: 'Ryggsäckarna', A: 'Mira', B: 'Oskar', C: 'Tova', k: 2, bas: 2, tecken: 1, u: [4, 12], d: [1, 5], enh: ' kg',
      text: (d, S) => `Mira, Oskar och Tova har varsin ryggsäck. Oskars väger dubbelt så mycket som Miras. Tovas ryggsäck väger ${d} kg mer än Oskars. Tillsammans väger de ${S} kg.`,
      fraga: 'Hur mycket väger den tyngsta ryggsäcken?', las: ['Hur mycket den tyngsta ryggsäcken väger', 'Hur mycket Miras ryggsäck väger', 'Hur mycket alla ryggsäckar väger'],
      qB: 'Oskars ryggsäck väger dubbelt så mycket som Miras.', qC: d => `Tovas ryggsäck väger ${d} kg mer än Oskars.`,
      altC: d => [`Som Oskars och en extra bit på ${d} kg`, `Som Miras och en extra bit på ${d} kg`, 'Som Oskars men en bit kortare'], klarC: d => `Tova får 2 block och en extra bit på ${d} kg.`,
      svar: (u, d) => [2 * u + d, `Tovas är tyngst: 2 block och ${d} kg. ${u} + ${u} + ${d}.`, `Den tyngsta ryggsäcken (Tovas) väger ${2 * u + d} kg.`, `Tova: ${u} + ${u} + ${d} = ${2 * u + d}`],
      koll: (u, d, S) => `Mira ${u} kg, Oskar ${2 * u} kg, Tova ${2 * u + d} kg. ${u} + ${2 * u} + ${2 * u + d} = ${S}.` }),
    () => rygg({ titel: 'Äpplena', A: 'Sam', B: 'Leila', C: 'Omar', k: 3, bas: 1, tecken: 1, u: [4, 15], d: [2, 9], enh: '',
      text: (d, S) => `Sam, Leila och Omar plockar äpplen. Leila plockar tre gånger så många som Sam. Omar plockar ${d} fler än Sam. Tillsammans plockar de ${S} äpplen.`,
      fraga: 'Hur många äpplen plockar Leila?', las: ['Hur många äpplen Leila plockar', 'Hur många äpplen Sam plockar', 'Hur många äpplen de plockar tillsammans'],
      qB: 'Leila plockar tre gånger så många som Sam.', qC: d => `Omar plockar ${d} fler än Sam.`,
      altC: d => [`Som Sams och en extra bit på ${d}`, `Som Leilas och en extra bit på ${d}`, 'Tre block'], klarC: d => `Omar får 1 block och en extra bit på ${d}.`,
      svar: (u, d) => [3 * u, `Leila har 3 block: 3 · ${u}.`, `Leila plockar ${3 * u} äpplen.`, `Leila: 3 · ${u} = ${3 * u}`],
      koll: (u, d, S) => `Sam ${u}, Leila ${3 * u}, Omar ${u + d}. ${u} + ${3 * u} + ${u + d} = ${S}.` }),
    () => rygg({ titel: 'Pengarna', A: 'Elias', B: 'Nora', C: 'Kim', k: 2, bas: 2, tecken: -1, m: 5, u: [20, 60], dm: 5, d: [5, 15], enh: ' kr',
      text: (d, S) => `Elias, Nora och Kim har pengar. Nora har dubbelt så mycket som Elias. Kim har ${d} kr mindre än Nora. Tillsammans har de ${S} kr.`,
      fraga: 'Hur mycket pengar har Kim?', las: ['Hur mycket pengar Kim har', 'Hur mycket pengar Nora har', 'Hur mycket pengar de har tillsammans'],
      qB: 'Nora har dubbelt så mycket som Elias.', qC: d => `Kim har ${d} kr mindre än Nora.`,
      altC: d => [`Som Noras men ${d} kr kortare`, `Som Noras och ${d} kr extra`, `Som Elias men ${d} kr kortare`], klarC: d => `Kim får 2 block där det saknas ${d} kr.`,
      svar: (u, d) => [2 * u - d, `Kim har 2 block minus ${d} kr: ${u} + ${u} − ${d}.`, `Kim har ${2 * u - d} kr.`, `Kim: ${u} + ${u} − ${d} = ${2 * u - d}`],
      koll: (u, d, S) => `Elias ${u} kr, Nora ${2 * u} kr, Kim ${2 * u - d} kr. ${u} + ${2 * u} + ${2 * u - d} = ${S}.` })] };

  // 5 Veckopengsproblemet: del av det hela, sedan del av resten (dela i mindre delar)
  function vecko(c) {
    const s = c.m ? mult(c.m, c.s[0], c.s[1]) : R(c.s[0], c.s[1]), b = c.b, k = c.k, sm = (b - 1) * k, stor = k * s, Tot = b * stor, e = c.enh;
    return { titel: c.titel, text: c.text(s), fraga: c.fraga, rader: [{ n: c.hel, f: 'g' }], start: [{ e: 'kl', id: 'q', rad: 0, t: '?', pos: 'o', niva: 2 }],
      steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', c.las, `Vi söker ${c.las[0].charAt(0).toLowerCase() + c.las[0].slice(1)}.`),
        { typ: 'delar', rub: 'Rita blocket', q: `${c.ord1} ${c.q2} Hur många lika stora delar ska blocket ha?`, rader: [{ rad: 0, n: b }],
          tips: `${c.ord1} betyder att vi delar blocket i ${b} delar.`, klar: `${b} delar. En del är ${c.a}.`,
          sedan: [{ e: 'fyll', rad: 0, fr: 0, ti: 0, t: c.a }, { e: 'stil', rad: 0, fr: 0, ti: 0, s: 'stryk' }] },
        T('Vad står resten för?', 'Hur många delar är kvar?', b - 1, `${b} − 1`, `${b - 1} ${b - 1 == 1 ? 'del' : 'delar'} är kvar.`, [{ e: 'kl', id: 'kv', rad: 0, fr: 1, ti: b - 1, t: 'kvar', pos: 'o' }]),
        T(`Kan vi visa ${c.ord2}?`, `${c.ord2[0].toUpperCase() + c.ord2.slice(1)} av det som är kvar ${c.q4} I hur många små delar delar vi ${b - 1 == 1 ? 'delen' : 'varje del'} som är kvar?`, k,
          c.tips4, `Vi delar i ${k} små delar. Då blir det ${sm} små delar.`, [{ e: 'dela', rad: 0, fr: 1, ti: b - 1, n: sm }, { e: 'kl', id: 'kv', rad: 0, fr: 1, ti: sm, t: 'kvar', pos: 'o' }]),
        { typ: 'markera', rub: 'Skriv in det du vet', q: `${c.q5} Klicka på de små delarna.`, rad: 0, antal: sm - 1, plats: 1,
          tips: `${c.ord2[0].toUpperCase() + c.ord2.slice(1)} är ${sm - 1} av de ${sm} små delarna.`, klar: `${sm - 1} små delar är ${c.c}. En liten del är ${s}${e}.`,
          sedan: [{ e: 'stil', rad: 0, fr: 1, ti: sm - 1, s: 'stryk' }, { e: 'kl', id: 'c', rad: 0, fr: 1, ti: sm - 1, t: c.c, pos: 'u', rod: 1 },
            { e: 'stil', rad: 0, fr: sm, ti: sm, s: 'kand' }, { e: 'kl', id: 's', rad: 0, fr: sm, ti: sm, t: tal(s), pos: 'u' }, { e: 'fyll', rad: 0, fr: sm, ti: sm, t: tal(s) }] },
        T('Hur mycket är en stor del?', 'Hur mycket är en stor del?', stor, `En stor del är ${k} små delar: ${k} · ${s}.`, `En stor del är ${tal(stor)}${e}.`,
          [{ e: 'fyll', rad: 0, fr: 1, ti: sm, t: tal(s) }, { e: 'fyll', rad: 0, fr: 0, ti: 0, t: tal(stor) }, { e: 'r', h: `${k} · ${s} = ${stor}` }], e),
        T('Räkna ut det du söker', c.fraga, Tot, `Det hela är ${b} stora delar: ${b} · ${stor}.`, c.svar(Tot),
          [{ e: 'kl', id: 'q', rad: 0, t: tal(Tot) + e, pos: 'o', niva: 2 }, { e: 'r', h: `${b} · ${stor} = ${tal(Tot)}` }], e)],
      svar: c.svar(Tot), koll: c.koll(Tot, stor, s) };
  }
  L[5] = { titel: 'Veckopengsproblemet', omr: 'brak', uppg: [
    () => vecko({ titel: 'Veckopengen', hel: 'Veckopeng', b: 4, k: 2, m: 5, s: [10, 40], enh: ' kr', a: 'godis', c: 'bad',
      text: s => `Tilda använder en fjärdedel av sin veckopeng till godis. Fem sjättedelar av det som är kvar använder hon till badhuset. Sedan har hon ${s} kr över som hon sparar.`,
      fraga: 'Hur mycket är Tildas veckopeng?', las: ['Hur mycket Tildas veckopeng är', 'Hur mycket godiset kostar', 'Hur mycket Tilda sparar'],
      ord1: 'En fjärdedel', q2: 'av veckopengen går till godis.', ord2: 'fem sjättedelar', q4: 'går till badhuset.', tips4: 'Vi behöver sjättedelar av resten. Resten är 3 delar, och 3 · 2 = 6 små delar.',
      q5: 'Var är badhuset?', svar: t => `Tildas veckopeng är ${t} kr.`,
      koll: (t, st, s) => `En fjärdedel av ${t} kr är ${st} kr (godis). Kvar ${t - st} kr. Badhuset ${5 * s} kr och ${s} kr sparar hon: ${st} + ${5 * s} + ${s} = ${t}.` }),
    () => vecko({ titel: 'Shoppingen', hel: 'Pengarna', b: 3, k: 2, m: 10, s: [20, 90], enh: ' kr', a: 'tröja', c: 'skor',
      text: s => `Lina använder en tredjedel av sina pengar till en tröja. Tre fjärdedelar av det som är kvar använder hon till skor. Sedan har hon ${s} kr kvar.`,
      fraga: 'Hur mycket pengar hade Lina från början?', las: ['Hur mycket pengar Lina hade från början', 'Hur mycket tröjan kostade', 'Hur mycket skorna kostade'],
      ord1: 'En tredjedel', q2: 'av pengarna går till en tröja.', ord2: 'tre fjärdedelar', q4: 'går till skor.', tips4: 'Vi behöver fjärdedelar av resten. Resten är 2 delar, och 2 · 2 = 4 små delar.',
      q5: 'Var är skorna?', svar: t => `Lina hade ${t} kr från början.`,
      koll: (t, st, s) => `En tredjedel av ${t} kr är ${st} kr (tröja). Skorna ${3 * s} kr och ${s} kr kvar: ${st} + ${3 * s} + ${s} = ${t}.` }),
    () => vecko({ titel: 'Tåget', hel: 'Tåget', b: 2, k: 3, s: [4, 20], enh: '', a: '1:a stn', c: '2:a stn',
      text: s => `Hälften av passagerarna på ett tåg går av vid första stationen. Två tredjedelar av dem som är kvar går av vid andra stationen. Då är ${s} passagerare kvar.`,
      fraga: 'Hur många passagerare fanns från början?', las: ['Hur många passagerare det fanns från början', 'Hur många som går av vid första stationen', 'Hur många som är kvar'],
      ord1: 'Hälften', q2: 'av passagerarna går av vid första stationen.', ord2: 'två tredjedelar', q4: 'går av vid andra stationen.', tips4: 'Vi behöver tredjedelar av resten. Resten är 1 del, och den delar vi i 3 små delar.',
      q5: 'Vilka går av vid andra stationen?', svar: t => `Det fanns ${t} passagerare från början.`,
      koll: (t, st, s) => `Hälften av ${t} är ${st} som går av. Kvar ${st}. Två tredjedelar av ${st} är ${2 * s}, och ${st} − ${2 * s} = ${s}.` })] };

  return L;
};
