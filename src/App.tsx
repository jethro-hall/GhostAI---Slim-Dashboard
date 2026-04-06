import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { GhostCard } from './components/GhostCard';
import { UploadArea } from './components/UploadArea';
import { IngestionHistory } from './components/IngestionHistory';
import { SyncPopup } from './components/SyncPopup';
import { ChatPanel } from './components/ChatPanel';
import { BackgroundOrbs } from './components/BackgroundOrbs';
import { PipelineConfigPage } from './components/PipelineConfigPage';
import { ConnectionsPage } from './components/ConnectionsPage';
import { KnowledgeLabPage } from './components/KnowledgeLabPage';
import { KnowledgeStatusPanel } from './components/KnowledgeStatusPanel';
import { SettingsPage } from './components/SettingsPage';
import { AgentConfigPage } from './components/AgentConfigPage';
import { Database } from 'lucide-react';
import { AppState, StagedFile, IngestionHistoryItem, SyncTask, ViewType, PipelineConfig, TestResult, KnowledgeStatus, AgentConfig } from './types';

const INITIAL_STAGED_FILES: StagedFile[] = [
  { id: '1', name: 'profit_and_loss_-Br...20-03-20.xlsx', size: '10.0 MB', lane: 'local' },
  { id: '2', name: 'national_business_...strategy.pdf', size: '1.2 MB', lane: 'local' },
];

const INITIAL_HISTORY: IngestionHistoryItem[] = [
  { id: 'h1', name: 'profit_and_loss_-Brisbane_2026-03-20.xlsx', lane: 'local', status: 'ready', timestamp: '2026-03-20', chunks: 142 },
  { id: 'h2', name: 'national_business_strategy.pdf', lane: 'local', status: 'ready', timestamp: '2026-03-19', chunks: 89 },
];

const INITIAL_SYNC_TASKS: SyncTask[] = [
  { id: 't1', label: 'Queued', status: 'queued' },
  { id: 't2', label: 'Parse & Structure', status: 'queued' },
  { id: 't3', label: 'Index Retrieval', status: 'queued' },
  { id: 't4', label: 'Finalize', status: 'queued' },
];

const INITIAL_CONFIG: PipelineConfig = {
  chunkSize: 900,
  chunkOverlap: 120,
  windowSize: 2,
  topK: 6,
  rerankEnabled: false,
  parseLanePolicy: 'local_default',
};

const INITIAL_KNOWLEDGE_STATUS: KnowledgeStatus = {
  totalFiles: 42,
  breakdown: {
    xlsx: 2,
    txt: 20,
    pdf: 20,
  },
  totalIndexSize: 34234,
  storage: {
    db: 'Postgres (7.2MB)',
    vectorDb: 'Qdrant (3.4M vectors)',
    graphRag: 'In-Memory (3.4M triples)',
  },
};

const INITIAL_AGENT_CONFIG: AgentConfig = {
  id: 'agent-1',
  name: 'GhostDASH Assistant',
  systemPrompt: 'You are a professional business analyst assistant. Your goal is to provide accurate, data-driven insights based on the uploaded documents.',
  firstMessage: 'Hello! I am your GhostDASH assistant. How can I help you analyze your data today?',
  voiceId: 'v1',
  language: 'en-US',
  modelId: 'gpt-4-turbo',
  temperature: 0.7,
  maxTokens: 2000,
  tools: [
    { id: 't1', name: 'Web Search', description: 'Search the web for real-time information.', enabled: true },
    { id: 't2', name: 'Code Interpreter', description: 'Run Python code for data analysis.', enabled: false },
    { id: 't3', name: 'Knowledge Base', description: 'Query the indexed documents.', enabled: true },
  ],
};

const MOCK_TEST_RESULT: TestResult = {
  score: 7.2,
  grade: 'B',
  expectation: "High-level summaries only. Deep technical extraction will likely fail due to missing Q3 2025 projections and inconsistent section titling in the strategy docs.",
  shortfalls: [
    "Financials are missing Q3 2025 projections, leading to hallucination risk for future-dated queries.",
    "Strategy documents lack standardized section headers, causing SentenceWindowNodeParser to lose context in 15% of chunks.",
    "Provenance is missing for 20% of the 2026-03-20 XLSX data due to local lane extraction limits."
  ],
  solutions: [
    "Upload the missing Q3 2025 financial projections to saturate the domain knowledge.",
    "Switch to Cloud Lane (LlamaParse) for the strategy PDFs to preserve document structure and metadata richness.",
    "Increase Sentence Window size to 3 for the strategy corpus to improve retrieval coherence."
  ],
  weightedMetrics: {
    completeness: 65,
    granularity: 80,
    provenance: 70,
    consistency: 75,
  }
};

export default function App() {
  const [state, setState] = useState<AppState>({
    currentView: 'knowledge',
    sidebarOpen: true,
    chatOpen: false,
    syncPopupOpen: false,
    knowledgeStatusOpen: false,
    stagedFiles: INITIAL_STAGED_FILES,
    ingestionHistory: INITIAL_HISTORY,
    syncTasks: INITIAL_SYNC_TASKS,
    config: INITIAL_CONFIG,
    testResult: null,
    isTesting: false,
    knowledgeStatus: INITIAL_KNOWLEDGE_STATUS,
    agentConfig: INITIAL_AGENT_CONFIG,
  });

  const toggleSidebar = () => setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  const toggleChat = () => setState(prev => ({ ...prev, chatOpen: !prev.chatOpen }));
  const toggleKnowledgeStatus = (open: boolean) => setState(prev => ({ ...prev, knowledgeStatusOpen: open }));
  const setView = (view: ViewType) => setState(prev => ({ ...prev, currentView: view }));
  const setConfig = (config: PipelineConfig) => setState(prev => ({ ...prev, config }));
  const setAgentConfig = (agentConfig: AgentConfig) => setState(prev => ({ ...prev, agentConfig }));
  
  const handleSync = () => {
    setState(prev => ({ 
      ...prev, 
      syncPopupOpen: true,
      syncTasks: INITIAL_SYNC_TASKS
    }));
  };

  const closeSyncPopup = () => setState(prev => ({ ...prev, syncPopupOpen: false }));

  const removeStagedFile = (id: string) => {
    setState(prev => ({
      ...prev,
      stagedFiles: prev.stagedFiles.filter(f => f.id !== id)
    }));
  };

  const runTest = () => {
    setState(prev => ({ ...prev, isTesting: true, testResult: null }));
    setTimeout(() => {
      setState(prev => ({ ...prev, isTesting: false, testResult: MOCK_TEST_RESULT }));
    }, 3500);
  };

  // Dummy sync effect
  useEffect(() => {
    if (state.syncPopupOpen) {
      const timers: NodeJS.Timeout[] = [];
      
      const updateTask = (index: number, status: 'done' | 'in-progress') => {
        setState(prev => {
          const newTasks = [...prev.syncTasks];
          newTasks[index] = { ...newTasks[index], status };
          return { ...prev, syncTasks: newTasks };
        });
      };

      timers.push(setTimeout(() => updateTask(0, 'done'), 1000));
      timers.push(setTimeout(() => updateTask(1, 'done'), 2200));
      timers.push(setTimeout(() => updateTask(2, 'done'), 3400));
      timers.push(setTimeout(() => updateTask(3, 'done'), 4600));
      timers.push(setTimeout(() => closeSyncPopup(), 5500));

      return () => timers.forEach(clearTimeout);
    }
  }, [state.syncPopupOpen]);

  const renderView = () => {
    switch (state.currentView) {
      case 'knowledge':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex gap-2 mb-4.5 max-w-[900px]">
              <GhostCard
                label="LOCAL LANE"
                title="Ready"
                description="Deterministic local parsers are ready, including table-first XLSX ingestion."
              />
              <GhostCard
                label="CLOUD LANE"
                title="Blocked"
                description="LLAMA_CLOUD_API_KEY is not set; cloud parse enrichment is blocked."
                borderColor="rgba(245, 158, 11, 0.5)"
                labelColor="var(--color-warning)"
                titleColor="var(--color-warning)"
              />
              <GhostCard
                label="CHAT MODES"
                title="Responses + Chat Completions"
                description="Both OpenAI-compatible chat APIs are available for testing."
              />
            </div>
            <UploadArea stagedFiles={state.stagedFiles} onRemove={removeStagedFile} />
            <IngestionHistory history={state.ingestionHistory} />
          </div>
        );
      case 'ingestion':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <UploadArea stagedFiles={state.stagedFiles} onRemove={removeStagedFile} />
            <IngestionHistory history={state.ingestionHistory} />
          </div>
        );
      case 'pipelines':
        return <PipelineConfigPage config={state.config} onChange={setConfig} />;
      case 'connections':
        return <ConnectionsPage />;
      case 'testing':
        return <KnowledgeLabPage isTesting={state.isTesting} testResult={state.testResult} onRunTest={runTest} />;
      case 'settings':
        return <SettingsPage />;
      case 'agent':
        return <AgentConfigPage config={state.agentConfig} onChange={setAgentConfig} />;
      case 'vectors':
        return (
          <div className="glass p-8 rounded-xl border border-white/60 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="w-16 h-16 bg-accent-neon/10 rounded-full flex items-center justify-center mb-4">
              <Database className="text-accent-neon" size={32} />
            </div>
            <h3 className="text-lg font-bold text-text-main">Vector Storage (Qdrant)</h3>
            <p className="text-sm text-text-muted max-w-md mt-2">
              Monitoring collection <strong>ghostdash_knowledge</strong>. 
              Currently indexing 231 chunks across 2 documents.
            </p>
            <button className="btn btn-sharp mt-6">Open Qdrant Dashboard</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full relative overflow-hidden bg-bg-main text-text-main font-sans">
      <BackgroundOrbs />
      
      <Sidebar 
        isOpen={state.sidebarOpen} 
        onToggle={toggleSidebar} 
        currentView={state.currentView}
        onViewChange={setView}
        knowledgeStatus={state.knowledgeStatus}
        onOpenStatus={() => toggleKnowledgeStatus(true)}
      />

      <main className="flex-1 flex flex-col relative z-1 min-w-0 transition-all duration-300">
        <Header onToggleSidebar={toggleSidebar} onSync={handleSync} />

        <div className="p-4.5 flex-1 overflow-y-auto relative">
          {renderView()}
        </div>

        <SyncPopup 
          isOpen={state.syncPopupOpen} 
          onClose={closeSyncPopup} 
          tasks={state.syncTasks} 
        />

        <KnowledgeStatusPanel 
          isOpen={state.knowledgeStatusOpen} 
          onClose={() => toggleKnowledgeStatus(false)} 
          status={state.knowledgeStatus}
        />

        <ChatPanel isOpen={state.chatOpen} onToggle={toggleChat} />
      </main>
    </div>
  );
}
