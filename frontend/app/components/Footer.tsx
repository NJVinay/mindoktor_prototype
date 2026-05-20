import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">
        <div className="footer__grid">
          {/* Logo Column */}
          <div className="footer__col footer__col--logo">
            <div className="footer__logo">
              <svg
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M16 28C16 28 4 20 4 12C4 8.68629 6.68629 6 10 6C12.2091 6 14.2091 7.20911 15.2 9C15.6 9.7 16 9.7 16 9.7C16 9.7 16.4 9.7 16.8 9C17.7909 7.20911 19.7909 6 22 6C25.3137 6 28 8.68629 28 12C28 20 16 28 16 28Z"
                  fill="#E8251F"
                />
              </svg>
              <span className="footer__logo-text">Min Doktor</span>
            </div>
            <p className="footer__tagline">
              Digital healthcare for the whole family. Available 24/7, wherever you are.
            </p>
          </div>

          {/* The Company */}
          <div className="footer__col">
            <h3 className="footer__heading">The company</h3>
            <ul className="footer__links">
              <li><Link href="/">About us</Link></li>
              <li><Link href="/">Careers</Link></li>
              <li><Link href="/">Press</Link></li>
              <li><Link href="/">Partners</Link></li>
            </ul>
          </div>

          {/* The Service */}
          <div className="footer__col">
            <h3 className="footer__heading">The service</h3>
            <ul className="footer__links">
              <li><Link href="/">Seek care</Link></li>
              <li><Link href="/">Vaccination</Link></li>
              <li><Link href="/">Prescription renewal</Link></li>
              <li><Link href="/">Pricing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer__col">
            <h3 className="footer__heading">Support</h3>
            <ul className="footer__links">
              <li><Link href="/">FAQ</Link></li>
              <li><Link href="/">Contact us</Link></li>
              <li><Link href="/">Privacy policy</Link></li>
              <li><Link href="/">Terms of service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__legal">
            Min Doktor provides digital healthcare services. We are registered with the Swedish Health
            and Social Care Inspectorate (IVO). This service does not replace emergency care. If you are
            experiencing a medical emergency, please call 112.
          </p>
          <div className="footer__badge" aria-label="LegitScript certified">
            <div className="footer__badge-placeholder">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="#22C55E" opacity="0.2"/>
                <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="#22C55E" strokeWidth="1.5" fill="none"/>
                <path d="M9 12l2 2 4-4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>LegitScript Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
