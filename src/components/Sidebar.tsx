import React from 'react';
import { LayoutDashboard, Database, Network, FileInput, Workflow, ChevronLeft, Settings, Activity, FlaskConical, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { ViewType } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, currentView, onViewChange }) => {
  return (
    <motion.aside
      initial={false}
      animate={{ marginLeft: isOpen ? 0 : -170 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-[170px] bg-sidebar-bg border-r border-black/5 py-3 flex flex-col z-50 h-screen overflow-hidden"
    >
      <div className="px-3 pb-4 font-extrabold text-base tracking-tighter flex items-center gap-1.5 text-text-main">
        👻 Ghost<span className="text-text-muted font-normal">DASH</span>
      </div>

      <div className="mb-4">
        <div className="px-3 text-[0.6rem] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">
          RAG INFRASTRUCTURE
        </div>
        <NavItem 
          icon={<Network size={14} />} 
          label="LLM Connections" 
          active={currentView === 'connections'} 
          onClick={() => onViewChange('connections')}
        />
        <NavItem 
          icon={<Database size={14} />} 
          label="Knowledge & Retrieval" 
          active={currentView === 'knowledge'} 
          onClick={() => onViewChange('knowledge')}
        />
        <NavItem 
          icon={<Activity size={14} />} 
          label="Vector DBs" 
          active={currentView === 'vectors'} 
          onClick={() => onViewChange('vectors')}
        />
      </div>

      <div className="mb-4">
        <div className="px-3 text-[0.6rem] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">
          INGESTION
        </div>
        <NavItem 
          icon={<FileInput size={14} />} 
          label="Data Sources" 
          active={currentView === 'ingestion'} 
          onClick={() => onViewChange('ingestion')}
        />
        <NavItem 
          icon={<Workflow size={14} />} 
          label="Parsing Pipelines" 
          active={currentView === 'pipelines'} 
          onClick={() => onViewChange('pipelines')}
        />
      </div>

      <div className="mb-4">
        <div className="px-3 text-[0.6rem] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">
          QUALITY ASSURANCE
        </div>
        <NavItem 
          icon={<FlaskConical size={14} />} 
          label="Knowledge Lab" 
          active={currentView === 'testing'} 
          onClick={() => onViewChange('testing')}
        />
      </div>

      <div className="mt-auto border-t border-black/5 pt-2">
        <NavItem icon={<Settings size={14} />} label="Settings" />
      </div>
    </motion.aside>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`px-3 py-1.5 text-[0.8rem] font-medium cursor-pointer flex items-center gap-2 border-l-2 transition-all duration-150 ${
        active
          ? 'bg-active-bg text-text-main border-accent-neon font-semibold'
          : 'text-text-muted border-transparent hover:text-text-main hover:bg-[#F1F5F9]'
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};
