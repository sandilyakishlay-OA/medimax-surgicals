export default function About({ config }) {
  const { about } = config

  return (
    <section id="about" className="about">
      <div className="section-heading">
        <h2>{about.heading}</h2>
      </div>
      <p className="about__body">{about.body}</p>
      <div className="about__stats">
        {about.stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span className="stat-card__value">{stat.value}</span>
            <span className="stat-card__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
