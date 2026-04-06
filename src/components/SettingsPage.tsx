import React, { useState } from 'react';
import { Settings, Database, Zap, Trash2, RefreshCw, Shield, Server, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export const SettingsPage: React.FC = () => {
  const [redisConfig, setRedisConfig] = useState({
    host: 'localhost',
    port: '6379',
    password: '••••••••••••',
    enabled: true,
  });

  const [cacheConfig, setCacheConfig] = useState({
    strategy: 'semantic',
    ttl: 3600,
    similarityThreshold: 0.85,
    maxMemory: '512MB',
  });

  return (
    <div className="max-w-[1000px] animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Settings className="text-accent-neon" size={20} />
        <h2 className="text-xl font-bold tracking-tight text-text-main">System Administration</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Redis Configuration */}
        <div className="glass p-6 rounded-2xl border border-white/60 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="text-accent-neon" size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-main">Redis Infrastructure</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-[0.65rem] font-bold text-success uppercase tracking-widest">Connected</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-widest">Host Address</label>
              <input 
                type="text" 
                value={redisConfig.host}
                onChange={(e) => setRedisConfig({...redisConfig, host: e.target.value})}
                className="w-full bg-black/5 border border-black/5 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-accent-neon/50 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-widest">Port</label>
                <input 
                  type="text" 
                  value={redisConfig.port}
                  onChange={(e) => setRedisConfig({...redisConfig, port: e.target.value})}
                  className="w-full bg-black/5 border border-black/5 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-accent-neon/50 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-widest">Password</label>
                <input 
                  type="password" 
                  value={redisConfig.password}
                  onChange={(e) => setRedisConfig({...redisConfig, password: e.target.value})}
                  className="w-full bg-black/5 border border-black/5 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-accent-neon/50 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-black/5 flex justify-between items-center">
            <div className="text-[0.65rem] font-bold text-text-muted">Version: 7.2.4 (Alpine)</div>
            <button className="btn btn-sharp text-[0.65rem] py-1.5 px-3 flex items-center gap-1.5">
              <RefreshCw size={12} /> Test Connection
            </button>
          </div>
        </div>

        {/* LLM Caching Strategy */}
        <div className="glass p-6 rounded-2xl border border-white/60 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="text-accent-neon" size={18} />
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-main">LLM Caching Engine</h3>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-widest">Cache Strategy</label>
              <div className="flex gap-2 p-1 bg-black/5 rounded-xl border border-black/5">
                <button 
                  onClick={() => setCacheConfig({...cacheConfig, strategy: 'exact'})}
                  className={`flex-1 py-1.5 rounded-lg text-[0.65rem] font-bold transition-all ${cacheConfig.strategy === 'exact' ? 'bg-white shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}
                >
                  Exact Match
                </button>
                <button 
                  onClick={() => setCacheConfig({...cacheConfig, strategy: 'semantic'})}
                  className={`flex-1 py-1.5 rounded-lg text-[0.65rem] font-bold transition-all ${cacheConfig.strategy === 'semantic' ? 'bg-white shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}
                >
                  Semantic (Vector)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-widest">TTL (Seconds)</label>
                <input 
                  type="number" 
                  value={cacheConfig.ttl}
                  onChange={(e) => setCacheConfig({...cacheConfig, ttl: parseInt(e.target.value)})}
                  className="w-full bg-black/5 border border-black/5 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-accent-neon/50 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-widest">Max Memory</label>
                <select 
                  value={cacheConfig.maxMemory}
                  onChange={(e) => setCacheConfig({...cacheConfig, maxMemory: e.target.value})}
                  className="w-full bg-black/5 border border-black/5 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-accent-neon/50 transition-colors appearance-none"
                >
                  <option value="256MB">256MB</option>
                  <option value="512MB">512MB</option>
                  <option value="1GB">1GB</option>
                  <option value="2GB">2GB</option>
                </select>
              </div>
            </div>

            {cacheConfig.strategy === 'semantic' && (
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-[0.6rem] font-bold text-text-muted uppercase tracking-widest">Similarity Threshold</label>
                  <span className="text-[0.65rem] font-mono font-bold text-accent-neon">{cacheConfig.similarityThreshold}</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="1.0" 
                  step="0.01"
                  value={cacheConfig.similarityThreshold}
                  onChange={(e) => setCacheConfig({...cacheConfig, similarityThreshold: parseFloat(e.target.value)})}
                  className="w-full h-1.5 bg-black/5 rounded-lg appearance-none cursor-pointer accent-accent-neon"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cache Stats & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border border-white/60 flex flex-col items-center justify-center text-center">
          <div className="text-[0.6rem] font-bold text-text-muted uppercase tracking-widest mb-1">Cache Hit Rate</div>
          <div className="text-3xl font-black text-text-main">84.2%</div>
          <div className="mt-2 h-1 w-24 bg-black/5 rounded-full overflow-hidden">
            <div className="h-full bg-success w-[84.2%]" />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-white/60 flex flex-col items-center justify-center text-center">
          <div className="text-[0.6rem] font-bold text-text-muted uppercase tracking-widest mb-1">Memory Usage</div>
          <div className="text-3xl font-black text-text-main">142MB</div>
          <div className="text-[0.65rem] font-bold text-text-muted mt-1">OF 512MB ALLOCATED</div>
        </div>

        <div className="glass p-6 rounded-2xl border border-white/60 flex flex-col items-center justify-center text-center">
          <div className="text-[0.6rem] font-bold text-text-muted uppercase tracking-widest mb-2">Maintenance</div>
          <button className="w-full py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[0.65rem] font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all group">
            <Trash2 size={14} className="group-hover:scale-110 transition-transform" /> Purge Cache
          </button>
          <p className="text-[0.55rem] text-text-muted mt-2 font-medium">WARNING: This will invalidate all cached LLM responses.</p>
        </div>
      </div>

      {/* Security & Guardrails */}
      <div className="glass p-6 rounded-2xl border border-white/60">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="text-accent-neon" size={18} />
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-main">Cache Security & Privacy</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-black/[0.02] border border-black/5 rounded-xl">
              <div className="space-y-0.5">
                <div className="text-[0.65rem] font-bold text-text-main">Encrypt Cache Data</div>
                <div className="text-[0.55rem] text-text-muted font-medium">AES-256 encryption for cached responses at rest.</div>
              </div>
              <div className="w-8 h-4 bg-accent-neon rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/[0.02] border border-black/5 rounded-xl">
              <div className="space-y-0.5">
                <div className="text-[0.65rem] font-bold text-text-main">PII Scrubbing</div>
                <div className="text-[0.55rem] text-text-muted font-medium">Automatically redact PII before caching.</div>
              </div>
              <div className="w-8 h-4 bg-black/10 rounded-full relative cursor-pointer">
                <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-black/[0.02] border border-black/5 rounded-xl">
              <div className="space-y-0.5">
                <div className="text-[0.65rem] font-bold text-text-main">Tenant Isolation</div>
                <div className="text-[0.55rem] text-text-muted font-medium">Separate cache keys per workspace/tenant.</div>
              </div>
              <div className="w-8 h-4 bg-accent-neon rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/[0.02] border border-black/5 rounded-xl">
              <div className="space-y-0.5">
                <div className="text-[0.65rem] font-bold text-text-main">Audit Logging</div>
                <div className="text-[0.55rem] text-text-muted font-medium">Log all cache hits and misses for auditing.</div>
              </div>
              <div className="w-8 h-4 bg-accent-neon rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
