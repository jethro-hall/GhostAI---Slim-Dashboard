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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-[8px] flex items-center justify-center z-[10000]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-[360px] p-6 rounded-xl border border-white/60 glass-popup shadow-2xl flex flex-col gap-4"
          >
            <div className="flex justify-between items-center border-b border-black/5 pb-2">
              <h2 className="text-[1.1rem] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent-neon rounded-full shadow-[0_0_6px_var(--accent-neon)]" />
                Full Sync
              </h2>
              <button
                onClick={onClose}
                className="bg-black/5 border-none w-7 h-7 rounded-full flex justify-center items-center cursor-pointer text-text-muted transition-colors duration-200 hover:bg-black/10 hover:text-[#111827]"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-2.5 text-[0.85rem] font-medium transition-colors duration-200 ${
                    task.status === 'done' ? 'text-text-main' : 'text-text-muted'
                  }`}
                >
                  <div
                    className={`w-4 h-4 border-[1.5px] rounded-full flex items-center justify-center transition-all duration-200 ${
                      task.status === 'done'
                        ? 'bg-text-main border-text-main'
                        : 'border-[#CBD5E1]'
                    }`}
                  >
                    {task.status === 'done' && (
                      <Check size={10} strokeWidth={3} className="text-white" />
                    )}
                  </div>
                  {task.label}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
