import { profile } from '../../data/profile.js'
import { useCopy } from '../../i18n/index.jsx'
import SectionHead from '../SectionHead.jsx'

export default function Contact() {
  const { copy } = useCopy()
  const t = copy.contact

  return (
    <section className="section section--dark" id="contact">
      <div className="container contact">
        <div>
          <SectionHead index={7} eyebrow={t.eyebrow} title={t.title} desc={t.desc} />
          <div className="contact__actions">
            <a className="btn btn--light" href={profile.dmUrl} target="_blank" rel="noreferrer">
              {t.dm}
            </a>
            <a className="btn btn--outline-light" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        </div>
        <ul className="checklist">
          {t.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
