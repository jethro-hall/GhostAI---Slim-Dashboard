import React, { useState, useEffect } from 'react';
import { X, Save, Network, Key, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConnectionEditPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  provider: {
    name: string;
    icon: string;
    color: string;
    apiKey: string;
    chatModel: string;
    embeddingModel: string;
  } | null;
}

export const ConnectionEditPanel: React.FC<ConnectionEditPanelProps> = ({ isOpen, onClose, onSave, provider }) => {
  const [localData, setLocalData] = useState({
    apiKey: '',
    chatModel: '',
    embeddingModel: '',
    baseUrl: ''
  });

  useEffect(() => {
    if (provider) {
      setLocalData({
        apiKey: provider.apiKey,
        chatModel: provider.chatModel,
        embeddingModel: provider.embeddingModel,
        baseUrl: provider.name === 'OpenAI' ? 'https://api.openai.com/v1' : ''
      });
    }
  }, [provider, isOpen]);

  const handleSave = () => {
    onSave(localData);
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
                <div className={`w-8 h-8 ${provider?.color} rounded flex items-center justify-center text-white font-bold text-xs`}>
                  {provider?.icon}
                </div>
                <h2 className="text-lg font-bold tracking-tight">Edit {provider?.name}</h2>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-black/5 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">API Key</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value={localData.apiKey}
                    onChange={(e) => setLocalData({ ...localData, apiKey: e.target.value })}
                    className="w-full bg-black/[0.03] border border-black/5 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent-neon transition-all font-mono"
                    placeholder="Enter your API key"
                  />
                  <Key size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">Base URL (Optional)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={localData.baseUrl}
                    onChange={(e) => setLocalData({ ...localData, baseUrl: e.target.value })}
                    className="w-full bg-black/[0.03] border border-black/5 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent-neon transition-all"
                    placeholder="https://api.openai.com/v1"
                  />
                  <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">Chat Model</label>
                  <select 
                    value={localData.chatModel}
                    onChange={(e) => setLocalData({ ...localData, chatModel: e.target.value })}
                    className="w-full bg-black/[0.03] border border-black/5 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent-neon transition-all appearance-none cursor-pointer"
                  >
                    <option value="gpt-4o">gpt-4o</option>
                    <option value="gpt-4o-mini">gpt-4o-mini</option>
                    <option value="gpt-4-turbo">gpt-4-turbo</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">Embedding Model</label>
                  <select 
                    value={localData.embeddingModel}
                    onChange={(e) => setLocalData({ ...localData, embeddingModel: e.target.value })}
                    className="w-full bg-black/[0.03] border border-black/5 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent-neon transition-all appearance-none cursor-pointer"
                  >
                    <option value="text-embedding-3-small">text-embedding-3-small</option>
                    <option value="text-embedding-3-large">text-embedding-3-large</option>
                    <option value="text-embedding-ada-002">text-embedding-ada-002</option>
                  </select>
                </div>
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
                Save Changes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
