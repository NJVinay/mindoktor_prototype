'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';
import './TopNavBar.css';

export default function TopNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, role, name, logout, hydrate } = useAuthStore();

  // Hydrate on mount
  if (typeof window !== 'undefined' && !isAuthenticated) {
    hydrate();
  }

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

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
          {isAuthenticated && role ? (
            <>
              <Link href={role === 'DOCTOR' ? '/doctor/dashboard' : '/patient/dashboard'} className="top-nav__link">
                Dashboard
              </Link>
              <div className="top-nav__user-chip" style={{ background: role === 'DOCTOR' ? 'var(--color-accent-teal)' : 'var(--color-primary)' }}>
                {name?.split(' ')[0]} · {role === 'DOCTOR' ? 'Doctor' : 'Patient'}
              </div>
              <button className="top-nav__link" onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', color: 'inherit' }}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/" className="top-nav__cta-btn">
                Seek care
              </Link>
              <Link href="/" className="top-nav__link">
                How it works
              </Link>
              <Link href="/login" className="top-nav__link">
                Log in
              </Link>
            </>
          )}
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
          {isAuthenticated && role ? (
            <div className="top-nav__user-chip" style={{ background: role === 'DOCTOR' ? 'var(--color-accent-teal)' : 'var(--color-primary)', fontSize: '12px', padding: '4px 12px' }}>
              {name?.split(' ')[0]}
            </div>
          ) : (
            <Link href="/" className="top-nav__cta-btn top-nav__cta-btn--small">
              Seek care
            </Link>
          )}
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
            {isAuthenticated && role ? (
              <>
                <Link
                  href={role === 'DOCTOR' ? '/doctor/dashboard' : '/patient/dashboard'}
                  className="top-nav__overlay-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {role === 'PATIENT' && (
                  <>
                    <Link href="/patient/triage-history" className="top-nav__overlay-link" onClick={() => setMenuOpen(false)}>
                      My Triage
                    </Link>
                    <Link href="/" className="top-nav__overlay-link" onClick={() => setMenuOpen(false)}>
                      Seek care
                    </Link>
                  </>
                )}
                <button
                  className="top-nav__overlay-link"
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
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
                <Link href="/login" className="top-nav__overlay-link" onClick={() => setMenuOpen(false)}>
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
