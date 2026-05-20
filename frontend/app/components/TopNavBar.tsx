'use client';

import { useState } from 'react';
import Link from 'next/link';
import './TopNavBar.css';

export default function TopNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="top-nav" role="navigation" aria-label="Main navigation">
      <div className="top-nav__inner container">
        {/* Logo */}
        <Link href="/" className="top-nav__logo" aria-label="Min Doktor – Go to homepage">
          <svg
            width="32"
            height="32"
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
          <span className="top-nav__wordmark">Min Doktor</span>
        </Link>

        {/* Desktop Links */}
        <div className="top-nav__desktop-links">
          <Link href="/" className="top-nav__cta-btn">
            Seek care
          </Link>
          <Link href="/" className="top-nav__link">
            How it works
          </Link>
          <Link href="/" className="top-nav__link">
            Log in
          </Link>
          <button
            className="top-nav__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="top-nav__hamburger-line" />
            <span className="top-nav__hamburger-line" />
            <span className="top-nav__hamburger-line" />
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="top-nav__mobile-actions">
          <Link href="/" className="top-nav__cta-btn top-nav__cta-btn--small">
            Seek care
          </Link>
          <button
            className="top-nav__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="top-nav__hamburger-line" />
            <span className="top-nav__hamburger-line" />
            <span className="top-nav__hamburger-line" />
          </button>
        </div>
      </div>

      {/* Full-screen overlay menu */}
      {menuOpen && (
        <div className="top-nav__overlay" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button
            className="top-nav__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          <div className="top-nav__overlay-links">
            <Link href="/" className="top-nav__overlay-link" onClick={() => setMenuOpen(false)}>
              Seek care
            </Link>
            <Link href="/" className="top-nav__overlay-link" onClick={() => setMenuOpen(false)}>
              How it works
            </Link>
            <Link href="/" className="top-nav__overlay-link" onClick={() => setMenuOpen(false)}>
              Vaccination
            </Link>
            <Link href="/" className="top-nav__overlay-link" onClick={() => setMenuOpen(false)}>
              Prescription renewal
            </Link>
            <Link href="/" className="top-nav__overlay-link" onClick={() => setMenuOpen(false)}>
              Log in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
