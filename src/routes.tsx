import type { RouteRecord } from 'vite-react-ssg'
import RootLayout from './layouts/RootLayout'
import { categories, productsByCategory } from './data/categories'

/**
 * Route table.
 *
 * Every page is code-split via React Router's `lazy`, and every dynamic route
 * declares `getStaticPaths` so vite-react-ssg pre-renders it to static HTML at
 * build time — crawlers get real markup, not an empty shell.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, lazy: () => import('./pages/Home').then((m) => ({ Component: m.default })) },
      {
        path: 'about',
        lazy: () => import('./pages/About').then((m) => ({ Component: m.default })),
      },
      {
        path: 'products',
        lazy: () => import('./pages/Products').then((m) => ({ Component: m.default })),
      },
      {
        path: 'products/:category',
        lazy: () => import('./pages/Category').then((m) => ({ Component: m.default })),
        getStaticPaths: () => categories.map((c) => `/products/${c.key}`),
      },
      {
        path: 'products/:category/:slug',
        lazy: () => import('./pages/ProductDetail').then((m) => ({ Component: m.default })),
        getStaticPaths: () =>
          categories.flatMap((c) =>
            productsByCategory[c.key].map((p) => `/products/${c.key}/${p.slug}`)
          ),
      },
      {
        path: 'industries',
        lazy: () => import('./pages/Industries').then((m) => ({ Component: m.default })),
      },
      {
        path: 'quality',
        lazy: () => import('./pages/Quality').then((m) => ({ Component: m.default })),
      },
      {
        path: 'gallery',
        lazy: () => import('./pages/Gallery').then((m) => ({ Component: m.default })),
      },
      {
        path: 'clientele',
        lazy: () => import('./pages/Clientele').then((m) => ({ Component: m.default })),
      },
      {
        path: 'contact',
        lazy: () => import('./pages/Contact').then((m) => ({ Component: m.default })),
      },
      {
        path: '*',
        lazy: () => import('./pages/NotFound').then((m) => ({ Component: m.default })),
        /**
         * Emits dist/404.html — the file every static host serves for an
         * unmatched path. Without it the host falls back to index.html, the
         * browser is handed the pre-rendered *homepage* markup, and React then
         * hydrates the NotFound component over it: a guaranteed hydration
         * mismatch on every mistyped URL.
         */
        getStaticPaths: () => ['/404'],
      },
    ],
  },
]
