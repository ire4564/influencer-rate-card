import { profile } from '../../data/profile.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          © {new Date().getFullYear()} @{profile.handle}
        </span>
        <a href={profile.instagramUrl} target="_blank" rel="noreferrer">
          Instagram
        </a>
      </div>
    </footer>
  )
}
