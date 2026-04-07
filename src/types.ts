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

export type ViewType = 'knowledge' | 'ingestion' | 'pipelines' | 'connections' | 'vectors' | 'testing' | 'settings' | 'agents';

export interface AgentTool {
  id: string;
  name: string;
  description: string;
  type: 'webhook' | 'client' | 'integration';
  enabled: boolean;
  method?: 'GET' | 'POST';
  url?: string;
}

export interface AgentConfig {
  id: string;
  name: string;
  status: 'live' | 'draft';
  systemPrompt: string;
  firstMessage: string;
  voiceId: string;
  expressiveMode: boolean;
  languages: string[];
  primaryModelId: string;
  backupModelIds: string[];
  temperature: number;
  maxTokens: number;
  tools: AgentTool[];
  rag: {
    enabled: boolean;
    embeddingModel: string;
    characterLimit: number;
    chunkLimit: number;
    vectorDistanceLimit: number;
    candidates: number;
    queryRewrite: boolean;
  };
  advanced: {
    eagerness: 'low' | 'normal' | 'high';
    spellingPatience: 'auto' | 'patient' | 'very_patient';
    speculativeTurn: boolean;
    turnTimeout: number;
    endConversationTimeout: number;
    maxDuration: number;
    maxDurationMessage: string;
    softTimeout: number;
    cascadeTimeout: number;
    clientEvents: string[];
    privacy: {
      zeroRetention: boolean;
      storeAudio: boolean;
      retentionPeriod: number;
    };
    multimodal: {
      chatMode: boolean;
      fileAttachments: boolean;
      maxFiles: number;
      dtmfInput: boolean;
    };
    asr: {
      model: string;
      filterBackground: boolean;
      audioFormat: string;
    };
  };
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
  agentSettingsOpen: boolean;
  editingAgentId: string | null;
  stagedFiles: StagedFile[];
  ingestionHistory: IngestionHistoryItem[];
  syncTasks: SyncTask[];
  config: PipelineConfig;
  testResult: TestResult | null;
  isTesting: boolean;
  knowledgeStatus: KnowledgeStatus;
  agents: AgentConfig[];
}
