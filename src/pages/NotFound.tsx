import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Glow, GridBackdrop } from '../components/ui'
import { TiltCard, Layer } from '../components/ui/TiltCard'
import { categories } from '../data/categories'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found | KONIN Valves"
        description="The page you are looking for could not be found. Browse KONIN industrial valves, automation solutions and water treatment solutions."
        path="/404"
        noindex
      />

      <section className="tone-tint relative flex min-h-svh items-center overflow-hidden">
        <GridBackdrop />
        <Glow className="top-1/4 left-1/3" size="46rem" intensity={0.16} drift />
        <Glow className="right-1/4 bottom-0" color="aqua" size="34rem" intensity={0.14} />

        <div className="relative container-k py-28 text-center">
          <p className="anim-fade mono-label text-signal-600">Error 404</p>

          <h1 className="h-hero anim-fade-up mx-auto mt-6 max-w-4xl text-ink-900">
            This line doesn’t <span className="text-gradient">go anywhere.</span>
          </h1>

          <p
            className="lead anim-fade-up mx-auto mt-6 max-w-xl text-steel-600"
            style={{ animationDelay: '120ms' }}
          >
            The page you were looking for has moved or no longer exists. Start again from one of the
            three product categories below.
          </p>

          <div
            className="anim-fade-up mt-9 flex flex-wrap justify-center gap-3"
            style={{ animationDelay: '200ms' }}
          >
            <Link to="/" className="btn btn-primary btn-lg group">
              Back to home
              <ArrowRight
                className="size-4 transition-transform duration-400 ease-out-expo group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link to="/contact" className="btn btn-outline-ink btn-lg">
              Contact KONIN
            </Link>
          </div>

          <ul
            className="anim-fade-up mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3"
            style={{ animationDelay: '280ms' }}
          >
            {categories.map((c) => (
              <li key={c.key} className="h-full">
                <TiltCard className="h-full" max={8} lift={7}>
                  <Link
                    to={c.path}
                    className="flex h-full items-start justify-between gap-4 rounded-2xl border border-steel-150 bg-white p-6 text-left shadow-e2 transition-shadow duration-500 group-hover:border-brand-200 group-hover:shadow-e4"
                  >
                    <Layer z={18}>
                      <span className="block font-display text-lg leading-tight font-bold text-ink-900 transition-colors group-hover:text-brand-700">
                        {c.name}
                      </span>
                    </Layer>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-brand-100 bg-brand-50 text-brand-700 transition-all duration-400 group-hover:border-transparent group-hover:bg-brand-600 group-hover:text-white">
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                </TiltCard>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
