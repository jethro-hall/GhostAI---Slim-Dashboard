import React from 'react';
import { ShieldCheck, Plus, Pencil, Trash2, Bot, Circle } from 'lucide-react';
import { AgentConfig } from '../types';

interface AgentsPageProps {
  agents: AgentConfig[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export const AgentsPage: React.FC<AgentsPageProps> = ({ agents, onEdit, onDelete, onAdd }) => {
  return (
    <div className="max-w-[1000px] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-neon/10 rounded-xl flex items-center justify-center border border-accent-neon/20">
            <ShieldCheck className="text-accent-neon" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-text-main">Agents</h2>
            <p className="text-sm text-text-muted">Manage and configure your autonomous AI agents.</p>
          </div>
        </div>
        <button 
          onClick={onAdd}
          className="btn btn-sharp flex items-center gap-2 bg-accent-neon text-white border-none hover:bg-accent-neon/90"
        >
          <Plus size={16} />
          Create New Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <div 
            key={agent.id}
            className="glass p-5 rounded-2xl border border-white/60 hover:border-accent-neon/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center border border-black/5">
                  <Bot className="text-text-main" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-text-main">{agent.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Circle size={8} className={agent.status === 'live' ? 'fill-success text-success' : 'fill-warning text-warning'} />
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-text-muted">
                      {agent.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => onEdit(agent.id)}
                  className="p-2 hover:bg-accent-neon/10 rounded-lg text-text-muted hover:text-accent-neon transition-all"
                >
                  <Pencil size={16} />
                </button>
                <button 
                  onClick={() => onDelete(agent.id)}
                  className="p-2 hover:bg-danger/10 rounded-lg text-text-muted hover:text-danger transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p className="text-xs text-text-muted line-clamp-2 leading-relaxed mb-4">
              {agent.systemPrompt}
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-black/5">
              <div className="flex flex-col">
                <span className="text-[0.55rem] font-bold text-text-muted uppercase tracking-wider">Model</span>
                <span className="text-[0.7rem] font-semibold text-text-main">{agent.primaryModelId}</span>
              </div>
              <div className="w-px h-6 bg-black/5" />
              <div className="flex flex-col">
                <span className="text-[0.55rem] font-bold text-text-muted uppercase tracking-wider">Tools</span>
                <span className="text-[0.7rem] font-semibold text-text-main">{agent.tools.filter(t => t.enabled).length} Enabled</span>
              </div>
              <div className="w-px h-6 bg-black/5" />
              <div className="flex flex-col">
                <span className="text-[0.55rem] font-bold text-text-muted uppercase tracking-wider">RAG</span>
                <span className="text-[0.7rem] font-semibold text-text-main">{agent.rag.enabled ? 'Active' : 'Off'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
