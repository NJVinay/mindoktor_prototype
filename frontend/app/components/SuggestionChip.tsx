'use client';

import './SuggestionChip.css';

interface SuggestionChipProps {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export default function SuggestionChip({ label, onClick, active = false }: SuggestionChipProps) {
  return (
    <button
      className={`suggestion-chip ${active ? 'suggestion-chip--active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
