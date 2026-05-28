#!/usr/bin/env python3
"""One-time: wrap existing <nav class="nav"...>...</nav> and <footer>...</footer>
in build markers so build.py can target them. Safe to run once."""
import re, glob

pages = glob.glob('*.html') + glob.glob('*/index.html') + glob.glob('*/*/index.html')
# 404 is self-contained (no shared nav/footer) — skip it
pages = [p for p in pages if p != '404.html']

nav_re = re.compile(r'<nav class="nav.*?</nav>', re.S)
foot_re = re.compile(r'<footer class="footer">.*?</footer>', re.S)

for p in pages:
    h = open(p).read()
    changed = False
    if '<!--NAV-->' not in h:
        m = nav_re.search(h)
        if m:
            h = h[:m.start()] + '<!--NAV-->' + m.group(0) + '<!--/NAV-->' + h[m.end():]
            changed = True
    if '<!--FOOTER-->' not in h:
        m = foot_re.search(h)
        if m:
            h = h[:m.start()] + '<!--FOOTER-->' + m.group(0) + '<!--/FOOTER-->' + h[m.end():]
            changed = True
    if changed:
        open(p,'w').write(h)
        print("marked", p)
print("done")
