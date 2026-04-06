export interface StagedFile {
  id: string;
  name: string;
  size: string;
  lane: 'local' | 'cloud';
}

export interface IngestionHistoryItem {
  id: string;
  name: string;
  lane: 'local' | 'cloud';
  status: 'ready' | 'blocked' | 'syncing';
  timestamp: string;
}

export interface SyncTask {
  id: string;
  label: string;
  status: 'queued' | 'in-progress' | 'done';
}

export interface AppState {
  sidebarOpen: boolean;
  chatOpen: boolean;
  syncPopupOpen: boolean;
  stagedFiles: StagedFile[];
  ingestionHistory: IngestionHistoryItem[];
  syncTasks: SyncTask[];
}
