import React from 'react';
import { PipelineConfig } from '../types';
import { Sliders, Info } from 'lucide-react';

interface PipelineConfigPageProps {
  config: PipelineConfig;
  onChange: (config: PipelineConfig) => void;
}

export const PipelineConfigPage: React.FC<PipelineConfigPageProps> = ({ config, onChange }) => {
  const handleChange = (key: keyof PipelineConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="max-w-[800px] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2 mb-6">
        <Sliders className="text-accent-neon" size={20} />
        <h2 className="text-xl font-bold tracking-tight">Parsing Pipelines</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Node Parser Settings */}
        <div className="glass p-5 rounded-xl border border-white/60">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted">Node Parser (SentenceWindow)</h3>
            <div className="tooltip-icon" data-tip="SentenceWindowNodeParser avoids semantic breakage by keeping context windows.">
              <Info size={14} />
            </div>
          </div>

          <div className="space-y-4">
            <ConfigSlider
              label="PDF Chunk Size"
              value={config.chunkSize}
              min={600}
              max={1400}
              step={50}
              onChange={(v) => handleChange('chunkSize', v)}
              unit="chars"
            />
            <ConfigSlider
              label="PDF Chunk Overlap"
              value={config.chunkOverlap}
              min={50}
              max={220}
              step={10}
              onChange={(v) => handleChange('chunkOverlap', v)}
              unit="chars"
            />
            <ConfigSlider
              label="Sentence Window"
              value={config.windowSize}
              min={1}
              max={4}
              step={1}
              onChange={(v) => handleChange('windowSize', v)}
              unit="sentences"
            />
          </div>
        </div>

        {/* Retrieval & Policy Settings */}
        <div className="glass p-5 rounded-xl border border-white/60">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">Retrieval & Policy</h3>
          
          <div className="space-y-5">
            <ConfigSlider
              label="Top K Retrieval"
              value={config.topK}
              min={4}
              max={12}
              step={1}
              onChange={(v) => handleChange('topK', v)}
              unit="nodes"
            />

            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-text-main">Rerank Enabled</label>
              <button 
                onClick={() => handleChange('rerankEnabled', !config.rerankEnabled)}
                className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${config.rerankEnabled ? 'bg-accent-neon' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ${config.rerankEnabled ? 'translate-x-5' : ''}`} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-main">Parse Lane Policy</label>
              <select 
                value={config.parseLanePolicy}
                onChange={(e) => handleChange('parseLanePolicy', e.target.value)}
                className="w-full bg-white/50 border border-black/5 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-accent-neon"
              >
                <option value="local_default">Local Default (pypdf)</option>
                <option value="cloud_default">Cloud Default (LlamaParse)</option>
                <option value="auto">Auto (Lane Fallback)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="btn btn-solid px-8">Save Configuration</button>
      </div>
    </div>
  );
};

interface ConfigSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}

const ConfigSlider: React.FC<ConfigSliderProps> = ({ label, value, min, max, step, unit, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-text-main">{label}</label>
        <span className="text-[0.7rem] font-mono text-accent-neon bg-accent-neon/10 px-1.5 py-0.5 rounded">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-neon"
      />
    </div>
  );
};
