#!/usr/bin/env python3
# Bygger Mattekompassens webbplats till /mnt/project-files/webbplats/. Kör: python3 bygg.py
import os, html
UT = '/mnt/project-files/webbplats'

AR = {
 7: dict(bok='X', ink='#3E5A3A', mid='#6F9477', l='#C9D8C2', vl='#E3ECDD', w='#EEF3EA', hi='#C9E3A0'),
 8: dict(bok='Y', ink='#164E63', mid='#2E8FA3', l='#BFE4EA', vl='#DDF1F4', w='#EAF6F8', hi='#A8E0EA'),
 9: dict(bok='Z', ink='#4E3A5E', mid='#8A6FA0', l='#DCD0E6', vl='#ECE5F1', w='#F6F2F9', hi='#D6C3E8'),
}
# Nio ikoner på årskurssidan: (filnamn, sidnamn, rubrik)
MATERIAL = [
 ('06_Problemlosning', 'problemlosning', 'Problemlösning'),
 ('07_Lektioner', 'lektioner', 'Lektioner'),
 ('08_Tillbakablick', 'tillbakablick', 'Tillbakablick'),
 ('09_Mal_och_framgangskriterier', 'mal-och-framgangskriterier', 'Mål och framgångskriterier'),
 ('10_Trygg_start', 'trygg-start', 'Trygg start'),
 ('11_Repetition', 'repetition', 'Repetition'),
 ('12_Diagnos', 'diagnos', 'Diagnos'),
 ('13_Test', 'test', 'Test'),
 ('14_Tidsplan_och_arbetsgang', 'tidsplan-och-arbetsgang', 'Tidsplan och arbetsgång'),
]
MENY = [('Startsida', 'index.html'), ('Åk 7', 'ak7.html'), ('Åk 8', 'ak8.html'), ('Åk 9', 'ak9.html'),
        ('Ämnesord på olika språk', 'amnesord.html'), ('Bedömning', 'bedomning.html')]
NEUTRAL = dict(ink='#2C4152', hi='#F2CD69', w='#F3EEE4', vl='#E9E2D4', l='#D9D4C8', mid='#5F6368')

CSS = """
*{box-sizing:border-box}
body{margin:0;font-family:Inter,system-ui,sans-serif;color:#292A28;background:var(--w);line-height:1.5}
a{color:inherit}
img{max-width:100%;display:block}
.wrap{max-width:1200px;margin:0 auto;padding:0 24px}
header{background:var(--ink);color:#fff}
header .wrap{display:flex;align-items:center;justify-content:space-between;gap:20px;padding-top:18px;padding-bottom:18px;flex-wrap:wrap}
.logo{display:flex;align-items:center;gap:12px;text-decoration:none}
.logo img{width:46px;height:46px;background:#fff;border-radius:50%}
.logo b{font-size:22px;display:block;line-height:1.1}.logo small{opacity:.75;font-size:13px}
nav{display:flex;flex-wrap:wrap;gap:6px 24px;font-size:16px}
nav a{text-decoration:none;opacity:.85;padding:4px 0;border-bottom:3px solid transparent}
nav a:hover{opacity:1}
nav a.on{opacity:1;font-weight:700;border-bottom-color:var(--hi)}
.hero{background:var(--ink);color:#fff}
.hero .wrap{display:flex;align-items:center;justify-content:space-between;gap:40px;padding-top:40px;padding-bottom:50px}
.hero h1{font-size:clamp(38px,6vw,64px);line-height:1.08;margin:0 0 18px;letter-spacing:-1px}
.hero h1 span{color:var(--hi)}
.hero p{font-size:clamp(17px,2vw,21px);opacity:.9;margin:0;max-width:640px}
.hero .bild{width:min(420px,40vw);flex:none}
.wave{display:block;width:100%;height:70px}
main section{padding:20px 0 80px}
h2{font-size:clamp(28px,4vw,40px);margin:0 0 6px;color:var(--ink)}
p.sub{color:#4A4E52;font-size:18px;margin:0 0 30px}
.kort{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.kort a img{filter:drop-shadow(0 8px 18px rgba(0,0,0,.12));transition:transform .15s}
.kort a:hover img,.ikoner a:hover img{transform:translateY(-4px)}
.num{width:200px;height:200px;border-radius:40px;background:var(--vl);color:var(--ink);font-weight:900;font-size:150px;display:flex;align-items:center;justify-content:center;flex:none;line-height:1}
.etikett{font-weight:700;color:var(--hi);font-size:20px;letter-spacing:2px}
.ikoner{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;max-width:900px;margin:0 auto}
.ikoner img{filter:drop-shadow(0 6px 14px rgba(0,0,0,.10));transition:transform .15s}
.center{text-align:center}
.ruta{background:var(--vl);border:2px solid var(--l);border-radius:24px;padding:28px 32px;max-width:800px}
.ruta h3{margin:0 0 6px;color:var(--ink)}
.knapp{display:inline-block;margin-top:24px;padding:14px 26px;border-radius:999px;background:var(--ink);color:#fff;text-decoration:none;font-weight:700}
footer{background:var(--ink);color:#fff}
footer .wrap{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;padding-top:34px;padding-bottom:34px;font-size:15px}
footer span{opacity:.8}
.sr{position:absolute;left:-9999px}
@media (max-width:800px){
 .hero .wrap{flex-direction:column-reverse;align-items:flex-start}
 .hero .bild{width:260px}
 .num{display:none}
 .kort{grid-template-columns:1fr}
 .ikoner{grid-template-columns:repeat(2,1fr);gap:18px}
}
"""

def wave(top, bottom):
    return (f'<svg class="wave" style="background:{bottom}" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">'
            f'<path d="M0 0 H1440 V25 C1100 80 700 0 360 45 C200 64 80 54 0 35 Z" fill="{top}"/></svg>')

def sida(fil, titel, aktiv, c, kropp, rot=''):
    meny = ''.join(f'<a href="{rot}{h}" class="{"on" if n == aktiv else ""}">{n}</a>' for n, h in MENY)
    var = ';'.join(f'--{k}:{v}' for k, v in c.items() if k in ('ink', 'hi', 'w', 'vl', 'l', 'mid'))
    doc = f"""<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(titel)} – Mattekompassen</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<link rel="icon" href="{rot}bilder/logo-mattekompassen.png">
<link rel="stylesheet" href="{rot}stil.css">
<style>:root{{{var}}}</style></head><body>
<header><div class="wrap"><a class="logo" href="{rot}index.html"><img src="{rot}bilder/logo-mattekompassen.png" alt=""><span><b>Mattekompassen</b><small>Örtagårdsskolan 7–9</small></span></a>
<nav aria-label="Huvudmeny">{meny}</nav></div></header>
{kropp}
<footer><div class="wrap"><b>Mattekompassen</b><span>Matematik för åk 7–9 på Örtagårdsskolan. Frågor? Prata med din mattelärare.</span></div></footer>
</body></html>"""
    p = os.path.join(UT, fil)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w').write(doc)

def bygg():
    open(os.path.join(UT, 'stil.css'), 'w').write(CSS)
    # Startsida
    kort = ''.join(f'<a href="ak{k}.html"><img src="bilder/arskurs-{k}.png" alt="Åk {k}, Matematik {AR[k]["bok"]}: planering, lektioner, problemlösning, repetitionsuppgifter och mycket mer"></a>' for k in AR)
    sida('index.html', 'Startsida', 'Startsida', NEUTRAL, f"""
<div class="hero"><div class="wrap"><div><h1>Hitta rätt i <span>matematiken</span></h1>
<p>Här hittar du planering, lektioner, problemlösning och repetition för åk 7–9. Välj din årskurs nedan för att börja.</p></div>
<img class="bild" src="bilder/kompass-matte.png" alt="Kompass med räknesätten plus, gånger, minus och delat med"></div></div>
{wave(NEUTRAL['ink'], NEUTRAL['w'])}
<main><section><div class="wrap"><h2>Välj din årskurs</h2><p class="sub">Allt för din årskurs och din bok samlat på ett ställe.</p>
<div class="kort">{kort}</div></div></section></main>""")
    # Årskurssidor och undersidor
    for k, c in AR.items():
        ikoner = ''.join(f'<a href="ak{k}/{s}.html"><img src="bilder/ak{k}/{f}.png" alt="{t}"></a>' for f, s, t in MATERIAL)
        sida(f'ak{k}.html', f'Åk {k}', f'Åk {k}', c, f"""
<div class="hero"><div class="wrap" style="justify-content:flex-start"><div class="num" aria-hidden="true">{k}</div>
<div><div class="etikett">MATEMATIK {c['bok']}</div><h1>Åk {k}</h1>
<p>Planering, lektioner, problemlösning, repetitionsuppgifter och mycket mer för Matematik {c['bok']}.</p></div></div></div>
{wave(c['ink'], c['w'])}
<main><section class="center"><div class="wrap"><h2>Lektionsmaterial</h2><p class="sub">Allt du behöver till lektionerna i åk {k}.</p>
<div class="ikoner">{ikoner}</div></div></section></main>""")
        for f, s, t in MATERIAL:
            sida(f'ak{k}/{s}.html', f'{t} – åk {k}', f'Åk {k}', c, f"""
<div class="hero"><div class="wrap" style="justify-content:flex-start"><img src="../bilder/ak{k}/{f}.png" alt="" style="width:170px;border-radius:28px">
<div><div class="etikett">ÅK {k} · MATEMATIK {c['bok']}</div><h1>{t}</h1></div></div></div>
{wave(c['ink'], c['w'])}
<main><section><div class="wrap"><div class="ruta"><h3>Materialet kommer snart</h3>
<p style="margin:0">Här lägger läraren upp {t.lower()} för åk {k}.</p></div>
<a class="knapp" href="../ak{k}.html">← Tillbaka till åk {k}</a></div></section></main>""", rot='../')
    # Ämnesord och Bedömning
    for fil, t, text in [('amnesord.html', 'Ämnesord på olika språk', 'Här kommer viktiga matteord förklarade på olika språk.'),
                         ('bedomning.html', 'Bedömning', 'Här kommer information om hur du visar vad du kan i matematik.')]:
        sida(fil, t, t, NEUTRAL, f"""
<div class="hero"><div class="wrap"><div><h1>{t}</h1><p>{text}</p></div></div></div>
{wave(NEUTRAL['ink'], NEUTRAL['w'])}
<main><section><div class="wrap"><div class="ruta"><h3>Materialet kommer snart</h3><p style="margin:0">Sidan fylls på under läsåret.</p></div>
<a class="knapp" href="index.html">← Till startsidan</a></div></section></main>""")
    open(os.path.join(UT, '.nojekyll'), 'w').write('')

if __name__ == '__main__':
    bygg()
