import React from 'react';
import { X, Database, FileText, Activity, Layers, HardDrive } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { KnowledgeStatus } from '../types';

interface KnowledgeStatusPanelProps {
  isOpen: boolean;
  onClose: () => void;
  status: KnowledgeStatus;
}

export const KnowledgeStatusPanel: React.FC<KnowledgeStatusPanelProps> = ({ isOpen, onClose, status }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-[4px] z-[10001]"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-[320px] bg-white/90 backdrop-blur-[32px] border-l border-black/5 shadow-2xl z-[10002] flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <Database className="text-accent-neon" size={20} />
                <h2 className="text-lg font-bold tracking-tight">Knowledge Status</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-black/5 transition-colors duration-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-8">
              {/* Total Summary */}
              <div className="space-y-4">
                <div className="text-[0.65rem] font-bold text-text-muted uppercase tracking-widest">Ingress Overview</div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-4 bg-black/5 rounded-xl border border-black/5">
                    <div className="text-3xl font-black text-text-main">{status.totalFiles}</div>
                    <div className="text-[0.7rem] font-bold text-text-muted uppercase mt-1">Total Files Ingress'd</div>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-4">
                <div className="text-[0.65rem] font-bold text-text-muted uppercase tracking-widest">File Breakdown</div>
                <div className="space-y-2">
                  <BreakdownRow label="XLSX" count={status.breakdown.xlsx} color="bg-green-500" />
                  <BreakdownRow label="TXT" count={status.breakdown.txt} color="bg-blue-500" />
                  <BreakdownRow label="PDF" count={status.breakdown.pdf} color="bg-red-500" />
                </div>
              </div>

              {/* Storage Details */}
              <div className="space-y-4">
                <div className="text-[0.65rem] font-bold text-text-muted uppercase tracking-widest">Data Storage</div>
                <div className="space-y-3">
                  <StorageItem icon={<HardDrive size={14} />} label="DB" value={status.storage.db} />
                  <StorageItem icon={<Layers size={14} />} label="Vector DB" value={status.storage.vectorDb} />
                  <StorageItem icon={<Activity size={14} />} label="GraphRAG" value={status.storage.graphRag} />
                </div>
              </div>

              {/* Index Size */}
              <div className="mt-auto pt-6 border-t border-black/5">
                <div className="flex justify-between items-center">
                  <div className="text-[0.7rem] font-bold text-text-muted uppercase">Total Index Size</div>
                  <div className="text-sm font-mono font-bold text-accent-neon">
                    {status.totalIndexSize.toLocaleString()} nodes
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const BreakdownRow: React.FC<{ label: string; count: number; color: string }> = ({ label, count, color }) => (
  <div className="flex items-center justify-between p-2 bg-white/50 border border-black/5 rounded-lg">
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-xs font-semibold text-text-main">{label}</span>
    </div>
    <span className="text-xs font-mono font-bold text-text-muted">{count}</span>
  </div>
);

const StorageItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-text-muted">
      {icon}
      <span className="text-[0.7rem] font-bold uppercase tracking-wider">{label}</span>
    </div>
    <span className="text-xs font-mono text-text-main">{value}</span>
  </div>
);
