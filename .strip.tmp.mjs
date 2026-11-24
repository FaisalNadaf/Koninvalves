import sharp from 'sharp'
const [,, src, out, sliceH = '1600', maxCols = '8'] = process.argv
const m = await sharp(src).metadata()
const H = +sliceH, n = Math.min(+maxCols, Math.ceil(m.height / H)), W = m.width
const comps = []
for (let i = 0; i < n; i++) {
  const top = i * H, h = Math.min(H, m.height - top)
  if (h <= 0) break
  comps.push({ input: await sharp(src).extract({ left: 0, top, width: W, height: h }).png().toBuffer(), left: i * (W + 12), top: 0 })
}
await sharp({ create: { width: n * (W + 12), height: H, channels: 3, background: '#f0f' } }).composite(comps).png().toFile(out)
console.log(src.split(/[\/]/).pop(), m.width + 'x' + m.height, 'cols', n, 'covers', Math.min(m.height, n * H))
