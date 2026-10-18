# Skapar övnings-PDF:er (uppgifter + separat facit) för nationella-prov.html från np.EXEMPEL. Kör: python3 np_pdf.py <utmapp>
import sys, os, subprocess, glob, html
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import np as N
ut = sys.argv[1]; os.makedirs(ut, exist_ok=True)
chrome = glob.glob('/opt/pw-browsers/chromium*/chrome-linux/chrome')[0]
CSS = """@page{size:A4;margin:18mm 18mm 16mm}body{font-family:Carlito,Calibri,Arial,sans-serif;color:#292A28;font-size:12.5pt;line-height:1.45}
.head{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid var(--g);padding-bottom:6px;margin-bottom:6px}
h1{margin:0;font-size:22pt;color:var(--g)}.sm{font-size:10pt;color:#5F6368}.om{background:var(--gl);border-radius:8px;padding:8px 12px;margin:10px 0 14px;font-size:11pt}
.u{display:flex;gap:12px;padding:10px 0 14px;border-bottom:1px solid #E6E1D7;break-inside:avoid}.nr{flex:0 0 28px;height:28px;border-radius:8px;background:var(--g);color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center}
.t{flex:1}.p{flex:0 0 36px;text-align:right;font-weight:700;color:var(--g)}.alt{margin:6px 0 0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:8px 22px}
.svar{margin-top:14px}.svar span{display:inline-block;width:220px;border-bottom:1px solid #292A28}.los{margin-top:8px;height:var(--h);border:1px dashed #B7BDC5;border-radius:6px}
.f{margin-top:4px;background:var(--gl);border-radius:6px;padding:6px 10px}.tb{border-collapse:collapse;margin:6px 0}.tb th,.tb td{border:1px solid #B7BDC5;padding:3px 12px;text-align:center}.tb th{text-align:left;background:#F4F7F5}.fot{margin-top:16px;font-size:9.5pt;color:#8A8F98}"""
LOS = {'B': '150px', 'D': '150px'}
def gor(b, facit, suf, EX, nr):
    d = [x for x in N.DELPROV if x[0] == b][0]; _, g, gl, tid, rk, typ, var = d
    r = 'Räknare och formelblad är tillåtna.' if rk else 'Du får inte använda räknare eller formelblad.'
    s = [f'<!doctype html><html lang="sv"><meta charset="utf-8"><style>:root{{--g:{g};--gl:{gl}}}{CSS}</style><body>',
         f'<div class="head"><div><div class="sm">Mattekompassen · Träna inför nationella prov åk 9</div><h1>Delprov {b}{" – facit" if facit else ""}</h1></div><div class="sm">Övningsprov {nr}</div></div>']
    if not facit:
        s.append(f'<div class="om"><b>{tid}.</b> {r} {typ} {"Skriv hela lösningen i rutan: uträkning, förklaring och svar." if b in LOS else var}</div>')
    for i, (t, alt, p, svar) in enumerate(EX[b], 1):
        a = '<ul class="alt">' + ''.join(f'<li>□ {x}</li>' for x in alt) + '</ul>' if alt else ''
        if facit:
            body = f'{t}<div class="f"><b>Svar:</b> {svar}</div>'
        elif b in LOS:
            body = f'{t}<div class="los" style="--h:{LOS[b]}"></div>'
        else:
            body = t + a + ('' if alt else '<div class="svar">Svar: <span></span></div>')
        s.append(f'<div class="u"><div class="nr">{i}</div><div class="t">{body}</div><div class="p">{p} p</div></div>')
    s.append('<div class="fot">Egna övningsuppgifter som liknar nationella provet. De är inte uppgifter ur något riktigt prov.</div></body></html>')
    h = os.path.join(ut, f'_tmp_{b}.html'); open(h, 'w').write(''.join(s))
    pdf = os.path.join(ut, f'delprov-{b.lower()}{suf}{"-facit" if facit else ""}.pdf')
    subprocess.run([chrome, '--headless', '--no-sandbox', '--no-pdf-header-footer', f'--print-to-pdf={pdf}', 'file://' + h], capture_output=True)
    os.remove(h)
for nr, (suf, EX) in enumerate(N.VERSIONER, 1):
    for b in 'ABCD':
        gor(b, False, suf, EX, nr); gor(b, True, suf, EX, nr)
