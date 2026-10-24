#!/usr/bin/env python3
# Bygger Mattekompassens webbplats till /mnt/project-files/webbplats/. Kör: python3 bygg.py
import os, html, json, shutil
UT = '/mnt/project-files/webbplats'
# Drive-länkar per årskurs och sida (lektioner, tillbakablick), se lankar.json
LANKAR = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'lankar.json'), encoding='utf-8'))

# Organic färgskala (Nikola 2026-10-24): (skalans färg, mörk nyans för text/knappar, ljus bakgrund)
# Vintage-färger (Nikolas bild, godkänd 2026-10-24): (färg, mörk nyans, ljus nyans)
V = dict(gron=('#58A73E','#2E6E28','#EAF4E4'), bla=('#1A86B0','#0F5F82','#E3F1F7'), lila=('#8A4A78','#5E2E54','#F5ECF2'),
         terra=('#E07A5F','#9A4630','#FBEAE4'), gul=('#E9B949','#7A5A12','#FBF1DA'))
ORG = dict(sage=V['gron'], turk=V['bla'], rosa=V['lila'], himmel=V['bla'], apri=V['terra'], sand=V['gul'], lav=V['lila'], mint=('#B7A694','#4A3F33','#F3EFEA'),
           # diskreta färger för undersidorna
           havsgron=('#6B93B3','#33566F','#E6F2F7'), mint2=('#63A9A6','#2F6B69','#E6F6F3'), solgul=('#F4B942','#7A5A12','#FFF7E3'), korall=('#E07A5F','#9A4630','#FDECEA'))
RAND = [V[k] for k in ('gron','bla','lila')]
BG = '#F4F3EF'  # ljus neutral (de fem färgerna blandade)

def mix(a, b, t):
    A = [int(a[i:i+2], 16) for i in (1, 3, 5)]; B = [int(b[i:i+2], 16) for i in (1, 3, 5)]
    return '#%02X%02X%02X' % tuple(round(x + (y - x) * t) for x, y in zip(A, B))

def farger(nyckel, **extra):
    m, d, t = ORG[nyckel]
    return dict(main=m, ink=d, mid=m, l=mix(m, '#FFFFFF', .35), vl=mix(m, '#FFFFFF', .84), w=mix(m, '#FFFFFF', .93), hi=t, bg=mix(m, '#FFFFFF', .9),
                hero=m, c1=mix(m, d, .12), c2=mix(m, '#FFFFFF', .18), ram=mix(m, '#FFFFFF', .6), ljus=mix(m, '#FFFFFF', .45), **extra)

AR = {7: farger('sage', bok='X', k=7), 8: farger('turk', bok='Y', k=8), 9: farger('rosa', bok='Z', k=9)}
# Materialrutorna på årskurssidorna: en nyans mörkare (Nikola 2026-10-24)
for _c in AR.values(): _c['t'] = mix(_c['main'], '#FFFFFF', .84); _c['tram'] = mix(_c['main'], '#FFFFFF', .59)
# Nio ikoner på årskurssidan: (filnamn, sidnamn, rubrik)
MATERIAL = [
 ('07_Lektioner', 'lektioner', 'Lektioner'),
 ('08_Tillbakablick', 'tillbakablick', 'Tillbakablick'),
 ('10_Trygg_start', 'trygg-start', 'Trygg start'),
 ('06_Problemlosning', 'problemlosning', 'Problemlösning'),
 ('11_Repetition', 'repetition', 'Repetition'),
 ('12_Diagnos', 'diagnos', 'Diagnos'),
 ('13_Test', 'test', 'Test'),
 ('17_Ovningsprov', 'ovningsprov', 'Övningsprov'),
]
MENY = [('Startsida', 'index.html'), ('Åk 7', 'ak7.html'), ('Åk 8', 'ak8.html'), ('Åk 9', 'ak9.html'), ('Bedömning', 'bedomning.html'), ('Så får du hjälp', 'hjalp.html'), ('Nationella prov', 'nationella-prov.html')]
# Neutral (startsida m.m.): medelvärdet av de fem färgerna, ljusat
NEUTRAL_M = '#9AA3AE'
NEUTRAL = dict(main=NEUTRAL_M, ink='#1E2B3A', mid=NEUTRAL_M, l=mix(NEUTRAL_M, '#FFFFFF', .45), vl=mix(NEUTRAL_M, '#FFFFFF', .62), w=mix(NEUTRAL_M, '#FFFFFF', .9),
               hi='#DDBE88', bg='#F4F3EF', hero=mix(NEUTRAL_M, '#FFFFFF', .62), c1=mix(NEUTRAL_M, '#FFFFFF', .5), c2=mix(NEUTRAL_M, '#FFFFFF', .55),
               ram=mix(NEUTRAL_M, '#FFFFFF', .45), ljus=mix(NEUTRAL_M, '#FFFFFF', .62))

CSS = """
body{margin:0;font-family:Inter,system-ui,sans-serif;color:#2F2B26;background:var(--bg);line-height:1.5}
h1,h2,h3,.serif{font-family:Fraunces,Georgia,serif;font-weight:600;letter-spacing:-.3px;line-height:1.15}
.rand{display:flex;height:8px}.rand i{flex:1}
header .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-top:20px;padding-bottom:20px;flex-wrap:wrap}
.logo{display:flex;align-items:center;gap:12px;text-decoration:none;font-family:Fraunces,Georgia,serif;font-weight:600;font-size:24px;line-height:1.15}
.logo img{width:50px;height:50px}
.logo small{display:block;font-family:Inter,sans-serif;font-weight:500;font-size:13px;color:#6B6258}
nav{display:flex;gap:6px;background:#fff8;padding:6px;border-radius:999px;border:1px solid #0000000f}
nav a{display:flex;align-items:center;gap:8px;padding:9px 18px;border-radius:999px;font-weight:600;font-size:15px;text-decoration:none;color:#2F2B26}
nav a i{width:10px;height:10px;border-radius:50%;flex:none}nav a:hover{background:#fff}nav a.on{color:#fff}nav a.on i{background:#fff!important}
.panel{position:relative;overflow:hidden;display:flex;align-items:center;gap:44px;border-radius:40px;padding:40px 48px;margin:4px 0 40px}
.panel>*{position:relative;z-index:1}.panel .cirk{position:absolute;border-radius:50%;z-index:0}
.panel .c1{width:340px;height:340px;right:-90px;top:-120px}.panel .c2{width:180px;height:180px;right:160px;bottom:-110px}
.bage{width:200px;height:240px;flex:none;border-radius:120px 120px 30px 30px;display:flex;align-items:center;justify-content:center;font-family:Fraunces,Georgia,serif;font-weight:700;font-size:160px;line-height:1;color:#2F2B26}
.panel .bild{width:130px;flex:none;filter:drop-shadow(0 6px 14px #0002)}
.sti{font-size:14px;font-weight:600;margin-bottom:12px;color:#4A433C}.sti a{text-decoration:none}.sti a:hover{text-decoration:underline}
.panel h1{font-size:clamp(34px,5vw,60px);line-height:1.05;margin:0}
.etikett{font-weight:700;letter-spacing:2px;text-transform:uppercase;font-size:15px;margin:10px 0 0;color:var(--ink)}
.panel p{font-size:18px;line-height:1.55;margin:12px 0 0;max-width:600px}
.start{display:grid;grid-template-columns:1fr auto;align-items:center;gap:30px;padding:4px 0 26px}
.start .lbl{display:inline-block;background:#fff9;border-radius:999px;padding:6px 14px;font-weight:600;font-size:13px;color:#4A3F33;margin-bottom:14px}
.start h1{font-size:clamp(38px,4.6vw,56px);line-height:1.05;margin:0}.start h1 em{font-style:italic;color:#8A4A30}
.start p{font-size:18px;line-height:1.55;color:#4A433C;max-width:520px;margin:14px 0 0}
.ros{width:110px;margin-left:auto;filter:drop-shadow(0 10px 20px #0002)}
.ak{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
.ak a{display:block;border-radius:220px 220px 34px 34px;padding:34px 30px 30px;text-decoration:none;color:#2F2B26;transition:transform .15s}
.ak a:hover{transform:translateY(-5px)}
.ak .sol{width:190px;height:190px;border-radius:50%;margin:0 auto 18px;display:flex;align-items:center;justify-content:center;font-family:Fraunces,Georgia,serif;font-weight:700;font-size:130px;line-height:1}
.ak h3{font-size:30px;text-align:center;margin:0}.ak .bok{text-align:center;font-weight:600;font-size:15px;margin:4px 0 22px;letter-spacing:1.5px;text-transform:uppercase}
.ak ul{list-style:none;padding:0;margin:0 0 22px;display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.alla{display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-top:18px;background:#E6DED3;border-radius:24px;padding:16px 24px}.alla b{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:19px}
.alla ul{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:8px}.alla li{background:#fff9;border-radius:999px;padding:6px 13px;font-size:14px;font-weight:600;color:#4A3F33}
.ak .gaa{display:block;text-align:center;color:#fff;border-radius:999px;padding:14px;font-weight:700;font-size:17px}
.rubrik{display:flex;align-items:baseline;gap:16px;flex-wrap:wrap;margin:64px 0 22px}.rubrik h2{font-size:38px;margin:0;color:#2F2B26}.rubrik span{color:#5A5047;font-size:17px}
.veta{display:grid;grid-template-columns:repeat(4,1fr);background:#E6DED3;border-radius:30px;padding:10px}
.veta a{display:block;padding:26px 24px;border-radius:24px;text-decoration:none;color:#2F2B26;transition:background .15s}
.veta a:hover{background:#ffffff55}.veta a+a{border-left:1.5px dashed #D2C6B7}
.pebble{display:flex;align-items:center;justify-content:center;flex:none;width:64px;height:64px;margin-bottom:18px;border-radius:58% 42% 55% 45%/48% 58% 42% 52%}
.veta h3{font-size:22px;margin:0 0 8px}.veta p{margin:0;color:#4A433C;font-size:15.5px;line-height:1.5}.veta b{display:inline-block;margin-top:14px;font-size:15px}
.grupp{display:grid;grid-template-columns:1fr;gap:16px;margin-bottom:42px;align-items:start}
.grupp>div:first-child{display:flex;align-items:baseline;gap:6px 14px;flex-wrap:wrap}
.grupp .nr{font-family:Fraunces,Georgia,serif;font-size:15px;font-weight:600;letter-spacing:1px;color:var(--ink)}
.grupp h2{font-size:32px;margin:0;color:#2F2B26}.grupp .g{color:#5A5047;font-size:16px;line-height:1.45;margin:0}
.rad3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.t{display:flex;flex-direction:column;gap:12px;border-radius:26px;padding:20px 22px 20px;min-height:182px;position:relative;text-decoration:none;color:#2F2B26;background:var(--vl);box-shadow:inset 0 0 0 2px var(--ram);transition:transform .15s}
.t:hover{transform:translateY(-4px)}.t img{width:104px;height:104px;filter:drop-shadow(0 4px 10px #0001)}
.t h3{font-size:22px;margin:0}.t p{margin:0;font-size:15px;line-height:1.45;color:#4A433C}
.t .pil{position:absolute;right:20px;top:22px;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;background:#fff9;color:var(--ink)}
.t .las-ikon{display:inline-block;margin-top:-6px;font-size:12px;font-weight:600;opacity:.65}
footer{margin-top:60px;background:var(--vl)}footer .wrap{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;padding-top:26px;padding-bottom:26px;font-size:14px;color:#4A433C}
footer .wrap>span{text-align:right;line-height:1.6}footer a.mejl{color:inherit;font-weight:600}
@media (max-width:800px){footer .wrap>span{text-align:left}}

*{box-sizing:border-box}
a{color:inherit}
img{max-width:100%;display:block}
.wrap{max-width:1200px;margin:0 auto;padding:0 24px}
main section{padding:6px 0 60px}
h2{font-size:clamp(24px,3vw,32px);margin:0 0 4px;color:var(--ink)}
p.sub{color:#4A4E52;font-size:17px;margin:0 0 22px}
.center{text-align:center}
.pl h2{font-size:26px;margin:36px 0 12px;color:var(--ink)}.pl p.ingress{font-size:18px;max-width:760px;line-height:1.6}
.niva{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;max-width:960px}
.niva div,.strat div{background:#fff8;border:2px solid var(--l);border-radius:18px;padding:18px 20px}.niva b{display:inline-block;background:var(--ink);color:#fff;border-radius:999px;padding:3px 12px;font-size:14px;margin-bottom:8px}.niva p,.strat p{margin:6px 0 0;line-height:1.5}
.strat{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;max-width:960px}.strat h3{margin:0;font-size:18px}
.arlank{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;max-width:960px}.arlank a{display:block;border-radius:20px;padding:22px 24px;color:#fff;text-decoration:none;font-weight:800;font-size:22px}.arlank a small{display:block;font-weight:500;font-size:15px;opacity:.9;margin-top:4px}
.omlank{display:inline-block;margin:0 0 20px;font-weight:700;color:var(--ink)}
.ovlank{display:flex;align-items:center;gap:20px;flex-wrap:wrap;background:var(--l);border-radius:24px;padding:22px 26px;margin:0 0 22px;max-width:860px;text-decoration:none;color:#2F2B26;box-shadow:0 6px 18px #0000001a;transition:transform .15s}
.ovlank:hover{transform:translateY(-3px)}
.ovlank .ovik{font-size:36px;width:64px;height:64px;border-radius:18px;background:var(--w);display:flex;align-items:center;justify-content:center;flex:none}
.ovlank .ovtxt{flex:1 1 260px;font-size:16px;line-height:1.5}.ovlank .ovtxt b{display:block;font-family:Fraunces,Georgia,serif;font-size:22px;margin-bottom:4px}
.ovlank .ovknapp{background:var(--ink);color:#fff;font-weight:700;font-size:16px;border-radius:999px;padding:12px 22px;white-space:nowrap}
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
.lankar a.mal{flex:none;display:flex;align-items:center;background:var(--ink);border-color:var(--ink);color:#fff;font-size:14px;padding:0 14px}.lankar a.mal:hover{opacity:.85}
.ovgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(330px,100%),1fr));gap:16px;max-width:1150px}
.ovkort{background:var(--vl);border:2px solid var(--l);border-radius:22px;padding:18px 18px 10px}
.ovkort h3{margin:0 0 12px;font-size:21px;color:var(--ink)}
.ovrad{display:flex;gap:6px;margin-bottom:8px}
.ovrad a.upg{flex:1;display:flex;align-items:center;gap:10px;background:var(--w);border:1.5px solid var(--l);border-radius:12px;padding:8px 12px;text-decoration:none;color:var(--ink);font-weight:700;font-size:15.5px;line-height:1.3}
.ovrad a.upg:hover{border-color:var(--mid)}
.ovrad .bok{flex:none;width:30px;height:30px;border-radius:9px;background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800}
.ovrad small{display:block;font-weight:500;font-size:13px;opacity:.75}
.ovrad a.facit{flex:none;display:flex;align-items:center;background:var(--knapp,var(--ink));color:#fff;border-radius:12px;padding:0 12px;font-weight:700;font-size:14px;text-decoration:none}
.ovrad a.facit:hover{opacity:.85}
.lankar.ovp{grid-template-columns:repeat(auto-fill,minmax(min(330px,100%),1fr))}
.lankar .ovinfo{display:block;font-weight:500;font-size:14px;opacity:.7;margin-top:2px}.lankar a b{color:var(--mid);margin-right:6px}
.las form{display:flex;gap:10px;flex-wrap:wrap}.las input{font:inherit;font-size:18px;padding:10px 14px;border:2px solid var(--l);border-radius:14px;flex:1 1 200px;min-width:0;max-width:320px}.las input:focus{outline:3px solid var(--mid);outline-offset:1px}.las button{font:inherit;font-weight:700;font-size:17px;cursor:pointer;border:0;border-radius:14px;background:var(--ink);color:#fff;padding:12px 24px}.lasfel{min-height:24px;margin:10px 0 0;color:#8A4A30;font-weight:600}
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
#trana .tecken{display:flex;gap:8px;align-items:center;margin-top:10px}#trana .tecken button{font:inherit;font-size:24px;font-weight:800;width:56px;height:48px;border:2px solid var(--l);border-radius:12px;background:#fff;color:var(--ink,#292A28);cursor:pointer}#trana .tecken button:active{background:var(--l)}#trana .tecken span{font-size:15px;color:#5F6368;margin-left:4px}
#trana input{font:inherit;font-size:22px;padding:10px 14px;border:2px solid var(--l);border-radius:14px;width:220px;max-width:100%}
#trana input:focus{outline:3px solid var(--mid);outline-offset:1px}
#trana form button,.knapp2{background:var(--ink);color:#fff;font-weight:700;padding:12px 24px;font-size:18px}
.knapp2.sek{background:#fff;color:var(--ink);border:2px solid var(--ink)}
.fb{min-height:28px;font-size:17px;margin:14px 0 6px}.fb.ok{color:#545A3F;font-weight:800;font-size:22px}.fb.nej{color:#8A4A30}.fb.tipsrad{color:#7A5A22}
.lank{background:none;border:0;font:inherit;color:var(--ink);font-weight:700;text-decoration:underline;cursor:pointer;padding:0}
.fb .lank{margin-left:8px}
.match{display:grid;grid-template-columns:1fr 1.6fr;gap:12px;margin-top:8px}.match>div{display:flex;flex-direction:column;gap:10px}
.mb{font:inherit;font-size:16px;text-align:left;background:#fff;border:2px solid var(--l);border-radius:12px;padding:12px 14px;cursor:pointer;color:#292A28;transition:transform .1s,background .2s}
.match>div:first-child .mb{font-weight:700;color:var(--ink)}
.mb:hover{border-color:var(--mid)}.mb.vald{border-color:var(--ink);background:var(--l);transform:scale(1.02)}
.mb.par{background:#E6E7DD;border-color:#545A3F;color:#545A3F;cursor:default;opacity:.75}.mb.fel{background:#F2E2DA;border-color:#B0785C;animation:skak .3s}
@keyframes skak{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.valj button.spec{background:var(--ink);color:#fff;border-color:var(--ink)}.valj button.spec b{color:var(--hi)}
.match-kort{max-width:860px}.match>div{min-width:0}.mb{overflow-wrap:anywhere}
.typer{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;max-width:1150px}@media (max-width:1000px){.typer{grid-template-columns:1fr 1fr}}
.typ{display:block;background:var(--ink);border-radius:16px;padding:20px 24px;text-decoration:none;color:#fff;font-weight:700;font-size:19px;transition:transform .15s}
.typ:hover{transform:translateY(-3px)}.kapblock{margin-bottom:22px;background:var(--vl);border:2px solid var(--ram);border-radius:22px;padding:20px 24px 24px;max-width:1150px}.kapblock h2{margin:0 0 14px}.exempel{background:#fff;border:2px solid var(--l);border-radius:18px;padding:22px;margin:16px 0 4px;text-align:center;font-size:clamp(28px,5vw,42px);font-weight:800;color:#292A28}.exempel mark{white-space:nowrap;background:#F3E8D3;color:inherit;border-radius:8px;padding:0 6px;box-shadow:inset 0 -5px #DDBE88}.exempel .fig{max-width:100%;height:auto;display:inline-block}.exempel .tab{margin:0 auto;font-size:24px}.br{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;line-height:1.15;margin:0 4px}.br>span+span{border-top:3px solid currentColor}.fraga.liten{font-size:22px;margin:12px 0}.fraga.mening{font-size:clamp(22px,3.4vw,30px);line-height:1.6}.hj{color:#5F6368;margin:6px 0 10px}.ordbank{display:flex;flex-wrap:wrap;gap:10px}.ordk{font:inherit;font-size:20px;font-weight:700;padding:10px 18px;border-radius:12px;background:#fff;border:2px solid var(--l);color:var(--ink);cursor:grab;touch-action:manipulation}.ordk:hover{border-color:var(--mid)}.ordk.fel{background:#F2E2DA;border-color:#B0785C;opacity:.55;text-decoration:line-through}.ordk.par{background:#E6E7DD;border-color:#545A3F}.lucka.drop{min-width:150px;min-height:1.3em;vertical-align:bottom;border-bottom-style:dashed;background:#ffffff80;border-radius:6px 6px 0 0}.lucka.drop.over{background:#fff}.lucka.fylld{border-bottom-style:solid}.tab{border-collapse:collapse;margin:14px 0;font-size:17px;font-weight:600}.tab th,.tab td{border:1.5px solid var(--l);padding:6px 12px;text-align:center;background:#fff}.tab th{background:var(--l)}.typ b{display:block;color:var(--hi);font-size:14px;font-weight:600}
a.knapp2{text-decoration:none;display:inline-block}
.alt{display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:620px}.alt .mb{font-size:19px;font-weight:700;color:var(--ink);text-align:center;padding:14px}
.mb.kvar{animation:none;opacity:1}.forkl{color:#292A28;font-weight:500;font-size:16px}.fb.ok .forkl{display:block;margin-top:4px}
.lucka{display:inline-block;min-width:80px;border-bottom:4px solid var(--mid);color:var(--mid);text-align:center;padding:0 8px}.lucka.fylld{color:#545A3F;border-color:#545A3F}
.sr{position:absolute;left:-9999px}
@media (max-width:800px){
 header .wrap{padding-top:14px;padding-bottom:12px}nav{width:100%;justify-content:space-between}nav a{padding:8px 10px;font-size:14px;gap:5px;white-space:nowrap}nav{gap:2px;padding:4px}
 .panel{flex-direction:column;align-items:flex-start;gap:20px;padding:26px 22px;border-radius:28px}
 .bage{width:96px;height:116px;font-size:80px;border-radius:60px 60px 18px 18px}.panel .bild{width:84px}
 .start{grid-template-columns:1fr auto;align-items:start;gap:10px;padding-top:6px}.ros{width:72px;margin:44px 0 0}
 .ak{grid-template-columns:1fr}.veta{grid-template-columns:1fr}.veta a+a{border-left:0;border-top:1.5px dashed #D2C6B7}
 .grupp{grid-template-columns:1fr;gap:14px}.rad3{grid-template-columns:1fr}.t{min-height:0;display:grid;grid-template-columns:72px 1fr;column-gap:16px;row-gap:2px;padding-right:60px}.t img{width:72px;height:72px;grid-row:span 3}.t .las-ikon{position:static;grid-column:2}
 .ak a{padding:24px 22px 22px}.ak .sol{width:120px;height:120px;font-size:84px;margin-bottom:12px}.ak h3{font-size:26px}
 .kort-t{padding:18px 14px}.match{gap:8px}.mb{font-size:14px;padding:10px}
}

/* --- Bokomslagens färger (förslag) --- */
body{background:#F4F3EF}
main.hem{background:radial-gradient(600px 420px at -5% 20%,#58A73E22,transparent 70%),radial-gradient(520px 420px at 105% 15%,#8A4A7822,transparent 70%),radial-gradient(500px 300px at 50% 0%,#1A86B014,transparent 70%)}
header{background:#FBFAF7;border-bottom:1px solid #E6E3DC}.rand{display:none}
header .wrap{padding-top:14px;padding-bottom:14px}
.logo{font-family:Inter,sans-serif;font-weight:600;font-size:24px;color:#1E2B3A}.logo img{width:50px;height:50px;background:none;box-shadow:none}.logo small{font-weight:500}
nav{background:none;border:0;padding:0;gap:4px}
nav a{border-radius:0;padding:8px 10px;border-bottom:3px solid transparent;font-weight:500;color:#1E2B3A}nav a:hover{background:none;color:#000}
nav a.on{color:#1E2B3A;font-weight:700;background:none!important}
.topprubrik{display:flex;align-items:center;justify-content:center;gap:22px;text-align:center;padding:34px 0 30px}
.topprubrik img{width:96px}.topprubrik h1{font-family:Inter,sans-serif;font-weight:800;font-size:clamp(38px,5.4vw,64px);letter-spacing:-1.5px;margin:0;color:#14202E;line-height:1}
.topprubrik p{margin:8px 0 0;font-size:21px;color:#3B4A5A;text-align:left}
.topprubrik div{text-align:left}
.kkrad{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
.kk{display:block;border-radius:22px;overflow:hidden;text-decoration:none;box-shadow:0 10px 30px #1E2B3A1f;transition:transform .15s}.kk:hover{transform:translateY(-5px)}
.kk .topp{height:210px;position:relative;overflow:hidden}
.motiv-k{position:absolute;inset:14px 18px;width:calc(100% - 36px);height:calc(100% - 28px);opacity:.95}
.kk .kropp{padding:22px 26px 26px;text-align:center}
.kk h3{font-family:Inter,sans-serif;font-weight:800;font-size:32px;margin:0 0 8px;letter-spacing:-.5px}
.kk p{margin:0 0 20px;color:#3B4A5A;font-size:17px;line-height:1.45;min-height:50px}
.kk .gaa{display:inline-block;color:#fff;border-radius:999px;padding:13px 34px;font-weight:700;font-size:18px}
.infor{display:grid;grid-template-columns:repeat(4,1fr);margin-top:44px;border-top:1.5px solid #E1DED6;padding-top:26px}
.infor a{display:flex;gap:16px;align-items:flex-start;padding:4px 20px;text-decoration:none;color:#1E2B3A}.infor a+a{border-left:1.5px solid #E1DED6}
.infor .rik{width:62px;height:62px;border-radius:50%;background:#E7EBEF;display:flex;align-items:center;justify-content:center;flex:none}
.infor b{display:block;font-size:17px;margin-bottom:4px}.infor small{display:block;color:#566373;font-size:14.5px;line-height:1.45}
.panel.farg{color:#fff}.panel.farg .sti,.panel.farg .sti a{color:#ffffffd9}.panel.farg .etikett{color:#ffffffcc}.panel.farg h1{font-family:Inter,sans-serif;font-weight:800;letter-spacing:-1px}
.panel .motiv{position:absolute;right:24px;top:22px;height:calc(100% - 44px);max-width:26%;width:auto;opacity:.35;z-index:0}.panel.farg>div{position:relative;z-index:1}.panel.farg p{max-width:440px}
.panel.farg .bage{background:#ffffff2e;color:#fff;font-family:Inter,sans-serif;font-weight:800;border:3px solid #ffffff66}
.grupp h2,.t h3{font-family:Inter,sans-serif;font-weight:800;letter-spacing:-.4px}
.t{background:var(--t,var(--w));box-shadow:inset 0 0 0 2px var(--tram,var(--ram)),0 6px 16px #1E2B3A0d}
footer{background:#1E2B3A;color:#DDE3EA}footer .wrap{color:#DDE3EA}
@media (max-width:1000px){nav{width:100%;overflow-x:auto;flex-wrap:nowrap}nav a{white-space:nowrap}}
@media (max-width:800px){.kkrad{grid-template-columns:1fr}.infor{grid-template-columns:1fr 1fr;row-gap:20px}.infor a:nth-child(3){border-left:0}
 .topprubrik{gap:14px;padding:18px 0}.topprubrik img{width:64px}.topprubrik p{font-size:16px}.kk .topp{height:150px}.panel .motiv{display:none}}
@media (max-width:560px){.infor{grid-template-columns:1fr}.infor a{border-left:0!important;padding:4px 0}.infor a+a{border-top:1.5px solid #E1DED6;padding-top:16px}nav{max-width:100%;min-width:0}header .wrap{min-width:0;max-width:100%}nav a{flex:none}}
.ak2{position:relative;display:flex;flex-direction:column;border:2px solid;border-radius:22px;overflow:hidden;text-decoration:none;box-shadow:0 8px 24px #1E2B3A14;transition:transform .15s}.ak2:hover{transform:translateY(-4px)}
.ak2 .blob{position:absolute;border-radius:50%;z-index:0}.ak2 .b1{width:190px;height:150px;right:-50px;bottom:10px;opacity:.7}.ak2 .b2{width:150px;height:120px;left:-40px;bottom:-30px;opacity:.8}
.ak2 .prick{position:absolute;border-radius:50%;background:var(--d);opacity:.35;z-index:0}.ak2 .p1{width:9px;height:9px;right:26px;top:22px}.ak2 .p2{width:6px;height:6px;right:16px;top:44px;background:var(--m);opacity:.6}
.ak2 .inne{position:relative;z-index:1;display:flex;gap:18px;align-items:center;padding:24px 22px 22px;flex:1}
.ak2 .nr{position:relative;width:110px;flex:none;text-align:center}.ak2 .sol{position:absolute;left:-6px;top:-6px;width:118px;height:118px;border-radius:50%;background:#ffffff8c;z-index:-1}
.ak2 .nr b{display:block;font-family:Inter,sans-serif;font-weight:900;font-size:104px;line-height:1;letter-spacing:-3px}.ak2 .nr small{display:block;font-weight:800;font-size:20px;margin-top:8px}
.ak2 h3{font-family:Inter,sans-serif;font-weight:800;font-size:24px;margin:0 0 8px}
.ak2 ul{list-style:none;margin:0 0 6px;padding:0}.ak2 li{display:flex;align-items:center;gap:8px;font-weight:600;font-size:16px;color:#1E2B3A;margin:5px 0}.ak2 li svg{width:18px;height:18px;flex:none;fill:var(--m)}
.ak2 em{font-weight:700;font-size:15px;opacity:.85}
.ak2 .gaa{position:relative;z-index:1;display:block;text-align:center;color:#fff;padding:14px;font-weight:700;font-size:17px}
@media (max-width:560px){.topprubrik h1{font-size:34px!important}.topprubrik p{font-size:15px!important}.topprubrik img{width:56px!important}.ak2 .inne{gap:12px;padding:20px 16px 18px}.ak2 .nr{width:92px}.ak2 .nr b{font-size:86px}.ak2 .sol{width:100px;height:100px}}
@media (max-width:1100px) and (min-width:801px){.ak2 .nr{width:84px}.ak2 .nr b{font-size:80px}.ak2 .sol{width:92px;height:92px}.ak2 h3{font-size:20px}.ak2 li{font-size:14.5px}}
.panel.farg{min-height:240px;box-shadow:0 10px 28px #1E2B3A26;border-radius:26px}
.panel .vag{position:absolute!important;inset:0;width:100%;height:100%;z-index:0!important}
.panel .prick{position:absolute!important;fill:#fff;opacity:.35;z-index:0!important}.panel .pr1{left:18px;bottom:16px}.panel .pr2{right:20px;top:16px}
.panel.farg .motiv{position:absolute!important;right:50px;top:50%;transform:translateY(-50%);height:82%;max-width:46%;width:auto;opacity:.45;z-index:0!important;filter:drop-shadow(0 2px 6px #0002)}
.panel.farg h1{font-family:Fraunces,Georgia,serif;font-weight:700;letter-spacing:0;font-size:clamp(32px,4.4vw,54px)}.panel.farg>div{max-width:50%}.panel.farg .etikett{letter-spacing:3px;font-weight:800}.panel.farg p{max-width:520px}
@media (max-width:800px){.panel.farg>div{max-width:100%}.panel.farg .motiv{display:block;opacity:.22;right:-40px;height:70%;max-width:70%}}
.panel .formler{position:absolute!important;inset:0;width:100%;height:100%;opacity:.28;z-index:0!important}
.nrc{width:150px;height:150px;flex:none;border-radius:50%;background:#fffffff2;display:flex;align-items:center;justify-content:center;font:900 96px/1 Inter,sans-serif;letter-spacing:-3px;box-shadow:0 0 0 12px #ffffff33,0 8px 24px #0003}
@media (max-width:800px){.nrc{width:92px;height:92px;font-size:58px;box-shadow:0 0 0 8px #ffffff33}.panel .formler{opacity:.18}}
.knapp.pil{width:56px;height:56px;padding:0;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:26px;line-height:1}
"""

# Lösenordsskydd för Lektioner-sidorna. Lösenordet läses från en fil utanför webbplatsen och repot.
# Innehållet krypteras med AES-GCM; nyckeln tas fram med PBKDF2 (samma salt för alla årskurser,
# så att eleven bara behöver skriva lösenordet en gång per webbläsare).
LOSEN_FIL = '/mnt/project-files/webbplats-hemligt/losenord.txt'
LOSEN_SALT = b'mattekompassen-lektioner'
LOSEN_VARV = 250000

def losen_nyckel():
    import hashlib
    rad = open(LOSEN_FIL, encoding='utf-8').read().strip()
    if not rad:
        raise SystemExit(f'Lösenordet saknas i {LOSEN_FIL}')
    norm = ''.join(rad.lower().split())  # samma normalisering som i webbläsaren
    return hashlib.pbkdf2_hmac('sha256', norm.encode('utf-8'), LOSEN_SALT, LOSEN_VARV, 32)

def krypterad(innehall_html):
    import base64, hashlib
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    nyckel = losen_nyckel()
    # IV från innehållet: samma innehåll ger samma fil (inga onödiga ändringar vid varje bygge)
    iv = hashlib.sha256(nyckel + innehall_html.encode('utf-8')).digest()[:12]
    data = base64.b64encode(iv + AESGCM(nyckel).encrypt(iv, innehall_html.encode('utf-8'), None)).decode()
    salt = base64.b64encode(LOSEN_SALT).decode()
    return f"""<div id="las" class="ruta las" data-salt="{salt}" data-varv="{LOSEN_VARV}" data-krypto="{data}">
<h3>Skriv lösenordet</h3><p style="margin:0 0 14px">Lektionerna är skyddade med lösenord. Du får lösenordet av din mattelärare.</p>
<form id="lasform" autocomplete="off"><label class="sr" for="losen">Lösenord</label>
<input id="losen" type="password" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="Lösenord" required>
<button type="submit">Öppna</button></form><p id="lasfel" class="lasfel" role="alert"></p>
<noscript><p>Sidan behöver JavaScript för att visa lektionerna.</p></noscript></div>
<div id="olast"></div>
<script>
(function(){{
var las=document.getElementById('las'),ut=document.getElementById('olast'),fel=document.getElementById('lasfel'),NYCKEL='mk-lektioner-nyckel';
var b64=function(s){{return Uint8Array.from(atob(s),function(c){{return c.charCodeAt(0)}})}};
var u8b64=function(a){{var s='';a.forEach(function(x){{s+=String.fromCharCode(x)}});return btoa(s)}};
var allt=b64(las.dataset.krypto),iv=allt.slice(0,12),chiffer=allt.slice(12);
function visa(raa){{
 return crypto.subtle.importKey('raw',raa,'AES-GCM',false,['decrypt'])
 .then(function(k){{return crypto.subtle.decrypt({{name:'AES-GCM',iv:iv}},k,chiffer)}})
 .then(function(b){{ut.innerHTML=new TextDecoder().decode(b);las.remove();return true}});
}}
function spara(raa){{try{{localStorage.setItem(NYCKEL,u8b64(raa))}}catch(e){{}}}}
if(!window.crypto||!crypto.subtle){{fel.textContent='Din webbläsare kan inte öppna sidan. Prova en annan webbläsare.';return}}
var sparad=null;try{{sparad=localStorage.getItem(NYCKEL)}}catch(e){{}}
if(sparad){{las.style.visibility='hidden';visa(b64(sparad)).catch(function(){{try{{localStorage.removeItem(NYCKEL)}}catch(e){{}}las.style.visibility=''}})}}
document.getElementById('lasform').addEventListener('submit',function(e){{
 e.preventDefault();fel.textContent='Öppnar …';
 var ord=document.getElementById('losen').value.trim().toLowerCase().split(/\\s+/).join('');
 crypto.subtle.importKey('raw',new TextEncoder().encode(ord),'PBKDF2',false,['deriveBits'])
 .then(function(k){{return crypto.subtle.deriveBits({{name:'PBKDF2',hash:'SHA-256',salt:b64(las.dataset.salt),iterations:+las.dataset.varv}},k,256)}})
 .then(function(bits){{var raa=new Uint8Array(bits);return visa(raa).then(function(){{spara(raa)}})}})
 .catch(function(){{fel.textContent='Fel lösenord. Försök igen.';document.getElementById('losen').select()}});
}});
}})();
</script>"""

# Övningsprov inför NP åk 9 (sex prov, delprov A–D). Uppgifterna läggs öppet som PDF; facit krypteras
# med samma lösenord/nyckel som Lektioner-sidorna (AES-GCM) och låses upp i webbläsaren.
OVP_KALLA = '/mnt/project-files/np-ovningsprov-{n}'
OVP_ANTAL = 6
OVP_DELPROV = [('A', '40 min', 'utan räknare', 'bara svar'), ('B', '80 min', 'utan räknare', 'visa lösningen'),
               ('C', '40 min', 'med räknare', 'bara svar'), ('D', '80 min', 'med räknare', 'visa lösningen')]

def krypterad_fil(data):
    import hashlib
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    nyckel = losen_nyckel()
    iv = hashlib.sha256(nyckel + data).digest()[:12]
    return iv + AESGCM(nyckel).encrypt(iv, data, None)

def ovp_info(pdf):
    """'Uppgift 17–23 … högst 22 poäng' ur PDF:ens första sida."""
    import re, subprocess
    try:
        t = subprocess.run(['pdftotext', '-l', '1', pdf, '-'], capture_output=True, text=True).stdout
    except Exception:
        return ''
    m = re.search(r'Uppgift (\d+\s*[–-]\s*\d+).*?högst (\d+) poäng', t, re.S)
    return f'uppgift {m.group(1).replace(" ", "")} · {m.group(2)} p' if m else ''

def ovningsprov_sida(k, rot='', intro=None):
    """De sex övningsproven som kort (uppgifter öppet, facit krypterat). rot = sökväg från sidan till ak{k}/."""
    ut_mapp = os.path.join(UT, f'ak{k}', 'ovningsprov')
    prov = ''
    for n in range(1, OVP_ANTAL + 1):
        kalla = OVP_KALLA.format(n=n)
        if not os.path.isdir(kalla):
            continue
        os.makedirs(os.path.join(ut_mapp, f'prov-{n}'), exist_ok=True)
        rader = ''
        for b, tid, rk, typ in OVP_DELPROV:
            upg, fac = os.path.join(kalla, f'delprov-{b.lower()}.pdf'), os.path.join(kalla, f'delprov-{b.lower()}-facit.pdf')
            sti = f'ovningsprov/prov-{n}/delprov-{b.lower()}'
            shutil.copy(upg, os.path.join(UT, f'ak{k}', sti + '.pdf'))
            open(os.path.join(UT, f'ak{k}', sti + '-facit.bin'), 'wb').write(krypterad_fil(open(fac, 'rb').read()))
            info = ovp_info(upg)
            rader += (f'<div class="ovrad"><a class="upg" href="{rot}{sti}.pdf" target="_blank" rel="noopener"><span class="bok">{b}</span><span>Delprov {b}<small>{tid} · {rk}'
                      + (f' · {info}' if info else '') + '</small></span></a>'
                      f'<a class="facit" href="#facit" data-fil="{rot}{sti}-facit.bin" data-namn="Övningsprov {n} delprov {b} facit.pdf">🔒 Facit</a></div>')
        prov += f'<div class="ovkort"><h3>Övningsprov {n}</h3>{rader}</div>'
    prov = f'<div class="ovgrid">{prov}</div>'
    if intro is None:
        intro = f'<p class="ingress" style="max-width:860px;margin:0 0 18px">Här finns sex övningsprov med samma upplägg som det nationella provet i åk 9: fyra delprov A–D. Uppgifterna är egna och kommer inte från något riktigt prov. Skriv ut delprovet eller öppna det, ta tid och lös uppgifterna som på riktigt. Rätta sedan med facit. <a href="../nationella-prov.html" style="font-weight:700;color:var(--ink)">Läs mer om nationella provet →</a></p>'
    salt = __import__('base64').b64encode(LOSEN_SALT).decode()
    return f"""{intro}
{prov}
<div id="facit" class="ruta las" data-salt="{salt}" data-varv="{LOSEN_VARV}" style="margin-top:22px">
<h3>Facit är skyddat med lösenord</h3><p style="margin:0 0 14px">Uppgifterna kan alla öppna. För att öppna facit behöver du lösenordet. Du får det av din mattelärare.</p>
<form id="lasform" autocomplete="off"><label class="sr" for="losen">Lösenord</label>
<input id="losen" type="password" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="Lösenord" required>
<button type="submit">Lås upp facit</button></form><p id="lasfel" class="lasfel" role="alert"></p></div>
<div id="olast" class="ruta" style="display:none;margin-top:22px;padding:16px 24px"><b>Facit är upplåst.</b> Klicka på Facit vid det delprov du vill rätta.</div>
<script>
(function(){{
var las=document.getElementById('facit'),ok=document.getElementById('olast'),fel=document.getElementById('lasfel'),NYCKEL='mk-lektioner-nyckel',raa=null;
var b64=function(s){{return Uint8Array.from(atob(s),function(c){{return c.charCodeAt(0)}})}};
var u8b64=function(a){{var s='';a.forEach(function(x){{s+=String.fromCharCode(x)}});return btoa(s)}};
var forsta=document.querySelector('a.facit');
function oppna(fil,k){{return fetch(fil).then(function(r){{if(!r.ok)throw 0;return r.arrayBuffer()}}).then(function(b){{var a=new Uint8Array(b);
 return crypto.subtle.importKey('raw',k,'AES-GCM',false,['decrypt']).then(function(x){{return crypto.subtle.decrypt({{name:'AES-GCM',iv:a.slice(0,12)}},x,a.slice(12))}})}})}}
function upplast(k){{raa=k;las.style.display='none';ok.style.display='';document.querySelectorAll('a.facit').forEach(function(a){{a.textContent='Facit'}})}}
function prova(k){{return oppna(forsta.dataset.fil,k).then(function(){{upplast(k);return true}})}}
if(!window.crypto||!crypto.subtle||!window.fetch){{fel.textContent='Din webbläsare kan inte öppna facit. Prova en annan webbläsare.';return}}
var sparad=null;try{{sparad=localStorage.getItem(NYCKEL)}}catch(e){{}}
if(sparad){{prova(b64(sparad)).catch(function(){{}})}}
document.getElementById('lasform').addEventListener('submit',function(e){{
 e.preventDefault();fel.textContent='Öppnar …';
 var ord=document.getElementById('losen').value.trim().toLowerCase().split(/\\s+/).join('');
 crypto.subtle.importKey('raw',new TextEncoder().encode(ord),'PBKDF2',false,['deriveBits'])
 .then(function(k){{return crypto.subtle.deriveBits({{name:'PBKDF2',hash:'SHA-256',salt:b64(las.dataset.salt),iterations:+las.dataset.varv}},k,256)}})
 .then(function(bits){{var k=new Uint8Array(bits);return prova(k).then(function(){{fel.textContent='';try{{localStorage.setItem(NYCKEL,u8b64(k))}}catch(e){{}}}})}})
 .catch(function(){{fel.textContent='Fel lösenord. Försök igen.';document.getElementById('losen').select()}});
}});
document.querySelectorAll('a.facit').forEach(function(a){{a.addEventListener('click',function(e){{
 if(!raa){{e.preventDefault();las.scrollIntoView({{behavior:'smooth',block:'center'}});document.getElementById('losen').focus();fel.textContent='Skriv lösenordet för att öppna facit.';return}}
 e.preventDefault();var w=navigator.pdfViewerEnabled===false?null:window.open('','_blank');
 oppna(a.dataset.fil,raa).then(function(b){{var url=URL.createObjectURL(new Blob([b],{{type:'application/pdf'}}));
  if(w){{w.location.href=url}}else{{var l=document.createElement('a');l.href=url;l.download=a.dataset.namn;document.body.appendChild(l);l.click();l.remove()}}}})
 .catch(function(){{if(w)w.close();alert('Facit gick inte att öppna. Försök igen.')}});
}})}});
}})();
</script>"""

import hashlib
CSS_VER = hashlib.sha1(CSS.encode()).hexdigest()[:8]  # ny version -> webbläsaren hämtar ny stil.css

def rand():
    return '<div class="rand" aria-hidden="true">' + ''.join(f'<i style="background:{c[0]}"></i>' for c in RAND) + '</div>'

PRICK = {'Startsida': '#2F2B26', 'Åk 7': AR[7]['main'], 'Åk 8': AR[8]['main'], 'Åk 9': AR[9]['main'], 'Bedömning': '#1E2B3A', 'Så får du hjälp': '#1E2B3A', 'Nationella prov': '#1E2B3A'}

MOTIV = {
 7: '''<text x="40" y="95" font-size="44" fill="#fff">3</text><path d="M34 108h34" stroke="#fff" stroke-width="4"/><text x="40" y="152" font-size="44" fill="#fff">5</text>
 <circle cx="150" cy="120" r="52" fill="#ffffff22"/><path d="M150 68v52l45 26M150 120l-50 15" fill="none"/><path d="M150 68a52 52 0 0 1 45 78" fill="#ffffff33"/>
 <path d="M240 40l90 90h-90z"/><path d="M258 82l30 30h-30z"/><path d="M60 215h300M80 205v20M130 205v20M180 205v20M230 205v20M280 205v20M350 207l12 8-12 8"/>
 <text x="72" y="248" font-size="20" fill="#fff">−2</text><text x="124" y="248" font-size="20" fill="#fff">−1</text><text x="175" y="248" font-size="20" fill="#fff">0</text><text x="225" y="248" font-size="20" fill="#fff">1</text><text x="275" y="248" font-size="20" fill="#fff">2</text>''',
 8: '''<path d="M60 230V20M50 32l10-14 10 14M30 190h220M238 180l14 10-14 10"/><path d="M40 210L250 50"/><circle cx="92" cy="170" r="6" fill="#fff"/><circle cx="145" cy="130" r="6" fill="#fff"/><circle cx="198" cy="90" r="6" fill="#fff"/>
 <path d="M300 60l-70 150h150z"/><path d="M300 60v150" stroke-dasharray="6 6"/><path d="M300 196h14v14"/><text x="250" y="140" font-size="22" fill="#fff">a</text><text x="345" y="140" font-size="22" fill="#fff">b</text>''',
 9: '''<circle cx="90" cy="130" r="62"/><path d="M90 130V68M90 130l50 32" /><path d="M90 100a30 30 0 0 1 26 46" stroke-dasharray="4 5"/>
 <ellipse cx="225" cy="55" rx="55" ry="16"/><path d="M170 55v140M280 55v140"/><path d="M170 195a55 16 0 0 0 110 0"/><path d="M170 195a55 16 0 0 1 110 0" stroke-dasharray="6 6"/><path d="M225 55v140" stroke-dasharray="6 6"/>
 <path d="M300 230h90"/><rect x="306" y="190" width="16" height="40" fill="#ffffff33"/><rect x="330" y="160" width="16" height="70" fill="#ffffff33"/><rect x="354" y="120" width="16" height="110" fill="#ffffff33"/><rect x="378" y="70" width="16" height="160" fill="#ffffff33"/>'''}
def motiv(k, cls='motiv'):
    if cls != 'motiv':
        return (f'<svg class="{cls}" viewBox="0 0 410 260" aria-hidden="true" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" '
                f'font-family="Inter,sans-serif" font-weight="600">{MOTIV[k]}</svg>')
    fo = ''.join(f'<text x="-190" y="{y}" font-size="{st}" fill="#fff" stroke="none" fill-opacity=".6" font-style="italic">{t}</text>'
                 for t, y, st in zip(FORMLER[k][:2], (50, 128), (26, 22)))
    return (f'<svg class="{cls}" viewBox="-200 0 610 260" aria-hidden="true" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" '
            f'font-family="Inter,sans-serif" font-weight="600">{fo}{MOTIV[k]}</svg>')

def _prickar(x, y, kol, rad, g=12):
    return ''.join(f'<circle cx="{x+c*g}" cy="{y+r*g}" r="2.2"/>' for c in range(kol) for r in range(rad))
# Vågbakgrund i årskursernas rubrikpaneler (Nikola 2026-10-24)
VAG = ('<svg class="vag" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">'
       '<path d="M0 210 C 200 150, 380 260, 620 190 S 1000 120, 1200 170 V300 H0Z" fill="#ffffff1f"/>'
       '<path d="M0 250 C 260 200, 450 290, 700 235 S 1050 190, 1200 230 V300 H0Z" fill="#ffffff1a"/>'
       '<path d="M0 60 C 220 20, 420 120, 680 70 S 1050 0, 1200 40 V0 H0Z" fill="#00000010"/>'
       '<path d="M0 120 C 300 60, 520 200, 820 120 S 1100 60, 1200 90" fill="none" stroke="#ffffff45" stroke-width="2"/>'
       '<path d="M0 150 C 300 90, 540 230, 840 150 S 1100 95, 1200 120" fill="none" stroke="#ffffff1c" stroke-width="2"/></svg>'
       f'<svg class="prick pr1" width="60" height="48" aria-hidden="true">{_prickar(4, 4, 5, 4)}</svg>'
       f'<svg class="prick pr2" width="72" height="48" aria-hidden="true">{_prickar(4, 4, 6, 4)}</svg>')

FORMLER = {
 7: ['2x + 3 = 11', '25 % = 0,25', '−5 &lt; 2'],
 8: ['y = kx + m', 'a² + b² = c²', 'V = B · h'],
 9: ['f(x) = x²', 'x² = 25', 'A = πr²']}
def formler(k):
    return ''
def panel(c, titel, text='', etikett='', sti=None, vanster='', rot=''):
    """Rundad rubrikpanel högst upp på sidan. sti = [(namn, länk), ...] (brödsmulor)."""
    st = ''
    if sti:
        st = '<div class="sti">' + ' / '.join(f'<a href="{rot}{h}">{html.escape(n)}</a>' if h else html.escape(n) for n, h in sti) + '</div>'
    k = c.get('k')
    bakgrund = f'linear-gradient(115deg,{c["main"]} 0%,{c["main"]} 30%,{c["ink"]} 100%)' if k else c['hero']
    return (f'<div class="wrap"><section class="panel{" farg" if k else ""}" style="background:{bakgrund}">' + (VAG + formler(k) + motiv(k) if k else '') + f'{vanster}<div>{st}<h1>{titel}</h1>'
            + (f'<div class="etikett">{etikett}</div>' if etikett else '') + (f'<p>{text}</p>' if text else '') + '</div></section></div>')

def sida(fil, titel, aktiv, c, kropp, rot=''):
    meny = ''
    for n, h in MENY:
        on = n == aktiv
        st = f' style="border-color:{c["ink"] if c.get("k") else "#1E2B3A"}"' if on else ''
        meny += f'<a href="{rot}{h}" class="{"on" if on else ""}"{st}{" aria-current=\"page\"" if on else ""}>{n}</a>'
    var = ';'.join(f'--{k}:{v}' for k, v in c.items() if k in ('ink', 'hi', 'w', 'vl', 'l', 'mid', 'bg', 'ram', 't', 'tram', 'knapp'))
    doc = f"""<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(titel)} – Mattekompassen</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="icon" href="{rot}bilder/kompass-liten.png">
<link rel="stylesheet" href="{rot}stil.css?v={CSS_VER}">
<style>:root{{{var}}}</style></head><body>
{rand()}<header><div class="wrap"><a class="logo" href="{rot}index.html"><img src="{rot}bilder/kompass-liten.png" alt=""><span>Mattekompassen<small>Örtagårdsskolan 7–9</small></span></a>
<nav aria-label="Huvudmeny">{meny}</nav></div></header>
{kropp}
<footer>{rand()}<div class="wrap"><b>Mattekompassen</b><span>Matematik för åk 7–9 på Örtagårdsskolan. Frågor? Fråga eller mejla din <a class="mejl" data-u="nikola.petranovic" data-d="skola.malmo.se" href="#">lärare</a>.</span></div></footer>
<script>document.querySelectorAll('a.mejl').forEach(function(a){{a.href='mailto:'+a.dataset.u+'@'+a.dataset.d}})</script>
</body></html>"""
    p = os.path.join(UT, fil)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w').write(doc)

TRANA_AR = (7, 8, 9)
TRANA_FARG = {}  # färgerna kommer nu från årskursens variabler

def innehall(k, s, t):
    d = LANKAR.get(str(k), {})
    lek = s == 'lektioner'
    # Under Lektioner visas även Mål och framgångskriterier (per avsnitt) och Tidsplan och arbetsgång (sist i kapitlet)
    tp = d.get('tidsplan-och-arbetsgang', {}) if lek else {}
    # Uppgifterna (PDF) ligger först i kapitlet på Test-, Repetition- och Diagnos-sidan, före genomgången
    extra_upg = d.get({'test': 'testuppgifter', 'repetition': 'repetitionsuppgifter', 'diagnos': 'diagnosuppgifter'}.get(s, ''), {})
    mal = d.get('mal-och-framgangskriterier', {}) if lek else {}
    sm = d.get('sammanfattning', {}) if lek else {}  # en sammanfattning per kapitel, efter avsnitten
    if s == 'trygg-start':  # t.ex. övningsprov sist i kapitlet
        sm = d.get('trygg-start-extra', {})
    if s not in d and not extra_upg and not tp and not mal and not sm:
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
    if fil == 'bedomning.html':
        import sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); import bedomning
        return bedomning.sida()
    if fil == 'nationella-prov.html':
        import sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); import np as npsida
        return npsida.sida() + ovningsprov_sida(9, 'ak9/', npsida.OVP_INTRO) + '</div>'
    if fil == 'hjalp.html':
        import sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); import hjalp
        return hjalp.sida()
    if fil == 'amnesord.html' and LANKAR.get('amnesord'):
        shutil.copytree(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'flaggor'), os.path.join(UT, 'bilder', 'flaggor'), dirs_exist_ok=True)
        lank = ''.join(f'<a class="sprak" href="https://drive.google.com/file/d/{i}/view" target="_blank" rel="noopener"><img src="bilder/flaggor/{f}.svg" alt="">{html.escape(n)}</a>' for n, i, f in LANKAR['amnesord'])
        return f'<div class="ruta"><h3>Termer för matematikundervisning</h3><p style="margin:0 0 14px">Klicka på ditt språk för att öppna ordlistan (PDF).</p><div class="lankar" style="padding:0">{lank}</div></div>'
    return '<div class="ruta"><h3>Materialet kommer snart</h3><p style="margin:0">Sidan fylls på under läsåret.</p></div>'

IKON = dict(
 prov='<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.8h6V4M8.5 10.5l1.6 1.6 3.2-3.2M8.5 16l1.6 1.6 3.2-3.2"/>',
 boj='<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.8"/><path d="M5.6 5.6l3.7 3.7M18.4 5.6l-3.7 3.7M5.6 18.4l3.7-3.7M18.4 18.4l-3.7-3.7"/>',
 medalj='<circle cx="12" cy="9" r="6"/><path d="M8.6 13.9 7 21l5-2.6 5 2.6-1.6-7.1"/>',
 prata='<path d="M4 4h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3.5V14H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M19 8h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v3l-4-3h-3a2 2 0 0 1-2-1.6"/>')
def ikon(n):
    return f'<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{IKON[n]}</svg>'

# Årskurssidans rutor i tre grupper: (filnamn, sidnamn, rubrik, beskrivning)
GRUPPER = [
 ('Lär dig', 'Följ med i lektionerna och kom ihåg vad ni gjorde.', [
   ('07_Lektioner', 'lektioner', 'Lektioner', 'Genomgångar och mål för varje avsnitt.'),
   ('08_Tillbakablick', 'tillbakablick', 'Tillbakablick', 'Repetera förra lektionen på några minuter.'),
   ('10_Trygg_start', 'trygg-start', 'Trygg start', 'Grunderna steg för steg, i lugn takt.')]),
 ('Träna', 'Öva mer, på det sätt som passar dig.', [
   ('06_Problemlosning', 'problemlosning', 'Problemlösning', 'Kluriga uppgifter på olika nivåer.'),
   ('16_Interaktiva_ovningar', 'trana', 'Interaktiva övningar', 'Träna direkt i mobilen eller datorn.'),
   ('11_Repetition', 'repetition', 'Repetition', 'Gå igenom hela kapitlet en gång till.')]),
 ('Kolla vad du kan', 'Se vad du redan kan och vad du ska träna mer på.', [
   ('12_Diagnos', 'diagnos', 'Diagnos', 'Hitta det du behöver öva mer på.'),
   ('13_Test', 'test', 'Test', 'Testa dig själv när kapitlet är klart.'),
   ('17_Ovningsprov', 'ovningsprov', 'Övningsprov', 'Öva inför provet under provliknande former.')]),
]

# De fyra gemensamma sidorna får samma färg som sin ikon på startsidan
SIDFARG = {'bedomning.html': farger('havsgron'), 'hjalp.html': farger('mint2'), 'nationella-prov.html': farger('solgul'), 'amnesord.html': farger('korall')}
# En nyans ljusare rubrikruta och knappar på de fyra sidorna (Nikola 2026-10-24)
for _c in SIDFARG.values(): _c['hero'] = mix(_c['main'], '#FFFFFF', .3); _c['knapp'] = mix(_c['ink'], _c['main'], .3)
# Gamla färger i innehållet (bedomning.py, hjalp.py, np.py) -> vintagefärger
FARGBYTE = {'#2C4152': '#3E5463', '#426B89': '#5F7E92', '#5A7552': '#5C7A55', '#96505A': '#8A5A4E', '#B95E52': '#A8705F',
            '#8A5E22': '#6B5626', '#F2CD69': '#D3BE8E', '#1F6E6C': '#6A5F80', '#DDEBF3': '#EEF2F5', '#E3ECDD': '#EEF3EC',
            '#F7E3DE': '#F5ECE8', '#F8EBC9': '#F7F2E6', '#D9EEEC': '#F2F0F5'}
# Nationella prov: allt i diskreta sandfärger
FARGBYTE_NP = {'#2C4152': '#6B4E0E', '#426B89': '#8A6614', '#5A7552': '#A67C17', '#96505A': '#7A5A12', '#B95E52': '#B8891F',
               '#8A5E22': '#7A5A12', '#F2CD69': '#E9B949', '#1F6E6C': '#8A6614', '#DDEBF3': '#FBEFD0', '#E3ECDD': '#FBF1DA',
               '#F7E3DE': '#F8E6BC', '#F8EBC9': '#FBF1DA', '#D9EEEC': '#FBEFD0',
               '#DDBE88': '#F7DE9A', '#5A4219': '#8A6614', '#A07E3E': '#A67C17', '#8F6C2E': '#8A6614', '#7A5A22': '#7A5A12', '#F6EBD3': '#FBF1DA', '#F3E8D3': '#FBF1DA'}
# Så får du hjälp: rosa detaljer blir mint
FARGBYTE_HJALP = {**FARGBYTE, '#B95E52': '#3F8582', '#96505A': '#2F6B69', '#F7E3DE': '#E6F6F3'}
# Grundträning (huvudräkning och klockan), gemensam sida som bara länkas från startsidan. Dold tills Nikola godkänt.
VISA_GRUNDTRANING = True
ORG['indigo'] = ('#9AA5B1', '#2E3A46', '#EEF1F4')  # neutral gråblå (Nikola 2026-10-24)
GT_FARG = farger('indigo')

def byt_farger(h, tabell=None):
    import re
    tabell = tabell or FARGBYTE
    return re.sub('|'.join(tabell), lambda m: tabell[m.group(0).upper()], h, flags=re.I)

def bygg():
    open(os.path.join(UT, 'stil.css'), 'w').write(CSS)
    # Startsida
    inneh = [rt for _, _, rutor in GRUPPER for _, _, rt, _ in rutor]  # samma som rutorna på årskurssidorna
    kort = ''
    for k, c in AR.items():
        kort += (f'<a href="ak{k}.html" style="background:{c["main"]};box-shadow:inset 0 0 0 2px {c["ram"]}"><div class="sol" style="background:{c["ljus"]}" aria-hidden="true">{k}</div>'
                 f'<h3>Åk {k}</h3><div class="bok" style="color:{c["ink"]}">Matematik {c["bok"]}</div>'
                 + f'<span class="gaa" style="background:{c["ink"]}">Gå till åk {k} →</span></a>')
    veta = [('himmel', 'prov', 'bedomning.html', 'Hur bedöms du?', 'Så visar du vad du kan och vad som krävs för olika betyg.', 'Läs om bedömning'),
            ('apri', 'boj', 'hjalp.html', 'Så får du hjälp', 'Stöd du kan få och sätt som hjälper dig att lära dig matte.', 'Hitta hjälp'),
            ('sand', 'medalj', 'nationella-prov.html', 'Nationella prov', 'Så går provet i åk 9 till, och så tränar du inför det.', 'Om provet'),
            ('lav', 'prata', 'amnesord.html', 'Förstår du inte ett ord?', 'Viktiga matteord förklarade på ditt språk.', 'Ämnesord på olika språk')]
    veta = ''.join(f'<a href="{h}"><div class="pebble" style="background:{ORG[c][1]}">{ikon(i)}</div><h3>{t}</h3><p>{p}</p><b style="color:{ORG[c][1]}">{l} →</b></a>' for c, i, h, t, p, l in veta)
    TEXT = {7: 'Utforska, träna och utmana dina matematikkunskaper.', 8: 'Bygg vidare och utveckla din matematiska förmåga.', 9: 'Fördjupa, resonera och förbered dig för framtiden.'}
    BOCK = '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10"/><path d="M5.5 10.5l3 3 6-6.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    kort = ''.join(f"""<a class="ak2" href="ak{k}.html" style="--m:{c['main']};--d:{c['ink']};border-color:{mix(c['main'], '#FFFFFF', .45)};background:linear-gradient(135deg,{mix(c['main'], '#FFFFFF', .9)},{mix(c['main'], '#FFFFFF', .7)})">
<span class="blob b1" style="background:{mix(c['main'], '#FFFFFF', .6)}"></span><span class="blob b2" style="background:{mix(c['main'], '#FFFFFF', .78)}"></span>
<span class="prick p1"></span><span class="prick p2"></span>
<div class="inne"><div class="nr"><span class="sol"></span><b style="color:{c['ink']}">{k}</b><small style="color:{c['ink']}">Åk {k}</small></div>
<div class="lista"><h3 style="color:{c['ink']}">Matematik {c['bok']}</h3><ul>{''.join(f'<li>{BOCK}{t}</li>' for t in ('Planering', 'Lektioner', 'Problemlösning', 'Repetitionsuppgifter'))}</ul><em style="color:{c['ink']}">och mycket mer!</em></div></div>
<span class="gaa" style="background:{c['ink']}">Gå till Åk {k} →</span></a>""" for k, c in AR.items())
    rad = [('prov', 'bedomning.html', 'Bedömning', 'Mål, kriterier och vad som krävs för de olika betygsstegen.'),
           ('boj', 'hjalp.html', 'Så får du hjälp', 'Stöd, tips och resurser du kan använda.'),
           ('medalj', 'nationella-prov.html', 'Nationella prov', 'Information och förberedelser inför proven i åk 9.'),
           ('prata', 'amnesord.html', 'Ämnesord', 'Viktiga matteord förklarade på ditt språk.')]
    rad = ''.join(f'<a href="{h}"><span class="rik" style="background:{mix(SIDFARG[h]["main"], "#FFFFFF", .6)}">{ikon(i).replace("#fff", SIDFARG[h]["ink"])}</span><span><b>{t}</b><small>{p}</small></span></a>' for i, h, t, p in rad)
    import sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); import grundtraning as gt
    gtlank = gt.startlank(GT_FARG, mix) if VISA_GRUNDTRANING else ''
    sida('index.html', 'Startsida', 'Startsida', NEUTRAL, f"""
<main class="hem"><div class="wrap"><section class="topprubrik"><img src="bilder/kompass-matte.png" alt=""><div><h1>Mattekompassen</h1><p>Din väg genom matematiken i årskurs 7–9</p></div></section>
<h2 class="sr">Välj din årskurs</h2><div class="kkrad">{kort}</div>
<div class="infor">{rad}</div>{gtlank}</div></main>""")
    # Årskurssidor och undersidor
    for k, c in AR.items():
        grupper = ''
        for n, (rub, g, rutor) in enumerate(GRUPPER, 1):
            t = ''.join(f'<a class="t" href="ak{k}/{s}.html"><img src="bilder/ak{k}/{f}.png" alt=""><span class="pil" aria-hidden="true">→</span><h3>{rt}</h3><p>{p}</p>'
                        + ('<span class="las-ikon">🔒 Lösenord</span>' if s == 'lektioner' else '') + '</a>' for f, s, rt, p in rutor)
            grupper += f'<div class="grupp"><div><div class="nr">0{n}</div><h2>{rub}</h2><p class="g">{g}</p></div><div class="rad3">{t}</div></div>'
        sida(f'ak{k}.html', f'Åk {k}', f'Åk {k}', c, panel(c, f'Årskurs {k}', 'Lär dig nytt, träna mer och kolla vad du kan.',
             f'Matematik {c["bok"]}', [('Startsida', 'index.html'), (f'Åk {k}', None)], f'<div class="nrc" style="color:{c["ink"]}" aria-hidden="true">{k}</div>')
             + f'<main><div class="wrap">{grupper}<p style="margin:34px 0 10px;text-align:center"><a class="knapp pil" href="index.html" aria-label="Till startsidan" title="Till startsidan">←</a></p></div></main>')
        if k in TRANA_AR:
            sti = [('Startsida', 'index.html'), (f'Åk {k}', f'ak{k}.html'), ('Interaktiva övningar', 'ak%d/trana.html' % k)]
            hero = lambda t, p, sti=sti: panel(c, t, p, f'Åk {k} · Matematik {c["bok"]}', sti, f'<img class="bild" src="../bilder/ak{k}/16_Interaktiva_ovningar.png" alt="">', '../')
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
            sida(f'ak{k}/trana.html', f'Interaktiva övningar – åk {k}', f'Åk {k}', c, hero('Interaktiva övningar', 'Klicka, dra och få svar direkt. Välj kapitel och typ av övning.', sti[:2] + [('Interaktiva övningar', None)]) + f"""
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
{panel(c, t, '', f'Åk {k} · Matematik {c["bok"]}', [('Startsida', 'index.html'), (f'Åk {k}', f'ak{k}.html'), (t, None)], f'<img class="bild" src="../bilder/ak{k}/{f}.png" alt="">', '../')}
<main><section><div class="wrap">{'<a class="ovlank" href="../problemlosning.html"><span class="ovik" aria-hidden="true">💡</span><span class="ovtxt"><b>Så arbetar vi med problemlösning</b>Läs om de tre nivåerna och strategier som hjälper dig när du fastnar.</span><span class="ovknapp">Nivåer och strategier →</span></a>' if s == 'problemlosning' else ''}{krypterad(innehall(k, s, t)) if s == 'lektioner' else ovningsprov_sida(k) if (s == 'ovningsprov' and k == 9) else innehall(k, s, t)}
<a class="knapp" href="../ak{k}.html">← Tillbaka till åk {k}</a></div></section></main>""", rot='../')
    # Ämnesord och Bedömning (länkas från rutorna på startsidan, inte från menyn)
    for fil, t, text in [('amnesord.html', 'Ämnesord på olika språk', 'Viktiga matteord på svenska och ditt språk. Välj ditt språk nedan.'),
                         ('bedomning.html', 'Hur bedöms du?', 'Vad bedöms i matematik, och hur visar du vad du kan?'),
                         ('hjalp.html', 'Så får du hjälp i matte', 'Så gör vi för att alla ska lära sig matte.'),
                         ('nationella-prov.html', 'Nationella prov i matematik', 'Så går provet till i åk 9, och så kan du förbereda dig.')]:
        c = SIDFARG[fil]
        sida(fil, t, {'bedomning.html': 'Bedömning', 'hjalp.html': 'Så får du hjälp', 'nationella-prov.html': 'Nationella prov'}.get(fil, ''), c, f"""
{panel(c, t, text, '', [('Startsida', 'index.html'), (t, None)])}
<main><section><div class="wrap">{byt_farger(extra(fil), FARGBYTE_NP if fil == 'nationella-prov.html' else FARGBYTE_HJALP if fil == 'hjalp.html' else None)}
<a class="knapp" href="index.html">← Till startsidan</a></div></section></main>""")
    # Gemensam sida om problemlösning (länkas från årskursernas problemlösningssidor)
    arl = ''.join(f'<a href="ak{k}/problemlosning.html" style="background:{AR[k]["ink"]}">Åk {k}<small>Matematik {AR[k]["bok"]} · problemlösning per kapitel</small></a>' for k in AR)
    sida('problemlosning.html', 'Problemlösning', '', NEUTRAL, f"""
{panel(NEUTRAL, 'Problemlösning', 'Att lösa problem är att hitta en väg när du inte direkt vet hur du ska göra.', '', [('Startsida', 'index.html'), ('Problemlösning', None)])}
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
    if VISA_GRUNDTRANING:
        sida('grundtraning.html', 'Grundträning', '', GT_FARG, gt.kropp(panel, GT_FARG))
        shutil.copy(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'grundtraning.js'), UT)
    for js in ('trana.js', 'trana-ak7.js', 'trana-ak8.js', 'trana-ak9.js'):
        shutil.copy(os.path.join(os.path.dirname(os.path.abspath(__file__)), js), UT)
    open(os.path.join(UT, '.nojekyll'), 'w').write('')

if __name__ == '__main__':
    bygg()
