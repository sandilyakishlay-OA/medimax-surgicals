import { useJson } from './hooks/useJson.js'
import { asset } from './utils/paths.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import TeamSection from './components/TeamSection.jsx'
import ProductsSection from './components/ProductsSection.jsx'
import TestimonialsSection from './components/TestimonialsSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'

export default function App() {
  const { data: config, loading: configLoading, error: configError } = useJson('data/config.json')
  const { data: products } = useJson('data/products.json')
  const { data: testimonials } = useJson('data/testimonials.json')
  const { data: team } = useJson('data/team.json')

  if (configError) {
    return (
      <div className="page-loader">
        <p>Couldn&apos;t load site content. Please check public/data/config.json.</p>
      </div>
    )
  }

  if (configLoading || !config) {
    return (
      <div className="page-loader">
        <img src={asset('assets/logo/medimax_icon_mark.svg')} alt="" className="page-loader__icon" />
      </div>
    )
  }

  return (
    <>
      <Navbar config={config} />
      <main>
        <Hero config={config} />
        <About config={config} />
        <TeamSection team={team || []} />
        <ProductsSection products={products || []} />
        <TestimonialsSection testimonials={testimonials || []} />
        <ContactSection config={config} />
      </main>
      <Footer config={config} />
      <WhatsAppButton config={config.whatsapp} />
    </>
  )
}
