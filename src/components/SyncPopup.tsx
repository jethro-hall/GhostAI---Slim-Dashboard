import React from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SyncTask } from '../types';

interface SyncPopupProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: SyncTask[];
}

export const SyncPopup: React.FC<SyncPopupProps> = ({ isOpen, onClose, tasks }) => {
  const mockDocuments = [
    { name: 'national_business_strategy.pdf', status: 'PARSED', subtext: 'parse: completed • index: pending • lane: local' },
    { name: 'n75057_DE-74140_-_2025_Tax_Time_Toolkit_for_small_business_DIGITAL.pdf', status: 'PARSED', subtext: 'parse: completed • index: pending • lane: local' },
    { name: 'kpmg-top-risks-to-australian-business-2024-25.pdf.coredownload.inline.pdf', status: 'PARSED', subtext: 'parse: completed • index: pending • lane: local' },
    { name: 'journal_report.xlsx', status: 'PARSED', subtext: 'parse: completed • index: pending • lane: local' },
    { name: 'financial_summary_q1.xlsx', status: 'QUEUED', subtext: 'parse: pending • index: pending • lane: local' },
    { name: 'market_analysis_2024.pdf', status: 'QUEUED', subtext: 'parse: pending • index: pending • lane: local' },
    { name: 'competitor_overview.pdf', status: 'QUEUED', subtext: 'parse: pending • index: pending • lane: local' },
    { name: 'annual_report_2023.pdf', status: 'QUEUED', subtext: 'parse: pending • index: pending • lane: local' },
  ];

  const getStatusDisplay = (status: SyncTask['status']) => {
    switch (status) {
      case 'done': return { label: 'COMPLETED', color: 'text-success', icon: <Check size={12} className="text-white" strokeWidth={3} /> };
      case 'in-progress': return { label: 'RUNNING', color: 'text-warning', icon: <div className="w-1.5 h-1.5 bg-warning rounded-full animate-pulse" /> };
      default: return { label: 'PENDING', color: 'text-text-muted', icon: <div className="w-1.5 h-1.5 bg-text-muted rounded-full" /> };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-[4px] flex items-center justify-center z-[10000]"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-[700px] rounded-2xl border border-white/40 glass-popup shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-black/5">
              <div className="space-y-0.5">
                <h2 className="text-lg font-bold flex items-center gap-2 text-text-main">
                  <span className="w-2 h-2 bg-accent-neon rounded-full shadow-[0_0_8px_var(--accent-neon)]" />
                  Full Sync
                </h2>
                <p className="text-[0.65rem] text-text-muted font-medium">
                  File 1 of 50 • Export_2026-03-25_155400.xlsx
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-black/5 rounded-full transition-colors text-text-muted hover:text-text-main"
              >
                <X size={18} />
              </button>
            </div>

            {/* Progress Bar Section */}
            <div className="px-6 py-4 bg-black/[0.02] border-b border-black/5">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[0.7rem] font-bold text-accent-neon uppercase tracking-wider">31% complete</span>
                <span className="text-[0.65rem] font-bold text-text-muted">0 passed • 0 failed</span>
              </div>
              <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '31%' }}
                  className="h-full bg-accent-neon shadow-[0_0_10px_var(--accent-neon)]"
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex h-[320px]">
              {/* Left Column: Steps */}
              <div className="w-[220px] border-r border-black/5 p-6 flex flex-col gap-6">
                <div className="space-y-5">
                  {tasks.map((task) => {
                    const display = getStatusDisplay(task.status);
                    const isPending = task.status === 'queued';
                    
                    return (
                      <div key={task.id} className={`flex items-center gap-3 ${isPending ? 'opacity-40' : ''}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          task.status === 'done' ? 'bg-success border-success' : 
                          task.status === 'in-progress' ? 'border-warning' : 'border-text-muted'
                        }`}>
                          {display.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.75rem] font-bold text-text-main leading-none">{task.label}</span>
                          <span className={`text-[0.6rem] font-bold uppercase tracking-wider mt-0.5 ${display.color}`}>
                            {display.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Documents */}
              <div className="flex-1 flex flex-col">
                <div className="px-4 py-3 border-b border-black/5 flex justify-between items-center bg-black/[0.01]">
                  <span className="text-[0.65rem] font-bold text-text-muted uppercase tracking-widest">Documents</span>
                  <span className="text-[0.65rem] font-bold text-text-muted">50</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                  {mockDocuments.map((doc, i) => (
                    <div 
                      key={i}
                      className="p-3 bg-white/40 border border-black/5 rounded-xl flex items-center justify-between gap-4 hover:bg-white/60 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.75rem] font-bold text-text-main truncate mb-0.5">{doc.name}</p>
                        <p className="text-[0.6rem] text-text-muted font-medium">{doc.subtext}</p>
                      </div>
                      <div className="shrink-0">
                        <span className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full border ${
                          doc.status === 'PARSED' 
                            ? 'bg-success/10 text-success border-success/20' 
                            : 'bg-black/5 text-text-muted border-black/10'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
