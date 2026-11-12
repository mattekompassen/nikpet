# PISA-träning (pisa-traning.html), undersida till Nationella prov. Utkast 2026-11-12.
# ALLA uppgifter är egna (frisläppta PISA-uppgifter får inte kopieras). Inget sparas.
# Uppgiftsenheter: en vardagssituation (text + bild/tabell/diagram) med 3 frågor.
# Frågetyper: 'val' (flerval), 'tal' (skriv ett tal, rättas automatiskt), 'resonera' (eget svar, jämför med exempelsvar).
import html, json

OMRADEN = [  # nyckel, namn, beskrivning, färg
    ('kvantitet', 'Tal', 'Räkna med pengar, procent, enheter och stora och små tal.', '#B8891F'),
    ('forandring', 'Samband och förändring', 'Grafer, tabeller och formler som visar hur något ändras.', '#3E7C59'),
    ('rum', 'Geometri', 'Area, volym, skala, ritningar och former i verkligheten.', '#5B6FB0'),
    ('data', 'Sannolikhet och statistik', 'Diagram, statistik, slump och sannolikhet.', '#A0526E'),
]

def _graf_cykel():
    # Avstånd hemifrån (km) mot tid (min). Punkter: (0,0) (12,3) (18,3) (28,6)
    x0, x1, y0, y1 = 56, 500, 250, 30
    X = lambda t: x0 + (x1 - x0) * t / 30
    Y = lambda s: y0 - (y0 - y1) * s / 7
    g = []
    for t in range(0, 31, 2):
        g.append(f'<line x1="{X(t):.1f}" y1="{y0}" x2="{X(t):.1f}" y2="{y1}" stroke="#DDE3EA" stroke-width="1"/>')
    for s in range(0, 8):
        g.append(f'<line x1="{x0}" y1="{Y(s):.1f}" x2="{x1}" y2="{Y(s):.1f}" stroke="#DDE3EA" stroke-width="1"/>')
        g.append(f'<text x="{x0-10}" y="{Y(s)+5:.1f}" text-anchor="end">{s}</text>')
    for t in range(0, 31, 6):
        g.append(f'<text x="{X(t):.1f}" y="{y0+22}" text-anchor="middle">{t}</text>')
    p = ' '.join(f'{X(t):.1f},{Y(s):.1f}' for t, s in [(0, 0), (12, 3), (18, 3), (28, 6)])
    return (f'<svg viewBox="0 0 520 300" class="fig" role="img" aria-label="Graf över Hugos cykeltur: avstånd hemifrån mot tid">'
            f'<g font-size="14" fill="#3B4A5A" font-family="Inter,sans-serif">{"".join(g)}'
            f'<line x1="{x0}" y1="{y0}" x2="{x1}" y2="{y0}" stroke="#3B4A5A" stroke-width="2"/><line x1="{x0}" y1="{y0}" x2="{x0}" y2="{y1-8}" stroke="#3B4A5A" stroke-width="2"/>'
            f'<polyline points="{p}" fill="none" stroke="#3E7C59" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>'
            f'<text x="{(x0+x1)/2}" y="292" text-anchor="middle" font-weight="700">Tid (minuter)</text>'
            f'<text x="16" y="{(y0+y1)/2}" text-anchor="middle" font-weight="700" transform="rotate(-90 16 {(y0+y1)/2})">Avstånd hemifrån (km)</text></g></svg>')

def _diagram_skarm():
    data = [('0–2 h', 20, 8), ('2–4 h', 36, 22), ('mer än 4 h', 24, 20)]
    x0, y0, y1, maxv = 56, 240, 30, 40
    Y = lambda v: y0 - (y0 - y1) * v / maxv
    g = []
    for v in range(0, 41, 5):
        g.append(f'<line x1="{x0}" y1="{Y(v):.1f}" x2="500" y2="{Y(v):.1f}" stroke="#DDE3EA"/><text x="{x0-10}" y="{Y(v)+5:.1f}" text-anchor="end">{v}</text>')
    for i, (namn, a7, a9) in enumerate(data):
        bx = x0 + 30 + i * 145
        for j, (v, f) in enumerate([(a7, '#A0526E'), (a9, '#E2B7C6')]):
            g.append(f'<rect x="{bx + j*48}" y="{Y(v):.1f}" width="44" height="{y0-Y(v):.1f}" rx="4" fill="{f}"/><text x="{bx + j*48 + 22}" y="{Y(v)-6:.1f}" text-anchor="middle" font-weight="700">{v}</text>')
        g.append(f'<text x="{bx+46}" y="{y0+22}" text-anchor="middle">{namn}</text>')
    leg = ('<rect x="330" y="2" width="16" height="16" rx="3" fill="#A0526E"/><text x="352" y="15">Åk 7 (80 elever)</text>'
           '<rect x="330" y="22" width="16" height="16" rx="3" fill="#E2B7C6"/><text x="352" y="35">Åk 9 (50 elever)</text>')
    return (f'<svg viewBox="0 0 520 300" class="fig" role="img" aria-label="Stapeldiagram: skärmtid per dag i åk 7 och åk 9">'
            f'<g font-size="14" fill="#3B4A5A" font-family="Inter,sans-serif">{"".join(g)}{leg}'
            f'<line x1="{x0}" y1="{y0}" x2="500" y2="{y0}" stroke="#3B4A5A" stroke-width="2"/>'
            f'<text x="16" y="{(y0+y1)/2}" text-anchor="middle" font-weight="700" transform="rotate(-90 16 {(y0+y1)/2})">Antal elever</text>'
            f'<text x="278" y="292" text-anchor="middle" font-weight="700">Skärmtid per dag (utanför skolan)</text></g></svg>')

def _pallkrage():
    return ('<svg viewBox="0 0 520 260" class="fig" role="img" aria-label="En pallkrage: 120 cm lång, 80 cm bred och 20 cm hög">'
            '<g font-family="Inter,sans-serif" font-size="15" fill="#3B4A5A">'
            '<polygon points="90,120 330,120 430,60 190,60" fill="#E9D9BE" stroke="#7A5A2E" stroke-width="3"/>'
            '<polygon points="110,116 316,116 402,66 196,66" fill="#6B4A2B"/>'
            '<polygon points="90,120 330,120 330,170 90,170" fill="#C9A06A" stroke="#7A5A2E" stroke-width="3"/>'
            '<polygon points="330,120 430,60 430,110 330,170" fill="#B38650" stroke="#7A5A2E" stroke-width="3"/>'
            '<line x1="90" y1="145" x2="330" y2="145" stroke="#7A5A2E" stroke-width="1.5" opacity=".5"/>'
            '<path d="M90 195 H330" stroke="#3B4A5A" stroke-width="2"/><path d="M90 188v14M330 188v14" stroke="#3B4A5A" stroke-width="2"/>'
            '<text x="210" y="220" text-anchor="middle" font-weight="700">120 cm</text>'
            '<path d="M345 185 L445 125" stroke="#3B4A5A" stroke-width="2"/><text x="420" y="175" font-weight="700">80 cm</text>'
            '<path d="M70 120 V170" stroke="#3B4A5A" stroke-width="2"/><path d="M63 120h14M63 170h14" stroke="#3B4A5A" stroke-width="2"/>'
            '<text x="56" y="150" text-anchor="end" font-weight="700">20 cm</text>'
            '<text x="260" y="40" text-anchor="middle" font-size="13">Ovanifrån är kragen en rektangel. Den har ingen botten.</text></g></svg>')

ABONNEMANG = ('<div class="pr-abb">'
              '<div><b>Abonnemang Bas</b><span class="pr-pris">99 kr</span><span>per månad</span><ul><li>5 GB surf ingår</li><li>Varje extra GB kostar 25 kr</li></ul></div>'
              '<div><b>Abonnemang Fri</b><span class="pr-pris">189 kr</span><span>per månad</span><ul><li>Fri surf, hur mycket du vill</li><li>Inga extra kostnader</li></ul></div></div>')

ENHETER = [
 dict(id='mobil', omr='kvantitet', titel='Mobilabonnemang', niva='Lätt till medel',
      text='Lina ska välja mobilabonnemang. Hon jämför två abonnemang från samma företag. Extra surf räknas i hela GB.',
      fig=ABONNEMANG,
      fragor=[
        dict(typ='tal', q='En månad surfar Lina 8 GB. Vad kostar Abonnemang Bas den månaden?', svar=174, enhet='kr',
             forkl='5 GB ingår. Lina surfar 3 GB extra: 3 · 25 = 75 kr. 99 + 75 = 174 kr.'),
        dict(typ='val', q='Hur många GB måste Lina surfa på en månad för att Abonnemang Fri ska bli billigare än Bas?',
             alt=['7 GB eller mer', '8 GB eller mer', '9 GB eller mer', '10 GB eller mer'], ratt=2,
             forkl='Bas med 8 GB kostar 174 kr, alltså billigare än 189 kr. Med 9 GB kostar Bas 99 + 4 · 25 = 199 kr, och då är Fri billigare.'),
        dict(typ='resonera', q='Lina surfar ungefär 4 GB varje månad, men under juli surfar hon 12 GB. Vilket abonnemang blir billigast för ett helt år? Visa hur du räknar.',
             exempel='Bas: 11 månader · 99 kr = 1 089 kr. Juli: 99 + 7 · 25 = 274 kr. Totalt 1 089 + 274 = 1 363 kr. Fri: 12 · 189 = 2 268 kr. Bas blir billigast för hela året, fast Fri är billigast i juli.',
             krav='Du har ett bra svar om du räknar ut kostnaden för hela året för båda abonnemangen och drar en slutsats.'),
      ]),
 dict(id='cykel', omr='forandring', titel='Cykelturen', niva='Medel',
      text='Hugo cyklar från sitt hem till en badplats. Grafen visar hur långt från hemmet han är under turen. På vägen stannar han en stund vid en kiosk.',
      fig=_graf_cykel(),
      fragor=[
        dict(typ='tal', q='Hur många minuter står Hugo stilla vid kiosken?', svar=6, enhet='min',
             forkl='Grafen är vågrät mellan 12 och 18 minuter. Då ändras inte avståndet. 18 − 12 = 6 minuter.'),
        dict(typ='val', q='Under vilken del av turen cyklar Hugo snabbast?',
             alt=['Från start till kiosken', 'Vid kiosken', 'Från kiosken till badplatsen', 'Han cyklar lika fort hela tiden'], ratt=2,
             forkl='Före kiosken: 3 km på 12 minuter. Efter kiosken: 3 km på 10 minuter. Samma sträcka på kortare tid betyder högre fart. Därför är linjen också brantare där.'),
        dict(typ='resonera', q='Saga säger: ”Hugo cyklade fortast i början, för den delen av linjen är längst.” Har Saga rätt? Förklara.',
             exempel='Nej. Det är inte linjens längd som visar farten utan hur brant den är. I början cyklar han 3 km på 12 min. Efter kiosken cyklar han 3 km på 10 min, och den delen är brantare. Alltså cyklar han fortast efter kiosken.',
             krav='Du har ett bra svar om du säger att Saga har fel och förklarar att lutningen (eller sträcka per tid) visar farten.'),
      ]),
 dict(id='odling', omr='rum', titel='Odlingslådor', niva='Medel till svår',
      text='Klass 8B ska odla grönsaker på skolgården i pallkragar. En pallkrage är en ram av trä utan botten. Man kan stapla flera kragar på varandra för att få en högre låda. Jord köps i säckar med 50 liter.',
      fig=_pallkrage(),
      fragor=[
        dict(typ='tal', q='Klassen staplar två pallkragar på varandra och fyller lådan helt med jord. Hur många liter jord behövs? (1 liter = 1 dm³)', svar=384, enhet='liter',
             forkl='Två kragar ger höjden 40 cm. I dm: 12 · 8 · 4 = 384 dm³ = 384 liter.'),
        dict(typ='val', q='Hur många säckar jord måste klassen köpa till lådan i förra frågan?',
             alt=['7 säckar', '7,68 säckar', '8 säckar', '10 säckar'], ratt=2,
             forkl='384 / 50 = 7,68. Man kan inte köpa en del av en säck, och 7 säckar räcker inte. Klassen måste köpa 8 säckar.'),
        dict(typ='resonera', q='Klassen vill ha en odlingsyta på minst 3 m². Läraren säger att tre pallkragar bredvid varandra räcker. Har läraren rätt? Visa hur du tänker.',
             exempel='En pallkrage har ytan 1,2 m · 0,8 m = 0,96 m². Tre kragar ger 3 · 0,96 = 2,88 m². Det är mindre än 3 m², så läraren har fel. Klassen behöver fyra pallkragar (3,84 m²).',
             krav='Du har ett bra svar om du räknar ut arean för en pallkrage i m² (eller 9 600 cm²), jämför med 3 m² och drar en slutsats.'),
      ]),
 dict(id='skarm', omr='data', titel='Skärmtid', niva='Medel till svår',
      text='Elevrådet har frågat eleverna i åk 7 och åk 9 hur mycket skärmtid de har per dag utanför skolan. 80 elever i åk 7 och 50 elever i åk 9 svarade. Diagrammet visar resultatet.',
      fig=_diagram_skarm(),
      fragor=[
        dict(typ='tal', q='Hur många procent av eleverna i åk 9 har mer än 4 timmar skärmtid per dag?', svar=40, enhet='%',
             forkl='20 av 50 elever. 20 / 50 = 0,40 = 40 %.'),
        dict(typ='val', q='Man väljer slumpvis en av eleverna i åk 7 som svarade. Hur stor är sannolikheten att eleven har högst 2 timmar skärmtid?',
             alt=['20 %', '25 %', '30 %', '45 %'], ratt=1,
             forkl='20 av 80 elever har 0–2 timmar. 20 / 80 = 0,25 = 25 %.'),
        dict(typ='resonera', q='I skoltidningen står det: ”Fler elever i åk 7 än i åk 9 har mer än 4 timmar skärmtid. Åk 7 har alltså mest skärmtid!” Stämmer slutsatsen? Förklara med hjälp av diagrammet.',
             exempel='Nej. Det är sant att fler elever i åk 7 (24) än i åk 9 (20) har mer än 4 timmar. Men åk 7 har fler elever som svarade. I åk 7 är det 24 / 80 = 30 %, och i åk 9 är det 20 / 50 = 40 %. En större andel i åk 9 har mer än 4 timmar.',
             krav='Du har ett bra svar om du jämför andelar (procent) i stället för antal och visar att andelen är större i åk 9.'),
      ]),
]

# ---- Fler uppgiftsenheter (2026-11-12) ----
def _karta():
    return ('<svg viewBox="0 0 520 280" class="fig" role="img" aria-label="Karta över Idas väg till skolan">'
            '<g font-family="Inter,sans-serif" font-size="14" fill="#3B4A5A">'
            '<rect x="0" y="0" width="520" height="280" rx="14" fill="#EEF3E8"/>'
            '<rect x="330" y="125" width="130" height="70" rx="10" fill="#CFE3C4"/><text x="395" y="165" text-anchor="middle">Park</text>'
            '<path d="M60 230 H200 V140 H300 V60 H460" fill="none" stroke="#FFFFFF" stroke-width="16" stroke-linejoin="round"/>'
            '<path d="M60 230 H200 V140 H300 V60 H460" fill="none" stroke="#C9C2B4" stroke-width="2" stroke-dasharray="6 6"/>'
            '<path d="M60 230 L460 60" stroke="#5B6FB0" stroke-width="2.5" stroke-dasharray="3 5"/>'
            '<circle cx="60" cy="230" r="10" fill="#B5473F"/><text x="60" y="258" text-anchor="middle" font-weight="700">Hem</text>'
            '<rect x="448" y="44" width="26" height="26" rx="4" fill="#2F4A6B"/><text x="461" y="96" text-anchor="middle" font-weight="700">Skola</text>'
            '<text x="275" y="190" fill="#5B6FB0" font-weight="700" transform="rotate(-23 275 190)">fågelvägen 6 cm</text>'
            '<path d="M330 250 H430" stroke="#3B4A5A" stroke-width="3"/><path d="M330 244v12M430 244v12M380 247v6" stroke="#3B4A5A" stroke-width="2"/>'
            '<text x="380" y="238" text-anchor="middle" font-size="13">Skala 1 : 20 000</text></g></svg>')

def _pizza():
    return ('<svg viewBox="0 0 520 230" class="fig" role="img" aria-label="Två pizzor: liten 24 cm i diameter för 79 kr och stor 36 cm i diameter för 149 kr">'
            '<g font-family="Inter,sans-serif" font-size="15" fill="#3B4A5A">'
            '<circle cx="130" cy="110" r="64" fill="#E9B949" stroke="#B5813A" stroke-width="6"/><circle cx="110" cy="95" r="8" fill="#B5473F"/><circle cx="150" cy="125" r="8" fill="#B5473F"/><circle cx="125" cy="140" r="6" fill="#3E7C59"/>'
            '<path d="M66 110 H194" stroke="#3B4A5A" stroke-width="2" stroke-dasharray="4 4"/>'
            '<text x="130" y="200" text-anchor="middle" font-weight="700">Liten · 24 cm · 79 kr</text>'
            '<circle cx="370" cy="105" r="96" fill="#E9B949" stroke="#B5813A" stroke-width="6"/><circle cx="335" cy="80" r="9" fill="#B5473F"/><circle cx="400" cy="130" r="9" fill="#B5473F"/><circle cx="350" cy="140" r="7" fill="#3E7C59"/><circle cx="410" cy="70" r="7" fill="#3E7C59"/>'
            '<path d="M274 105 H466" stroke="#3B4A5A" stroke-width="2" stroke-dasharray="4 4"/>'
            '<text x="370" y="224" text-anchor="middle" font-weight="700">Stor · 36 cm · 149 kr</text></g></svg>')

def _tabell(rubriker, rader, cls=''):
    return (f'<table class="pi-tab {cls}"><tr>' + ''.join(f'<th>{h}</th>' for h in rubriker) + '</tr>'
            + ''.join('<tr>' + ''.join(f'<td>{c}</td>' for c in r) + '</tr>' for r in rader) + '</table>')

RESA = ('<div class="pi-info"><div><b>Tåg Malmö–Köpenhamn</b>Tur och retur: <strong>180 kr</strong> per person</div>'
        '<div><b>Grupprabatt</b>Minst 20 personer: <strong>20 % rabatt</strong> på varje biljett</div>'
        '<div><b>Växelkurs</b>1 dansk krona (DKK) kostar <strong>1,60 svenska kronor</strong></div></div>')
DUSCH = ('<div class="pi-info"><div><b>Vanligt duschmunstycke</b><strong>12 liter</strong> vatten per minut</div>'
         '<div><b>Sparmunstycke</b><strong>7 liter</strong> vatten per minut · kostar <strong>249 kr</strong></div>'
         '<div><b>Varmvatten</b>Kostar ungefär <strong>8 öre</strong> per liter</div></div>')
TAXI = ('<div class="pi-info"><div><b>Taxi Snabb</b>Grundavgift <strong>45 kr</strong> + <strong>12 kr</strong> per km</div>'
        '<div><b>Taxi Enkel</b>Ingen grundavgift, <strong>21 kr</strong> per km</div></div>')
TOMBOLA = ('<div class="pi-info"><div><b>Tombola på skolans julmarknad</b>200 lotter, 10 kr per lott</div>'
           '<div><b>Vinster</b>5 stora vinster (biobiljetter)<br>25 små vinster (godispåsar)</div><div><b>Resten</b>Nitlotter, ingen vinst</div></div>')

ENHETER += [
 dict(id='resa', omr='kvantitet', titel='Klassresan', niva='Medel',
      text='Klass 9A ska åka tåg till Köpenhamn. 25 elever och 2 lärare följer med. I Danmark betalar man med danska kronor.',
      fig=RESA,
      fragor=[
        dict(typ='tal', q='Vad kostar en tågbiljett tur och retur med grupprabatt?', svar=144, enhet='kr',
             forkl='20 % av 180 kr är 36 kr. 180 − 36 = 144 kr. (Eller 0,8 · 180 = 144 kr.)'),
        dict(typ='val', q='En glass kostar 30 DKK. Ungefär vad kostar den i svenska kronor?',
             alt=['19 kr', '32 kr', '48 kr', '60 kr'], ratt=2,
             forkl='En dansk krona kostar 1,60 kr. 30 · 1,60 = 48 kr.'),
        dict(typ='resonera', q='Klassen säljer bullar för att betala alla biljetter (även lärarnas). Varje bulle ger 8 kr i vinst. Elsa säger: ”Vi måste sälja minst 500 bullar.” Har Elsa rätt? Visa hur du räknar.',
             exempel='Biljetterna kostar 27 · 144 = 3 888 kr. 3 888 / 8 = 486. Klassen behöver alltså sälja 486 bullar. Elsa har inte rätt, 500 bullar räcker men det behövs inte så många.',
             krav='Du har ett bra svar om du räknar ut vad alla 27 biljetter kostar, delar med 8 och jämför med 500.'),
      ]),
 dict(id='taxi', omr='forandring', titel='Taxiresan', niva='Medel',
      text='Omar ska åka taxi hem från stationen. Två taxibolag har olika priser. Priset beror på hur många kilometer resan är.',
      fig=TAXI,
      fragor=[
        dict(typ='tal', q='Vad kostar en resa på 10 km med Taxi Snabb?', svar=165, enhet='kr',
             forkl='45 + 10 · 12 = 45 + 120 = 165 kr.'),
        dict(typ='val', q='För vilken sträcka kostar de två taxibolagen lika mycket?',
             alt=['3 km', '5 km', '7 km', '9 km'], ratt=1,
             forkl='Taxi Snabb: 45 + 5 · 12 = 105 kr. Taxi Enkel: 5 · 21 = 105 kr. Lika mycket vid 5 km. Du kan också lösa ekvationen 45 + 12x = 21x.'),
        dict(typ='resonera', q='Moa skriver formeln K = 12 + 45x för priset K kronor med Taxi Snabb, där x är antalet km. Stämmer formeln? Förklara.',
             exempel='Nej. 45 kr är grundavgiften och ska bara betalas en gång. 12 kr betalar man för varje km. Formeln ska vara K = 45 + 12x. Med Moas formel skulle 10 km kosta 462 kr.',
             krav='Du har ett bra svar om du förklarar att Moa har bytt plats på talen och skriver den rätta formeln K = 45 + 12x.'),
      ]),
 dict(id='karta', omr='rum', titel='Skolvägen', niva='Lätt till medel',
      text='Ida tittar på en karta över sin skolväg. Kartan har skalan 1 : 20 000. På kartan är avståndet fågelvägen mellan hemmet och skolan 6 cm.',
      fig=_karta(),
      fragor=[
        dict(typ='tal', q='Hur långt är det fågelvägen mellan Idas hem och skolan i verkligheten? Svara i meter.', svar=1200, enhet='m',
             forkl='6 cm · 20 000 = 120 000 cm = 1 200 m.'),
        dict(typ='val', q='Parken är en rektangel som är 2 cm lång och 1,5 cm bred på kartan. Hur stor är parkens area i verkligheten?',
             alt=['3 000 m²', '12 000 m²', '60 000 m²', '120 000 m²'], ratt=3,
             forkl='I verkligheten är parken 2 · 200 m = 400 m lång och 1,5 · 200 m = 300 m bred. Arean är 400 · 300 = 120 000 m².'),
        dict(typ='resonera', q='Ida säger: ”Jag går 1,2 km till skolan varje dag.” Är det troligt att hon går exakt så långt? Förklara.',
             exempel='Nej, troligen går hon längre. 1,2 km är fågelvägen, alltså en rak linje. Ida måste följa gatorna, som svänger. Därför blir hennes väg längre än 1,2 km.',
             krav='Du har ett bra svar om du förklarar att fågelvägen är den kortaste raka sträckan och att gatorna inte går rakt.'),
      ]),
 dict(id='tombola', omr='data', titel='Tombolan', niva='Lätt till medel',
      text='Elevrådet har en tombola på skolans julmarknad. Alla lotter ligger blandade i en stor skål och man drar själv en lott.',
      fig=TOMBOLA,
      fragor=[
        dict(typ='tal', q='Hur stor är sannolikheten att den första lotten som dras ger en vinst (stor eller liten)? Svara i procent.', svar=15, enhet='%',
             forkl='Det finns 5 + 25 = 30 vinster bland 200 lotter. 30 / 200 = 0,15 = 15 %.'),
        dict(typ='val', q='Hur stor är sannolikheten att den första lotten ger en stor vinst?',
             alt=['2,5 %', '5 %', '10 %', '25 %'], ratt=0,
             forkl='5 av 200 lotter ger en stor vinst. 5 / 200 = 0,025 = 2,5 %.'),
        dict(typ='resonera', q='Leo har dragit 10 lotter och alla var nitlotter. Han säger: ”Nu är det min tur. Nästa lott blir säkert en vinst!” Har Leo rätt? Förklara.',
             exempel='Nej. Det finns fortfarande många nitlotter kvar i skålen, så nästa lott kan mycket väl bli en nit till. Att Leo har förlorat tidigare gör inte att han vinner nu. Sannolikheten att vinna är fortfarande ungefär 15 %.',
             krav='Du har ett bra svar om du förklarar att det inte är säkert, eftersom det finns många nitlotter kvar och tidigare dragningar inte bestämmer nästa.'),
      ]),
 dict(id='dusch', omr='kvantitet', titel='Duschen', niva='Medel till svår',
      text='Familjen Nilsson vill spara vatten och pengar. De funderar på att byta till ett sparmunstycke i duschen.',
      fig=DUSCH,
      fragor=[
        dict(typ='tal', q='Hur många liter vatten går åt när man duschar i 8 minuter med det vanliga munstycket?', svar=96, enhet='liter',
             forkl='12 liter per minut · 8 minuter = 96 liter.'),
        dict(typ='val', q='Hur många liter vatten sparar man på en dusch i 8 minuter om man använder sparmunstycket?',
             alt=['5 liter', '40 liter', '56 liter', '96 liter'], ratt=1,
             forkl='Man sparar 12 − 7 = 5 liter per minut. 5 · 8 = 40 liter.'),
        dict(typ='resonera', q='Familjen duschar sammanlagt 8 minuter per dag. Pappa säger: ”Sparmunstycket har betalat sig själv på mindre än ett halvår.” Har han rätt? Visa hur du räknar.',
             exempel='Familjen sparar 40 liter per dag. 40 · 0,08 kr = 3,20 kr per dag. 249 / 3,20 ≈ 78 dagar. Ett halvår är ungefär 180 dagar, så pappa har rätt. Munstycket har betalat sig efter ungefär 2,5 månader.',
             krav='Du har ett bra svar om du räknar ut hur mycket familjen sparar per dag i kronor och hur många dagar det tar att spara 249 kr.'),
      ]),
 dict(id='solros', omr='forandring', titel='Solrosen', niva='Medel till svår',
      text='Klass 7C mäter en solros varje vecka. Tabellen visar solrosens höjd.',
      fig=_tabell(['Vecka', '0', '1', '2', '3', '4', '5'], [['Höjd (cm)', '10', '16', '22', '28', '34', '40']]),
      fragor=[
        dict(typ='tal', q='Anta att solrosen fortsätter att växa lika mycket varje vecka. Hur hög är den efter 9 veckor?', svar=64, enhet='cm',
             forkl='Solrosen växer 6 cm per vecka. Efter 9 veckor: 10 + 9 · 6 = 64 cm.'),
        dict(typ='val', q='Vilken formel beskriver solrosens höjd h (cm) efter v veckor?',
             alt=['h = 6 + 10v', 'h = 10 + 6v', 'h = 16v', 'h = 10v'], ratt=1,
             forkl='Solrosen var 10 cm från början (v = 0) och växer 6 cm varje vecka. Därför h = 10 + 6v. Kontroll: v = 3 ger 10 + 18 = 28 cm.'),
        dict(typ='resonera', q='Teo använder formeln och säger att solrosen är över 3 meter hög efter ett år (52 veckor). Är det rimligt? Förklara.',
             exempel='Formeln ger 10 + 6 · 52 = 322 cm. Men det är inte rimligt att använda formeln så länge. En solros växer bara under sommaren och slutar sedan växa och vissnar på hösten. Formeln stämmer bara för de veckor man har mätt, och kanske lite till.',
             krav='Du har ett bra svar om du förklarar att formeln bara gäller under en begränsad tid, eftersom solrosen inte kan växa lika mycket hela året.'),
      ]),
 dict(id='pizza', omr='rum', titel='Pizzorna', niva='Svår',
      text='En pizzeria säljer runda pizzor i två storlekar. Måttet är pizzans diameter. Pizzorna är lika tjocka.',
      fig=_pizza(),
      fragor=[
        dict(typ='tal', q='Hur stor är arean av den stora pizzan? Avrunda till hela cm².', svar=1018, tol=8, svartxt='ungefär 1 018 cm²', enhet='cm²',
             forkl='Radien är 36 / 2 = 18 cm. Arean = π · 18² ≈ 3,14 · 324 ≈ 1 018 cm².'),
        dict(typ='val', q='Hur många gånger större area har den stora pizzan jämfört med den lilla?',
             alt=['1,5 gånger', '2 gånger', '2,25 gånger', '3 gånger'], ratt=2,
             forkl='Diametern är 36 / 24 = 1,5 gånger större. Arean blir 1,5 · 1,5 = 2,25 gånger större. (Liten: π · 12² ≈ 452 cm², stor ≈ 1 018 cm². 1 018 / 452 ≈ 2,25.)'),
        dict(typ='resonera', q='Hugo säger: ”Den lilla pizzan är bäst köp, för den kostar ungefär hälften så mycket.” Har Hugo rätt? Förklara med beräkningar.',
             exempel='Nej. Den stora pizzan har 2,25 gånger så stor area men kostar bara 149 / 79 ≈ 1,9 gånger så mycket. Pris per cm²: liten 79 / 452 ≈ 0,17 kr, stor 149 / 1 018 ≈ 0,15 kr. Man får mer pizza för pengarna med den stora.',
             krav='Du har ett bra svar om du jämför pris per cm² (eller area per krona) för båda pizzorna och drar en slutsats.'),
      ]),
 dict(id='lopning', omr='data', titel='Löpträningen', niva='Svår',
      text='Hanna och Elin tränar inför skolans 5-kilometerslopp. Tabellen visar deras tider i minuter på fem träningslopp. Vid lopp 5 hade Hanna ont i foten och fick gå större delen av vägen.',
      fig=_tabell(['Lopp', '1', '2', '3', '4', '5'], [['Hanna', '24', '23', '25', '22', '46'], ['Elin', '26', '25', '27', '26', '26']]),
      fragor=[
        dict(typ='tal', q='Vad är medelvärdet av Elins tider?', svar=26, enhet='min',
             forkl='26 + 25 + 27 + 26 + 26 = 130. 130 / 5 = 26 minuter.'),
        dict(typ='val', q='Vad är medianen av Hannas tider?',
             alt=['22 min', '24 min', '25 min', '28 min'], ratt=1,
             forkl='Sortera tiderna: 22, 23, 24, 25, 46. Talet i mitten är 24. (28 min är medelvärdet.)'),
        dict(typ='resonera', q='Tränaren räknar ut medelvärdet för båda. Hanna får 28 minuter och Elin 26 minuter. Tränaren säger: ”Elin är snabbast.” Håller du med? Förklara.',
             exempel='Inte riktigt. Hannas medelvärde blir högt på grund av lopp 5, då hon var skadad (46 min). Ett sådant extremt värde påverkar medelvärdet mycket. Medianen är bättre här: Hanna 24 min och Elin 26 min. Hanna var dessutom snabbare än Elins alla tider på de fyra andra loppen. Hanna är troligen snabbast.',
             krav='Du har ett bra svar om du förklarar att 46 minuter är ett avvikande värde som drar upp medelvärdet, och använder medianen eller de andra loppen för att jämföra.'),
      ]),
]
# Ordning på sidan: blanda områdena och gå från lättare till svårare
_ORDNING = ['mobil', 'karta', 'tombola', 'cykel', 'resa', 'taxi', 'skarm', 'odling', 'dusch', 'solros', 'lopning', 'pizza']
ENHETER.sort(key=lambda en: _ORDNING.index(en['id']))

INTRO = [
 ('🌍', 'Vad är PISA?', 'PISA är en internationell undersökning. Vart tredje år gör 15-åringar i ungefär 80 länder samma prov i matematik, läsförståelse och naturvetenskap. Resultatet visar hur bra skolan i varje land är, inte vilket betyg du får.'),
 ('🧩', 'Hur ser uppgifterna ut?', 'Varje uppgift börjar med en situation från verkligheten, till exempel en karta, ett diagram eller ett erbjudande. Till situationen hör flera frågor. Ofta blir frågorna svårare ju längre du kommer.'),
 ('💬', 'Vad testas?', 'Mer än att räkna. Du ska förstå situationen, välja vilken matematik du behöver, räkna och sedan förklara vad svaret betyder. Ibland ska du avgöra om ett påstående stämmer.'),
]
TIPS = ['Läs texten och titta noga på bilden eller diagrammet först.', 'Fråga dig: Vad ska jag ta reda på? Vilka uppgifter behöver jag?',
        'All information du behöver finns i uppgiften, men allt behöver du inte använda.', 'Kontrollera att svaret är rimligt i verkligheten.',
        'När du ska förklara: använd både ord och tal.']

CSS = """<style>
.pisa{max-width:1100px}
.pisa .ingress{font-size:19px;line-height:1.55;max-width:860px;margin:0 0 18px}
.pisa .pi-intro{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:14px}
.pisa .pi-intro div{background:#fff;border:1.5px solid #D5E0EA;border-radius:20px;padding:18px 20px;line-height:1.5}
.pisa .pi-intro span{font-size:30px}.pisa .pi-intro h3{margin:6px 0 6px;font-size:18px;color:var(--ink)}.pisa .pi-intro p{margin:0;font-size:15.5px}
.pisa .pi-omr{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:0 0 14px}
.pisa .pi-omr button{font:inherit;text-align:left;cursor:pointer;background:#fff;border:2px solid #D5E0EA;border-left:8px solid var(--o);border-radius:16px;padding:12px 14px;line-height:1.4}
.pisa .pi-omr button b{display:block;color:var(--o);font-size:16px}.pisa .pi-omr button span{font-size:14px;color:#3B4A5A}
.pisa .pi-omr button.on{background:var(--ol);box-shadow:0 0 0 2px var(--o)}
.pisa .pi-tips{background:var(--vl);border:2px solid var(--l);border-radius:20px;padding:16px 22px;margin:0 0 26px}
.pisa .pi-tips h3{margin:0 0 6px;font-size:18px;color:var(--ink)}.pisa .pi-tips ul{margin:0;padding-left:20px;line-height:1.65;columns:2;column-gap:30px}
.pisa h2.grupp{display:flex;align-items:center;gap:12px;font-size:24px;margin:30px 0 12px}
.pisa h2.grupp::before{content:"";width:10px;height:30px;border-radius:6px;background:var(--ink)}
.pisa .enhet{background:#fff;border:2px solid #D5E0EA;border-top:10px solid var(--o);border-radius:24px;margin:0 0 26px;overflow:hidden}
.pisa .en-huvud{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:18px 24px 0}
.pisa .en-huvud h3{margin:0;font-family:Fraunces,Georgia,serif;font-size:26px;color:#1E2B3A}
.pisa .chip{border-radius:999px;padding:4px 12px;font-size:13px;font-weight:700;background:var(--ol);color:var(--o)}
.pisa .chip.pi-niva{background:#EEF1F4;color:#3B4A5A}
.pisa .en-kropp{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:16px 24px 24px}
.pisa .situation{position:sticky;top:12px;align-self:start;background:#F7F9FB;border-radius:18px;padding:16px 18px}
.pisa .situation p{margin:0 0 12px;line-height:1.55;font-size:16px}
.pisa .fig{width:100%;height:auto;display:block}
.pisa .pr-abb{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.pisa .pr-abb>div{background:#fff;border:2px solid #E7D9B5;border-radius:16px;padding:14px;text-align:center}
.pisa .pr-abb b{display:block;font-size:16px}.pisa .pr-pris{display:block;font-family:Fraunces,Georgia,serif;font-size:34px;color:#8A6614;line-height:1.2}
.pisa .pr-abb ul{text-align:left;margin:10px 0 0;padding-left:18px;font-size:14.5px;line-height:1.5}
.pisa .pi-info{display:grid;gap:10px}
.pisa .pi-info>div{background:#fff;border:1.5px solid #D5E0EA;border-left:6px solid var(--o);border-radius:12px;padding:10px 14px;line-height:1.5;font-size:15.5px}
.pisa .pi-info b{display:block;color:var(--o)}
.pisa .pi-tab{border-collapse:collapse;width:100%;background:#fff;font-size:16px;text-align:center}
.pisa .pi-tab th,.pisa .pi-tab td{border:1.5px solid #D5E0EA;padding:8px 6px}
.pisa .pi-tab th{background:var(--ol);color:#1E2B3A}.pisa .pi-tab td:first-child{font-weight:700;text-align:left;background:#F7F9FB}
.pisa .pi-fr{border:1.5px solid #E1E7EE;border-radius:16px;padding:14px 16px;margin:0 0 12px}
.pisa .pi-fr .fnr{font-size:12.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--o)}
.pisa .pi-fr p.q{margin:4px 0 10px;line-height:1.5;font-size:16px;font-weight:500}
.pisa .pi-alt{display:grid;gap:6px}
.pisa .pi-alt button{font:inherit;text-align:left;cursor:pointer;background:#F7F9FB;border:1.5px solid #D5E0EA;border-radius:12px;padding:9px 12px}
.pisa .pi-alt button:hover{border-color:var(--o)}
.pisa .pi-alt button.ratt{background:#E3F2E6;border-color:#3E7C59}.pisa .pi-alt button.fel{background:#F9E3E3;border-color:#B5473F}
.pisa .tal{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.pisa .tal input{font:inherit;width:120px;padding:9px 12px;border:1.5px solid #C9D4DF;border-radius:12px}
.pisa .tal .enh{font-weight:600}
.pisa button.kn{font:inherit;font-weight:700;cursor:pointer;background:var(--knapp);color:#fff;border:0;border-radius:999px;padding:9px 18px}
.pisa button.kn.ljus{background:#EEF1F4;color:#1E2B3A}
.pisa textarea{font:inherit;width:100%;min-height:80px;padding:10px 12px;border:1.5px solid #C9D4DF;border-radius:12px;box-sizing:border-box;margin-bottom:8px}
.pisa .aterk{margin-top:10px;border-radius:12px;padding:10px 12px;line-height:1.5;font-size:15px;display:none}
.pisa .aterk.visa{display:block}.pisa .aterk.ok{background:#E3F2E6}.pisa .aterk.nej{background:#FBEDE0}.pisa .aterk.info{background:#EEF3F8}
.pisa .aterk b{display:block;margin-bottom:2px}
.pisa .sjalv{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
.pisa .resultat{background:var(--ol);border-radius:14px;padding:10px 14px;font-weight:700;color:#1E2B3A;display:none}
.pisa .resultat.visa{display:block}
.pisa .dold{display:none!important}
@media(max-width:900px){.pisa .en-kropp{grid-template-columns:1fr}.pisa .situation{position:static}.pisa .pi-omr{grid-template-columns:1fr 1fr}.pisa .pi-intro{grid-template-columns:1fr}}
@media(max-width:560px){.pisa .pi-omr{grid-template-columns:1fr}.pisa .pi-tips ul{columns:1}.pisa .en-kropp,.pisa .en-huvud{padding-left:14px;padding-right:14px}.pisa .pr-abb{grid-template-columns:1fr}}
</style>"""

JS = r"""<script>
(function(){
function norm(s){return parseFloat(String(s).replace(/\s/g,'').replace(',','.').replace('−','-'))}
var poang={};
function uppd(id){var e=document.getElementById('en-'+id),n=e.querySelectorAll('.pi-fr').length,k=e.querySelectorAll('.pi-fr[data-klar]').length,r=e.querySelectorAll('.pi-fr[data-klar="1"]').length,res=e.querySelector('.resultat');
 if(k===n){res.textContent='Klart! Du hade '+r+' av '+n+' rätt i '+e.dataset.titel+'.';res.classList.add('visa')}}
function klar(f,ok){if(f.dataset.klar)return;f.dataset.klar=ok?'1':'0';uppd(f.closest('.enhet').dataset.id)}
document.querySelectorAll('.pisa .pi-fr').forEach(function(f){
 var typ=f.dataset.typ,ak=f.querySelector('.aterk');
 if(typ==='val'){f.querySelectorAll('.pi-alt button').forEach(function(b){b.onclick=function(){if(f.dataset.klar)return;var ok=b.dataset.i===f.dataset.ratt;
   b.classList.add(ok?'ratt':'fel');if(!ok)f.querySelector('.pi-alt button[data-i="'+f.dataset.ratt+'"]').classList.add('ratt');
   ak.className='aterk visa '+(ok?'ok':'nej');ak.innerHTML='<b>'+(ok?'Rätt!':'Inte riktigt.')+'</b>'+f.dataset.forkl;klar(f,ok)}})}
 if(typ==='tal'){var inp=f.querySelector('input'),kn=f.querySelector('button.kn');
  function kolla(){var v=norm(inp.value);if(isNaN(v))return;var ok=Math.abs(v-parseFloat(f.dataset.svar))<=parseFloat(f.dataset.tol);
   ak.className='aterk visa '+(ok?'ok':'nej');ak.innerHTML='<b>'+(ok?'Rätt!':'Inte riktigt. Svaret är '+f.dataset.svartxt+'.')+'</b>'+f.dataset.forkl;inp.disabled=true;kn.disabled=true;klar(f,ok)}
  kn.onclick=kolla;inp.onkeydown=function(e){if(e.key==='Enter')kolla()}}
 if(typ==='resonera'){var kn=f.querySelector('button.kn');kn.onclick=function(){ak.className='aterk visa info';kn.classList.add('dold');f.querySelector('.sjalv').classList.remove('dold')};
  f.querySelectorAll('.sjalv button').forEach(function(b){b.onclick=function(){klar(f,b.dataset.ok==='1');f.querySelector('.sjalv').innerHTML='<i>'+(b.dataset.ok==='1'?'Bra jobbat!':'Läs exempelsvaret igen och se vad du kan lägga till.')+'</i>'}})}
});
document.querySelectorAll('.pi-omr button').forEach(function(b){b.onclick=function(){var on=!b.classList.contains('on');
 document.querySelectorAll('.pi-omr button').forEach(function(x){x.classList.remove('on')});if(on)b.classList.add('on');
 document.querySelectorAll('.pisa .enhet').forEach(function(e){e.classList.toggle('dold',on&&e.dataset.omr!==b.dataset.omr)})}});
})();
</script>"""

def _fmt(x):
    return str(x).replace('.', ',')

def sida():
    e = html.escape
    omr = {k: (n, f) for k, n, _, f in OMRADEN}
    ljus = lambda f: f + '22'
    ut = [CSS, '<div class="pisa">',
          '<p class="ingress">Här tränar du på uppgifter som liknar dem i PISA. Varje uppgift utgår från en situation i vardagen, med flera frågor. Svara direkt på sidan. Du ser om du har rätt och får en förklaring. Inget sparas.</p>',
          '<div class="pi-intro">' + ''.join(f'<div><span aria-hidden="true">{i}</span><h3>{e(t)}</h3><p>{e(p)}</p></div>' for i, t, p in INTRO) + '</div>',
          '<h2 class="grupp">Fyra matematiska områden</h2><p style="margin:0 0 12px;color:#3B4A5A">Klicka på ett område för att bara visa de uppgifterna. Klicka igen för att visa alla.</p><div class="pi-omr">'
          + ''.join(f'<button type="button" data-omr="{k}" style="--o:{f};--ol:{ljus(f)}"><b>{e(n)}</b><span>{e(b)}</span></button>' for k, n, b, f in OMRADEN) + '</div>',
          '<div class="pi-tips"><h3>Så gör du</h3><ul>' + ''.join(f'<li>{e(t)}</li>' for t in TIPS) + '</ul></div>',
          '<h2 class="grupp">Uppgifter</h2>']
    for en in ENHETER:
        n, f = omr[en['omr']]
        ut.append(f'<article class="enhet" id="en-{en["id"]}" data-id="{en["id"]}" data-omr="{en["omr"]}" data-titel="{e(en["titel"])}" style="--o:{f};--ol:{ljus(f)}">'
                  f'<div class="en-huvud"><h3>{e(en["titel"])}</h3><span class="chip">{e(n)}</span><span class="chip pi-niva">{e(en["niva"])}</span></div>'
                  f'<div class="en-kropp"><div class="situation"><p>{e(en["text"])}</p>{en["fig"]}</div><div>')
        for i, q in enumerate(en['fragor'], 1):
            t = q['typ']
            d = f'data-typ="{t}"'
            if t == 'val':
                d += f' data-ratt="{q["ratt"]}" data-forkl="{e(q["forkl"])}"'
                inner = '<div class="pi-alt">' + ''.join(f'<button type="button" data-i="{j}">{"ABCD"[j]}. {e(a)}</button>' for j, a in enumerate(q['alt'])) + '</div>'
            elif t == 'tal':
                d += f' data-svar="{q["svar"]}" data-tol="{q.get("tol", 0.01)}" data-svartxt="{e(q.get("svartxt") or _fmt(q["svar"]) + " " + q["enhet"])}" data-forkl="{e(q["forkl"])}"'
                inner = f'<div class="tal"><input type="text" inputmode="decimal" aria-label="Ditt svar"><span class="enh">{e(q["enhet"])}</span><button type="button" class="kn">Rätta</button></div>'
            else:
                inner = ('<textarea placeholder="Skriv ditt svar och hur du tänker …" aria-label="Ditt svar"></textarea><button type="button" class="kn">Visa exempel på svar</button>'
                         '<div class="sjalv dold"><span style="align-self:center;font-weight:600">Var ditt svar lika bra?</span><button type="button" class="kn" data-ok="1">Ja</button><button type="button" class="kn ljus" data-ok="0">Inte riktigt</button></div>')
            ak = f'<b>Exempel på svar</b>{e(q["exempel"])}<br><i>{e(q["krav"])}</i>' if t == 'resonera' else ''
            ut.append(f'<div class="pi-fr" {d}><span class="fnr">Fråga {i}{" · Förklara" if t == "resonera" else ""}</span><p class="q">{e(q["q"])}</p>{inner}<div class="aterk">{ak}</div></div>')
        ut.append('<div class="resultat" aria-live="polite"></div></div></div></article>')
    ut.append('<p style="color:#5F6368;font-size:14px">Uppgifterna är gjorda av Mattekompassen och är inte riktiga PISA-uppgifter.</p></div>' + JS)
    return ''.join(ut)

LANK = ('<a class="ovlank" href="pisa-traning.html" style="margin-top:14px"><span class="ovik" aria-hidden="true">🌍</span><span class="ovtxt"><b>PISA-träning</b>'
        'Vardagsnära uppgifter i flera steg, som i den internationella PISA-undersökningen. Rätta direkt på sidan.</span><span class="ovknapp">Till PISA-träning →</span></a>')
