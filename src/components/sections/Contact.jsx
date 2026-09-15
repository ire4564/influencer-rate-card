import { inquiryChecklist, profile } from '../../data/profile.js'
import SectionHead from '../SectionHead.jsx'

export default function Contact() {
  return (
    <section className="section section--dark" id="contact">
      <div className="container contact">
        <div>
          <SectionHead
            index={7}
            eyebrow="Contact"
            title="캠페인 문의"
            desc="아래 내용을 포함해 인스타그램 DM 또는 이메일로 문의 부탁드립니다."
          />
          <div className="contact__actions">
            <a className="btn btn--light" href={profile.dmUrl} target="_blank" rel="noreferrer">
              Instagram DM @{profile.handle}
            </a>
            <a className="btn btn--outline-light" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        </div>
        <ul className="checklist">
          {inquiryChecklist.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
