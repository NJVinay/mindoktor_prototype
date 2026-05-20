'use client';

import { ReactNode } from 'react';
import './OutlineCTAButton.css';

interface OutlineCTAButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export default function OutlineCTAButton({
  children,
  onClick,
  disabled = false,
  className = '',
  ariaLabel,
}: OutlineCTAButtonProps) {
  return (
    <button
      className={`outline-cta ${className} ${disabled ? 'outline-cta--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
