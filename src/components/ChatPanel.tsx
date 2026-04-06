import React from 'react';
import { MessageSquare, Send, X, FileText, ExternalLink, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-1/2 max-w-[600px] z-[9999] flex flex-col items-center">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={onToggle}
            className="bg-white/80 backdrop-blur-[12px] border border-[#E2E8F0] border-b-0 px-4 py-1.5 rounded-t-md text-[0.75rem] font-semibold text-text-main cursor-pointer flex items-center gap-2 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] transition-all duration-200 hover:bg-white"
          >
            <MessageSquare size={14} />
            GhostChat
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 480, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full bg-white/85 backdrop-blur-[24px] border border-[#E2E8F0] border-b-0 rounded-t-lg shadow-[0_-10px_30px_rgba(0,0,0,0.06)] flex flex-col overflow-hidden"
          >
            <div className="p-3 border-b border-black/5 flex justify-between items-center bg-white/50">
              <div className="flex items-center gap-2 font-semibold text-[0.85rem]">
                <MessageSquare size={16} className="text-accent-neon" />
                GhostChat
              </div>
              <button
                onClick={onToggle}
                className="p-1 rounded-full hover:bg-black/5 transition-colors duration-200"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
              <div className="self-start bg-[#F1F5F9] p-3 rounded-lg rounded-tl-none text-[0.8rem] max-w-[90%] text-text-main border border-[#E2E8F0]">
                Hello! I'm GhostChat. How can I help you with your RAG infrastructure today?
              </div>
              
              <div className="self-end bg-text-main text-white p-3 rounded-lg rounded-tr-none text-[0.8rem] max-w-[90%] shadow-sm">
                What is the current business strategy for the Brisbane branch?
              </div>

              <div className="self-start bg-white p-3 rounded-lg rounded-tl-none text-[0.8rem] max-w-[90%] text-text-main border border-accent-neon/20 shadow-[0_4px_12px_rgba(255,80,0,0.05)]">
                <div className="flex items-center gap-1.5 text-accent-neon font-bold text-[0.65rem] uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 bg-accent-neon rounded-full" />
                  Grounded Response
                </div>
                <p className="leading-relaxed">
                  Based on the <strong>national_business_strategy.pdf</strong>, the Brisbane branch is currently focusing on "deterministic local parsers" for table-first XLSX ingestion to improve data accuracy in the local lane.
                </p>
                
                <div className="mt-4 pt-3 border-t border-black/5">
                  <div className="text-[0.6rem] font-bold text-text-muted uppercase tracking-wider mb-2">Provenance (2 sources)</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-[#F8FAFC] rounded border border-[#E2E8F0] group cursor-pointer hover:border-accent-neon/30 transition-colors duration-200">
                      <div className="flex items-center gap-2">
                        <FileText size={12} className="text-text-muted" />
                        <span className="text-[0.7rem] font-medium truncate max-w-[200px]">national_business_strategy.pdf</span>
                        <span className="text-[0.6rem] bg-white px-1 py-0.5 rounded border border-black/5 text-text-muted">p. 14</span>
                      </div>
                      <ExternalLink size={10} className="text-text-muted group-hover:text-accent-neon" />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-[#F8FAFC] rounded border border-[#E2E8F0] group cursor-pointer hover:border-accent-neon/30 transition-colors duration-200">
                      <div className="flex items-center gap-2">
                        <FileText size={12} className="text-text-muted" />
                        <span className="text-[0.7rem] font-medium truncate max-w-[200px]">profit_and_loss_brisbane.xlsx</span>
                        <span className="text-[0.6rem] bg-white px-1 py-0.5 rounded border border-black/5 text-text-muted">Sheet 1</span>
                      </div>
                      <ExternalLink size={10} className="text-text-muted group-hover:text-accent-neon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-black/5 bg-white/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask anything..."
                  className="flex-1 bg-white border border-[#E2E8F0] rounded px-3 py-1.5 text-[0.8rem] focus:outline-none focus:border-accent-neon transition-colors duration-200"
                />
                <button className="bg-text-main text-white p-1.5 rounded transition-all duration-200 hover:bg-black">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
