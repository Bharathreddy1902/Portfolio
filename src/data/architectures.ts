/**
 * Interactive architecture diagrams. Coordinates are in a 1200 x H SVG viewBox (node centers).
 * Every component reflects what the resume states for that system.
 */

export type NodeKind = "input" | "api" | "agent" | "model" | "store" | "process" | "output" | "monitor";

export type ArchNode = { id: string; label: string; sub?: string; x: number; y: number; kind: NodeKind; detail: string };
export type ArchEdge = { from: string; to: string; curve?: number; dashed?: boolean; label?: string };

export type Architecture = {
  id: string;
  title: string;
  tagline: string;
  height: number;
  nodes: ArchNode[];
  edges: ArchEdge[];
};

export const kindMeta: Record<NodeKind, { label: string; color: string }> = {
  input: { label: "Input / Data", color: "#7ee8fa" },
  api: { label: "API / Serving", color: "#5b9bff" },
  agent: { label: "Agent / LLM", color: "#a78bfa" },
  model: { label: "Model", color: "#c084fc" },
  store: { label: "Storage / Memory", color: "#38bdf8" },
  process: { label: "Processing", color: "#8fb8ff" },
  output: { label: "Output / Action", color: "#34d399" },
  monitor: { label: "Monitoring", color: "#fbbf24" },
};

export const architectures: Architecture[] = [
  {
    id: "ayuh",
    title: "Ayuh: LangGraph Support Agent",
    tagline: "10-node state machine · parallel retrieval · strict JSON decisions · CRM handoff",
    height: 540,
    nodes: [
      { id: "user", label: "Customer", sub: "chat message", x: 90, y: 270, kind: "input", detail: "Customers ask about orders, delivery, products, wallet, VIP membership and offers, or request actions." },
      { id: "api", label: "FastAPI Service", sub: "Gunicorn · Jenkins CI/CD", x: 250, y: 270, kind: "api", detail: "Served on Gunicorn and deployed through Jenkins CI/CD." },
      { id: "memory", label: "Redis Memory", sub: "10 turns · 1h TTL", x: 250, y: 450, kind: "store", detail: "Session memory holding a 10-turn history with a 1-hour TTL, enabling multi-turn slot filling." },
      { id: "router", label: "LLM Router", sub: "4 conversation paths", x: 410, y: 270, kind: "agent", detail: "An LLM router sorts each turn into one of 4 paths before the parallel fan-out." },
      { id: "account", label: "Account Lookup", sub: "live customer data", x: 580, y: 100, kind: "api", detail: "Live account data, which always overrides help-center text when they conflict." },
      { id: "rag", label: "RAG Retrieval", sub: "rewrite → FAISS top-10", x: 580, y: 270, kind: "store", detail: "LLM query rewriting, then top-10 retrieval from FAISS over MiniLM sentence embeddings." },
      { id: "intent", label: "Intent + Entities", sub: "slot filling · 0.80 gate", x: 580, y: 440, kind: "agent", detail: "Detects intent and required entities (date, product, issue). Actions fire only above a 0.80 confidence gate with every slot filled." },
      { id: "rerank", label: "Hybrid Reranker", sub: "BGE 0.6 + keyword 0.4", x: 750, y: 270, kind: "model", detail: "BGE cross-encoder blended 0.6 / 0.4 with a keyword reranker; keeps the top-3 grounding documents." },
      { id: "synth", label: "Synthesis LLM", sub: "strict JSON decision", x: 920, y: 270, kind: "agent", detail: "A single synthesis call returns Answer / Clarify / Action / Escalate. 2 LLM calls per informational turn, 4–6 per action, with OpenAI prompt caching over a ~40K-token prompt." },
      { id: "crm", label: "CRM Actions", sub: "cancel · pause · complaint", x: 1100, y: 150, kind: "output", detail: "Structured intents and entities handed to the CRM: order cancellation, vacation pause, complaint registration." },
      { id: "reply", label: "Reply", sub: "answer/clarify/escalate", x: 1100, y: 390, kind: "output", detail: "Grounded answer, a clarifying question, or escalation to a human." },
      { id: "obs", label: "Langfuse + HITL", sub: "traces · HITL · 29 intents", x: 920, y: 460, kind: "monitor", detail: "Every node and token traced in Langfuse. FastAPI human-in-the-loop review app, vector-index admin panel, analytics dashboard, and a nightly GPT job tagging chats into 29 intents." },
    ],
    edges: [
      { from: "user", to: "api" },
      { from: "api", to: "router" },
      { from: "memory", to: "router" },
      { from: "router", to: "account" },
      { from: "router", to: "rag" },
      { from: "router", to: "intent" },
      { from: "rag", to: "rerank" },
      { from: "account", to: "synth" },
      { from: "rerank", to: "synth" },
      { from: "intent", to: "synth" },
      { from: "synth", to: "crm" },
      { from: "synth", to: "reply" },
      { from: "synth", to: "obs", dashed: true },
    ],
  },
  {
    id: "mlops",
    title: "Autonomous MLOps Agent",
    tagline: "Reads pipeline logs · finds root causes · takes corrective action · ~92% less manual monitoring",
    height: 480,
    nodes: [
      { id: "cron", label: "Scheduled ML Jobs", sub: "cron · production", x: 90, y: 240, kind: "input", detail: "Scheduled production ML pipelines running on cron." },
      { id: "logs", label: "Log Reader", sub: "pipeline logs", x: 250, y: 240, kind: "process", detail: "The agent reads the logs of every scheduled ML pipeline." },
      { id: "detect", label: "Failure Detection", sub: "failed / stalled jobs", x: 410, y: 240, kind: "process", detail: "Detects failed or stalled jobs." },
      { id: "group", label: "Error Grouping", sub: "recurring patterns", x: 580, y: 240, kind: "process", detail: "Groups recurring error patterns so repeat issues are recognised." },
      { id: "llm", label: "LLM Root Cause", sub: "summary + suggested fix", x: 750, y: 240, kind: "agent", detail: "Writes a root-cause summary with a suggested fix." },
      { id: "rerun", label: "Job Re-runs", sub: "tool calling", x: 920, y: 110, kind: "output", detail: "Corrective actions via tool calling, such as re-running jobs." },
      { id: "notify", label: "Owner Alerts", sub: "notifications", x: 920, y: 370, kind: "output", detail: "Notifies job owners through alerting." },
      { id: "report", label: "Daily Health Report", sub: "automated", x: 1100, y: 240, kind: "monitor", detail: "Automated daily health reports across production ML jobs." },
    ],
    edges: [
      { from: "cron", to: "logs" },
      { from: "logs", to: "detect" },
      { from: "detect", to: "group" },
      { from: "group", to: "llm" },
      { from: "llm", to: "rerun" },
      { from: "llm", to: "notify" },
      { from: "llm", to: "report" },
      { from: "rerun", to: "cron", curve: -60, dashed: true, label: "re-run" },
    ],
  },
  {
    id: "pod",
    title: "PODClassifier: Vision Platform",
    tagline: "One config-driven PyTorch codebase · 6 production use cases · human-in-the-loop retraining",
    height: 520,
    nodes: [
      { id: "client", label: "Ops Request", sub: "S3 image URL", x: 90, y: 100, kind: "input", detail: "Apps send an S3 image URL for real-time classification." },
      { id: "config", label: "Use-case Config", sub: "train · serve · batch", x: 90, y: 260, kind: "input", detail: "A new use case is defined by config alone. The same codebase trains, serves and batch-runs it." },
      { id: "redshift", label: "Redshift", sub: "daily complaints", x: 90, y: 420, kind: "store", detail: "The daily batch pipeline pulls complaint records from Redshift." },
      { id: "flask", label: "Flask REST API", sub: "label + confidence", x: 410, y: 100, kind: "api", detail: "Returns a label and confidence for each image URL." },
      { id: "train", label: "Trainer", sub: "EfficientNet / MobileNetV3", x: 250, y: 260, kind: "model", detail: "Fine-tunes ImageNet EfficientNet-B0 / MobileNetV3-Small with augmentation, Adam and LR-on-plateau over 30 epochs." },
      { id: "weights", label: "Weights on S3", sub: "+ TorchScript builds", x: 410, y: 260, kind: "store", detail: "S3-hosted weights alongside TorchScript exports for mobile and edge." },
      { id: "batch", label: "Batch Runner", sub: "4 worker threads", x: 410, y: 420, kind: "process", detail: "Classifies complaint images with 4 worker threads and publishes results to S3." },
      { id: "model", label: "Classifiers", sub: "6 production use cases", x: 600, y: 260, kind: "model", detail: "Proof-of-delivery acceptance, bag detection, product visibility, complaint-proof checks, complaint validation and a 6-class coconut classifier (~90% test accuracy)." },
      { id: "fake", label: "AI-Image Detector", sub: "HF model + EXIF", x: 790, y: 100, kind: "model", detail: "Hugging Face model plus EXIF metadata checks that flag fake complaint photos." },
      { id: "results", label: "Results → S3", sub: "published daily", x: 790, y: 420, kind: "output", detail: "Batch predictions published to S3." },
      { id: "gradio", label: "Gradio HITL UI", sub: "< 0.80 → review", x: 790, y: 260, kind: "monitor", detail: "Low-confidence predictions (below 0.80) go to reviewers." },
      { id: "feedback", label: "MySQL Feedback", sub: "new labelled data", x: 1000, y: 260, kind: "store", detail: "Reviewer corrections are logged and become new labelled training data." },
    ],
    edges: [
      { from: "client", to: "flask" },
      { from: "flask", to: "model" },
      { from: "config", to: "train" },
      { from: "train", to: "weights" },
      { from: "weights", to: "model" },
      { from: "redshift", to: "batch" },
      { from: "batch", to: "model" },
      { from: "model", to: "fake" },
      { from: "model", to: "results" },
      { from: "model", to: "gradio" },
      { from: "gradio", to: "feedback" },
      { from: "feedback", to: "train", curve: -100, dashed: true, label: "retrain" },
    ],
  },
  {
    id: "demand",
    title: "Demand Intelligence Engine",
    tagline: "SKU-level daily & weekly forecasts · 24+ cities · 82% less inventory waste",
    height: 480,
    nodes: [
      { id: "sql", label: "Sales History", sub: "SQL extraction", x: 90, y: 260, kind: "input", detail: "Historical SKU demand pulled with SQL." },
      { id: "prep", label: "Data Prep", sub: "automated", x: 250, y: 260, kind: "process", detail: "Automated data preparation feeding the training pipeline." },
      { id: "calendar", label: "Calendar & Promos", sub: "weekday · holiday · promo", x: 250, y: 100, kind: "input", detail: "Weekday, holiday and promotion effects." },
      { id: "features", label: "Feature Engineering", sub: "lags · rolling · seasonal", x: 420, y: 260, kind: "process", detail: "Lags, rolling means, seasonality, weekday / holiday and promotion features." },
      { id: "models", label: "Forecast Models", sub: "LightGBM·XGBoost·Prophet", x: 600, y: 260, kind: "model", detail: "LightGBM, XGBoost and Prophet forecasting daily and weekly SKU demand." },
      { id: "validate", label: "Validation", sub: "SKU-level error analysis", x: 780, y: 260, kind: "monitor", detail: "Actual-vs-predicted analysis per SKU to fix slow-movers, sudden spikes and sparse demand." },
      { id: "s3", label: "Publish to S3", sub: "24+ cities", x: 950, y: 260, kind: "store", detail: "Automated prediction publishing to AWS S3." },
      { id: "dash", label: "Ops Dashboards", sub: "runs · accuracy", x: 1100, y: 120, kind: "monitor", detail: "Dashboards tracking pipeline runs and forecast accuracy for operations teams." },
      { id: "plan", label: "Inventory Planning", sub: "82% ↓ waste", x: 1100, y: 400, kind: "output", detail: "Improved inventory planning that contributed to an 82% reduction in inventory waste." },
    ],
    edges: [
      { from: "sql", to: "prep" },
      { from: "calendar", to: "features" },
      { from: "prep", to: "features" },
      { from: "features", to: "models" },
      { from: "models", to: "validate" },
      { from: "validate", to: "models", curve: 110, dashed: true, label: "error analysis" },
      { from: "validate", to: "s3" },
      { from: "s3", to: "dash" },
      { from: "s3", to: "plan" },
    ],
  },
  {
    id: "mediguide",
    title: "MediGuide AI: Agentic RAG",
    tagline: "Hybrid retrieval on Qdrant · LangGraph evidence validation · cited answers",
    height: 520,
    nodes: [
      { id: "docs", label: "Clinical Documents", sub: "guidelines · protocols", x: 90, y: 120, kind: "input", detail: "Clinical guidelines, medication references, discharge instructions and hospital protocols." },
      { id: "chunk", label: "Semantic Chunking", sub: "+ version tracking", x: 270, y: 120, kind: "process", detail: "Document ingestion, semantic chunking and document version tracking." },
      { id: "embed", label: "Embeddings", sub: "dense vectors", x: 450, y: 120, kind: "model", detail: "Chunks embedded for semantic search." },
      { id: "qdrant", label: "Qdrant", sub: "vector database", x: 630, y: 120, kind: "store", detail: "Vector store backing hybrid retrieval." },
      { id: "query", label: "User Question", sub: "clinical query", x: 90, y: 340, kind: "input", detail: "A natural-language medical question." },
      { id: "api", label: "FastAPI", sub: "serving layer", x: 270, y: 340, kind: "api", detail: "FastAPI service exposing the assistant." },
      { id: "hybrid", label: "Hybrid Retrieval", sub: "semantic + keyword", x: 630, y: 340, kind: "process", detail: "Hybrid search over Qdrant." },
      { id: "rerank", label: "Reranker", sub: "precision ranking", x: 800, y: 340, kind: "model", detail: "Reranking of retrieved evidence." },
      { id: "validator", label: "LangGraph Validator", sub: "evidence check", x: 970, y: 340, kind: "agent", detail: "LangGraph workflows validate retrieved evidence, handle insufficient information and reduce unsupported responses." },
      { id: "answer", label: "Cited Answer", sub: "source attribution", x: 1110, y: 200, kind: "output", detail: "Evidence-backed answers with source citations." },
      { id: "fallback", label: "Insufficient Info", sub: "safe response", x: 1110, y: 470, kind: "output", detail: "When evidence is insufficient, the system says so instead of guessing." },
      { id: "eval", label: "RAG Evaluation", sub: "faithfulness · citations", x: 970, y: 120, kind: "monitor", detail: "Evaluated retrieval quality, answer faithfulness, citation accuracy and latency on a curated medical Q&A dataset." },
    ],
    edges: [
      { from: "docs", to: "chunk" },
      { from: "chunk", to: "embed" },
      { from: "embed", to: "qdrant" },
      { from: "query", to: "api" },
      { from: "api", to: "hybrid" },
      { from: "qdrant", to: "hybrid" },
      { from: "hybrid", to: "rerank" },
      { from: "rerank", to: "validator" },
      { from: "validator", to: "answer" },
      { from: "validator", to: "fallback" },
      { from: "answer", to: "eval", dashed: true },
    ],
  },
];
