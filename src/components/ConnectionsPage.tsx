import React from 'react';
import { Network, CheckCircle2, XCircle, Key, Info } from 'lucide-react';

export const ConnectionsPage: React.FC = () => {
  return (
    <div className="max-w-[800px] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2 mb-6">
        <Network className="text-accent-neon" size={20} />
        <h2 className="text-xl font-bold tracking-tight">LLM Connections</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OpenAI Connection */}
        <div className="glass p-5 rounded-xl border border-white/60">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold text-xs">O</div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-main">OpenAI</h3>
            </div>
            <div className="flex items-center gap-1.5 text-[0.7rem] font-semibold text-success">
              <CheckCircle2 size={12} />
              Connected
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">API Key</label>
              <div className="flex gap-2">
                <div className="flex-1 bg-white/50 border border-black/5 rounded px-3 py-1.5 text-xs font-mono text-text-muted flex items-center justify-between">
                  <span>sk-proj-••••••••••••••••</span>
                  <Key size={12} />
                </div>
                <button className="bg-white border border-[#CBD5E1] px-3 py-1.5 rounded text-[0.7rem] font-semibold hover:border-accent-neon hover:text-accent-neon transition-colors duration-200">
                  Update
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 bg-[#F1F5F9] rounded-lg border border-[#E2E8F0]">
                <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-wider">Chat Model</label>
                <p className="text-[0.75rem] font-semibold text-text-main mt-0.5">gpt-4o-mini</p>
              </div>
              <div className="p-2.5 bg-[#F1F5F9] rounded-lg border border-[#E2E8F0]">
                <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-wider">Embedding</label>
                <p className="text-[0.75rem] font-semibold text-text-main mt-0.5">text-embedding-3-small</p>
              </div>
            </div>
          </div>
        </div>

        {/* LlamaCloud Connection */}
        <div className="glass p-5 rounded-xl border border-white/60">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent-neon rounded flex items-center justify-center text-white font-bold text-xs">L</div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-main">LlamaCloud</h3>
            </div>
            <div className="flex items-center gap-1.5 text-[0.7rem] font-semibold text-danger">
              <XCircle size={12} />
              Disconnected
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">API Key</label>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  placeholder="Enter LLAMA_CLOUD_API_KEY"
                  className="flex-1 bg-white/50 border border-black/5 rounded px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-accent-neon"
                />
                <button className="bg-text-main text-white px-3 py-1.5 rounded text-[0.7rem] font-semibold hover:bg-black transition-colors duration-200">
                  Connect
                </button>
              </div>
            </div>

            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg flex gap-3">
              <Info size={16} className="text-warning shrink-0" />
              <p className="text-[0.7rem] leading-relaxed text-text-main">
                Cloud parse enrichment is currently blocked. Local pypdf fallback will be used for all ingestion runs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Infrastructure Status */}
      <div className="mt-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">Infrastructure Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatusCard label="Control API" status="online" />
          <StatusCard label="Workflow Runtime" status="online" />
          <StatusCard label="Qdrant" status="online" />
          <StatusCard label="Postgres" status="online" />
        </div>
      </div>
    </div>
  );
};

const StatusCard: React.FC<{ label: string; status: 'online' | 'offline' }> = ({ label, status }) => {
  return (
    <div className="p-3 bg-white/50 border border-black/5 rounded-lg flex items-center justify-between">
      <span className="text-[0.75rem] font-semibold text-text-main">{label}</span>
      <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-success shadow-[0_0_6px_var(--color-success)]' : 'bg-danger shadow-[0_0_6px_var(--color-danger)]'}`} />
    </div>
  );
};
