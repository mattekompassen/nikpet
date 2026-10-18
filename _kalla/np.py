# Elevsida om nationella provet i matematik åk 9 (info från Skolverket, lärarinformation VT 2027), för nationella-prov.html
# OBS: originalproven är sekretessbelagda. Övningsuppgifter här ska ha egna tal.
import html
DAGAR = [('Onsdag 12 maj 2027', 'Delprov A och B'), ('Fredag 14 maj 2027', 'Delprov C och D')]
DELPROV = [  # bokstav, färg, ljus, tid, räknare?, typ, var svaren skrivs
 ('A', '#B95E52', '#F7E3DE', '40 min', False, 'Korta svar och flervalsfrågor.', 'Du skriver svaren i provhäftet.'),
 ('B', '#426B89', '#DDEBF3', '80 min', True, 'Uppgifter där du visar hela lösningen.', 'Du skriver lösningarna på separat papper.'),
 ('C', '#8A5E22', '#F8EBC9', '40 min', True, 'Korta svar och flervalsfrågor.', 'Du skriver svaren i provhäftet.'),
 ('D', '#5A7552', '#E3ECDD', '80 min', True, 'Uppgifter där du visar hela lösningen.', 'Du skriver lösningarna på separat papper.'),
]
TANK = {
 'A': ['Räkna i huvudet eller med skriftlig räkning på kladdpapperet.', 'Bara svaret räknas, så skriv det tydligt på rätt plats.', 'Vid flerval: läs alla alternativ innan du väljer.'],
 'B': ['Visa hela lösningen: uträkning, förklaring och svar.', 'Även en del av lösningen kan ge poäng, så skriv det du kommer fram till.', 'Läs formelbladet om du behöver en formel.'],
 'C': ['Använd räknaren, men tänk efter om svaret är rimligt.', 'Bara svaret räknas, så skriv det tydligt med rätt enhet.', 'Fastnar du? Hoppa vidare och kom tillbaka.'],
 'D': ['Visa hela lösningen, även när du använder räknare.', 'Skriv vad du räknar ut, till exempel "Arean är …".', 'Avsluta med ett tydligt svar och kontrollera att det är rimligt.'],
}
TA_MED = ['Penna och sudd', 'Linjal', 'Räknare (delprov B, C och D)']
FAR_EJ = ['Mobiltelefon', 'Smartklocka', 'Räknare och formelblad på delprov A']
TIPS = [('Före provet', ['Öva huvudräkning och skriftlig räkning, för delprov A görs utan räknare.',
                         'Titta på formelbladet i förväg så att du vet vad som står där.',
                         'Repetera med Repetition och Interaktiva övningar här på Mattekompassen.',
                         'Sov ordentligt och ät frukost.']),
        ('Under provet', ['Läs varje uppgift noga. Vad ska du ta reda på?',
                          'Börja med det du kan. Hoppa över och kom tillbaka sedan.',
                          'Visa alla steg i delprov B och D. Även en del av lösningen kan ge poäng.',
                          'Kontrollera att svaret är rimligt och har rätt enhet.'])]
CSS = """<style>
.np{max-width:1100px}
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
.np .kommer{background:#FBF8F2;border:2px dashed #D9D4C8;border-radius:20px;padding:20px 24px;max-width:900px;line-height:1.55}
@media(max-width:1000px){.np .dp{grid-template-columns:1fr 1fr}}
@media(max-width:620px){.np .dp,.np .dagar,.np .hm,.np .tipsg{grid-template-columns:1fr}}
</style>"""
def sida():
    e = html.escape
    ut = [CSS, '<div class="np">',
          '<p class="ingress">I åk 9 skriver alla elever i Sverige nationellt prov i matematik. Provet visar vad du kan och hjälper läraren när betyget sätts. Provet har fyra delar och skrivs på papper i skolan.</p>',
          '<h2 class="grupp" style="--g:#F2CD69">När är provet?</h2><p class="under">Vårterminen 2027. Provet börjar klockan 9.00 båda dagarna.</p><div class="dagar">']
    ut += [f'<div><b>{e(d)}</b>{e(t)}</div>' for d, t in DAGAR]
    ut.append('</div><h2 class="grupp" style="--g:#2C4152">Fyra delprov</h2><p class="under">Varje delprov har en egen tid och egna regler för räknare och formelblad.</p><div class="dp">')
    for b, g, gl, tid, rk, typ, var in DELPROV:
        r = 'Räknare och formelblad' if rk else 'Utan räknare och formelblad'
        ut.append(f'<div class="dk" style="--g:{g};--gl:{gl}"><div class="bok"><span>{b}</span><div><h3>Delprov {b}</h3><div class="tid">{tid}</div></div></div><p>{e(typ)}</p><p>{e(var)}</p><span class="rk">{r}</span><span class="tp">Tänk på</span><ul>' + ''.join(f'<li>{e(x)}</li>' for x in TANK[b]) + '</ul></div>')
    ut.append('</div><h2 class="grupp" style="--g:#5A7552">Vad får du ha med dig?</h2><p class="under">Kladdpapper finns i skolan. Provet har inget muntligt delprov.</p><div class="hm">')
    ut.append('<div class="ja"><h3>Det här får du använda</h3><ul>' + ''.join(f'<li>{e(t)}</li>' for t in TA_MED) + '<li>Formelblad (delprov B, C och D)</li></ul></div>')
    ut.append('<div class="nej"><h3>Det här får du inte använda</h3><ul>' + ''.join(f'<li>{e(t)}</li>' for t in FAR_EJ) + '</ul></div></div>')
    ut.append('<h2 class="grupp" style="--g:#B95E52">Tips</h2><div class="tipsg">')
    for t, li in TIPS:
        ut.append(f'<div><h3>{e(t)}</h3><ul>' + ''.join(f'<li>{e(x)}</li>' for x in li) + '</ul></div>')
    ut.append('</div>')
    ut.append('<div class="info2"><h3>Behöver du anpassningar?</h3>Skolan kan anpassa hur provet genomförs, till exempel med mer tid eller ett lugnare rum. Kraven är desamma för alla. Prata med din mattelärare i god tid före provet.</div>')
    ut.append('<h2 class="grupp" style="--g:#426B89">Så kan uppgifterna se ut</h2><p class="under">Här ser du exempel på hur uppgifterna i varje delprov kan se ut. Uppgifterna är egna och har andra tal än de riktiga proven.</p><div class="ex">')
    ut += [f'<div style="--g:{g}"><b>Delprov {b}</b><p>Exempeluppgifter kommer snart.</p></div>' for b, g, *_ in DELPROV]
    ut.append('</div><div class="kommer">Under läsåret kommer fler övningsprov att läggas upp här.</div>')
    ut.append('</div>')
    return ''.join(ut)
