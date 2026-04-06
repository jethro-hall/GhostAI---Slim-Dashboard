import React from 'react';
import { FlaskConical, Info, AlertTriangle, CheckCircle2, ArrowRight, Activity, ShieldCheck, Search } from 'lucide-react';
import { TestResult } from '../types';
import { motion } from 'motion/react';

interface KnowledgeLabPageProps {
  isTesting: boolean;
  testResult: TestResult | null;
  onRunTest: () => void;
}

export const KnowledgeLabPage: React.FC<KnowledgeLabPageProps> = ({ isTesting, testResult, onRunTest }) => {
  return (
    <div className="max-w-[1000px] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FlaskConical className="text-accent-neon" size={20} />
          <h2 className="text-xl font-bold tracking-tight">Knowledge Lab</h2>
        </div>
        <button 
          onClick={onRunTest}
          disabled={isTesting}
          className={`btn btn-solid px-6 ${isTesting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isTesting ? 'Auditing Corpus...' : 'Run Quality Audit'}
        </button>
      </div>

      {!testResult && !isTesting && (
        <div className="glass p-12 rounded-2xl border border-white/60 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-accent-neon/10 rounded-full flex items-center justify-center mb-4">
            <Search className="text-accent-neon" size={32} />
          </div>
          <h3 className="text-lg font-bold text-text-main">No Audit Data</h3>
          <p className="text-sm text-text-muted max-w-md mt-2">
            Select a corpus and run a quality audit to evaluate the integrity, completeness, and retrieval potential of your knowledge base.
          </p>
        </div>
      )}

      {isTesting && (
        <div className="space-y-6">
          <div className="glass p-8 rounded-2xl border border-white/60 flex flex-col items-center justify-center text-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mb-4"
            >
              <Activity className="text-accent-neon" size={48} />
            </motion.div>
            <h3 className="text-lg font-bold text-text-main">Performing Multi-Dimensional Audit</h3>
            <p className="text-sm text-text-muted max-w-md mt-2">
              Evaluating completeness, granularity, provenance, and consistency against industry-standard RAG benchmarks...
            </p>
          </div>
        </div>
      )}

      {testResult && !isTesting && (
        <div className="space-y-6">
          {/* Top Score Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl border border-white/60 flex flex-col items-center justify-center text-center">
              <div className="text-[0.65rem] font-bold text-text-muted uppercase tracking-widest mb-1">Quality Score</div>
              <div className="text-5xl font-black text-text-main">{testResult.score}<span className="text-2xl text-text-muted">/10</span></div>
              <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold ${testResult.score >= 8 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                Grade: {testResult.grade}
              </div>
            </div>

            <div className="md:col-span-2 glass p-6 rounded-2xl border border-white/60">
              <div className="text-[0.65rem] font-bold text-text-muted uppercase tracking-widest mb-2">Expected Response Level</div>
              <p className="text-sm leading-relaxed text-text-main italic">
                "{testResult.expectation}"
              </p>
              <div className="mt-4 flex gap-4">
                {Object.entries(testResult.weightedMetrics).map(([key, value]) => (
                  <div key={key} className="flex-1">
                    <div className="text-[0.55rem] font-bold text-text-muted uppercase tracking-wider mb-1">{key}</div>
                    <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-neon" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shortfalls & Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-2xl border border-white/60">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-warning" size={18} />
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-main">Knowledge Shortfalls</h3>
              </div>
              <ul className="space-y-3">
                {testResult.shortfalls.map((s, i) => (
                  <li key={i} className="flex gap-3 text-xs text-text-muted leading-relaxed">
                    <span className="text-warning font-bold">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass p-6 rounded-2xl border border-accent-neon/20 bg-accent-neon/[0.02]">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="text-accent-neon" size={18} />
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-main">The 10/10 Solution</h3>
              </div>
              <div className="space-y-4">
                {testResult.solutions.map((s, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-accent-neon text-white flex items-center justify-center shrink-0 text-[0.6rem] font-bold">
                      {i + 1}
                    </div>
                    <p className="text-xs text-text-main leading-relaxed font-medium">
                      {s}
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 bg-text-main text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors">
                Execute Roadmap <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
