import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { GhostCard } from './components/GhostCard';
import { UploadArea } from './components/UploadArea';
import { IngestionHistory } from './components/IngestionHistory';
import { SyncPopup } from './components/SyncPopup';
import { ChatPanel } from './components/ChatPanel';
import { BackgroundOrbs } from './components/BackgroundOrbs';
import { AppState, StagedFile, IngestionHistoryItem, SyncTask } from './types';

const INITIAL_STAGED_FILES: StagedFile[] = [
  { id: '1', name: 'profit_and_loss_-Br...20-03-20.xlsx', size: '10.0 MB', lane: 'local' },
  { id: '2', name: 'national_business_...strategy.pdf', size: '1.2 MB', lane: 'local' },
];

const INITIAL_HISTORY: IngestionHistoryItem[] = [
  { id: 'h1', name: 'profit_and_loss_-Brisbane_2026-03-20.xlsx', lane: 'local', status: 'ready', timestamp: '2026-03-20' },
  { id: 'h2', name: 'national_business_strategy.pdf', lane: 'local', status: 'ready', timestamp: '2026-03-19' },
];

const INITIAL_SYNC_TASKS: SyncTask[] = [
  { id: 't1', label: 'Queued', status: 'queued' },
  { id: 't2', label: 'Parse & Structure', status: 'queued' },
  { id: 't3', label: 'Index Retrieval', status: 'queued' },
  { id: 't4', label: 'Finalize', status: 'queued' },
];

export default function App() {
  const [state, setState] = useState<AppState>({
    sidebarOpen: true,
    chatOpen: false,
    syncPopupOpen: false,
    stagedFiles: INITIAL_STAGED_FILES,
    ingestionHistory: INITIAL_HISTORY,
    syncTasks: INITIAL_SYNC_TASKS,
  });

  const toggleSidebar = () => setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  const toggleChat = () => setState(prev => ({ ...prev, chatOpen: !prev.chatOpen }));
  
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

  return (
    <div className="flex h-screen w-full relative overflow-hidden bg-bg-main text-text-main font-sans">
      <BackgroundOrbs />
      
      <Sidebar isOpen={state.sidebarOpen} onToggle={toggleSidebar} />

      <main className="flex-1 flex flex-col relative z-1 min-w-0 transition-all duration-300">
        <Header onToggleSidebar={toggleSidebar} onSync={handleSync} />

        <div className="p-4.5 flex-1 overflow-y-auto relative">
          {/* Ghostmoph Cards */}
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

        <SyncPopup 
          isOpen={state.syncPopupOpen} 
          onClose={closeSyncPopup} 
          tasks={state.syncTasks} 
        />

        <ChatPanel isOpen={state.chatOpen} onToggle={toggleChat} />
      </main>
    </div>
  );
}
