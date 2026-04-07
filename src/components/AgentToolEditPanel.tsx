import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AgentTool } from '../types';

interface AgentToolEditPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tool: AgentTool) => void;
  onDelete?: (id: string) => void;
  tool: AgentTool | null;
}

export const AgentToolEditPanel: React.FC<AgentToolEditPanelProps> = ({ isOpen, onClose, onSave, onDelete, tool }) => {
  const [localTool, setLocalTool] = useState<AgentTool>({
    id: '',
    name: '',
    description: '',
    enabled: true
  });

  useEffect(() => {
    if (tool) {
      setLocalTool(tool);
    } else {
      setLocalTool({
        id: `tool-${Date.now()}`,
        name: '',
        description: '',
        enabled: true
      });
    }
  }, [tool, isOpen]);

  const handleSave = () => {
    if (!localTool.name.trim()) return;
    onSave(localTool);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-[4px] z-[10001]"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-[400px] bg-white/90 backdrop-blur-[32px] border-l border-black/5 shadow-2xl z-[10002] flex flex-col"
          >
            <div className="p-6 border-b border-black/5 flex justify-between items-center bg-white/50">
              <div className="flex items-center gap-2">
                <Zap className="text-accent-neon" size={20} />
                <h2 className="text-lg font-bold tracking-tight">{tool ? 'Edit Tool' : 'Add New Tool'}</h2>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-black/5 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">Tool Name</label>
                <input 
                  type="text" 
                  value={localTool.name}
                  onChange={(e) => setLocalTool({ ...localTool, name: e.target.value })}
                  className="w-full bg-black/[0.03] border border-black/5 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent-neon transition-all"
                  placeholder="e.g. Web Search"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">Description</label>
                <textarea 
                  value={localTool.description}
                  onChange={(e) => setLocalTool({ ...localTool, description: e.target.value })}
                  rows={5}
                  className="w-full bg-black/[0.03] border border-black/5 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent-neon transition-all resize-none leading-relaxed"
                  placeholder="Describe what this tool does and when the agent should use it..."
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/[0.02] border border-black/5 rounded-xl">
                <div className="space-y-0.5">
                  <div className="text-[0.65rem] font-bold text-text-main">Enable Tool</div>
                  <div className="text-[0.55rem] text-text-muted font-medium">Allow the agent to use this capability.</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={localTool.enabled} 
                    onChange={() => setLocalTool({ ...localTool, enabled: !localTool.enabled })}
                    className="sr-only peer" 
                  />
                  <div className="w-10 h-5 bg-black/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-neon"></div>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-black/5 bg-white/50 flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold border border-black/5 hover:bg-black/5 transition-all text-text-muted"
              >
                Discard
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-accent-neon text-white hover:bg-accent-neon/90 transition-all flex items-center justify-center gap-2"
              >
                <Save size={14} />
                Save Tool
              </button>
              {tool && onDelete && (
                <button 
                  onClick={() => { onDelete(tool.id); onClose(); }}
                  className="p-2.5 rounded-xl border border-danger/20 text-danger hover:bg-danger/5 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
