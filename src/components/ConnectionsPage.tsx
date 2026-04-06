import React from 'react';
import { Network, CheckCircle2, XCircle, Key, Info, Pencil } from 'lucide-react';

export const ConnectionsPage: React.FC = () => {
  return (
    <div className="max-w-[800px] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Network className="text-accent-neon" size={20} />
          <h2 className="text-xl font-bold tracking-tight">LLM Connections</h2>
        </div>
        <div className="flex items-center gap-2 bg-white/50 border border-black/5 rounded-full px-3 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_4px_var(--color-success)]" />
          <span className="text-[0.6rem] font-bold uppercase tracking-wider text-text-main">Infrastructure: Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OpenAI Connection */}
        <div className="glass p-4 rounded-xl border border-white/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-black rounded flex items-center justify-center text-white font-bold text-[0.65rem]">O</div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-main">OpenAI</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[0.65rem] font-semibold text-success">
                <CheckCircle2 size={10} />
                Connected
              </div>
              <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors text-text-muted hover:text-accent-neon">
                <Pencil size={12} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-wider">API Key</label>
              <div className="flex gap-2">
                <div className="flex-1 bg-white/50 border border-black/5 rounded px-2.5 py-1 text-[0.7rem] font-mono text-text-muted flex items-center justify-between">
                  <span>sk-proj-••••••••••••••••</span>
                  <Key size={10} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-1.5 bg-[#F1F5F9] rounded-lg border border-[#E2E8F0]">
                <label className="text-[0.55rem] font-bold text-text-muted uppercase tracking-wider">Chat Model</label>
                <p className="text-[0.7rem] font-semibold text-text-main">gpt-4o-mini</p>
              </div>
              <div className="p-1.5 bg-[#F1F5F9] rounded-lg border border-[#E2E8F0]">
                <label className="text-[0.55rem] font-bold text-text-muted uppercase tracking-wider">Embedding</label>
                <p className="text-[0.7rem] font-semibold text-text-main">text-embedding-3-small</p>
              </div>
            </div>
          </div>
        </div>

        {/* LlamaCloud Connection */}
        <div className="glass p-4 rounded-xl border border-white/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-accent-neon rounded flex items-center justify-center text-white font-bold text-[0.65rem]">L</div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-main">LlamaCloud</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[0.65rem] font-semibold text-danger">
                <XCircle size={10} />
                Disconnected
              </div>
              <button className="p-1.5 hover:bg-black/5 rounded-md transition-colors text-text-muted hover:text-accent-neon">
                <Pencil size={12} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-wider">API Key</label>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  placeholder="Enter LLAMA_CLOUD_API_KEY"
                  className="flex-1 bg-white/50 border border-black/5 rounded px-2.5 py-1 text-[0.7rem] font-mono focus:outline-none focus:border-accent-neon"
                />
                <button className="bg-text-main text-white px-2.5 py-1 rounded text-[0.65rem] font-semibold hover:bg-black transition-colors duration-200">
                  Connect
                </button>
              </div>
            </div>

            <div className="p-2 bg-warning/10 border border-warning/20 rounded-lg flex gap-2">
              <Info size={14} className="text-warning shrink-0 mt-0.5" />
              <p className="text-[0.65rem] leading-tight text-text-main">
                Cloud parse enrichment is currently blocked. Local pypdf fallback will be used for all ingestion runs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
