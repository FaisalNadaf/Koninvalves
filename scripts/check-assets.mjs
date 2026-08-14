/**
 * Verifies that every image and document path referenced anywhere in src/
 * actually exists in public/, and that no <Img> is missing alt text.
 *
 * Run:  node scripts/check-assets.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, 'src')
const PUBLIC = path.join(ROOT, 'public')

const files = []
;(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (/\.(tsx?|css)$/.test(e.name)) files.push(p)
  }
})(SRC)

const missing = []
const referenced = new Set()

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8')
  for (const m of src.matchAll(/['"`](\/(?:img|docs)\/[^'"`\s)]+)['"`]/g)) {
    const rel = m[1]
    // Skip template literals like `/img/cutout/${file}` — resolved at runtime.
    if (rel.includes('${')) continue
    referenced.add(rel)
    if (!fs.existsSync(path.join(PUBLIC, rel))) {
      missing.push({ file: path.relative(ROOT, file), rel })
    }
  }
}

// Any <Img ...> without an alt attribute is an accessibility failure.
const noAlt = []
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8')
  for (const m of src.matchAll(/<Img\b[\s\S]{0,400}?\/>/g)) {
    if (!/\balt=/.test(m[0])) noAlt.push(path.relative(ROOT, file))
  }
}

// Report images that exist but are never used, so dead weight is visible.
const onDisk = []
;(function walkPub(dir, base = '') {
  if (!fs.existsSync(dir)) return
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = `${base}/${e.name}`
    if (e.isDirectory()) walkPub(path.join(dir, e.name), rel)
    else if (/\.(webp|png|jpe?g)$/i.test(e.name)) onDisk.push(`/img${rel}`)
  }
})(path.join(PUBLIC, 'img'))

// cut-outs are resolved at runtime from the original path, so treat a used
// original as also using its cut-out.
const effectivelyUsed = new Set(referenced)
for (const r of referenced) {
  effectivelyUsed.add(`/img/cutout/${r.split('/').pop()}`)
}
const unused = onDisk.filter((f) => !effectivelyUsed.has(f))

console.log(`Referenced asset paths : ${referenced.size}`)
console.log(`Images on disk         : ${onDisk.length}`)
console.log(`Unused images          : ${unused.length}`)

if (noAlt.length) {
  console.error(`\n<Img> without alt in: ${[...new Set(noAlt)].join(', ')}`)
}

if (missing.length) {
  console.error(`\nMISSING ASSETS (${missing.length}):`)
  for (const m of missing) console.error(`  ${m.rel}   ← ${m.file}`)
  process.exit(1)
}

console.log('\nAll referenced assets exist.')
