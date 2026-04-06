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
  chunks?: number;
}

export interface SyncTask {
  id: string;
  label: string;
  status: 'queued' | 'in-progress' | 'done';
}

export interface PipelineConfig {
  chunkSize: number;
  chunkOverlap: number;
  windowSize: number;
  topK: number;
  rerankEnabled: boolean;
  parseLanePolicy: 'local_default' | 'cloud_default' | 'auto';
}

export type ViewType = 'knowledge' | 'ingestion' | 'pipelines' | 'connections' | 'vectors' | 'testing' | 'settings' | 'agent';

export interface AgentTool {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface AgentConfig {
  id: string;
  name: string;
  systemPrompt: string;
  firstMessage: string;
  voiceId: string;
  language: string;
  modelId: string;
  temperature: number;
  maxTokens: number;
  tools: AgentTool[];
}

export interface TestResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  expectation: string;
  shortfalls: string[];
  solutions: string[];
  weightedMetrics: {
    completeness: number;
    granularity: number;
    provenance: number;
    consistency: number;
  };
}

export interface KnowledgeStatus {
  totalFiles: number;
  breakdown: {
    xlsx: number;
    txt: number;
    pdf: number;
  };
  totalIndexSize: number;
  storage: {
    db: string;
    vectorDb: string;
    graphRag: string;
  };
}

export interface AppState {
  currentView: ViewType;
  sidebarOpen: boolean;
  chatOpen: boolean;
  syncPopupOpen: boolean;
  knowledgeStatusOpen: boolean;
  stagedFiles: StagedFile[];
  ingestionHistory: IngestionHistoryItem[];
  syncTasks: SyncTask[];
  config: PipelineConfig;
  testResult: TestResult | null;
  isTesting: boolean;
  knowledgeStatus: KnowledgeStatus;
  agentConfig: AgentConfig;
}
