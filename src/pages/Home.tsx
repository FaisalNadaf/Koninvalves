import { Seo, organizationSchema, websiteSchema, itemListSchema } from '../components/Seo'
import { categories } from '../data/categories'
import Hero from '../sections/home/Hero'
import CapabilityPanels from '../sections/home/CapabilityPanels'
import OneRoof from '../sections/home/OneRoof'
import IndustriesReveal from '../sections/home/IndustriesReveal'
import GlobalReach from '../sections/home/GlobalReach'
import TrustBand from '../sections/home/TrustBand'
import CtaBand from '../sections/CtaBand'

/**
 * Homepage.
 *
 * The order is a narrative — opening, capability, company, application, trust,
 * ask — and neighbouring sections never share a ground, so the tone alternation
 * itself carries the rhythm of the scroll.
 *
 * TickerBand, ProductRail, AutomationStory, WaterFlow and QualityProof are
 * built and still live under sections/home — import and drop one back in here
 * to restore it.
 */
export default function Home() {
  return (
    <>
      <Seo
        title="Industrial Valves, Automation & Water Treatment Solutions | KONIN"
        description="ISO 9001:2015 industrial valve manufacturer in Belagavi, Karnataka. Ball, butterfly, gate, globe, check and knife gate valves, automation and water solutions."
        path="/"
        schema={[
          organizationSchema,
          websiteSchema,
          itemListSchema(
            categories.map((c) => ({ name: c.name, path: c.path })),
            'KONIN product and solution categories'
          ),
        ]}
      />
      <Hero />
      <OneRoof />
      <CapabilityPanels />
      <IndustriesReveal />
      <GlobalReach />
      <TrustBand />
      <CtaBand />
    </>
  )
}
