#!/usr/bin/env python3
# Bygger Mattekompassens webbplats till /mnt/project-files/webbplats/. Kör: python3 bygg.py
import os, html, json, shutil
UT = '/mnt/project-files/webbplats'
# Drive-länkar per årskurs och sida (lektioner, tillbakablick), se lankar.json
LANKAR = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'lankar.json'), encoding='utf-8'))

AR = {
 7: dict(bok='X', ink='#3E5A3A', mid='#6F9477', l='#C9D8C2', vl='#E3ECDD', w='#F3EEE4', hi='#C9E3A0'),
 8: dict(bok='Y', ink='#164E63', mid='#2E8FA3', l='#BFE4EA', vl='#DDF1F4', w='#F3EEE4', hi='#A8E0EA'),
 9: dict(bok='Z', ink='#5C2A45', mid='#9A5A7A', l='#E3C8D5', vl='#F2E3EA', w='#F3EEE4', hi='#EBC6D6'),
}
# Nio ikoner på årskurssidan: (filnamn, sidnamn, rubrik)
MATERIAL = [
 ('07_Lektioner', 'lektioner', 'Lektioner'),
 ('08_Tillbakablick', 'tillbakablick', 'Tillbakablick'),
 ('10_Trygg_start', 'trygg-start', 'Trygg start'),
 ('06_Problemlosning', 'problemlosning', 'Problemlösning'),
 ('11_Repetition', 'repetition', 'Repetition'),
 ('12_Diagnos', 'diagnos', 'Diagnos'),
 ('13_Test', 'test', 'Test'),
]
MENY = [('Startsida', 'index.html'), ('Åk 7', 'ak7.html'), ('Åk 8', 'ak8.html'), ('Åk 9', 'ak9.html')]
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
.hero .wrap{display:flex;align-items:center;justify-content:space-between;gap:32px;padding-top:6px;padding-bottom:10px}
.hero h1{font-size:clamp(30px,4vw,46px);line-height:1.1;margin:0 0 10px;letter-spacing:-1px}
.hero h1 span{color:var(--hi)}
.hero h1.streck::after{content:"";display:block;width:90px;height:6px;border-radius:3px;background:#F2CD69;margin-top:10px}
.hero p{font-size:clamp(16px,1.6vw,19px);opacity:.9;margin:0;max-width:640px}
.hero .bild{width:min(185px,26vw);flex:none}
.hero.start .wrap{flex-direction:row;justify-content:flex-start;align-items:center;gap:28px;padding-top:14px;padding-bottom:18px}.hero.start .bild{width:150px}.hero.start h1{margin:0}
.wave{display:block;width:100%;height:40px}
main section{padding:6px 0 60px}
h2{font-size:clamp(24px,3vw,32px);margin:0 0 4px;color:var(--ink)}
p.sub{color:#4A4E52;font-size:17px;margin:0 0 22px}
.kort{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.kort a img{filter:drop-shadow(0 8px 18px rgba(0,0,0,.12));transition:transform .15s}
.kort a:hover img,.ikoner a:hover img{transform:translateY(-4px)}
.num{width:120px;height:120px;border-radius:26px;background:var(--vl);color:var(--ink);font-weight:900;font-size:88px;display:flex;align-items:center;justify-content:center;flex:none;line-height:1}
.etikett{font-weight:700;color:var(--hi);font-size:16px;letter-spacing:2px}
.ikoner{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;max-width:860px;margin:0 auto}
.ikoner img{filter:drop-shadow(0 6px 14px rgba(0,0,0,.10));transition:transform .15s}
.center{text-align:center}
.pl h2{font-size:26px;margin:36px 0 12px;color:var(--ink)}.pl p.ingress{font-size:18px;max-width:760px;line-height:1.6}
.niva{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;max-width:960px}
.niva div,.strat div{background:#fff8;border:2px solid var(--l);border-radius:18px;padding:18px 20px}.niva b{display:inline-block;background:var(--ink);color:#fff;border-radius:999px;padding:3px 12px;font-size:14px;margin-bottom:8px}.niva p,.strat p{margin:6px 0 0;line-height:1.5}
.strat{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;max-width:960px}.strat h3{margin:0;font-size:18px}
.arlank{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;max-width:960px}.arlank a{display:block;border-radius:20px;padding:22px 24px;color:#fff;text-decoration:none;font-weight:800;font-size:22px}.arlank a small{display:block;font-weight:500;font-size:15px;opacity:.9;margin-top:4px}
.omlank{display:inline-block;margin:0 0 20px;font-weight:700;color:var(--ink)}
.ruta{background:var(--vl);border:2px solid var(--l);border-radius:24px;padding:28px 32px;max-width:800px}
.ruta h3{margin:0 0 6px;color:var(--ink)}
.kap{background:var(--vl);border:2px solid var(--l);border-radius:20px;margin:0 0 14px;max-width:860px}
.kap summary{cursor:pointer;padding:16px 24px;font-weight:700;font-size:19px;color:var(--ink);list-style:none;display:flex;justify-content:space-between;align-items:center}
.kap summary::-webkit-details-marker{display:none}
.kap summary::after{content:'+';font-size:26px;line-height:1}.kap[open] summary::after{content:'–'}.kap.tom summary{cursor:default;opacity:.7}.kap.tom summary::after{content:''}
.kap summary small{font-weight:500;opacity:.7;font-size:15px;margin-left:8px}
.lankar{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px;padding:0 24px 20px}
.lankar a{display:block;background:var(--w);border:1.5px solid var(--l);border-radius:12px;padding:11px 14px;text-decoration:none;color:var(--ink);font-weight:600}
.lankar a.sprak{display:flex;align-items:center;gap:10px}.lankar a.sprak img{width:24px;height:18px;border-radius:3px;object-fit:cover;box-shadow:0 0 0 1px rgba(0,0,0,.12)}
.lankar a:hover{border-color:var(--mid)}
.lankar .rad{display:flex;gap:6px}.lankar .rad>a:first-child,.lankar .rad>span{flex:1;display:block;background:var(--w);border:1.5px solid var(--l);border-radius:12px;padding:11px 14px;color:var(--ink);font-weight:600}.lankar .rad>span{opacity:.75}.lankar .rad b{color:var(--mid);margin-right:6px}
.lankar a.mal{flex:none;display:flex;align-items:center;background:var(--ink);border-color:var(--ink);color:#fff;font-size:14px;padding:0 14px}.lankar a.mal:hover{opacity:.85}.lankar a b{color:var(--mid);margin-right:6px}
.knapp{display:inline-block;margin-top:24px;padding:14px 26px;border-radius:999px;background:var(--ink);color:#fff;text-decoration:none;font-weight:700}

.valj{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;max-width:860px}
.valj button,.knapp2,#trana form button{font:inherit;cursor:pointer;border:0;border-radius:14px}
.valj button{background:var(--vl);border:2px solid var(--l);padding:16px 18px;text-align:left;font-weight:700;color:var(--ink);font-size:17px;transition:transform .15s}
.valj button:hover{transform:translateY(-3px);border-color:var(--mid)}.valj button b{display:block;color:var(--mid);font-size:14px}
.ingress{font-size:18px;max-width:760px}
.kort-t{background:var(--vl);border:2px solid var(--l);border-radius:24px;padding:24px 28px;max-width:700px}
.topp{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-weight:700;color:var(--ink);font-size:15px}
.bar{height:10px;background:#fff;border-radius:99px;margin:12px 0 4px;overflow:hidden}.bar i{display:block;height:100%;background:var(--mid);border-radius:99px;transition:width .3s}
.fraga{font-size:clamp(24px,4vw,34px);font-weight:800;color:var(--ink);margin:18px 0}
#trana form{display:flex;gap:10px;flex-wrap:wrap}
#trana input{font:inherit;font-size:22px;padding:10px 14px;border:2px solid var(--l);border-radius:14px;width:220px;max-width:100%}
#trana input:focus{outline:3px solid var(--mid);outline-offset:1px}
#trana form button,.knapp2{background:var(--ink);color:#fff;font-weight:700;padding:12px 24px;font-size:18px}
.knapp2.sek{background:#fff;color:var(--ink);border:2px solid var(--ink)}
.fb{min-height:28px;font-size:17px;margin:14px 0 6px}.fb.ok{color:#2E7D32;font-weight:800;font-size:22px}.fb.nej{color:#96505A}.fb.tipsrad{color:#5F4B12}
.lank{background:none;border:0;font:inherit;color:var(--ink);font-weight:700;text-decoration:underline;cursor:pointer;padding:0}
.fb .lank{margin-left:8px}
.match{display:grid;grid-template-columns:1fr 1.6fr;gap:12px;margin-top:8px}.match>div{display:flex;flex-direction:column;gap:10px}
.mb{font:inherit;font-size:16px;text-align:left;background:#fff;border:2px solid var(--l);border-radius:12px;padding:12px 14px;cursor:pointer;color:#292A28;transition:transform .1s,background .2s}
.match>div:first-child .mb{font-weight:700;color:var(--ink)}
.mb:hover{border-color:var(--mid)}.mb.vald{border-color:var(--ink);background:var(--l);transform:scale(1.02)}
.mb.par{background:#DDEFD9;border-color:#2E7D32;color:#2E5E30;cursor:default;opacity:.75}.mb.fel{background:#F6DADA;border-color:#B95E52;animation:skak .3s}
@keyframes skak{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.valj button.spec{background:var(--ink);color:#fff;border-color:var(--ink)}.valj button.spec b{color:var(--hi)}
.match-kort{max-width:860px}.match>div{min-width:0}.mb{overflow-wrap:anywhere}
.typer{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;max-width:1150px}@media (max-width:1000px){.typer{grid-template-columns:1fr 1fr}}
.typ{display:block;background:var(--ink);border-radius:16px;padding:20px 24px;text-decoration:none;color:#fff;font-weight:700;font-size:19px;transition:transform .15s}
.typ:hover{transform:translateY(-3px)}.kapblock{margin-bottom:22px;background:#DFE9D8;border-radius:22px;padding:20px 24px 24px;max-width:1150px}.kapblock:nth-child(even){background:#E4EDE6}.kapblock h2{margin:0 0 14px}.typ:nth-child(1){background:#4F6B57}.typ:nth-child(2){background:#5A7A63}.typ:nth-child(3){background:#557566}.typ:nth-child(4){background:#63785B}.typ:nth-child(5){background:#667A55}.exempel{background:#fff;border:2px solid var(--l);border-radius:18px;padding:22px;margin:16px 0 4px;text-align:center;font-size:clamp(28px,5vw,42px);font-weight:800;color:#292A28}.exempel mark{white-space:nowrap;background:#F8E7A3;color:inherit;border-radius:8px;padding:0 6px;box-shadow:inset 0 -5px #E5AD45}.exempel .fig{max-width:100%;height:auto;display:inline-block}.exempel .tab{margin:0 auto;font-size:24px}.br{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;line-height:1.15;margin:0 4px}.br>span+span{border-top:3px solid currentColor}.fraga.liten{font-size:22px;margin:12px 0}.fraga.mening{font-size:clamp(22px,3.4vw,30px);line-height:1.6}.hj{color:#5F6368;margin:6px 0 10px}.ordbank{display:flex;flex-wrap:wrap;gap:10px}.ordk{font:inherit;font-size:20px;font-weight:700;padding:10px 18px;border-radius:12px;background:#fff;border:2px solid var(--l);color:var(--ink);cursor:grab;touch-action:manipulation}.ordk:hover{border-color:var(--mid)}.ordk.fel{background:#F6DADA;border-color:#B95E52;opacity:.55;text-decoration:line-through}.ordk.par{background:#DDEFD9;border-color:#2E7D32}.lucka.drop{min-width:150px;min-height:1.3em;vertical-align:bottom;border-bottom-style:dashed;background:#ffffff80;border-radius:6px 6px 0 0}.lucka.drop.over{background:#fff}.lucka.fylld{border-bottom-style:solid}.tab{border-collapse:collapse;margin:14px 0;font-size:17px;font-weight:600}.tab th,.tab td{border:1.5px solid var(--l);padding:6px 12px;text-align:center;background:#fff}.tab th{background:var(--l)}.typ b{display:block;color:#E9F1DF;font-size:14px;font-weight:600}
a.knapp2{text-decoration:none;display:inline-block}
.alt{display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:620px}.alt .mb{font-size:19px;font-weight:700;color:var(--ink);text-align:center;padding:14px}
.mb.kvar{animation:none;opacity:1}.forkl{color:#292A28;font-weight:500;font-size:16px}.fb.ok .forkl{display:block;margin-top:4px}
.lucka{display:inline-block;min-width:80px;border-bottom:4px solid var(--mid);color:var(--mid);text-align:center;padding:0 8px}.lucka.fylld{color:#2E7D32;border-color:#2E7D32}
.trana-ruta{max-width:640px;margin:34px auto 0;text-align:left}
.rutor .info{gap:16px;padding:20px 20px}.rutor .info .ik{width:60px;height:60px;flex:0 0 60px}.rutor .info .ik svg{width:32px;height:32px}.rutor .info h3{font-size:19px;line-height:1.25;margin:0 0 6px}.rutor .info p{font-size:15px;line-height:1.45;margin:0}.rutor .info .pil{margin-left:auto}
.rutor{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:34px}
.info{display:flex;align-items:center;gap:24px;background:var(--vl);border:2px solid var(--l);border-radius:24px;padding:22px 26px;text-decoration:none;transition:transform .15s}
.info:hover{transform:translateY(-3px)}
.info .ik{width:84px;height:84px;border-radius:50%;background:var(--ink);flex:none;display:flex;align-items:center;justify-content:center}
.info .ik svg{width:48px;height:48px}
.info h3{margin:0 0 4px;font-size:22px;color:var(--ink)}
.info p{margin:0;color:#4A4E52;font-size:16px}
.info .pil{margin-left:auto;font-size:26px;color:var(--ink);font-weight:700}
footer{background:var(--ink);color:#fff}
footer .wrap{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;padding-top:34px;padding-bottom:34px;font-size:15px}
footer span{opacity:.8}
.sr{position:absolute;left:-9999px}
@media (max-width:800px){
 .hero.start .wrap{flex-direction:row;align-items:center;gap:16px;padding-top:6px;padding-bottom:14px}.hero.start .bild{width:92px}.hero.start h1{font-size:28px}
 .hero .wrap{flex-direction:column-reverse;align-items:flex-start}
 .hero .bild{width:150px}
 .num{display:none}
 .kort{grid-template-columns:1fr}
 .rutor{grid-template-columns:1fr}
 .kort-t{padding:18px 14px}.match{gap:8px}.mb{font-size:14px;padding:10px}
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

TRANA_AR = (7, 8, 9)
TRANA_FARG = {8: '<style>.kapblock{background:#DCEBEE}.kapblock:nth-child(even){background:#E4EFF1}.typ:nth-child(1){background:#3F6470}.typ:nth-child(2){background:#4A6E78}.typ:nth-child(3){background:#4E7270}.typ:nth-child(4){background:#5A727D}.typ:nth-child(5){background:#557883}.typ b{color:#E6F2F4}</style>', 9: '<style>.kapblock{background:#F2E3EA}.kapblock:nth-child(even){background:#F6ECF0}.typ:nth-child(1){background:#6A3A54}.typ:nth-child(2){background:#74445E}.typ:nth-child(3){background:#6B4258}.typ:nth-child(4){background:#7A4C63}.typ:nth-child(5){background:#704860}.typ b{color:#F7E9F0}</style>'}

def trana_ruta(k):
    if k not in TRANA_AR:
        return ''
    return (f'<a class="info trana-ruta" href="ak{k}/trana.html"><span class="ik"><svg viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">'
            '<rect x="9" y="9" width="30" height="21" rx="2.5"/><path d="M4 35h40l-3 4H7z"/><path d="M18 20l4 4 8-8" stroke="#F2CD69"/></svg></span><span><h3>Interaktiva övningar</h3><p>Klicka, dra och få svar direkt. Öva på räkning och matteord.</p></span><span class="pil">→</span></a>')

def innehall(k, s, t):
    d = LANKAR.get(str(k), {})
    lek = s == 'lektioner'
    # Under Lektioner visas även Mål och framgångskriterier (per avsnitt) och Tidsplan och arbetsgång (sist i kapitlet)
    tp = d.get('tidsplan-och-arbetsgang', {}) if lek else {}
    # Uppgifterna (PDF) ligger först i kapitlet på Test- och Repetition-sidan, före genomgången
    extra_upg = d.get({'test': 'testuppgifter', 'repetition': 'repetitionsuppgifter'}.get(s, ''), {})
    mal = d.get('mal-och-framgangskriterier', {}) if lek else {}
    sm = d.get('sammanfattning', {}) if lek else {}  # en sammanfattning per kapitel, efter avsnitten
    if s not in d and not tp and not mal and not sm:
        return f'<div class="ruta"><h3>Materialet kommer snart</h3><p style="margin:0">Här lägger läraren upp {t.lower()} för åk {k}.</p></div>'
    drive = lambda i: f'https://drive.google.com/file/d/{i}/view'
    ut = []
    for nr, namn in d['kapitel']:
        filer = extra_upg.get(nr, []) + (d.get(s, {}).get(nr) or [])
        if filer or tp.get(nr) or mal.get(nr) or sm.get(nr):
            if lek:
                rader = {}
                for a, i in filer:
                    rader.setdefault(a.split(' ', 1)[0], [a, None, None])[1] = i
                for a, i in mal.get(nr, []):
                    rader.setdefault(a.split(' ', 1)[0], [a, None, None])[2] = i
                lank = ''
                for a, li, mi in sorted(rader.values(), key=lambda r: [int(x) for x in r[0].split(' ', 1)[0].split('.')]):
                    n, rest = a.split(' ', 1)
                    namnet = f'<b>{html.escape(n)}</b>{html.escape(rest)}'
                    lank += '<div class="rad">' + (f'<a href="{drive(li)}" target="_blank" rel="noopener">{namnet}</a>' if li else f'<span>{namnet}</span>')
                    lank += (f'<a class="mal" href="{drive(mi)}" target="_blank" rel="noopener">Mål</a>' if mi else '') + '</div>'
            else:
                lank = ''.join(f'<a href="{drive(i)}" target="_blank" rel="noopener"><b>{html.escape(a.split(' ',1)[0])}</b>{html.escape(a.split(' ',1)[1])}</a>' for a, i in filer)
            lank += ''.join(f'<a href="{drive(i)}" target="_blank" rel="noopener">{html.escape(a)}</a>' for a, i in sm.get(nr, []) + tp.get(nr, []))
            ut.append(f'<details class="kap"><summary><span>Kapitel {nr}<small>{html.escape(namn)}</small></span></summary><div class="lankar">{lank}</div></details>')
        else:
            ut.append(f'<details class="kap tom"><summary><span>Kapitel {nr}<small>{html.escape(namn)} · kommer snart</small></span></summary></details>')
    return ''.join(ut)

def extra(fil):
    if fil == 'amnesord.html' and LANKAR.get('amnesord'):
        shutil.copytree(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'flaggor'), os.path.join(UT, 'bilder', 'flaggor'), dirs_exist_ok=True)
        lank = ''.join(f'<a class="sprak" href="https://drive.google.com/file/d/{i}/view" target="_blank" rel="noopener"><img src="bilder/flaggor/{f}.svg" alt="">{html.escape(n)}</a>' for n, i, f in LANKAR['amnesord'])
        return f'<div class="ruta"><h3>Termer för matematikundervisning</h3><p style="margin:0 0 14px">Klicka på ditt språk för att öppna ordlistan (PDF).</p><div class="lankar" style="padding:0">{lank}</div></div>'
    return '<div class="ruta"><h3>Materialet kommer snart</h3><p style="margin:0">Sidan fylls på under läsåret.</p></div>'

def bygg():
    open(os.path.join(UT, 'stil.css'), 'w').write(CSS)
    # Startsida
    kort = ''.join(f'<a href="ak{k}.html"><img src="bilder/arskurs-{k}.png" alt="Åk {k}, Matematik {AR[k]["bok"]}: planering, lektioner, problemlösning, repetitionsuppgifter och mycket mer"></a>' for k in AR)
    sida('index.html', 'Startsida', 'Startsida', NEUTRAL, f"""
<div class="hero start"><div class="wrap"><img class="bild" src="bilder/kompass-matte.png" alt="Kompass med räknesätten plus, gånger, minus och delat med">
<h1>Hitta rätt i <span>matematiken</span></h1></div></div>
{wave(NEUTRAL['ink'], NEUTRAL['w'])}
<main><section><div class="wrap"><h2>Välj din årskurs</h2><p class="sub">Allt för din årskurs och din bok samlat på ett ställe.</p>
<div class="kort">{kort}</div>
<div class="rutor">
<a class="info" href="bedomning.html"><span class="ik"><svg viewBox="0 0 48 48" fill="none" stroke-linejoin="round" stroke-linecap="round"><rect x="9" y="7" width="30" height="36" rx="4" stroke="#fff" stroke-width="3.5"/><rect x="17" y="3" width="14" height="8" rx="3" fill="#F2CD69"/><path d="M15 21l3 3 6-6M15 33l3 3 6-6" stroke="#F2CD69" stroke-width="3.5"/><path d="M28 22h6M28 34h6" stroke="#fff" stroke-width="3.5"/></svg></span><span><h3>Hur bedöms du?</h3><p>Läs om hur du visar vad du kan i matematik och vad som krävs för olika betyg.</p></span><span class="pil">→</span></a>
<a class="info" href="hjalp.html"><span class="ik"><svg viewBox="0 0 48 48" fill="none" stroke-linejoin="round" stroke-linecap="round"><circle cx="24" cy="24" r="17" stroke="#fff" stroke-width="3.5"/><circle cx="24" cy="24" r="7" stroke="#fff" stroke-width="3.5"/><path d="M12 12l7 7M36 12l-7 7M12 36l7-7M36 36l-7-7" stroke="#F2CD69" stroke-width="4"/></svg></span><span><h3>Så får du hjälp i matte</h3><p>Se vilket stöd du kan få och vad som hjälper dig att lära dig matte.</p></span><span class="pil">→</span></a>
<a class="info" href="nationella-prov.html"><span class="ik"><svg viewBox="0 0 48 48" fill="none" stroke-linejoin="round" stroke-linecap="round"><circle cx="24" cy="19" r="12" stroke="#fff" stroke-width="3.5"/><path d="M17 29l-4 14 11-5 11 5-4-14" stroke="#fff" stroke-width="3.5"/><path d="M24 12l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" fill="#F2CD69"/></svg></span><span><h3>Träna inför nationella prov</h3><p>Öva på uppgifter som liknar de nationella proven i matematik.</p></span><span class="pil">→</span></a>
<a class="info" href="amnesord.html"><span class="ik"><svg viewBox="0 0 48 48" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M6 8h22a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H15l-6 5v-5H6a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3z" stroke="#fff" stroke-width="3.5"/><path d="M24 20h17a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-1v5l-6-5H24a3 3 0 0 1-3-3V23a3 3 0 0 1 3-3z" fill="#F2CD69"/></svg></span><span><h3>Förstår du inte ett ord?</h3><p>Titta i Ämnesord på olika språk. Där finns viktiga matteord förklarade på ditt språk.</p></span><span class="pil">→</span></a>
</div></div></section></main>""")
    # Årskurssidor och undersidor
    for k, c in AR.items():
        ikoner = ''.join(f'<a href="ak{k}/{s}.html"><img src="bilder/ak{k}/{f}.png" alt="{t}"></a>' for f, s, t in MATERIAL)
        if k in TRANA_AR:
            ikoner += f'<a href="ak{k}/trana.html"><img src="bilder/ak{k}/16_Interaktiva_ovningar.png" alt="Interaktiva övningar"></a>'
        sida(f'ak{k}.html', f'Åk {k}', f'Åk {k}', c, f"""
<div class="hero"><div class="wrap" style="justify-content:flex-start"><div class="num" aria-hidden="true">{k}</div>
<div><div class="etikett">MATEMATIK {c['bok']}</div><h1 class="streck">Åk {k}</h1>
<p>Planering, lektioner, problemlösning, repetitionsuppgifter och mycket mer för Matematik {c['bok']}.</p></div></div></div>
{wave(c['ink'], c['w'])}
<main><section class="center"><div class="wrap"><h2>Lektionsmaterial</h2><p class="sub">Allt du behöver till lektionerna i åk {k}.</p>
<div class="ikoner">{ikoner}</div></div></section></main>""")
        if k in TRANA_AR:
            hero = lambda t, p: f"""
<div class="hero"><div class="wrap" style="justify-content:flex-start"><div class="num" aria-hidden="true">{k}</div>
<div><div class="etikett">ÅK {k} · MATEMATIK {c['bok']} · INTERAKTIVA ÖVNINGAR</div><h1>{t}</h1><p>{p}</p></div></div></div>
{wave(c['ink'], c['w'])}{TRANA_FARG.get(k, '')}"""
            typer = [('trana-rakna.html', '🔢', 'Räkneträning', 'Per avsnitt'),
                     ('trana-exempel.html', '🔍', 'Från exempel till ord', 'Titta och välj'),
                     ('trana-dra.html', '🧲', 'Dra ordet', 'Ord i mening'),
                     ('trana-begrepp.html', '🧩', 'Matcha begrepp', 'Hela kapitlet'),
                     ('trana-quiz.html', '❓', 'Quiz', 'Flervalsfrågor')]
            snart = []
            kapitel = ''.join(f'<div class="kapblock" id="kap{nr}"><h2>Kapitel {nr} <span style="font-weight:500;opacity:.7">{html.escape(namn)}</span></h2><div class="typer">'
                              + ''.join(f'<a class="typ" href="{h}?kap={nr}"><b>{p}</b>{e} {t}</a>' for h, e, t, p in typer) + '</div></div>'
                              for nr, namn in LANKAR[str(k)]['kapitel'])
            tillbaka = '<a class="knapp" href="trana.html">← Alla övningar</a>'
            sida(f'ak{k}/trana.html', f'Interaktiva övningar – åk {k}', f'Åk {k}', c, hero('Interaktiva övningar', 'Klicka, dra och få svar direkt. Välj kapitel och typ av övning.') + f"""
<main><section><div class="wrap">{kapitel}
<a class="knapp" href="../ak{k}.html">← Tillbaka till åk {k}</a></div></section></main>""", rot='../')
            for fil, lage, t, p in [('trana-rakna.html', 'rakna', 'Räkneträning', 'Korta övningar med nya tal varje gång.'),
                                    ('trana-exempel.html', 'exempel', 'Från exempel till ord', 'Titta på exemplet och välj rätt ord.'),
                                    ('trana-dra.html', 'dra', 'Dra ordet till rätt lucka', 'Sätt in rätt matteord i meningen.'),
                                    ('trana-begrepp.html', 'begrepp', 'Matcha begrepp', 'Para ihop begrepp med rätt förklaring.'),
                                    ('trana-quiz.html', 'quiz', 'Quiz', 'Välj rätt svar bland fyra alternativ.')]:
                sida(f'ak{k}/{fil}', f'{t} – åk {k}', f'Åk {k}', c, hero(t, p) + f"""
<main><section><div class="wrap"><h2 id="kaprubrik">Kapitel</h2>
<div id="trana" data-lage="{lage}"></div>
{tillbaka}</div></section></main>
<script src="../trana-ak{k}.js"></script><script src="../trana.js"></script>""", rot='../')
        for f, s, t in MATERIAL:
            sida(f'ak{k}/{s}.html', f'{t} – åk {k}', f'Åk {k}', c, f"""
<div class="hero"><div class="wrap" style="justify-content:flex-start"><img src="../bilder/ak{k}/{f}.png" alt="" style="width:110px;border-radius:20px">
<div><div class="etikett">ÅK {k} · MATEMATIK {c['bok']}</div><h1>{t}</h1></div></div></div>
{wave(c['ink'], c['w'])}
<main><section><div class="wrap">{'<a class="omlank" href="../problemlosning.html">Så arbetar vi med problemlösning: nivåer och strategier →</a>' if s == 'problemlosning' else ''}{innehall(k, s, t)}
<a class="knapp" href="../ak{k}.html">← Tillbaka till åk {k}</a></div></section></main>""", rot='../')
    # Ämnesord och Bedömning (länkas från rutorna på startsidan, inte från menyn)
    for fil, t, text in [('amnesord.html', 'Ämnesord på olika språk', 'Viktiga matteord på svenska och ditt språk. Välj ditt språk nedan.'),
                         ('bedomning.html', 'Bedömning', 'Här kommer information om hur du visar vad du kan i matematik.'),
                         ('hjalp.html', 'Så får du hjälp i matte', 'Här kommer information om vilket stöd du kan få i matematik.'),
                         ('nationella-prov.html', 'Träna inför nationella prov', 'Här kommer uppgifter att öva på inför de nationella proven.')]:
        sida(fil, t, '', NEUTRAL, f"""
<div class="hero"><div class="wrap"><div><h1>{t}</h1><p>{text}</p></div></div></div>
{wave(NEUTRAL['ink'], NEUTRAL['w'])}
<main><section><div class="wrap">{extra(fil)}
<a class="knapp" href="index.html">← Till startsidan</a></div></section></main>""")
    # Gemensam sida om problemlösning (länkas från årskursernas problemlösningssidor)
    arl = ''.join(f'<a href="ak{k}/problemlosning.html" style="background:{AR[k]["ink"]}">Åk {k}<small>Matematik {AR[k]["bok"]} · problemlösning per kapitel</small></a>' for k in AR)
    sida('problemlosning.html', 'Problemlösning', '', NEUTRAL, f"""
<div class="hero"><div class="wrap"><div><h1>Problemlösning</h1><p>Att lösa problem är att hitta en väg när du inte direkt vet hur du ska göra.</p></div></div></div>
{wave(NEUTRAL['ink'], NEUTRAL['w'])}
<main><section><div class="wrap pl">
<p class="ingress">Till varje avsnitt i boken finns ett problemlösningspass. Uppgifterna blir svårare steg för steg, så att alla kan börja och alla kan utmanas. Svar och förklaringar visas efter hand, så att du kan jämföra med hur du själv tänkte.</p>
<h2>Progression: tre nivåer</h2>
<div class="niva"><div><b>Nivå 1</b><h3 style="margin:0">Kom igång</h3><p>Problem som liknar det du just lärt dig. Du använder metoden från lektionen i en ny situation.</p></div><div><b>Nivå 2</b><h3 style="margin:0">Utmana dig</h3><p>Problem i flera steg. Du behöver välja metod själv och kanske kombinera det du kan.</p></div><div><b>Nivå 3</b><h3 style="margin:0">Fördjupa dig</h3><p>Öppnare och klurigare problem. Det finns ofta flera vägar till svaret, och du behöver förklara hur du tänker.</p></div></div>
<p class="ingress" style="margin-top:16px">Problemen växer också genom årskurserna. I åk 7 lägger vi grunden med tal, mönster och enkla ekvationer. I åk 8 och åk 9 blir problemen längre och mer abstrakta, och du förväntas oftare välja strategi själv och motivera dina slutsatser.</p>
<h2>Strategier som hjälper dig</h2>
<div class="strat"><div><h3>Rita en bild</h3><p>En skiss gör problemet tydligare och visar vad du vet och vad du söker.</p></div><div><h3>Gör en tabell</h3><p>Ordna informationen i en tabell så att du ser samband och mönster.</p></div><div><h3>Leta efter mönster</h3><p>Undersök några fall och se vad som upprepas. Använd mönstret för att hitta svaret.</p></div><div><h3>Gissa och pröva</h3><p>Gör en rimlig gissning, testa den och förbättra den tills den stämmer.</p></div><div><h3>Arbeta baklänges</h3><p>Börja i slutet. Vad måste ha hänt innan? Räkna dig tillbaka till starten.</p></div><div><h3>Förenkla problemet</h3><p>Prova med mindre eller enklare tal först. Använd sedan samma idé på det riktiga problemet.</p></div><div><h3>Ställ upp en ekvation</h3><p>Kalla det okända för x, skriv en ekvation och lös den.</p></div><div><h3>Kontrollera svaret</h3><p>Är svaret rimligt? Svarar du på frågan? Pröva svaret i problemet.</p></div></div>
<h2>Välj årskurs</h2>
<div class="arlank">{arl}</div>
<a class="knapp" href="index.html">← Till startsidan</a></div></section></main>""")
    for js in ('trana.js', 'trana-ak7.js', 'trana-ak8.js', 'trana-ak9.js'):
        shutil.copy(os.path.join(os.path.dirname(os.path.abspath(__file__)), js), UT)
    open(os.path.join(UT, '.nojekyll'), 'w').write('')

if __name__ == '__main__':
    bygg()
