/**
 * Produces transparent-background cut-outs of the studio product photographs,
 * so hero and showcase compositions can float a product over a photograph
 * instead of stamping a white rectangle onto it.
 *
 * Method: flood-fill inward from the image border, clearing pixels that are
 * within tolerance of the border colour. Because the fill is connected to the
 * edge, enclosed light areas — the valve bore, a reflection, a label — are
 * preserved. A one-pixel alpha feather removes the jagged edge.
 *
 * Run:  node scripts/make-cutouts.mjs
 *       node scripts/make-cutouts.mjs products/a.webp gallery/b.webp   (only those)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const IMG = path.join(ROOT, 'public', 'img')
const OUT = path.join(IMG, 'cutout')
fs.mkdirSync(OUT, { recursive: true })

/**
 * Every studio product photograph in the catalogue. Sources that turn out not
 * to sit on a light background, or where too little would be removed, are
 * skipped automatically — the site falls back to the original file.
 *
 * Paths passed on the command line (relative to public/img) limit the run to
 * those files, so adding one photograph does not rewrite every existing cut-out.
 */
const ONLY = process.argv.slice(2)
const TARGETS = ONLY.length
  ? ONLY
  : ['products', 'gallery'].flatMap((dir) =>
      fs
        .readdirSync(path.join(IMG, dir))
        .filter((f) => f.endsWith('.webp'))
        .map((f) => `${dir}/${f}`)
    )

const TOLERANCE = 30 // per-channel distance from the sampled border colour

async function cutout(rel) {
  const src = path.join(IMG, rel)
  if (!fs.existsSync(src)) {
    console.warn('  !! missing', rel)
    return false
  }

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width: W, height: H, channels: C } = info
  const idx = (x, y) => (y * W + x) * C

  // Sample the four corners to establish the background colour.
  const corners = [
    [0, 0],
    [W - 1, 0],
    [0, H - 1],
    [W - 1, H - 1],
  ]
  let br = 0
  let bg = 0
  let bb = 0
  for (const [x, y] of corners) {
    const i = idx(x, y)
    br += data[i]
    bg += data[i + 1]
    bb += data[i + 2]
  }
  br /= 4
  bg /= 4
  bb /= 4

  // Only cut out photos that genuinely sit on a light studio background.
  if (br < 215 || bg < 215 || bb < 215) {
    console.warn(`  -- ${rel}: background not light enough (${br | 0},${bg | 0},${bb | 0}) — skipped`)
    return false
  }

  const matches = (i) =>
    Math.abs(data[i] - br) <= TOLERANCE &&
    Math.abs(data[i + 1] - bg) <= TOLERANCE &&
    Math.abs(data[i + 2] - bb) <= TOLERANCE

  // Flood fill from every border pixel — an explicit stack, not recursion.
  const outside = new Uint8Array(W * H)
  const stack = []
  for (let x = 0; x < W; x++) {
    stack.push([x, 0], [x, H - 1])
  }
  for (let y = 0; y < H; y++) {
    stack.push([0, y], [W - 1, y])
  }

  while (stack.length) {
    const [x, y] = stack.pop()
    if (x < 0 || y < 0 || x >= W || y >= H) continue
    const p = y * W + x
    if (outside[p]) continue
    if (!matches(idx(x, y))) continue
    outside[p] = 1
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
  }

  // Clear alpha on the outside region.
  let cleared = 0
  for (let p = 0; p < W * H; p++) {
    if (!outside[p]) continue
    data[p * C + 3] = 0
    cleared++
  }

  // Feather: any kept pixel touching the outside region gets partial alpha,
  // which removes the hard stair-stepped edge left by a binary mask.
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = y * W + x
      if (outside[p]) continue
      const edge =
        outside[p - 1] || outside[p + 1] || outside[p - W] || outside[p + W]
      if (edge) data[p * C + 3] = 165
    }
  }

  const ratio = cleared / (W * H)
  if (ratio < 0.04) {
    console.warn(`  -- ${rel}: only ${(ratio * 100).toFixed(1)}% removed — skipped`)
    return false
  }

  // Mirror the source directory: products/ and gallery/ contain three
  // different images that share a filename, so a flat output folder would
  // silently serve the wrong cut-out.
  const dest = path.join(OUT, rel)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  await sharp(data, { raw: { width: W, height: H, channels: C } })
    .trim({ threshold: 0 })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(dest)

  console.log(`  cutout → ${rel} (${(ratio * 100).toFixed(0)}% background removed)`)
  return true
}

console.log('Generating transparent product cut-outs…')
let ok = 0
for (const t of TARGETS) {
  if (await cutout(t)) ok++
}
console.log(`\n${ok}/${TARGETS.length} cut-outs written to public/img/cutout/`)
