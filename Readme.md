#  CodeQuests RAG Knowledge Assistant

A modular, **atomic Full-Stack RAG (Retrieval-Augmented Generation) application** capable of ingesting PDF/TXT documents, generating embeddings via OpenAI, storing them in Pinecone, and answering user queries with context-aware responses.

Designed with **Domain-Driven Design (DDD)** principles, separating business logic into isolated services to ensure scalability and maintainability.

##  Architecture Design

This project avoids monolithic scripts in favor of a **Service-Oriented Architecture**:

### Backend (FastAPI + LangChain)
1.   Atomic Services: Logic is encapsulated in `app/services/` (Ingestion, VectorStore, LLM). Routes in `api/routes.py` are thin and only handle HTTP/JSON translation.
2.   Dependency Injection: Services are instantiated and injected, allowing for easy mocking and testing.
3.   Pydantic Validation: Strict type checking for all Inputs/Outputs.

### Frontend (Next.js 14 + React)
1.   Atomic Components: UI is broken down into small, reusable parts (`FileUploader`, `ChatInterface`).
2.   Client-Side State: Uses React Hooks for managing real-time chat history and upload status.
3.   Tailwind CSS: Responsive, utility-first styling for a clean, professional dashboard.


## Tech Stack


Backend: Python 3.11, FastAPI, Uvicorn 
AI Orchestration: LangChain (v0.3), OpenAI GPT-4 
Vector Database: Pinecone (Serverless)
Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS
Infrastructure: Docker, Docker Compose


##  Getting Started

### Prerequisites
*   **Docker Desktop** (Recommended)
*   OR: Python 3.11+ and Node.js 20+
*   **API Keys**: OpenAI API Key & Pinecone API Key

### ⚙️ Environment Setup
Create a `.env` file in the `backend/` directory:

```ini
OPENAI_API_KEY=sk-proj-....
PINECONE_API_KEY=pc-....
PINECONE_INDEX_NAME=code-quests-index
```

** Crucial Note:** Ensure your Pinecone Index is created with **Dimensions: 1536** and **Metric: Cosine**.

---

## 🐳 Running with Docker (Recommended)

The easiest way to run the full stack:

1.  **Build and Start:**
    ```bash
    docker-compose up --build
    ```
2.  **Access the App:**
    *   Frontend: [http://localhost:3000](http://localhost:3000)
    *   API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

3.  **Stop:**
    ```bash
    docker-compose down
    ```

---

##  Running Locally (Manual)

If you prefer running without Docker:

### 1. Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

---

##  Project Structure

```text
code-quests-rag/
├── backend/
│   ├── app/
│   │   ├── api/routes.py          # API Endpoints (Thin layer)
│   │   ├── core/config.py         # Environment Configuration
│   │   ├── services/              # 🧠 The Brain (Atomic Logic)
│   │   │   ├── ingestion.py       # PDF Loading & Chunking
│   │   │   ├── vector_store.py    # Pinecone Interaction
│   │   │   └── llm.py             # RAG Chain & Prompting
│   │   └── main.py                # Entry Point
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── app/
│   │   ├── components/            #  Reusable UI Components
│   │   │   ├── chat-interface.tsx
│   │   │   └── file-uploader.tsx
│   │   └── page.tsx               # Main Dashboard Layout
│   ├── lib/api.ts                 # Axios API Client
│   └── Dockerfile
└── docker-compose.yml
```

##  Key Features

1.  **Smart Ingestion**:
    *   Automatically parses PDF/TXT files.
    *   Splits text using `RecursiveCharacterTextSplitter` for optimal context windows.
2.  **Vector Search**:
    *   Generates `text-embedding-3-small` embeddings.
    *   Performs Semantic Search via Pinecone to retrieve top-k context chunks.
3.  **Source Attribution**:
    *   The LLM response includes the filenames of the documents used to generate the answer.
4.  **Resilient Architecture**:
    *   Handles API errors gracefully.
    *   Dockerized for consistent deployment.

