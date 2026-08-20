import { useState } from 'react'

const EMPTY_FORM = { name: '', email: '', phone: '', message: '' }

export default function ContactSection({ config }) {
  const { contact } = config
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const isFormConfigured =
    Boolean(contact.googleForm?.formActionUrl) && !contact.googleForm.formActionUrl.includes('REPLACE')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isFormConfigured) {
      setStatus('error')
      return
    }

    setStatus('sending')
    const { fields, formActionUrl } = contact.googleForm
    const body = new URLSearchParams({
      [fields.name]: form.name,
      [fields.email]: form.email,
      [fields.phone]: form.phone,
      [fields.message]: form.message,
    })

    try {
      await fetch(formActionUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      setStatus('sent')
      setForm(EMPTY_FORM)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="section-heading">
        <h2>{contact.heading}</h2>
        <p>{contact.subheading}</p>
      </div>

      <div className="contact__grid">
        <div className="contact__info">
          <ul>
            <li>
              <strong>Address</strong>
              <span>{contact.address}</span>
            </li>
            <li>
              <strong>Phone</strong>
              <span>{contact.phone}</span>
            </li>
            <li>
              <strong>Email</strong>
              <span>{contact.email}</span>
            </li>
          </ul>

          {contact.socials?.length > 0 && (
            <div className="contact__socials">
              {contact.socials.map((social) => (
                <a key={social.platform} href={social.url} target="_blank" rel="noreferrer">
                  {social.platform}
                </a>
              ))}
            </div>
          )}
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          {!isFormConfigured && (
            <p className="form-note">
              Contact form isn&apos;t connected yet. Add your Google Form URL and entry IDs in
              public/data/config.json (see README.md).
            </p>
          )}

          <input name="name" placeholder="Your Name" required value={form.name} onChange={handleChange} />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={handleChange}
          />
          <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            required
            value={form.message}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <p className="form-status form-status--success">Thanks! Your message has been sent.</p>
          )}
          {status === 'error' && (
            <p className="form-status form-status--error">
              Something went wrong. Please try again or reach us on WhatsApp.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
