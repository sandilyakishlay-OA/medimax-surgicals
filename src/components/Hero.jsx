import { asset } from '../utils/paths.js'

export default function Hero({ config }) {
  const { hero, siteName } = config

  return (
    <section id="home" className="hero">
      <div className="hero__content">
        <span className="hero__eyebrow">{siteName}</span>
        <h1>{hero.heading}</h1>
        <p>{hero.subheading}</p>
        <div className="hero__actions">
          <a href={hero.primaryButton.href} className="btn btn--primary">
            {hero.primaryButton.label}
          </a>
          <a href={hero.secondaryButton.href} className="btn btn--ghost">
            {hero.secondaryButton.label}
          </a>
        </div>
      </div>
      <div className="hero__art" aria-hidden="true">
        <div className="hero__blob" />
        <img src={asset(config.logo.icon)} alt="" className="hero__icon" />
      </div>
    </section>
  )
}
