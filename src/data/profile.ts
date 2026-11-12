/**
 * Single source of truth for all portfolio content.
 * Every fact below is taken from the resume (public/resume/*.pdf). Edit here, not in components.
 */

export const profile = {
  name: "Rajasekhar Naidu Chinnapothula",
  shortName: "Rajasekhar Naidu",
  initials: "RN",
  roles: ["AI Engineer", "Machine Learning Engineer", "Applied AI / GenAI Engineer"],
  currentTitle: "Data Scientist",
  currentCompany: "Country Delight",
  email: "craja62002@gmail.com",
  phone: "+91 6302723726",
  github: "https://github.com/CRajasekhar3182",
  githubHandle: "CRajasekhar3182",
  linkedin: "https://www.linkedin.com/in/chinnapothula-rajasekhar-naidu-/",
  resumeUrl: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume/Rajasekhar_Naidu_Chinnapothula_Resume.pdf`,
  location: "India",
  tagline:
    "I build GenAI agents, LLM chatbots, computer-vision classifiers and forecasting systems end to end, from data pipelines and modelling to APIs, AWS deployment and monitoring.",
  summary:
    "Data Scientist with 2+ years of production experience at Country Delight, a leading D2C consumer brand delivering fresh food, dairy essentials and daily groceries across multiple cities in India.",
  summaryLong: [
    "I shipped a 10-node LangGraph support chatbot with RAG and CRM action handoff, a config-driven image classification platform running 6 production use cases, an autonomous MLOps agent that cut monitoring effort by ~92%, and demand forecasts behind an 82% drop in inventory waste.",
    "My work spans the full lifecycle: data pipelines and feature engineering, modelling and evaluation, REST APIs, CI/CD, AWS deployment, tracing and monitoring, and human-in-the-loop feedback that keeps models improving after launch.",
  ],
};

export type Stat = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string; detail: string };

export const heroStats: Stat[] = [
  { value: 92, prefix: "~", suffix: "%", label: "Less ML monitoring effort", detail: "Autonomous MLOps agent" },
  { value: 82, suffix: "%", label: "Less inventory waste", detail: "AI demand forecasting" },
  { value: 6, label: "Vision models in production", detail: "PODClassifier platform" },
  { value: 2, suffix: "+", label: "Years in production AI", detail: "Country Delight" },
];

export const achievements: Stat[] = [
  { value: 92, prefix: "~", suffix: "%", label: "Reduction in manual ML monitoring", detail: "Autonomous agent reading pipeline logs, grouping errors and triggering fixes" },
  { value: 82, suffix: "%", label: "Reduction in inventory waste", detail: "SKU-level daily & weekly demand forecasts across 24+ cities" },
  { value: 85, suffix: "%", label: "Churn model precision", detail: "With 80% recall, flagging at-risk customers up to 2 weeks early" },
  { value: 10, label: "Node LangGraph state machine", detail: "Ayuh support agent: router, parallel RAG + account lookup + intent, JSON decision" },
  { value: 6, label: "Production vision use cases", detail: "One config-driven PyTorch codebase for training, serving and batch inference" },
  { value: 90, prefix: "~", suffix: "%", label: "Test accuracy, coconut classifier", detail: "6-class EfficientNet / MobileNetV3 fine-tune, TorchScript export" },
  { value: 24, suffix: "+", label: "Cities forecast at SKU level", detail: "Lags, rolling means, seasonality, holiday and promotion effects" },
  { value: 13, label: "Actionable customer cohorts", detail: "RFMI features, K-Means + Hierarchical clustering, CRM integration" },
  { value: 29, label: "Intents auto-tagged nightly", detail: "GPT job classifying every support conversation" },
  { value: 40, prefix: "~", suffix: "%", label: "Less pipeline boilerplate", detail: "Internal ML utility package adopted across 5+ production pipelines" },
];

export type Role = {
  title: string;
  company: string;
  period: string;
  type: string;
  summary: string;
  highlights: string[];
  tech: string[];
};

export const experience: Role[] = [
  {
    title: "Data Scientist",
    company: "Country Delight",
    period: "Jan 2025 – Present",
    type: "Full-time",
    summary:
      "Building and operating production GenAI, computer-vision, forecasting and customer-intelligence systems for a leading D2C fresh food and dairy brand.",
    highlights: [
      "Launched Ayuh, a 10-node LangGraph customer-support agent with hybrid-reranked RAG, Redis slot-filling memory and CRM action handoff (cancellations, vacation pause, complaints).",
      "Created an autonomous AI agent that monitors scheduled ML pipelines, writes root-cause summaries and triggers corrective actions, cutting manual monitoring effort by ~92%.",
      "Engineered PODClassifier, a config-driven PyTorch platform powering 6 production image-classification use cases with Flask serving, batch pipelines and a Gradio human-in-the-loop UI.",
      "Designed SKU-level demand forecasting across 24+ cities with LightGBM, XGBoost and Prophet, contributing to an 82% reduction in inventory waste.",
      "Trained churn models at 85% precision / 80% recall with SHAP-based reasons and 5 risk tiers; segmented customers into 13 actionable cohorts integrated into the CRM.",
      "Owned Python / SQL ETL with data-quality checks and Kafka event streaming; deployed models on AWS EC2 behind FastAPI; authored an internal ML package used across 5+ pipelines (~40% less boilerplate).",
    ],
    tech: ["LangGraph", "OpenAI", "RAG", "FAISS", "Redis", "Langfuse", "PyTorch", "EfficientNet", "LightGBM", "XGBoost", "Prophet", "SHAP", "FastAPI", "Flask", "Kafka", "Jenkins", "AWS", "Redshift", "Power BI"],
  },
  {
    title: "Data Science Intern",
    company: "Ramana Soft",
    period: "Oct 2024 – Jan 2025",
    type: "Internship",
    summary: "End-to-end ML pipelines, deep learning, NLP and an early RAG prototype.",
    highlights: [
      "Built an ML pipeline from data ingestion to deployment reaching 83% accuracy; applied ANN, CNN and LSTM models to image classification and time-series prediction.",
      "Developed NLP pipelines with BERT and GPT and a RAG prototype on FAISS and ChromaDB for document question answering.",
      "Cut data preprocessing time by 60% and training time by 30% through automated feature engineering; delivered Streamlit + MySQL dashboards and Power BI reports.",
    ],
    tech: ["Python", "TensorFlow", "Keras", "BERT", "GPT", "FAISS", "ChromaDB", "Streamlit", "MySQL", "Power BI"],
  },
];

export type ProjectCategory = "Agentic AI" | "RAG / LLM" | "MLOps Agent" | "Forecasting" | "Computer Vision" | "Predictive ML" | "Data / Platform";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  context: "Production · Country Delight" | "Personal Project";
  featured?: boolean;
  problem: string;
  solution: string;
  architecture: string[];
  contribution: string[];
  results: { value: string; label: string }[];
  tech: string[];
  architectureId?: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    id: "ayuh",
    title: "Ayuh",
    subtitle: "GenAI-Powered Customer Support & Automation Platform",
    category: "Agentic AI",
    context: "Production · Country Delight",
    featured: true,
    problem:
      "Customers ask about orders, deliveries, products, wallet, VIP membership and offers, and often need actions taken (cancel an order, pause for vacation, register a complaint). Static FAQ bots can't read live account state or safely execute CRM actions.",
    solution:
      "A 10-node LangGraph state machine. An LLM router sorts each turn into 4 paths; live account lookup, RAG retrieval and intent/entity detection run in parallel; a single synthesis call returns a strict JSON decision: Answer, Clarify, Action or Escalate. Structured intents and entities are handed to the CRM.",
    architecture: [
      "LLM router → 4 conversation paths",
      "Parallel fan-out: account lookup · RAG · intent/entity detection",
      "FAISS + MiniLM embeddings with LLM query rewriting, top-10 retrieval",
      "Hybrid BGE cross-encoder + keyword reranker (0.6 / 0.4 blend) → top-3 grounding docs",
      "Live account data always overrides help-center text",
      "Redis session memory: 10-turn history, 1-hour TTL, 0.80 confidence gate for actions",
    ],
    contribution: [
      "Designed the LangGraph graph, routing and strict JSON decision contract",
      "Architected the retrieval + hybrid reranking layer",
      "Implemented multi-turn slot filling so CRM actions fire only when intent is clear and every entity is collected",
      "Built a FastAPI human-in-the-loop review app, vector-index admin panel, analytics dashboard and nightly GPT intent tagger",
      "Set up Jenkins CI/CD on Gunicorn and Langfuse tracing of every node and token",
    ],
    results: [
      { value: "10", label: "LangGraph nodes" },
      { value: "2", label: "LLM calls / informational turn" },
      { value: "4–6", label: "LLM calls / action turn" },
      { value: "29", label: "intents auto-tagged nightly" },
    ],
    tech: ["LangGraph", "OpenAI GPT", "RAG", "FAISS", "MiniLM", "BGE Reranker", "Redis", "Langfuse", "FastAPI", "Gunicorn", "Jenkins", "AWS"],
    architectureId: "ayuh",
  },
  {
    id: "mlops-agent",
    title: "Autonomous MLOps Agent",
    subtitle: "AI-Powered ML Operations Platform",
    category: "MLOps Agent",
    context: "Production · Country Delight",
    featured: true,
    problem:
      "Many scheduled ML pipelines ran in production. Spotting failed or stalled jobs and diagnosing them meant engineers manually reading logs every day.",
    solution:
      "An autonomous AI agent that reads scheduled pipeline logs, detects failed or stalled jobs, groups recurring error patterns and writes a root-cause summary with a suggested fix, then acts on it through tool calls.",
    architecture: [
      "Cron-scheduled log collection across production ML jobs",
      "Failure / stall detection and recurring error-pattern grouping",
      "LLM root-cause analysis with suggested fix",
      "Tool calling: job re-runs, owner notifications",
      "Automated daily health reports and alerting",
    ],
    contribution: [
      "Designed and built the agentic workflow and tool-calling layer",
      "Integrated alerting and corrective actions with existing pipelines",
    ],
    results: [{ value: "~92%", label: "less manual monitoring effort" }],
    tech: ["LLMs", "Agentic Workflows", "Tool Calling", "Python", "Cron"],
    architectureId: "mlops",
  },
  {
    id: "podclassifier",
    title: "PODClassifier",
    subtitle: "Config-Driven Image Classification Platform",
    category: "Computer Vision",
    context: "Production · Country Delight",
    featured: true,
    problem:
      "Operations needed automated image checks for proof-of-delivery, bag detection, product visibility and complaint validation. Building a separate model stack for each use case doesn't scale.",
    solution:
      "A single PyTorch codebase that trains, serves and batch-runs image classifiers from config alone. Fine-tuned EfficientNet-B0 / MobileNetV3-Small models, a Flask REST API, a daily batch pipeline, and a Gradio human-in-the-loop UI that turns reviewer corrections into new training data.",
    architecture: [
      "Config → train / serve / batch from one codebase",
      "ImageNet EfficientNet-B0 / MobileNetV3-Small, augmentation, Adam, LR-on-plateau, 30 epochs",
      "TorchScript builds for mobile/edge; weights hosted on S3",
      "Flask REST API: S3 image URL → label + confidence",
      "Daily batch: Redshift complaints → 4 worker threads → results to S3",
      "Gradio review UI (0.80 threshold) with MySQL feedback log",
      "AI-generated image detector (Hugging Face model + EXIF checks)",
    ],
    contribution: [
      "Engineered the config-driven training/serving framework",
      "Fine-tuned and exported the production models",
      "Built the REST API, batch pipeline and human-in-the-loop feedback loop",
      "Added fake complaint-photo detection",
    ],
    results: [
      { value: "6", label: "production use cases" },
      { value: "~90%", label: "test accuracy (6-class coconut model)" },
      { value: "4", label: "parallel batch workers" },
    ],
    tech: ["PyTorch", "EfficientNet", "MobileNetV3", "TorchScript", "Flask", "Gradio", "Hugging Face", "AWS S3", "Redshift", "MySQL"],
    architectureId: "pod",
  },
  {
    id: "demand",
    title: "Demand Intelligence Engine",
    subtitle: "AI-Powered Demand Forecasting & Inventory Optimization",
    category: "Forecasting",
    context: "Production · Country Delight",
    featured: true,
    problem:
      "Perishable fresh food and dairy inventory across many cities: over-forecasting creates waste, under-forecasting creates stock-outs. Slow-moving SKUs, sudden spikes and sparse demand make it harder.",
    solution:
      "An end-to-end system forecasting daily and weekly SKU demand across 24+ cities, with engineered time-series features and SKU-level error analysis, fully automated from data prep through S3 publishing.",
    architecture: [
      "SQL data extraction → automated data prep",
      "Features: lags, rolling means, seasonality, weekday / holiday, promotion effects",
      "LightGBM · XGBoost · Prophet models",
      "Validation + SKU-level actual-vs-predicted error analysis",
      "Predictions published to AWS S3",
      "Dashboards tracking pipeline runs and forecast accuracy",
    ],
    contribution: [
      "Designed the forecasting system end to end",
      "Fixed slow-moving SKUs, spikes and sparse demand through error analysis",
      "Automated training, validation, prediction and publishing",
    ],
    results: [
      { value: "82%", label: "reduction in inventory waste" },
      { value: "24+", label: "cities, daily & weekly" },
    ],
    tech: ["LightGBM", "XGBoost", "Prophet", "Python", "SQL", "AWS S3"],
    architectureId: "demand",
  },
  {
    id: "churn",
    title: "Churn Prediction & Activation",
    subtitle: "Explainable Customer Risk Modeling",
    category: "Predictive ML",
    context: "Production · Country Delight",
    problem: "Marketing needed to know which subscribers were about to go inactive early enough to win them back, and why.",
    solution:
      "Churn models on transaction, subscription and engagement data, with auto-refreshed scores turned into 5 risk tiers (Very High → Very Low) and SHAP-based reasons per customer.",
    architecture: ["Transaction / subscription / engagement features", "XGBoost + LightGBM", "SHAP per-customer explanations", "5 auto-refreshed risk tiers → marketing campaigns"],
    contribution: ["Trained and evaluated the churn models", "Built explainability and risk-tiering used by marketing"],
    results: [
      { value: "85%", label: "precision" },
      { value: "80%", label: "recall" },
      { value: "2 wks", label: "early warning" },
    ],
    tech: ["XGBoost", "LightGBM", "SHAP", "Python", "SQL"],
  },
  {
    id: "segmentation",
    title: "Customer Segmentation & Marketing Intelligence",
    subtitle: "RFMI Clustering Integrated into CRM",
    category: "Predictive ML",
    context: "Production · Country Delight",
    problem: "One-size-fits-all campaigns ignored differences in customer engagement and value.",
    solution:
      "Customer-level RFMI (Recency, Frequency, Monetary, Inactivity) and subscription features, clustered with K-Means and Hierarchical Clustering (Elbow + Silhouette) into actionable cohorts tagged on every CRM profile.",
    architecture: ["RFMI + subscription + transaction features", "K-Means & Hierarchical Clustering", "Elbow / Silhouette validation", "CRM tagging + Power BI tracking"],
    contribution: ["Engineered features and clustering", "Integrated segments into CRM with marketing"],
    results: [{ value: "13", label: "actionable cohorts" }],
    tech: ["Python", "K-Means", "Hierarchical Clustering", "Power BI", "CRM Integration"],
  },
  {
    id: "mediguide",
    title: "MediGuide AI",
    subtitle: "Agentic RAG for Clinical Knowledge & Hospital Intelligence",
    category: "RAG / LLM",
    context: "Personal Project",
    featured: true,
    problem:
      "Clinical guidelines, medication references, discharge instructions and hospital protocols are scattered and long. Medical answers have to be grounded and cited, and the system must say so when evidence is insufficient.",
    solution:
      "A RAG-powered medical knowledge assistant with semantic chunking, hybrid retrieval and reranking on Qdrant, plus LangGraph agent workflows that validate retrieved evidence, handle insufficient information and reduce unsupported responses.",
    architecture: [
      "Document ingestion + semantic chunking",
      "Embeddings → Qdrant",
      "Hybrid retrieval + reranking",
      "LangGraph evidence validation & insufficient-info handling",
      "Source attribution + document version tracking",
      "FastAPI serving",
    ],
    contribution: ["Built end to end", "Evaluated retrieval quality, faithfulness, citation accuracy and latency on a curated medical Q&A set"],
    results: [{ value: "Cited", label: "evidence-backed answers" }],
    tech: ["LangGraph", "RAG", "Qdrant", "Hybrid Search", "FastAPI"],
    architectureId: "mediguide",
  },
  {
    id: "multiagent",
    title: "Multi-Agent Analytical Intelligence",
    subtitle: "Plain-English Questions → SQL → Charts",
    category: "Agentic AI",
    context: "Personal Project",
    problem: "Business users can't write SQL or pandas to answer their own analytical questions.",
    solution:
      "A planner agent breaks a plain-English business question into steps, a SQL agent writes and self-corrects queries with schema-aware context, and an analysis agent runs pandas and returns charts with a written summary.",
    architecture: ["Planner agent", "Schema-aware SQL agent with self-correction", "Analysis agent (pandas) → charts + summary", "DuckDB"],
    contribution: ["Designed and built the multi-agent system"],
    results: [{ value: "3", label: "cooperating agents" }],
    tech: ["LangGraph", "Multi-Agent", "ReAct", "Tool Calling", "SQL", "DuckDB", "Pandas"],
  },
  {
    id: "meeting",
    title: "AI Meeting Assistant",
    subtitle: "Transcription & Summarization",
    category: "RAG / LLM",
    context: "Personal Project",
    problem: "Meeting outcomes get lost; manual notes miss decisions and action items.",
    solution: "Transcribes meeting audio with Whisper and uses LLM summarisation to extract key points, decisions and action items into a shareable summary.",
    architecture: ["Audio → Whisper transcription", "LLM summarisation", "Key points · decisions · action items"],
    contribution: ["Built end to end"],
    results: [{ value: "Audio → Actions", label: "automated summaries" }],
    tech: ["Whisper", "LLMs", "NLP", "Python"],
  },
];

export const additionalWork = [
  {
    title: "Data Engineering, ETL & Cloud ML Deployment",
    points: [
      "Python / SQL ETL pipelines with automated validation and data-quality checks feeding ML and analytics layers on S3",
      "Apache Kafka for real-time customer event streaming and near real-time behaviour analytics",
      "Models on AWS EC2 behind FastAPI REST APIs; Streamlit / Flask dashboards integrated with Power BI",
      "API contracts, model versioning and monitoring; NLP feedback analysis (transformer sentiment + LLM summaries)",
    ],
    tech: ["Kafka", "FastAPI", "AWS", "Power BI"],
  },
  {
    title: "Production ML Utility Package",
    points: ["Internal Python package of reusable ETL transformers, preprocessing, feature-engineering and evaluation components", "Adopted across 5+ production ML pipelines, cutting boilerplate effort by ~40%"],
    tech: ["Python", "setuptools", "pip"],
  },
];

export type SkillGroup = { name: string; icon: string; blurb: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { name: "Programming & Databases", icon: "Code2", blurb: "Languages and data stores", items: ["Python", "SQL", "Bash", "MySQL", "PostgreSQL", "Amazon Redshift", "BigQuery", "Firestore", "DuckDB", "SQLite"] },
  { name: "Machine Learning", icon: "Brain", blurb: "Classical ML & explainability", items: ["Scikit-learn", "XGBoost", "LightGBM", "CatBoost", "Prophet", "ARIMA", "K-Means", "Hierarchical Clustering", "Ensembles", "SHAP", "LIME"] },
  { name: "Deep Learning & Vision", icon: "Layers", blurb: "Neural networks & computer vision", items: ["PyTorch", "TensorFlow", "Keras", "CNN", "EfficientNet", "MobileNetV3", "Transfer Learning", "TorchScript", "YOLO (v3 / v7 / v8)", "OpenCV"] },
  { name: "Generative AI & LLMs", icon: "Sparkles", blurb: "Models, tuning, evaluation, safety", items: ["OpenAI GPT", "Gemini API", "Claude API", "Vertex AI", "Document AI", "Hugging Face Transformers", "Prompt Engineering & Caching", "Fine-Tuning (LoRA / QLoRA)", "LLM Evaluation (RAGAS)", "Guardrails (Model Armor, PII)", "Langfuse"] },
  { name: "Agentic AI", icon: "Workflow", blurb: "Orchestration & multi-agent systems", items: ["LangGraph", "Multi-Agent Systems", "Agent Orchestration", "ReAct Agents", "Tool / Function Calling", "MCP", "A2A Protocol", "Google ADK", "AutoGen", "Human-in-the-Loop Workflows"] },
  { name: "LLM Frameworks", icon: "Boxes", blurb: "Application frameworks", items: ["LangChain", "LangGraph", "LlamaIndex", "Google ADK", "AutoGen", "Hugging Face Transformers"] },
  { name: "RAG & Vector Search", icon: "Database", blurb: "Retrieval, ranking & NLP", items: ["RAG", "Hybrid Search RAG", "Reranking", "FAISS", "Qdrant", "ChromaDB", "Pinecone", "BigQuery Vector Search", "Sentence-Transformers (MiniLM)", "BGE Cross-Encoder Reranker", "BERT", "Whisper"] },
  { name: "Backend & APIs", icon: "Server", blurb: "Serving models in production", items: ["FastAPI", "Flask", "Gunicorn", "Pydantic", "SQLAlchemy", "REST APIs", "OAuth 2.0", "Webhooks", "Streamlit", "Gradio"] },
  { name: "Cloud & Deployment", icon: "Cloud", blurb: "AWS & GCP", items: ["AWS EC2", "S3", "Lambda", "API Gateway", "Elastic Beanstalk", "ElastiCache Redis", "RDS", "Secrets Manager", "CloudWatch", "GCP Vertex AI", "Agent Engine", "Cloud Run", "Cloud Functions", "Cloud SQL", "Cloud Scheduler"] },
  { name: "MLOps & Data Engineering", icon: "GitBranch", blurb: "Pipelines, CI/CD & analytics", items: ["Docker", "MLflow", "Jenkins", "GitHub Actions", "Cloud Build", "Airflow", "Kafka", "Spark", "dbt", "ETL", "Pandas", "NumPy", "Power BI", "A/B Testing"] },
];

export const education = {
  degree: "B.Tech, Electronics & Communication Engineering",
  school: "KSRM College of Engineering, Kadapa (JNTUA)",
  period: "Aug 2020 – May 2024",
  gpa: "9.0 / 10",
};

export const certifications = ["Introduction to Data Science (Cisco)", "Python (HackerRank)", "SQL (HackerRank)", "Python (Great Learning)"];

export const honors = [
  "1st place, KSRM ML/AI Competition 2023: led the team to 89% model accuracy, outperforming 50+ teams",
  "Active on Kaggle tabular and NLP competitions",
  "6 consecutive Academic Excellence Awards for holding a top 1% rank",
  "Class Representative for 4 years and Captain of the Kadapa District Cricket Team",
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "architecture", label: "Architecture" },
  { id: "skills", label: "Skills" },
  { id: "impact", label: "Impact" },
  { id: "assistant", label: "Ask AI" },
  { id: "contact", label: "Contact" },
];
