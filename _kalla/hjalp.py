# Elevversion av "Ledning och stimulans – extra anpassningar" (Anpassningskartan), för hjalp.html
GRUPPER = [
 ('På lektionen', '#B95E52', '#F7E3DE', [
  ('01', 'Du vet vad du ska lära dig', 'Varje lektion börjar med mål och framgångskriterier. Lektionerna har samma ordning: startuppgift, genomgång, arbete i par och arbete själv.', 'En checklista eller ett bildschema som visar vad du ska göra först, sedan och sist.'),
  ('02', 'Genomgångar steg för steg', 'Vi börjar med en tillbakablick på förra lektionen. Läraren visar med exempel steg för steg, ibland med en kort film.', 'En extra genomgång, en kopia av lektionsanteckningarna eller genomgången en gång till.'),
  ('03', 'Matteord och begrepp', 'Vi använder bilder, tallinjer och modeller. Svåra ord förklaras, och det finns ämnesord på olika språk.', 'Ett eget begreppshäfte, bilder och symboler som stöd, eller hjälp att förstå textuppgifter.'),
  ('04', 'Uppgifter på din nivå', 'Uppgifterna går från lättare till svårare. Matematik BAS är grundträning, och fördjupningen ger mer utmaning.', 'Svårare uppgifter som utmanar dig, eller Trygg start som går steg för steg mot samma mål som klassen.'),
  ('05', 'Problemlösning', 'Vi läser uppgiften tillsammans och stryker under det viktiga. Fråga dig: Vad vet jag? Vad ska jag ta reda på?', 'Klurigare problem att lösa på flera sätt, ett liknande exempel att utgå från eller uppgiften uppdelad i mindre steg.'),
 ]),
 ('I klassrummet', '#426B89', '#DDEBF3', [
  ('06', 'Arbetsro och fokus', 'Vi arbetar i korta pass, ibland med en timer. Stödmaterial finns så att du kan komma igång själv.', 'En bra plats, hörlurar eller hörselkåpor, en kort paus eller ett lugnare rum att arbeta i.'),
  ('07', 'Trygghet', 'Alla ska våga fråga och vara med. Det är okej att göra fel, det är så vi lär oss.', 'Läraren pratar gärna med dig om du känner dig osäker, och kan hålla kontakt med dina vårdnadshavare.'),
  ('08', 'Tid', 'Du får rimlig tid. En timer visar hur mycket tid som är kvar.', 'Längre tid, mer tid att läsa uppgifterna eller ett annat tillfälle att göra klart.'),
  ('09', 'Hjälpmedel', 'Vi använder konkret material och bilder på tavlan för att förstå bättre.', 'Miniräknare, talsyntes, matteboken som ljudbok eller iPad i stället för boken.'),
 ]),
 ('När vi ser hur det går', '#5A7552', '#E3ECDD', [
  ('10', 'Prov och bedömning', 'Innan provet vet du vad som bedöms. Du kan visa vad du kan på olika sätt.', 'Längre tid, ett lugnare rum eller att förklara muntligt. Kraven är desamma för alla.'),
  ('11', 'Återkoppling', 'Läraren kollar hur det går med frågor och korta avstämningar, och visar vad ditt nästa steg är.', 'Fler avstämningar, så att du vet att du är på rätt väg, eller tips på hur du når nästa nivå.'),
  ('12', 'Mattekompassen', 'Här finns lektioner, mål, tillbakablickar, repetition och övningar för din årskurs.', 'Tips på vad som passar dig, till exempel Tillbakablick för att repetera eller Interaktiva övningar för att träna mer.'),
 ]),
]
STEG = [('Tänk själv', 'Läs uppgiften igen. Vad vet du? Vad ska du ta reda på?'),
        ('Titta i stödet', 'Använd exemplen i boken, Tillbakablick eller Ämnesord.'),
        ('Fråga en kompis', 'Förklara hur du har tänkt och lyssna på hur kompisen tänker.'),
        ('Fråga läraren', 'Räck upp handen och berätta vad du redan har provat.')]
CSS = """<style>
.hj{max-width:1100px}
.hj .ingress{font-size:19px;line-height:1.55;max-width:760px;margin:0 0 30px}
.hj .forklaring{display:flex;flex-wrap:wrap;gap:12px;margin:0 0 34px}
.hj .forklaring span{display:inline-flex;align-items:center;gap:10px;background:#FBF8F2;border:2px solid var(--l);border-radius:999px;padding:8px 16px;font-weight:600;font-size:15px}
.hj .forklaring i{width:14px;height:14px;border-radius:4px;display:inline-block}
.hj h2.grupp{display:flex;align-items:center;gap:12px;font-size:24px;margin:34px 0 16px}
.hj h2.grupp::before{content:"";width:10px;height:30px;border-radius:6px;background:var(--g)}
.hj .kortrad{display:flex;flex-direction:column;gap:14px}
.hj .hk{background:#FBF8F2;border:2px solid var(--l);border-radius:22px;padding:18px 20px;display:grid;grid-template-columns:44px 1fr 1fr;gap:6px 22px;align-items:start}
.hj .hk .nr{grid-row:span 2;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:12px;background:var(--g);color:#fff;font-weight:800;font-size:15px}
.hj .hk h3{margin:2px 0 0;font-size:19px;color:var(--ink);grid-column:2}
.hj .hk p{margin:0;line-height:1.5;font-size:16px;grid-column:2}
.hj .hk .mer{grid-column:3;grid-row:1/span 2;align-self:stretch;background:var(--gl);border-radius:14px;padding:12px 16px;font-size:15px;line-height:1.45}
.hj .hk .mer b{display:block;color:var(--g);font-size:13px;letter-spacing:.04em;text-transform:uppercase;margin-bottom:3px}
.hj .steg{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:6px 0 10px;counter-reset:s}
.hj .steg div{background:var(--ink);color:#fff;border-radius:20px;padding:20px 18px;position:relative}
.hj .steg div::before{counter-increment:s;content:counter(s);display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:#F2CD69;color:var(--ink);font-weight:800;margin-bottom:10px}
.hj .steg h3{margin:0 0 6px;font-size:18px;color:#fff}.hj .steg p{margin:0;font-size:15px;line-height:1.45;opacity:.9}
.hj .avslut{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:34px 0 30px}
.hj .avslut div{background:var(--vl);border:2px solid var(--l);border-radius:22px;padding:22px 24px}
.hj .avslut h3{margin:0 0 8px;font-size:19px;color:var(--ink)}.hj .avslut p{margin:0;line-height:1.5}
@media(max-width:800px){.hj .hk{grid-template-columns:44px 1fr}.hj .hk p{grid-column:1/-1;margin-top:6px}.hj .hk .nr{grid-row:auto}.hj .hk .mer{grid-column:1/-1;grid-row:auto;margin-top:8px}.hj .steg{grid-template-columns:1fr 1fr}.hj .avslut{grid-template-columns:1fr}.hj .kortrad{grid-template-columns:1fr}}
@media(max-width:480px){.hj .steg{grid-template-columns:1fr}}
</style>"""
def sida():
    import html
    ut = [CSS, '<div class="hj">',
          '<p class="ingress">Alla lär sig matte på olika sätt. Här ser du vad vi gör på lektionerna så att alla kan lära sig så mycket som möjligt. Vill du ha mer stöd eller mer utmaning? Prata med din mattelärare.</p>',
]
    for namn, g, gl, kort in GRUPPER:
        ut.append(f'<h2 class="grupp" style="--g:{g}">{html.escape(namn)}</h2><div class="kortrad">')
        for nr, t, alla, mer in kort:
            ut.append(f'<div class="hk" style="--g:{g};--gl:{gl}"><span class="nr">{nr}</span><h3>{html.escape(t)}</h3><p>{html.escape(alla)}</p><div class="mer"><b>Det här kan du också få</b>{html.escape(mer)}</div></div>')
        ut.append('</div>')
    ut.append('<h2 class="grupp" style="--g:#F2CD69">När du kör fast</h2><div class="steg">')
    ut += [f'<div><h3>{t}</h3><p>{p}</p></div>' for t, p in STEG]
    ut.append('</div>')
    ut.append('<div class="avslut"><div><h3>Berätta vad som hjälper dig</h3><p>Du känner dig själv bäst. Prata med din mattelärare om vad som fungerar för dig, så hittar ni ett sätt tillsammans.</p></div>'
              '<div><h3>Om du vill ha mer</h3><p>Tycker du att det går för lätt eller för svårt? Säg till. Läraren följer upp hur det går för dig och ändrar arbetet så att det passar dig.</p></div></div>')
    ut.append('</div>')
    return ''.join(ut)
