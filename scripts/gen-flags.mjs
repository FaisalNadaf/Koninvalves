/**
 * Writes public/img/flags/<CODE>.webp: each supply-country flag as a clean
 * 3:2 rectangle of cloth for the "Global supply" marquee.
 *
 * Sources: the official flag SVGs from Wikimedia Commons ("Flag of
 * <country>.svg", public domain), saved as scripts/flag-src/<CODE>.svg. They
 * are exact, down to the 50 stars and the national emblems. Every flag is
 * drawn at 3:2 so the cards line up; flags with other official proportions
 * (USA 19:10, Qatar 28:11) are fitted to it.
 *
 * Each flag is rasterised, then resampled through a soft diagonal ripple, with
 * the slope of the ripple turned into light and shade so the folds read as
 * fabric. The edges stay straight and the corners square, so the flag keeps a
 * true rectangle. Baked here, so the page ships a plain image instead of
 * running a filter on every moving card.
 *
 * To add a country: add it to `company.supplyCountries`, save its flag from
 * Wikimedia Commons as scripts/flag-src/<CODE>.svg, then run:
 *   node scripts/gen-flags.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, 'scripts', 'flag-src')
const OUT = path.join(ROOT, 'public', 'img', 'flags')

// Codes come from the company data so the two never drift apart.
const companySrc = fs.readFileSync(path.join(ROOT, 'src', 'data', 'company.ts'), 'utf8')
const block = companySrc.slice(companySrc.indexOf('supplyCountries'))
const codes = [...block.slice(0, block.indexOf(']')).matchAll(/code: '([A-Z]{2})'/g)].map((m) => m[1])

const FW = 480 // output width; shown at roughly 220 px, so about 2x
const FH = 320 // 3:2
const RADIUS = 0 // square corners: a true rectangle
const AMP = 5 // ripple displacement inside the tile, in pixels
const PAD = 6 // the flag is drawn slightly oversize so the ripple never shows an edge

const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v)

async function render(code) {
  const file = path.join(SRC, `${code}.svg`)
  if (!fs.existsSync(file)) throw new Error(`Missing ${file}: save the flag SVG from Wikimedia Commons first`)
  const NW = FW + PAD * 2, NH = FH + PAD * 2
  const { data: src } = await sharp(fs.readFileSync(file), { density: 300 })
    .resize(NW, NH, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const out = Buffer.alloc(FW * FH * 4)
  const pick = (x, y, c) => {
    const xi = Math.max(0, Math.min(NW - 1, x)), yi = Math.max(0, Math.min(NH - 1, y))
    return src[(yi * NW + xi) * 3 + c]
  }

  for (let Y = 0; Y < FH; Y++) {
    for (let X = 0; X < FW; X++) {
      // Rounded-square mask with a one-pixel anti-aliased edge.
      const dx = Math.max(RADIUS - X - 0.5, X + 0.5 - (FW - RADIUS), 0)
      const dy = Math.max(RADIUS - Y - 0.5, Y + 0.5 - (FH - RADIUS), 0)
      const edge = RADIUS ? Math.min(1, Math.max(0, RADIUS + 0.5 - Math.hypot(dx, dy))) : 1
      if (edge <= 0) continue

      // Folds run on a slight diagonal, as cloth hangs from one corner.
      const u = (X * 0.92 + Y * 0.38) / FW
      const phase = Math.PI * 2 * (u * 1.35) - 0.7
      const sx = X + PAD
      const sy = Y + PAD + AMP * Math.sin(phase)
      const y0 = Math.floor(sy), fy = sy - y0

      // Light from the upper left: folds facing it lift, folds turned away
      // drop. A soft top-left glow and a deeper bottom-right corner give the
      // tile its depth.
      const slope = Math.cos(phase)
      const glow = 0.1 * (1 - Math.min(1, Math.hypot(X / FW, Y / FH) * 1.1))
      const corner = -0.12 * Math.max(0, X / FW + Y / FH - 1.1)
      const shade = 0.2 * slope + glow + corner
      const weave = ((Y * 7 + (X >> 1) * 3) % 5) - 2 // faint thread texture

      const i = (Y * FW + X) * 4
      for (let c = 0; c < 3; c++) {
        let v = pick(sx, y0, c) * (1 - fy) + pick(sx, y0 + 1, c) * fy
        v = shade >= 0 ? v + (255 - v) * shade * 0.7 : v * (1 + shade)
        out[i + c] = clamp(v + weave * 0.7)
      }
      out[i + 3] = clamp(255 * edge)
    }
  }

  const dest = path.join(OUT, `${code}.webp`)
  await sharp(out, { raw: { width: FW, height: FH, channels: 4 } }).webp({ quality: 88, alphaQuality: 90, effort: 6 }).toFile(dest)
  return `${code} ${(fs.statSync(dest).size / 1024).toFixed(0)}KB`
}

fs.mkdirSync(OUT, { recursive: true })
console.log(`flags ${FW}x${FH}:`, (await Promise.all(codes.map(render))).join(', '))
