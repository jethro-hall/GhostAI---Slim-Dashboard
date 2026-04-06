import React from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
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
            animate={{ height: 380, opacity: 1 }}
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

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              <div className="self-start bg-[#F1F5F9] p-2.5 rounded-lg rounded-tl-none text-[0.8rem] max-w-[80%] text-text-main border border-[#E2E8F0]">
                Hello! I'm GhostChat. How can I help you with your RAG infrastructure today?
              </div>
              <div className="self-end bg-text-main text-white p-2.5 rounded-lg rounded-tr-none text-[0.8rem] max-w-[80%] shadow-sm">
                Can you explain the difference between local and cloud lanes?
              </div>
              <div className="self-start bg-[#F1F5F9] p-2.5 rounded-lg rounded-tl-none text-[0.8rem] max-w-[80%] text-text-main border border-[#E2E8F0]">
                Local lane uses deterministic parsers for structured data like XLSX, while cloud lane uses LLAMA_CLOUD for advanced enrichment.
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
