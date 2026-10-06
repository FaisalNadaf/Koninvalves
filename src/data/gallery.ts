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
