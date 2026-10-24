"""Lugna ikoner (en årskursfärg i nyanser + små accenter i rött/gult/blått).
Mall: mall-lugn-akN.html (Organic-ikonerna). Skriver ikoner-akN.html; kör sedan bygg_ikoner.py."""
import pathlib, re
H = pathlib.Path(__file__).parent
def mix(a, b, t):
    A=[int(a[i:i+2],16) for i in (1,3,5)]; B=[int(b[i:i+2],16) for i in (1,3,5)]
    return '#%02X%02X%02X'%tuple(round(x+(y-x)*t) for x,y in zip(A,B))
GAMLA = {7: dict(ink='#555F4C', mid='#818D75', m2='#A9B39C', l='#D2DCCB', vl='#EAF4EA', w='#F6FAF5'),
         8: dict(ink='#3F6A70', mid='#7FAEB6', m2='#A8CDD2', l='#CBE5E6', vl='#E6F6F4', w='#F5FBFA'),
         9: dict(ink='#7E4D57', mid='#CE9BA2', m2='#E0BAC0', l='#EED3D7', vl='#FCEEF1', w='#FEF8F9')}
NY = {7: ('#58A73E','#2E6E28'), 8: ('#1A86B0','#0F5F82'), 9: ('#8A4A78','#5E2E54')}
ACC = {'#C47B63': '#E07A5F', '#E3BC72': '#E9B949', '#F3DFAE': '#F7E2A8'}
for k in (7, 8, 9):
    m, d = NY[k]; W = '#FFFFFF'
    ny = dict(ink=d, mid=mix(m, d, .35), m2=mix(m, W, .35), l=mix(m, W, .65), vl=mix(m, W, .84), w=mix(m, W, .93))
    byt = {**{GAMLA[k][n]: ny[n] for n in ny}, **ACC}
    s = (H/f'mall-lugn-ak{k}.html').read_text()
    s = re.sub('|'.join(byt), lambda x: byt[x.group(0).upper()], s, flags=re.I)
    (H/f'ikoner-ak{k}.html').write_text(s)
