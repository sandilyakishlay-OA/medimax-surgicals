import { useState } from 'react'
import { asset } from '../utils/paths.js'
import { initialsOf } from '../utils/text.js'
import Carousel from './Carousel.jsx'

function TestimonialCard({ testimonial }) {
  const [imgError, setImgError] = useState(false)

  return (
    <article className="card testimonial-card">
      <p className="testimonial-card__quote">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="testimonial-card__person">
        {!imgError ? (
          <img
            src={asset(`assets/images/team/${testimonial.image}`)}
            alt={testimonial.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="avatar-placeholder" aria-hidden="true">
            {initialsOf(testimonial.name)}
          </div>
        )}
        <div className="testimonial-card__meta">
          <strong>{testimonial.name}</strong>
          <span>{testimonial.designation}</span>
        </div>
      </div>
    </article>
  )
}

export default function TestimonialsSection({ testimonials }) {
  return (
    <section id="testimonials" className="testimonials">
      <div className="section-heading">
        <h2>What Our Clients Say</h2>
        <p>Trusted by surgeons, hospitals, and medical suppliers across the country.</p>
      </div>

      {testimonials.length === 0 ? (
        <p className="empty-state">Add testimonials to public/data/testimonials.json to see them here.</p>
      ) : (
        <Carousel
          items={testimonials}
          ariaLabel="Testimonials"
          renderItem={(testimonial) => <TestimonialCard testimonial={testimonial} />}
        />
      )}
    </section>
  )
}
