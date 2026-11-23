// Öva blockmodellen interaktivt (blockmodellen-ova.html). Eleven löser en textuppgift steg för steg:
// läs, rita blocken, skriv in det du vet, ta bort det som stör, räkna ut en del, svara.
// Nya tal och namn varje gång. Inget sparas. (2026-11-17)
(function () {
  const NAMN = ['Amira', 'Hugo', 'Kian', 'Ida', 'Teo', 'Lina', 'Omar', 'Arvid', 'Sofia', 'Melvin', 'Zara', 'Ali', 'Freja', 'Hanna', 'Leo', 'Ebba',
    'Nils', 'Aisha', 'Viggo', 'Elin', 'Samir', 'Moa', 'Alma', 'Liam', 'Karim', 'Saga', 'Ronja', 'Ivan', 'Emil', 'Adam', 'Nadia', 'Noor', 'Mira'];
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const P = a => a[Math.floor(Math.random() * a.length)];
  const namn = k => { const s = NAMN.slice(), r = []; for (let i = 0; i < k; i++) r.push(s.splice(Math.floor(Math.random() * s.length), 1)[0]); return r; };
  const gen = n => /[sxz]$/i.test(n) ? n : n + 's';
  const F = (a, b) => `<span class="bmf"><span>${a}</span><span>${b}</span></span>`;
  const blanda = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tal = n => { const s = String(n); return n >= 1000 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : s; };
  const nrm = s => String(s).replace(/[٠-٩]/g, c => c.charCodeAt(0) - 0x660).replace(/[۰-۹]/g, c => c.charCodeAt(0) - 0x6F0)
    .replace(/[٫،，]/g, ',').replace(/．/g, '.').trim().replace(/\s/g, '').replace(',', '.').replace('−', '-').replace(/(kr|kronor|st|sidor|km|dl|elever|%|liter|l|m³|m3|kg|år|medlemmar|barn|pennor)$/i, '');
  const RANG = (a, b) => { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; };

  // Vanliga steg
  const LAS = (ratt, fel) => ({ typ: 'val', rub: 'Läs hela uppgiften', q: 'Vad söker vi?', alt: [ratt].concat(fel), klar: 'Vi söker ' + ratt.charAt(0).toLowerCase() + ratt.slice(1) + '.' });
  const ALLA = (S, fel, enh) => ({ typ: 'val', rub: 'Skriv in det du vet', q: 'Vilket tal visar alla block tillsammans?', alt: [tal(S) + enh].concat(fel.map(f => tal(f) + enh)), klar: 'Alla block tillsammans är ' + tal(S) + enh + '.', sedan: [{ e: 'hog', t: tal(S) }] });
  const EN_DEL = (tot, delar, u, enh, extra) => delar == 1
    ? ({ typ: 'tal', rub: 'Hur mycket är en del?', q: 'Hur mycket är en del?', svar: u, enh, tips: `Det är bara en del, och den är ${tal(tot)}${enh}.`, klar: `En del är ${tal(u)}${enh}.`,
      sedan: [{ e: 'fyll', rad: '*', t: tal(u) }] })
    : ({ typ: 'tal', rub: 'Hur mycket är en del?', q: 'Hur mycket är en del?' + (extra || ''), svar: u, enh,
      tips: `${tal(tot)}${enh} fördelas lika på ${delar} delar. Dividera ${tal(tot)} med ${delar}.`, klar: `En del är ${tal(u)}${enh}.`,
      sedan: [{ e: 'fyll', rad: '*', t: tal(u) }, { e: 'r', h: `${F(tal(tot), delar)} = ${tal(u)}` }] });

  // ---------- Uppgiftstyper ----------
  const TYPER = [
    // NATURLIGA TAL
    { id: 'n1', omr: 'nat', namn: 'Gånger så många', gor() {
      const [A, B] = namn(2), k = R(2, 5), u = R(6, 40), S = (k + 1) * u, sak = P(['kulor', 'kort', 'klistermärken', 'frimärken', 'pärlor']);
      return { text: `${A} har ${k} gånger så många ${sak} som ${B}. Tillsammans har de ${S} ${sak}.`, fraga: `Hur många ${sak} har ${A}?`,
        rader: [{ n: A, f: 'g' }, { n: B, f: 'b' }],
        steg: [LAS(`Hur många ${sak} ${A} har`, [`Hur många ${sak} ${B} har`, `Hur många ${sak} de har tillsammans`]),
          { typ: 'delar', rub: 'Rita blocken', q: `${B} har minst, så ${B} får 1 del. Hur många lika stora delar får ${A}?`, rader: [{ rad: 0, n: k }, { rad: 1, n: 1, fast: 1 }],
            tips: `"${k} gånger så många" betyder ${k} lika stora delar.`, klar: `${A} får ${k} delar och ${B} 1 del.`, sedan: [{ e: 'kl', id: 'q', rad: 0, t: '?', pos: 'o' }] },
          ALLA(S, [k, k + 1], ''),
          { typ: 'tal', rub: 'Hur delar vi blocket?', q: 'Hur många lika stora delar finns det sammanlagt?', svar: k + 1, tips: `Räkna delarna i båda blocken: ${k} + 1.`, klar: `Det finns ${k + 1} delar.` },
          EN_DEL(S, k + 1, u, ''),
          { typ: 'tal', rub: 'Räkna ut det du söker', q: `Hur många ${sak} har ${A}?`, svar: k * u, tips: `${A} har ${k} delar. Multiplicera: ${k} · ${u}.`, klar: `${A} har ${k * u} ${sak}.`,
            sedan: [{ e: 'kl', id: 'q', rad: 0, t: tal(k * u), pos: 'o' }, { e: 'r', h: `${k} · ${u} = ${k * u}` }] }],
        svar: `${A} har ${k * u} ${sak}.`, koll: `${k * u} + ${u} = ${S} och ${k * u} är ${k} gånger så mycket som ${u}.` };
    } },
    { id: 'n2', omr: 'nat', namn: 'Fler än', gor() {
      const [A, B] = namn(2), u = R(8, 60), d = R(3, 30), S = 2 * u + d;
      return { text: `${A} och ${B} har tillsammans ${S} kr. ${A} har ${d} kr mer än ${B}.`, fraga: `Hur mycket pengar har ${A}?`,
        rader: [{ n: A, f: 'g' }, { n: B, f: 'b' }],
        steg: [LAS(`Hur mycket pengar ${A} har`, [`Hur mycket pengar de har tillsammans`, `Hur mycket pengar ${B} har`]),
          { typ: 'val', rub: 'Rita blocken', q: `${A} har ${d} kr mer än ${B}. Hur ritar vi ${gen(A)} block?`,
            alt: [`Lika långt som ${gen(B)} block och en extra bit`, `Kortare än ${gen(B)} block`, `Dubbelt så långt som ${gen(B)} block`],
            klar: `${gen(A)} block är lika långt som ${gen(B)} och en extra bit på ${d} kr.`, sedan: [{ e: 'x', rad: 0, t: tal(d), w: .55 }, { e: 'kl', id: 'q', rad: 0, fr: 0, ti: 'x', t: '?', pos: 'o' }] },
          ALLA(S, [d, S - d], ' kr'),
          { typ: 'markera', rub: 'Är det något som stör?', q: 'Något gör att blocken inte är lika stora. Klicka på det som stör.', rad: 0, mal: 'x',
            tips: `Det är den extra biten på ${d} kr.`, klar: `Vi tar bort den extra biten på ${d} kr.`, sedan: [{ e: 'xs', rad: 0, s: 'stryk' }] },
          { typ: 'tal', rub: 'Är det något som stör?', q: `Hur mycket är kvar när vi tar bort ${d} kr?`, svar: S - d, enh: ' kr', tips: `Subtrahera: ${S} − ${d}.`, klar: `Kvar är ${S - d} kr.`,
            sedan: [{ e: 'hog', t: tal(S - d) }, { e: 'r', h: `${S} − ${d} = ${S - d}` }] },
          EN_DEL(S - d, 2, u, ' kr'),
          { typ: 'tal', rub: 'Räkna ut det du söker', q: `Hur mycket pengar har ${A}?`, svar: u + d, enh: ' kr', tips: `${A} har en del och den extra biten: ${u} + ${d}.`, klar: `${A} har ${u + d} kr.`,
            sedan: [{ e: 'xs', rad: 0, s: '' }, { e: 'hog', t: tal(S) }, { e: 'kl', id: 'q', rad: 0, fr: 0, ti: 'x', t: tal(u + d), pos: 'o' }, { e: 'r', h: `${u} + ${d} = ${u + d}` }] }],
        svar: `${A} har ${u + d} kr.`, koll: `${u + d} + ${u} = ${S} och ${u + d} − ${u} = ${d}.` };
    } },
    { id: 'n3', omr: 'nat', namn: 'Gånger så många och skillnad', gor() {
      const [A, B] = namn(2), k = R(3, 6), u = R(5, 30), d = (k - 1) * u;
      return { text: `${A} har sprungit ${k} gånger så många varv som ${B}. ${A} har sprungit ${d} varv fler än ${B}.`, fraga: `Hur många varv har ${B} sprungit?`,
        rader: [{ n: A, f: 'g' }, { n: B, f: 'b' }],
        steg: [LAS(`Hur många varv ${B} har sprungit`, [`Hur många varv ${A} har sprungit`, `Hur många varv de har sprungit tillsammans`]),
          { typ: 'delar', rub: 'Rita blocken', q: `${B} har minst och får 1 del. Hur många lika stora delar får ${A}?`, rader: [{ rad: 0, n: k }, { rad: 1, n: 1, fast: 1 }],
            tips: `"${k} gånger så många" betyder ${k} lika stora delar.`, klar: `${A} får ${k} delar och ${B} 1 del.`, sedan: [{ e: 'kl', id: 'q', rad: 1, t: '?', pos: 'u' }] },
          { typ: 'markera', rub: 'Skriv in det du vet', q: `${A} har ${d} varv fler. Klicka på de delar i ${gen(A)} block som sticker ut förbi ${gen(B)} block.`, rad: 0, ratt: RANG(1, k - 1),
            tips: `${gen(B)} block är lika långt som den första delen hos ${A}. Det som är fler är resten av ${gen(A)} block.`, klar: `De ${k - 1} delarna som sticker ut är ${d} varv.`,
            sedan: [{ e: 'stil', rad: 0, fr: 1, ti: k - 1, s: 'kand' }, { e: 'kl', id: 'd', rad: 0, fr: 1, ti: k - 1, t: tal(d), pos: 'o' }] },
          EN_DEL(d, k - 1, u, ''),
          { typ: 'tal', rub: 'Räkna ut det du söker', q: `Hur många varv har ${B} sprungit?`, svar: u, tips: `${B} har 1 del.`, klar: `${B} har sprungit ${u} varv.`, sedan: [{ e: 'kl', id: 'q', rad: 1, t: tal(u), pos: 'u' }] }],
        svar: `${B} har sprungit ${u} varv.`, koll: `${A}: ${k} · ${u} = ${k * u} varv, och ${k * u} − ${u} = ${d}.` };
    } },
    // BRÅK
    { id: 'b1', omr: 'brak', namn: 'Del av det hela', gor() {
      const [a, b] = P([[1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [3, 8]]), [A] = namn(1), u = R(4, 25);
      const ctx = P([{ sak: 'Boken', text: `${A} har läst ${F(a, b)} av en bok. Det är ${a * u} sidor.`, fraga: 'Hur många sidor har boken?', enh: ' sidor', vad: 'Hur många sidor boken har', fel: [`Hur många sidor ${A} har läst`, 'Hur många sidor som är kvar'], del: 'läst' },
        { sak: 'Vägen', text: `${A} har cyklat ${F(a, b)} av vägen till stranden. Det är ${a * u} km.`, fraga: 'Hur lång är vägen till stranden?', enh: ' km', vad: 'Hur lång hela vägen är', fel: [`Hur långt ${A} har cyklat`, 'Hur långt det är kvar'], del: 'cyklat' }]);
      return { text: ctx.text, fraga: ctx.fraga, rader: [{ n: ctx.sak, f: 'g' }], start: [{ e: 'kl', id: 'q', rad: 0, t: '?', pos: 'o' }],
        steg: [LAS(ctx.vad, ctx.fel),
          { typ: 'delar', rub: 'Hur delar vi blocket?', q: `Blocket är det hela. Hur många lika stora delar ska det ha?`, rader: [{ rad: 0, n: b }], tips: `Nämnaren i ${F(a, b)} är ${b}.`, klar: `Blocket delas i ${b} delar.` },
          { typ: 'markera', rub: 'Skriv in det du vet', q: `${A} har ${ctx.del} ${F(a, b)}. Klicka på ${a} ${a == 1 ? 'del' : 'delar'}.`, rad: 0, antal: a, plats: 0,
            tips: `Täljaren i ${F(a, b)} är ${a}. Klicka på ${a} block.`, klar: `${a} ${a == 1 ? 'del' : 'delar'} är ${a * u}${ctx.enh}.`,
            sedan: [{ e: 'stil', rad: 0, fr: 0, ti: a - 1, s: 'kand' }, { e: 'kl', id: 'k', rad: 0, fr: 0, ti: a - 1, t: tal(a * u) + ctx.enh, pos: 'u' }] },
          EN_DEL(a * u, a, u, ctx.enh),
          { typ: 'tal', rub: 'Räkna ut det du söker', q: ctx.fraga, svar: b * u, enh: ctx.enh, tips: `Det hela är ${b} delar. Multiplicera: ${b} · ${u}.`, klar: `Det hela är ${b * u}${ctx.enh}.`,
            sedan: [{ e: 'kl', id: 'q', rad: 0, t: tal(b * u) + ctx.enh, pos: 'o' }, { e: 'r', h: `${b} · ${u} = ${b * u}` }] }],
        svar: ctx.sak == 'Boken' ? `Boken har ${b * u} sidor.` : `Vägen till stranden är ${b * u} km.`, koll: `${F(1, b)} av ${b * u} är ${u}, och ${a} · ${u} = ${a * u}.` };
    } },
    { id: 'b2', omr: 'brak', namn: 'Del av resten', gor() {
      const [a, b, m] = P([[1, 3, 2], [1, 5, 2], [3, 5, 2], [1, 4, 3], [1, 5, 4], [2, 5, 3], [1, 7, 2], [3, 7, 2]]), [A] = namn(1), u = 10 * R(Math.ceil(35 / b), Math.floor(120 / b));  // totalt ca 350–1200 kr, så att bok och tröja får rimliga priser (Nikola 2026-11-23)
      const rest = b - a, t = rest / m, kvar = rest - t, K = kvar * u;
      return { text: `${A} fick pengar på sin födelsedag. ${A} använde ${F(a, b)} av pengarna till en bok och ${F(1, m)} av resten till en tröja. Nu har ${A} ${K} kr kvar.`,
        fraga: `Hur mycket pengar fick ${A}?`, rader: [{ n: 'Pengarna', f: 'g' }], start: [{ e: 'kl', id: 'q', rad: 0, t: '?', pos: 'o' }],
        steg: [LAS(`Hur mycket pengar ${A} fick`, [`Hur mycket boken kostade`, `Hur mycket pengar ${A} har kvar`]),
          { typ: 'delar', rub: 'Hur delar vi blocket?', q: `Blocket är alla pengar. Hur många lika stora delar ska det ha för att visa ${F(a, b)}?`, rader: [{ rad: 0, n: b }], tips: `Nämnaren i ${F(a, b)} är ${b}.`, klar: `Blocket delas i ${b} delar.` },
          { typ: 'markera', rub: 'Skriv in det du vet', q: `Klicka på de delar som gick till boken (${F(a, b)}).`, rad: 0, antal: a, plats: 0,
            tips: `${F(a, b)} är ${a} av de ${b} delarna.`, klar: `Boken: ${a} ${a == 1 ? 'del' : 'delar'}.`,
            sedan: [{ e: 'stil', rad: 0, fr: 0, ti: a - 1, s: 'stryk' }, { e: 'kl', id: 'bok', rad: 0, fr: 0, ti: a - 1, t: 'bok', pos: 'u' }] },
          { typ: 'tal', rub: 'Är det något som stör?', q: 'Hur många delar är kvar (resten)?', svar: rest, tips: `${b} − ${a}`, klar: `Resten är ${rest} delar.` },
          { typ: 'markera', rub: 'Skriv in det du vet', q: `${F(1, m)} av resten gick till tröjan. Klicka på de delar som gick till tröjan.`, rad: 0, antal: t, plats: a,
            tips: `Resten är ${rest} delar. ${F(1, m)} av ${rest} delar är ${t} ${t == 1 ? 'del' : 'delar'}.`, klar: `Tröjan: ${t} ${t == 1 ? 'del' : 'delar'}.`,
            sedan: [{ e: 'stil', rad: 0, fr: a, ti: a + t - 1, s: 'stryk' }, { e: 'kl', id: 'tr', rad: 0, fr: a, ti: a + t - 1, t: 'tröja', pos: 'u' },
              { e: 'stil', rad: 0, fr: a + t, ti: b - 1, s: 'kand' }, { e: 'kl', id: 'kv', rad: 0, fr: a + t, ti: b - 1, t: K + ' kr', pos: 'u' }] },
          EN_DEL(K, kvar, u, ' kr', ` De ${kvar} delarna som är kvar är ${K} kr.`),
          { typ: 'tal', rub: 'Räkna ut det du söker', q: `Hur mycket pengar fick ${A}?`, svar: b * u, enh: ' kr', tips: `Alla pengar är ${b} delar: ${b} · ${u}.`, klar: `${A} fick ${b * u} kr.`,
            sedan: [{ e: 'kl', id: 'q', rad: 0, t: tal(b * u) + ' kr', pos: 'o' }, { e: 'r', h: `${b} · ${u} = ${b * u}` }] }],
        svar: `${A} fick ${b * u} kr.`, koll: `Boken ${a * u} kr, tröjan ${t * u} kr och kvar ${K} kr: ${a * u} + ${t * u} + ${K} = ${b * u}.` };
    } },
    { id: 'b3', omr: 'brak', namn: 'Bråkdel så många', gor() {
      const [a, b] = P([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6]]), [A, B] = namn(2), u = R(3, 15), d = (b - a) * u;
      return { text: `${A} har ${F(a, b)} så många spelkort som ${B}. ${B} har ${d} kort fler än ${A}.`, fraga: 'Hur många kort har de tillsammans?',
        rader: [{ n: B, f: 'g' }, { n: A, f: 'b' }],
        steg: [LAS('Hur många kort de har tillsammans', [`Hur många kort ${A} har`, `Hur många fler kort ${B} har`]),
          { typ: 'delar', rub: 'Rita blocken', q: `Rita blocken. Hur många lika stora delar får ${B} och hur många får ${A}?`, rader: [{ rad: 0, n: b }, { rad: 1, n: a }],
            tips: `${F(a, b)} så många: ${gen(B)} block får ${b} delar och ${gen(A)} block ${a} sådana delar.`, klar: `${B} får ${b} delar och ${A} ${a} delar.`, sedan: [{ e: 'hog', t: '?' }] },
          { typ: 'markera', rub: 'Skriv in det du vet', q: `${B} har ${d} kort fler. Klicka på de delar i ${gen(B)} block som sticker ut förbi ${gen(A)} block.`, rad: 0, ratt: RANG(a, b - 1),
            tips: `${gen(A)} block är ${a} delar långt. Det som sticker ut är de sista ${b - a} delarna hos ${B}.`, klar: `${b - a} ${b - a == 1 ? 'del' : 'delar'} är ${d} kort.`,
            sedan: [{ e: 'stil', rad: 0, fr: a, ti: b - 1, s: 'kand' }, { e: 'kl', id: 'd', rad: 0, fr: a, ti: b - 1, t: tal(d), pos: 'o' }] },
          EN_DEL(d, b - a, u, ''),
          { typ: 'tal', rub: 'Hur delar vi blocket?', q: 'Hur många delar finns det sammanlagt?', svar: a + b, tips: `${b} + ${a}`, klar: `Det finns ${a + b} delar.` },
          { typ: 'tal', rub: 'Räkna ut det du söker', q: 'Hur många kort har de tillsammans?', svar: (a + b) * u, tips: `${a + b} delar: ${a + b} · ${u}.`, klar: `Tillsammans har de ${(a + b) * u} kort.`,
            sedan: [{ e: 'hog', t: tal((a + b) * u) }, { e: 'r', h: `${a + b} · ${u} = ${(a + b) * u}` }] }],
        svar: `De har ${(a + b) * u} kort tillsammans.`, koll: `${B}: ${b * u} kort, ${A}: ${a * u} kort. ${b * u} − ${a * u} = ${d}.` };
    } },
    // FÖRHÅLLANDE
    { id: 'f1', omr: 'forh', namn: 'Dela i ett förhållande', gor() {
      const [p, q] = P([[1, 2], [2, 3], [3, 4], [1, 3], [2, 5], [3, 5], [1, 4], [4, 5], [3, 2], [5, 3]]), u = R(3, 20), S = (p + q) * u;
      const c = P([{ a: 'Röda', b: 'Gröna', text: `I en skål finns röda och gröna äpplen i förhållandet ${p}:${q}. Det finns ${S} äpplen i skålen.`, fraga: 'Hur många gröna äpplen finns det?', sak: 'gröna äpplen', vad: 'Hur många gröna äpplen det finns', fel: ['Hur många röda äpplen det finns', 'Hur många äpplen det finns'] },
        { a: 'Saft', b: 'Vatten', text: `Saft och vatten blandas i förhållandet ${p}:${q}. Det blir ${S} dl blandning.`, fraga: 'Hur mycket vatten används?', sak: 'dl vatten', enh: ' dl', vad: 'Hur mycket vatten som används', fel: ['Hur mycket saft som används', 'Hur mycket blandning det blir'] }]);
      const e = c.enh || '';
      return { text: c.text, fraga: c.fraga, rader: [{ n: c.a, f: 'g' }, { n: c.b, f: 'b' }],
        steg: [LAS(c.vad, c.fel),
          { typ: 'delar', rub: 'Rita blocken', q: `Förhållandet är ${p}:${q}. Hur många lika stora delar får varje block?`, rader: [{ rad: 0, n: p }, { rad: 1, n: q }],
            tips: `${p}:${q} betyder ${p} ${p == 1 ? 'del' : 'delar'} ${c.a.toLowerCase()} och ${q} ${q == 1 ? 'del' : 'delar'} ${c.b.toLowerCase()}.`, klar: `${c.a}: ${p}, ${c.b.toLowerCase()}: ${q} delar.`, sedan: [{ e: 'kl', id: 'q', rad: 1, t: '?', pos: 'u' }] },
          ALLA(S, [p + q, q], e),
          { typ: 'tal', rub: 'Hur delar vi blocket?', q: 'Hur många delar finns det sammanlagt?', svar: p + q, tips: `${p} + ${q}`, klar: `Det finns ${p + q} delar.` },
          EN_DEL(S, p + q, u, e),
          { typ: 'tal', rub: 'Räkna ut det du söker', q: c.fraga, svar: q * u, enh: e, tips: `${c.b} är ${q} ${q == 1 ? 'del' : 'delar'}: ${q} · ${u}.`, klar: `Det är ${q * u} ${c.sak}.`,
            sedan: [{ e: 'kl', id: 'q', rad: 1, t: tal(q * u) + e, pos: 'u' }, { e: 'r', h: `${q} · ${u} = ${q * u}` }] }],
        svar: c.a == 'Röda' ? `Det finns ${q * u} gröna äpplen.` : `Det används ${q * u} dl vatten.`, koll: `${p * u} + ${q * u} = ${S} och ${p * u}:${q * u} = ${p}:${q}.` };
    } },
    { id: 'f2', omr: 'forh', namn: 'Förhållande och skillnad', gor() {
      const [p, q] = P([[2, 3], [3, 4], [1, 3], [2, 5], [3, 5], [1, 4], [4, 7], [3, 7]]), u = R(3, 18), d = (q - p) * u;
      return { text: `På en konsert är förhållandet mellan vuxna och barn ${p}:${q}. Det är ${d} fler barn än vuxna.`, fraga: 'Hur många vuxna är på konserten?',
        rader: [{ n: 'Barn', f: 'g' }, { n: 'Vuxna', f: 'b' }],
        steg: [LAS('Hur många vuxna det är', ['Hur många barn det är', 'Hur många fler barn det är']),
          { typ: 'delar', rub: 'Rita blocken', q: `Förhållandet vuxna:barn är ${p}:${q}. Hur många lika stora delar får varje block?`, rader: [{ rad: 0, n: q }, { rad: 1, n: p }],
            tips: `${p}:${q} betyder ${p} ${p == 1 ? 'del' : 'delar'} vuxna och ${q} delar barn.`, klar: `Barn: ${q} delar, vuxna: ${p} ${p == 1 ? 'del' : 'delar'}.`, sedan: [{ e: 'kl', id: 'q', rad: 1, t: '?', pos: 'u' }] },
          { typ: 'markera', rub: 'Skriv in det du vet', q: `Det är ${d} fler barn. Klicka på de delar i barnens block som sticker ut förbi de vuxnas block.`, rad: 0, ratt: RANG(p, q - 1),
            tips: `De vuxnas block är ${p} ${p == 1 ? 'del' : 'delar'} långt. Det som sticker ut är de sista ${q - p} delarna.`, klar: `${q - p} delar är ${d} personer.`,
            sedan: [{ e: 'stil', rad: 0, fr: p, ti: q - 1, s: 'kand' }, { e: 'kl', id: 'd', rad: 0, fr: p, ti: q - 1, t: tal(d), pos: 'o' }] },
          EN_DEL(d, q - p, u, ''),
          { typ: 'tal', rub: 'Räkna ut det du söker', q: 'Hur många vuxna är på konserten?', svar: p * u, tips: `De vuxna är ${p} ${p == 1 ? 'del' : 'delar'}: ${p} · ${u}.`, klar: `Det är ${p * u} vuxna.`,
            sedan: [{ e: 'kl', id: 'q', rad: 1, t: tal(p * u), pos: 'u' }, { e: 'r', h: `${p} · ${u} = ${p * u}` }] }],
        svar: `Det är ${p * u} vuxna på konserten.`, koll: `Barn: ${q * u}. ${q * u} − ${p * u} = ${d} och ${p * u}:${q * u} = ${p}:${q}.` };
    } },
    { id: 'f3', omr: 'forh', namn: 'Tre delar', gor() {
      const [p, q, r] = P([[1, 2, 3], [2, 3, 4], [1, 3, 4], [2, 3, 5], [1, 2, 5], [3, 4, 5]]), [A, B, C] = namn(3), u = 10 * R(2, 15), S = (p + q + r) * u;
      return { text: `${A}, ${B} och ${C} delar på ${S} kr i förhållandet ${p}:${q}:${r}.`, fraga: `Hur mycket får ${C}?`,
        rader: [{ n: A, f: 'g' }, { n: B, f: 'b' }, { n: C, f: 'y' }],
        steg: [LAS(`Hur mycket ${C} får`, [`Hur mycket ${A} får`, 'Hur mycket de har tillsammans']),
          { typ: 'delar', rub: 'Rita blocken', q: `Förhållandet är ${p}:${q}:${r}. Hur många lika stora delar får var och en?`, rader: [{ rad: 0, n: p }, { rad: 1, n: q }, { rad: 2, n: r }],
            tips: `Talen i förhållandet ${p}:${q}:${r} visar antalet delar i samma ordning som namnen.`, klar: `${A}: ${p}, ${B}: ${q}, ${C}: ${r} delar.`, sedan: [{ e: 'kl', id: 'q', rad: 2, t: '?', pos: 'u' }] },
          ALLA(S, [p + q + r, r * 10], ' kr'),
          { typ: 'tal', rub: 'Hur delar vi blocket?', q: 'Hur många delar finns det sammanlagt?', svar: p + q + r, tips: `${p} + ${q} + ${r}`, klar: `Det finns ${p + q + r} delar.` },
          EN_DEL(S, p + q + r, u, ' kr'),
          { typ: 'tal', rub: 'Räkna ut det du söker', q: `Hur mycket får ${C}?`, svar: r * u, enh: ' kr', tips: `${C} får ${r} delar: ${r} · ${u}.`, klar: `${C} får ${r * u} kr.`,
            sedan: [{ e: 'kl', id: 'q', rad: 2, t: tal(r * u) + ' kr', pos: 'u' }, { e: 'r', h: `${r} · ${u} = ${r * u}` }] }],
        svar: `${C} får ${r * u} kr.`, koll: `${p * u} + ${q * u} + ${r * u} = ${S}.` };
    } },
    // PROCENT
    { id: 'p1', omr: 'proc', namn: 'Procent av det hela', gor() {
      const [pct, n, k] = P([[10, 10, 1], [20, 5, 1], [25, 4, 1], [50, 2, 1], [40, 5, 2], [60, 5, 3], [75, 4, 3], [30, 10, 3]]), u = R(4, 40);
      return { text: `${pct} % av eleverna på en skola cyklar till skolan. Det är ${k * u} elever.`, fraga: 'Hur många elever går på skolan?',
        rader: [{ n: 'Alla elever', f: 'g' }], start: [{ e: 'kl', id: 'q', rad: 0, t: '? (100 %)', pos: 'o' }],
        steg: [LAS('Hur många elever som går på skolan', ['Hur många elever som cyklar', 'Hur många elever som inte cyklar']),
          { typ: 'delar', rub: 'Hur delar vi blocket?', q: `Blocket är alla elever, 100 %. Dela det i lika stora delar så att ${pct} % blir en eller flera hela delar. Hur många delar?`, rader: [{ rad: 0, n: n }],
            tips: `Om varje del är ${100 / n} % behövs ${n} delar, eftersom ${n} · ${100 / n} % = 100 %.`, klar: `${n} delar, ${100 / n} % i varje.`, sedan: [{ e: 'fyll', rad: 0, t: (100 / n) + ' %' }] },
          { typ: 'markera', rub: 'Skriv in det du vet', q: `Klicka på de delar som är ${pct} %.`, rad: 0, antal: k, plats: 0,
            tips: `Varje del är ${100 / n} %. ${pct} % är ${k} ${k == 1 ? 'del' : 'delar'}.`, klar: `${k} ${k == 1 ? 'del' : 'delar'} är ${k * u} elever.`,
            sedan: [{ e: 'stil', rad: 0, fr: 0, ti: k - 1, s: 'kand' }, { e: 'kl', id: 'k', rad: 0, fr: 0, ti: k - 1, t: tal(k * u), pos: 'u' }] },
          EN_DEL(k * u, k, u, ' elever'),
          { typ: 'tal', rub: 'Räkna ut det du söker', q: 'Hur många elever går på skolan?', svar: n * u, enh: ' elever', tips: `Alla elever är ${n} delar: ${n} · ${u}.`, klar: `Det går ${n * u} elever på skolan.`,
            sedan: [{ e: 'kl', id: 'q', rad: 0, t: tal(n * u), pos: 'o' }, { e: 'r', h: `${n} · ${u} = ${n * u}` }] }],
        svar: `Det går ${n * u} elever på skolan.`, koll: `${pct} % av ${n * u} = ${k * u}.` };
    } },
    { id: 'p2', omr: 'proc', namn: 'Rabatt', gor() {
      const BEST = { 'En jacka': 'Jackan', 'Ett par skor': 'Skorna', 'Ett spel': 'Spelet', 'En cykelhjälm': 'Cykelhjälmen' };
      const [pct, n, k] = P([[20, 5, 1], [25, 4, 1], [10, 10, 1], [40, 5, 2], [30, 10, 3], [50, 2, 1]]), sak = P(['En jacka', 'Ett par skor', 'Ett spel', 'En cykelhjälm']);
      const u = n == 10 ? 10 * R(3, 30) : 5 * R(4, 40), Rp = (n - k) * u, ord = null;
      return { text: `${sak} är rabatterad med ${pct} %. Nu kostar ${sak.startsWith('Ett par') ? 'de' : 'den'} ${Rp} kr.`, fraga: `Vad kostade ${BEST[sak].toLowerCase()} före rabatten?`,
        rader: [{ n: 'Ordinarie pris', f: 'y' }], start: [{ e: 'kl', id: 'q', rad: 0, t: '? (100 %)', pos: 'o' }],
        steg: [LAS('Priset före rabatten', ['Hur stor rabatten är i kronor', 'Priset efter rabatten']),
          { typ: 'delar', rub: 'Hur delar vi blocket?', q: `Blocket är priset före rabatten, 100 %. Dela det så att ${pct} % blir en eller flera hela delar. Hur många delar?`, rader: [{ rad: 0, n: n }],
            tips: `Om varje del är ${100 / n} % behövs ${n} delar.`, klar: `${n} delar, ${100 / n} % i varje.`, sedan: [{ e: 'fyll', rad: 0, t: (100 / n) + ' %' }] },
          { typ: 'markera', rub: 'Är det något som stör?', q: `Rabatten tas bort från priset. Klicka på de delar som är rabatten (${pct} %).`, rad: 0, antal: k, plats: n - k,
            tips: `Varje del är ${100 / n} %. ${pct} % är ${k} ${k == 1 ? 'del' : 'delar'}.`, klar: `Rabatten är ${k} ${k == 1 ? 'del' : 'delar'}.`,
            sedan: [{ e: 'stil', rad: 0, fr: n - k, ti: n - 1, s: 'stryk' }, { e: 'kl', id: 'rab', rad: 0, fr: n - k, ti: n - 1, t: 'rabatt', pos: 'u' }] },
          { typ: 'tal', rub: 'Skriv in det du vet', q: `Hur många delar är kvar? De är priset nu, ${Rp} kr.`, svar: n - k, tips: `${n} − ${k}`, klar: `${n - k} delar är ${Rp} kr.`,
            sedan: [{ e: 'stil', rad: 0, fr: 0, ti: n - k - 1, s: 'kand' }, { e: 'kl', id: 'nu', rad: 0, fr: 0, ti: n - k - 1, t: Rp + ' kr', pos: 'u' }] },
          EN_DEL(Rp, n - k, u, ' kr'),
          { typ: 'tal', rub: 'Räkna ut det du söker', q: `Vad kostade ${BEST[sak].toLowerCase()} före rabatten?`, svar: n * u, enh: ' kr', tips: `Priset före rabatten är alla ${n} delar: ${n} · ${u}.`, klar: `Priset före rabatten var ${n * u} kr.`,
            sedan: [{ e: 'kl', id: 'q', rad: 0, t: tal(n * u) + ' kr', pos: 'o' }, { e: 'r', h: `${n} · ${u} = ${n * u}` }] }],
        svar: `${BEST[sak]} kostade ${n * u} kr före rabatten.`,
        koll: `${pct} % av ${n * u} är ${k * u} kr. ${n * u} − ${k * u} = ${Rp}.` };
    } },
    { id: 'p3', omr: 'proc', namn: 'Procent fler', gor() {
      const [pct, n, k] = P([[25, 4, 1], [20, 5, 1], [50, 2, 1], [10, 10, 1], [40, 5, 2], [75, 4, 3]]), u = R(8, 60), T = (n + k) * u;
      return { text: `I år kom ${pct} % fler besökare till skolans loppis än förra året. I år kom ${T} besökare.`, fraga: 'Hur många besökare kom förra året?',
        rader: [{ n: 'Förra året', f: 'b' }, { n: 'I år', f: 'g' }],
        steg: [LAS('Hur många besökare som kom förra året', ['Hur många fler besökare som kom i år', 'Hur många besökare som kom i år']),
          { typ: 'delar', rub: 'Rita blocken', q: `Förra året är 100 %. Dela förra årets block så att ${pct} % blir en eller flera hela delar. Hur många delar?`, rader: [{ rad: 0, n: n }, { rad: 1, n: 1, fast: 1 }],
            tips: `Om varje del är ${100 / n} % behövs ${n} delar för 100 %.`, klar: `Förra året: ${n} delar, ${100 / n} % i varje.`, sedan: [{ e: 'fyll', rad: 0, t: (100 / n) + ' %' }] },
          { typ: 'delar', rub: 'Rita blocken', q: `I år kom ${pct} % fler. Hur många lika stora delar får blocket för i år?`, rader: [{ rad: 0, n: n, fast: 1 }, { rad: 1, n: n + k }],
            tips: `I år är 100 % + ${pct} % = ${100 + pct} %. Det är ${n} + ${k} delar.`, klar: `I år: ${n + k} delar.`,
            sedan: [{ e: 'fyll', rad: 1, t: (100 / n) + ' %' }, { e: 'kl', id: 'q', rad: 0, t: '?', pos: 'o' }, { e: 'kl', id: 't', rad: 1, t: tal(T), pos: 'u' }, { e: 'stil', rad: 1, fr: 0, ti: n + k - 1, s: 'kand' }] },
          EN_DEL(T, n + k, u, '', ` I år kom ${T} besökare, och det är ${n + k} delar.`),
          { typ: 'tal', rub: 'Räkna ut det du söker', q: 'Hur många besökare kom förra året?', svar: n * u, tips: `Förra året är ${n} delar: ${n} · ${u}.`, klar: `Förra året kom ${n * u} besökare.`,
            sedan: [{ e: 'kl', id: 'q', rad: 0, t: tal(n * u), pos: 'o' }, { e: 'r', h: `${n} · ${u} = ${n * u}` }] }],
        svar: `Förra året kom ${n * u} besökare.`, koll: `${pct} % av ${n * u} är ${k * u}, och ${n * u} + ${k * u} = ${T}.` };
    } },
  ];
  const OMR = [['alla', 'Blandat'], ['nat', 'Naturliga tal'], ['brak', 'Bråk'], ['forh', 'Förhållande'], ['proc', 'Procent']];
  const FARG = { g: '#DCEBD6', b: '#D6E8F1', y: '#FBEFD3' };
  const INK = '#2E3A46', KOR = '#E07A5F', GRON = '#3E7A3D';

  // ---------- Tillstånd ----------
  const rot = document.getElementById('bmova');
  let omr = 'alla', senaste = '', U, st, ix, sel, fel, rattDirekt, vald;
  try { const o = sessionStorage.getItem('bmova-omr'); if (o && OMR.some(x => x[0] == o)) omr = o; } catch (e) {}
  const h = new URLSearchParams(location.search).get('omr'); if (h && OMR.some(x => x[0] == h)) omr = h;

  const LEK = window.BM_LEKTIONER_FN && BM_LEKTIONER_FN({ R, P, F, tal, EN_DEL, RANG, gen })[new URLSearchParams(location.search).get('l') || '1'];
  let lnr = 0;
  rot.innerHTML = (LEK ? `<div class="bmo-lek"><h2>${LEK.titel}</h2><div class="bmo-prog"></div></div>` : `<div class="bmo-omr" role="group" aria-label="Välj område">${OMR.map(([k, t]) => `<button type="button" data-o="${k}">${t}</button>`).join('')}</div>`) + `
  <article class="bmo-uppg"><div class="bmo-tag"></div><p class="bmo-text"></p><p class="bmo-fraga"></p></article>
  <div class="bmo-modell"><div class="bmo-svg"></div><div class="bmo-rakna"></div></div>
  <div class="bmo-steg"></div>`;
  const $ = s => rot.querySelector(s);
  rot.querySelectorAll('.bmo-omr button').forEach(b => b.onclick = () => { omr = b.dataset.o; try { sessionStorage.setItem('bmova-omr', omr); } catch (e) {} ny(); });

  function ny() {
    rot.querySelectorAll('.bmo-omr button').forEach(b => b.classList.toggle('on', b.dataset.o == omr));
    let lista = TYPER.filter(t => omr == 'alla' || t.omr == omr);
    if (lista.length > 1) lista = lista.filter(t => t.id != senaste);
    let T;
    if (LEK) { T = { id: 'l' + lnr, omr: LEK.omr, namn: 'Uppgift ' + (lnr + 1) }; U = LEK.uppg[lnr](); }
    else { T = P(lista); senaste = T.id; U = T.gor(); }
    U.typ = T;
    st = { rader: U.rader.map(r => ({ n: r.n, f: r.f, b: Array.from({ length: r.b || 1 }, () => ({ t: '', s: '', w: 1 })), x: null })), kl: [], hog: null, r: [] };
    (U.start || []).forEach(gor);
    ix = 0; fel = 0; rattDirekt = 0; U.klara = [];
    $('.bmo-tag').textContent = LEK ? `Uppgift ${lnr + 1}` : OMR.find(o => o[0] == T.omr)[1] + ' · ' + T.namn;
    if (LEK) $('.bmo-prog').innerHTML = LEK.uppg.map((_, i) => `<span class="${i < lnr ? 'klar' : i == lnr ? 'nu' : ''}">${i + 1}</span>`).join('');
    $('.bmo-text').innerHTML = U.text; $('.bmo-fraga').innerHTML = U.fraga;
    starta();
  }

  // ---------- Effekter ----------
  function gor(e) {
    const rader = e.rad === '*' ? st.rader : [st.rader[e.rad]];
    if (e.e == 'fyll') rader.forEach(r => { const a = e.fr || 0, b = e.ti == null ? r.b.length - 1 : e.ti; for (let i = a; i <= b; i++) if (!(e.ti == null && r.b[i].s == 'stryk' && r.b[i].w != 1)) r.b[i].t = e.t; });
    else if (e.e == 'stil') rader.forEach(r => { for (let i = e.fr; i <= e.ti; i++) r.b[i].s = e.s; });
    else if (e.e == 'kl') { st.kl = st.kl.filter(k => k.id != e.id); st.kl.push(e); }
    else if (e.e == 'hog') st.hog = e.t;
    else if (e.e == 'x') rader[0].x = e.t == null ? null : { t: e.t, s: '', w: e.w || .5 };
    else if (e.e == 'xs') rader[0].x.s = e.s;
    else if (e.e == 'r') st.r.push(e.h);
    else if (e.e == 'dela') rader.forEach(r => { const a = e.fr, b = e.ti, w = r.b.slice(a, b + 1).reduce((x, y) => x + (y.w || 1), 0);
      r.b.splice(a, b - a + 1, ...Array.from({ length: e.n }, () => ({ t: '', s: '', w: w / e.n }))); });
    else if (e.e == 'antal') rader.forEach(r => { r.b = Array.from({ length: e.n }, (_, i) => r.b[i] || { t: '', s: '', w: 1 }); });
    else if (e.e == 'lagg') rader.forEach(r => { for (let i = 0; i < e.n; i++) r.b.push({ t: e.t || '', s: e.s || '', w: e.w || 1 }); });
    else if (e.e == 'minus') rader[0].x = e.t == null ? null : { t: e.t, s: '', w: e.w || .4, minus: true };
  }

  // ---------- Ritning ----------
  function rita() {
    const box = $('.bmo-svg'), W = Math.max(280, box.clientWidth || 600), smal = W < 520;
    const L = smal ? 64 : 92, Rm = st.hog != null ? Math.max(smal ? 54 : 70, 22 + String(st.hog).length * (smal ? 8.6 : 9.8)) : 10, bw = W - L - Rm;
    const sw0 = r => r.b.reduce((a, b) => a + (b.w || 1), 0);
    const enh = Math.max(...st.rader.map(r => sw0(r) + (r.x && !r.x.minus ? r.x.w : 0)));
    const uw = bw / enh, rh = smal ? 40 : 46;
    const s = U.steg[ix], klick = s && s.typ == 'markera' ? s.rad : -1;
    let y = 8, o = '';
    st.rader.forEach((r, ri) => {
      const nv = pos => Math.max(0, ...st.kl.filter(k => k.rad == ri && k.pos == pos).map(k => k.niva || 1));
      y += 30 * nv('o');
      r.y = y; y += rh;
      y += 32 * nv('u');
      y += 12;
    });
    const H = y;
    const bx = (r, i) => i == 'x' ? (r.x.minus ? L + (sw0(r) - r.x.w) * uw : L + sw0(r) * uw) : L + r.b.slice(0, i).reduce((a, b) => a + (b.w || 1), 0) * uw;
    const bwid = (r, i) => i == 'x' ? r.x.w * uw : (r.b[i].w || 1) * uw;
    const txt = (x, y, t, fs, f, anch, w) => `<text x="${x}" y="${y}" font-size="${fs}" font-weight="${w || 700}" fill="${f || INK}" text-anchor="${anch || 'middle'}" dominant-baseline="middle">${t}</text>`;
    const passa = (t, w) => { const fs = Math.min(smal ? 14 : 16, (w - 6) / (String(t).length * .58)); return fs < 8 ? 0 : fs; };
    st.rader.forEach((r, ri) => {
      // namn
      const ord = r.n.split(' '), fsn = smal ? 13 : 15;
      if (ord.length > 1 && r.n.length > (smal ? 7 : 10)) o += txt(L - 8, r.y + rh / 2 - 8, ord[0], fsn, INK, 'end') + txt(L - 8, r.y + rh / 2 + 9, ord.slice(1).join(' '), fsn, INK, 'end');
      else o += txt(L - 8, r.y + rh / 2, r.n, Math.min(fsn, (L - 12) / (r.n.length * .6)), INK, 'end');
      const block = (i, b, fill0) => {
        const x = bx(r, i), w = bwid(r, i), valt = ri == klick && sel.has(i);
        let fill = fill0, stroke = INK, sw = 1.6, dash = '';
        if (b.s == 'stryk') { fill = 'url(#bmh)'; stroke = KOR; dash = ' stroke-dasharray="5 3"'; }
        if (b.s == 'kand') { stroke = GRON; sw = 2.6; }
        if (b.s && b.s.startsWith('f:')) fill = FARG[b.s.slice(2)];
        if (b.s == 'x') fill = '#F7D3C8';
        if (b.s == 'ny') { fill = '#FBEFD3'; stroke = '#B8860B'; dash = ' stroke-dasharray="5 3"'; }
        if (b.minus && !b.s) { fill = '#fff'; stroke = KOR; dash = ' stroke-dasharray="4 3"'; }
        if (b.minus && b.s == 'fylld') { fill = '#FBEFD3'; stroke = '#B8860B'; dash = ' stroke-dasharray="5 3"'; }
        if (valt) { fill = '#F6D77A'; stroke = '#B8860B'; sw = 3; }
        let g = `<rect x="${x + .8}" y="${r.y}" width="${w - 1.6}" height="${rh}" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash}/>`;
        const fs = b.t ? passa(b.t, w) : 0;
        if (fs) g += txt(x + w / 2, r.y + rh / 2 + 1, b.t, fs, b.s == 'stryk' || (b.minus && !b.s) ? '#8A4A3C' : INK, 'middle', /%/.test(b.t) || /^[a-zåäö]/.test(b.t) ? 600 : 800);
        if (ri == klick) g = `<g class="bmo-k" data-i="${i}" role="button" tabindex="0" aria-label="Block ${i == 'x' ? 'extra' : i + 1}">${g}</g>`;
        return g;
      };
      r.b.forEach((b, i) => { o += block(i, b, FARG[r.f]); });
      if (r.x) o += block('x', r.x, r.x.minus ? '#fff' : '#F7D3C8');
    });
    // klamrar
    st.kl.forEach(k => {
      const r = st.rader[k.rad], fr = k.fr == null ? 0 : k.fr, ti = k.ti == null ? (r.x ? 'x' : r.b.length - 1) : k.ti;
      const x1 = bx(r, fr) + 2, x2 = bx(r, ti) + bwid(r, ti) - 2, m = (x1 + x2) / 2, q = String(k.t).startsWith('?');
      const f = q ? KOR : (k.id == 'bok' || k.id == 'tr' || k.id == 'rab' || k.rod) ? '#8A4A3C' : GRON, lv = ((k.niva || 1) - 1) * 31;
      if (k.pos == 'o') { const yy = r.y - 4 - lv; o += `<path d="M${x1} ${yy}v-7H${x2}v7M${m} ${yy - 7}v-5" fill="none" stroke="${INK}" stroke-width="1.5"/>` + txt(m, yy - 20, k.t, smal ? 14 : 16, f, 'middle', 800); }
      else { const yy = r.y + rh + 4 + lv; o += `<path d="M${x1} ${yy}v7H${x2}v-7M${m} ${yy + 7}v5" fill="none" stroke="${INK}" stroke-width="1.5"/>` + txt(m, yy + 22, k.t, smal ? 14 : 16, f, 'middle', 800); }
    });
    if (st.hog != null) {
      const y1 = st.rader[0].y + 2, y2 = st.rader[st.rader.length - 1].y + rh - 2, x = L + bw + 6, m = (y1 + y2) / 2;
      o += `<path d="M${x} ${y1}h7V${y2}h-7M${x + 7} ${m}h5" fill="none" stroke="${INK}" stroke-width="1.5"/>` + txt(x + 15, m, st.hog, smal ? 14 : 16, st.hog == '?' ? KOR : GRON, 'start', 800);
    }
    box.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Blockmodell" font-family="Inter,Arial,sans-serif"><defs><pattern id="bmh" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="#fff"/><line x1="0" y1="0" x2="0" y2="7" stroke="${KOR}" stroke-width="2.2"/></pattern></defs>${o}</svg>`;
    box.querySelectorAll('.bmo-k').forEach(g => {
      const v = () => { const i = g.dataset.i == 'x' ? 'x' : +g.dataset.i; sel.has(i) ? sel.delete(i) : sel.add(i); rita(); visaValda(); };
      g.onclick = v; g.onkeydown = e => { if (e.key == 'Enter' || e.key == ' ') { e.preventDefault(); v(); } };
    });
    $('.bmo-rakna').innerHTML = st.r.length ? '<b>Uträkningar</b>' + st.r.map(x => `<div>${x}</div>`).join('') : '';
  }
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => U && rita(), 120); });

  // ---------- Steg ----------
  function starta() {
    sel = new Set(); vald = new Set();
    const s = U.steg[ix], box = $('.bmo-steg');
    const klara = U.klara.map(k => `<li><span>${k.q}</span><em>${k.klar}</em></li>`).join('');
    if (!s) return slut();
    if (s.fel == null) s.fel = 0;
    let ctrl = '';
    if (s.typ == 'val') { s._alt = s._alt || blanda(s.alt.map((a, i) => [a, i == 0])); ctrl = `<div class="bmo-alt">${s._alt.map(([a], i) => `<button type="button" data-i="${i}">${a}</button>`).join('')}</div>`; }
    if (s.typ == 'tal') ctrl = `<form class="bmo-form" autocomplete="off"><input inputmode="decimal" aria-label="Ditt svar" placeholder="Svar">${s.enh ? `<span class="bmo-enh">${s.enh.trim()}</span>` : ''}<button>Kontrollera</button></form>`;
    if (s.typ == 'delar') {
      s.rader.forEach(d => { const r = st.rader[d.rad]; if (!d.fast && !s._init) r.b = [{ t: '', s: '' }]; if (d.fast) r.b = Array.from({ length: d.n }, (_, i) => r.b[i] || { t: '', s: '' }); });
      s._init = 1;
      ctrl = `<div class="bmo-del">${s.rader.filter(d => !d.fast).map(d => `<div class="bmo-rad"><span>${st.rader[d.rad].n}</span><button type="button" data-r="${d.rad}" data-d="-1" aria-label="En del mindre">−</button><b data-n="${d.rad}">${st.rader[d.rad].b.length}</b><button type="button" data-r="${d.rad}" data-d="1" aria-label="En del till">+</button><small>delar</small></div>`).join('')}</div><button type="button" class="bmo-ok">Kontrollera</button>`;
    }
    if (s.typ == 'markera') ctrl = `<p class="bmo-hj">Klicka på blocken i modellen. <span class="bmo-antal"></span></p><button type="button" class="bmo-ok">Kontrollera</button>`;
    box.innerHTML = (klara ? `<ol class="bmo-klara">${klara}</ol>` : '') +
      `<div class="bmo-akt"><div class="bmo-nr">Steg ${ix + 1} av ${U.steg.length} · ${s.rub}</div><p class="bmo-q">${s.q}</p>${ctrl}<div class="bmo-fb" aria-live="polite"></div></div>`;
    rita();
    if (s.typ == 'val') box.querySelectorAll('.bmo-alt button').forEach(b => b.onclick = () => {
      if (s._alt[+b.dataset.i][1]) { b.classList.add('ratt'); setTimeout(() => ratt(s), 450); } else { b.classList.add('fel'); b.disabled = true; miss(s); }
    });
    if (s.typ == 'tal') { const f = box.querySelector('form'), inp = f.querySelector('input'); if (ix > 0 && matchMedia('(pointer:fine)').matches) inp.focus();
      f.onsubmit = ev => { ev.preventDefault(); const v = parseFloat(nrm(inp.value)); if (inp.value.trim() == '' || isNaN(v)) { fb('Skriv ett tal.', ''); return; }
        if (Math.abs(v - s.svar) < 1e-9) ratt(s); else { inp.classList.add('felin'); setTimeout(() => inp.classList.remove('felin'), 500); miss(s); } }; }
    if (s.typ == 'delar') {
      box.querySelectorAll('.bmo-rad button').forEach(b => b.onclick = () => { const r = st.rader[+b.dataset.r], n = Math.max(1, Math.min(12, r.b.length + +b.dataset.d));
        r.b = Array.from({ length: n }, () => ({ t: '', s: '' })); box.querySelector(`[data-n="${b.dataset.r}"]`).textContent = n; rita(); });
      box.querySelector('.bmo-ok').onclick = () => { if (s.rader.every(d => st.rader[d.rad].b.length == d.n)) ratt(s); else miss(s); };
    }
    if (s.typ == 'markera') { visaValda(); box.querySelector('.bmo-ok').onclick = () => kollaMark(s); }
  }
  function visaValda() { const a = $('.bmo-antal'); if (a) a.textContent = sel.size ? `Du har valt ${sel.size}.` : ''; }
  function kollaMark(s) {
    const r = st.rader[s.rad], v = [...sel];
    if (!v.length) { fb('Klicka på ett eller flera block först.', ''); return; }
    let ok;
    if (s.mal == 'x') ok = v.length == 1 && v[0] == 'x';
    else if (s.ratt) ok = v.length == s.ratt.length && s.ratt.every(i => sel.has(i));
    else ok = v.length == s.antal && v.every(i => i != 'x' && r.b[i].s == '');
    if (!ok) { sel.clear(); rita(); visaValda(); return miss(s); }
    if (s.plats != null) { const valda = r.b.filter((b, i) => sel.has(i)), ovr = r.b.filter((b, i) => !sel.has(i)); ovr.splice(s.plats, 0, ...valda); r.b = ovr; }
    sel.clear(); ratt(s);
  }
  function fb(t, k) { const f = $('.bmo-fb'); f.className = 'bmo-fb ' + k; f.innerHTML = t; }
  function miss(s) {
    s.fel++; fel++;
    let t = '<b>Inte riktigt.</b> ' + (s.tips ? 'Ledtråd: ' + s.tips : 'Försök igen.');
    if (s.fel >= 2 && s.typ != 'val') t += ' <button type="button" class="bmo-visa">Visa svaret</button>';
    fb(t, 'fel');
    const vb = $('.bmo-visa'); if (vb) vb.onclick = () => visaSvar(s);
  }
  function visaSvar(s) {
    if (s.typ == 'tal') { const i = $('.bmo-form input'); i.value = String(s.svar).replace('.', ','); }
    if (s.typ == 'delar') s.rader.forEach(d => { st.rader[d.rad].b = Array.from({ length: d.n }, () => ({ t: '', s: '' })); });
    if (s.typ == 'markera') { const r = st.rader[s.rad]; if (s.mal == 'x') sel = new Set(['x']); else if (s.ratt) sel = new Set(s.ratt);
      else { sel = new Set(); r.b.forEach((b, i) => { if (b.s == '' && sel.size < s.antal) sel.add(i); }); }
      if (s.plats != null) { const valda = r.b.filter((b, i) => sel.has(i)), ovr = r.b.filter((b, i) => !sel.has(i)); ovr.splice(s.plats, 0, ...valda); r.b = ovr; } sel.clear(); }
    ratt(s);
  }
  function ratt(s) {
    if (!s.fel) rattDirekt++;
    (s.sedan || []).forEach(gor);
    U.klara.push({ q: s.q.replace(/<[^>]+>/g, m => m.startsWith('<span') || m.startsWith('</span') ? m : ''), klar: s.klar });
    ix++; starta();
    const a = $('.bmo-akt'); if (a && ix > 1 && a.getBoundingClientRect().top > innerHeight - 120) a.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function slut() {
    rita();
    const n = U.steg.length, stj = rattDirekt == n ? 3 : rattDirekt >= n - 2 ? 2 : 1;
    const klara = U.klara.map(k => `<li><span>${k.q}</span><em>${k.klar}</em></li>`).join('');
    $('.bmo-steg').innerHTML = `<ol class="bmo-klara">${klara}</ol>
      <div class="bmo-svar"><b>Svar:</b> ${U.svar}</div>
      <div class="bmo-koll"><b>Kontrollera:</b> ${U.koll} ✔</div>
      <div class="bmo-slut"><span class="bmo-stj" aria-label="${stj} av 3 stjärnor">${'★'.repeat(stj)}<i>${'★'.repeat(3 - stj)}</i></span>
      <span>Rätt direkt på ${rattDirekt} av ${n} steg.</span>
      <button type="button" class="bmo-ny">${!LEK ? 'Ny uppgift →' : lnr < LEK.uppg.length - 1 ? `Nästa uppgift (${lnr + 2} av ${LEK.uppg.length}) →` : 'Börja om med nya tal ↻'}</button></div>`;
    if (LEK && lnr == LEK.uppg.length - 1) $('.bmo-slut').insertAdjacentHTML('afterend', `<p class="bmo-allt">Bra jobbat! Du har löst alla ${LEK.uppg.length} uppgifterna. <a href="blockmodellen-blandade.html">Tillbaka till Blandade uppgifter</a></p>`);
    $('.bmo-ny').onclick = () => { if (LEK) lnr = (lnr + 1) % LEK.uppg.length; ny(); rot.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    const sv = $('.bmo-svar'); if (sv.getBoundingClientRect().top > innerHeight - 100) sv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  window.BMOVA_TYPER = TYPER; window.BMOVA_NU = () => ({ U, ix, st, lnr });  // för test
  ny();
})();
