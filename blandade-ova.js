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
    () => camping({ titel: 'Klassen', p1: 2, p2: 4, u: [3, 4], hel: 'Elever', alla: 'elever', allaB: 'eleverna', a: 'flickor', b: 'pojkar', c: 'glas.', ord1: 'Hälften', ord2: 'En fjärdedel',
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
      ].concat(c.slut ? c.slut(u, d, e) : [T('Räkna ut det du söker', c.fraga, svar[0], svar[1], svar[2], [{ e: 'r', h: svar[3] }], e)]),
      svar: svar[2], koll: c.koll(u, d, S) };
  }
  L[4] = { titel: 'Ryggsäcksproblemet', omr: 'nat', uppg: [
    () => rygg({ titel: 'Ryggsäckarna', A: 'Mira', B: 'Oskar', C: 'Tova', k: 2, bas: 2, tecken: 1, u: [2, 5], d: [1, 4], enh: ' kg',
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
    () => vecko({ titel: 'Shoppingen', hel: 'Pengarna', b: 3, k: 2, m: 10, s: [50, 150], enh: ' kr', a: 'tröja', c: 'skor',
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


  // 6 Frimärksproblemet: tre personer, gånger så många och en skillnad (svara för alla)
  const tre = (A, B, C, k, tecken, enh) => (u, d, e) => {
    const c3 = u + tecken * d;
    return [T('Räkna ut det du söker', `Hur ${enh ? 'mycket' : 'många'} har ${A}?`, u, `${A} har 1 block.`, `${A} har ${u}${e}.`, [], e),
      T('Räkna ut det du söker', `Hur ${enh ? 'mycket' : 'många'} har ${B}?`, k * u, `${B} har ${k} block: ${k} · ${u}.`, `${B} har ${k * u}${e}.`, [{ e: 'r', h: `${B}: ${k} · ${u} = ${k * u}` }], e),
      T('Räkna ut det du söker', `Hur ${enh ? 'mycket' : 'många'} har ${C}?`, c3, `${C} har 1 block ${tecken > 0 ? 'och' : 'minus'} ${d}: ${u} ${tecken > 0 ? '+' : '−'} ${d}.`, `${C} har ${c3}${e}.`, [{ e: 'r', h: `${C}: ${u} ${tecken > 0 ? '+' : '−'} ${d} = ${c3}` }], e)];
  };
  L[6] = { titel: 'Frimärksproblemet', omr: 'nat', uppg: [
    () => rygg({ titel: 'Frimärkena', A: 'Arvid', B: 'Hanna', C: 'Selma', k: 3, bas: 1, tecken: 1, u: [100, 200], d: [3, 15], enh: '',
      text: (d, S) => `Hanna, Arvid och Selma har tillsammans ${tal(S)} frimärken. Hanna har tre gånger så många frimärken som Arvid, och Arvid har ${d} frimärken färre än Selma.`,
      fraga: 'Hur många frimärken har var och en?', las: ['Hur många frimärken var och en har', 'Hur många frimärken de har tillsammans', 'Bara hur många frimärken Hanna har'],
      qB: 'Hanna har tre gånger så många som Arvid.', qC: d => `Arvid har ${d} frimärken färre än Selma. Selma har alltså ${d} fler än Arvid.`,
      altC: d => [`Som Arvids och en extra bit på ${d}`, `Som Arvids men ${d} kortare`, `Som Hannas och en extra bit på ${d}`], klarC: d => `Selma får 1 block och en extra bit på ${d}.`,
      svar: (u, d) => [0, '', `Hanna har ${3 * u}, Arvid ${u} och Selma ${u + d} frimärken.`], slut: tre('Arvid', 'Hanna', 'Selma', 3, 1, ''),
      koll: (u, d, S) => `${3 * u} + ${u} + ${u + d} = ${tal(S)}.` }),
    () => rygg({ titel: 'Korten', A: 'Amir', B: 'Sofia', C: 'Leo', k: 2, bas: 1, tecken: 1, u: [10, 30], d: [2, 9], enh: '',
      text: (d, S) => `Amir, Sofia och Leo har tillsammans ${S} kort. Sofia har dubbelt så många kort som Amir, och Amir har ${d} kort färre än Leo.`,
      fraga: 'Hur många kort har var och en?', las: ['Hur många kort var och en har', 'Hur många kort de har tillsammans', 'Bara hur många kort Sofia har'],
      qB: 'Sofia har dubbelt så många som Amir.', qC: d => `Amir har ${d} kort färre än Leo. Leo har alltså ${d} fler än Amir.`,
      altC: d => [`Som Amirs och en extra bit på ${d}`, `Som Amirs men ${d} kortare`, `Som Sofias och en extra bit på ${d}`], klarC: d => `Leo får 1 block och en extra bit på ${d}.`,
      svar: (u, d) => [0, '', `Amir har ${u}, Sofia ${2 * u} och Leo ${u + d} kort.`], slut: tre('Amir', 'Sofia', 'Leo', 2, 1, ''),
      koll: (u, d, S) => `${u} + ${2 * u} + ${u + d} = ${S}.` }),
    () => rygg({ titel: 'Pengarna', A: 'Ida', B: 'Max', C: 'Noor', k: 4, bas: 1, tecken: -1, u: [10, 40], d: [2, 8], enh: ' kr',
      text: (d, S) => `Ida, Max och Noor har tillsammans ${S} kr. Max har fyra gånger så mycket pengar som Ida, och Noor har ${d} kr mindre än Ida.`,
      fraga: 'Hur mycket pengar har var och en?', las: ['Hur mycket pengar var och en har', 'Hur mycket pengar de har tillsammans', 'Bara hur mycket pengar Max har'],
      qB: 'Max har fyra gånger så mycket som Ida.', qC: d => `Noor har ${d} kr mindre än Ida.`,
      altC: d => [`Som Idas men ${d} kr kortare`, `Som Idas och ${d} kr extra`, `Som Max men ${d} kr kortare`], klarC: d => `Noor får 1 block där det saknas ${d} kr.`,
      svar: (u, d) => [0, '', `Ida har ${u} kr, Max ${4 * u} kr och Noor ${u - d} kr.`], slut: tre('Ida', 'Max', 'Noor', 4, -1, 'kr'),
      koll: (u, d, S) => `${u} + ${4 * u} + ${u - d} = ${S}.` })] };

  // 7 Åldersproblemet: summa och skillnad
  function alder(c) {
    const u = R(c.u[0], c.u[1]), d = R(c.d[0], c.d[1]), S = 2 * u + d, e = c.enh;
    return { titel: c.titel, text: c.text(S, d), fraga: c.fraga, rader: [{ n: c.A, f: 'g' }, { n: c.B, f: 'b' }],
      steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', c.las, `Vi söker ${c.las[0].charAt(0).toLowerCase() + c.las[0].slice(1)}.`),
        V('Rita blocken', `${c.minst} Hur ritar vi ${gen(c.A)} block?`, [`Lika långt som ${gen(c.B)} och en extra del på ${d}${e}`, `Dubbelt så långt som ${gen(c.B)}`, `Kortare än ${gen(c.B)}`],
          `${c.A}: lika långt som ${c.B} och ${d}${e} till.`, [{ e: 'lagg', rad: 0, n: 1, s: 'x', t: tal(d), w: Math.min(1.2, Math.max(.45, d / u)) }]),
        V('Vad vet vi mer?', 'Vilket tal visar alla block tillsammans?', [tal(S) + e, tal(d) + e, tal(S - d) + e], `Tillsammans ${tal(S)}${e}.`, [{ e: 'hog', t: tal(S) }]),
        { typ: 'markera', rub: 'Är det något som stör?', q: `Tänk om vi tar bort ${d}${e}? Klicka på det som stör.`, rad: 0, ratt: [1], tips: `Det är den extra delen på ${d}${e}.`, klar: `Vi tar bort ${d}${e}.`, sedan: [{ e: 'stil', rad: 0, fr: 1, ti: 1, s: 'stryk' }] },
        T('Är det något som stör?', `Hur mycket är kvar när vi tar bort ${d}${e}?`, S - d, `${S} − ${d}`, `Kvar är ${S - d}${e}.`, [{ e: 'hog', t: tal(S - d) }, { e: 'r', h: `${S} − ${d} = ${S - d}` }], e),
        Object.assign(EN_DEL(S - d, 2, u, e), { sedan: [{ e: 'fyll', rad: 0, fr: 0, ti: 0, t: tal(u) }, { e: 'fyll', rad: 1, t: tal(u) }, { e: 'r', h: `${F(S - d, 2)} = ${u}` }] }),
        T('Räkna ut det du söker', c.fraga, c.svar(u, d)[0], c.svar(u, d)[1], c.svar(u, d)[2], [{ e: 'r', h: c.svar(u, d)[3] }], e)],
      svar: c.svar(u, d)[2], koll: `${u + d} + ${u} = ${S} och ${u + d} − ${u} = ${d}.` };
  }
  L[7] = { titel: 'Åldersproblemet', omr: 'nat', uppg: [
    () => alder({ titel: 'Mira och mamma', A: 'Mamma', B: 'Mira', u: [8, 20], d: [20, 35], enh: ' år', text: (S, d) => `Mira och hennes mamma är tillsammans ${S} år. Mamman är ${d} år äldre än Mira.`,
      fraga: 'Hur gammal är Mira?', las: ['Hur gammal Mira är', 'Hur gammal mamman är', 'Hur gamla de är tillsammans'], minst: 'Mira är yngst och får ett block.',
      svar: (u, d) => [u, 'Mira är ett block.', `Mira är ${u} år.`, `Mira ${u} år, mamman ${u} + ${d} = ${u + d} år`] }),
    () => alder({ titel: 'Leo och Noor', A: 'Leo', B: 'Noor', u: [15, 50], d: [5, 25], enh: ' kr', text: (S, d) => `Leo och Noor har tillsammans ${S} kr. Leo har ${d} kr mer än Noor.`,
      fraga: 'Hur mycket pengar har Leo?', las: ['Hur mycket pengar Leo har', 'Hur mycket pengar Noor har', 'Hur mycket pengar de har tillsammans'], minst: 'Noor har minst och får ett block.',
      svar: (u, d) => [u + d, `Leo har ett block och ${d} kr till: ${u} + ${d}.`, `Leo har ${u + d} kr.`, `${u} + ${d} = ${u + d}`] }),
    () => {
      const u = R(5, 15), a = R(2, 6), b = R(2, 5), S = 3 * u + 2 * a + b, wa = .6, wb = .45;
      return { titel: 'Tre syskon', text: `Samir, Lina och Ali är tillsammans ${S} år. Lina är ${a} år äldre än Samir. Ali är ${b} år äldre än Lina.`, fraga: 'Hur gammal är Ali?',
        rader: [{ n: 'Samir', f: 'b' }, { n: 'Lina', f: 'g' }, { n: 'Ali', f: 'y' }],
        steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', ['Hur gammal Ali är', 'Hur gammal Samir är', 'Hur gamla de är tillsammans'], 'Vi söker hur gammal Ali är.'),
          V('Rita blocken', `Samir är yngst och får ett block. Lina är ${a} år äldre än Samir. Hur ritar vi Lina?`, [`Ett block och en extra del på ${a} år`, 'Två block', `Ett block minus ${a} år`],
            `Lina: ett block och ${a} år.`, [{ e: 'lagg', rad: 1, n: 1, s: 'x', t: a, w: wa }]),
          V('Rita blocken', `Ali är ${b} år äldre än Lina. Hur ritar vi Ali?`, [`Som Lina och en extra del på ${b} år`, `Som Samir och en extra del på ${b} år`, `Som Lina minus ${b} år`],
            `Ali: ett block, ${a} år och ${b} år.`, [{ e: 'lagg', rad: 2, n: 1, s: 'x', t: a, w: wa }, { e: 'lagg', rad: 2, n: 1, s: 'x', t: b, w: wb }]),
          V('Vad vet vi mer?', 'Vilket tal visar alla block tillsammans?', [S + ' år', a + b + ' år', 3 * u + ' år'].filter((x, i, l) => l.indexOf(x) == i), `Tillsammans ${S} år.`, [{ e: 'hog', t: S }]),
          V('Vad tar vi bort?', 'Vad tar vi bort så att alla block blir lika stora?', [`${a} + ${a} + ${b} = ${2 * a + b}`, `${a} + ${b} = ${a + b}`, `Bara ${b}`], `Vi tar bort ${a} + ${a} + ${b} = ${2 * a + b} år.`,
            [{ e: 'stil', rad: 1, fr: 1, ti: 1, s: 'stryk' }, { e: 'stil', rad: 2, fr: 1, ti: 2, s: 'stryk' }]),
          T('Vad tar vi bort?', `Hur mycket är kvar när vi tar bort ${2 * a + b} år?`, 3 * u, `${S} − ${2 * a + b}`, `Kvar är ${3 * u} år.`, [{ e: 'hog', t: 3 * u }, { e: 'r', h: `${S} − ${2 * a + b} = ${3 * u}` }], ' år'),
          { typ: 'tal', rub: 'Hur mycket är ett block?', q: 'Hur mycket är ett block?', svar: u, enh: ' år', tips: `${3 * u} år fördelas på 3 block.`, klar: `Ett block är ${u} år.`,
            sedan: [{ e: 'fyll', rad: '*', fr: 0, ti: 0, t: u }, { e: 'r', h: `${F(3 * u, 3)} = ${u}` }] },
          T('Räkna ut det du söker', 'Hur gammal är Ali?', u + a + b, `Ali är ett block, ${a} år och ${b} år: ${u} + ${a} + ${b}.`, `Ali är ${u + a + b} år.`, [{ e: 'r', h: `${u} + ${a} + ${b} = ${u + a + b}` }], ' år')],
        svar: `Ali är ${u + a + b} år.`, koll: `Samir ${u}, Lina ${u + a}, Ali ${u + a + b}. ${u} + ${u + a} + ${u + a + b} = ${S}.` };
    }] };

  // 8 Biljettproblemet: grupper med olika priser
  function biljett(c) {
    const n = R(c.n[0], c.n[1]), g = c.pA + c.k * c.pB, S = n * g;
    return { titel: c.titel, text: c.text(S), fraga: c.fraga, rader: [{ n: c.A, f: 'b' }, { n: c.B, f: 'g' }],
      steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', c.las, `Vi söker ${c.las[0].charAt(0).toLowerCase() + c.las[0].slice(1)}.`),
        { typ: 'delar', rub: 'Rita blocken', q: `${c.qk} ${c.A} får 1 block. Hur många block får ${c.B}?`, rader: [{ rad: 0, n: 1, fast: 1 }, { rad: 1, n: c.k }],
          tips: `${c.qk} Då får ${c.B} ${c.k} block. Alla block är lika många.`, klar: `${c.A}: 1 block, ${c.B}: ${c.k} block.` },
        T('Vad kostar en grupp?', `En grupp är 1 ${c.a1} och ${c.k} ${c.b1}. Vad kostar en grupp?`, g, `${c.pA} + ${c.k} · ${c.pB}`, `En grupp kostar ${g} kr.`, [{ e: 'r', h: `${c.pA} + ${c.k} · ${c.pB} = ${g} kr` }], ' kr'),
        V('Vad vet vi mer?', 'Vad kostade allt tillsammans?', [tal(S) + ' kr', g + ' kr', tal(S / 2) + ' kr'], `Allt kostade ${tal(S)} kr.`, [{ e: 'hog', t: tal(S) + ' kr' }]),
        T('Hur många grupper?', 'Hur många grupper är det?', n, `${tal(S)} kr / ${g} kr per grupp.`, `Det är ${n} grupper. Varje block är ${n}.`, [{ e: 'fyll', rad: '*', t: n }, { e: 'r', h: `${F(tal(S), g)} = ${n}` }]),
        T('Räkna ut det du söker', c.fraga, c.k * n, `${c.B} är ${c.k} block: ${c.k} · ${n}.`, c.svar(c.k * n), [{ e: 'r', h: `${c.k} · ${n} = ${c.k * n}` }])],
      svar: c.svar(c.k * n), koll: `${n} · ${c.pA} + ${c.k * n} · ${c.pB} = ${tal(n * c.pA)} + ${tal(c.k * n * c.pB)} = ${tal(S)} kr.` };
  }
  L[8] = { titel: 'Biljettproblemet', omr: 'nat', uppg: [
    () => biljett({ titel: 'Matchen', A: 'Vuxna', B: 'Barn', a1: 'vuxen', b1: 'barn', k: 2, pA: 80, pB: 40, n: [10, 40],
      text: S => `Till en match kom dubbelt så många barn som vuxna. En vuxenbiljett kostar 80 kr och en barnbiljett 40 kr. Biljetterna kostade sammanlagt ${tal(S)} kr.`,
      fraga: 'Hur många barn kom till matchen?', las: ['Hur många barn som kom', 'Hur många vuxna som kom', 'Vad barnbiljetterna kostade'], qk: 'Det kom dubbelt så många barn som vuxna.', svar: x => `Det kom ${x} barn till matchen.` }),
    () => biljett({ titel: 'Pennorna', A: 'Sudd', B: 'Pennor', a1: 'suddgummi', b1: 'pennor', k: 3, pA: 9, pB: 12, n: [8, 30],
      text: S => `En klass köper 3 gånger så många pennor som suddgummin. En penna kostar 12 kr och ett suddgummi 9 kr. Klassen betalar sammanlagt ${S} kr.`,
      fraga: 'Hur många pennor köper klassen?', las: ['Hur många pennor klassen köper', 'Hur många suddgummin klassen köper', 'Vad pennorna kostar'], qk: 'Klassen köper 3 gånger så många pennor som suddgummin.', svar: x => `Klassen köper ${x} pennor.` }),
    () => {
      const n = R(10, 30), d = R(3, 9), S = n * 180 + d * 60;
      return { titel: 'Konserten', text: `På en konsert var det ${d} fler barn än vuxna. En vuxenbiljett kostar 120 kr och en barnbiljett 60 kr. Biljetterna kostade sammanlagt ${tal(S)} kr.`,
        fraga: 'Hur många barn var på konserten?', rader: [{ n: 'Vuxna', f: 'b' }, { n: 'Barn', f: 'g' }],
        steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', ['Hur många barn som var där', 'Hur många vuxna som var där', 'Vad barnbiljetterna kostade'], 'Vi söker hur många barn som var där.'),
          V('Rita blocken', `Det var ${d} fler barn än vuxna. Hur ritar vi barnen?`, [`Lika långt som de vuxna och en extra del på ${d}`, 'Dubbelt så långt som de vuxna', 'Kortare än de vuxna'],
            `Barn: lika långt som vuxna och ${d} till.`, [{ e: 'lagg', rad: 1, n: 1, s: 'x', t: d, w: .6 }]),
          V('Vad vet vi mer?', 'Vad kostade allt tillsammans?', [tal(S) + ' kr', '180 kr', tal(d * 60) + ' kr'], `Allt kostade ${tal(S)} kr.`, [{ e: 'hog', t: tal(S) + ' kr' }]),
          T('Är det något som stör?', `Vad kostar de ${d} extra barnen?`, d * 60, `${d} · 60`, `De ${d} extra barnen kostar ${d * 60} kr.`, [{ e: 'r', h: `${d} · 60 = ${d * 60} kr` }], ' kr'),
          { typ: 'markera', rub: 'Är det något som stör?', q: `Tänk om vi tar bort de ${d} extra barnen? Klicka på det som stör.`, rad: 1, ratt: [1], tips: `Det är den extra delen på ${d} barn.`, klar: `Vi tar bort ${d} barn och ${d * 60} kr.`, sedan: [{ e: 'stil', rad: 1, fr: 1, ti: 1, s: 'stryk' }] },
          T('Är det något som stör?', `Hur mycket är kvar när vi tar bort ${d * 60} kr?`, S - d * 60, `${tal(S)} − ${d * 60}`, `Kvar är ${tal(S - d * 60)} kr.`, [{ e: 'hog', t: tal(S - d * 60) + ' kr' }, { e: 'r', h: `${tal(S)} − ${d * 60} = ${tal(S - d * 60)} kr` }], ' kr'),
          T('Vad kostar ett par?', 'Vad kostar en vuxen och ett barn tillsammans?', 180, '120 + 60', 'Ett par kostar 180 kr.', [{ e: 'r', h: '120 + 60 = 180 kr' }], ' kr'),
          T('Hur många par?', 'Hur många par är det?', n, `${tal(S - d * 60)} kr / 180 kr.`, `Det är ${n} par. Varje block är ${n}.`, [{ e: 'fyll', rad: '*', fr: 0, ti: 0, t: n }, { e: 'r', h: `${F(tal(S - d * 60), 180)} = ${n}` }]),
          T('Räkna ut det du söker', 'Hur många barn var på konserten?', n + d, `Barnen är ett block och ${d} till: ${n} + ${d}.`, `Det var ${n + d} barn på konserten.`, [{ e: 'r', h: `${n} + ${d} = ${n + d}` }])],
        svar: `Det var ${n + d} barn på konserten.`, koll: `${n} · 120 + ${n + d} · 60 = ${tal(n * 120)} + ${tal((n + d) * 60)} = ${tal(S)} kr.` };
    }] };

  // 9 Klubbproblemet: förhållande som ändras
  function klubb(c) {
    const u = R(c.u[0], c.u[1]), m = c.q - c.p, add = m * u;
    return { titel: c.titel, text: c.text(add), fraga: c.fraga, rader: [{ n: c.A, f: 'b' }, { n: c.B, f: 'g' }],
      steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', c.las, `Vi söker ${c.las[0].charAt(0).toLowerCase() + c.las[0].slice(1)}.`),
        { typ: 'delar', rub: 'Rita blocken', q: `Förhållandet är ${c.p} : ${c.q}. Hur många block får ${c.A.toLowerCase()} och hur många får ${c.B.toLowerCase()}?`, rader: [{ rad: 0, n: c.p }, { rad: 1, n: c.q }],
          tips: `${c.p} : ${c.q} betyder ${c.p} block och ${c.q} block. Alla block är lika stora.`, klar: `${c.A}: ${c.p} block, ${c.B.toLowerCase()}: ${c.q} block.` },
        T(`Var är de nya?`, `${c.q5(add)} Hur många block fattas för att raderna ska bli lika långa?`, m, `${c.q} − ${c.p}`, `De ${add} nya fyller ${m} block.`,
          [{ e: 'lagg', rad: 0, n: m, s: 'ny' }, { e: 'kl', id: 'n', rad: 0, fr: c.p, ti: c.q - 1, t: `${add} nya`, pos: 'o' }]),
        EN_DEL(add, m, u, ''),
        T('Räkna ut det du söker', c.fraga, c.q * u, `${c.B} är ${c.q} block: ${c.q} · ${u}.`, c.svar(c.q * u), [{ e: 'r', h: `${c.q} · ${u} = ${c.q * u}` }])],
      svar: c.svar(c.q * u), koll: `${c.A} först ${c.p * u}. ${c.p * u} : ${c.q * u} = ${c.p} : ${c.q} och ${c.p * u} + ${add} = ${c.q * u}.` };
  }
  L[9] = { titel: 'Klubbproblemet', omr: 'forh', uppg: [
    () => klubb({ titel: 'Schackklubben', A: 'Pojkar', B: 'Flickor', p: 3, q: 5, u: [2, 12],
      text: a => `I en schackklubb är förhållandet mellan pojkar och flickor 3 : 5. Sedan börjar ${a} nya pojkar i klubben. Nu är det lika många pojkar som flickor.`,
      fraga: 'Hur många flickor finns det i klubben?', las: ['Hur många flickor det finns', 'Hur många pojkar det finns', 'Hur många nya pojkar det är'], q5: a => `${a} nya pojkar börjar, och då blir det lika många.`, svar: x => `Det finns ${x} flickor i klubben.` }),
    () => klubb({ titel: 'Bollarna', A: 'Röda', B: 'Gula', p: 4, q: 7, u: [3, 10],
      text: a => `I en låda är förhållandet mellan röda och gula bollar 4 : 7. Ali lägger i ${a} röda bollar till. Nu är det lika många röda som gula bollar.`,
      fraga: 'Hur många gula bollar finns det?', las: ['Hur många gula bollar det finns', 'Hur många röda bollar det finns', 'Hur många bollar Ali lägger i'], q5: a => `Ali lägger i ${a} röda bollar, och då blir det lika många.`, svar: x => `Det finns ${x} gula bollar.` }),
    () => {
      const u = R(4, 15);
      return { titel: 'Kören', text: `I en kör är förhållandet mellan pojkar och flickor 2 : 5. Sedan slutar ${u} flickor. Nu är det dubbelt så många flickor som pojkar.`,
        fraga: 'Hur många flickor var det från början?', rader: [{ n: 'Flickor', f: 'g' }, { n: 'Pojkar', f: 'b' }],
        steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', ['Hur många flickor det var från början', 'Hur många pojkar det är', 'Hur många flickor det är nu'], 'Vi söker hur många flickor det var från början.'),
          { typ: 'delar', rub: 'Rita blocken', q: 'Förhållandet mellan pojkar och flickor är 2 : 5. Hur många block får flickorna och pojkarna?', rader: [{ rad: 0, n: 5 }, { rad: 1, n: 2 }],
            tips: '2 : 5 betyder 2 block pojkar och 5 block flickor.', klar: 'Flickor: 5 block, pojkar: 2 block.' },
          T('Vad är dubbelt så många?', 'Nu är det dubbelt så många flickor som pojkar. Hur många block har flickorna nu?', 4, 'Pojkarna har 2 block. Dubbelt så många: 2 · 2.', 'Flickorna har 4 block nu.',
            [{ e: 'kl', id: 'd', rad: 0, fr: 0, ti: 3, t: 'dubbelt', pos: 'o' }]),
          { typ: 'markera', rub: 'Var är de som slutar?', q: `${u} flickor slutar. Klicka på det block som är de flickor som slutar.`, rad: 0, antal: 1, plats: 4,
            tips: 'Flickorna hade 5 block och har nu 4. Ett block slutar.', klar: `Ett block är de ${u} som slutar.`,
            sedan: [{ e: 'stil', rad: 0, fr: 4, ti: 4, s: 'stryk' }, { e: 'kl', id: 's', rad: 0, fr: 4, ti: 4, t: `${u} slutar`, pos: 'o' }] },
          T('Hur många i ett block?', 'Hur många är det i ett block?', u, `Ett block är de ${u} som slutar.`, `Ett block är ${u}.`, [{ e: 'fyll', rad: '*', t: u }]),
          T('Räkna ut det du söker', 'Hur många flickor var det från början?', 5 * u, `Från början hade flickorna 5 block: 5 · ${u}.`, `Det var ${5 * u} flickor från början.`, [{ e: 'r', h: `5 · ${u} = ${5 * u}` }])],
        svar: `Det var ${5 * u} flickor från början.`, koll: `Pojkar ${2 * u}, flickor ${5 * u}. ${5 * u} − ${u} = ${4 * u}, och ${4 * u} är dubbelt så många som ${2 * u}.` };
    }] };

  // 10 Prishöjningsproblemet: procent fler
  function hojning(c) {
    const n = 100 / c.pct, u = c.m ? mult(c.m, c.u[0], c.u[1]) : R(c.u[0], c.u[1]), Nu = (n + 1) * u, e = c.enh;
    return { titel: c.titel, text: c.text(Nu), fraga: c.fraga, rader: [{ n: 'Före', f: 'b' }, { n: 'Nu', f: 'g' }],
      steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', c.las, `Vi söker ${c.las[0].charAt(0).toLowerCase() + c.las[0].slice(1)}.`),
        { typ: 'delar', rub: 'Rita blocken', q: `Före är 100 %. Hur många block à ${c.pct} % ska det vara?`, rader: [{ rad: 0, n }, { rad: 1, n: 1, fast: 1 }],
          tips: `100 % / ${c.pct} % = ${n} block.`, klar: `Före: ${n} block à ${c.pct} %.`, sedan: [{ e: 'fyll', rad: 0, t: c.pct + ' %' }, { e: 'kl', id: 'q', rad: 0, t: '?', pos: 'o' }] },
        { typ: 'delar', rub: 'Rita blocken', q: `${c.qnu} Hur många block blir det nu?`, rader: [{ rad: 0, n, fast: 1 }, { rad: 1, n: n + 1 }],
          tips: `100 % + ${c.pct} % = ${100 + c.pct} %. Det är ${n} + 1 block.`, klar: `Nu: ${n + 1} block = ${tal(Nu)}${e}.`,
          sedan: [{ e: 'fyll', rad: 1, t: c.pct + ' %' }, { e: 'stil', rad: 1, fr: n, ti: n, s: 'ny' }, { e: 'kl', id: 'nu', rad: 1, t: tal(Nu) + e, pos: 'u' }] },
        EN_DEL(Nu, n + 1, u, e),
        T('Räkna ut det du söker', c.fraga, n * u, `Före är ${n} block: ${n} · ${u}.`, c.svar(n * u), [{ e: 'kl', id: 'q', rad: 0, t: tal(n * u) + e, pos: 'o' }, { e: 'r', h: `${n} · ${u} = ${tal(n * u)}` }], e)],
      svar: c.svar(n * u), koll: `${c.pct} % av ${tal(n * u)} är ${tal(u)}. ${tal(n * u)} + ${tal(u)} = ${tal(Nu)}.` };
  }
  L[10] = { titel: 'Prishöjningsproblemet', omr: 'proc', uppg: [
    () => hojning({ titel: 'Cykeln', pct: 25, m: 50, u: [200, 900], enh: ' kr', text: x => `Priset på en cykel höjs med 25 %. Nu kostar cykeln ${tal(x)} kr.`, fraga: 'Vad kostade cykeln före höjningen?',
      las: ['Vad cykeln kostade före höjningen', 'Vad cykeln kostar nu', 'Hur mycket priset höjdes'], qnu: 'Priset höjs med 25 %, alltså ett block till.', svar: x => `Cykeln kostade ${tal(x)} kr före höjningen.` }),
    () => hojning({ titel: 'Fotbollsklubben', pct: 20, u: [15, 60], enh: '', text: x => `En fotbollsklubb fick 20 % fler medlemmar. Nu har klubben ${x} medlemmar.`, fraga: 'Hur många medlemmar hade klubben före?',
      las: ['Hur många medlemmar klubben hade före', 'Hur många medlemmar klubben har nu', 'Hur många nya medlemmar det blev'], qnu: 'Klubben fick 20 % fler, alltså ett block till.', svar: x => `Klubben hade ${x} medlemmar före.` }),
    () => {
      const b = mult(10, 60, 200), P = 5 * b, H = 6 * b, del = H / 4, Nu = 3 * del;
      return { titel: 'Tv-spelet', text: `Ett tv-spel kostar ${P} kr. Priset höjs med 20 %. Sedan sänks det nya priset med 25 %.`, fraga: 'Vad kostar spelet nu?',
        rader: [{ n: 'Först', f: 'b' }, { n: 'Höjt', f: 'g' }, { n: 'Nu', f: 'y' }],
        steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', ['Vad spelet kostar nu', 'Vad spelet kostade först', 'Hur mycket priset höjdes'], 'Vi söker vad spelet kostar nu.'),
          { typ: 'delar', rub: 'Rita blocken', q: `${P} kr är 100 %. Hur många block à 20 % blir det?`, rader: [{ rad: 0, n: 5 }, { rad: 1, n: 1, fast: 1 }, { rad: 2, n: 1, fast: 1 }],
            tips: '100 % / 20 % = 5 block.', klar: `Först: 5 block = ${P} kr.`, sedan: [{ e: 'kl', id: 'p', rad: 0, t: P + ' kr', pos: 'u' }] },
          T('Hur mycket är ett block?', 'Hur mycket är ett block?', b, `${P} kr fördelas på 5 block.`, `Ett block är ${b} kr.`, [{ e: 'fyll', rad: 0, t: b }, { e: 'r', h: `${F(P, 5)} = ${b}` }], ' kr'),
          { typ: 'delar', rub: 'Rita det höjda priset', q: 'Priset höjs med 20 %. Hur många block blir det höjda priset?', rader: [{ rad: 0, n: 5, fast: 1 }, { rad: 1, n: 6 }, { rad: 2, n: 1, fast: 1 }],
            tips: '100 % + 20 % = 120 %, alltså 5 + 1 block.', klar: 'Höjt pris: 6 block.', sedan: [{ e: 'fyll', rad: 1, t: b }, { e: 'stil', rad: 1, fr: 5, ti: 5, s: 'ny' }] },
          T('Rita det höjda priset', 'Vad är det höjda priset?', H, `6 · ${b}`, `Det höjda priset är ${H} kr.`, [{ e: 'kl', id: 'h', rad: 1, t: H + ' kr', pos: 'u' }, { e: 'r', h: `6 · ${b} = ${H}` }], ' kr'),
          T('Rita sänkningen', 'Det nya priset sänks med 25 %. I hur många lika stora delar delar vi det höjda priset?', 4, '25 % är en fjärdedel. 100 % / 25 % = 4 delar.', 'Det höjda priset delas i 4 delar.',
            [{ e: 'antal', rad: 2, n: 6 }, { e: 'dela', rad: 2, fr: 0, ti: 5, n: 4 }]),
          { typ: 'markera', rub: 'Rita sänkningen', q: 'Klicka på den del som försvinner när priset sänks.', rad: 2, antal: 1, plats: 3, tips: '25 % är en av de 4 delarna.', klar: 'En del (25 %) försvinner.',
            sedan: [{ e: 'stil', rad: 2, fr: 3, ti: 3, s: 'stryk' }] },
          T('Hur mycket är en del?', 'Hur mycket är en del?', del, `${H} kr fördelas på 4 delar.`, `En del är ${del} kr.`, [{ e: 'fyll', rad: 2, t: del }, { e: 'r', h: `${F(H, 4)} = ${del}` }], ' kr'),
          T('Räkna ut det du söker', 'Vad kostar spelet nu?', Nu, `Nu är det 3 delar: 3 · ${del}.`, `Spelet kostar ${Nu} kr nu.`, [{ e: 'kl', id: 'nu', rad: 2, fr: 0, ti: 2, t: Nu + ' kr', pos: 'u' }, { e: 'r', h: `3 · ${del} = ${Nu}` }], ' kr')],
        svar: `Spelet kostar ${Nu} kr nu.`, koll: `${P} + ${b} = ${H}. 25 % av ${H} är ${del}. ${H} − ${del} = ${Nu}.` };
    }] };

  // 11 Fickpengsproblemet: lika från början, olika mycket försvinner
  function fick(c) {
    const u = mult(c.m, c.u[0], c.u[1]), sB = mult(c.m2, c.s[0], c.s[1]), sA = sB + (c.k - 1) * u, start = u + sA, e = c.enh;
    return { titel: c.titel, text: c.text(sA, sB), fraga: c.fraga, rader: [{ n: c.A, f: 'b' }, { n: c.B, f: 'g' }],
      steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', c.las, `Vi söker ${c.las[0].charAt(0).toLowerCase() + c.las[0].slice(1)}.`),
        { typ: 'delar', rub: 'Rita blocken', q: `${c.A} har 1 block kvar. ${c.B} har ${c.k} gånger så mycket kvar. Hur många block har ${c.B} kvar?`, rader: [{ rad: 0, n: 1, fast: 1 }, { rad: 1, n: c.k }],
          tips: `${c.k} gånger så mycket betyder ${c.k} block.`, klar: `${c.B} har ${c.k} block kvar.` },
        V('Rita blocken', `${c.qvad(sA, sB)} De hade lika mycket från början. Hur ritar vi det?`, ['Raderna blir lika långa när vi lägger till det de gav bort', `${gen(c.A)} rad blir längre`, `${gen(c.B)} rad blir längre`],
          'Med det de gav bort är raderna lika långa.', [{ e: 'lagg', rad: 0, n: 1, s: 'stryk', t: tal(sA), w: c.k - 1 + sB / u }, { e: 'lagg', rad: 1, n: 1, s: 'stryk', t: tal(sB), w: sB / u }]),
        T('Vad betyder lika mycket?', `${c.B} har ${c.k - 1} block mer kvar än ${c.A}. Hur mycket är de ${c.k - 1} blocken?`, sA - sB, `Raderna är lika långa: ${gen(c.A)} ${sA}${e} = ${gen(c.B)} ${c.k - 1} block + ${sB}${e}. Räkna ${sA} − ${sB}.`,
          `${c.k - 1} block = ${sA - sB}${e}.`, [{ e: 'stil', rad: 1, fr: 1, ti: c.k - 1, s: 'kand' }, { e: 'kl', id: 'd', rad: 1, fr: 1, ti: c.k - 1, t: tal(sA - sB) + e, pos: 'u' }, { e: 'r', h: `${sA} − ${sB} = ${sA - sB}` }], e),
        EN_DEL(sA - sB, c.k - 1, u, e),
        T('Räkna ut det du söker', c.fraga, start, `Från början: ${gen(c.A)} block och det ${c.A} gav bort: ${u} + ${sA}.`, c.svar(start), [{ e: 'r', h: `${u} + ${sA} = ${start}` }], e)],
      svar: c.svar(start), koll: `${start} − ${sA} = ${u} och ${start} − ${sB} = ${start - sB}, som är ${c.k} · ${u}.` };
  }
  L[11] = { titel: 'Fickpengsproblemet', omr: 'nat', uppg: [
    () => fick({ titel: 'Tröjan och boken', A: 'Ali', B: 'Bea', k: 4, m: 10, u: [30, 120], m2: 10, s: [60, 150], enh: ' kr',
      text: (a, b) => `Ali och Bea har lika mycket pengar. Ali köper en tröja för ${a} kr. Bea köper en bok för ${b} kr. Nu har Bea 4 gånger så mycket kvar som Ali.`,
      fraga: 'Hur mycket pengar hade de från början?', las: ['Hur mycket pengar de hade från början', 'Hur mycket Ali har kvar', 'Vad tröjan kostade'],
      qvad: (a, b) => `Ali köpte för ${a} kr och Bea för ${b} kr.`, svar: x => `De hade ${x} kr var från början.` }),
    () => fick({ titel: 'Klistermärkena', A: 'Noor', B: 'Leo', k: 3, m: 1, u: [8, 30], m2: 1, s: [5, 20], enh: '',
      text: (a, b) => `Noor och Leo har lika många klistermärken. Noor ger bort ${a} och Leo ger bort ${b}. Nu har Leo 3 gånger så många som Noor.`,
      fraga: 'Hur många klistermärken hade de från början?', las: ['Hur många klistermärken de hade från början', 'Hur många Noor har kvar', 'Hur många Leo gav bort'],
      qvad: (a, b) => `Noor gav bort ${a} och Leo ${b}.`, svar: x => `De hade ${x} klistermärken var från början.` }),
    () => {
      const u = mult(10, 40, 150), s = mult(10, 10, 30), m = s + 2 * u;
      return { titel: 'Mira och Samir', text: `Mira har 3 gånger så mycket pengar som Samir. Mira använder ${m} kr och Samir använder ${s} kr. Nu har de lika mycket kvar.`,
        fraga: 'Hur mycket pengar hade Mira från början?', rader: [{ n: 'Samir', f: 'b' }, { n: 'Mira', f: 'g' }],
        steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', ['Hur mycket pengar Mira hade från början', 'Hur mycket pengar Samir hade från början', 'Hur mycket de har kvar'], 'Vi söker hur mycket pengar Mira hade från början.'),
          { typ: 'delar', rub: 'Rita blocken', q: 'Samir får 1 block. Mira har 3 gånger så mycket. Hur många block får Mira?', rader: [{ rad: 0, n: 1, fast: 1 }, { rad: 1, n: 3 }], tips: '3 gånger så mycket betyder 3 block.', klar: 'Mira får 3 block.' },
          V('Vad har de kvar?', 'Nu har de lika mycket kvar. Vad betyder det?', ['Mira använder 2 block mer än Samir', 'Mira använder 3 gånger så mycket som Samir', 'De använder lika mycket'],
            'Mira använder 2 block mer än Samir.', [{ e: 'kl', id: 'd', rad: 1, fr: 1, ti: 2, t: '2 block mer', pos: 'u' }, { e: 'stil', rad: 1, fr: 1, ti: 2, s: 'kand' }]),
          T('Hur mycket mer använder Mira?', 'Hur mycket mer använder Mira än Samir?', m - s, `${m} − ${s}`, `2 block = ${m - s} kr.`, [{ e: 'kl', id: 'd', rad: 1, fr: 1, ti: 2, t: (m - s) + ' kr', pos: 'u' }, { e: 'r', h: `${m} − ${s} = ${m - s}` }], ' kr'),
          EN_DEL(m - s, 2, u, ' kr'),
          T('Räkna ut det du söker', 'Hur mycket pengar hade Mira från början?', 3 * u, `Mira har 3 block: 3 · ${u}.`, `Mira hade ${3 * u} kr från början.`, [{ e: 'r', h: `3 · ${u} = ${3 * u}` }], ' kr')],
        svar: `Mira hade ${3 * u} kr från början.`, koll: `Samir ${u} kr, Mira ${3 * u} kr. ${3 * u} − ${m} = ${u - s} och ${u} − ${s} = ${u - s}.` };
    }] };

  // 12 Tankproblemet: fylld till olika delar
  function tank(c) {
    const u = R(c.u[0], c.u[1]), cnt = c.b - c.a, add = cnt * u, e = c.enh;
    return { titel: c.titel, text: c.text(add), fraga: c.fraga, rader: [{ n: c.hel, f: 'g' }], start: [{ e: 'kl', id: 'q', rad: 0, t: '?', pos: 'o' }],
      steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', c.las, `Vi söker ${c.las[0].charAt(0).toLowerCase() + c.las[0].slice(1)}.`),
        { typ: 'delar', rub: 'Rita blocket', q: c.qn, rader: [{ rad: 0, n: c.n }], tips: c.tn, klar: `Blocket delas i ${c.n} delar.` },
        { typ: 'markera', rub: 'Hur mycket fanns först?', q: `${c.qa} Klicka på de delarna.`, rad: 0, antal: c.a, plats: 0, tips: c.ta, klar: `Först: ${c.a} delar.`,
          sedan: [{ e: 'stil', rad: 0, fr: 0, ti: c.a - 1, s: 'f:b' }, { e: 'kl', id: 'f', rad: 0, fr: 0, ti: c.a - 1, t: 'först', pos: 'u' }] },
        { typ: 'markera', rub: `Vad gör de ${add}${e}?`, q: `${c.qb(add)} Klicka på de delar som fylls på.`, rad: 0, antal: cnt, plats: c.a, tips: c.tb, klar: `${add}${e} fyller ${cnt} delar till.`,
          sedan: [{ e: 'stil', rad: 0, fr: c.a, ti: c.b - 1, s: 'f:y' }, { e: 'kl', id: 'p', rad: 0, fr: c.a, ti: c.b - 1, t: add + e, pos: 'u' }] },
        EN_DEL(add, cnt, u, e),
        T('Räkna ut det du söker', c.fraga, c.n * u, `Hela ${c.hel.toLowerCase()} är ${c.n} delar: ${c.n} · ${u}.`, c.svar(c.n * u), [{ e: 'kl', id: 'q', rad: 0, t: c.n * u + e, pos: 'o' }, { e: 'r', h: `${c.n} · ${u} = ${c.n * u}` }], e)],
      svar: c.svar(c.n * u), koll: c.koll(u) };
  }
  L[12] = { titel: 'Tankproblemet', omr: 'brak', uppg: [
    () => tank({ titel: 'Tanken', hel: 'Tanken', n: 8, a: 3, b: 7, u: [3, 20], enh: ' liter', text: x => `En tank är fylld till ${F(3, 8)}. Lina häller i ${x} liter. Nu är tanken fylld till ${F(7, 8)}.`,
      fraga: 'Hur mycket rymmer tanken?', las: ['Hur mycket tanken rymmer', 'Hur mycket Lina häller i', 'Hur mycket som fanns först'],
      qn: 'Tanken är fylld till åttondelar. Hur många lika stora delar ska blocket ha?', tn: 'Nämnaren i åttondelar är 8.', qa: `Tanken var fylld till ${F(3, 8)}.`, ta: `${F(3, 8)} är 3 av 8 delar.`,
      qb: x => `Lina häller i ${x} liter. Nu är tanken fylld till ${F(7, 8)}.`, tb: `${F(7, 8)} är 7 delar. Det är 4 delar mer än 3.`, svar: x => `Tanken rymmer ${x} liter.`,
      koll: u => `${F(3, 8)} av ${8 * u} är ${3 * u}, och ${3 * u} + ${4 * u} = ${7 * u}, som är ${F(7, 8)} av ${8 * u}.` }),
    () => tank({ titel: 'Hinken', hel: 'Hinken', n: 7, a: 2, b: 5, u: [1, 2], enh: ' liter', text: x => `En hink är fylld till ${F(2, 7)}. Leo häller i ${x} liter. Nu är hinken fylld till ${F(5, 7)}.`,
      fraga: 'Hur mycket rymmer hinken?', las: ['Hur mycket hinken rymmer', 'Hur mycket Leo häller i', 'Hur mycket som fanns först'],
      qn: 'Hinken är fylld till sjundedelar. Hur många lika stora delar ska blocket ha?', tn: 'Nämnaren i sjundedelar är 7.', qa: `Hinken var fylld till ${F(2, 7)}.`, ta: `${F(2, 7)} är 2 av 7 delar.`,
      qb: x => `Leo häller i ${x} liter. Nu är hinken fylld till ${F(5, 7)}.`, tb: `${F(5, 7)} är 5 delar. Det är 3 delar mer än 2.`, svar: x => `Hinken rymmer ${x} liter.`,
      koll: u => `${F(2, 7)} av ${7 * u} är ${2 * u}, och ${2 * u} + ${3 * u} = ${5 * u}.` }),
    () => tank({ titel: 'Poolen', hel: 'Poolen', n: 12, a: 3, b: 8, u: [1, 8], enh: ' m³', text: x => `En pool är fylld till ${F(1, 4)}. Det rinner in ${x} m³ vatten. Nu är poolen fylld till ${F(2, 3)}.`,
      fraga: 'Hur mycket rymmer poolen?', las: ['Hur mycket poolen rymmer', 'Hur mycket vatten som rinner in', 'Hur mycket som fanns först'],
      qn: `Vi behöver delar som passar både ${F(1, 4)} och ${F(2, 3)}. Hur många lika stora delar ska blocket ha?`, tn: `Fjärdedelar och tredjedelar passar ihop i tolftedelar: ${F(1, 4)} = ${F(3, 12)} och ${F(2, 3)} = ${F(8, 12)}.`,
      qa: `Poolen var fylld till ${F(1, 4)} = ${F(3, 12)}.`, ta: `${F(1, 4)} = ${F(3, 12)}, alltså 3 delar.`,
      qb: x => `Det rinner in ${x} m³. Nu är poolen fylld till ${F(2, 3)} = ${F(8, 12)}.`, tb: `${F(8, 12)} är 8 delar. Det är 5 delar mer än 3.`, svar: x => `Poolen rymmer ${x} m³.`,
      koll: u => `${F(1, 4)} av ${12 * u} är ${3 * u}, ${F(2, 3)} av ${12 * u} är ${8 * u}, och ${8 * u} − ${3 * u} = ${5 * u}.` })] };

  // 13 Saftproblemet: dela i ett förhållande
  function saft(c) {
    const u = R(c.u[0], c.u[1]), sum = c.del.reduce((a, b) => a + b, 0), S = sum * u, e = c.enh;
    return { titel: c.titel, text: c.text(S), fraga: c.fraga, rader: c.namn.map((n, i) => ({ n, f: ['g', 'b', 'y'][i] })),
      steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', c.las, `Vi söker ${c.las[0].charAt(0).toLowerCase() + c.las[0].slice(1)}.`),
        { typ: 'delar', rub: 'Rita blocken', q: `Förhållandet är ${c.del.join(' : ')}. Hur många block får ${c.namn.map(n => n.toLowerCase()).join(c.namn.length == 3 ? ', ' : ' och ').replace(/, ([^,]*)$/, ' och $1')}?`, rader: c.del.map((n, i) => ({ rad: i, n })),
          tips: `Talen i förhållandet ${c.del.join(' : ')} visar antalet block i samma ordning.`, klar: c.namn.map((n, i) => `${n}: ${c.del[i]}`).join(', ') + ' block.' },
        V('Vad vet vi mer?', `Vilket tal visar alla block tillsammans?`, [S + e, sum + e, c.del[c.del.length - 1] * 10 + e].filter((x, i, l) => l.indexOf(x) == i), `Tillsammans ${S}${e}.`, [{ e: 'hog', t: S + e }]),
        T('Hur många block?', 'Hur många block är det sammanlagt?', sum, c.del.join(' + '), `Det är ${sum} block.`, [{ e: 'r', h: `${c.del.join(' + ')} = ${sum} block` }]),
        EN_DEL(S, sum, u, e)].concat(c.slut(u, e)),
      svar: c.svar(u), koll: c.koll(u, S) };
  }
  L[13] = { titel: 'Saftproblemet', omr: 'forh', uppg: [
    () => saft({ titel: 'Saften', namn: ['Koncentrat', 'Vatten'], del: [1, 5], u: [2, 8], enh: ' dl', text: S => `Saft blandas av koncentrat och vatten i förhållandet 1 : 5. Moa gör ${S} dl saft.`,
      fraga: 'Hur mycket koncentrat behöver Moa?', las: ['Hur mycket koncentrat Moa behöver', 'Hur mycket vatten Moa behöver', 'Hur mycket saft Moa gör'],
      slut: (u, e) => [T('Räkna ut det du söker', 'Hur mycket koncentrat behöver Moa?', u, 'Koncentratet är 1 block.', `Moa behöver ${u} dl koncentrat.`, [], e)],
      svar: u => `Moa behöver ${u} dl koncentrat.`, koll: (u, S) => `${u} dl + ${5 * u} dl = ${S} dl och ${u} : ${5 * u} = 1 : 5.` }),
    () => saft({ titel: 'Färgen', namn: ['Blå', 'Gul'], del: [2, 3], u: [2, 12], enh: ' dl', text: S => `Grön färg blandas av blå och gul färg i förhållandet 2 : 3. Ali blandar ${S} dl grön färg.`,
      fraga: 'Hur mycket gul färg behövs?', las: ['Hur mycket gul färg som behövs', 'Hur mycket blå färg som behövs', 'Hur mycket grön färg det blir'],
      slut: (u, e) => [T('Räkna ut det du söker', 'Hur mycket gul färg behövs?', 3 * u, `Gul färg är 3 block: 3 · ${u}.`, `Det behövs ${3 * u} dl gul färg.`, [{ e: 'r', h: `3 · ${u} = ${3 * u}` }], e)],
      svar: u => `Det behövs ${3 * u} dl gul färg.`, koll: (u, S) => `${2 * u} + ${3 * u} = ${S} och ${2 * u} : ${3 * u} = 2 : 3.` }),
    () => saft({ titel: 'Betongen', namn: ['Cement', 'Sand', 'Grus'], del: [1, 2, 3], u: [4, 15], enh: ' kg', text: S => `Betong blandas av cement, sand och grus i förhållandet 1 : 2 : 3. Leo blandar ${S} kg betong.`,
      fraga: 'Hur mycket mer grus än cement behövs?', las: ['Hur mycket mer grus än cement som behövs', 'Hur mycket grus som behövs', 'Hur mycket betong Leo blandar'],
      slut: (u, e) => [T('Räkna ut det du söker', 'Hur mycket grus behövs?', 3 * u, `Grus är 3 block: 3 · ${u}.`, `Det behövs ${3 * u} kg grus.`, [{ e: 'r', h: `Grus: 3 · ${u} = ${3 * u} kg` }], e),
        T('Räkna ut det du söker', 'Hur mycket mer grus än cement behövs?', 2 * u, `Grus ${3 * u} kg och cement ${u} kg: ${3 * u} − ${u}.`, `Det behövs ${2 * u} kg mer grus än cement.`, [{ e: 'r', h: `${3 * u} − ${u} = ${2 * u} kg` }], e)],
      svar: u => `Det behövs ${2 * u} kg mer grus än cement.`, koll: (u, S) => `Cement ${u}, sand ${2 * u}, grus ${3 * u}: ${u} + ${2 * u} + ${3 * u} = ${S}.` })] };

  // 14 Kortbytesproblemet: förhållande, sedan lika många
  function kortbyte(c) {
    const u = R(c.u[0], c.u[1]), lika = (c.p + c.q) / 2, m = c.p - lika, g = m * u;
    return { titel: c.titel, text: c.text(g), fraga: c.fraga, rader: [{ n: c.A, f: 'g' }, { n: c.B, f: 'b' }],
      steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', c.las, `Vi söker ${c.las[0].charAt(0).toLowerCase() + c.las[0].slice(1)}.`),
        { typ: 'delar', rub: 'Rita blocken', q: `Förhållandet mellan ${gen(c.A)} och ${gen(c.B)} ${c.sak} är ${c.p} : ${c.q}. Hur många block får de?`, rader: [{ rad: 0, n: c.p }, { rad: 1, n: c.q }],
          tips: `${c.p} : ${c.q} betyder ${c.p} block och ${c.q} block.`, klar: `${c.A}: ${c.p} block, ${c.B}: ${c.q} block.` },
        T('Vad betyder lika många?', `Tillsammans är det ${c.p + c.q} block. Hur många block har var och en när de har lika många?`, lika, `${c.p + c.q} / 2`, `${lika} block var.`, [{ e: 'r', h: `${c.p} + ${c.q} = ${c.p + c.q} block, ${lika} block var` }]),
        { typ: 'markera', rub: `Hur många block ger ${c.A}?`, q: `${c.A} ger ${c.B} ${g} ${c.sak}. Klicka på de block som ${c.A} ger.`, rad: 0, antal: m, plats: lika,
          tips: `${c.A} har ${c.p} block och ska ha ${lika}. ${c.A} ger ${m} block.`, klar: `${c.A} ger ${m} block = ${g} ${c.sak}.`,
          sedan: [{ e: 'stil', rad: 0, fr: lika, ti: c.p - 1, s: 'stryk' }, { e: 'kl', id: 'g', rad: 0, fr: lika, ti: c.p - 1, t: `${g} ${c.sak}`, pos: 'o' }, { e: 'lagg', rad: 1, n: m, s: 'ny' }] },
        m == 1 ? T('Hur många i ett block?', 'Hur många är det i ett block?', u, `Ett block är de ${g} som ${c.A} ger.`, `Ett block är ${u}.`, [{ e: 'fyll', rad: '*', t: u }]) : EN_DEL(g, m, u, ''),
        T('Räkna ut det du söker', c.fraga, c.svar(u)[0], c.svar(u)[1], c.svar(u)[2], [{ e: 'r', h: c.svar(u)[3] }])],
      svar: c.svar(u)[2], koll: `${c.A} ${c.p * u}, ${c.B} ${c.q * u}. ${c.p * u} − ${g} = ${c.p * u - g} och ${c.q * u} + ${g} = ${c.q * u + g}.` };
  }
  L[14] = { titel: 'Kortbytesproblemet', omr: 'forh', uppg: [
    () => kortbyte({ titel: 'Korten', A: 'Ida', B: 'Omar', sak: 'kort', p: 5, q: 3, u: [2, 12], text: g => `Förhållandet mellan Idas och Omars kort är 5 : 3. Ida ger Omar ${g} kort. Nu har de lika många kort.`,
      fraga: 'Hur många kort har de tillsammans?', las: ['Hur många kort de har tillsammans', 'Hur många kort Ida har', 'Hur många kort Omar har'],
      svar: u => [8 * u, `Tillsammans 8 block: 8 · ${u}.`, `De har ${8 * u} kort tillsammans.`, `8 · ${u} = ${8 * u}`] }),
    () => kortbyte({ titel: 'Bilarna', A: 'Leo', B: 'Sara', sak: 'bilar', p: 7, q: 3, u: [2, 12], text: g => `Förhållandet mellan Leos och Saras leksaksbilar är 7 : 3. Leo ger Sara ${g} bilar. Nu har de lika många bilar.`,
      fraga: 'Hur många bilar hade Leo från början?', las: ['Hur många bilar Leo hade från början', 'Hur många bilar Sara hade', 'Hur många bilar de har tillsammans'],
      svar: u => [7 * u, `Leo hade 7 block: 7 · ${u}.`, `Leo hade ${7 * u} bilar från början.`, `7 · ${u} = ${7 * u}`] }),
    () => {
      const s = R(2, 15);
      return { titel: 'Sara och Ali', text: `Förhållandet mellan Saras och Alis kort är 3 : 1. Sara ger Ali ${s} kort. Nu är förhållandet 5 : 3.`, fraga: 'Hur många kort hade Sara från början?',
        rader: [{ n: 'Sara', f: 'g' }, { n: 'Ali', f: 'b' }],
        steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', ['Hur många kort Sara hade från början', 'Hur många kort Ali har nu', 'Hur många kort de har tillsammans'], 'Vi söker hur många kort Sara hade från början.'),
          { typ: 'delar', rub: 'Rita blocken', q: 'Förhållandet är 3 : 1. Hur många block får Sara och Ali?', rader: [{ rad: 0, n: 3 }, { rad: 1, n: 1 }], tips: '3 : 1 betyder 3 block och 1 block.', klar: 'Sara: 3 block, Ali: 1 block.' },
          V('Ändras antalet kort?', 'Ändras antalet kort de har tillsammans när Sara ger Ali kort?', ['Nej, det är alltid 4 block', 'Ja, det blir fler', 'Ja, det blir färre'], 'Nej, tillsammans är det alltid 4 block.', [{ e: 'hog', t: '4 block' }]),
          T('Hur visar vi 5 : 3?', 'Nu är förhållandet 5 : 3, alltså 8 små delar. I hur många små delar delar vi varje block?', 2, '4 block och 8 små delar: 8 / 4 = 2.', 'Varje block delas i 2 små delar.',
            [{ e: 'dela', rad: 0, fr: 0, ti: 2, n: 6 }, { e: 'dela', rad: 1, fr: 0, ti: 0, n: 2 }, { e: 'hog', t: '8 delar' }]),
          { typ: 'markera', rub: 'Vad ger Sara?', q: `Sara har 6 små delar och ska ha 5. Klicka på den del som Sara ger till Ali.`, rad: 0, antal: 1, plats: 5, tips: 'Sara har 6 små delar men ska ha 5. Hon ger 1 liten del.', klar: `1 liten del = ${s} kort.`,
            sedan: [{ e: 'stil', rad: 0, fr: 5, ti: 5, s: 'stryk' }, { e: 'kl', id: 'g', rad: 0, fr: 5, ti: 5, t: `${s} kort`, pos: 'o' }, { e: 'lagg', rad: 1, n: 1, s: 'ny', w: .5 }] },
          T('Vad ger Sara?', 'Hur många kort är en liten del?', s, `En liten del är de ${s} kort som Sara ger.`, `En liten del är ${s} kort.`, [{ e: 'fyll', rad: '*', t: s }]),
          T('Räkna ut det du söker', 'Hur många kort hade Sara från början?', 6 * s, `Sara hade 3 block = 6 små delar: 6 · ${s}.`, `Sara hade ${6 * s} kort från början.`, [{ e: 'r', h: `6 · ${s} = ${6 * s}` }])],
        svar: `Sara hade ${6 * s} kort från början.`, koll: `Sara ${6 * s}, Ali ${2 * s}. Sara ger ${s}: ${5 * s} : ${3 * s} = 5 : 3.` };
    }] };

  // 15 Andelsproblemet: hur många procent?
  function andel(c) {
    const a = R(c.a[0], c.a[1]), k = R(c.k[0], c.k[1]), N = c.n * a, D = k * a, p = 100 / c.n;
    return { titel: c.titel, text: c.text(N, D), fraga: c.fraga, rader: [{ n: c.hel, f: 'g' }], start: [{ e: 'kl', id: 'h', rad: 0, t: `${N} = 100 %`, pos: 'o' }],
      steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', c.las, `Vi söker ${c.las[0].charAt(0).toLowerCase() + c.las[0].slice(1)}.`),
        { typ: 'delar', rub: 'Vad är det hela?', q: `${N} ${c.sak} är det hela, 100 %. Dela blocket i delar à ${p} %. Hur många delar?`, rader: [{ rad: 0, n: c.n }], tips: `100 % / ${p} % = ${c.n} delar.`, klar: `${c.n} delar à ${p} %.`,
          sedan: [{ e: 'fyll', rad: 0, t: p + ' %' }] },
        T(`Hur många är ${p} %?`, `Hur många ${c.sak} är en del (${p} %)?`, a, `${N} fördelas på ${c.n} delar.`, `En del är ${a} ${c.sak}.`, [{ e: 'fyll', rad: 0, t: a }, { e: 'r', h: `${F(N, c.n)} = ${a}` }]),
        T(`Hur många block är ${D}?`, `Hur många delar är ${D} ${c.sak2}?`, k, `${D} / ${a}`, `${D} är ${k} delar.`, [{ e: 'r', h: `${D} / ${a} = ${k} delar` }]),
        { typ: 'markera', rub: `Var är de ${D}?`, q: `Klicka på ${k} ${k == 1 ? 'del' : 'delar'} för ${c.sak2}.`, rad: 0, antal: k, plats: 0, tips: `${D} är ${k} delar.`, klar: `${k} delar är ${c.sak2}.`,
          sedan: [{ e: 'stil', rad: 0, fr: 0, ti: k - 1, s: 'f:y' }, { e: 'kl', id: 'd', rad: 0, fr: 0, ti: k - 1, t: `${D} ${c.kort}`, pos: 'u' }] },
        T('Räkna ut det du söker', c.fraga, k * p, `${k} delar à ${p} %: ${k} · ${p} %.`, c.svar(k * p), [{ e: 'r', h: `${k} · ${p} % = ${k * p} %` }], ' %')],
      svar: c.svar(k * p), koll: `${k * p} % av ${N} är ${D}.` };
  }
  L[15] = { titel: 'Andelsproblemet', omr: 'proc', uppg: [
    () => andel({ titel: 'Bussen', hel: 'Elever', n: 10, a: [2, 3], k: [1, 9], sak: 'elever', sak2: 'elever som åker buss', kort: 'åker buss', text: (N, D) => `I en klass går ${N} elever. ${D} av eleverna åker buss till skolan.`,
      fraga: 'Hur många procent av eleverna åker buss?', las: ['Hur många procent som åker buss', 'Hur många elever som åker buss', 'Hur många elever det är i klassen'], svar: p => `${p} % av eleverna åker buss.` }),
    () => andel({ titel: 'Matcherna', hel: 'Matcher', n: 5, a: [3, 8], k: [1, 4], sak: 'matcher', sak2: 'vunna matcher', kort: 'vinster', text: (N, D) => `Ett lag spelade ${N} matcher. Laget vann ${D} av matcherna.`,
      fraga: 'Hur många procent av matcherna vann laget?', las: ['Hur många procent av matcherna laget vann', 'Hur många matcher laget vann', 'Hur många matcher laget förlorade'], svar: p => `Laget vann ${p} % av matcherna.` }),
    () => {
      const n = P([4, 5, 10]), v = mult(n == 10 ? 50 : 10, 100, 400), Fp = n * v, Np = (n - 1) * v, p = 100 / n;
      return { titel: 'Rean', text: `En jacka kostade ${tal(Fp)} kr. Nu är den på rea och kostar ${tal(Np)} kr.`, fraga: 'Hur många procent har priset sänkts?', rader: [{ n: 'Före', f: 'b' }, { n: 'Nu', f: 'g' }],
        steg: [V('Läs hela uppgiften', 'Vad ska vi ta reda på?', ['Hur många procent priset har sänkts', 'Hur många kronor priset har sänkts', 'Vad jackan kostar nu'], 'Vi söker hur många procent priset har sänkts.'),
          T('Hur mycket billigare?', 'Hur många kronor billigare är jackan?', v, `${tal(Fp)} − ${tal(Np)}`, `Jackan är ${v} kr billigare.`, [{ e: 'r', h: `${tal(Fp)} − ${tal(Np)} = ${v} kr` }], ' kr'),
          T(`Hur många ${v} kr i ${tal(Fp)} kr?`, `Hur många gånger får ${v} kr plats i ${tal(Fp)} kr? Det blir antalet block.`, n, `${tal(Fp)} / ${v}`, `${n} block à ${v} kr.`,
            [{ e: 'antal', rad: 0, n }, { e: 'fyll', rad: 0, t: v }, { e: 'kl', id: 'f', rad: 0, t: tal(Fp) + ' kr', pos: 'o' }, { e: 'r', h: `${F(tal(Fp), v)} = ${n}` }]),
          { typ: 'delar', rub: 'Hur ritar vi priset nu?', q: `Nu kostar jackan ${tal(Np)} kr. Hur många block är det?`, rader: [{ rad: 0, n, fast: 1 }, { rad: 1, n: n - 1 }], tips: `${tal(Np)} / ${v} = ${n - 1} block.`, klar: `Nu: ${n - 1} block.`,
            sedan: [{ e: 'fyll', rad: 1, t: v }, { e: 'lagg', rad: 1, n: 1, s: 'stryk' }, { e: 'kl', id: 'n', rad: 1, fr: 0, ti: n - 2, t: tal(Np) + ' kr', pos: 'u' }] },
          T('Räkna ut det du söker', 'Hur många procent är ett block?', p, `100 % / ${n}`, `Ett block är ${p} %. Priset har sänkts med ${p} %.`, [{ e: 'r', h: `100 % / ${n} = ${p} %` }], ' %')],
        svar: `Priset har sänkts med ${p} %.`, koll: `${p} % av ${tal(Fp)} kr är ${v} kr. ${tal(Fp)} − ${v} = ${tal(Np)} kr.` };
    }] };

  return L;
};
