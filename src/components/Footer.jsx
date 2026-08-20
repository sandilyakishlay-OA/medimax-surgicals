import { asset } from '../utils/paths.js'

export default function Footer({ config }) {
  return (
    <footer className="footer">
      <img src={asset(config.logo.white)} alt={config.siteName} className="footer__logo" />
      <p>
        © {new Date().getFullYear()} {config.footer.copyrightName}. {config.footer.note}
      </p>
    </footer>
  )
}
