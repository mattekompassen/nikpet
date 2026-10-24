# Elevversion av Bedömning (utgår från gamla Mattekompassen: förmågorna + betygskriterierna), för bedomning.html
import html
FORMAGOR = [  # namn, färg, ljus, vad det är, så visar du det, E, C, A
 ('Begrepp', '#426B89', '#DDEBF3', 'Att förstå matteord och se hur de hänger ihop.',
  'Förklara vad ett begrepp betyder med egna ord, en bild eller ett exempel.',
  'Du kan förklara vanliga begrepp med enkla exempel.',
  'Du förklarar begrepp och visar hur några av dem hänger ihop.',
  'Du förklarar begrepp säkert och visar hur många av dem hänger ihop.'),
 ('Metod', '#8A5E22', '#F8EBC9', 'Att räkna och välja ett bra sätt att räkna.',
  'Visa din uträkning steg för steg och välj en metod som passar uppgiften.',
  'Du räknar med metoder som i stort sett fungerar.',
  'Du väljer metoder som fungerar bra och räknar för det mesta rätt.',
  'Du väljer smarta och effektiva metoder och räknar säkert.'),
 ('Problemlösning', '#5A7552', '#E3ECDD', 'Att lösa uppgifter där du inte direkt vet hur du ska göra.',
  'Välj en strategi, pröva dig fram och kontrollera om svaret är rimligt.',
  'Du löser enkla problem och funderar på om svaret är rimligt.',
  'Du löser problem, kan föreslå ett annat sätt och bedömer om svaret är rimligt.',
  'Du löser svårare problem, jämför olika sätt och motiverar varför svaret är rimligt.'),
 ('Resonemang', '#96505A', '#F7E3DE', 'Att förklara varför och följa andras tankar.',
  'Motivera med "eftersom" och "därför", och jämför din lösning med andras.',
  'Du förklarar enkelt varför, till exempel "det blir så eftersom …".',
  'Du förklarar och motiverar, och bygger vidare på andras tankar.',
  'Du motiverar dina slutsatser väl och kan bemöta andras förslag.'),
 ('Kommunikation', '#1F6E6C', '#D9EEEC', 'Att visa och berätta hur du har tänkt med matematikens språk.',
  'Redovisa tydligt med siffror, symboler, bilder och matteord, både skriftligt och muntligt.',
  'Du visar hur du har räknat så att någon kan följa delar av det.',
  'Du redovisar tydligt och använder matematiska symboler.',
  'Du redovisar tydligt och strukturerat med rätt symboler och matteord.'),
]
# "Kolla dig själv": de fyra stegen per förmåga (text från planscherna i Drive-mapp 1JXJZOsKRK93rJavDA_5yASsma9WSnA-n; bilderna visas inte).
PLANSCHER = {
 'Begrepp': ('begrepp', 'Jag förstår, använder och kopplar samman matematiska begrepp.', [
  ('Jag förstår matematiska begrepp', ['Jag kan förklara begrepp med egna ord.', 'Jag vet vad begreppet syftar på.', 'Jag kan skilja mellan liknande begrepp.', 'Jag kan tolka begreppets betydelse i olika sammanhang.']),
  ('Jag använder matematiska begrepp', ['Jag använder begrepp på ett korrekt och tydligt sätt.', 'Jag använder begrepp i beräkningar och problemlösning.', 'Jag kommunicerar med matematiska begrepp.', 'Jag använder begrepp i tabeller, diagram, formler och grafer.']),
  ('Jag ser samband mellan begrepp', ['Jag kan koppla ihop olika begrepp.', 'Jag ser hur ett begrepp är en del av ett större sammanhang.', 'Jag kan beskriva ett begrepp med ord, symboler, figurer och exempel.', 'Jag använder begrepp för att förstå helheten.']),
  ('Jag utvecklar min begreppsförståelse', ['Jag är nyfiken och undersöker nya begrepp.', 'Jag tänker på vad jag har lärt mig och vad som är svårt.', 'Jag ändrar och fördjupar min förståelse.', 'Jag använder begrepp säkert, även i nya situationer.'])]),
 'Metod': ('metod', 'Jag väljer och använder lämpliga metoder för att lösa matematiska problem.', [
  ('Jag väljer en lämplig metod', ['Jag funderar på vilket sätt som passar bäst för att lösa uppgiften.', 'Jag tar hänsyn till vad jag redan vet.', 'Jag väljer en metod som är effektiv och passar uppgiften.', 'Jag vill lösa uppgiften på ett korrekt och tydligt sätt.']),
  ('Jag genomför min metod', ['Jag följer den metod jag har valt.', 'Jag räknar steg för steg och visar hur jag tänker.', 'Jag använder verktyg vid behov, till exempel miniräknare eller linjal.', 'Om det inte fungerar, prövar jag en annan metod.']),
  ('Jag bedömer resultatet', ['Jag kontrollerar att svaret är rimligt.', 'Jag jämför med andra metoder: får jag samma svar?', 'Jag granskar min lösning: har jag gjort alla steg och räknat rätt?', 'Jag funderar på om svaret passar i verkligheten.']),
  ('Jag reflekterar och utvecklar', ['Jag tänker på vad som fungerade bra och vad som var svårt.', 'Jag lär mig av mina erfarenheter.', 'Jag kan förklara min metod för andra.', 'Jag kan använda metoden i andra uppgifter och ämnen.'])]),
 'Problemlösning': ('problemlosning', 'Jag använder mina kunskaper och strategier för att lösa matematiska problem.', [
  ('Jag förstår problemet', ['Jag läser problemet noggrant. Vad är givet och vad ska jag ta reda på?', 'Jag hittar den viktiga informationen.', 'Jag kan säga problemet med egna ord.', 'Jag tänker på vad som är möjligt och rimligt.']),
  ('Jag planerar en strategi', ['Jag tänker på olika sätt att lösa problemet.', 'Jag väljer en strategi som passar.', 'Jag gör en plan: ska jag rita en figur, göra en tabell eller använda en formel?', 'Jag tänker på vad som kan bli svårt.']),
  ('Jag genomför och prövar min strategi', ['Jag använder min strategi och löser problemet.', 'Om det inte fungerar, försöker jag på ett annat sätt.', 'Jag håller ordning på mina steg och beräkningar.', 'Jag använder det jag redan kan på ett nytt sätt.']),
  ('Jag granskar min lösning', ['Jag kontrollerar att svaret är rimligt.', 'Jag förklarar hur jag har tänkt.', 'Jag jämför med andra lösningar.', 'Jag tänker på vad jag kan göra annorlunda nästa gång.'])]),
 'Resonemang': ('resonemang', 'Jag förklarar, motiverar och drar slutsatser i matematiken.', [
  ('Jag förklarar mitt tänkande', ['Jag använder matematiska begrepp och samband.', 'Jag visar hur jag tänker steg för steg.', 'Jag förklarar varför min lösning är rimlig.', 'Jag använder det jag redan vet för att förklara.']),
  ('Jag jämför och värderar', ['Jag jämför olika lösningsmetoder.', 'Jag bedömer om svaret är rimligt.', 'Jag ser för- och nackdelar med olika lösningar.', 'Jag letar efter fel och otydligheter.']),
  ('Jag ser samband och drar slutsatser', ['Jag ser mönster och samband.', 'Jag drar slutsatser utifrån det jag ser.', 'Jag använder mitt resonemang i nya uppgifter.', 'Jag kopplar samman olika delar av matematiken.']),
  ('Jag diskuterar med andra', ['Jag förklarar och lyssnar på andra.', 'Jag tänker på andras sätt att tänka.', 'Jag använder rätt begrepp och ett tydligt språk.', 'Jag förklarar på olika sätt beroende på vem jag pratar med.'])]),
 'Kommunikation': ('kommunikation', 'Jag uttrycker, förklarar och lyssnar, tillsammans med andra.', [
  ('Jag uttrycker min förståelse', ['Jag förklarar matematiska begrepp med egna ord.', 'Jag visar och förklarar mina metoder, steg och val.', 'Jag använder rätt begrepp, symboler och uttryck.', 'Jag förklarar på olika sätt beroende på vem som lyssnar.']),
  ('Jag lyssnar och tar till mig', ['Jag lyssnar på andras tankar och förklaringar.', 'Jag ställer frågor när jag inte förstår.', 'Jag är nyfiken på andra sätt att tänka.', 'Jag respekterar andra och visar en positiv attityd.']),
  ('Jag diskuterar och argumenterar', ['Jag deltar i matematiska samtal och bygger vidare på andras idéer.', 'Jag förklarar varför min lösning är rimlig.', 'Jag jämför olika lösningar.', 'Jag kan ändra mig när jag får bättre argument.']),
  ('Jag visar matematik på olika sätt', ['Jag använder tabeller, diagram, figurer, symboler, formler och ord.', 'Jag använder digitala verktyg för att förklara och visa.', 'Jag kan förklara samma sak på flera sätt.', 'Jag väljer det sätt som passar bäst.'])]),
}
TILLFALLEN = [('På lektionerna', 'När du diskuterar, förklarar för en kompis eller visar din lösning på tavlan.'),
              ('I räknehäftet', 'När läraren går runt visar du hur du har räknat i ditt räknehäfte och berättar hur du tänkte.'),
              ('Prov och diagnoser', 'Skriftliga prov efter varje kapitel och korta diagnoser som visar var du är.'),
              ('Muntligt', 'Ibland får du förklara hur du har tänkt, ensam med läraren, i en liten grupp eller inför hela klassen.'),
              ('Nationella prov', 'I åk 9 skriver alla nationella prov. Proven hjälper läraren när betyget sätts.')]
TIPS = ['Läs uppgiften noga. Vad ska du ta reda på?', 'Skriv ut alla steg, inte bara svaret.',
        'Använd likhetstecknet rätt: båda sidor ska vara lika mycket värda.', 'Skriv enhet, till exempel cm, kr eller min.',
        'Kontrollera om svaret är rimligt.', 'Svara med en hel mening.']
CSS = """<style>
.bd{max-width:1100px}
.bd .ingress{font-size:19px;line-height:1.55;max-width:780px;margin:0 0 10px}
.bd h2.grupp{display:flex;align-items:center;gap:12px;font-size:24px;margin:38px 0 6px}
.bd h2.grupp::before{content:"";width:10px;height:30px;border-radius:6px;background:var(--g)}
.bd p.under{margin:0 0 18px;max-width:780px;line-height:1.5}
.bd .fg{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;align-items:start}
.bd .fk{background:#FBF8F2;border:2px solid var(--l);border-top:8px solid var(--g);border-radius:20px;padding:18px 16px}
.bd .fk h3{margin:0 0 8px;font-size:19px;color:var(--g)}
.bd .fk p{margin:0 0 12px;font-size:15px;line-height:1.45}
.bd .fk .visa{background:var(--gl);border-radius:12px;padding:10px 12px;font-size:14.5px;line-height:1.45;margin:0}
.bd .fk .visa b{display:block;font-size:12px;letter-spacing:.05em;text-transform:uppercase;color:var(--g);margin-bottom:2px}
.bd .fk{display:flex;flex-direction:column}.bd .fk .visa{margin-bottom:12px!important}
.bd .kolla{margin:0;background:#fff;border:2px solid var(--gl);border-radius:12px}
.bd .kolla summary{cursor:pointer;font-weight:700;color:var(--g);padding:9px 12px;font-size:15px}
.bd .kolla .in{padding:0 12px 10px;font-size:14px;line-height:1.4}
.bd .kolla .mening{margin:0 0 8px;font-style:italic}
.bd .kolla h4{margin:10px 0 4px;font-size:14.5px;color:var(--g);display:flex;gap:8px;align-items:center}
.bd .kolla h4 span{flex:none;width:22px;height:22px;border-radius:50%;background:var(--g);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12.5px}
.bd .kolla ul{margin:0;padding-left:18px}.bd .kolla li{margin:2px 0}
.bd .tab{display:grid;grid-template-columns:170px repeat(3,1fr);gap:8px;margin-top:8px}
.bd .tab .h{font-weight:800;text-align:center;color:#fff;border-radius:12px;padding:10px 6px;font-size:18px}
.bd .tab .f{display:flex;align-items:center;font-weight:700;color:#fff;background:var(--g);border-radius:12px;padding:12px 14px}
.bd .tab .c{background:var(--gl);border-radius:12px;padding:12px 14px;font-size:15px;line-height:1.45}
.bd .tab .tom{background:none}
.bd .not{display:flex;gap:14px;flex-wrap:wrap;margin:14px 0 0}
.bd .not div{flex:1 1 280px;background:var(--vl);border:2px solid var(--l);border-radius:16px;padding:12px 16px;font-size:15px;line-height:1.45}
.bd .tf{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
.bd .tf div{background:var(--ink);color:#fff;border-radius:20px;padding:18px 16px}
.bd .tf h3{margin:0 0 6px;font-size:17px;color:#F2CD69}.bd .tf p{margin:0;font-size:15px;line-height:1.45;opacity:.92}
.bd .tips{list-style:none;padding:0;margin:8px 0 0;display:grid;grid-template-columns:repeat(2,1fr);gap:10px 18px;max-width:900px}
.bd .tips li{background:#FBF8F2;border:2px solid var(--l);border-radius:14px;padding:12px 14px 12px 48px;position:relative;line-height:1.4}
.bd .tips li::before{content:"✓";position:absolute;left:14px;top:10px;width:24px;height:24px;border-radius:50%;background:#5A7552;color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:14px}
.bd .info2{margin:34px 0 30px;background:var(--vl);border:2px solid var(--l);border-radius:22px;padding:20px 24px;max-width:900px;line-height:1.5}
.bd .info2 h3{margin:0 0 6px;color:var(--ink)}
@media(max-width:1000px){.bd .fg,.bd .tf{grid-template-columns:repeat(2,1fr)}}
@media(max-width:800px){.bd .tab{grid-template-columns:1fr 1fr 1fr}.bd .tab .f{grid-column:1/-1}.bd .tab .tom{display:none}.bd .tips{grid-template-columns:1fr}}
@media(max-width:560px){.bd .fg,.bd .tf{grid-template-columns:1fr}.bd .tab{grid-template-columns:1fr}.bd .tab .h{display:none}.bd .tab .c::before{display:block;font-weight:800;margin-bottom:2px}.bd .tab .c.e::before{content:"E"}.bd .tab .c.cc::before{content:"C"}.bd .tab .c.a::before{content:"A"}}
</style>"""
def sida():
    e = html.escape
    ut = [CSS, '<div class="bd">',
          '<p class="ingress">I matematik bedöms det du visar att du kan: på lektionerna, i skriftliga uppgifter, muntligt och på prov. Här ser du vad som bedöms och hur du kan visa det.</p>',
          '<h2 class="grupp" style="--g:#2C4152">Fem förmågor</h2><p class="under">All matematik bygger på fem förmågor. Det är de som bedöms, i alla kapitel och alla årskurser. Klicka på Kolla dig själv för att se hur du kan bli bättre.</p><div class="fg">']
    for n, g, gl, vad, visa, *_ in FORMAGOR:
        fil, mening, steg = PLANSCHER[n]
        kolla = ''.join(f'<h4><span>{i}</span>{e(r)}</h4><ul>' + ''.join(f'<li>{e(p)}</li>' for p in pp) + '</ul>' for i, (r, pp) in enumerate(steg, 1))
        ut.append(f'<div class="fk" style="--g:{g};--gl:{gl}"><h3>{e(n)}</h3><p>{e(vad)}</p>'
                  f'<p class="visa"><b>Så visar du det</b>{e(visa)}</p>'
                  f'<details class="kolla"><summary>Kolla dig själv</summary><div class="in"><p class="mening">{e(mening)}</p>{kolla}</div></details></div>')
    ut.append('</div>')
    ut.append('<h2 class="grupp" style="--g:#F2CD69">Från E till A</h2><p class="under">Så här skiljer sig betygen åt för varje förmåga. Ju högre betyg, desto säkrare, mer utvecklat och mer motiverat.</p><div class="tab">')
    ut.append('<div class="tom"></div><div class="h" style="background:#8A8F98">E</div><div class="h" style="background:#5F6368">C</div><div class="h" style="background:#2C4152">A</div>')
    for n, g, gl, vad, visa, E, C, A in FORMAGOR:
        ut.append(f'<div class="f" style="--g:{g}">{e(n)}</div><div class="c e" style="--gl:{gl}">{e(E)}</div><div class="c cc" style="--gl:{gl}">{e(C)}</div><div class="c a" style="--gl:{gl}">{e(A)}</div>')
    ut.append('</div><div class="not" style="grid-template-columns:1fr"><div><b>Betygen D och B.</b> D och B får du bara när läraren sätter betyg: som terminsbetyg i slutet av en termin, eller som slutbetyg i slutet av åk 9. Läraren gör då en helhetsbedömning av allt du har visat. D får du om du visar allt som krävs för E och det mesta av det som krävs för C. B får du om du visar allt som krävs för C och det mesta av det som krävs för A.</div></div>')
    ut.append('<h2 class="grupp" style="--g:#426B89">Så visar du vad du kan</h2><p class="under">Läraren samlar det du visar under hela terminen, inte bara på provet.</p><div class="tf">')
    ut += [f'<div><h3>{e(t)}</h3><p>{e(p)}</p></div>' for t, p in TILLFALLEN]
    ut.append('</div>')
    ut.append('<h2 class="grupp" style="--g:#5A7552">Tips för en bra redovisning</h2><ul class="tips">' + ''.join(f'<li>{e(t)}</li>' for t in TIPS) + '</ul>')
    ut.append('<div class="info2"><h3>Använd framgångskriterierna</h3>Till varje lektion finns mål och framgångskriterier (knappen Mål under Lektioner). De visar vad du ska kunna och hjälper dig att se vad nästa steg är. Undrar du hur du ligger till? Fråga din mattelärare.</div>')
    ut.append('</div>')
    return ''.join(ut)
