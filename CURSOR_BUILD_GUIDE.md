# GhostDASH Cursor Build Guide: Native PDF RAG Implementation

This document serves as the master technical specification for Cursor to implement the backend and integration layers of the GhostDASH Native PDF RAG system.

## 1. Core Architecture
- **Orchestration**: `ghoststack-rag-control-api-1` (FastAPI/Python)
- **Workflow Engine**: `ghoststack-rag-workflow-runtime-1` (Temporal or Celery-based)
- **Vector Database**: `ghoststack-rag-qdrant-1` (Collection: `ghostdash_knowledge`)
- **Metadata/Provenance**: `ghoststack-postgres-1`
- **RAG Framework**: LlamaIndex (Python)

## 2. Data Ingestion Pipeline (LlamaIndex)
Implement the following logic in the `workflow-runtime`:

### A. Parser Lane Policy
- **Local Lane**: Use `PyMuPDFReader` for fast, deterministic extraction of digital PDFs.
- **Cloud Lane**: Use `LlamaParse` for complex layouts, tables, and scanned PDFs.
- **Auto-Switch**: Logic to detect scanned pages (OCR requirement) and promote to Cloud Lane.

### B. Node Parsing (SentenceWindowNodeParser)
Configure the `SentenceWindowNodeParser` with the following defaults (tunable via UI):
- `window_size`: 3 (sentences)
- `chunk_size`: 1024
- `chunk_overlap`: 128
- `include_metadata`: True (filename, page_label, file_type, timestamp)

### C. Metadata Enrichment
Inject the following into every node:
- `file_id`: UUID
- `source_type`: 'pdf' | 'xlsx' | 'txt'
- `ingestion_lane`: 'local' | 'cloud'
- `summary_hint`: LLM-generated 1-sentence summary of the document context.

## 3. API Specifications (Required for Frontend)

### `GET /api/status`
Returns the `KnowledgeStatus` object:
```json
{
  "totalFiles": 42,
  "breakdown": { "xlsx": 2, "txt": 20, "pdf": 20 },
  "totalIndexSize": 34234,
  "storage": { "db": "Postgres (7.2MB)", "vectorDb": "Qdrant (3.4M vectors)", "graphRag": "In-Memory" }
}
```

### `POST /api/ingest`
Triggers the ingestion workflow for staged files.
- **Payload**: `file_ids: string[]`, `config: PipelineConfig`

### `GET /api/history`
Returns `IngestionHistoryItem[]` with chunk counts and status.

### `POST /api/query`
The main RAG entry point.
- **Payload**: `query: string`, `top_k: number`, `rerank: boolean`
- **Logic**: 
  1. Vector Search (Qdrant)
  2. Metadata Filtering (if applicable)
  3. Reranking (using `CohereRerank` or similar)
  4. Context Synthesis with Provenance citations.

## 4. Knowledge Lab (QA Logic)
Implement the `POST /api/audit` endpoint:
- **Process**:
  1. Sample 5% of nodes from the selected corpus.
  2. Use Gemini/OpenAI to evaluate samples against `KNOWLEDGE_LAB_PROMPT.md`.
  3. Calculate weighted metrics (Completeness, Granularity, Provenance, Consistency).
  4. Generate the "10/10 Solution" roadmap.

## 5. LLM Caching & Infrastructure (Redis)
Implement a caching layer to reduce LLM costs and latency:
- **Provider**: Redis (running as `ghoststack-redis-1`)
- **Strategies**:
  - **Exact Match**: Hash the prompt + parameters for 1:1 retrieval.
  - **Semantic Cache**: Use Vector search (Qdrant) to find "similar enough" prompts (Threshold: 0.85).
- **Security**: 
  - AES-256 encryption for cached responses.
  - PII scrubbing before storage.

## 6. Environment Variables (.env)
```env
# API Keys
GEMINI_API_KEY=
OPENAI_API_KEY=
LLAMA_CLOUD_API_KEY=

# Infrastructure
QDRANT_URL=http://ghoststack-rag-qdrant-1:6333
POSTGRES_URL=postgresql://user:pass@ghoststack-postgres-1:5432/ghostdash
REDIS_HOST=ghoststack-redis-1
REDIS_PORT=6379
REDIS_PASSWORD=

# Defaults
DEFAULT_POLICY_LANE=local_default
CHUNK_SIZE=1024
```

## 7. Implementation Steps for Cursor
1. **Step 1**: Initialize LlamaIndex with Qdrant Vector Store.
2. **Step 2**: Implement the `SentenceWindowNodeParser` logic in the ingestion service.
3. **Step 3**: Create the FastAPI endpoints matching the specs above.
4. **Step 4**: Implement the Redis-based LLM caching layer with Semantic Search fallback.
5. **Step 5**: Connect the React frontend (in `App.tsx`) to these real endpoints using `fetch` or `axios`.
6. **Step 6**: Implement the "Devil's Advocate" audit logic for the Knowledge Lab.
