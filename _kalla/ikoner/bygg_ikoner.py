"""Ikonerna för årskurssidorna (Organic-färger, utan textband). Kör: python3 bygg_ikoner.py
Källor: ikoner-ak{7,8,9}.html (vintagefärger 2026-10-24; ändra färger direkt i dem). PNG hamnar i ../../webbplats/bilder/akN/."""
import pathlib, subprocess, re
H = pathlib.Path(__file__).parent
UT = pathlib.Path('/mnt/project-files/webbplats/bilder')
MID = {7: '#818D75', 8: '#7FAEB6', 9: '#CE9BA2'}
OVNINGSPROV = """ '17_Ovningsprov':{lbl:['ÖVNINGSPROV'],svg:`
  <rect x="170" y="130" width="440" height="620" rx="30" fill="#FFFFFF" stroke="${ink}" stroke-width="18"/>
  <path d="M240 225 H470" stroke="${ink}" stroke-width="24" stroke-linecap="round"/>
  <path d="M240 320 H540 M240 400 H500 M240 480 H540 M240 560 H450" stroke="MID" stroke-width="18" stroke-linecap="round"/>
  <circle cx="660" cy="560" r="170" fill="#F3DFAE" stroke="${ink}" stroke-width="18"/>
  <rect x="625" y="350" width="70" height="40" rx="10" fill="${ink}"/>
  <path d="M660 470 V560 L720 600" fill="none" stroke="${ink}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M780 420 L810 390" stroke="${ink}" stroke-width="18" stroke-linecap="round"/>`},
"""
VILL = ['07_Lektioner', '08_Tillbakablick', '10_Trygg_start', '06_Problemlosning', '16_Interaktiva_ovningar', '11_Repetition', '12_Diagnos', '13_Test', '17_Ovningsprov']
js = r'''const {chromium}=require('playwright');(async()=>{const [h,ut,...v]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1100,height:1100}});
for(const k of [7,8,9]){await p.goto('file://'+h+'/ikoner-ak'+k+'.html');await p.waitForTimeout(300);
for(const n of v){await p.locator('svg[data-name="'+n+'"]').screenshot({path:ut+'/ak'+k+'/'+n+'.png',omitBackground:true});}}await b.close();})();'''
(H/'rendera.js').write_text(js)
subprocess.run(['node', str(H/'rendera.js'), str(H), str(UT), *VILL], check=True)
# krymp till 400 px (räcker för rutorna och sparar laddtid)
from PIL import Image
for k in (7, 8, 9):
    for n in VILL:
        p = UT/f'ak{k}/{n}.png'; im = Image.open(p); im.resize((400, 400), Image.LANCZOS).save(p, optimize=True)
print('ikoner klara')
