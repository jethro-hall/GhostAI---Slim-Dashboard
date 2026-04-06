import React, { useState } from 'react';
import { ShieldCheck, Plus, Trash2, Settings2, MessageSquare, Bot, Zap, Globe, Volume2, Save } from 'lucide-react';
import { AgentConfig, AgentTool } from '../types';

interface AgentConfigPageProps {
  config: AgentConfig;
  onChange: (config: AgentConfig) => void;
}

export const AgentConfigPage: React.FC<AgentConfigPageProps> = ({ config, onChange }) => {
  const [localConfig, setLocalConfig] = useState<AgentConfig>(config);

  const handleChange = (field: keyof AgentConfig, value: any) => {
    const updated = { ...localConfig, [field]: value };
    setLocalConfig(updated);
  };

  const handleToolToggle = (toolId: string) => {
    const updatedTools = localConfig.tools.map(t => 
      t.id === toolId ? { ...t, enabled: !t.enabled } : t
    );
    handleChange('tools', updatedTools);
  };

  const handleAddTool = () => {
    const newTool: AgentTool = {
      id: `tool-${Date.now()}`,
      name: 'New Tool',
      description: 'Describe what this tool does...',
      enabled: true
    };
    handleChange('tools', [...localConfig.tools, newTool]);
  };

  const handleRemoveTool = (toolId: string) => {
    handleChange('tools', localConfig.tools.filter(t => t.id !== toolId));
  };

  const handleUpdateTool = (toolId: string, field: keyof AgentTool, value: any) => {
    const updatedTools = localConfig.tools.map(t => 
      t.id === toolId ? { ...t, [field]: value } : t
    );
    handleChange('tools', updatedTools);
  };

  const handleSave = () => {
    onChange(localConfig);
    // In a real app, this would trigger an API call
    alert('Agent configuration saved successfully!');
  };

  return (
    <div className="max-w-[1000px] animate-in fade-in slide-in-from-bottom-4 duration-300 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-neon/10 rounded-xl flex items-center justify-center border border-accent-neon/20">
            <ShieldCheck className="text-accent-neon" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-text-main">Agent Configuration</h2>
            <p className="text-sm text-text-muted">Define your agent's personality, tools, and behavior.</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="btn btn-sharp flex items-center gap-2 bg-accent-neon text-white border-none hover:bg-accent-neon/90"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Identity & Persona */}
        <div className="lg:col-span-2 space-y-6">
          <section className="glass p-6 rounded-2xl border border-white/60 space-y-6">
            <div className="flex items-center gap-2 text-accent-neon mb-2">
              <Bot size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider">Identity & Persona</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">Agent Name</label>
                <input 
                  type="text" 
                  value={localConfig.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-white/50 border border-black/5 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent-neon transition-all"
                  placeholder="e.g. GhostDASH Assistant"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">System Prompt (Persona)</label>
                <textarea 
                  value={localConfig.systemPrompt}
                  onChange={(e) => handleChange('systemPrompt', e.target.value)}
                  rows={6}
                  className="w-full bg-white/50 border border-black/5 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent-neon transition-all resize-none leading-relaxed"
                  placeholder="Define how the agent should behave..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">First Message</label>
                <textarea 
                  value={localConfig.firstMessage}
                  onChange={(e) => handleChange('firstMessage', e.target.value)}
                  rows={2}
                  className="w-full bg-white/50 border border-black/5 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent-neon transition-all resize-none leading-relaxed"
                  placeholder="The first thing the agent says to the user..."
                />
              </div>
            </div>
          </section>

          {/* Tools Section */}
          <section className="glass p-6 rounded-2xl border border-white/60">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-accent-neon">
                <Zap size={18} />
                <h3 className="text-sm font-bold uppercase tracking-wider">Capabilities & Tools</h3>
              </div>
              <button 
                onClick={handleAddTool}
                className="flex items-center gap-1.5 text-[0.7rem] font-bold text-accent-neon hover:text-accent-neon/80 transition-colors"
              >
                <Plus size={14} />
                ADD TOOL
              </button>
            </div>

            <div className="space-y-3">
              {localConfig.tools.map((tool) => (
                <div 
                  key={tool.id}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    tool.enabled 
                      ? 'bg-white/60 border-accent-neon/20 shadow-sm' 
                      : 'bg-black/[0.02] border-black/5 grayscale opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <input 
                          type="text" 
                          value={tool.name}
                          onChange={(e) => handleUpdateTool(tool.id, 'name', e.target.value)}
                          className="bg-transparent border-none p-0 text-sm font-bold text-text-main focus:outline-none focus:ring-0 w-full"
                          placeholder="Tool Name"
                        />
                        <div className="flex items-center gap-2 shrink-0">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={tool.enabled} 
                              onChange={() => handleToolToggle(tool.id)}
                              className="sr-only peer" 
                            />
                            <div className="w-8 h-4 bg-black/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-accent-neon"></div>
                          </label>
                          <button 
                            onClick={() => handleRemoveTool(tool.id)}
                            className="text-text-muted hover:text-danger transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <textarea 
                        value={tool.description}
                        onChange={(e) => handleUpdateTool(tool.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full bg-black/[0.03] border border-black/5 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-accent-neon transition-all resize-none leading-relaxed"
                        placeholder="Tool description..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Model & Advanced Settings */}
        <div className="space-y-6">
          <section className="glass p-6 rounded-2xl border border-white/60 space-y-6">
            <div className="flex items-center gap-2 text-accent-neon mb-2">
              <Settings2 size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider">Model Settings</h3>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">Model ID</label>
                <select 
                  value={localConfig.modelId}
                  onChange={(e) => handleChange('modelId', e.target.value)}
                  className="w-full bg-white/50 border border-black/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-neon transition-all appearance-none cursor-pointer"
                >
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  <option value="gpt-4o">GPT-4o</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="claude-3-opus">Claude 3 Opus</option>
                  <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                </select>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">Temperature</label>
                  <span className="text-xs font-mono font-bold text-accent-neon">{localConfig.temperature}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1"
                  value={localConfig.temperature}
                  onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-accent-neon"
                />
                <div className="flex justify-between text-[0.6rem] text-text-muted font-bold">
                  <span>PRECISE</span>
                  <span>CREATIVE</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">Max Output Tokens</label>
                <input 
                  type="number" 
                  value={localConfig.maxTokens}
                  onChange={(e) => handleChange('maxTokens', parseInt(e.target.value))}
                  className="w-full bg-white/50 border border-black/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-neon transition-all"
                />
              </div>
            </div>
          </section>

          <section className="glass p-6 rounded-2xl border border-white/60 space-y-6">
            <div className="flex items-center gap-2 text-accent-neon mb-2">
              <Volume2 size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider">Voice & Language</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <Globe size={12} className="text-text-muted" />
                  <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">Primary Language</label>
                </div>
                <select 
                  value={localConfig.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                  className="w-full bg-white/50 border border-black/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-neon transition-all appearance-none cursor-pointer"
                >
                  <option value="en-US">English (US)</option>
                  <option value="en-GB">English (UK)</option>
                  <option value="es-ES">Spanish (Spain)</option>
                  <option value="fr-FR">French (France)</option>
                  <option value="de-DE">German (Germany)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <Volume2 size={12} className="text-text-muted" />
                  <label className="text-[0.65rem] font-bold text-text-muted uppercase tracking-wider">Voice ID</label>
                </div>
                <input 
                  type="text" 
                  value={localConfig.voiceId}
                  onChange={(e) => handleChange('voiceId', e.target.value)}
                  className="w-full bg-white/50 border border-black/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-neon transition-all"
                  placeholder="e.g. alloy, echo, fable"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
