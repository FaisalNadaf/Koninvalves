import type { ProductImage } from './types'

/**
 * Gallery photographs that belong to no single product page.
 *
 * Everything else in the gallery is read from the product data, so a product's
 * photographs only ever need adding there. These are the exceptions, both from
 * "valve photos.docx" (Gallery photo):
 *
 *  · the gear-operated butterfly valve is plainly a butterfly valve, but the
 *    photograph alone does not say which of the three butterfly products it
 *    is, so it sits with the butterfly valves rather than on one of their pages;
 *  · the plant photograph shows KONIN valves in service, not one product.
 */
export type GalleryPhoto = ProductImage & {
  /** Caption under the tile, in the place a product's name takes. */
  name: string
  /** The gallery section it joins — a valve group, or a section of its own. */
  group: string
  /**
   * Fill the tile instead of fitting inside it. Only for scenes, where losing
   * the edges of the frame hides nothing a visitor came to see; the full
   * picture is still one click away.
   */
  fill?: boolean
}

/**
 * Product photographs kept off the gallery page. They still appear on their
 * product pages; the gallery drops them because they are older alternates or
 * near-duplicates of the catalogue photograph it already shows.
 */
export const galleryHidden: ReadonlySet<string> = new Set([
  // Ball valves
  '/img/products/1-single-piece-ball-valves.webp',
  '/img/gallery/single-piece-ball-valve.webp',
  '/img/products/cast-steel-two-piece-cs-2-piece-ball-valves.webp',
  '/img/products/ball-valve.webp',
  '/img/gallery/three-piece-ball-valve.webp',
  '/img/products/forged-ball-valve.webp',
  // Gate, globe and check valves
  '/img/products/cast-gate-valves.webp',
  '/img/gallery/gate-valve.webp',
  '/img/products/globe-valves1.webp',
  '/img/gallery/check-valve.webp',
  '/img/gallery/non-return-valve.webp',
  // Butterfly valves
  '/img/products/butterfly-valve.webp',
  '/img/gallery/butterfly.webp',
  '/img/products/triple-butterfly-valve-2.webp',
  // Knife gate valves
  '/img/products/knife-edge-valve.webp',
  '/img/products/knife-edge-gate-valve.webp',
  '/img/gallery/pulp-valve.webp',
  // Needle valves
  '/img/products/high-pressure-needle-valves.webp',
  '/img/products/high-pressure-needle-valves1.webp',
  '/img/gallery/high-pressure-needle-valve.webp',
  // Actuated valves
  '/img/products/automated-butterfly-valve-2.webp',
  '/img/gallery/triple-butterfly-valve.webp',
  '/img/gallery/automated-butterfly-valve.webp',
])

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: '/img/gallery/gear-operated-butterfly-valve-konin.webp',
    alt: 'KONIN gear-operated butterfly valve with handwheel, a bolted brass-coloured seat ring and ribbed disc',
    name: 'Gear Operated Butterfly Valve',
    group: 'Butterfly Valves',
  },
  {
    src: '/img/gallery/konin-valves-plant-installation.webp',
    alt: 'KONIN valves installed on green pipework in an industrial plant',
    name: 'KONIN Valves in Service',
    group: 'Installations',
    fill: true,
  },
]
