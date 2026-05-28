#!/usr/bin/env python3
"""
build.py — stamp shared nav + footer into every page.

Edit the source once:  partials/nav.html  and  partials/footer.html
Then run:               python3 build.py
Every page between the <!--NAV-->..<!--/NAV--> and <!--FOOTER-->..<!--/FOOTER-->
markers is rewritten with the current partial. Output is plain static HTML.

Tokens in the partials:
  {{BASE}}          relative path back to site root for this page
                    (""  for /index.html, "../" for /x/, "../../" for /x/y/)
  {{NAV_SOLID}}     " solid" on every page except the homepage (which is transparent)
  {{CUR_<page>}}    ' aria-current="page"' on the matching nav item, else ""
"""
import re, glob, os

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)

NAV = open('partials/nav.html').read().rstrip('\n')
FOOTER = open('partials/footer.html').read().rstrip('\n')

pages = glob.glob('*.html') + glob.glob('*/index.html') + glob.glob('*/*/index.html')
pages = [p for p in pages if p != '404.html']

# which top-level section each page belongs to, for aria-current
SECTION_KEYS = ['projects','services','about','areas','contact']

def base_for(page):
    depth = page.count('/')          # index.html=0, x/index.html=1, x/y/index.html=2
    return '../'*depth               # "" , "../", "../../"

def section_of(page):
    # e.g. "services/index.html" -> "services" ; "areas/torquay/index.html" -> "areas"
    parts = page.split('/')
    if len(parts) == 1:              # root index.html -> homepage, no current
        return None
    return parts[0] if parts[0] in SECTION_KEYS else None

def render_nav(page):
    base = base_for(page)
    home = base if base else './'                      # root home link -> ./ not empty
    solid = '' if page == 'index.html' else ' solid'   # homepage nav is transparent
    out = NAV.replace('{{BASE}}', base).replace('{{HOME}}', home).replace('{{NAV_SOLID}}', solid)
    cur = section_of(page)
    for key in SECTION_KEYS:
        token = '{{CUR_%s}}' % key
        out = out.replace(token, ' aria-current="page"' if key == cur else '')
    return out

def render_footer(page):
    return FOOTER.replace('{{BASE}}', base_for(page))

nav_block = re.compile(r'<!--NAV-->.*?<!--/NAV-->', re.S)
foot_block = re.compile(r'<!--FOOTER-->.*?<!--/FOOTER-->', re.S)

n = 0
for p in pages:
    h = open(p).read()
    o = h
    if nav_block.search(h):
        repl = '<!--NAV-->' + render_nav(p) + '<!--/NAV-->'
        h = nav_block.sub(lambda m: repl, h)
    if foot_block.search(h):
        repl = '<!--FOOTER-->' + render_footer(p) + '<!--/FOOTER-->'
        h = foot_block.sub(lambda m: repl, h)
    if h != o:
        open(p, 'w').write(h)
        n += 1
        print("built", p)

print(f"\nDone — {n} page(s) updated from partials/nav.html + partials/footer.html")
