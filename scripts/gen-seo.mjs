/**
 * Generates public/sitemap.xml and public/robots.txt from the same data the
 * router uses, so the sitemap can never drift out of sync with the site.
 *
 * Run:  node scripts/gen-seo.mjs   (wired into `npm run build`)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://www.koninvalve.com'

/**
 * Read the slugs of one exported array out of a data module, without pulling in
 * a TS toolchain. Scoped to the named export so sibling arrays in the same file
 * (e.g. automationServices, which are not routes) are not picked up.
 */
function slugsFrom(file, exportName) {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'data', file), 'utf8')
  const start = src.indexOf(`export const ${exportName}`)
  if (start === -1) throw new Error(`${exportName} not found in ${file}`)
  const rest = src.slice(start + 1)
  const nextExport = rest.indexOf('\nexport const ')
  const block = nextExport === -1 ? rest : rest.slice(0, nextExport)
  const slugs = [...block.matchAll(/^\s+slug:\s*'([^']+)'/gm)].map((m) => m[1])
  if (slugs.length === 0) throw new Error(`no slugs found for ${exportName} in ${file}`)
  return slugs
}

const valves = slugsFrom('valves.ts', 'valves')
const automation = slugsFrom('automation.ts', 'automationProducts')
const water = slugsFrom('water.ts', 'waterSolutions')

const today = new Date().toISOString().slice(0, 10)

/** [path, changefreq, priority] */
const pages = [
  ['/', 'monthly', '1.0'],
  ['/about', 'yearly', '0.7'],
  ['/products', 'monthly', '0.9'],
  ['/products/valves', 'monthly', '0.9'],
  ['/products/automation-solutions', 'monthly', '0.9'],
  ['/products/water-treatment-solutions', 'monthly', '0.9'],
  ['/industries', 'yearly', '0.7'],
  ['/quality', 'yearly', '0.7'],
  ['/clientele', 'yearly', '0.7'],
  ['/gallery', 'yearly', '0.6'],
  ['/contact', 'yearly', '0.8'],
  ...valves.map((s) => [`/products/valves/${s}`, 'monthly', '0.8']),
  ...automation.map((s) => [`/products/automation-solutions/${s}`, 'monthly', '0.8']),
  ...water.map((s) => [`/products/water-treatment-solutions/${s}`, 'monthly', '0.8']),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ([loc, freq, pri]) => `  <url>
    <loc>${SITE}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${pri}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

const robots = `# robots.txt — ${SITE}
User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`

fs.writeFileSync(path.join(ROOT, 'public', 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(ROOT, 'public', 'robots.txt'), robots)

console.log(
  `sitemap.xml → ${pages.length} URLs (${valves.length} valves, ${automation.length} automation, ${water.length} water)`
)
