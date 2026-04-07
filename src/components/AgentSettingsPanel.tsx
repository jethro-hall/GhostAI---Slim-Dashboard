import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Bot, Zap, Settings2, Database, Volume2, Globe, Trash2, Plus, Info, ShieldCheck, Activity } from 'lucide-react';
import { AgentConfig, AgentTool } from '../types';

interface AgentSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  agent: AgentConfig | null;
  onSave: (agent: AgentConfig) => void;
}

type TabType = 'agent' | 'advanced' | 'tools' | 'knowledge';

export const AgentSettingsPanel: React.FC<AgentSettingsPanelProps> = ({ isOpen, onClose, agent, onSave }) => {
  const [activeTab, setActiveTab] = useState<TabType>('agent');
  const [localAgent, setLocalAgent] = useState<AgentConfig | null>(null);

  useEffect(() => {
    if (agent) {
      setLocalAgent({ ...agent });
    }
  }, [agent]);

  if (!localAgent) return null;

  const handleChange = (field: string, value: any) => {
    setLocalAgent(prev => {
      if (!prev) return null;
      const keys = field.split('.');
      if (keys.length === 1) {
        return { ...prev, [field]: value };
      } else if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: {
            ...(prev[keys[0] as keyof AgentConfig] as any),
            [keys[1]]: value
          }
        };
      } else if (keys.length === 3) {
        const subObj = (prev[keys[0] as keyof AgentConfig] as any)[keys[1]];
        return {
          ...prev,
          [keys[0]]: {
            ...(prev[keys[0] as keyof AgentConfig] as any),
            [keys[1]]: {
              ...subObj,
              [keys[2]]: value
            }
          }
        };
      }
      return prev;
    });
  };

  const handleToolToggle = (id: string) => {
    setLocalAgent(prev => {
      if (!prev) return null;
      return {
        ...prev,
        tools: prev.tools.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t)
      };
    });
  };

  const handleUpdateTool = (id: string, field: keyof AgentTool, value: any) => {
    setLocalAgent(prev => {
      if (!prev) return null;
      return {
        ...prev,
        tools: prev.tools.map(t => t.id === id ? { ...t, [field]: value } : t)
      };
    });
  };

  const handleAddTool = () => {
    const newTool: AgentTool = {
      id: `tool-${Date.now()}`,
      name: 'New Tool',
      description: 'Tool description...',
      type: 'webhook',
      enabled: true,
      method: 'POST',
      url: 'https://api.example.com/v1/tool'
    };
    setLocalAgent(prev => prev ? { ...prev, tools: [...prev.tools, newTool] } : null);
  };

  const handleRemoveTool = (id: string) => {
    setLocalAgent(prev => prev ? { ...prev, tools: prev.tools.filter(t => t.id !== id) } : null);
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[600px] bg-white shadow-2xl z-[101] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent-neon/10 rounded-lg flex items-center justify-center border border-accent-neon/20">
                  <Bot className="text-accent-neon" size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-text-main leading-none">{localAgent.name}</h3>
                  <span className="text-[0.6rem] font-bold text-text-muted uppercase tracking-wider">Agent Configuration</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onSave(localAgent)}
                  className="btn btn-sharp flex items-center gap-2 bg-accent-neon text-white border-none hover:bg-accent-neon/90 py-1.5 px-3 text-xs"
                >
                  <Save size={14} />
                  SAVE
                </button>
                <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X size={20} className="text-text-muted" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6 flex border-b border-black/5 bg-white/50">
              <TabButton active={activeTab === 'agent'} onClick={() => setActiveTab('agent')} label="Agent" icon={<Bot size={14} />} />
              <TabButton active={activeTab === 'advanced'} onClick={() => setActiveTab('advanced')} label="Advanced" icon={<Settings2 size={14} />} />
              <TabButton active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} label="Tools" icon={<Zap size={14} />} />
              <TabButton active={activeTab === 'knowledge'} onClick={() => setActiveTab('knowledge')} label="Knowledge Base" icon={<Database size={14} />} />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {activeTab === 'agent' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <Section title="Identity & Persona" icon={<Bot size={16} />}>
                    <div className="space-y-4">
                      <Input label="Agent Name" value={localAgent.name} onChange={(v) => handleChange('name', v)} />
                      <div className="grid grid-cols-2 gap-4">
                        <Select label="Status" value={localAgent.status} onChange={(v) => handleChange('status', v)} options={[{v:'live',l:'Live'},{v:'draft',l:'Draft'}]} />
                        <Select label="Voice ID" value={localAgent.voiceId} onChange={(v) => handleChange('voiceId', v)} options={[{v:'v1',l:'ElevenLabs - Alloy'},{v:'v2',l:'ElevenLabs - Echo'}]} />
                      </div>
                      <TextArea label="System Prompt" value={localAgent.systemPrompt} onChange={(v) => handleChange('systemPrompt', v)} rows={6} />
                      <TextArea label="First Message" value={localAgent.firstMessage} onChange={(v) => handleChange('firstMessage', v)} rows={2} />
                      
                      <div className="space-y-1.5">
                        <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-wider">Backup Models (Cascade)</label>
                        <div className="flex flex-wrap gap-2">
                          {['gpt-4o', 'gpt-3.5-turbo', 'claude-3-sonnet', 'gemini-1.5-pro'].map(model => {
                            const isSelected = localAgent.backupModelIds.includes(model);
                            return (
                              <button
                                key={model}
                                onClick={() => {
                                  const newModels = isSelected 
                                    ? localAgent.backupModelIds.filter(m => m !== model)
                                    : [...localAgent.backupModelIds, model];
                                  handleChange('backupModelIds', newModels);
                                }}
                                className={`px-2 py-1 rounded-md text-[0.6rem] font-bold transition-all ${
                                  isSelected 
                                    ? 'bg-black text-white border-black' 
                                    : 'bg-black/5 text-text-muted border-transparent hover:bg-black/10'
                                } border`}
                              >
                                {model}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Section>

                  <Section title="Model Configuration" icon={<Activity size={16} />}>
                    <div className="space-y-4">
                      <Select label="Primary Model" value={localAgent.primaryModelId} onChange={(v) => handleChange('primaryModelId', v)} options={[{v:'gpt-4-turbo',l:'GPT-4 Turbo'},{v:'gpt-4o',l:'GPT-4o'},{v:'claude-3-opus',l:'Claude 3 Opus'}]} />
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-wider">Temperature</label>
                          <span className="text-xs font-mono font-bold text-accent-neon">{localAgent.temperature}</span>
                        </div>
                        <input 
                          type="range" min="0" max="1" step="0.1" value={localAgent.temperature}
                          onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-accent-neon"
                        />
                      </div>
                    </div>
                  </Section>
                </div>
              )}

              {activeTab === 'advanced' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <Section title="Conversational Behavior" icon={<Settings2 size={16} />}>
                    <div className="grid grid-cols-2 gap-4">
                      <Select label="Eagerness" value={localAgent.advanced.eagerness} onChange={(v) => handleChange('advanced.eagerness', v)} options={[{v:'low',l:'Low'},{v:'normal',l:'Normal'},{v:'high',l:'High'}]} />
                      <Select label="Spelling Patience" value={localAgent.advanced.spellingPatience} onChange={(v) => handleChange('advanced.spellingPatience', v)} options={[{v:'auto',l:'Auto'},{v:'patient',l:'Patient'},{v:'very_patient',l:'Very Patient'}]} />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-black/[0.02] rounded-lg border border-black/5 mt-4">
                      <div>
                        <p className="text-xs font-bold text-text-main">Speculative Turn</p>
                        <p className="text-[0.6rem] text-text-muted">Predict user intent for faster responses.</p>
                      </div>
                      <Toggle checked={localAgent.advanced.speculativeTurn} onChange={(v) => handleChange('advanced.speculativeTurn', v)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <Input label="Turn Timeout (s)" type="number" value={localAgent.advanced.turnTimeout} onChange={(v) => handleChange('advanced.turnTimeout', parseInt(v))} />
                      <Input label="End Conversation (s)" type="number" value={localAgent.advanced.endConversationTimeout} onChange={(v) => handleChange('advanced.endConversationTimeout', parseInt(v))} />
                    </div>
                  </Section>

                  <Section title="Client Events" icon={<Zap size={16} />}>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {['call.started', 'call.ended', 'transcript.ready', 'tool.called', 'error.occurred'].map(event => {
                          const isSelected = localAgent.advanced.clientEvents.includes(event);
                          return (
                            <button
                              key={event}
                              onClick={() => {
                                const newEvents = isSelected 
                                  ? localAgent.advanced.clientEvents.filter(e => e !== event)
                                  : [...localAgent.advanced.clientEvents, event];
                                handleChange('advanced.clientEvents', newEvents);
                              }}
                              className={`px-2 py-1 rounded-full text-[0.6rem] font-bold transition-all ${
                                isSelected 
                                  ? 'bg-accent-neon text-white border-accent-neon' 
                                  : 'bg-black/5 text-text-muted border-transparent hover:bg-black/10'
                              } border`}
                            >
                              {event}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-[0.6rem] text-text-muted italic">Select events that should trigger client-side callbacks.</p>
                    </div>
                  </Section>

                  <Section title="Privacy & Retention" icon={<ShieldCheck size={16} />}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-black/[0.02] rounded-lg border border-black/5">
                        <p className="text-xs font-bold text-text-main">Zero Retention Mode</p>
                        <Toggle checked={localAgent.advanced.privacy.zeroRetention} onChange={(v) => handleChange('advanced.privacy.zeroRetention', v)} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-black/[0.02] rounded-lg border border-black/5">
                        <p className="text-xs font-bold text-text-main">Store Call Audio</p>
                        <Toggle checked={localAgent.advanced.privacy.storeAudio} onChange={(v) => handleChange('advanced.privacy.storeAudio', v)} />
                      </div>
                      <Input label="Retention Period (Days)" type="number" value={localAgent.advanced.privacy.retentionPeriod} onChange={(v) => handleChange('advanced.privacy.retentionPeriod', parseInt(v))} />
                    </div>
                  </Section>

                  <Section title="Multimodal Input" icon={<Zap size={16} />}>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between p-2.5 bg-black/[0.02] rounded-lg border border-black/5">
                        <span className="text-[0.65rem] font-bold text-text-main">Chat Mode</span>
                        <Toggle checked={localAgent.advanced.multimodal.chatMode} onChange={(v) => handleChange('advanced.multimodal.chatMode', v)} />
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-black/[0.02] rounded-lg border border-black/5">
                        <span className="text-[0.65rem] font-bold text-text-main">Attachments</span>
                        <Toggle checked={localAgent.advanced.multimodal.fileAttachments} onChange={(v) => handleChange('advanced.multimodal.fileAttachments', v)} />
                      </div>
                    </div>
                  </Section>
                </div>
              )}

              {activeTab === 'tools' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted">Agent Capabilities</h3>
                    <button onClick={handleAddTool} className="flex items-center gap-1 text-[0.65rem] font-bold text-accent-neon hover:text-accent-neon/80">
                      <Plus size={12} /> ADD TOOL
                    </button>
                  </div>
                  <div className="space-y-3">
                    {localAgent.tools.map(tool => (
                      <div key={tool.id} className={`p-4 rounded-xl border transition-all ${tool.enabled ? 'bg-white border-accent-neon/20 shadow-sm' : 'bg-black/[0.02] border-black/5 opacity-60'}`}>
                        <div className="flex items-center justify-between mb-3">
                          <input 
                            type="text" value={tool.name} 
                            onChange={(e) => handleUpdateTool(tool.id, 'name', e.target.value)}
                            className="bg-transparent border-none p-0 text-xs font-bold text-text-main focus:outline-none focus:ring-0 w-full"
                          />
                          <div className="flex items-center gap-2">
                            <Toggle checked={tool.enabled} onChange={() => handleToolToggle(tool.id)} />
                            <button onClick={() => handleRemoveTool(tool.id)} className="text-text-muted hover:text-danger"><Trash2 size={14} /></button>
                          </div>
                        </div>
                        <textarea 
                          value={tool.description} 
                          onChange={(e) => handleUpdateTool(tool.id, 'description', e.target.value)}
                          className="w-full bg-black/[0.03] border border-black/5 rounded-lg px-2 py-1.5 text-[0.65rem] focus:outline-none focus:border-accent-neon resize-none"
                          rows={2}
                        />
                        <div className="flex gap-2 mt-2">
                          <Select label="Type" value={tool.type} onChange={(v) => handleUpdateTool(tool.id, 'type', v)} options={[{v:'webhook',l:'Webhook'},{v:'client',l:'Client'},{v:'integration',l:'Integration'}]} />
                          {tool.type === 'webhook' && (
                            <Input label="URL" value={tool.url || ''} onChange={(v) => handleUpdateTool(tool.id, 'url', v)} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'knowledge' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <Section title="RAG Settings" icon={<Database size={16} />}>
                    <div className="flex items-center justify-between p-4 bg-accent-neon/5 border border-accent-neon/10 rounded-xl mb-6">
                      <div>
                        <p className="text-sm font-bold text-text-main">Enable Knowledge Base</p>
                        <p className="text-[0.7rem] text-text-muted">Allow agent to query indexed documents.</p>
                      </div>
                      <Toggle checked={localAgent.rag.enabled} onChange={(v) => handleChange('rag.enabled', v)} />
                    </div>

                    <div className="space-y-5">
                      <Select label="Embedding Model" value={localAgent.rag.embeddingModel} onChange={(v) => handleChange('rag.embeddingModel', v)} options={[{v:'text-embedding-3-small',l:'text-embedding-3-small'},{v:'text-embedding-3-large',l:'text-embedding-3-large'}]} />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="Character Limit" type="number" value={localAgent.rag.characterLimit} onChange={(v) => handleChange('rag.characterLimit', parseInt(v))} />
                        <Input label="Chunk Limit" type="number" value={localAgent.rag.chunkLimit} onChange={(v) => handleChange('rag.chunkLimit', parseInt(v))} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="Distance Limit" type="number" step="0.1" value={localAgent.rag.vectorDistanceLimit} onChange={(v) => handleChange('rag.vectorDistanceLimit', parseFloat(v))} />
                        <Input label="Candidates" type="number" value={localAgent.rag.candidates} onChange={(v) => handleChange('rag.candidates', parseInt(v))} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-black/[0.02] rounded-lg border border-black/5">
                        <p className="text-xs font-bold text-text-main">Query Rewrite Prompt Override</p>
                        <Toggle checked={localAgent.rag.queryRewrite} onChange={(v) => handleChange('rag.queryRewrite', v)} />
                      </div>
                    </div>
                  </Section>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-3 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-wider border-b-2 transition-all ${
      active ? 'border-accent-neon text-accent-neon bg-accent-neon/5' : 'border-transparent text-text-muted hover:text-text-main hover:bg-black/[0.02]'
    }`}
  >
    {icon}
    {label}
  </button>
);

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 text-text-muted">
      {icon}
      <h4 className="text-[0.65rem] font-bold uppercase tracking-widest">{title}</h4>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const Input: React.FC<{ label: string; value: any; onChange: (v: string) => void; type?: string; step?: string }> = ({ label, value, onChange, type = 'text', step }) => (
  <div className="space-y-1.5">
    <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-wider">{label}</label>
    <input 
      type={type} step={step} value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-accent-neon transition-all"
    />
  </div>
);

const TextArea: React.FC<{ label: string; value: string; onChange: (v: string) => void; rows?: number }> = ({ label, value, onChange, rows = 3 }) => (
  <div className="space-y-1.5">
    <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-wider">{label}</label>
    <textarea 
      value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
      className="w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-accent-neon transition-all resize-none leading-relaxed"
    />
  </div>
);

const Select: React.FC<{ label: string; value: string; onChange: (v: string) => void; options: {v:string,l:string}[] }> = ({ label, value, onChange, options }) => (
  <div className="space-y-1.5">
    <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-wider">{label}</label>
    <select 
      value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-black/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-accent-neon transition-all appearance-none cursor-pointer"
    >
      {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </div>
);

const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
    <div className="w-8 h-4 bg-black/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-accent-neon"></div>
  </label>
);
