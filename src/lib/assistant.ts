/**
 * Portfolio assistant: a lightweight, fully client-side retrieval engine.
 * It does NOT call an LLM. It scores curated knowledge chunks (built from the resume data)
 * with a BM25-style ranking plus synonym expansion and returns the best-matching answers verbatim.
 */
import { profile, experience, projects, skillGroups, education, certifications, honors, additionalWork } from "@/data/profile";

export type Chunk = { id: string; source: string; title: string; text: string; keywords?: string[] };

const curated: Chunk[] = [
  {
    id: "intro",
    source: "Profile",
    title: "Who is Rajasekhar?",
    text: `${profile.name} is a ${profile.currentTitle} at ${profile.currentCompany} targeting AI Engineer, Machine Learning Engineer and Applied AI / GenAI Engineer roles. ${profile.summary} ${profile.tagline}`,
    keywords: ["who", "about", "introduce", "summary", "background", "overview", "yourself", "tell"],
  },
  {
    id: "years",
    source: "Profile",
    title: "Experience level",
    text: "2+ years of production experience: Data Scientist at Country Delight since Jan 2025 (current), preceded by a Data Science internship at Ramana Soft (Oct 2024 – Jan 2025).",
    keywords: ["years", "experience", "senior", "level", "long", "how much", "duration"],
  },
  {
    id: "contact",
    source: "Contact",
    title: "How to reach him",
    text: `Email: ${profile.email} · LinkedIn: ${profile.linkedin} · GitHub: ${profile.github}. The resume can be downloaded from the Contact section.`,
    keywords: ["contact", "email", "reach", "hire", "linkedin", "github", "phone", "connect", "resume", "cv"],
  },
  {
    id: "genai",
    source: "Expertise",
    title: "GenAI & Agentic AI experience",
    text: "In production he built Ayuh, a 10-node LangGraph customer-support agent with RAG (FAISS + MiniLM, hybrid BGE cross-encoder + keyword reranking), Redis slot-filling memory, strict JSON decisions and CRM action handoff, traced in Langfuse. He also built an autonomous MLOps agent with tool calling that cut monitoring effort by ~92%. Personal projects: MediGuide AI (agentic RAG on Qdrant) and a multi-agent SQL analytics system. Skills: LangGraph, LangChain, LlamaIndex, Google ADK, MCP, A2A, AutoGen, ReAct, prompt caching, RAGAS evaluation, LoRA / QLoRA fine-tuning and guardrails.",
    keywords: ["genai", "generative", "llm", "agent", "agentic", "langgraph", "langchain", "gpt", "openai", "chatbot", "multi-agent", "mcp"],
  },
  {
    id: "rag",
    source: "Expertise",
    title: "RAG experience",
    text: "RAG in production (Ayuh): LLM query rewriting, top-10 retrieval from FAISS over MiniLM embeddings, then a hybrid BGE cross-encoder + keyword reranker (0.6 / 0.4 blend) keeping the top-3 grounding docs, with live account data overriding help-center text. In MediGuide AI: semantic chunking, Qdrant hybrid retrieval, reranking, LangGraph evidence validation, citations and RAG evaluation (faithfulness, citation accuracy, latency). Also familiar with ChromaDB, Pinecone and BigQuery Vector Search.",
    keywords: ["rag", "retrieval", "vector", "embedding", "faiss", "qdrant", "rerank", "reranker", "chroma", "pinecone", "search", "hybrid"],
  },
  {
    id: "cv",
    source: "Expertise",
    title: "Computer vision experience",
    text: "PODClassifier: one config-driven PyTorch codebase that trains, serves and batch-runs image classifiers for 6 production use cases at Country Delight. It fine-tunes EfficientNet-B0 / MobileNetV3-Small (~90% test accuracy on a 6-class coconut model) and exports TorchScript for edge. Serving is a Flask REST API plus a daily Redshift → S3 batch pipeline, with a Gradio human-in-the-loop UI and an AI-generated image detector. Also experienced with YOLO (v3 / v7 / v8) and OpenCV.",
    keywords: ["vision", "image", "cv", "cnn", "pytorch", "efficientnet", "yolo", "opencv", "classifier", "classification", "torchscript"],
  },
  {
    id: "mlops",
    source: "Expertise",
    title: "MLOps & deployment",
    text: "He deploys and operates models himself: Jenkins CI/CD on Gunicorn, FastAPI / Flask REST APIs on AWS EC2, Docker, MLflow, GitHub Actions and Cloud Build. AWS: EC2, S3, Lambda, API Gateway, Elastic Beanstalk, ElastiCache Redis, RDS, Secrets Manager, CloudWatch. GCP: Vertex AI, Agent Engine, Cloud Run, Cloud Functions. Monitoring and tracing with Langfuse, model versioning and API contracts, plus an autonomous agent monitoring production ML pipelines.",
    keywords: ["mlops", "deploy", "deployment", "aws", "gcp", "cloud", "docker", "ci", "cd", "jenkins", "production", "monitoring", "kubernetes", "infra"],
  },
  {
    id: "forecast",
    source: "Expertise",
    title: "Forecasting & predictive ML",
    text: "Demand forecasting: daily and weekly SKU demand across 24+ cities with LightGBM, XGBoost and Prophet, contributing to an 82% reduction in inventory waste. Churn: 85% precision / 80% recall, flagging at-risk customers up to 2 weeks early, with SHAP reasons and 5 risk tiers. Segmentation: 13 actionable cohorts from RFMI features via K-Means and Hierarchical Clustering, integrated into the CRM.",
    keywords: ["forecast", "forecasting", "demand", "time series", "churn", "segmentation", "xgboost", "lightgbm", "prophet", "prediction", "inventory", "clustering"],
  },
  {
    id: "impact",
    source: "Impact",
    title: "Biggest measurable impact",
    text: "~92% less manual ML monitoring (autonomous agent) · 82% less inventory waste (demand forecasting) · 85% precision / 80% recall churn model · 6 vision models in production · 13 customer cohorts · 29 intents auto-tagged nightly · ~40% less pipeline boilerplate across 5+ pipelines.",
    keywords: ["impact", "results", "achievement", "metric", "numbers", "biggest", "proud", "accomplish", "business"],
  },
  {
    id: "edu",
    source: "Education",
    title: "Education & honors",
    text: `${education.degree}, ${education.school} (${education.period}), GPA ${education.gpa}. ${honors.join(". ")}. Certifications: ${certifications.join(", ")}.`,
    keywords: ["education", "degree", "college", "university", "gpa", "btech", "study", "certification", "award", "competition", "kaggle"],
  },
  {
    id: "stack",
    source: "Skills",
    title: "Core languages",
    text: "Python and SQL are his core languages, with Bash. Databases: MySQL, PostgreSQL, Amazon Redshift, BigQuery, Firestore, DuckDB, SQLite. Analytics: Pandas, NumPy, Matplotlib, Seaborn, Power BI.",
    keywords: ["language", "python", "sql", "programming", "database", "stack"],
  },
  {
    id: "why",
    source: "Profile",
    title: "Why hire him",
    text: "He has shipped GenAI agents, vision platforms and forecasting systems that run in production and show measurable business results. He owns the full lifecycle (data, modelling, APIs, CI/CD, cloud deployment, tracing, human-in-the-loop feedback) and designs for cost and latency, for example 2 LLM calls per informational turn with prompt caching over a ~40K-token prompt.",
    keywords: ["why", "hire", "strength", "fit", "unique", "different", "good"],
  },
];

function buildChunks(): Chunk[] {
  const out: Chunk[] = [...curated];
  experience.forEach((r, i) =>
    out.push({ id: `exp-${i}`, source: "Experience", title: `${r.title} at ${r.company} (${r.period})`, text: `${r.summary} ${r.highlights.join(" ")}`, keywords: [r.company.toLowerCase(), ...r.tech.map((t) => t.toLowerCase())] }),
  );
  projects.forEach((p) =>
    out.push({
      id: `proj-${p.id}`,
      source: p.context,
      title: `${p.title}: ${p.subtitle}`,
      text: `${p.solution} Results: ${p.results.map((r) => `${r.value} ${r.label}`).join(", ")}. Stack: ${p.tech.join(", ")}.`,
      keywords: [p.title.toLowerCase(), p.category.toLowerCase(), ...p.tech.map((t) => t.toLowerCase())],
    }),
  );
  additionalWork.forEach((w, i) => out.push({ id: `work-${i}`, source: "Production · Country Delight", title: w.title, text: w.points.join(". ") + ".", keywords: w.tech.map((t) => t.toLowerCase()) }));
  skillGroups.forEach((g) => out.push({ id: `skill-${g.name}`, source: "Skills", title: g.name, text: `${g.name}: ${g.items.join(", ")}.`, keywords: g.items.map((t) => t.toLowerCase()) }));
  return out;
}

const STOP = new Set("a an the is are was were be of to in on for and or with what which who how does do did has have his he him your you me i it its about tell can could please any some there this that from by at as".split(" "));
const SYN: Record<string, string[]> = {
  llm: ["genai", "gpt", "openai"],
  chatbot: ["agent", "ayuh", "langgraph"],
  agents: ["agent", "agentic"],
  ml: ["machine", "learning"],
  cloud: ["aws", "gcp"],
  vision: ["image", "cv"],
  hire: ["contact", "why"],
  salary: ["contact"],
  location: ["india", "contact"],
  skills: ["skills", "stack"],
};

const tokenize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s/-]/g, " ")
    .split(/[\s/]+/)
    .map((t) => t.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((t) => t && !STOP.has(t));

type Indexed = Chunk & { tf: Map<string, number>; len: number; kw: Set<string> };
let INDEX: { docs: Indexed[]; df: Map<string, number>; avg: number } | null = null;

function index() {
  if (INDEX) return INDEX;
  const docs = buildChunks().map((c) => {
    const toks = tokenize(`${c.title} ${c.text}`);
    const tf = new Map<string, number>();
    toks.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1));
    return { ...c, tf, len: toks.length, kw: new Set((c.keywords ?? []).flatMap(tokenize)) };
  });
  const df = new Map<string, number>();
  docs.forEach((d) => d.tf.forEach((_, t) => df.set(t, (df.get(t) ?? 0) + 1)));
  INDEX = { docs, df, avg: docs.reduce((s, d) => s + d.len, 0) / docs.length };
  return INDEX;
}

export type Answer = { found: boolean; results: Chunk[] };

export function ask(question: string): Answer {
  const { docs, df, avg } = index();
  let q = tokenize(question);
  q = [...q, ...q.flatMap((t) => SYN[t] ?? [])];
  if (!q.length) return { found: false, results: [] };
  const N = docs.length, k1 = 1.4, b = 0.75;
  const scored = docs
    .map((d) => {
      let s = 0;
      q.forEach((t) => {
        const f = d.tf.get(t) ?? 0;
        if (f) {
          const idf = Math.log(1 + (N - (df.get(t) ?? 0) + 0.5) / ((df.get(t) ?? 0) + 0.5));
          s += (idf * f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avg));
        }
        if (d.kw.has(t)) s += 2.2;
      });
      return { d, s };
    })
    .filter((x) => x.s > 1.5)
    .sort((a, b) => b.s - a.s);
  if (!scored.length) return { found: false, results: [] };
  const top = scored[0].s;
  const results = scored.filter((x) => x.s >= top * 0.6).slice(0, 2).map((x) => x.d);
  return { found: true, results };
}

export const suggestedQuestions = [
  "What GenAI and agentic AI systems has he built?",
  "How does the Ayuh RAG pipeline work?",
  "What is his biggest measurable impact?",
  "Does he have computer vision experience?",
  "Which cloud and MLOps tools does he use?",
  "How can I contact him?",
];
