/**
 * Crawls every prerendered route on a running server and audits the STATIC
 * HTML — the markup a search engine sees before any JavaScript runs.
 *
 * Checks per page: HTTP status, single <h1>, heading order, unique title and
 * meta description, canonical, OG/Twitter tags, JSON-LD validity, images with
 * alt + dimensions, and internal links that 404.
 *
 * Run:  node scripts/audit-routes.mjs http://localhost:4321
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = process.argv[2] ?? 'http://localhost:4321'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const sitemap = fs.readFileSync(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8')
const routes = [...sitemap.matchAll(/<loc>https:\/\/www\.koninvalve\.com([^<]*)<\/loc>/g)].map(
  (m) => m[1] || '/'
)

const problems = []
const titles = new Map()
const descs = new Map()
const linkTargets = new Set()
let totalImgs = 0
let imgsNoAlt = 0
let imgsNoDims = 0
let totalJsonLd = 0

const strip = (s) => s.replace(/\s+/g, ' ').trim()

for (const route of routes) {
  const res = await fetch(`${BASE}${route}`)
  if (!res.ok) {
    problems.push(`${route} → HTTP ${res.status}`)
    continue
  }
  const html = await res.text()

  // --- title / description ---
  const title = strip(html.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? '')
  const desc = strip(
    html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/)?.[1] ?? ''
  )
  if (!title) problems.push(`${route} → missing <title>`)
  else if (title.length > 70) problems.push(`${route} → title ${title.length} chars (>70)`)
  if (!desc) problems.push(`${route} → missing meta description`)
  else if (desc.length > 165)
    problems.push(`${route} → description ${desc.length} chars (>165)`)

  if (titles.has(title)) problems.push(`${route} → duplicate title with ${titles.get(title)}`)
  else titles.set(title, route)
  if (descs.has(desc)) problems.push(`${route} → duplicate description with ${descs.get(desc)}`)
  else descs.set(desc, route)

  // --- canonical + social ---
  if (!html.includes('rel="canonical"')) problems.push(`${route} → missing canonical`)
  if (!html.includes('property="og:title"')) problems.push(`${route} → missing og:title`)
  if (!html.includes('name="twitter:card"')) problems.push(`${route} → missing twitter:card`)

  // --- headings ---
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)]
  if (h1s.length === 0) problems.push(`${route} → no <h1> in static HTML`)
  if (h1s.length > 1) problems.push(`${route} → ${h1s.length} <h1> elements`)

  const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]))
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      problems.push(`${route} → heading jump h${levels[i - 1]} → h${levels[i]}`)
      break
    }
  }

  // --- JSON-LD ---
  for (const m of html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
  )) {
    totalJsonLd++
    try {
      JSON.parse(m[1])
    } catch {
      problems.push(`${route} → invalid JSON-LD`)
    }
  }

  // --- images ---
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0]
    totalImgs++
    if (!/\salt=/.test(tag)) {
      imgsNoAlt++
      problems.push(`${route} → <img> without alt: ${tag.slice(0, 90)}`)
    }
    if (!/\swidth=/.test(tag) || !/\sheight=/.test(tag)) imgsNoDims++
  }

  // --- collect internal links ---
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) linkTargets.add(m[1])
}

// --- verify every internal link resolves ---
const broken = []
for (const href of linkTargets) {
  const res = await fetch(`${BASE}${href}`, { method: 'GET' })
  if (!res.ok) broken.push(`${href} → ${res.status}`)
}

console.log(`Routes audited      : ${routes.length}`)
console.log(`Unique titles       : ${titles.size}`)
console.log(`Unique descriptions : ${descs.size}`)
console.log(`JSON-LD blocks      : ${totalJsonLd}`)
console.log(`<img> in static HTML: ${totalImgs}`)
console.log(`  without alt       : ${imgsNoAlt}`)
console.log(`  without w/h       : ${imgsNoDims}`)
console.log(`Internal link targets: ${linkTargets.size}`)
console.log(`Broken links        : ${broken.length}`)
for (const b of broken) console.log(`  ${b}`)

console.log(`\nProblems: ${problems.length}`)
for (const p of problems.slice(0, 40)) console.log(`  · ${p}`)
if (problems.length > 40) console.log(`  … and ${problems.length - 40} more`)
