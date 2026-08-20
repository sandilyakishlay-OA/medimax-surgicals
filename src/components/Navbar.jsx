import { useEffect, useState } from 'react'
import { asset } from '../utils/paths.js'

export default function Navbar({ config }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState(config.nav[0]?.href || '')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = config.nav
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [config.nav])

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="navbar-wrap">
      <div className={`navbar-pill ${scrolled ? 'navbar-pill--scrolled' : ''}`}>
        <a href="#home" className="navbar__brand" onClick={closeMenu}>
          <img src={asset(config.logo.white)} alt={config.siteName} className="navbar__logo" />
        </a>

        <nav className="navbar__links">
          {config.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`navbar__link ${activeHref === item.href ? 'navbar__link--active' : ''}`}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="navbar__cta" onClick={closeMenu}>
          Get a Quote
        </a>

        <button
          type="button"
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`navbar-mobile-menu ${menuOpen ? 'navbar-mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        {config.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`navbar-mobile-menu__link ${activeHref === item.href ? 'navbar-mobile-menu__link--active' : ''}`}
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}
        <a href="#contact" className="navbar__cta navbar__cta--block" onClick={closeMenu}>
          Get a Quote
        </a>
      </nav>
    </header>
  )
}
