import React from 'react';
import { PanelLeft, Plus } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onSync: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onSync }) => {
  return (
    <header className="h-[44px] border-b border-black/5 flex items-center justify-between px-4 glass-header sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="bg-transparent border-none text-[#94A3B8] cursor-pointer flex items-center justify-center p-0.5 transition-colors duration-150 hover:text-text-main"
          title="Toggle Menu"
        >
          <PanelLeft size={18} strokeWidth={2.5} />
        </button>
        <div className="text-[0.9rem] font-semibold">Knowledge & retrieval</div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onSync}
          className="bg-text-main text-white px-3.5 py-1.5 rounded font-semibold text-[0.75rem] cursor-pointer transition-all duration-200 inline-flex items-center gap-1.5 shadow-sm hover:bg-black hover:shadow-md"
        >
          Full Sync (Demo)
        </button>
        <button className="bg-white text-text-main border border-[#CBD5E1] px-3.5 py-1.5 rounded font-semibold text-[0.75rem] cursor-pointer transition-all duration-200 inline-flex items-center gap-1.5 shadow-sm hover:border-accent-neon hover:text-accent-neon hover:shadow-[0_2px_8px_rgba(255,80,0,0.15)]">
          <Plus size={14} strokeWidth={2.5} />
          Add Provider
        </button>
      </div>
    </header>
  );
};
