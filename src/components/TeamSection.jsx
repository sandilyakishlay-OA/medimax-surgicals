import { useState } from 'react'
import { asset } from '../utils/paths.js'
import { initialsOf } from '../utils/text.js'
import Carousel from './Carousel.jsx'

function TeamCard({ member }) {
  const [imgError, setImgError] = useState(false)

  return (
    <article className="card team-card">
      <div className="team-card__photo-wrap">
        {!imgError ? (
          <img
            src={asset(`assets/images/leadership/${member.image}`)}
            alt={member.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="avatar-placeholder avatar-placeholder--lg" aria-hidden="true">
            {initialsOf(member.name)}
          </div>
        )}
      </div>
      <div className="card__body team-card__body">
        <h3>{member.name}</h3>
        <span className="team-card__role">{member.designation}</span>
        {member.bio && <p>{member.bio}</p>}
        {member.linkedin && (
          <a className="team-card__link" href={member.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        )}
      </div>
    </article>
  )
}

export default function TeamSection({ team }) {
  return (
    <section id="team" className="team">
      <div className="section-heading">
        <h2>Leadership</h2>
        <p>The people behind Medimax Surgicals' quality and reliability.</p>
      </div>

      {team.length === 0 ? (
        <p className="empty-state">Add leadership profiles to public/data/team.json to see them here.</p>
      ) : (
        <Carousel items={team} ariaLabel="Leadership" renderItem={(member) => <TeamCard member={member} />} />
      )}
    </section>
  )
}
