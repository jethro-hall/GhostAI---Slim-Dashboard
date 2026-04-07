# GhostDASH Build Document & Implementation Guide

This document summarizes the recent architectural and UI changes made to the GhostDASH platform, specifically focusing on the **Multi-Agent System** and **Data Ingestion** refinements.

---

## 🚀 1. Multi-Agent System (The "Agents for Agents" Overhaul)

The platform has transitioned from a single-agent configuration to a robust, multi-agent management hub.

### 🧩 Data Model Changes (`src/types.ts`)
*   **`AgentConfig`**: Expanded to include comprehensive settings:
    *   `status`: 'live' | 'draft'
    *   `expressiveMode`: Boolean toggle for personality depth.
    *   `languages`: Array for multi-language support.
    *   `primaryModelId` & `backupModelIds`: Support for **LLM Cascading** (automatic fallback).
    *   `rag`: Nested object for granular Knowledge Base control (embedding models, chunk limits, vector distance).
    *   `advanced`: Comprehensive behavioral settings (eagerness, timeouts, speculative turns).
    *   `privacy`: Zero-retention and audio storage settings.
*   **`AgentTool`**: Enhanced with `type` (webhook, client, integration), `method`, and `url` for external API connectivity.
*   **`AppState`**: Now manages an `agents: AgentConfig[]` array and `editingAgentId` for the slide-out panel.

### 🖥️ New Components
*   **`AgentsPage.tsx`**: A high-level dashboard listing all agents.
    *   Shows status (Live/Draft), primary model, and active capabilities.
    *   Provides quick actions for Edit, Delete, and Create.
*   **`AgentSettingsPanel.tsx`**: A sophisticated slide-out configuration panel.
    *   **Tabbed Interface**: Agent, Advanced, Tools, and Knowledge Base.
    *   **Multi-Selects**: Custom tag-based selectors for Backup Models and Client Events.
    *   **Dynamic Tools**: CRUD interface for adding and configuring agent capabilities.

### 🛠️ Code Integration (`src/App.tsx`)
*   **State Handlers**: Added `addAgent`, `updateAgent`, and `deleteAgent` functions.
*   **View Logic**: Updated `renderView` to handle the `'agents'` view type.
*   **Panel Orchestration**: Integrated the `AgentSettingsPanel` as a global overlay controlled by `agentSettingsOpen`.

---

## 🔄 2. Data Ingestion Refinement (Sync Popup)

The "Full Sync" experience has been redesigned to match high-fidelity requirements for large-scale data processing.

### 🎨 UI Enhancements (`src/components/SyncPopup.tsx`)
*   **Two-Column Layout**: Steps on the left, document-level status on the right.
*   **Progress Tracking**: Neon orange progress bar with percentage and pass/fail counters.
*   **Status Indicators**: 
    *   `COMPLETED` (Green Check)
    *   `RUNNING` (Pulsing Yellow)
    *   `PENDING` (Faded Grey)
*   **Document List**: Detailed cards showing parse/index status and ingestion lane (Local/Cloud).

---

## 🔌 3. LLM Connections Refinement

*   **Edit Functionality**: Added a pencil icon to each connection card.
*   **Density**: Reduced padding for a more "technical/pro" dashboard feel.
*   **Infrastructure Status**: Simplified to a single glowing "Online" indicator in the header.

---

## 📝 4. What Code Needs to be Changed for "Agents for Agents"?

To fully implement the multi-agent logic, the following areas were modified:

1.  **State Transition**: In `App.tsx`, the `agentConfig` (singular) was replaced with `agents` (array). All references to the single config were updated to find the specific agent by ID.
2.  **Navigation**: The `Sidebar.tsx` was updated to point to the `agents` view instead of a single config page.
3.  **Configuration Depth**: The `AgentSettingsPanel` now handles deeply nested objects (e.g., `agent.rag.embeddingModel`). The `handleChange` function in the panel uses a path-based update logic (e.g., `handleChange('rag.enabled', true)`).
4.  **Tool Logic**: Tools are no longer just strings; they are objects with IDs and types, requiring the UI to map over them and provide specific inputs for Webhook URLs and methods.

---

## 🔮 Next Steps for Backend Integration
1.  **API Endpoints**: Create `/api/agents` (GET, POST) and `/api/agents/{id}` (PUT, DELETE).
2.  **Persistence**: Connect the `updateAgent` state handler to a `fetch` call to persist changes to the database.
3.  **Real-time Sync**: Use WebSockets to update the `SyncPopup` progress based on actual backend ingestion events.
