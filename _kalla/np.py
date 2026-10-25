# Elevsida om nationella provet i matematik åk 9 (info från Skolverket, lärarinformation VT 2027), för nationella-prov.html
# OBS: originalproven är sekretessbelagda. Övningsuppgifter här ska ha egna tal.
import html
VISA_OVNINGSPROV = False  # Nikola: övningsproven publiceras senare (PDF:er sparas i webbplats-kalla/np-pdf)
DAGAR = [('Onsdag 12 maj 2027', 'Delprov A och B'), ('Fredag 14 maj 2027', 'Delprov C och D')]
DELPROV = [  # bokstav, färg, ljus, tid, räknare?, typ, var svaren skrivs
 ('A', '#B95E52', '#F7E3DE', '40 min', False, 'Korta svar och flervalsfrågor.', 'Du skriver svaren i provhäftet.'),
 ('B', '#426B89', '#DDEBF3', '80 min', False, 'Uppgifter där du visar hela lösningen.', 'Du skriver lösningarna på separat papper.'),
 ('C', '#8A5E22', '#F8EBC9', '40 min', True, 'Korta svar och flervalsfrågor.', 'Du skriver svaren i provhäftet.'),
 ('D', '#5A7552', '#E3ECDD', '80 min', True, 'Uppgifter där du visar hela lösningen.', 'Du skriver lösningarna på separat papper.'),
]
TANK = {
 'A': ['Räkna i huvudet eller med skriftlig räkning på kladdpapperet.', 'Bara svaret räknas, så skriv det tydligt på rätt plats.', 'Vid flerval: läs alla alternativ innan du väljer.'],
 'B': ['Visa hela lösningen: uträkning, förklaring och svar.', 'Även en del av lösningen kan ge poäng, så skriv det du kommer fram till.', 'Räkna noggrant för hand och kontrollera dina uträkningar.'],
 'C': ['Använd räknaren, men tänk efter om svaret är rimligt.', 'Bara svaret räknas, så skriv det tydligt med rätt enhet.', 'Fastnar du? Hoppa vidare och kom tillbaka.'],
 'D': ['Visa hela lösningen, även när du använder räknare.', 'Skriv vad du räknar ut, till exempel "Arean är …".', 'Avsluta med ett tydligt svar och kontrollera att det är rimligt.'],
}
TA_MED = ['Penna och sudd', 'Linjal', 'Räknare (delprov C och D)']
FAR_EJ = ['Mobiltelefon', 'Smartklocka', 'Räknare och formelblad på delprov A och B']
TIPS = [('Före provet', ['Öva huvudräkning och skriftlig räkning, för delprov A och B görs utan räknare.',
                         'Titta på formelbladet i förväg så att du vet vad som står där.',
                         'Träna med NP-träningen: sex träningsprov med facit.',
                         'Sov ordentligt och ät frukost.']),
        ('Under provet', ['Läs varje uppgift noga. Vad ska du ta reda på?',
                          'Börja med det du kan. Hoppa över och kom tillbaka sedan.',
                          'Visa alla steg i delprov B och D. Även en del av lösningen kan ge poäng.',
                          'Kontrollera att svaret är rimligt och har rätt enhet.'])]
CSS = """<style>
.np{max-width:1100px}
.np .infobox{background:#FBF8F2;border:2px solid #E6E1D7;border-radius:28px;box-shadow:0 6px 20px #6E51201a}
.np .infobox summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:18px;flex-wrap:wrap;padding:22px 28px;border-radius:26px;background:#DDBE88}
.np .infobox summary::-webkit-details-marker{display:none}
.np .infobox summary:hover{filter:brightness(1.03)}
.np .infobox[open] summary{border-radius:26px 26px 0 0}
.np .ibik{font-size:34px;width:60px;height:60px;border-radius:16px;background:#FFF8EA;display:flex;align-items:center;justify-content:center;flex:none}
.np .ibtit{flex:1 1 260px;font-size:16px;line-height:1.45;color:#3A2C12}.np .ibtit b{display:block;font-family:Fraunces,Georgia,serif;font-size:24px}
.np .ibvisa{background:#5A4219;color:#fff;font-weight:700;border-radius:999px;padding:11px 22px;white-space:nowrap}
.np .ibvisa::after{content:' ↓'}.np .infobox[open] .ibvisa{font-size:0}.np .infobox[open] .ibvisa::before{content:'Dölj ↑';font-size:16px}.np .infobox[open] .ibvisa::after{content:''}
.np .ibinn{padding:24px 28px 28px}
.np .infobox .ingress{max-width:none;margin:0 0 18px}
.np .ib-dagar{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.np .ib-dagar div{background:#2C4152;color:#fff;border-radius:18px;padding:14px 18px;line-height:1.4}
.np .ib-dagar .kl{background:#F2CD69;color:#292A28}
.np .ib-dagar b{display:block;color:#F2CD69;font-size:18px}.np .ib-dagar .kl b{color:#292A28}
.np .ibh{font-size:21px;margin:26px 0 4px;color:#2C4152}.np .ibu{margin:0 0 14px;color:#3a3a3a}
.np .infobox .dk{background:#fff;border-width:1.5px;border-top-width:7px;padding:16px}
.np .ib4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:20px}
.np .ib4>div{background:#fff;border:1.5px solid #E6E1D7;border-radius:18px;padding:14px 18px}
.np .ib4 h3{margin:0 0 6px;font-size:17px}.np .ib4 ul{margin:0;padding-left:18px;line-height:1.55;font-size:15px}
.np .ib4 .tips h3{color:#2C4152}
@media(max-width:1000px){.np .ib4{grid-template-columns:1fr 1fr}}
@media(max-width:620px){.np .ib4,.np .ib-dagar{grid-template-columns:1fr}.np .ibinn,.np .infobox summary{padding:18px}}
.np .ingress{font-size:19px;line-height:1.55;max-width:780px;margin:0 0 10px}
.np h2.grupp{display:flex;align-items:center;gap:12px;font-size:24px;margin:36px 0 8px}
.np h2.grupp::before{content:"";width:10px;height:30px;border-radius:6px;background:var(--g)}
.np .under{margin:0 0 16px;color:#3a3a3a;max-width:780px}
.np .dagar{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:760px}
.np .dagar div{background:#2C4152;color:#fff;border-radius:20px;padding:18px 22px}
.np .dagar b{display:block;color:#F2CD69;font-size:19px;margin-bottom:4px}
.np .dp{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.np .dk{background:#FBF8F2;border:2px solid #E6E1D7;border-top:8px solid var(--g);border-radius:20px;padding:18px}
.np .dk .bok{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.np .dk .bok span{width:48px;height:48px;border-radius:14px;background:var(--g);color:#fff;font-weight:800;font-size:24px;display:inline-flex;align-items:center;justify-content:center}
.np .dk .bok h3{margin:0;font-size:19px;color:var(--g)}
.np .dk .tid{font-size:15px;color:#5F6368}
.np .dk p{margin:0 0 8px;line-height:1.45;font-size:15.5px}
.np .dk ul{margin:10px 0 0;padding:10px 12px 10px 28px;background:var(--gl);border-radius:12px;font-size:14.5px;line-height:1.45}.np .dk .tp{display:block;margin-top:12px;font-size:12.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--g)}
.np .ex{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:14px}.np .ex div{background:#FBF8F2;border:2px dashed #D9D4C8;border-radius:18px;padding:16px 18px}.np .ex b{color:var(--g)}.np .ex p{margin:6px 0 0;font-size:15px;color:#5F6368}
@media(max-width:1000px){.np .ex{grid-template-columns:1fr 1fr}}@media(max-width:620px){.np .ex{grid-template-columns:1fr}}
.np .dk .rk{display:inline-block;margin-top:4px;background:var(--gl);border-radius:999px;padding:5px 12px;font-size:14px;font-weight:600;color:#292A28}
.np .hm{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:760px}
.np .hm div{background:#FBF8F2;border:2px solid #E6E1D7;border-radius:20px;padding:16px 20px}
.np .hm h3{margin:0 0 8px;font-size:18px}
.np .hm ul{margin:0;padding-left:20px;line-height:1.7}
.np .ja h3{color:#5A7552}.np .nej h3{color:#96505A}
.np .tipsg{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.np .tipsg div{background:#2C4152;color:#fff;border-radius:20px;padding:20px 22px}
.np .tipsg h3{margin:0 0 8px;color:#F2CD69;font-size:19px}
.np .tipsg ul{margin:0;padding-left:20px;line-height:1.6}
.np .info2{background:#E8E1D6;border:2px solid #D9D4C8;border-radius:20px;padding:20px 24px;margin:30px 0;max-width:900px;line-height:1.55}
.np .info2 h3{margin:0 0 6px;font-size:19px;color:#2C4152}
.np .ovlank{display:flex;align-items:center;gap:20px;flex-wrap:wrap;background:#DDBE88;border-radius:24px;padding:24px 28px;max-width:900px;text-decoration:none;color:#3A2C12;box-shadow:0 6px 18px #6E512033;transition:transform .15s}
.np .ovlank:hover{transform:translateY(-3px)}
.np .ovik{font-size:40px;width:68px;height:68px;border-radius:18px;background:#FFF8EA;display:flex;align-items:center;justify-content:center;flex:none}
.np .ovtxt{flex:1 1 280px;font-size:16px;line-height:1.5}.np .ovtxt b{display:block;font-family:Fraunces,Georgia,serif;font-size:23px;margin-bottom:4px}
.np .ovknapp{background:#5A4219;color:#fff;font-weight:700;font-size:17px;border-radius:999px;padding:13px 24px;white-space:nowrap}
.np .kommer{background:#FBF8F2;border:2px dashed #D9D4C8;border-radius:20px;padding:20px 24px;max-width:900px;line-height:1.55}
.np .pdfer{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:14px}
.np .pdfer>div{background:#FBF8F2;border:2px solid #E6E1D7;border-top:8px solid var(--g);border-radius:20px;padding:16px 18px;display:flex;flex-direction:column;gap:8px}
.np .pdfer h3{display:flex;align-items:center;gap:10px;margin:0;font-size:19px;color:var(--g)}
.np .pdfer h3 span{width:36px;height:36px;border-radius:10px;background:var(--g);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:800}
.np .pdfer p{margin:0 0 4px;color:#5F6368;font-size:15px}
.np .pdfer a{display:block;text-align:center;border-radius:999px;padding:9px 12px;font-weight:700;text-decoration:none}
.np .pdfer .ov{font-size:14px;color:#292A28;margin-top:4px}.np .pdfer .par{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.np .pdfer a.pk{background:var(--g);color:#fff}.np .pdfer a.pf{background:var(--gl);color:#292A28}
@media(max-width:1000px){.np .pdfer{grid-template-columns:1fr 1fr}}@media(max-width:620px){.np .pdfer{grid-template-columns:1fr}}
@media(max-width:1000px){.np .dp{grid-template-columns:1fr 1fr}}
@media(max-width:620px){.np .dp,.np .dagar,.np .hm,.np .tipsg{grid-template-columns:1fr}}
</style>"""
OVP_INTRO = (''
             '<p class="under" style="max-width:860px">Här finns sex träningsprov inför det nationella provet, med samma upplägg som det riktiga provet: fyra delprov A–D. '
             'Uppgifterna är egna och kommer inte från något riktigt prov. Skriv ut delprovet eller öppna det, ta tid och lös uppgifterna som på riktigt. '
             'Rätta sedan med facit. Facit öppnar du med lösenordet som du får av din mattelärare. <a href="nationella-prov.html" style="font-weight:700;color:var(--ink)">Allt om nationella provet →</a></p>')

def sida():
    """Översta delen av nationella-prov.html: en avlång ruta med all information om provet.
    Övningsproven läggs till under av bygg.py (ovningsprov_sida), som också stänger <div class="np">."""
    e = html.escape
    ut = [CSS, '<div class="np"><div class="infobox"><div class="ibinn">',
          '<p class="ingress">I åk 9 skriver alla elever i Sverige nationellt prov i matematik. Provet visar vad du kan och hjälper läraren när betyget sätts. Provet har fyra delar och skrivs på papper i skolan.</p>',
          '<div class="ib-dagar">' + ''.join(f'<div><b>{e(d)}</b>{e(t)}</div>' for d, t in DAGAR) + '<div class="kl"><b>Klockan 9.00</b>Provet börjar båda dagarna</div></div>',
          '<h3 class="ibh">Fyra delprov</h3><p class="ibu">Varje delprov har en egen tid och egna regler för räknare och formelblad. Provet har inget muntligt delprov.</p><div class="dp">']
    for b, g, gl, tid, rk, typ, var in DELPROV:
        r = 'Räknare och formelblad' if rk else 'Utan räknare och formelblad'
        ut.append(f'<div class="dk" style="--g:{g};--gl:{gl}"><div class="bok"><span>{b}</span><div><h3>Delprov {b}</h3><div class="tid">{tid}</div></div></div><p>{e(typ)} {e(var)}</p><span class="rk">{r}</span><span class="tp">Tänk på</span><ul>' + ''.join(f'<li>{e(x)}</li>' for x in TANK[b]) + '</ul></div>')
    ut.append('</div><div class="ib4">')
    ut.append('<div class="ja"><h3>Det här får du använda</h3><ul>' + ''.join(f'<li>{e(t)}</li>' for t in TA_MED) + '<li>Formelblad (delprov C och D)</li></ul></div>')
    ut.append('<div class="nej"><h3>Det här får du inte använda</h3><ul>' + ''.join(f'<li>{e(t)}</li>' for t in FAR_EJ) + '</ul></div>')
    for t, li in TIPS:
        ut.append(f'<div class="tips"><h3>Tips {e(t.lower())}</h3><ul>' + ''.join(f'<li>{e(x)}</li>' for x in li) + '</ul></div>')
    ut.append('</div></div></div>')
    ut.append('<a class="ovlank" href="np-traning.html" style="margin-top:22px"><span class="ovik" aria-hidden="true">📝</span><span class="ovtxt"><b>NP-träning</b>Sex träningsprov med samma upplägg som det nationella provet, med facit.</span><span class="ovknapp">Till NP-träning →</span></a>')
    return ''.join(ut)

# Exempeluppgifter (egna, med nya tal – INTE originaluppgifter). (text, alternativ, poäng, svar)
EXEMPEL = {
 'A': [('Vilket tal är störst?', ['0,307', '0,37', '0,3', '0,073'], 1, '0,37'),
       ('Beräkna 7 − 3 · (−2)', None, 1, '13'),
       ('Skriv 0,25 i procent och som ett bråk i enklaste form.', None, 2, '25 % och 1/4'),
       ('En tröja kostar 400 kr. Priset sänks med 25 %. Vad kostar tröjan nu?', None, 1, '300 kr'),
       ('Beräkna 2<sup>3</sup> + 3<sup>2</sup>', None, 1, '17'),
       ('Lös ekvationen x/4 + 3 = 8', None, 1, 'x = 20'),
       ('En rektangel har omkretsen 30 cm. En av sidorna är 6 cm. Vilken area har rektangeln?', None, 1, '54 cm² (den andra sidan är 9 cm)'),
       ('Vilket uttryck betyder "dubbla summan av a och 5"?', ['2a + 5', '2(a + 5)', 'a + 10', '2 · a · 5'], 1, '2(a + 5)'),
       ('Skriv 3,2 · 10<sup>−2</sup> som ett decimaltal.', None, 1, '0,032')],
 'B': [('Elin ska köpa 18 glassar. Ett paket med 4 glassar kostar 52 kr. En glass kostar 15 kr styck. Vad är det billigaste sättet att köpa precis 18 glassar, och vad kostar det?', None, 2, '4 paket och 2 styck: 4 · 52 + 2 · 15 = 238 kr'),
       ('Tabellen visar lägsta temperaturen varje dag under en vecka.<table class="tb"><tr><th>Dag</th><td>mån</td><td>tis</td><td>ons</td><td>tor</td><td>fre</td><td>lör</td><td>sön</td></tr><tr><th>°C</th><td>4</td><td>−2</td><td>0</td><td>3</td><td>−1</td><td>5</td><td>5</td></tr></table>a) Vilken är medianen? Endast svar krävs.<br>b) Vilket är medelvärdet?', None, 3, 'a) 3 °C<br>b) 14 / 7 = 2 °C'),
       ('En triangel har vinklarna x, 2x och 3x. Hur stor är den största vinkeln?', None, 2, 'x + 2x + 3x = 180°, x = 30°. Den största vinkeln är 90°.'),
       ('En taxiresa kostar 45 kr i startavgift och 12 kr per km.<br>a) Skriv en formel för kostnaden K kr för en resa på x km.<br>b) Hur långt kan man åka för 285 kr?', None, 3, 'a) K = 45 + 12x<br>b) 45 + 12x = 285 ger x = 20, alltså 20 km'),
       ('En bil kostar 200 000 kr när den är ny. Bilens värde minskar med 15 % varje år. Vad är bilen värd efter 2 år?', None, 3, '200 000 · 0,85 · 0,85 = 144 500 kr')],
 'C': [('En cykel kostar 4 800 kr. Priset höjs med 12 %. Vad kostar cykeln nu?', None, 1, '5 376 kr'),
       ('Lös ekvationen 5(x − 2) = 3x + 6', None, 1, 'x = 8'),
       ('Hur många minuter är 2,4 timmar?', None, 1, '144 minuter'),
       ('En cirkel har diametern 10 cm. Hur stor är cirkelns area? Avrunda till hela cm².', None, 1, '79 cm²'),
       ('En karta har skalan 1:50 000. Hur långt är det i verkligheten om avståndet på kartan är 6 cm?', None, 1, '3 km'),
       ('Du kastar en vanlig tärning. Hur stor är sannolikheten att du får ett tal som är större än 4?', None, 1, '2/6 = 1/3'),
       ('Vilket värde har uttrycket 3x<sup>2</sup> − 2x om x = −2?', None, 1, '16'),
       ('En kvadrat har arean 50 cm². Hur lång är sidan? Avrunda till en decimal.', None, 1, '7,1 cm')],
 'D': [('Ett gym har två sorters kort. Kort A kostar 300 kr i månaden. Kort B kostar 100 kr i månaden och 40 kr för varje besök. Hur många besök i månaden behöver man göra för att kort A ska vara billigast?', None, 3, '100 + 40n > 300 ger n > 5. Minst 6 besök.'),
       ('En stege som är 5,0 m lång står lutad mot en vägg. Stegens fot står 1,4 m från väggen. Hur högt upp på väggen når stegen?', None, 2, '√(5,0² − 1,4²) = √23,04 = 4,8 m'),
       ('Två vuxna och tre barn betalar 410 kr för bio. En vuxen och ett barn betalar 170 kr. Vad kostar en biljett för barn och en för vuxna?', None, 3, 'Barn 70 kr, vuxen 100 kr'),
       ('En burk har formen av en cylinder. Diametern är 8 cm och höjden 12 cm. Rymmer burken en halv liter? Motivera.', None, 2, 'Ja. V = π · 4² · 12 ≈ 603 cm³ ≈ 0,6 liter'),
       ('Linnea sätter in 5 000 kr på ett konto med 3 % ränta per år. Hur mycket finns på kontot efter 4 år?', None, 2, '5 000 · 1,03<sup>4</sup> ≈ 5 628 kr'),
       ('Du kastar två vanliga tärningar. Hur stor är sannolikheten att summan blir 7?', None, 2, '6/36 = 1/6')],
}
EX_CSS = """<style>
.np .exd{margin:0 0 26px}
.np .exd h3.rub{display:flex;align-items:center;gap:10px;margin:22px 0 4px;font-size:20px;color:var(--g)}
.np .exd h3.rub span{width:36px;height:36px;border-radius:10px;background:var(--g);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:800}
.np .exd .om{margin:0 0 12px;color:#3a3a3a}
.np .upg{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.np .u{background:#FBF8F2;border:2px solid #E6E1D7;border-left:6px solid var(--g);border-radius:16px;padding:14px 16px;line-height:1.5}
.np .u .top{display:flex;justify-content:space-between;gap:10px;font-weight:700;color:var(--g);font-size:14px;margin-bottom:4px}
.np .u ul.alt{list-style:none;padding:0;margin:8px 0 0;display:flex;flex-wrap:wrap;gap:8px}
.np .u ul.alt li{border:2px solid #D9D4C8;border-radius:10px;padding:3px 12px;background:#fff}
.np .u details{margin-top:10px}.np .u summary{cursor:pointer;font-weight:600;color:var(--g)}
.np .u details div{margin-top:6px;background:var(--gl);border-radius:10px;padding:8px 12px}
@media(max-width:760px){.np .upg{grid-template-columns:1fr}}
</style>"""
def exempel():
    ut = [EX_CSS]
    for b, g, gl, tid, rk, typ, var in DELPROV:
        r = 'med räknare och formelblad' if rk else 'utan räknare och formelblad'
        ut.append(f'<div class="exd" style="--g:{g};--gl:{gl}"><h3 class="rub"><span>{b}</span>Delprov {b}</h3><p class="om">{tid}, {r}. {typ} {var}</p><div class="upg">')
        for i, (t, alt, p, svar) in enumerate(EXEMPEL[b], 1):
            a = '<ul class="alt">' + ''.join(f'<li>□ {x}</li>' for x in alt) + '</ul>' if alt else ''
            ut.append(f'<div class="u"><div class="top"><span>Uppgift {i}</span><span>{p} p</span></div>{t}{a}<details><summary>Visa svar</summary><div>{svar}</div></details></div>')
        ut.append('</div></div>')
    return ''.join(ut)

EXEMPEL2 = {
 'A': [('Vilket tal är minst?', ['−0,5', '−1/4', '−0,45', '−2/3'], 1, '−2/3'),
       ('Beräkna (−3)<sup>2</sup> − 4', None, 1, '5'),
       ('Hur mycket är 20 % av 45?', None, 1, '9'),
       ('Skriv 3/8 som ett decimaltal.', None, 1, '0,375'),
       ('Beräkna 0,6 · 0,3', None, 1, '0,18'),
       ('Lös ekvationen 3x − 7 = 11', None, 1, 'x = 6'),
       ('Förenkla uttrycket så långt som möjligt: 3(2a − 1) − 4a', None, 1, '2a − 3'),
       ('Ungefär hur mycket är 498 · 0,21?', ['10', '100', '1 000', '10 000'], 1, '100 (ungefär 500 · 0,2)'),
       ('En kvadrat har arean 64 cm². Hur stor är kvadratens omkrets?', None, 1, '32 cm'),
       ('Vilket tal ska stå i rutan? 1/3 + □ = 5/6', None, 1, '1/2')],
 'B': [('Ett gympass kostar 60 kr. Ett klippkort med 10 pass kostar 480 kr. Hur många procent billigare är ett pass med klippkortet?', None, 2, 'Med kortet kostar ett pass 48 kr. 12 / 60 = 0,2, alltså 20 % billigare.'),
       ('Tio elever svarade på hur många timmar de sov natten innan: 7, 8, 6, 9, 8, 7, 8, 10, 6, 8.<br>a) Vilket är typvärdet? Endast svar krävs.<br>b) Vilken är medianen? Endast svar krävs.<br>c) Vilket är medelvärdet?', None, 4, 'a) 8 timmar<br>b) 8 timmar<br>c) 77 / 10 = 7,7 timmar'),
       ('En rektangel är 3 cm längre än den är bred. Omkretsen är 34 cm. Vilken area har rektangeln?', None, 3, '2(b + b + 3) = 34 ger b = 7. Sidorna är 7 cm och 10 cm, arean är 70 cm².'),
       ('Figur 1 består av 3 kvadrater, figur 2 av 5 kvadrater och figur 3 av 7 kvadrater. Mönstret fortsätter på samma sätt.<br>a) Hur många kvadrater har figur 10? Endast svar krävs.<br>b) Skriv en formel för antalet kvadrater K i figur n.<br>c) Kan en figur bestå av 100 kvadrater? Motivera.', None, 4, 'a) 21<br>b) K = 2n + 1<br>c) Nej. 2n + 1 är alltid udda, och 100 är jämnt.'),
       ('Priset på en vara höjs med 10 %. Sedan sänks det nya priset med 10 %. Är priset då samma som från början? Motivera.', None, 2, 'Nej. 1,10 · 0,90 = 0,99, så priset blir 1 % lägre än från början.')],
 'C': [('Hur mycket är 35 % av 2 400 kr?', None, 1, '840 kr'),
       ('Lös ekvationen 2(3x + 4) = 4x + 20', None, 1, 'x = 6'),
       ('En bil kör 240 km på 3 timmar och 12 minuter. Vilken är bilens medelhastighet?', None, 1, '75 km/h (3 h 12 min = 3,2 h)'),
       ('En rätvinklig triangel har kateterna 6 cm och 8 cm. Hur lång är hypotenusan?', None, 1, '10 cm'),
       ('Ett glasskafé har 4 smaker och 3 sorters strutar. Hur många olika kombinationer av en smak och en strut finns det?', None, 1, '12'),
       ('Ett rätblock är 0,5 m långt, 0,4 m brett och 0,3 m högt. Hur många liter rymmer det?', None, 1, '60 liter'),
       ('Lös ekvationen x<sup>2</sup> = 49', None, 1, 'x = 7 eller x = −7'),
       ('När ett tal ökas med 25 % blir det 150. Vilket är talet?', None, 1, '120')],
 'D': [('Mobilabonnemang A kostar 99 kr i månaden och 0,50 kr per samtalsminut. Abonnemang B kostar 199 kr i månaden och samtal ingår. Hur många minuter ska man ringa i månaden för att abonnemangen ska kosta lika mycket?', None, 2, '99 + 0,5x = 199 ger x = 200 minuter'),
       ('En pizzeria säljer en stor pizza med diametern 30 cm för 120 kr, eller två små pizzor med diametern 20 cm för sammanlagt 110 kr. Vilket köp ger mest pizza per krona? Motivera med beräkningar.', None, 3, 'Stor: π · 15² ≈ 707 cm², 707 / 120 ≈ 5,9 cm² per kr.<br>Två små: 2 · π · 10² ≈ 628 cm², 628 / 110 ≈ 5,7 cm² per kr.<br>Den stora pizzan ger mest per krona.'),
       ('Lös ekvationen 2x/3 − 4 = x/6 + 5', None, 2, 'Multiplicera med 6: 4x − 24 = x + 30, 3x = 54, x = 18'),
       ('En stad har 80 000 invånare. Antalet invånare ökar med 2 % per år.<br>a) Skriv en formel för antalet invånare I efter t år.<br>b) Hur många invånare finns det efter 5 år?', None, 3, 'a) I = 80 000 · 1,02<sup>t</sup><br>b) 80 000 · 1,02<sup>5</sup> ≈ 88 300 invånare'),
       ('En tv-skärm har diagonalen 55 tum. Förhållandet mellan skärmens bredd och höjd är 16:9. Hur bred är skärmen? Avrunda till hela tum.', None, 3, '(16k)² + (9k)² = 55² ger k ≈ 3,0. Bredden är 16 · 3,0 ≈ 48 tum.'),
       ('Sannolikheten att det regnar på lördag är 0,3 och på söndag 0,4. Vädret de två dagarna beror inte på varandra. Hur stor är sannolikheten att det inte regnar någon av dagarna?', None, 2, '0,7 · 0,6 = 0,42')],
}
VERSIONER = [('', EXEMPEL), ('-2', EXEMPEL2)]
