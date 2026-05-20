'use client';

import { ReactNode } from 'react';
import './PrimaryCTAButton.css';

interface PrimaryCTAButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  ariaLabel?: string;
}

export default function PrimaryCTAButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  ariaLabel,
}: PrimaryCTAButtonProps) {
  return (
    <button
      type={type}
      className={`primary-cta ${className} ${disabled ? 'primary-cta--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
