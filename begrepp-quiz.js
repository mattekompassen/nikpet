// Begreppsquiz i klassrummet (begrepp-quiz.html). Frågor per område i QUIZ_DATA.
// Nyckel 'åk-kapitel-quiz', t.ex. '7-1-1' = åk 7, kapitel 1, Quiz 1. Visas som Nivå 1–3 (7/8/9) och område, utan kapitelnummer.
// Kapitlens namn kommer från lankar.json (QUIZ_KAP, skrivs in av begrepp_quiz.py).
// Rätt svar står alltid först i 'a'. Frågor och svar blandas med ett fast frö (quizets id),
// så att ett quiz alltid ser exakt likadant ut: eleverna kan tävla mot varandra (Nikola 2026-11-06).
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
  ] },
  '7-2-1': { fragor: [
    { q: 'Vilket är ett algebraiskt uttryck?', a: ['2<i>a</i> + 50', '25 + 50', '2<i>a</i> + 50 = 60', '75'], ord: 'Algebraiskt uttryck' },
    { typ: 'sf', q: '5<i>x</i> + 10<i>y</i> är ett algebraiskt uttryck.', svar: true, ord: 'Algebraiskt uttryck' },
    { q: 'Vad är värdet av uttrycket 3<i>x</i> + 2 om <i>x</i> = 4?', a: ['14', '9', '34', '12'], ord: 'Algebraiskt uttryck' },
    { q: 'Lisa är <i>x</i> år. Hennes bror är 3 år äldre.<br><small>Vilket uttryck visar broderns ålder?</small>', a: ['<i>x</i> + 3', '3<i>x</i>', '<i>x</i> – 3', '3'], ord: 'Algebraiskt uttryck' },
    { typ: 'ordning', q: 'Klicka på uttrycken från minst till störst värde när <i>a</i> = 2', a: ['<i>a</i> – 1', '<i>a</i> + 2', '3<i>a</i>', '<i>a</i> · <i>a</i> + 4'], ord: 'Variabel' },
    { q: 'I uttrycket 2<i>a</i> + 50, vad är <i>a</i>?', a: ['En variabel', 'En talföljd', 'En ekvation', 'Ett led'], ord: 'Variabel' },
    { typ: 'sf', q: 'En variabel kan bara ha ett enda värde.', svar: false, ord: 'Variabel' },
    { q: 'Vilka är variablerna i uttrycket 5<i>x</i> + 10<i>y</i>?', a: ['<i>x</i> och <i>y</i>', '5 och 10', '5<i>x</i> och 10<i>y</i>', 'Bara <i>x</i>'], ord: 'Variabel' },
    { q: '3, 7, 11, 15, …<br><small>Vilket tal kommer sedan?</small>', a: ['19', '18', '20', '30'], ord: 'Mönster / Talföljd' },
    { q: '2, 4, 8, 16, …<br><small>Hur förändras talföljden?</small>', a: ['Talet dubblas varje gång', 'Talet ökar med 2 varje gång', 'Talet ökar med 4 varje gång', 'Talet halveras varje gång'], ord: 'Mönster / Talföljd' },
    { typ: 'ordning', q: 'Klicka på talen så att talföljden minskar med 5 varje gång', a: ['30', '25', '20', '15'], ord: 'Mönster / Talföljd' },
    { typ: 'sf', q: 'I en talföljd förändras talen på ett bestämt sätt.', svar: true, ord: 'Mönster / Talföljd' },
    { q: 'Figur 1 har 4 stickor, figur 2 har 7 stickor och figur 3 har 10 stickor.<br><small>Hur många stickor har figur 4?</small>', a: ['13', '14', '12', '11'], ord: 'Mönster / Talföljd' },
    { q: 'En vinkel är dubbelt så stor som en annan. Vi kallar den mindre vinkeln för <i>y</i>.<br><small>Vad kallas det vi gör?</small>', a: ['Ett antagande', 'En prövning', 'En talföljd', 'Ett led'], ord: 'Antagande' },
    { q: 'Vi antar att den mindre vinkeln är <i>y</i>. Den större är dubbelt så stor.<br><small>Hur stor är den större vinkeln?</small>', a: ['2<i>y</i>', '<i>y</i> + 2', '<i>y</i>', '<i>y</i> – 2'], ord: 'Antagande' },
    { typ: 'sf', q: 'När man gör ett antagande kan man kalla ett obekant tal för <i>x</i>.', svar: true, ord: 'Antagande' }
  ] },
  '7-2-2': { fragor: [
    { q: 'Vilket är en ekvation?', a: ['<i>x</i> – 2 = 10', '<i>x</i> – 2', '12 – 2', '<i>x</i> + <i>y</i>'], ord: 'Ekvation' },
    { typ: 'sf', q: '3<i>x</i> + 5 är en ekvation.', svar: false, ord: 'Ekvation' },
    { q: 'Lös ekvationen <i>x</i> + 7 = 12.', a: ['<i>x</i> = 5', '<i>x</i> = 19', '<i>x</i> = 7', '<i>x</i> = 12'], ord: 'Ekvation' },
    { q: 'Lös ekvationen 4<i>x</i> = 20.', a: ['<i>x</i> = 5', '<i>x</i> = 16', '<i>x</i> = 24', '<i>x</i> = 80'], ord: 'Ekvation' },
    { typ: 'ordning', q: 'Klicka på ekvationerna från minst till störst lösning', a: ['<i>x</i> + 3 = 5', '2<i>x</i> = 8', '<i>x</i> – 1 = 5', '<i>x</i> / 2 = 5'], ord: 'Ekvation' },
    { q: '4<i>x</i> + 1 = 36 – <i>x</i><br><small>Vad kallas 4<i>x</i> + 1?</small>', a: ['Vänster led', 'Höger led', 'Obekant tal', 'Variabel'], ord: 'Vänster och höger led' },
    { q: '15 = 2<i>y</i> + 3<br><small>Vad står i höger led?</small>', a: ['2<i>y</i> + 3', '15', '<i>y</i>', '='], ord: 'Vänster och höger led' },
    { typ: 'sf', q: 'V.L. är en förkortning för vänster led.', svar: true, ord: 'Vänster och höger led' },
    { q: 'Är <i>x</i> = 4 en lösning till 2<i>x</i> = 8? Man sätter in 4 i stället för <i>x</i>.<br><small>Vad kallas det?</small>', a: ['Prövning', 'Antagande', 'Avrundning', 'Talföljd'], ord: 'Prövning' },
    { q: '3<i>x</i> – 2 = 10<br><small>Pröva! Vilket värde på <i>x</i> är lösningen?</small>', a: ['<i>x</i> = 4', '<i>x</i> = 3', '<i>x</i> = 5', '<i>x</i> = 12'], ord: 'Prövning' },
    { typ: 'sf', q: '<i>x</i> = 6 är en lösning till ekvationen <i>x</i> + 6 = 10.', svar: false, ord: 'Prövning' },
    { typ: 'ordning', q: 'Pröva om <i>x</i> = 3 är en lösning till 2<i>x</i> + 1 = 7.<br><small>Klicka på stegen i rätt ordning.</small>', a: ['Sätt in 3 i stället för <i>x</i>', 'Räkna: 2 · 3 + 1', 'Vänster led blir 7', 'V.L. = H.L., så <i>x</i> = 3 är en lösning'], ord: 'Prövning' },
    { q: 'Vilket tecken används i en likhet?', a: ['=', '&lt;', '&gt;', '≈'], ord: 'Likhet' },
    { typ: 'sf', q: 'En ekvation är ett exempel på en likhet.', svar: true, ord: 'Likhet' },
    { q: 'Vilken likhet stämmer?', a: ['3 · 4 = 2 · 6', '3 + 4 = 2 + 6', '10 – 4 = 4', '12 / 3 = 3'], ord: 'Likhet' },
    { q: '<i>x</i> – 2 = 10<br><small>Vad är <i>x</i>?</small>', a: ['Ett obekant tal', 'Ett led', 'En likhet', 'Ett närmevärde'], ord: 'Obekant tal' },
    { q: '52 = <i>y</i> – 48<br><small>Vilket är det obekanta talet?</small>', a: ['<i>y</i>', '52', '48', '–'], ord: 'Obekant tal' }
  ] },
  '7-3-1': { fragor: [
    {"q": "Vad betyder prefixet <b>milli</b>?", "a": ["En tusendel", "En hundradel", "Tusen", "En tiondel"], "ord": "Prefix"},
    {"typ": "ordning", "q": "Klicka på längderna från kortast till längst", "a": ["8 mm", "5 cm", "3 dm", "2 m"], "ord": "Längd"},
    {"q": "Vilken är grundenheten för massa?", "a": ["1 kilogram", "1 gram", "1 hektogram", "1 liter"], "ord": "Massa"},
    {"typ": "sf", "q": "1 kg = 1 000 g", "svar": true, "ord": "Massa"},
    {"q": "Vilken enhet används för volym?", "a": ["Liter", "Kilogram", "Meter", "Grader"], "ord": "Volym"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X3-image4.jpg\" alt=\"\"><small>Vad kallas det här?</small>", "a": ["En stråle", "En sträcka", "En diagonal", "En vinkel"], "ord": "Stråle"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X3-image5.jpg\" alt=\"\"><small>Vad kallas det här?</small>", "a": ["En sträcka", "En stråle", "En radie", "En vinkel"], "ord": "Sträcka"},
    {"typ": "sf", "q": "En linje kan vara böjd.", "svar": true, "ord": "Linje"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X3-image3.jpg\" alt=\"\"><small>Hur ligger linjerna?</small>", "a": ["De är parallella", "De korsar varandra", "De bildar en rät vinkel", "De är vertikalvinklar"], "ord": "Parallella linjer"},
    {"q": "Vad betyder skala 1 : 100?", "a": ["1 cm på bilden är 100 cm i verkligheten", "100 cm på bilden är 1 cm i verkligheten", "Bilden är 100 gånger större än verkligheten", "Bilden är 1 cm lång"], "ord": "Skala"},
    {"q": "En bild i skala 1 : 5 är …", "a": ["en förminskning", "en förstoring", "lika stor som verkligheten", "en vinkel"], "ord": "Förminskning"},
    {"typ": "sf", "q": "Skala 3 : 1 är en förstoring.", "svar": true, "ord": "Förstoring"},
    {"q": "En myra är 6 mm lång. Hur lång är den på en bild i skala 10 : 1?", "a": ["60 mm", "6 mm", "16 mm", "0,6 mm"], "ord": "Förstoring"},
    {"q": "Vad kallas punkten där vinkelbenen möts?", "a": ["Vinkelspetsen", "Medelpunkten", "Origo", "Diagonalen"], "ord": "Vinkel"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X3-image9.jpg\" alt=\"\"><small>Vilken sorts vinkel är det?</small>", "a": ["Spetsig vinkel", "Trubbig vinkel", "Rät vinkel", "Sidovinkel"], "ord": "Spetsig vinkel"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X3-image10.jpg\" alt=\"\"><small>Vilken sorts vinkel är det?</small>", "a": ["Trubbig vinkel", "Spetsig vinkel", "Rät vinkel", "Vertikalvinkel"], "ord": "Trubbig vinkel"},
    {"q": "Hur många grader är en rät vinkel?", "a": ["90°", "180°", "45°", "360°"], "ord": "Rät vinkel"},
    {"typ": "ordning", "q": "Klicka på vinklarna från minst till störst", "a": ["En spetsig vinkel", "En rät vinkel", "En trubbig vinkel", "Två sidovinklar tillsammans"], "ord": "Vinkel"},
    {"q": "En sidovinkel är 70°. Hur stor är den andra sidovinkeln?", "a": ["110°", "70°", "20°", "290°"], "ord": "Sidovinklar"},
    {"typ": "sf", "q": "Vertikalvinklar är lika stora.", "svar": true, "ord": "Vertikalvinklar"}
  ] },
  '7-3-2': { fragor: [
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X3-image19.jpg\" alt=\"\"><small>Vad heter figuren?</small>", "a": ["Triangel", "Kvadrat", "Romb", "Parallellogram"], "ord": "Triangel"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X3-image20.jpg\" alt=\"\"><small>Vad heter figuren?</small>", "a": ["Parallellogram", "Rektangel", "Kvadrat", "Triangel"], "ord": "Parallellogram"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X3-image21.jpg\" alt=\"\"><small>Alla sidor är lika långa. Vad heter figuren?</small>", "a": ["Romb", "Kvadrat", "Rektangel", "Triangel"], "ord": "Romb"},
    {"q": "Vilken figur har fyra lika långa sidor och fyra räta vinklar?", "a": ["Kvadrat", "Rektangel", "Parallellogram", "Triangel"], "ord": "Kvadrat"},
    {"typ": "sf", "q": "En kvadrat är också en rektangel.", "svar": true, "ord": "Rektangel"},
    {"typ": "sf", "q": "Alla romber är kvadrater.", "svar": false, "ord": "Romb"},
    {"q": "Vad kallas en polygon med fem hörn?", "a": ["Femhörning (pentagon)", "Fyrhörning (tetragon)", "Sexhörning (hexagon)", "Triangel"], "ord": "Polygon"},
    {"typ": "ordning", "q": "Klicka på figurerna från minst till flest hörn", "a": ["Triangel", "Kvadrat", "Femhörning", "Sexhörning"], "ord": "Polygon"},
    {"typ": "sf", "q": "En cirkel är en polygon.", "svar": false, "ord": "Polygon"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X3-image14.jpg\" alt=\"\"><small>Vad kallas de röda sträckorna?</small>", "a": ["Diagonaler", "Radier", "Diametrar", "Sidor"], "ord": "Diagonal"},
    {"q": "Hur många diagonaler har en rektangel?", "a": ["2", "4", "1", "0"], "ord": "Diagonal"},
    {"q": "Vad kallas punkten i mitten av en cirkel?", "a": ["Medelpunkt", "Origo", "Vinkelspets", "Hörn"], "ord": "Cirkel"},
    {"q": "En sträcka från medelpunkten till en punkt på cirkeln kallas …", "a": ["radie", "diameter", "diagonal", "omkrets"], "ord": "Radie"},
    {"q": "Radien i en cirkel är 5 cm. Hur lång är diametern?", "a": ["10 cm", "5 cm", "2,5 cm", "25 cm"], "ord": "Diameter"},
    {"q": "En rektangel har sidorna 4 cm och 3 cm. Hur stor är omkretsen?", "a": ["14 cm", "12 cm", "7 cm", "24 cm"], "ord": "Omkrets"},
    {"q": "En kvadrat har sidan 5 cm. Hur stor är omkretsen?", "a": ["20 cm", "25 cm", "10 cm", "15 cm"], "ord": "Omkrets"},
    {"typ": "sf", "q": "Omkretsen berättar hur stort området är.", "svar": false, "ord": "Omkrets"},
    {"q": "En rektangel har sidorna 4 cm och 3 cm. Hur stor är arean?", "a": ["12 cm²", "14 cm²", "7 cm²", "24 cm²"], "ord": "Area"},
    {"q": "Vilken enhet passar för area?", "a": ["cm²", "cm", "cm³", "kg"], "ord": "Area"},
    {"typ": "ordning", "q": "Klicka på areorna från minst till störst", "a": ["50 cm²", "1 dm²", "2 dm²", "1 m²"], "ord": "Area"}
  ] },
  '7-4-1': { fragor: [
    {"q": "Vad kallas två tallinjer som korsar varandra och används för att ange var en punkt ligger?", "a": ["Ett koordinatsystem", "En graf", "En talföljd", "Ett cirkeldiagram"], "ord": "Koordinatsystem / Koordinater"},
    {"q": "Punkten (3, 5)<br><small>Vilket tal är <i>x</i>-koordinaten?</small>", "a": ["3", "5", "8", "15"], "ord": "Koordinatsystem / Koordinater"},
    {"q": "Vilken punkt ligger 2 steg till höger och 4 steg upp från origo?", "a": ["(2, 4)", "(4, 2)", "(–2, 4)", "(2, –4)"], "ord": "Koordinatsystem / Koordinater"},
    {"typ": "ordning", "q": "Klicka på punkterna från vänster till höger i koordinatsystemet", "a": ["(–3, 1)", "(–1, 4)", "(0, –2)", "(2, 0)"], "ord": "Koordinatsystem / Koordinater"},
    {"typ": "sf", "q": "<i>x</i>-axeln är vågrät.", "svar": true, "ord": "x-axel och y-axel"},
    {"q": "Vilken axel är lodrät?", "a": ["<i>y</i>-axeln", "<i>x</i>-axeln", "Båda axlarna", "Ingen av axlarna"], "ord": "x-axel och y-axel"},
    {"q": "Var ligger punkten (0, 3)?", "a": ["På <i>y</i>-axeln", "På <i>x</i>-axeln", "I origo", "Under <i>x</i>-axeln"], "ord": "x-axel och y-axel"},
    {"q": "Vilka koordinater har origo?", "a": ["(0, 0)", "(1, 1)", "(0, 1)", "(1, 0)"], "ord": "Origo"},
    {"typ": "sf", "q": "Origo är punkten där axlarna korsar varandra.", "svar": true, "ord": "Origo"},
    {"q": "Vad visar en graf?", "a": ["Ett samband mellan två storheter", "Hur många hörn en figur har", "En enda punkt", "Ett bråk i enklaste form"], "ord": "Graf"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X4-image6.jpg\" alt=\"\"><small>Grafen är en rät linje genom origo. Vad visar den?</small>", "a": ["Ett proportionellt samband", "Ett samband som inte är proportionellt", "En talföljd som minskar", "Ett cirkeldiagram"], "ord": "Proportionell"},
    {"typ": "sf", "q": "1 kg kostar 20 kr, 2 kg kostar 40 kr och 3 kg kostar 60 kr. Priset är proportionellt mot vikten.", "svar": true, "ord": "Proportionell"},
    {"q": "3 kg äpplen kostar 60 kr. Priset är proportionellt mot vikten. Vad kostar 5 kg?", "a": ["100 kr", "80 kr", "120 kr", "65 kr"], "ord": "Proportionell"},
    {"q": "Hur räknar man ut medelhastigheten?", "a": ["Sträckan dividerat med tiden", "Tiden dividerat med sträckan", "Sträckan gånger tiden", "Sträckan plus tiden"], "ord": "Medelhastighet"},
    {"q": "En bil kör 120 km på 2 timmar. Vad är medelhastigheten?", "a": ["60 km/h", "120 km/h", "240 km/h", "30 km/h"], "ord": "Medelhastighet"},
    {"typ": "ordning", "q": "Klicka på medelhastigheterna från lägst till högst", "a": ["10 km på 2 h", "30 km på 2 h", "40 km på 1 h", "100 km på 2 h"], "ord": "Medelhastighet"},
    {"typ": "sf", "q": "Medelhastigheten är alltid den högsta hastigheten under resan.", "svar": false, "ord": "Medelhastighet"}
  ] },
  '7-4-2': { fragor: [
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X4-image9.jpg\" alt=\"\"><small>Hur stor andel av frukterna är äpplen?</small>", "a": ["<span class=\"fr\"><i>4</i><i>10</i></span>", "<span class=\"fr\"><i>6</i><i>10</i></span>", "<span class=\"fr\"><i>4</i><i>6</i></span>", "<span class=\"fr\"><i>10</i><i>4</i></span>"], "ord": "Andel"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X4-image9.jpg\" alt=\"\"><small>Det är 4 äpplen och 6 apelsiner. Vad är det hela?</small>", "a": ["10 frukter", "4 äpplen", "6 apelsiner", "2 frukter"], "ord": "Det hela"},
    {"typ": "sf", "q": "En del är alltid större än det hela.", "svar": false, "ord": "Del"},
    {"q": "I en klass med 25 elever är 5 vänsterhänta. Hur stor andel är vänsterhänta?", "a": ["20 %", "5 %", "25 %", "50 %"], "ord": "Andel"},
    {"typ": "ordning", "q": "Klicka på andelarna från minst till störst", "a": ["1 av 10", "1 av 4", "1 av 2", "3 av 4"], "ord": "Andel"},
    {"q": "När man förkortar ett bråk …", "a": ["dividerar man täljare och nämnare med samma tal", "multiplicerar man täljare och nämnare med samma tal", "adderar man samma tal till täljare och nämnare", "dividerar man bara täljaren"], "ord": "Förkortning"},
    {"q": "Förkorta <span class=\"fr\"><i>6</i><i>8</i></span> så långt det går.", "a": ["<span class=\"fr\"><i>3</i><i>4</i></span>", "<span class=\"fr\"><i>2</i><i>3</i></span>", "<span class=\"fr\"><i>12</i><i>16</i></span>", "<span class=\"fr\"><i>1</i><i>2</i></span>"], "ord": "Förkortning"},
    {"q": "Förläng <span class=\"fr\"><i>2</i><i>3</i></span> med 4.", "a": ["<span class=\"fr\"><i>8</i><i>12</i></span>", "<span class=\"fr\"><i>6</i><i>7</i></span>", "<span class=\"fr\"><i>8</i><i>3</i></span>", "<span class=\"fr\"><i>2</i><i>12</i></span>"], "ord": "Förlängning"},
    {"typ": "sf", "q": "Ett bråk ändrar värde när man förlänger det.", "svar": false, "ord": "Förlängning"},
    {"q": "Vilket bråk är lika mycket som <span class=\"fr\"><i>1</i><i>3</i></span>?", "a": ["<span class=\"fr\"><i>2</i><i>6</i></span>", "<span class=\"fr\"><i>3</i><i>1</i></span>", "<span class=\"fr\"><i>1</i><i>6</i></span>", "<span class=\"fr\"><i>2</i><i>3</i></span>"], "ord": "Förlängning"},
    {"q": "Vilket bråk är skrivet i enklaste form?", "a": ["<span class=\"fr\"><i>5</i><i>7</i></span>", "<span class=\"fr\"><i>4</i><i>6</i></span>", "<span class=\"fr\"><i>10</i><i>15</i></span>", "<span class=\"fr\"><i>6</i><i>9</i></span>"], "ord": "Enklaste form"},
    {"q": "Skriv <span class=\"fr\"><i>12</i><i>18</i></span> i enklaste form.", "a": ["<span class=\"fr\"><i>2</i><i>3</i></span>", "<span class=\"fr\"><i>6</i><i>9</i></span>", "<span class=\"fr\"><i>4</i><i>6</i></span>", "<span class=\"fr\"><i>3</i><i>2</i></span>"], "ord": "Enklaste form"},
    {"q": "Vad betyder procent?", "a": ["Hundradel", "Tiondel", "Tusendel", "Hel"], "ord": "Procentform"},
    {"q": "Hur skrivs 0,25 i procentform?", "a": ["25 %", "2,5 %", "0,25 %", "250 %"], "ord": "Procentform"},
    {"typ": "sf", "q": "50 % = <span class=\"fr\"><i>1</i><i>2</i></span> = 0,5", "svar": true, "ord": "Procentform"},
    {"q": "Hur skrivs <span class=\"fr\"><i>3</i><i>4</i></span> i decimalform?", "a": ["0,75", "0,34", "3,4", "0,43"], "ord": "Decimalform"},
    {"typ": "ordning", "q": "Klicka på talen från minst till störst", "a": ["<span class=\"fr\"><i>1</i><i>5</i></span>", "0,3", "40 %", "<span class=\"fr\"><i>1</i><i>2</i></span>"], "ord": "Procentform"}
  ] },
  '7-5-1': { fragor: [
    {"q": "Hur många möjliga utfall finns när man kastar en vanlig tärning?", "a": ["6", "1", "3", "12"], "ord": "Utfall"},
    {"q": "Vilka är utfallen när man singlar slant?", "a": ["Krona och klave", "Bara krona", "1, 2, 3, 4, 5 och 6", "Röd och gul"], "ord": "Utfall"},
    {"q": "Vilket är ett slumpmässigt försök?", "a": ["Att kasta en tärning", "Att räkna 2 + 2", "Att mäta en sträcka", "Att läsa av en klocka"], "ord": "Slumpmässigt försök"},
    {"q": "Vad är sannolikheten att få en sexa med en vanlig tärning?", "a": ["<span class=\"fr\"><i>1</i><i>6</i></span>", "<span class=\"fr\"><i>1</i><i>3</i></span>", "<span class=\"fr\"><i>6</i><i>1</i></span>", "<span class=\"fr\"><i>1</i><i>2</i></span>"], "ord": "Sannolikhet"},
    {"q": "En påse har 3 röda kulor och 1 gul kula. Vad är sannolikheten att ta en röd kula?", "a": ["<span class=\"fr\"><i>3</i><i>4</i></span>", "<span class=\"fr\"><i>1</i><i>4</i></span>", "<span class=\"fr\"><i>3</i><i>1</i></span>", "<span class=\"fr\"><i>1</i><i>3</i></span>"], "ord": "Sannolikhet"},
    {"typ": "sf", "q": "En sannolikhet kan vara större än 1.", "svar": false, "ord": "Sannolikhet"},
    {"typ": "ordning", "q": "Klicka på händelserna från minst till mest sannolik", "a": ["Få en sjua med en tärning", "Få en sexa med en tärning", "Få krona när man singlar slant", "Få ett tal från 1 till 6 med en tärning"], "ord": "Sannolikhet"},
    {"typ": "sf", "q": "När man singlar slant är sannolikhetsfördelningen likformig.", "svar": true, "ord": "Likformig sannolikhetsfördelning"},
    {"q": "I vilket försök är sannolikhetsfördelningen olikformig?", "a": ["Ta en kula ur en påse med 3 röda och 1 gul", "Kasta en vanlig tärning", "Singla slant", "Dra ett kort bland 4 olika kort"], "ord": "Olikformig sannolikhetsfördelning"},
    {"q": "Vad är medelvärdet av 4, 6 och 8?", "a": ["6", "18", "4", "8"], "ord": "Medelvärde"},
    {"typ": "ordning", "q": "Räkna ut medelvärdet av 3, 5 och 10.<br><small>Klicka på stegen i rätt ordning.</small>", "a": ["Addera: 3 + 5 + 10", "Summan är 18", "Dividera med antalet tal: 18 / 3", "Medelvärdet är 6"], "ord": "Medelvärde"},
    {"q": "Vad är medianen av 3, 9, 5, 1 och 7?", "a": ["5", "9", "1", "25"], "ord": "Median"},
    {"q": "Vad är medianen av 2, 4, 6 och 8?", "a": ["5", "4", "6", "20"], "ord": "Median"},
    {"typ": "sf", "q": "Medianen är det vanligaste värdet.", "svar": false, "ord": "Median"},
    {"q": "Vad är typvärdet av 2, 5, 5, 7 och 9?", "a": ["5", "2", "7", "9"], "ord": "Typvärde"},
    {"q": "Vilket lägesmått berättar vilket värde som är vanligast?", "a": ["Typvärde", "Medelvärde", "Median", "Relativ frekvens"], "ord": "Typvärde"}
  ] },
  '7-5-2': { fragor: [
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X5-image16.jpg\" alt=\"\"><small>Vad heter diagrammet?</small>", "a": ["Stolpdiagram", "Stapeldiagram", "Linjediagram", "Cirkeldiagram"], "ord": "Stolpdiagram"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X5-image17.jpg\" alt=\"\"><small>Vad heter diagrammet?</small>", "a": ["Stapeldiagram", "Stolpdiagram", "Linjediagram", "Cirkeldiagram"], "ord": "Stapeldiagram"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X5-image18.jpg\" alt=\"\"><small>Vad heter diagrammet?</small>", "a": ["Linjediagram", "Stapeldiagram", "Cirkeldiagram", "Stolpdiagram"], "ord": "Linjediagram"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/X5-image19.jpg\" alt=\"\"><small>Vad heter diagrammet?</small>", "a": ["Cirkeldiagram", "Linjediagram", "Stapeldiagram", "Stolpdiagram"], "ord": "Cirkeldiagram"},
    {"q": "Vilket diagram passar bäst för att visa hur temperaturen förändras under en vecka?", "a": ["Linjediagram", "Cirkeldiagram", "Stapeldiagram", "Stolpdiagram"], "ord": "Linjediagram"},
    {"q": "Vilket diagram passar bäst för att jämföra antal sålda bilar av olika bilmärken?", "a": ["Stapeldiagram", "Linjediagram", "Stolpdiagram", "Inget diagram"], "ord": "Stapeldiagram"},
    {"q": "Vilket diagram används ofta när alternativen är tal, till exempel antal rätt på ett prov?", "a": ["Stolpdiagram", "Stapeldiagram", "Cirkeldiagram", "Linjediagram"], "ord": "Stolpdiagram"},
    {"typ": "sf", "q": "Ett cirkeldiagram visar hur det hela delas upp i olika delar.", "svar": true, "ord": "Cirkeldiagram"},
    {"q": "Hur många grader är en hel cirkel?", "a": ["360°", "180°", "100°", "90°"], "ord": "Medelpunktsvinkel"},
    {"q": "Hur stor är medelpunktsvinkeln för en fjärdedel av en cirkel?", "a": ["90°", "25°", "45°", "180°"], "ord": "Medelpunktsvinkel"},
    {"q": "En del i ett cirkeldiagram är 50 %. Hur stor är medelpunktsvinkeln?", "a": ["180°", "50°", "90°", "360°"], "ord": "Medelpunktsvinkel"},
    {"q": "Åldrar: 16, 16, 22, 30, 30, 30<br><small>Vad är frekvensen för 30?</small>", "a": ["3", "30", "1", "6"], "ord": "Frekvens"},
    {"typ": "sf", "q": "Frekvensen berättar hur många gånger ett värde förekommer.", "svar": true, "ord": "Frekvens"},
    {"q": "Av 20 elever svarade 5 att katt är deras favoritdjur. Vad är den relativa frekvensen för katt?", "a": ["25 %", "5 %", "20 %", "15 %"], "ord": "Relativ frekvens"},
    {"typ": "sf", "q": "Summan av alla relativa frekvenser är 100 %.", "svar": true, "ord": "Relativ frekvens"},
    {"typ": "ordning", "q": "Klicka på de relativa frekvenserna från minst till störst", "a": ["2 av 20", "1 av 4", "40 %", "0,6"], "ord": "Relativ frekvens"},
    {"q": "En klass undersöker elevernas favoritfrukt. Vad kallas favoritfrukt i undersökningen?", "a": ["En variabel", "En frekvens", "En median", "Ett lägesmått"], "ord": "Variabel"}
  ] },
  '8-1-1': { fragor: [
    {"q": "Vilket tal är skrivet i bråkform?", "a": ["<span class=\"fr\"><i>7</i><i>9</i></span>", "0,7", "7", "1<span class=\"fr\"><i>2</i><i>9</i></span>"], "ord": "Bråkform"},
    {"q": "Skriv <span class=\"fr\"><i>7</i><i>4</i></span> i blandad form.", "a": ["1<span class=\"fr\"><i>3</i><i>4</i></span>", "1<span class=\"fr\"><i>4</i><i>7</i></span>", "7<span class=\"fr\"><i>1</i><i>4</i></span>", "1,74"], "ord": "Blandad form"},
    {"q": "Skriv 2<span class=\"fr\"><i>1</i><i>3</i></span> i bråkform.", "a": ["<span class=\"fr\"><i>7</i><i>3</i></span>", "<span class=\"fr\"><i>5</i><i>3</i></span>", "<span class=\"fr\"><i>6</i><i>3</i></span>", "<span class=\"fr\"><i>3</i><i>7</i></span>"], "ord": "Blandad form"},
    {"typ": "sf", "q": "2<span class=\"fr\"><i>1</i><i>2</i></span> är skrivet i blandad form.", "svar": true, "ord": "Blandad form"},
    {"q": "Hur skrivs <span class=\"fr\"><i>3</i><i>8</i></span> i decimalform?", "a": ["0,375", "0,38", "3,8", "0,83"], "ord": "Decimalform"},
    {"typ": "ordning", "q": "Klicka på talen från minst till störst", "a": ["0,3", "<span class=\"fr\"><i>1</i><i>3</i></span>", "0,35", "<span class=\"fr\"><i>2</i><i>5</i></span>"], "ord": "Decimalform"},
    {"q": "När man förlänger ett bråk …", "a": ["multiplicerar man täljare och nämnare med samma tal", "dividerar man täljare och nämnare med samma tal", "adderar man samma tal till täljare och nämnare", "multiplicerar man bara täljaren"], "ord": "Förlängning"},
    {"q": "Förläng <span class=\"fr\"><i>3</i><i>5</i></span> så att nämnaren blir 20.", "a": ["<span class=\"fr\"><i>12</i><i>20</i></span>", "<span class=\"fr\"><i>3</i><i>20</i></span>", "<span class=\"fr\"><i>15</i><i>20</i></span>", "<span class=\"fr\"><i>8</i><i>20</i></span>"], "ord": "Förlängning"},
    {"typ": "sf", "q": "<span class=\"fr\"><i>2</i><i>3</i></span> och <span class=\"fr\"><i>8</i><i>12</i></span> har samma värde.", "svar": true, "ord": "Förlängning"},
    {"q": "Förkorta <span class=\"fr\"><i>15</i><i>25</i></span> så långt det går.", "a": ["<span class=\"fr\"><i>3</i><i>5</i></span>", "<span class=\"fr\"><i>5</i><i>15</i></span>", "<span class=\"fr\"><i>1</i><i>5</i></span>", "<span class=\"fr\"><i>3</i><i>4</i></span>"], "ord": "Förkortning"},
    {"typ": "sf", "q": "När man förkortar ett bråk blir värdet mindre.", "svar": false, "ord": "Förkortning"},
    {"q": "Vilket bråk är skrivet i enklaste form?", "a": ["<span class=\"fr\"><i>7</i><i>12</i></span>", "<span class=\"fr\"><i>6</i><i>12</i></span>", "<span class=\"fr\"><i>9</i><i>12</i></span>", "<span class=\"fr\"><i>10</i><i>12</i></span>"], "ord": "Enklaste form"},
    {"q": "Vilken är minsta gemensamma nämnaren (MGN) till <span class=\"fr\"><i>1</i><i>3</i></span> och <span class=\"fr\"><i>1</i><i>4</i></span>?", "a": ["12", "7", "24", "4"], "ord": "Minsta gemensam nämnare (MGN)"},
    {"q": "Vilken är MGN till <span class=\"fr\"><i>1</i><i>6</i></span> och <span class=\"fr\"><i>1</i><i>4</i></span>?", "a": ["12", "24", "10", "6"], "ord": "Minsta gemensam nämnare (MGN)"},
    {"q": "<span class=\"fr\"><i>1</i><i>3</i></span> + <span class=\"fr\"><i>1</i><i>4</i></span> = ?", "a": ["<span class=\"fr\"><i>7</i><i>12</i></span>", "<span class=\"fr\"><i>2</i><i>7</i></span>", "<span class=\"fr\"><i>2</i><i>12</i></span>", "<span class=\"fr\"><i>1</i><i>7</i></span>"], "ord": "Minsta gemensam nämnare (MGN)"},
    {"typ": "ordning", "q": "Räkna ut <span class=\"fr\"><i>1</i><i>2</i></span> + <span class=\"fr\"><i>1</i><i>3</i></span>.<br><small>Klicka på stegen i rätt ordning.</small>", "a": ["Hitta MGN: 6", "Förläng: <span class=\"fr\"><i>3</i><i>6</i></span> + <span class=\"fr\"><i>2</i><i>6</i></span>", "Addera täljarna: 3 + 2", "Svaret är <span class=\"fr\"><i>5</i><i>6</i></span>"], "ord": "Minsta gemensam nämnare (MGN)"}
  ] },
  '8-1-2': { fragor: [
    {"q": "Vad betyder 2<sup>3</sup>?", "a": ["2 · 2 · 2", "2 · 3", "3 · 3", "2 + 2 + 2"], "ord": "Potens"},
    {"q": "Vad är värdet av 3<sup>2</sup>?", "a": ["9", "6", "5", "8"], "ord": "Potens"},
    {"q": "Vad är värdet av 2<sup>5</sup>?", "a": ["32", "10", "25", "16"], "ord": "Potens"},
    {"typ": "sf", "q": "4<sup>2</sup> = 8", "svar": false, "ord": "Potens"},
    {"typ": "ordning", "q": "Klicka på potenserna från minst till störst värde", "a": ["2<sup>3</sup>", "3<sup>2</sup>", "2<sup>4</sup>", "5<sup>2</sup>"], "ord": "Potens"},
    {"q": "I potensen 5<sup>3</sup>, vilket tal är basen?", "a": ["5", "3", "15", "125"], "ord": "Bas"},
    {"q": "I potensen 5<sup>3</sup>, vilket tal är exponenten?", "a": ["3", "5", "15", "125"], "ord": "Exponent"},
    {"typ": "sf", "q": "Exponenten talar om hur många gånger basen multipliceras med sig själv.", "svar": true, "ord": "Exponent"},
    {"q": "Hur skrivs 10 · 10 · 10 · 10 som tiopotens?", "a": ["10<sup>4</sup>", "10<sup>3</sup>", "10 · 4", "4<sup>10</sup>"], "ord": "Tiopotens"},
    {"q": "Vad är 10<sup>6</sup>?", "a": ["1 000 000", "100 000", "60", "10 000 000"], "ord": "Tiopotens"},
    {"q": "Hur många nollor har 10<sup>5</sup> skrivet som vanligt tal?", "a": ["5", "4", "6", "10"], "ord": "Tiopotens"},
    {"q": "Hur skrivs 3 000 000 i grundpotensform?", "a": ["3 · 10<sup>6</sup>", "3 · 10<sup>5</sup>", "30 · 10<sup>5</sup>", "3<sup>6</sup>"], "ord": "Grundpotensform"},
    {"q": "Vilket tal är skrivet i grundpotensform?", "a": ["4,5 · 10<sup>3</sup>", "45 · 10<sup>2</sup>", "0,45 · 10<sup>4</sup>", "4,5 + 10<sup>3</sup>"], "ord": "Grundpotensform"},
    {"typ": "sf", "q": "I grundpotensform ska talet framför tiopotensen vara mellan 1 och 10.", "svar": true, "ord": "Grundpotensform"},
    {"q": "Skriv 2,7 · 10<sup>4</sup> som vanligt tal.", "a": ["27 000", "2 700", "270 000", "2,7000"], "ord": "Grundpotensform"},
    {"typ": "ordning", "q": "Klicka på talen från minst till störst", "a": ["9 · 10<sup>2</sup>", "1,5 · 10<sup>3</sup>", "4 · 10<sup>3</sup>", "2 · 10<sup>4</sup>"], "ord": "Grundpotensform"}
  ] },
  '8-2-1': { fragor: [
    {"q": "I en klass med 20 elever har 5 glasögon. Hur stor andel har glasögon?", "a": ["25 %", "5 %", "20 %", "15 %"], "ord": "Andel"},
    {"q": "Det är 12 pojkar och 18 flickor i en klubb. Vad är det hela?", "a": ["30 personer", "12 pojkar", "18 flickor", "6 personer"], "ord": "Det hela"},
    {"q": "Det är 12 pojkar och 18 flickor i en klubb. Hur stor andel är pojkar?", "a": ["40 %", "12 %", "60 %", "30 %"], "ord": "Andel"},
    {"typ": "sf", "q": "Delen är alltid mindre än eller lika med det hela.", "svar": true, "ord": "Del"},
    {"typ": "ordning", "q": "Klicka på andelarna från minst till störst", "a": ["3 av 50", "1 av 10", "4 av 25", "1 av 5"], "ord": "Andel"},
    {"typ": "sf", "q": "<span class=\"fr\"><i>1</i><i>4</i></span> = 0,25 = 25 %", "svar": true, "ord": "Bråkform"},
    {"q": "Hur skrivs 30 % i decimalform?", "a": ["0,3", "3,0", "0,03", "30,0"], "ord": "Decimalform"},
    {"q": "Hur skrivs <span class=\"fr\"><i>7</i><i>20</i></span> i decimalform?", "a": ["0,35", "0,72", "7,2", "0,7"], "ord": "Decimalform"},
    {"q": "Hur skrivs 0,07 i procentform?", "a": ["7 %", "70 %", "0,7 %", "0,07 %"], "ord": "Procentform"},
    {"q": "Hur skrivs <span class=\"fr\"><i>3</i><i>5</i></span> i procentform?", "a": ["60 %", "35 %", "3,5 %", "53 %"], "ord": "Procentform"},
    {"typ": "sf", "q": "Procent betyder tiondel.", "svar": false, "ord": "Procentform"},
    {"q": "Vad är 20 % av 150 kr?", "a": ["30 kr", "20 kr", "15 kr", "130 kr"], "ord": "Procentform"},
    {"q": "Vad är 5 % av 400?", "a": ["20", "5", "80", "200"], "ord": "Procentform"},
    {"q": "En jacka kostar 800 kr och sänks med 25 %. Hur mycket sänks priset?", "a": ["200 kr", "25 kr", "600 kr", "250 kr"], "ord": "Procentform"},
    {"typ": "ordning", "q": "Klicka på talen från minst till störst", "a": ["0,15", "<span class=\"fr\"><i>1</i><i>5</i></span>", "25 %", "<span class=\"fr\"><i>3</i><i>10</i></span>"], "ord": "Procentform"}
  ] },
  '8-2-2': { fragor: [
    {"q": "Avrunda 3,46 till en decimal.", "a": ["3,5", "3,4", "3,46", "4"], "ord": "Avrundning"},
    {"q": "Avrunda 2 748 till hundratal.", "a": ["2 700", "2 800", "2 750", "3 000"], "ord": "Avrundning"},
    {"q": "Ett pris är 98,60 kr. Avrunda till hela kronor.", "a": ["99 kr", "98 kr", "100 kr", "98,6 kr"], "ord": "Avrundning"},
    {"typ": "sf", "q": "7,25 avrundat till ett heltal blir 8.", "svar": false, "ord": "Avrundning"},
    {"q": "Vad kallas pengarna som man sätter in på ett sparkonto eller lånar?", "a": ["Kapital", "Ränta", "Räntesats", "Procentenhet"], "ord": "Kapital"},
    {"q": "Vad kallas det man betalar för att få låna pengar?", "a": ["Ränta", "Kapital", "Räntesats", "Avrundning"], "ord": "Ränta"},
    {"q": "Vad kallas den andel av kapitalet som är räntan på ett år?", "a": ["Räntesats", "Ränta", "Kapital", "Procentenhet"], "ord": "Räntesats"},
    {"typ": "sf", "q": "Räntesatsen anges oftast i procentform.", "svar": true, "ord": "Räntesats"},
    {"q": "Du sätter in 2 000 kr. Räntesatsen är 3 %. Hur stor är räntan efter ett år?", "a": ["60 kr", "3 kr", "600 kr", "2 060 kr"], "ord": "Ränta"},
    {"q": "Du lånar 10 000 kr med räntesatsen 5 %. Hur mycket ränta betalar du på ett år?", "a": ["500 kr", "50 kr", "5 000 kr", "10 500 kr"], "ord": "Ränta"},
    {"typ": "ordning", "q": "Klicka på räntorna för ett år från minst till störst", "a": ["1 % av 1 000 kr", "2 % av 1 000 kr", "5 % av 1 000 kr", "4 % av 2 000 kr"], "ord": "Ränta"},
    {"typ": "ordning", "q": "Räkna ut räntan på 4 000 kr med räntesatsen 2 % för ett år.<br><small>Klicka på stegen i rätt ordning.</small>", "a": ["Kapitalet är 4 000 kr", "2 % = 0,02", "4 000 · 0,02", "Räntan är 80 kr"], "ord": "Ränta"},
    {"q": "Räntan höjs från 2 % till 5 %. Hur mycket har den höjts?", "a": ["3 procentenheter", "3 %", "150 procentenheter", "7 procentenheter"], "ord": "Procentenhet"},
    {"q": "Ett parti fick 25 % av rösterna förra året och 20 % i år. Vad har hänt?", "a": ["Det har minskat med 5 procentenheter", "Det har ökat med 5 procentenheter", "Det har minskat med 20 procentenheter", "Det är oförändrat"], "ord": "Procentenhet"},
    {"typ": "sf", "q": "Procentenheter används för att jämföra två andelar som anges i procent.", "svar": true, "ord": "Procentenhet"}
  ] },
  '8-3-1': { fragor: [
    {"q": "En sträcka tvärs över en cirkel genom medelpunkten kallas …", "a": ["diameter", "radie", "omkrets", "diagonal"], "ord": "Diameter"},
    {"q": "Diametern i en cirkel är 12 cm. Hur lång är radien?", "a": ["6 cm", "24 cm", "12 cm", "3 cm"], "ord": "Radie"},
    {"typ": "sf", "q": "Alla punkter på en cirkel ligger lika långt från medelpunkten.", "svar": true, "ord": "Cirkel / Medelpunkt"},
    {"q": "Hur beräknar man omkretsen av en cirkel?", "a": ["π · diametern", "π · radien", "radien · radien", "2 · diametern"], "ord": "Omkrets"},
    {"q": "En cirkel har diametern 10 cm. Ungefär hur stor är omkretsen? (π ≈ 3,14)", "a": ["31,4 cm", "314 cm", "15,7 cm", "78,5 cm"], "ord": "Omkrets"},
    {"q": "Hur beräknar man arean av en cirkel?", "a": ["π · <i>r</i> · <i>r</i>", "π · <i>d</i>", "2 · π · <i>r</i>", "<i>r</i> · <i>r</i>"], "ord": "Area"},
    {"q": "Hur beräknar man arean av en triangel?", "a": ["(basen · höjden) / 2", "basen · höjden", "basen + höjden", "(basen + höjden) / 2"], "ord": "Area"},
    {"q": "En triangel har basen 8 cm och höjden 5 cm. Hur stor är arean?", "a": ["20 cm²", "40 cm²", "13 cm²", "26 cm²"], "ord": "Triangel"},
    {"q": "En parallellogram har basen 6 cm och höjden 4 cm. Hur stor är arean?", "a": ["24 cm²", "12 cm²", "20 cm²", "10 cm²"], "ord": "Parallellogram"},
    {"typ": "ordning", "q": "Klicka på areorna från minst till störst", "a": ["Kvadrat med sidan 3 cm", "Rektangel med sidorna 2 cm och 5 cm", "Triangel med basen 6 cm och höjden 4 cm", "Kvadrat med sidan 4 cm"], "ord": "Area"},
    {"typ": "sf", "q": "En rektangel är en parallellogram där alla vinklar är räta.", "svar": true, "ord": "Rektangel"},
    {"typ": "sf", "q": "Alla parallellogrammer är rektanglar.", "svar": false, "ord": "Parallellogram"},
    {"typ": "sf", "q": "En kvadrat är en romb där alla vinklar är räta.", "svar": true, "ord": "Kvadrat"},
    {"q": "Vilken figur är en parallellogram där alla sidor är lika långa?", "a": ["Romb", "Rektangel", "Triangel", "Cirkel"], "ord": "Romb"},
    {"q": "Vad kallas en polygon med sex hörn?", "a": ["Sexhörning", "Femhörning", "Fyrhörning", "Åttahörning"], "ord": "Polygon"},
    {"typ": "ordning", "q": "Klicka på figurerna från minst till flest hörn", "a": ["Triangel", "Romb", "Femhörning", "Sexhörning"], "ord": "Polygon"}
  ] },
  '8-3-2': { fragor: [
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Y3-image14.jpg\" alt=\"\"><small>Alla sidoytor är kvadrater. Vad heter kroppen?</small>", "a": ["Kub", "Prisma", "Pyramid", "Cylinder"], "ord": "Kub"},
    {"q": "Vad kallas en kropp där alla sidoytor är rektanglar?", "a": ["Rätblock", "Pyramid", "Kon", "Klot"], "ord": "Rätblock"},
    {"typ": "sf", "q": "En kub är ett rätblock.", "svar": true, "ord": "Kub"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Y3-image20.jpg\" alt=\"\"><small>Vad heter kroppen?</small>", "a": ["Kon", "Pyramid", "Cylinder", "Klot"], "ord": "Kon"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Y3-image22.jpg\" alt=\"\"><small>Vad heter kroppen?</small>", "a": ["Klot", "Cirkel", "Cylinder", "Kon"], "ord": "Klot"},
    {"q": "Vilken kropp har en polygon som basyta och trianglar som sidoytor med en gemensam spets?", "a": ["Pyramid", "Prisma", "Kon", "Rätblock"], "ord": "Pyramid"},
    {"typ": "sf", "q": "Ett prisma har två parallella och identiska sidoytor.", "svar": true, "ord": "Prisma"},
    {"q": "Vad kallas den rundade ytan på en cylinder eller en kon?", "a": ["Mantelyta", "Basyta", "Begränsningsarea", "Diagonal"], "ord": "Mantelyta"},
    {"q": "Vad kallas ytan som en kropp ofta står på?", "a": ["Basyta", "Mantelyta", "Begränsningsarea", "Volym"], "ord": "Basyta"},
    {"q": "Ett rätblock är 5 cm långt, 3 cm brett och 2 cm högt. Hur stor är volymen?", "a": ["30 cm³", "10 cm³", "31 cm³", "30 cm²"], "ord": "Volym"},
    {"q": "Hur räknar man ut volymen av ett prisma eller en cylinder?", "a": ["Basytans area · höjden", "Basytans area · höjden / 3", "Omkretsen · höjden", "Basytans area + höjden"], "ord": "Volym"},
    {"q": "Hur räknar man ut volymen av en pyramid eller en kon?", "a": ["Basytans area · höjden / 3", "Basytans area · höjden", "Basytans area · 3", "Höjden / 3"], "ord": "Pyramid"},
    {"typ": "sf", "q": "Volymen berättar hur stor arean är runt om en kropp.", "svar": false, "ord": "Volym"},
    {"typ": "ordning", "q": "Klicka på volymerna från minst till störst", "a": ["500 cm³", "1 dm³", "2 liter", "1 m³"], "ord": "Volym"},
    {"q": "Vad kallas den sammanlagda arean av alla ytor runt en kropp?", "a": ["Begränsningsarea", "Volym", "Mantelyta", "Basyta"], "ord": "Begränsningsarea"},
    {"q": "En kub har sidan 2 cm. Hur stor är begränsningsarean?", "a": ["24 cm²", "8 cm²", "12 cm²", "16 cm²"], "ord": "Begränsningsarea"},
    {"typ": "ordning", "q": "En cylinder har radien 2 cm och höjden 5 cm. Räkna ut volymen.<br><small>Klicka på stegen i rätt ordning.</small>", "a": ["Basytan är en cirkel med radien 2 cm", "Basytans area ≈ 3,14 · 2 · 2 ≈ 12,6 cm²", "Multiplicera med höjden 5 cm", "Volymen ≈ 63 cm³"], "ord": "Cylinder / Mantelyta"}
  ] },
  '8-4-1': { fragor: [
    {"q": "Vilket är ett algebraiskt uttryck?", "a": ["3<i>x</i> + 7", "3 + 7", "3<i>x</i> + 7 = 10", "10"], "ord": "Algebraiskt uttryck"},
    {"q": "Vad är värdet av 5<i>x</i> – 3 om <i>x</i> = 4?", "a": ["17", "23", "2", "53"], "ord": "Algebraiskt uttryck"},
    {"typ": "ordning", "q": "Klicka på uttrycken från minst till störst värde när <i>x</i> = 3", "a": ["<i>x</i> – 5", "2<i>x</i> – 3", "<i>x</i> + 4", "3<i>x</i>"], "ord": "Algebraiskt uttryck"},
    {"typ": "sf", "q": "En variabel kan anta olika värden.", "svar": true, "ord": "Variabel"},
    {"q": "Lisa har <i>x</i> kr och Omar har dubbelt så mycket. Vilket uttryck visar hur mycket de har tillsammans?", "a": ["3<i>x</i>", "2<i>x</i>", "<i>x</i> + 2", "<i>x</i><sup>2</sup>"], "ord": "Variabel"},
    {"q": "Vad kallas svaret vid subtraktion?", "a": ["Differens", "Summa", "Produkt", "Kvot"], "ord": "Differens"},
    {"q": "3, 8, 13, 18, …<br><small>Vad är differensen mellan talen?</small>", "a": ["5", "3", "8", "10"], "ord": "Differens"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Y4-image2.jpg\" alt=\"\"><small>Figurerna har 1, 3, 5 och 7 rutor. Hur många rutor har figur 5?</small>", "a": ["9", "8", "10", "11"], "ord": "Mönster"},
    {"q": "4, 7, 10, 13, …<br><small>Vilket uttryck ger tal nummer <i>n</i>?</small>", "a": ["3<i>n</i> + 1", "<i>n</i> + 3", "4<i>n</i>", "3<i>n</i> + 4"], "ord": "Mönster"},
    {"q": "Förenkla 3<i>x</i> + 5 + 2<i>x</i> – 1.", "a": ["5<i>x</i> + 4", "5<i>x</i> + 6", "9<i>x</i>", "6<i>x</i> + 4"], "ord": "Förenkling"},
    {"q": "Förenkla 4<i>a</i> – <i>a</i> + 2<i>b</i>.", "a": ["3<i>a</i> + 2<i>b</i>", "5<i>a</i> + 2<i>b</i>", "5<i>a</i><i>b</i>", "3<i>a</i> + <i>b</i>"], "ord": "Förenkling"},
    {"typ": "sf", "q": "3<i>x</i> + 2<i>y</i> kan förenklas till 5<i>x</i><i>y</i>.", "svar": false, "ord": "Förenkling"},
    {"q": "Vad är 10 – (2 + 3)?", "a": ["5", "11", "15", "9"], "ord": "Parentes"},
    {"q": "Multiplicera in: 3(<i>x</i> + 4)", "a": ["3<i>x</i> + 12", "3<i>x</i> + 4", "<i>x</i> + 12", "7<i>x</i>"], "ord": "Parentes"},
    {"q": "Förenkla 5<i>x</i> – (2<i>x</i> – 3).", "a": ["3<i>x</i> + 3", "3<i>x</i> – 3", "7<i>x</i> – 3", "3<i>x</i>"], "ord": "Parentes"},
    {"typ": "sf", "q": "Det som står inom parentes räknas ut först.", "svar": true, "ord": "Parentes"},
    {"typ": "ordning", "q": "Förenkla 2(<i>x</i> + 3) + <i>x</i>.<br><small>Klicka på stegen i rätt ordning.</small>", "a": ["Multiplicera in: 2<i>x</i> + 6 + <i>x</i>", "Samla <i>x</i>-termerna: 2<i>x</i> + <i>x</i> = 3<i>x</i>", "Konstanten är 6", "Svaret är 3<i>x</i> + 6"], "ord": "Förenkling"}
  ] },
  '8-4-2': { fragor: [
    {"q": "Vad är <i>x</i><sup>2</sup> om <i>x</i> = 5?", "a": ["25", "10", "7", "52"], "ord": "Potens"},
    {"typ": "sf", "q": "<i>x</i> · <i>x</i> · <i>x</i> = <i>x</i><sup>3</sup>", "svar": true, "ord": "Potens"},
    {"q": "Vad är 2<sup>3</sup> + 3<sup>2</sup>?", "a": ["17", "12", "13", "36"], "ord": "Potens"},
    {"q": "Vilken är basen i <i>a</i><sup>4</sup>?", "a": ["<i>a</i>", "4", "4<i>a</i>", "Det finns ingen bas"], "ord": "Bas"},
    {"q": "Vilken är exponenten i <i>a</i><sup>4</sup>?", "a": ["4", "<i>a</i>", "4<i>a</i>", "Det finns ingen exponent"], "ord": "Exponent"},
    {"q": "Vad är en ekvation?", "a": ["En likhet där något tal är obekant", "Ett uttryck utan likhetstecken", "Ett tal i bråkform", "En talföljd"], "ord": "Ekvation"},
    {"q": "Lös ekvationen 3<i>x</i> + 4 = 19.", "a": ["<i>x</i> = 5", "<i>x</i> = 7", "<i>x</i> = 15", "<i>x</i> = 6"], "ord": "Ekvation"},
    {"q": "Lös ekvationen 5<i>x</i> = 2<i>x</i> + 12.", "a": ["<i>x</i> = 4", "<i>x</i> = 12", "<i>x</i> = 2", "<i>x</i> = 6"], "ord": "Ekvation"},
    {"typ": "ordning", "q": "Klicka på ekvationerna från minst till störst lösning", "a": ["<i>x</i> + 5 = 6", "3<i>x</i> = 9", "2<i>x</i> – 1 = 9", "<i>x</i> / 2 = 4"], "ord": "Ekvation"},
    {"q": "Vad innebär balansmetoden?", "a": ["Man gör samma beräkning i båda leden", "Man gissar och prövar", "Man byter plats på leden", "Man räknar bara i vänster led"], "ord": "Balansmetoden"},
    {"q": "Lös ekvationen 2<i>x</i> – 7 = 11.", "a": ["<i>x</i> = 9", "<i>x</i> = 2", "<i>x</i> = 4", "<i>x</i> = 18"], "ord": "Balansmetoden"},
    {"typ": "sf", "q": "Med balansmetoden får man dividera bara vänster led med 4.", "svar": false, "ord": "Balansmetoden"},
    {"typ": "ordning", "q": "Lös 4<i>x</i> + 3 = 23 med balansmetoden.<br><small>Klicka på stegen i rätt ordning.</small>", "a": ["4<i>x</i> + 3 = 23", "Subtrahera 3 i båda leden: 4<i>x</i> = 20", "Dividera båda leden med 4", "<i>x</i> = 5"], "ord": "Balansmetoden"},
    {"q": "Vad kallas <i>x</i> i ekvationen <i>x</i> + 9 = 15?", "a": ["Ett obekant tal", "En exponent", "En bas", "En differens"], "ord": "Obekant tal"},
    {"q": "<i>x</i> – 2 = 10 + 72<br><small>Vad står i höger led?</small>", "a": ["10 + 72", "<i>x</i> – 2", "<i>x</i>", "="], "ord": "Vänster led och höger led"},
    {"typ": "sf", "q": "V.L. betyder vänster led och H.L. betyder höger led.", "svar": true, "ord": "Vänster led och höger led"}
  ] },
  '8-5-1': { fragor: [
    {"q": "Hur många utfall finns när man snurrar ett lyckohjul med 8 lika stora fält?", "a": ["8", "1", "4", "16"], "ord": "Utfall"},
    {"q": "Vilket är ett slumpmässigt försök?", "a": ["Att dra en lott", "Att räkna ut 5 · 4", "Att mäta sin längd", "Att läsa ett schema"], "ord": "Slumpmässigt försök"},
    {"q": "Vad är sannolikheten att få en udda siffra med en vanlig tärning?", "a": ["<span class=\"fr\"><i>1</i><i>2</i></span>", "<span class=\"fr\"><i>1</i><i>6</i></span>", "<span class=\"fr\"><i>1</i><i>3</i></span>", "<span class=\"fr\"><i>2</i><i>3</i></span>"], "ord": "Sannolikhet"},
    {"q": "En påse har 2 röda, 3 blå och 5 gröna kulor. Vad är sannolikheten att ta en blå?", "a": ["<span class=\"fr\"><i>3</i><i>10</i></span>", "<span class=\"fr\"><i>3</i><i>7</i></span>", "<span class=\"fr\"><i>1</i><i>3</i></span>", "<span class=\"fr\"><i>3</i><i>5</i></span>"], "ord": "Sannolikhet"},
    {"typ": "sf", "q": "Sannolikheten för en händelse är alltid mellan 0 och 1.", "svar": true, "ord": "Sannolikhet"},
    {"typ": "ordning", "q": "Klicka på händelserna från minst till mest sannolik", "a": ["Få två sexor med två tärningar", "Få en sexa med en tärning", "Få krona när man singlar slant", "Få ett tal mindre än 6 med en tärning"], "ord": "Sannolikhet"},
    {"q": "I vilket försök är sannolikhetsfördelningen likformig?", "a": ["Kasta en vanlig tärning", "Ta en kula ur en påse med 3 röda och 1 gul", "Snurra ett hjul där ett fält är dubbelt så stort som de andra", "Gissa om det regnar i morgon"], "ord": "Likformig sannolikhetsfördelning"},
    {"typ": "sf", "q": "Om man tar en kula ur en påse med 3 röda och 1 gul är sannolikhetsfördelningen olikformig.", "svar": true, "ord": "Olikformig sannolikhetsfördelning"},
    {"q": "Du singlar slant två gånger. Vilket påstående stämmer?", "a": ["Kasten är oberoende händelser", "Kasten är beroende händelser", "Andra kastet blir alltid tvärtom", "Sannolikheten för krona ökar efter en klave"], "ord": "Oberoende händelser"},
    {"typ": "sf", "q": "Om man lägger tillbaka kulan innan nästa dragning är dragningarna oberoende.", "svar": true, "ord": "Oberoende händelser"},
    {"q": "Du drar två kort ur en kortlek utan att lägga tillbaka det första. Vad kallas det?", "a": ["Beroende händelser", "Oberoende händelser", "Likformig sannolikhetsfördelning", "Ett utfall"], "ord": "Beroende händelser"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Y5-image8.jpg\" alt=\"\"><small>Vad kallas bilden?</small>", "a": ["Träddiagram", "Stapeldiagram", "Linjediagram", "Koordinatsystem"], "ord": "Träddiagram"},
    {"q": "Du singlar slant två gånger. Vad är sannolikheten att få krona båda gångerna?", "a": ["<span class=\"fr\"><i>1</i><i>4</i></span>", "<span class=\"fr\"><i>1</i><i>2</i></span>", "<span class=\"fr\"><i>1</i><i>3</i></span>", "<span class=\"fr\"><i>3</i><i>4</i></span>"], "ord": "Träddiagram"},
    {"q": "En påse har en röd och en blå kula. Du drar en, lägger tillbaka den och drar igen. Hur många kombinationer finns?", "a": ["4", "2", "3", "1"], "ord": "Träddiagram"},
    {"typ": "ordning", "q": "Räkna ut sannolikheten att få krona två gånger när du singlar slant två gånger.<br><small>Klicka på stegen i rätt ordning.</small>", "a": ["Krona första gången: <span class=\"fr\"><i>1</i><i>2</i></span>", "Krona andra gången: <span class=\"fr\"><i>1</i><i>2</i></span>", "Multiplicera: <span class=\"fr\"><i>1</i><i>2</i></span> · <span class=\"fr\"><i>1</i><i>2</i></span>", "Sannolikheten är <span class=\"fr\"><i>1</i><i>4</i></span>"], "ord": "Träddiagram"}
  ] },
  '8-5-2': { fragor: [
    {"q": "Vad är medelvärdet av 3, 7, 8 och 10?", "a": ["7", "8", "28", "7,5"], "ord": "Medelvärde"},
    {"typ": "ordning", "q": "Klicka på lägesmåtten för 2, 2, 3, 7 och 11 från minst till störst", "a": ["Typvärdet", "Medianen", "Medelvärdet", "Det största värdet"], "ord": "Medelvärde"},
    {"q": "Vad är medianen av 4, 12, 7, 9 och 3?", "a": ["7", "9", "12", "35"], "ord": "Median"},
    {"q": "Vad är medianen av 1, 3, 5 och 9?", "a": ["4", "3", "5", "4,5"], "ord": "Median"},
    {"typ": "sf", "q": "Medianen påverkas mindre än medelvärdet av ett enda mycket högt värde.", "svar": true, "ord": "Median"},
    {"typ": "ordning", "q": "Räkna ut medianen av 8, 3, 5 och 10.<br><small>Klicka på stegen i rätt ordning.</small>", "a": ["Sortera: 3, 5, 8, 10", "De mittersta talen är 5 och 8", "Räkna ut (5 + 8) / 2", "Medianen är 6,5"], "ord": "Median"},
    {"q": "Vad är typvärdet av 6, 2, 6, 8, 2, 6?", "a": ["6", "2", "8", "5"], "ord": "Typvärde"},
    {"q": "Vad är variationsbredden av 4, 9, 15, 2 och 11?", "a": ["13", "15", "2", "41"], "ord": "Variationsbredd"},
    {"typ": "sf", "q": "Variationsbredden är ett lägesmått.", "svar": false, "ord": "Variationsbredd"},
    {"q": "Skostorlekar: 38, 39, 39, 40, 39, 41<br><small>Vad är frekvensen för 39?</small>", "a": ["3", "39", "6", "1"], "ord": "Frekvens"},
    {"q": "Av 40 elever cyklar 10 till skolan. Vad är den relativa frekvensen för att cykla?", "a": ["25 %", "10 %", "40 %", "4 %"], "ord": "Relativ frekvens"},
    {"typ": "sf", "q": "Summan av alla relativa frekvenser är 100 %.", "svar": true, "ord": "Relativ frekvens"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Y5-image17.jpg\" alt=\"\"><small>Vad heter diagrammet?</small>", "a": ["Stolpdiagram", "Stapeldiagram", "Linjediagram", "Cirkeldiagram"], "ord": "Stolpdiagram"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Y5-image18.jpg\" alt=\"\"><small>Vad heter diagrammet?</small>", "a": ["Stapeldiagram", "Stolpdiagram", "Linjediagram", "Cirkeldiagram"], "ord": "Stapeldiagram"},
    {"q": "Vilket diagram passar bäst för att visa hur befolkningen har förändrats under 100 år?", "a": ["Linjediagram", "Cirkeldiagram", "Stapeldiagram", "Stolpdiagram"], "ord": "Linjediagram"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Y5-image20.jpg\" alt=\"\"><small>Hur stor andel av metallen är zink?</small>", "a": ["35 %", "50 %", "15 %", "65 %"], "ord": "Cirkeldiagram"}
  ] },
  '9-1-1': { fragor: [
    {"q": "Vilket tal är ett naturligt tal?", "a": ["0", "–1", "0,5", "<span class=\"fr\"><i>1</i><i>2</i></span>"], "ord": "Naturliga tal"},
    {"q": "Vilka tal är hela tal?", "a": ["De naturliga talen och de negativa heltalen", "Bara de positiva talen", "Alla tal i bråkform", "Alla tal med decimaler"], "ord": "Hela tal"},
    {"typ": "sf", "q": "–5 är ett helt tal.", "svar": true, "ord": "Hela tal"},
    {"q": "Vilket tal är rationellt men inte ett helt tal?", "a": ["0,75", "–3", "√<span class=\"rot\">2</span>", "π"], "ord": "Rationella tal"},
    {"q": "Vilket tal är ett stambråk?", "a": ["<span class=\"fr\"><i>1</i><i>7</i></span>", "<span class=\"fr\"><i>2</i><i>7</i></span>", "<span class=\"fr\"><i>7</i><i>1</i></span>", "<span class=\"fr\"><i>3</i><i>4</i></span>"], "ord": "Stambråk"},
    {"q": "Vilket tal har en periodisk decimalutveckling?", "a": ["<span class=\"fr\"><i>1</i><i>3</i></span> = 0,333…", "0,25", "√<span class=\"rot\">2</span> = 1,414 213…", "π = 3,141 59…"], "ord": "Periodisk decimalutveckling"},
    {"q": "0,272727…<br><small>Vilka siffror upprepas?</small>", "a": ["27", "2", "7", "272"], "ord": "Periodisk decimalutveckling"},
    {"q": "Vilket tal är irrationellt?", "a": ["π", "0,5", "<span class=\"fr\"><i>2</i><i>3</i></span>", "–4"], "ord": "Irrationella tal"},
    {"typ": "sf", "q": "<span class=\"fr\"><i>1</i><i>3</i></span> är ett irrationellt tal.", "svar": false, "ord": "Irrationella tal"},
    {"q": "Vad kallas alla tal som kan visas på en tallinje?", "a": ["Reella tal", "Naturliga tal", "Hela tal", "Stambråk"], "ord": "Reella tal"},
    {"typ": "sf", "q": "Alla rationella och irrationella tal är reella tal.", "svar": true, "ord": "Reella tal"},
    {"typ": "ordning", "q": "Klicka på talmängderna från den minsta till den största", "a": ["Naturliga tal", "Hela tal", "Rationella tal", "Reella tal"], "ord": "Reella tal"},
    {"typ": "ordning", "q": "Klicka på talen från minst till störst", "a": ["–2", "–<span class=\"fr\"><i>1</i><i>2</i></span>", "√<span class=\"rot\">2</span>", "π"], "ord": "Reella tal"},
    {"q": "Vilket är det motsatta talet till 7?", "a": ["–7", "<span class=\"fr\"><i>1</i><i>7</i></span>", "0,7", "7"], "ord": "Motsatta tal"},
    {"q": "Vad blir summan av två motsatta tal?", "a": ["0", "1", "Dubbla talet", "–1"], "ord": "Motsatta tal"}
  ] },
  '9-1-2': { fragor: [
    {"q": "Förkorta <span class=\"fr\"><i>18</i><i>24</i></span> så långt det går.", "a": ["<span class=\"fr\"><i>3</i><i>4</i></span>", "<span class=\"fr\"><i>9</i><i>12</i></span>", "<span class=\"fr\"><i>6</i><i>8</i></span>", "<span class=\"fr\"><i>2</i><i>3</i></span>"], "ord": "Förkortning"},
    {"q": "Förläng <span class=\"fr\"><i>5</i><i>6</i></span> så att nämnaren blir 18.", "a": ["<span class=\"fr\"><i>15</i><i>18</i></span>", "<span class=\"fr\"><i>5</i><i>18</i></span>", "<span class=\"fr\"><i>11</i><i>18</i></span>", "<span class=\"fr\"><i>10</i><i>18</i></span>"], "ord": "Förlängning"},
    {"typ": "sf", "q": "<span class=\"fr\"><i>6</i><i>9</i></span> är skrivet i enklaste form.", "svar": false, "ord": "Enklaste form"},
    {"q": "Vilken är minsta gemensamma nämnaren till <span class=\"fr\"><i>1</i><i>6</i></span> och <span class=\"fr\"><i>1</i><i>8</i></span>?", "a": ["24", "48", "14", "12"], "ord": "Minsta gemensam nämnare"},
    {"q": "<span class=\"fr\"><i>5</i><i>6</i></span> – <span class=\"fr\"><i>3</i><i>8</i></span> = ?", "a": ["<span class=\"fr\"><i>11</i><i>24</i></span>", "<span class=\"fr\"><i>2</i><i>14</i></span>", "<span class=\"fr\"><i>1</i><i>24</i></span>", "<span class=\"fr\"><i>8</i><i>24</i></span>"], "ord": "Minsta gemensam nämnare"},
    {"q": "Vad är (–2)<sup>3</sup>?", "a": ["–8", "8", "–6", "6"], "ord": "Potens / Bas / Exponent"},
    {"q": "I potensen 7<sup>4</sup>, vad kallas 7?", "a": ["Basen", "Exponenten", "Tiopotensen", "Kvadratroten"], "ord": "Potens / Bas / Exponent"},
    {"q": "Vad är 10<sup>–2</sup>?", "a": ["0,01", "–100", "0,001", "–0,01"], "ord": "Tiopotens"},
    {"q": "Hur skrivs 0,0005 i grundpotensform?", "a": ["5 · 10<sup>–4</sup>", "5 · 10<sup>4</sup>", "0,5 · 10<sup>–3</sup>", "5 · 10<sup>–5</sup>"], "ord": "Grundpotensform"},
    {"typ": "ordning", "q": "Klicka på talen från minst till störst", "a": ["3 · 10<sup>–2</sup>", "5 · 10<sup>–1</sup>", "2 · 10<sup>1</sup>", "1,5 · 10<sup>2</sup>"], "ord": "Grundpotensform"},
    {"q": "Vad är √<span class=\"rot\">49</span>?", "a": ["7", "24,5", "49", "14"], "ord": "Kvadratrot"},
    {"q": "Mellan vilka heltal ligger √<span class=\"rot\">30</span>?", "a": ["5 och 6", "4 och 5", "6 och 7", "15 och 16"], "ord": "Kvadratrot"},
    {"typ": "sf", "q": "√<span class=\"rot\">16</span> = 8", "svar": false, "ord": "Kvadratrot"},
    {"typ": "ordning", "q": "Klicka på talen från minst till störst", "a": ["√<span class=\"rot\">10</span>", "4", "2<sup>3</sup>", "3<sup>2</sup>"], "ord": "Kvadratrot"},
    {"q": "Kvadrera 6.", "a": ["36", "12", "3", "66"], "ord": "Kvadrera"},
    {"typ": "sf", "q": "Att kvadrera ett tal betyder att multiplicera talet med sig självt.", "svar": true, "ord": "Kvadrera"}
  ] },
  '9-2-1': { fragor: [
    {"q": "Andelen ökar från 30 % till 36 %. Hur många procent är ökningen?", "a": ["20 %", "6 %", "36 %", "16 %"], "ord": "Procent"},
    {"q": "Andelen ökar från 30 % till 36 %. Hur många procentenheter är ökningen?", "a": ["6 procentenheter", "20 procentenheter", "36 procentenheter", "3 procentenheter"], "ord": "Procentenhet"},
    {"q": "Vad betyder promille?", "a": ["Tusendel", "Hundradel", "Tiondel", "Miljondel"], "ord": "Promille"},
    {"q": "Hur skrivs 0,004 i promille?", "a": ["4 ‰", "0,4 ‰", "40 ‰", "4 %"], "ord": "Promille"},
    {"typ": "sf", "q": "5 ‰ = 0,5 %", "svar": true, "ord": "Promille"},
    {"q": "Ett pris höjs med 20 %. Vad är förändringsfaktorn?", "a": ["1,2", "0,2", "0,8", "20"], "ord": "Förändringsfaktor"},
    {"q": "Ett pris sänks med 15 %. Vad är förändringsfaktorn?", "a": ["0,85", "1,15", "0,15", "85"], "ord": "Förändringsfaktor"},
    {"q": "En jacka kostar 600 kr och sänks med 30 %. Vad är det nya priset?", "a": ["420 kr", "180 kr", "570 kr", "780 kr"], "ord": "Förändringsfaktor"},
    {"typ": "sf", "q": "En förändringsfaktor som är större än 1 betyder en ökning.", "svar": true, "ord": "Förändringsfaktor"},
    {"typ": "ordning", "q": "Klicka på förändringsfaktorerna från störst minskning till störst ökning", "a": ["0,7", "0,95", "1,05", "1,3"], "ord": "Förändringsfaktor"},
    {"q": "Vad är en funktion?", "a": ["Ett samband där något beror av något annat", "En punkt i ett koordinatsystem", "Ett tal i procentform", "En kvadratrot"], "ord": "Funktion"},
    {"q": "<i>y</i> = 3<i>x</i> + 2<br><small>Vad blir <i>y</i> när <i>x</i> = 5?</small>", "a": ["17", "15", "10", "32"], "ord": "Funktion"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Z2-image11.jpg\" alt=\"\"><small>Vad kallas tabellen?</small>", "a": ["Värdetabell", "Frekvenstabell", "Träddiagram", "Graf"], "ord": "Värdetabell"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Z2-image11.jpg\" alt=\"\"><small>Mönstret fortsätter. Vilket värde får <i>y</i> när <i>x</i> = 4?</small>", "a": ["7", "6", "8", "5"], "ord": "Värdetabell"},
    {"q": "En taxiresa kostar mer ju längre man åker. Vilken är den oberoende variabeln?", "a": ["Sträckan", "Priset", "Taxin", "Föraren"], "ord": "Oberoende variabel"},
    {"typ": "sf", "q": "Den beroende variabeln påverkar den oberoende variabeln.", "svar": false, "ord": "Beroende variabel"}
  ] },
  '9-2-2': { fragor: [
    {"q": "Vilka koordinater har origo?", "a": ["(0, 0)", "(1, 1)", "(0, 1)", "(1, 0)"], "ord": "Koordinatsystem / Koordinataxlar / x-axel och y-axel / Koordinat / Origo"},
    {"q": "Vilken koordinataxel är lodrät?", "a": ["<i>y</i>-axeln", "<i>x</i>-axeln", "Båda", "Ingen av dem"], "ord": "Koordinatsystem / Koordinataxlar / x-axel och y-axel / Koordinat / Origo"},
    {"q": "Hur ser grafen till en linjär funktion ut?", "a": ["En rät linje", "En cirkel", "En böjd kurva", "En enda punkt"], "ord": "Linjär funktion"},
    {"q": "Vilken funktion är linjär?", "a": ["<i>y</i> = 4<i>x</i> – 1", "<i>y</i> = <i>x</i><sup>2</sup>", "<i>y</i> = 2<sup><i>x</i></sup>", "<i>y</i> = <i>x</i><sup>3</sup> + 1"], "ord": "Linjär funktion"},
    {"typ": "ordning", "q": "Klicka på <i>x</i>-värdena från lägst till högst <i>y</i>-värde för linjen <i>y</i> = 2<i>x</i> + 1", "a": ["<i>x</i> = –2", "<i>x</i> = 0", "<i>x</i> = 1", "<i>x</i> = 3"], "ord": "Linjär funktion"},
    {"q": "Vad är <i>k</i>-värdet i <i>y</i> = 3<i>x</i> + 5?", "a": ["3", "5", "8", "15"], "ord": "k-värde / Riktningskoefficient"},
    {"q": "En linje går genom punkterna (0, 1) och (2, 7). Vad är <i>k</i>-värdet?", "a": ["3", "6", "2", "7"], "ord": "k-värde / Riktningskoefficient"},
    {"typ": "sf", "q": "Om <i>k</i>-värdet är negativt lutar linjen nedåt från vänster till höger.", "svar": true, "ord": "k-värde / Riktningskoefficient"},
    {"typ": "ordning", "q": "Klicka på linjerna från minst till störst lutning", "a": ["<i>y</i> = –2<i>x</i> + 1", "<i>y</i> = 3", "<i>y</i> = <i>x</i> + 5", "<i>y</i> = 4<i>x</i>"], "ord": "k-värde / Riktningskoefficient"},
    {"q": "Vad är <i>m</i>-värdet i <i>y</i> = 3<i>x</i> + 5?", "a": ["5", "3", "8", "0"], "ord": "m-värde"},
    {"q": "Var skär linjen <i>y</i> = 2<i>x</i> – 4 <i>y</i>-axeln?", "a": ["(0, –4)", "(0, 2)", "(–4, 0)", "(2, 0)"], "ord": "m-värde"},
    {"q": "Vad kallas en punkt där två linjer korsar varandra?", "a": ["Skärningspunkt", "Origo", "Medelpunkt", "Vinkelspets"], "ord": "Skärningspunkt"},
    {"q": "<i>y</i> = 5<i>x</i> + 2<br><small>Vilka är konstanterna?</small>", "a": ["5 och 2", "<i>x</i> och <i>y</i>", "Bara <i>y</i>", "5<i>x</i>"], "ord": "Konstant"},
    {"typ": "sf", "q": "Motsatsen till en konstant är en variabel.", "svar": true, "ord": "Konstant"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Z2-image13.jpg\" alt=\"\"><small>Grafen visar kostnaden. Vad kostar 2 timmar?</small>", "a": ["500 kr", "250 kr", "750 kr", "1 000 kr"], "ord": "Graf"},
    {"q": "Vilken funktion är en proportionalitet?", "a": ["<i>y</i> = 4<i>x</i>", "<i>y</i> = 4<i>x</i> + 1", "<i>y</i> = <i>x</i> + 4", "<i>y</i> = 4"], "ord": "Proportionalitet"},
    {"typ": "sf", "q": "Grafen till en proportionalitet går genom origo.", "svar": true, "ord": "Proportionalitet"}
  ] },
  '9-3-1': { fragor: [
    {"q": "Vad är värdet av 3<i>a</i> – <i>b</i> om <i>a</i> = 4 och <i>b</i> = –2?", "a": ["14", "10", "–14", "8"], "ord": "Variabel"},
    {"typ": "ordning", "q": "Klicka på uttrycken från minst till störst värde när <i>x</i> = –2", "a": ["3<i>x</i>", "<i>x</i> – 1", "<i>x</i><sup>2</sup>", "<i>x</i><sup>2</sup> + 5"], "ord": "Variabel"},
    {"q": "Vad är värdet av <i>x</i><sup>2</sup> – 2<i>x</i> om <i>x</i> = 5?", "a": ["15", "5", "20", "35"], "ord": "Algebraiskt uttryck"},
    {"q": "Multiplicera in: <i>x</i>(<i>x</i> + 4)", "a": ["<i>x</i><sup>2</sup> + 4<i>x</i>", "2<i>x</i> + 4", "<i>x</i><sup>2</sup> + 4", "5<i>x</i>"], "ord": "Algebraiskt uttryck"},
    {"q": "2, 5, 8, 11, …<br><small>Vilket uttryck beskriver tal nummer <i>n</i>?</small>", "a": ["3<i>n</i> – 1", "<i>n</i> + 3", "2<i>n</i> + 3", "3<i>n</i> + 2"], "ord": "Mönster"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Z3-image2.jpg\" alt=\"\"><small>Figurerna har 1, 3, 5 och 7 rutor. Hur många rutor har figur 10?</small>", "a": ["19", "20", "21", "17"], "ord": "Mönster"},
    {"q": "Förenkla 4<i>x</i> + 3<i>y</i> – <i>x</i> + 2<i>y</i>.", "a": ["3<i>x</i> + 5<i>y</i>", "5<i>x</i> + 5<i>y</i>", "8<i>x</i><i>y</i>", "3<i>x</i> + <i>y</i>"], "ord": "Förenkling"},
    {"q": "Förenkla 2(<i>x</i> + 3) – (<i>x</i> – 1).", "a": ["<i>x</i> + 7", "<i>x</i> + 5", "3<i>x</i> + 7", "<i>x</i> + 2"], "ord": "Förenkling"},
    {"typ": "sf", "q": "2<i>x</i> · 3<i>x</i> = 6<i>x</i><sup>2</sup>", "svar": true, "ord": "Förenkling"},
    {"typ": "sf", "q": "<i>a</i> + <i>a</i> = <i>a</i><sup>2</sup>", "svar": false, "ord": "Förenkling"},
    {"typ": "ordning", "q": "Förenkla 3(<i>x</i> + 2) – 2<i>x</i>.<br><small>Klicka på stegen i rätt ordning.</small>", "a": ["Multiplicera in: 3<i>x</i> + 6 – 2<i>x</i>", "Samla <i>x</i>-termerna: 3<i>x</i> – 2<i>x</i> = <i>x</i>", "Konstanten är 6", "Svaret är <i>x</i> + 6"], "ord": "Förenkling"},
    {"q": "Förenkla <span class=\"fr\"><i>6<i>x</i></i><i>3</i></span>.", "a": ["2<i>x</i>", "3<i>x</i>", "6<i>x</i>", "<span class=\"fr\"><i><i>x</i></i><i>2</i></span>"], "ord": "Enklaste form"},
    {"q": "Skriv <span class=\"fr\"><i>4<i>a</i><i>b</i></i><i>8<i>a</i></i></span> i enklaste form.", "a": ["<span class=\"fr\"><i><i>b</i></i><i>2</i></span>", "<span class=\"fr\"><i><i>a</i><i>b</i></i><i>2</i></span>", "<span class=\"fr\"><i>1</i><i>2<i>a</i></i></span>", "2<i>b</i>"], "ord": "Enklaste form"},
    {"q": "Förhållandet mellan pojkar och flickor är 2 : 3. Det är 12 pojkar. Hur många flickor är det?", "a": ["18", "8", "15", "24"], "ord": "Proportion"},
    {"q": "Saft blandas med vatten i förhållandet 1 : 4. Hur mycket vatten behövs till 3 dl saft?", "a": ["12 dl", "4 dl", "7 dl", "0,75 dl"], "ord": "Proportion"},
    {"typ": "sf", "q": "2 : 5 och 4 : 10 är samma proportion.", "svar": true, "ord": "Proportion"}
  ] },
  '9-3-2': { fragor: [
    {"q": "Lös ekvationen 5<i>x</i> – 3 = 2<i>x</i> + 9.", "a": ["<i>x</i> = 4", "<i>x</i> = 2", "<i>x</i> = 12", "<i>x</i> = 6"], "ord": "Ekvation"},
    {"q": "Lös ekvationen 3(<i>x</i> – 2) = 12.", "a": ["<i>x</i> = 6", "<i>x</i> = 2", "<i>x</i> = 4", "<i>x</i> = 5"], "ord": "Ekvation"},
    {"q": "Vad kallas <i>y</i> i ekvationen 2<i>y</i> + 1 = 11?", "a": ["Ett obekant tal", "En konstant", "En exponent", "En differens"], "ord": "Obekant tal"},
    {"q": "3<i>x</i> + 5 = 20<br><small>Vad står i vänster led?</small>", "a": ["3<i>x</i> + 5", "20", "5", "="], "ord": "Vänster led och höger led"},
    {"q": "Lös ekvationen <span class=\"fr\"><i><i>x</i></i><i>4</i></span> = 5.", "a": ["<i>x</i> = 20", "<i>x</i> = 1,25", "<i>x</i> = 9", "<i>x</i> = 1"], "ord": "Balansmetoden"},
    {"typ": "sf", "q": "Med balansmetoden gör man alltid samma beräkning i båda leden.", "svar": true, "ord": "Balansmetoden"},
    {"typ": "ordning", "q": "Lös 7<i>x</i> – 4 = 3<i>x</i> + 8.<br><small>Klicka på stegen i rätt ordning.</small>", "a": ["Subtrahera 3<i>x</i>: 4<i>x</i> – 4 = 8", "Addera 4: 4<i>x</i> = 12", "Dividera med 4", "<i>x</i> = 3"], "ord": "Balansmetoden"},
    {"q": "Pröva! Vilket värde är en lösning till <i>x</i><sup>2</sup> = 2<i>x</i> + 3?", "a": ["<i>x</i> = 3", "<i>x</i> = 1", "<i>x</i> = 2", "<i>x</i> = 4"], "ord": "Prövning"},
    {"typ": "sf", "q": "<i>x</i> = 2 är en lösning till 4<i>x</i> – 1 = 9.", "svar": false, "ord": "Prövning"},
    {"q": "Vad är ett ekvationssystem?", "a": ["Två eller flera ekvationer med två eller flera obekanta", "En ekvation med en obekant", "Ett uttryck utan likhetstecken", "En värdetabell"], "ord": "Ekvationssystem / Grafisk metod"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Z3-image9.jpg\" alt=\"\"><small>Linjerna är <i>y</i> = 2<i>x</i> – 3 och <i>y</i> = 9 – <i>x</i>. Vad är lösningen till ekvationssystemet?</small>", "a": ["<i>x</i> = 4, <i>y</i> = 5", "<i>x</i> = 2, <i>y</i> = 1", "<i>x</i> = 6, <i>y</i> = 3", "<i>x</i> = 0, <i>y</i> = –3"], "ord": "Ekvationssystem / Grafisk metod"},
    {"typ": "sf", "q": "Man kan lösa ett ekvationssystem grafiskt genom att hitta linjernas skärningspunkt.", "svar": true, "ord": "Ekvationssystem / Grafisk metod"},
    {"q": "Vad kallas det när man löser ett ekvationssystem genom att räkna i stället för att rita?", "a": ["Algebraisk metod", "Grafisk metod", "Prövning", "Avrundning"], "ord": "Algebraisk metod"},
    {"q": "Vad gör man i ersättningsmetoden?", "a": ["Man ersätter en obekant med ett uttryck från den andra ekvationen", "Man ritar två linjer", "Man gissar och prövar", "Man kvadrerar båda leden"], "ord": "Ersättningsmetoden"},
    {"q": "<i>y</i> = 2<i>x</i> och <i>x</i> + <i>y</i> = 9<br><small>Lös med ersättningsmetoden. Vad är <i>x</i>?</small>", "a": ["<i>x</i> = 3", "<i>x</i> = 6", "<i>x</i> = 9", "<i>x</i> = 4,5"], "ord": "Ersättningsmetoden"},
    {"typ": "ordning", "q": "Lös <i>y</i> = <i>x</i> + 1 och 2<i>x</i> + <i>y</i> = 10 med ersättningsmetoden.<br><small>Klicka på stegen i rätt ordning.</small>", "a": ["Ersätt <i>y</i>: 2<i>x</i> + (<i>x</i> + 1) = 10", "3<i>x</i> + 1 = 10", "<i>x</i> = 3", "<i>y</i> = 3 + 1 = 4"], "ord": "Ersättningsmetoden"}
  ] },
  '9-4-1': { fragor: [
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Z4-image2.jpg\" alt=\"\"><small>Vad har hänt med triangeln?</small>", "a": ["Den har speglats i <i>y</i>-axeln", "Den har roterats ett halvt varv", "Den har förstorats", "Den har flyttats uppåt"], "ord": "Spegling"},
    {"typ": "sf", "q": "Vid en spegling hamnar bilden lika långt från symmetrilinjen, men på andra sidan.", "svar": true, "ord": "Spegling"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Z4-image3.jpg\" alt=\"\"><small>Vad kallas de röda linjerna?</small>", "a": ["Symmetrilinjer", "Diagonaler", "Radier", "Skärningspunkter"], "ord": "Spegelsymmetri / Symmetrilinje"},
    {"q": "Hur många symmetrilinjer har en kvadrat?", "a": ["4", "2", "1", "8"], "ord": "Spegelsymmetri / Symmetrilinje"},
    {"typ": "ordning", "q": "Klicka på figurerna från minst till flest symmetrilinjer", "a": ["Bokstaven F", "Bokstaven A", "En rektangel", "En kvadrat"], "ord": "Spegelsymmetri / Symmetrilinje"},
    {"q": "Vilken bokstav har rotationssymmetri (ett halvt varv)?", "a": ["S", "A", "E", "T"], "ord": "Rotationssymmetri"},
    {"typ": "sf", "q": "En liksidig triangel har rotationssymmetri.", "svar": true, "ord": "Rotationssymmetri"},
    {"q": "Vad betyder det att två figurer är kongruenta?", "a": ["De har samma form och samma storlek", "De har samma form men olika storlek", "De har samma area men olika form", "De har bara samma omkrets"], "ord": "Likformighet / Kongruens"},
    {"q": "Två trianglar är likformiga. Vad gäller alltid?", "a": ["Motsvarande vinklar är lika stora", "Alla sidor är lika långa", "Areorna är lika stora", "De är kongruenta"], "ord": "Likformighet / Kongruens"},
    {"typ": "sf", "q": "Likformiga figurer är alltid lika stora.", "svar": false, "ord": "Likformighet / Kongruens"},
    {"q": "En triangel har sidorna 3, 4 och 5 cm. En likformig triangel har den kortaste sidan 6 cm. Hur lång är den längsta sidan?", "a": ["10 cm", "8 cm", "6 cm", "15 cm"], "ord": "Likformighet / Kongruens"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Z4-image12.jpg\" alt=\"\"><small>DE är parallell med BC. Vad säger topptriangelsatsen?</small>", "a": ["Triangeln ADE är likformig med triangeln ABC", "Triangeln ADE är kongruent med triangeln ABC", "DE är lika lång som BC", "Vinkeln A är rät"], "ord": "Topptriangelsatsen"},
    {"q": "<span class=\"fr\"><i><i>x</i></i><i>5</i></span> = <span class=\"fr\"><i>3</i><i>2</i></span><br><small>Vilken ekvation får du med korsmultiplikation?</small>", "a": ["2<i>x</i> = 15", "5<i>x</i> = 6", "<i>x</i> = 30", "2<i>x</i> = 8"], "ord": "Korsmultiplikation"},
    {"q": "Lös ekvationen <span class=\"fr\"><i><i>x</i></i><i>6</i></span> = <span class=\"fr\"><i>4</i><i>3</i></span> med korsmultiplikation.", "a": ["<i>x</i> = 8", "<i>x</i> = 2", "<i>x</i> = 4,5", "<i>x</i> = 24"], "ord": "Korsmultiplikation"},
    {"typ": "ordning", "q": "Lös <span class=\"fr\"><i><i>x</i></i><i>4</i></span> = <span class=\"fr\"><i>9</i><i>6</i></span>.<br><small>Klicka på stegen i rätt ordning.</small>", "a": ["Korsmultiplicera: 6<i>x</i> = 4 · 9", "6<i>x</i> = 36", "Dividera båda leden med 6", "<i>x</i> = 6"], "ord": "Korsmultiplikation"}
  ] },
  '9-4-2': { fragor: [
    {"q": "Längdskalan är 1 : 50. Hur lång är 3 cm på ritningen i verkligheten?", "a": ["150 cm", "53 cm", "16,7 cm", "1,5 cm"], "ord": "Längdskala"},
    {"q": "En sträcka är 4 cm på kartan och 2 km i verkligheten. Vilken är längdskalan?", "a": ["1 : 50 000", "1 : 500", "1 : 2 000", "4 : 2"], "ord": "Längdskala"},
    {"typ": "ordning", "q": "Klicka på längdskalorna från störst förminskning till störst förstoring", "a": ["1 : 100", "1 : 4", "3 : 1", "10 : 1"], "ord": "Längdskala"},
    {"q": "Längdskalan är 1 : 3. Vad blir areaskalan?", "a": ["1 : 9", "1 : 3", "1 : 6", "1 : 27"], "ord": "Areaskala"},
    {"typ": "sf", "q": "Om längdskalan är 1 : 10 är areaskalan 1 : 100.", "svar": true, "ord": "Areaskala"},
    {"q": "Längdskalan är 2 : 1. Vad blir volymskalan?", "a": ["8 : 1", "4 : 1", "2 : 1", "6 : 1"], "ord": "Volymskala"},
    {"q": "En modell byggs i längdskalan 1 : 10. Verklighetens volym är 1 000 dm³. Vad är modellens volym?", "a": ["1 dm³", "100 dm³", "10 dm³", "0,1 dm³"], "ord": "Volymskala"},
    {"q": "Vad kallas den längsta sidan i en rätvinklig triangel?", "a": ["Hypotenusa", "Katet", "Diagonal", "Höjd"], "ord": "Hypotenusa"},
    {"typ": "sf", "q": "Hypotenusan ligger mitt emot den räta vinkeln.", "svar": true, "ord": "Hypotenusa"},
    {"q": "Vad kallas de två kortare sidorna i en rätvinklig triangel?", "a": ["Kateter", "Hypotenusor", "Diagonaler", "Radier"], "ord": "Katet"},
    {"q": "Vilket samband är Pythagoras sats? (<i>a</i> och <i>b</i> är kateter, <i>c</i> är hypotenusa)", "a": ["<i>a</i><sup>2</sup> + <i>b</i><sup>2</sup> = <i>c</i><sup>2</sup>", "<i>a</i> + <i>b</i> = <i>c</i>", "<i>a</i><sup>2</sup> + <i>c</i><sup>2</sup> = <i>b</i><sup>2</sup>", "<i>a</i> · <i>b</i> = <i>c</i>"], "ord": "Pythagoras sats / Andragradsekvation"},
    {"q": "<img class=\"kq-bild\" src=\"bilder/begrepp/Z4-image20.jpg\" alt=\"\"><small>Kateterna är 3 cm och 4 cm. Hur lång är hypotenusan <i>c</i>?</small>", "a": ["5 cm", "7 cm", "25 cm", "12 cm"], "ord": "Pythagoras sats / Andragradsekvation"},
    {"q": "Kateterna är 6 cm och 8 cm. Hur lång är hypotenusan?", "a": ["10 cm", "14 cm", "100 cm", "48 cm"], "ord": "Pythagoras sats / Andragradsekvation"},
    {"q": "Hypotenusan är 13 cm och ena kateten är 5 cm. Hur lång är den andra kateten?", "a": ["12 cm", "8 cm", "18 cm", "144 cm"], "ord": "Pythagoras sats / Andragradsekvation"},
    {"typ": "sf", "q": "En triangel med sidorna 5 cm, 6 cm och 8 cm är rätvinklig.", "svar": false, "ord": "Pythagoras sats / Andragradsekvation"},
    {"q": "Lös andragradsekvationen <i>x</i><sup>2</sup> = 49 när <i>x</i> &gt; 0.", "a": ["<i>x</i> = 7", "<i>x</i> = 24,5", "<i>x</i> = 49", "<i>x</i> = 14"], "ord": "Pythagoras sats / Andragradsekvation"},
    {"typ": "ordning", "q": "Kateterna är 5 cm och 12 cm. Räkna ut hypotenusan.<br><small>Klicka på stegen i rätt ordning.</small>", "a": ["5<sup>2</sup> + 12<sup>2</sup> = <i>c</i><sup>2</sup>", "25 + 144 = <i>c</i><sup>2</sup>", "<i>c</i><sup>2</sup> = 169", "<i>c</i> = 13 cm"], "ord": "Pythagoras sats / Andragradsekvation"}
  ] },
  '9-5-1': { fragor: [
    {"q": "Fem elever fick 4, 7, 7, 9 och 13 poäng. Vad är medelvärdet?", "a": ["8", "7", "9", "9,5"], "ord": "Medelvärde"},
    {"q": "Vad är medianen av talen 3, 9, 4, 12 och 6?", "a": ["6", "4", "9", "6,8"], "ord": "Median"},
    {"q": "Vad är medianen av talen 2, 5, 8 och 10?", "a": ["6,5", "5", "8", "6,25"], "ord": "Median"},
    {"q": "Vad är typvärdet av talen 5, 3, 5, 8, 3, 5 och 2?", "a": ["5", "3", "8", "4,4"], "ord": "Typvärde"},
    {"q": "Under en dag var temperaturen som lägst –4 °C och som högst 9 °C. Vad är variationsbredden?", "a": ["13 °C", "5 °C", "9 °C", "2,5 °C"], "ord": "Variationsbredd"},
    {"typ": "sf", "q": "Medelvärde, median och typvärde är lägesmått.", "svar": true, "ord": "Lägesmått", "forkl": "Ett lägesmått beskriver var mitten eller tyngdpunkten i ett statistiskt material ligger. Medelvärde, median och typvärde är lägesmått."},
    {"typ": "sf", "q": "Variationsbredd är ett lägesmått.", "svar": false, "ord": "Variationsbredd"},
    {"q": "Vilket lägesmått påverkas mest av ett enda mycket högt värde?", "a": ["Medelvärdet", "Medianen", "Typvärdet", "Inget av dem"], "ord": "Medelvärde"},
    {"q": "20 elever svarade på en enkät och 5 av dem valde fotboll. Vad är den relativa frekvensen för fotboll?", "a": ["25 %", "5 %", "20 %", "15 %"], "ord": "Relativ frekvens"},
    {"q": "I en enkät svarade 8 elever ”katt”. Vad kallas talet 8?", "a": ["Frekvensen för katt", "Relativa frekvensen för katt", "Medianen", "Variationsbredden"], "ord": "Frekvens"},
    {"q": "I ett cirkeldiagram är 25 % av cirkeln blå. Hur stor är medelpunktsvinkeln för den blå delen?", "a": ["90°", "25°", "45°", "120°"], "ord": "Cirkeldiagram"},
    {"q": "Du vill visa hur din längd har förändrats från 7 till 15 års ålder. Vilket diagram passar bäst?", "a": ["Linjediagram", "Cirkeldiagram", "Stapeldiagram", "Träddiagram"], "ord": "Linjediagram"},
    {"q": "Du vill jämföra hur många elever som valt äpple, banan och päron. Vilket diagram passar bäst?", "a": ["Stapeldiagram", "Linjediagram", "Träddiagram", "Koordinatsystem"], "ord": "Stapeldiagram"},
    {"typ": "ordning", "q": "Klicka på stegen i rätt ordning för att hitta medianen.", "a": ["Skriv talen i storleksordning", "Räkna hur många tal det finns", "Hitta talet i mitten", "Finns två tal i mitten: ta medelvärdet av dem"], "ord": "Median"},
    {"q": "Medelvärdet av fyra tal är 6. Tre av talen är 4, 5 och 7. Vilket är det fjärde talet?", "a": ["8", "6", "2", "10"], "ord": "Medelvärde"}
  ] },
  '9-5-2': { fragor: [
    {"q": "Du kastar två mynt. Hur många möjliga utfall finns det?", "a": ["4", "2", "3", "8"], "ord": "Utfall"},
    {"q": "Du kastar en vanlig tärning. Vad är sannolikheten att få minst 5?", "a": ["<span class=\"fr\"><i>1</i><i>3</i></span>", "<span class=\"fr\"><i>1</i><i>6</i></span>", "<span class=\"fr\"><i>5</i><i>6</i></span>", "<span class=\"fr\"><i>1</i><i>2</i></span>"], "ord": "Sannolikhet"},
    {"typ": "sf", "q": "En sannolikhet kan vara större än 1.", "svar": false, "ord": "Sannolikhet"},
    {"q": "Vilket av talen kan INTE vara en sannolikhet?", "a": ["1,2", "0", "0,75", "100 %"], "ord": "Sannolikhet"},
    {"q": "Sannolikheten att det regnar i morgon är 0,3. Vad är sannolikheten att det inte regnar?", "a": ["0,7", "0,3", "1,3", "0,03"], "ord": "Sannolikhet"},
    {"typ": "sf", "q": "Att dra en lott är ett slumpmässigt försök.", "svar": true, "ord": "Slumpmässigt försök"},
    {"q": "Vilket försök har en likformig sannolikhetsfördelning?", "a": ["Kasta en vanlig tärning", "Dra en kula ur en påse med 3 röda och 1 blå", "Snurra ett lyckohjul med olika stora fält", "Gissa om det snöar en dag i juli"], "ord": "Likformig sannolikhetsfördelning"},
    {"typ": "sf", "q": "En påse har 5 röda och 1 grön kula. Att dra en kula ur påsen har en olikformig sannolikhetsfördelning.", "svar": true, "ord": "Olikformig sannolikhetsfördelning"},
    {"q": "Du kastar ett mynt två gånger. Vad kallas de två kasten?", "a": ["Oberoende händelser", "Beroende händelser", "Omöjliga händelser", "Säkra händelser"], "ord": "Oberoende händelser"},
    {"q": "Du kastar ett mynt två gånger. Vad är sannolikheten att få krona båda gångerna?", "a": ["<span class=\"fr\"><i>1</i><i>4</i></span>", "<span class=\"fr\"><i>1</i><i>2</i></span>", "<span class=\"fr\"><i>3</i><i>4</i></span>", "<span class=\"fr\"><i>1</i><i>8</i></span>"], "ord": "Oberoende händelser"},
    {"q": "Du drar två kort ur en kortlek utan att lägga tillbaka det första. Vad kallas dragningarna?", "a": ["Beroende händelser", "Oberoende händelser", "Omöjliga händelser", "Säkra händelser"], "ord": "Beroende händelser"},
    {"q": "En påse har 3 röda och 2 blå kulor. Du tar två kulor utan att lägga tillbaka. Vad är sannolikheten att båda är röda?", "a": ["<span class=\"fr\"><i>3</i><i>10</i></span>", "<span class=\"fr\"><i>9</i><i>25</i></span>", "<span class=\"fr\"><i>3</i><i>5</i></span>", "<span class=\"fr\"><i>1</i><i>2</i></span>"], "ord": "Beroende händelser"},
    {"q": "Hur räknar man ut sannolikheten längs en gren i ett träddiagram?", "a": ["Man multiplicerar sannolikheterna", "Man adderar sannolikheterna", "Man subtraherar sannolikheterna", "Man dividerar sannolikheterna"], "ord": "Träddiagram"},
    {"q": "Du kastar en vanlig tärning 600 gånger. Ungefär hur många sexor kan du vänta dig?", "a": ["100", "60", "6", "300"], "ord": "Sannolikhet"},
    {"typ": "ordning", "q": "Klicka på händelserna från minst till mest sannolik.", "a": ["Få 7 med en vanlig tärning", "Få en sexa med en tärning", "Få krona med ett mynt", "Få ett tal under 7 med en tärning"], "ord": "Sannolikhet"}
  ] }
};

(function () {
  var rot = document.getElementById('kq');
  if (!rot) return;
  var FARG = [['A', 'kq-r'], ['B', 'kq-b'], ['C', 'kq-g'], ['D', 'kq-gr']];
  var inst = { kap: null, ak: 7, tid: 20, ljud: true };
  var KAP = window.QUIZ_KAP || {};
  // Nivåfärger (Nikola 2026-11-06: inte böckernas/årskursernas färger).
  // Nikola 2026-11-07: en blå skala per nivå. Nivå 1 klarblå, nivå 2 kungsblå, nivå 3 petrolblå.
  var AKBG = { 7: '#1F2A44', 8: '#1F2A44', 9: '#1F2A44' };   // quizet: samma lugna mörkblå på alla nivåer (Nikola 2026-11-07)
  var AKF = { 7: '#B8D9E9', 8: '#92B9D6', 9: '#7FBBC6' };    // rutornas kant och symbolcirklar
  var AKL = { 7: '#E6F3FA', 8: '#C7DEF0', 9: '#D1EEF2' };    // vald nivåflik
  // Områdets färg ur Organic-skalan (2026-11-07)
  var OMRF = function (n) { return /^Tal/.test(n) ? '#4F77A3' : /Algebra/.test(n) ? '#6B7A5A' : /Geometri/.test(n) ? '#B8664F' : /Samband/.test(n) ? '#B88A45' : /Statistik|Sannolikhet/.test(n) ? '#7D76A0' : '#4F8A93'; };
  function bakgrund() { var st = rot.style; st.setProperty('--kqbg', AKBG[inst.ak] || '#1F2A44'); st.setProperty('--kqf', AKF[inst.ak]); st.setProperty('--kql', AKL[inst.ak]); }
  var STJARNOR = true;  // 1–3 stjärnor på nivåflikarna
  // Nycklarna 7/8/9 visas som Nivå 1/2/3 (Nikola 2026-11-06)
  var NIVA = { 7: 1, 8: 2, 9: 3 };
  var QUIZ_NAMN = { '9-5-1': 'Statistik', '9-5-2': 'Sannolikhet' };
  var SYMB = function (namn) {
    return /^Tal/.test(namn) ? '123' : /Algebra/.test(namn) ? '<i>x</i>' : /Geometri/.test(namn) ? '△' : /Samband/.test(namn) ? '↗' : /Statistik|Sannolikhet/.test(namn) ? '%' : '?';
  };
  var spel, timer, ac;

  function besk(ord) {
    var d = (inst.kap || '').split('-'), alla = (window.BG_BOK || []).filter(function (x) { return x.ord === ord; });
    var b = alla.filter(function (x) { return String(x.ak) === d[0] && String(x.kap) === d[1]; })[0] || alla[0];
    return b ? b.besk.replace(/\n/g, ' ') : '';
  }
  // Fast blandning: samma frö ger alltid samma ordning
  function slump(fro) {
    var h = 1779033703;
    for (var i = 0; i < fro.length; i++) { h = Math.imul(h ^ fro.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
    return function () { h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
  }
  function blanda(a, fro) { var r = slump(fro); a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function nytt() { return { fragor: blanda(QUIZ_DATA[inst.kap].fragor, inst.kap), i: 0, poang: 0, ratt: 0, svit: 0 }; }
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
    return 'Nivå ' + NIVA[p[0]] + (namn ? ' · ' + namn : '') + ' · ' + (QUIZ_NAMN[id] || 'Quiz ' + p[2]);
  }

  // Välj nivå, område och quiz
  // Områdesfärger som på Testa dig (Organic): [huvudfärg, mörk text, ljus bakgrund]
  var OMRL = function (n) {
    return /^Tal/.test(n) ? ['#7597BC', '#35577A', '#E8F2FA'] : /Algebra/.test(n) ? ['#818B72', '#4C5940', '#EAF4EA'] : /Geometri/.test(n) ? ['#CA8871', '#8A4532', '#FDEBE7']
      : /Samband/.test(n) ? ['#D8A964', '#75541C', '#FFF6E3'] : ['#A29BBF', '#4F4880', '#EFEAF9'];
  };
  var TARN = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="9" cy="9" r="1.2" fill="currentColor"/><circle cx="15" cy="15" r="1.2" fill="currentColor"/><circle cx="15" cy="9" r="1.2" fill="currentColor"/><circle cx="9" cy="15" r="1.2" fill="currentColor"/></svg>';
  // Egna ikoner per nivå och område, så att nivåerna känns olika (Nikola 2026-11-07)
  var NIK_SVG = function (d, fyll) { return '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>'; };
  var NIK = {
    tal: ['123', '½', '√<i style="border-top:2px solid;padding:0 2px;margin-left:-1px">x</i>'],
    alg: ['<i>x</i>', '2<i>x</i>', '<i>x</i>²'],
    geo: [NIK_SVG('<path d="M12 4 20.5 19h-17z"/>'), NIK_SVG('<path d="M5 8l7-4 7 4v8l-7 4-7-4z"/><path d="M5 8l7 4 7-4M12 12v8"/>'), NIK_SVG('<path d="M5 19V6l14 13z"/><path d="M5 15h4v4"/>')],
    sam: [NIK_SVG('<path d="M5 19 19 5"/><path d="M9 5h10v10"/>'), '%', NIK_SVG('<path d="M4 4v16h16"/><path d="M6.5 17 19 7"/>')],
    sta: [NIK_SVG('<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="9" cy="9" r="1.1" fill="currentColor"/><circle cx="15" cy="15" r="1.1" fill="currentColor"/><circle cx="15" cy="9" r="1.1" fill="currentColor"/><circle cx="9" cy="15" r="1.1" fill="currentColor"/>'),
          NIK_SVG('<path d="M3.5 20h17"/><path d="M6.5 20v-6M10.5 20V8M14.5 20v-9M18.5 20V5" stroke-width="3"/>'),
          NIK_SVG('<path d="M5 12l7-5.5M5 12l7 5.5M12 6.5l7-3M12 6.5l7 3M12 17.5l7-3M12 17.5l7 3"/><circle cx="4.5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="6.5" r="1.4" fill="currentColor"/><circle cx="12" cy="17.5" r="1.4" fill="currentColor"/>')]
  };
  var nivaIkon = function (ak, namn) {
    var o = /Algebra/.test(namn) ? 'alg' : /Geometri/.test(namn) ? 'geo' : /Samband|Procent/.test(namn) ? 'sam' : /Statistik|Sannolik/.test(namn) ? 'sta' : 'tal';
    return NIK[o][Math.max(0, Math.min(2, ak - 7))];
  };
  // Välj nivå, område och quiz – ljus vy med samma upplägg som Testa dig (Nikola 2026-11-07)
  function valj() {
    clearInterval(timer);
    bakgrund();
    rot.classList.add('kq-ljus');
    var flikar = [7, 8, 9].map(function (a) {
      return '<button type="button" data-ak="' + a + '" class="kq-lflik' + (a === inst.ak ? ' on' : '') + '">Nivå ' + NIVA[a] + '<span>' + '★★★'.slice(0, NIVA[a]) + '</span></button>';
    }).join('');
    // Samma ordning på alla nivåer, som åk 7: Tal, Algebra, Geometri, Samband, Statistik/sannolikhet
    var ORDN = [/^Tal/, /Algebra/, /Geometri/, /Samband/, /Statistik|Sannolikhet/];
    var rang = function (k) { for (var i = 0; i < ORDN.length; i++) if (ORDN[i].test(k[1])) return i; return 9; };
    var kap = (KAP[inst.ak] || []).slice().sort(function (x, y) { return rang(x) - rang(y); }).map(function (k) {
      var q = [1, 2].map(function (n) {
        var id = inst.ak + '-' + k[0] + '-' + n, d = QUIZ_DATA[id];
        return d ? '<button type="button" data-id="' + id + '">' + (QUIZ_NAMN[id] || 'Quiz ' + n) + '<small>' + d.fragor.length + ' frågor</small></button>'
          : '<span class="kq-lsnart">Quiz ' + n + '<small>Kommer snart</small></span>';
      }).join('');
      var c = OMRL(k[1]), sy = nivaIkon(inst.ak, k[1]);
      return '<div class="kq-lruta" style="--o:' + c[0] + ';--od:' + c[1] + ';--ol:' + c[2] + '"><div class="kq-lt"><span class="kq-lsym">' + sy + '</span><b>' + k[1] + '</b></div><div class="kq-lknappar">' + q + '</div></div>';
    }).join('');
    rot.innerHTML = '<div class="kapblock kq-lblock"><h2>Vad vill du tävla om?</h2><p class="kq-lintro">Välj nivå och område. Nivå 1 är grundläggande begrepp och nivå 3 de mest utmanande. Varje område har två quiz.</p>'
      + '<div class="kq-lflikar">' + flikar + '</div><div class="kq-lval">' + kap + '</div></div>';
    rot.querySelectorAll('[data-ak]').forEach(function (b) { b.onclick = function () { inst.ak = +b.dataset.ak; valj(); }; });
    rot.querySelectorAll('[data-id]').forEach(function (b) { b.onclick = function () { inst.kap = b.dataset.id; start(); rot.scrollIntoView({ block: 'start' }); }; });
  }

  function start() {
    rot.classList.remove('kq-ljus');
    if (inst.kap) inst.ak = +inst.kap.split('-')[0];
    bakgrund();
    clearInterval(timer);
    var d = QUIZ_DATA[inst.kap];
    rot.innerHTML = '<div class="kq-start"><button type="button" class="kq-bak">← Välj ett annat quiz</button><div class="kq-logo">?</div><h2>Mattequiz</h2><p class="kq-kap">' + titel(inst.kap) + ' · ' + d.fragor.length + ' frågor</p>'
      + val('Tid per fråga', [[10, '10 s'], [20, '20 s'], [30, '30 s'], [0, 'Ingen tid']], inst.tid)
      + val('Ljud', [[1, 'På'], [0, 'Av']], inst.ljud ? 1 : 0)
      + '<button type="button" class="kq-go">Starta quizet ▶</button>'
      + '<p class="kq-tips">Alla får samma frågor i samma ordning. Starta samma quiz och jämför poängen efteråt: en mot en, i par eller i lag. Ju snabbare rätt svar, desto fler poäng.</p></div>';
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
      spel = nytt();
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
    else if (typ === 'ordning') {
      alt = blanda(f.a.map(function (t, i) { return { t: t, n: i }; }), inst.kap + f.q + f.a.join());
      if (alt.every(function (x, i) { return x.n === i; })) alt.push(alt.shift());  // aldrig redan i rätt ordning
    }
    else alt = blanda(f.a.map(function (t, i) { return { t: t, r: i === 0 }; }), inst.kap + f.q + f.a.join());
    var etikett = { sf: 'Sant eller falskt?', ordning: 'Sätt i ordning' }[typ];
    var farg = typ === 'sf' ? [['', 'kq-b'], ['', 'kq-r']] : FARG;
    rot.innerHTML = huvud() + '<div class="kq-fraga"><div class="kq-q">' + (etikett ? '<span class="kq-typ">' + etikett + '</span>' : '') + '<div>' + f.q + '</div></div>'
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
    rot.querySelector('.kq-igen').onclick = function () { spel = nytt(); fraga(); };
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
  var nv = { 1: 7, 2: 8, 3: 9 }[u.get('niva')];
  if (nv) inst.ak = nv;
  if (QUIZ_DATA[u.get('quiz')]) { inst.kap = u.get('quiz'); inst.ak = +inst.kap.split('-')[0]; start(); } else valj();
})();
