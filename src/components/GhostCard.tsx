import React from 'react';

interface GhostCardProps {
  label: string;
  title: string;
  description: string;
  borderColor?: string;
  labelColor?: string;
  titleColor?: string;
}

export const GhostCard: React.FC<GhostCardProps> = ({
  label,
  title,
  description,
  borderColor,
  labelColor,
  titleColor,
}) => {
  return (
    <div
      className="flex-1 p-3 rounded-lg glass shadow-sm transition-all duration-200"
      style={{ borderColor: borderColor || 'rgba(255, 255, 255, 0.6)' }}
    >
      <label
        className="text-[0.6rem] font-bold text-text-muted uppercase tracking-wider"
        style={{ color: labelColor }}
      >
        {label}
      </label>
      <h3
        className="text-[0.9rem] font-semibold mt-0.5"
        style={{ color: titleColor }}
      >
        {title}
      </h3>
      <p className="text-[0.75rem] text-text-muted mt-0.5 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
