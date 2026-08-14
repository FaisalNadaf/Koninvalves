import { Head } from 'vite-react-ssg'
import { company } from '../data/company'

export const SITE_URL = 'https://www.koninvalve.com'

type SeoProps = {
  title: string
  description: string
  /** Path only, e.g. "/products/valves". */
  path: string
  image?: string
  type?: 'website' | 'article' | 'product'
  /** JSON-LD blocks to embed. */
  schema?: object[]
  noindex?: boolean
}

const abs = (p: string) => (p.startsWith('http') ? p : `${SITE_URL}${p}`)

export function Seo({
  title,
  description,
  path,
  image = '/img/gallery/industrial-valves.webp',
  type = 'website',
  schema = [],
  noindex,
}: SeoProps) {
  const url = abs(path)
  const img = abs(image)

  return (
    <Head>
      {/* The head manager renders its tags ahead of index.html's own, so the
          charset has to be declared here to stay within the first 1024 bytes. */}
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={company.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {schema.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Head>
  )
}

/* ------------------------------------------------------------------ */
/* Structured data builders                                            */
/* ------------------------------------------------------------------ */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: company.name,
  alternateName: 'KONIN',
  url: SITE_URL,
  logo: abs(company.logo),
  description: company.positioning,
  email: company.emails[0],
  telephone: company.phones[0],
  sameAs: [company.linkedin],
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${company.address.line1}, ${company.address.line2}`,
    addressLocality: company.address.city,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.countryCode,
  },
  contactPoint: company.phones.map((tel) => ({
    '@type': 'ContactPoint',
    telephone: tel,
    contactType: 'sales',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi', 'kn'],
  })),
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'certification',
    name: 'ISO 9001:2015',
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: company.name,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-IN',
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  }
}

export function productSchema(p: {
  name: string
  description: string
  image: string
  path: string
  category: string
  standards?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: abs(p.image),
    url: abs(p.path),
    category: p.category,
    brand: { '@type': 'Brand', name: 'KONIN' },
    manufacturer: { '@id': `${SITE_URL}/#organization` },
    ...(p.standards?.length
      ? {
          additionalProperty: p.standards.map((s) => ({
            '@type': 'PropertyValue',
            name: 'Standard',
            value: s,
          })),
        }
      : {}),
  }
}

export function itemListSchema(items: { name: string; path: string }[], name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: abs(it.path),
    })),
  }
}
