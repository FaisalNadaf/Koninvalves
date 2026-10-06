/**
 * Pulls KONIN's photographs out of "valve photos.docx" and writes them to
 * public/img as WebP under descriptive names.
 *
 * The document is a run of headings, each followed by the photograph it
 * names: six product photographs ("Butterfly valve", "Gate Valve", …), then
 * seven more under "Gallery photo". The table below is keyed by the media file
 * Word stored each photograph as, and records the heading it sits under. The
 * script reads the document's own order back and refuses to run if the two
 * disagree, so a re-saved or edited document cannot silently shift every
 * photograph onto the wrong product.
 *
 * Product photographs go to products/ and lead their product page; gallery
 * photographs go to gallery/. Where each one is used is set in src/data/.
 *
 * Run:  node scripts/extract-docx-photos.mjs ["path/to/valve photos.docx"]
 * then: node scripts/make-cutouts.mjs <the new products/… and gallery/… files>
 *       node scripts/gen-image-sizes.mjs
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public', 'img')
const SCRATCH = path.join(ROOT, '.pdfwork', 'valve-photos-docx')
const DOCX = process.argv[2] ?? 'C:/Users/faisa/OneDrive/Desktop/valve photos.docx'

/** Long edge of the published file — the same ceiling as the other studio shots. */
const MAX_EDGE = 1200

const PHOTOS = [
  { media: 'image1.png', heading: 'Butterfly valve', dest: 'products/wafer-butterfly-valve-lever-konin.webp' },
  { media: 'image2.png', heading: 'Gate Valve', dest: 'products/cast-gate-valve-flanged-konin.webp' },
  { media: 'image3.png', heading: 'Globe valve', dest: 'products/cast-globe-valve-flanged-konin.webp' },
  { media: 'image4.png', heading: 'Knife gate valve', dest: 'products/knife-gate-valve-lugged-konin.webp' },
  { media: 'image5.png', heading: 'Air valve', dest: 'products/air-valve-flanged-konin.webp' },
  {
    media: 'image6.png',
    heading: 'Butterfly valve FE',
    dest: 'products/double-flanged-butterfly-valve-gear-konin.webp',
  },
  { media: 'image7.png', heading: 'Gallery photo', dest: 'gallery/swing-check-valve-flanged-konin.webp' },
  { media: 'image8.png', heading: 'Gallery Photo', dest: 'gallery/konin-valves-plant-installation.webp' },
  { media: 'image9.png', heading: 'Gallery Photo', dest: 'gallery/needle-valves-batch-konin.webp' },
  { media: 'image10.png', heading: 'Gallery Photo', dest: 'gallery/disc-check-valve-konin.webp' },
  {
    media: 'image11.png',
    heading: 'Gallery Photo',
    dest: 'gallery/gear-operated-butterfly-valve-konin.webp',
  },
  {
    media: 'image12.png',
    heading: 'Gallery Photo',
    dest: 'gallery/pneumatic-actuated-ball-valve-konin.webp',
    // The source carries a footer line with a misspelled web address
    // ("konirivalve.com"). Rows 990 and below hold only that line; the valve
    // and its shadow end above it.
    keepRows: 990,
  },
  {
    media: 'image13.png',
    heading: 'Gallery Photo',
    dest: 'gallery/pneumatic-actuated-butterfly-valve-konin.webp',
  },
]

/* ------------------------------------------------------------------ */
/* 1. Unpack the document                                              */
/* ------------------------------------------------------------------ */

if (!fs.existsSync(DOCX)) {
  console.error(`Source document not found: ${DOCX}`)
  process.exit(1)
}
fs.rmSync(SCRATCH, { recursive: true, force: true })
fs.mkdirSync(SCRATCH, { recursive: true })

// A .docx is a zip; Python is already a dependency of the image pipeline
// (extract-pdf-images.mjs), and its zipfile module needs nothing installed.
execFileSync('python', [
  '-c',
  'import sys, zipfile; zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])',
  DOCX,
  SCRATCH,
])

/* ------------------------------------------------------------------ */
/* 2. Read the document order back and check it against the table      */
/* ------------------------------------------------------------------ */

const rels = fs.readFileSync(path.join(SCRATCH, 'word/_rels/document.xml.rels'), 'utf8')
const targetById = new Map(
  [...rels.matchAll(/<Relationship\b[^>]*\bId="([^"]+)"[^>]*\bTarget="media\/([^"]+)"/g)].map(
    (m) => [m[1], m[2]]
  )
)

const doc = fs.readFileSync(path.join(SCRATCH, 'word/document.xml'), 'utf8')
const found = []
let heading = ''
for (const para of doc.split(/<w:p[ >]/).slice(1)) {
  const text = [...para.matchAll(/<w:t(?: [^>]*)?>([^<]*)<\/w:t>/g)]
    .map((m) => m[1])
    .join('')
    .trim()
  if (text) heading = text
  for (const m of para.matchAll(/r:embed="([^"]+)"/g)) {
    found.push({ media: targetById.get(m[1]), heading })
  }
}

const problems = []
if (found.length !== PHOTOS.length) {
  problems.push(`document holds ${found.length} photographs, table maps ${PHOTOS.length}`)
}
PHOTOS.forEach((p, i) => {
  const f = found[i]
  if (!f || f.media !== p.media || f.heading !== p.heading) {
    problems.push(
      `#${i + 1}: table says ${p.media} under "${p.heading}", document has ${f?.media} under "${f?.heading}"`
    )
  }
})
if (problems.length) {
  console.error('The document no longer matches the mapping table:')
  for (const p of problems) console.error(`  ${p}`)
  process.exit(1)
}

/* ------------------------------------------------------------------ */
/* 3. Write the web files                                              */
/* ------------------------------------------------------------------ */

console.log(`Extracting ${PHOTOS.length} photographs from ${path.basename(DOCX)}…`)
for (const p of PHOTOS) {
  const src = path.join(SCRATCH, 'word/media', p.media)
  const meta = await sharp(src).metadata()
  let img = sharp(src)
  if (p.keepRows) {
    img = img.extract({ left: 0, top: 0, width: meta.width, height: p.keepRows })
  }
  const info = await img
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(path.join(OUT, p.dest))
  console.log(
    `  ${p.media.padEnd(12)} "${p.heading}" → ${p.dest} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`
  )
}

// The unpacked document is ~27 MB of PNGs; nothing reads it once this is done.
fs.rmSync(SCRATCH, { recursive: true, force: true })
