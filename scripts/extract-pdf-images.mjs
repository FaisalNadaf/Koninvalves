/**
 * Extracts genuine product / solution imagery from the three KONIN source PDFs
 * and from the legacy website, then optimises everything to WebP for the web.
 *
 * Run:  node scripts/extract-pdf-images.mjs
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'public', 'img')
const LEGACY = 'C:/Users/faisa/OneDrive/Desktop/Konin-valves---public_html/images'
const SCRATCH = path.join(ROOT, '.pdfwork')

const dirs = [
  'products',
  'gallery',
  'automation',
  'water',
  'industries',
  'brand',
  'company',
]
for (const d of [OUT, SCRATCH, ...dirs.map((d) => path.join(OUT, d))]) {
  fs.mkdirSync(d, { recursive: true })
}

/* ------------------------------------------------------------------ */
/* 1. Rasterise the (scanned) valve catalogue + dump embedded images   */
/* ------------------------------------------------------------------ */

const PY = `
import fitz, os, json
out = r'${SCRATCH.replace(/\\/g, '/')}'
srcs = {
 'valves':     r'C:\\Users\\faisa\\OneDrive\\Desktop\\konin-valves-pdf.pdf',
 'automation': r'C:\\Users\\faisa\\OneDrive\\Desktop\\KONIN VALVES AND AUTOMATION SOLUTIONS.pdf',
 'water':      r'C:\\Users\\faisa\\OneDrive\\Desktop\\Solution_Guide_Water KONIN.pdf',
}
man = {}
# The valve catalogue is a scan: render pages at native scan resolution (200dpi).
d = fitz.open(srcs['valves'])
for i, pg in enumerate(d):
    pg.get_pixmap(dpi=200).save(os.path.join(out, 'valvepage_%d.png' % (i + 1)))
man['valve_pages'] = d.page_count

# Automation + water PDFs carry real embedded raster images: pull them directly.
for key in ('automation', 'water'):
    d = fitz.open(srcs[key]); rec = []
    for i, pg in enumerate(d):
        for im in pg.get_images(full=True):
            xref = im[0]
            try:
                px = d.extract_image(xref)
            except Exception:
                continue
            # Skip logos / rules / text-strips: keep only real photographs.
            # Some panel shots are narrow + tall, so gate on area and aspect too.
            w, h = px['width'], px['height']
            if w < 95 or h < 130 or (w * h) < 14000 or (w / h) > 4:
                continue
            fn = '%s_p%d_x%d.%s' % (key, i + 1, xref, px['ext'])
            open(os.path.join(out, fn), 'wb').write(px['image'])
            rec.append({'page': i + 1, 'xref': xref, 'file': fn,
                        'w': px['width'], 'h': px['height']})
    man[key] = rec
print(json.dumps(man))
`
const manifest = JSON.parse(
  execFileSync('python', ['-c', PY], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim()
)
console.log(
  `PDF dump → valve pages: ${manifest.valve_pages}, automation imgs: ${manifest.automation.length}, water imgs: ${manifest.water.length}`
)

/* ------------------------------------------------------------------ */
/* 2. Helpers                                                          */
/* ------------------------------------------------------------------ */

/** Crop a normalised rect [x, y, w, h] (0..1) out of a rendered PDF page. */
async function cropPage(page, rect, dest, opts = {}) {
  const src = path.join(SCRATCH, `valvepage_${page}.png`)
  const meta = await sharp(src).metadata()
  const left = Math.round(rect[0] * meta.width)
  const top = Math.round(rect[1] * meta.height)
  const width = Math.round(rect[2] * meta.width)
  const height = Math.round(rect[3] * meta.height)
  let img = sharp(src).extract({ left, top, width, height })
  if (opts.trim !== false) img = img.trim({ threshold: 12 })
  await img
    .resize({
      width: opts.width ?? 720,
      height: opts.width ?? 720,
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
      withoutEnlargement: false,
    })
    .flatten({ background: '#ffffff' })
    .webp({ quality: 90 })
    .toFile(dest)
  console.log('  crop →', path.basename(dest))
}

/** Optimise an arbitrary source image into WebP at a target width. */
async function toWebp(src, dest, width, opts = {}) {
  if (!fs.existsSync(src)) {
    console.warn('  !! missing source:', src)
    return false
  }
  let img = sharp(src)
  if (opts.trim) img = img.trim({ threshold: 14 })
  await img
    .resize({
      width,
      height: opts.height,
      fit: opts.fit ?? 'inside',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
      withoutEnlargement: !opts.enlarge,
    })
    .flatten({ background: opts.bg ?? '#ffffff' })
    .webp({ quality: opts.quality ?? 84 })
    .toFile(dest)
  return true
}

/* ------------------------------------------------------------------ */
/* 3. Valve product shots missing from the legacy site                 */
/*    (cropped cleanly out of the scanned catalogue)                   */
/* ------------------------------------------------------------------ */

console.log('\nCropping valve catalogue product shots…')
// Page 2 (right column) — double flanged butterfly valve
await cropPage(2, [0.845, 0.096, 0.15, 0.112], path.join(OUT, 'products/double-flanged-butterfly-valve.webp'))
// Page 3 (right column) — air valve
await cropPage(3, [0.77, 0.585, 0.22, 0.085], path.join(OUT, 'products/air-valve.webp'))
// Page 3 (right column) — strainer (two bodies: Y-type + flanged)
await cropPage(3, [0.82, 0.795, 0.17, 0.075], path.join(OUT, 'products/strainer.webp'))
// Page 3 (left column) — wafer check valve
await cropPage(3, [0.30, 0.093, 0.172, 0.088], path.join(OUT, 'products/wafer-check-valve.webp'))
// Page 4 — industry montage band (oil rig / power / cooling towers)
await cropPage(4, [0.0, 0.185, 1.0, 0.19], path.join(OUT, 'company/industries-band.webp'), {
  trim: false,
  width: 1600,
})

/* ------------------------------------------------------------------ */
/* 4. Automation solutions imagery (real control-panel photography)    */
/* ------------------------------------------------------------------ */

console.log('\nProcessing automation imagery…')
const autoMap = {
  automation_p4_x58: 'power-control-center',
  automation_p4_x60: 'motor-control-center',
  automation_p4_x62: 'auto-main-failure-panel',
  automation_p4_x64: 'sub-distribution-panel',
  automation_p4_x66: 'lighting-distribution-board',
  automation_p4_x68: 'automatic-power-factor-control',
  automation_p4_x72: 'variable-frequency-drive',
  automation_p4_x74: 'programmable-logic-controller',
  automation_p5_x80: 'oem-panel',
  automation_p5_x82: 'fcma-soft-starter-panel',
  automation_p5_x84: 'autotransformer-starter-panel',
  automation_p7_x96: 'panel-service-maintenance',
  automation_p7_x97: 'panel-engineering-team',
  automation_p8_x104: 'automation-capability',
  automation_p1_x7: 'automation-hero',
}
for (const rec of manifest.automation) {
  const key = rec.file.replace(/\.[a-z]+$/i, '')
  const slug = autoMap[key]
  if (!slug) continue
  const wide = rec.w > rec.h * 1.4
  await toWebp(
    path.join(SCRATCH, rec.file),
    path.join(OUT, `automation/${slug}.webp`),
    wide ? 1280 : 760,
    { enlarge: true, quality: 86 }
  )
  console.log('  automation →', slug)
}

/* ------------------------------------------------------------------ */
/* 5. Water solutions imagery (one lead visual per solution page)      */
/* ------------------------------------------------------------------ */

console.log('\nProcessing water solutions imagery…')
const waterByPage = {
  2: 'dam-automation',
  3: 'canal-management',
  4: 'pump-house-automation',
  5: 'water-treatment-plant-automation',
  6: 'effluent-treatment-plant-automation',
  7: 'sewage-treatment-plant-automation',
  8: 'desalination-plant-automation',
  9: 'water-distribution-collection-system',
  10: 'pipeline-condition-monitoring',
  11: 'water-source-condition-monitoring',
  12: 'autonomous-power-supply-system',
}
const waterHero = { 1: 'water-hero' }
const byPage = new Map()
for (const rec of manifest.water) {
  const list = byPage.get(rec.page) ?? []
  list.push(rec)
  byPage.set(rec.page, list)
}
for (const [page, list] of byPage) {
  const slug = waterByPage[page] ?? waterHero[page]
  if (!slug) continue
  // Prefer the physically largest image on the page as the lead visual.
  list.sort((a, b) => b.w * b.h - a.w * a.h)
  await toWebp(path.join(SCRATCH, list[0].file), path.join(OUT, `water/${slug}.webp`), 1100, {
    enlarge: true,
    quality: 86,
  })
  console.log('  water →', slug)
  if (list[1]) {
    await toWebp(path.join(SCRATCH, list[1].file), path.join(OUT, `water/${slug}-2.webp`), 900, {
      enlarge: true,
      quality: 84,
    })
  }
}

/* ------------------------------------------------------------------ */
/* 6. Legacy site assets → optimised WebP                              */
/* ------------------------------------------------------------------ */

console.log('\nProcessing legacy site assets…')

// Product photography (kept at native size, re-encoded)
const productSrc = path.join(LEGACY, 'products')
for (const f of fs.readdirSync(productSrc)) {
  const slug = f.replace(/\.[a-z]+$/i, '').toLowerCase()
  await toWebp(path.join(productSrc, f), path.join(OUT, `products/${slug}.webp`), 800, {
    quality: 88,
    enlarge: true,
  })
}

// Gallery / workshop photography
const gallerySrc = path.join(LEGACY, 'gallery')
for (const f of fs.readdirSync(gallerySrc)) {
  const slug = f.replace(/\.[a-z]+$/i, '').toLowerCase().replace(/['"]/g, '')
  await toWebp(path.join(gallerySrc, f), path.join(OUT, `gallery/${slug}.webp`), 700, {
    quality: 86,
  })
}

// Industry / application photography
const appSrc = path.join(LEGACY, 'applications')
for (const f of fs.readdirSync(appSrc)) {
  const slug = f.replace(/\.[a-z]+$/i, '').toLowerCase()
  await toWebp(path.join(appSrc, f), path.join(OUT, `industries/${slug}.webp`), 900, {
    quality: 82,
    enlarge: true,
  })
}

// Hero / editorial plates
const plates = [
  ['main-slider/image-2.webp', 'company/plant-1.webp', 1920],
  ['main-slider/image-3.webp', 'company/plant-2.webp', 1920],
  ['main-slider/image-4.webp', 'company/plant-3.webp', 1920],
  ['main-slider/image-5.webp', 'company/plant-4.webp', 1920],
  ['main-slider/image-6.webp', 'company/plant-5.webp', 1920],
  ['resource/about-1.jpg', 'company/about.webp', 1200],
  ['resource/lab-img.jpg', 'company/testing-lab.webp', 1100],
  ['resource/iso-certificate.jpg', 'company/cert-iso.webp', 700],
  ['resource/iec-certificate.jpg', 'company/cert-iec.webp', 700],
  ['resource/udyam-registration-certificate.jpg', 'company/cert-udyam.webp', 700],
]
for (const [src, dest, w] of plates) {
  await toWebp(path.join(LEGACY, src), path.join(OUT, dest), w, { quality: 82 })
}

// Brand marks
fs.copyFileSync(path.join(LEGACY, 'logo.webp'), path.join(OUT, 'brand/logo.webp'))
fs.copyFileSync(path.join(LEGACY, 'favicon.png'), path.join(OUT, 'brand/favicon.png'))

// Client logo wall
fs.mkdirSync(path.join(OUT, 'clients'), { recursive: true })
const clientSrc = path.join(LEGACY, 'clients')
for (const f of fs.readdirSync(clientSrc)) {
  await toWebp(
    path.join(clientSrc, f),
    path.join(OUT, `clients/${f.replace(/\.[a-z]+$/i, '')}.webp`),
    320,
    { quality: 84 }
  )
}

/* ------------------------------------------------------------------ */

const count = (d) =>
  fs.existsSync(path.join(OUT, d)) ? fs.readdirSync(path.join(OUT, d)).length : 0
console.log('\n=== IMAGE PIPELINE COMPLETE ===')
let total = 0
for (const d of [...dirs, 'clients']) {
  const c = count(d)
  total += c
  console.log(`  ${d.padEnd(14)} ${c}`)
}
console.log(`  ${'TOTAL'.padEnd(14)} ${total}`)
