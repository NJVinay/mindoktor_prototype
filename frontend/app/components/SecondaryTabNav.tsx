'use client';

import { useState } from 'react';
import './SecondaryTabNav.css';

const tabs = [
  {
    label: 'Seek care',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M10 2C7.79 2 6 3.79 6 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 12c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" fill="currentColor" opacity="0.8"/>
        <circle cx="15" cy="5" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 3.5v3M13.5 5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Vaccination',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14 2l2 2-1 1 2 2-6 6-2-2-1 1-3-3 1-1-2-2 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 16l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Prescription',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="5" y="3" width="10" height="6" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="7" y="9" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: "Women's health",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="10" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 12v6M8 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Weight loss',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function SecondaryTabNav() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tab-nav" role="tablist" aria-label="Service categories">
      <div className="tab-nav__inner container">
        <div className="tab-nav__scroll">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              role="tab"
              aria-selected={activeTab === index}
              className={`tab-nav__tab ${activeTab === index ? 'tab-nav__tab--active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              <span className="tab-nav__icon">{tab.icon}</span>
              <span className="tab-nav__label">{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="tab-nav__fade" aria-hidden="true" />
      </div>
    </div>
  );
}
