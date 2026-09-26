# KONIN Valves — website

Production website for KONIN Valves: industrial valves, automation solutions and
water treatment solutions.

React 19 + Vite 8 + Tailwind 4, pre-rendered to static HTML at build time so
every page is fully crawlable without JavaScript.

---

## Commands

```bash
npm install

npm run dev            # dev server
npm run build          # sitemap + typecheck + static build of all 55 routes → dist/
npm run preview        # serve dist/

npm run build:images   # regenerate all imagery from the source PDFs + legacy site
npm run lint
```

`dist/` is a plain static folder — deploy it to any static host.

---

## Where the content comes from

Every product name, specification, material, standard, address and phone number
on this site is transcribed from one of five KONIN sources. **Nothing is
invented.** If you add content, keep to the same rule and note the source.

| Source | Used for |
| --- | --- |
| `About KONIN Valves.docx` (most recent; its wording wins where sources overlap) | Company introduction, automation & control capabilities, the 14 inspection and testing capabilities, third-party inspection and specialised testing, product features & configurations, commitment; lead studio photographs of the 1PC, 2PC and 3PC ball valves, PRV, on/off PRV, PSV and needle valve |
| `konin-valves-pdf.pdf` (printed valve catalogue) | Valve size bands, MOC, seats, pressure ratings, operation, standards; company address, vision/mission, industries |
| Legacy `koninvalve.com` product pages | Per-valve engineering tables (sizes by class, design/testing standards, materials), salient features |
| `KONIN VALVES AND AUTOMATION SOLUTIONS.pdf` | Automation division text, the 11 panel types, PLC brands and bus systems, services |
| `Solution_Guide_Water KONIN.pdf` | The 11 water industry solutions and their descriptions |

The data layer lives in `src/data/` and is the single source of truth:

```
src/data/
  company.ts     company facts, certifications, contact, automation division
  valves.ts      23 valve products
  automation.ts  11 control panels + 2 services
  water.ts       11 water solutions
  industries.ts  17 industries
  categories.ts  the three categories + lookup helpers
  imageSizes.ts  AUTO-GENERATED — intrinsic image dimensions
```

### Known gaps

The automation PDF lists the eleven panel types by name and photograph only — it
publishes no ratings, enclosure classes or busbar sizes. Those product pages
therefore show a neutral engineering definition under **"What it is"** plus a
"Specification on enquiry" panel, rather than invented figures. Drop real
specs into the `specs` / `materials` arrays in `src/data/automation.ts` and the
tables appear automatically.

---

## Architecture

```
src/
  components/    Seo, PageHero, EnquiryForm, fx, ui primitives
    ui/          TiltCard + Layer — the 3D surface primitive
    products/    PremiumProductCard — the catalogue card
  sections/      page sections (home/*, CtaBand)
  layouts/       RootLayout, Navbar, Footer
  pages/         one file per route
  data/          content (above)
  lib/           motion system, pointer-parallax hook
  index.css      design tokens + component primitives
```

Routes are declared once in `src/routes.tsx`. Product routes use
`getStaticPaths`, so adding a product to a data file automatically produces a
pre-rendered page, a sitemap entry and mega-menu/footer links.

---

## Design system

"Precision Light" — a light, brand-tinted industrial system. The page ground is
a very pale KONIN blue rather than plain white, surfaces are white cards raised
off it, and depth comes from layered gradients, hairline borders and 3D
transforms instead of from darkness.

`index.css` defines the surface tones and every section picks one, so the
rhythm of a page is legible in the markup:

| Tone | Used for |
| --- | --- |
| `tone-canvas` | the pale brand-tinted page ground |
| `tone-surface` / `bg-white` | a section that should sit forward of its neighbours |
| `tone-tint` | the soft wash that separates two neighbouring sections |
| `tone-tint-deep` | a heavier wash — product rail, trust band, footer |
| `tone-brand` | the one rich passage: the brand gradient, for conversion moments |

Two neighbouring sections never share a tone. That alternation, not decoration,
is what gives the scroll its rhythm.

**Products always sit on a light studio plate** (`.product-stage`). The
cut-outs are flood-filled from photographs shot on white, so the plate is both
the honest ground for the photograph and what lets the product float clear of
the card on hover.

### 3D surfaces

`TiltCard` is the one tilt primitive. It writes the transform and two custom
properties (`--mx` / `--my`, `--glow`) straight to the DOM from a pointer
listener, so a grid of twenty cards costs no React renders while the pointer
moves; `.tilt-spotlight`, `.tilt-rim` and `.sheen` in `index.css` read those
properties. It is a **no-op on touch devices and under
`prefers-reduced-motion`** — a tilt driven by a pointer that does not exist is
only a liability. `Layer` pushes a child forward on the card's Z axis.

### Motion

Above the fold, intros run on CSS (`.anim-fade-up` and friends) so the LCP
element paints without waiting for hydration. Below the fold, `Reveal`,
`Stagger`/`StaggerItem` and `LineReveal` in `src/lib/motion.tsx` drive
scroll-triggered reveals, and every one of them degrades to a plain, instant
render for visitors who prefer reduced motion.

---

## Images

`npm run build:images` runs three steps:

1. **`extract-pdf-images.mjs`** — pulls product and solution imagery out of the
   three PDFs and the legacy site, and optimises everything to WebP. The valve
   catalogue is a scan, so its pages are rasterised at native resolution and the
   missing product shots are cropped from known regions.
2. **`make-cutouts.mjs`** — generates transparent-background versions of the
   studio product photos by flood-filling inward from the image border. This is
   what lets a product float over a photograph instead of stamping a white box
   onto it. Output mirrors the source directory (`products/`, `gallery/`)
   because those folders contain different images that share filenames.
3. **`gen-image-sizes.mjs`** — writes `src/data/imageSizes.ts` so every `<img>`
   carries explicit `width`/`height`. This is why CLS is 0.

`<Img>` reads those dimensions, lazy-loads by default, and takes `priority` for
the LCP image only. `cutoutFor()` transparently upgrades a product photo to its
cut-out when one exists.

---

## Motion

`src/lib/motion.tsx` defines the scroll system: one easing curve, one duration
scale, one viewport rule. `<Reveal>`, `<Stagger>` / `<StaggerItem>`,
`<LineReveal>` and `<TextReveal>` cover every scroll animation on the site.

`src/components/fx.tsx` holds the page-level effects: `<SmoothScroll>` (Lenis,
loaded lazily and skipped entirely for reduced motion), `<ScrollProgress>`,
`<Cursor>`, `<PageTransition>`, `<Marquee>`, `<Counter>`, `<Magnetic>`,
`<ImageReveal>` and `<ScrollCue>`. They are mounted once, in `RootLayout`.

Four rules worth keeping:

- **Above-the-fold content animates in CSS, not JavaScript** (`.anim-fade-up`
  etc. in `index.css`). JS-driven reveals render `opacity: 0` into the
  pre-rendered HTML, which delays the Largest Contentful Paint until hydration —
  it measured 1709 ms before that change. Do not put `<Reveal>` around hero
  content.
- **Do not clip an above-the-fold headline.** A line translated fully outside an
  `overflow: hidden` box paints nothing, so the LCP heuristic cannot see it
  until the animation has played. The hero headline therefore rises with
  `.anim-fade-up` rather than out of a mask. Clipped line reveals
  (`<LineReveal>`) are used freely below the fold, where they cost nothing.
- **Never put the reveal clip on the element the observer watches.**
  `<ImageReveal>` observes an outer wrapper and clips a child, because a target
  clipped to `inset(100%)` has zero intersection area — IntersectionObserver
  reports it as never visible and the reveal can never fire.
- **Reduced motion is honoured three times**: the hooks return plain elements,
  Lenis is never started, and a global media query neutralises transitions. A
  `<noscript>` block in `index.html` forces reveal-hidden content visible when
  JavaScript is off.

---

## SEO

- All 55 routes pre-rendered to static HTML with real content in the markup.
- Unique title + meta description per page, within SERP length limits.
- Canonical, Open Graph and Twitter tags on every page.
- JSON-LD: Organization, WebSite, BreadcrumbList, Product, ItemList, AboutPage,
  ContactPage.
- `sitemap.xml` and `robots.txt` are generated from the route data at build time
  (`gen-seo.mjs`), so they cannot drift. `llms.txt` describes the site for agents.

### Verification

```bash
npm run build
npm run preview
node scripts/audit-routes.mjs http://localhost:4321   # crawls all 55 routes
node scripts/check-assets.mjs                         # every referenced asset exists
```

`audit-routes.mjs` checks status codes, heading structure, title/description
length and uniqueness, canonical and social tags, JSON-LD validity, `alt` text,
image dimensions and internal links. It should report **0 problems**.

---

## Contact form

`src/components/EnquiryForm.tsx` has no backend and does not pretend to. It
validates client-side and composes a structured message into the visitor's mail
client, addressed to KONIN's published sales address — so it works as shipped.

To post to a server instead, set `FORM_ENDPOINT` at the top of that file. The
legacy site posted to `TestResult_attach_captcha_code.php`, which also expected
captcha/OTP fields that are not reproduced here; it is deliberately left
disconnected rather than wired up to fail silently.
