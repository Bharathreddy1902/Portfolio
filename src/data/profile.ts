/**
 * Single source of truth for all portfolio content.
 * Every fact below is taken from the resume (public/resume/*.pdf). Edit here, not in components.
 */

export const profile = {
  name: "Bandlapalli Bharath Reddy",
  shortName: "Bharath Reddy",
  firstName: "Bharath",
  lastName: "Reddy",
  initials: "BR",
  roles: [".NET Full Stack Developer", "ASP.NET Core Developer", "C# Web Developer"],
  currentTitle: "Junior .NET Developer",
  currentCompany: "Neolotex Business Solutions",
  email: "bbharathreddy930@gmail.com",
  phone: "+91 8790103275",
  // Not on the resume: add the URLs here and the links appear automatically across the site.
  github: "https://github.com/Bharathreddy1902",
  githubHandle: "Bharathreddy1902",
  linkedin: "",
  linkedinHandle: "",
  resumeUrl: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume/Bharath_Reddy_Resume.pdf`,
  location: "Bangalore, Karnataka, India",
  tagline:
    "I build responsive, secure web applications end to end with ASP.NET MVC, ASP.NET Core and C#, from clean MVC modules and optimized MySQL databases to Bootstrap interfaces with jQuery validation.",
  summary:
    ".NET Full Stack Developer with 2 years of professional experience designing, developing and maintaining web applications using ASP.NET MVC, ASP.NET Core and C#.",
  summaryLong: [
    "I build responsive front-end interfaces with HTML, CSS, JavaScript, jQuery and Bootstrap, and handle backend development, database management and query optimization with SQL Server and MySQL.",
    "I'm experienced in CRUD / REST-based data operations, debugging and the full software development lifecycle, with a strong focus on clean, maintainable and scalable code in Agile teams.",
  ],
};

export type Stat = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string; detail: string };

export const heroStats: Stat[] = [
  { value: 2, label: "Years of professional experience", detail: ".NET full stack" },
  { value: 2, label: "Companies", detail: "Neolotex · ASCENT" },
  { value: 1, label: "Production web app", detail: "FADV background verification" },
  { value: 15, suffix: "+", label: "Technologies used", detail: "C# · ASP.NET · MySQL" },
];

export const achievements: Stat[] = [
  { value: 2, label: "Years building .NET web apps", detail: "ASP.NET MVC & ASP.NET Core in Agile teams" },
  { value: 2, label: "Professional roles", detail: "Junior .NET Developer at Neolotex, Trainee .NET Developer at ASCENT" },
  { value: 1, label: "Production verification platform", detail: "FADV background verification web application" },
  { value: 4, label: "Core CRUD operations", detail: "Create, read, update and delete for candidate & verification records" },
  { value: 3, label: "IEEE / industry recognitions", detail: "EDGATE internship, Future Skill Expert Trainer, IEEE-certified project" },
];

export type Role = {
  title: string;
  company: string;
  period: string;
  type: string;
  location: string;
  summary: string;
  highlights: string[];
  tech: string[];
};

export const experience: Role[] = [
  {
    title: "Junior .NET Developer",
    company: "Neolotex Business Solutions",
    period: "Aug 2025 – Present",
    type: "Full-time",
    location: "Bangalore",
    summary: "Building and maintaining a Background Verification (FADV) web application with ASP.NET MVC / Core, C# and MySQL.",
    highlights: [
      "Developed a Background Verification (FADV) web application using ASP.NET MVC/Core and MySQL to manage employee verification data, track verification status and support secure business workflows.",
      "Built web modules following MVC architecture using ASP.NET MVC/Core and C#.",
      "Implemented CRUD operations for candidate and verification data using MySQL.",
      "Designed responsive user interfaces using HTML, CSS and Bootstrap.",
      "Integrated jQuery and JavaScript for client-side validation and dynamic UI behavior.",
      "Optimized MySQL queries and database indexes to improve data retrieval performance.",
    ],
    tech: ["C#", "ASP.NET MVC", "ASP.NET Core", "MySQL", "HTML5", "CSS3", "Bootstrap", "jQuery", "JavaScript", "Git"],
  },
  {
    title: "Trainee .NET Developer",
    company: "ASCENT Technologies",
    period: "Feb 2025 – Jul 2025",
    type: "Trainee",
    location: "Bangalore",
    summary: "Real-time ASP.NET Core MVC projects with a focus on clean architecture and maintainable code.",
    highlights: [
      "Developed responsive, user-friendly web applications using C# and ASP.NET MVC, enhancing overall user experience.",
      "Collaborated on real-time projects using ASP.NET Core MVC, focusing on clean architecture and maintainable codebases.",
      "Designed, managed and optimized databases using SQL to support web application data manipulation.",
      "Participated in the full SDLC, from requirements gathering and design through development, testing, deployment and maintenance.",
      "Researched and integrated new technologies to improve development processes and code quality.",
    ],
    tech: ["C#", "ASP.NET MVC", "ASP.NET Core MVC", "SQL", "HTML", "CSS", "JavaScript", "Visual Studio"],
  },
];

export type ProjectCategory = "Full Stack Web" | "Backend / Database" | "Frontend / UI";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  context: "Production · Neolotex" | "Personal Project";
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
    id: "fadv",
    title: "Background Verification (FADV)",
    subtitle: "Employee Background Verification Web Application",
    category: "Full Stack Web",
    context: "Production · Neolotex",
    featured: true,
    problem:
      "Employee background verification involves many candidate records and verification checks. The business needed one secure place to manage verification data, track each candidate's verification status and run its workflows reliably.",
    solution:
      "A web application built on ASP.NET MVC / Core and C# with a MySQL database. It manages candidate and verification records through full CRUD operations, tracks verification status, and gives users a responsive Bootstrap interface with jQuery client-side validation.",
    architecture: [
      "Browser UI: HTML, CSS, Bootstrap (responsive)",
      "jQuery / JavaScript client-side validation and dynamic UI behavior",
      "ASP.NET MVC / Core controllers following MVC architecture",
      "C# business modules for candidates and verifications",
      "CRUD data access for candidate and verification records",
      "MySQL database with optimized queries and indexes",
    ],
    contribution: [
      "Implemented backend modules and CRUD operations for candidate and verification records using ASP.NET MVC/Core, C# and MySQL",
      "Developed responsive frontend interfaces using HTML, CSS and Bootstrap",
      "Added jQuery / JavaScript client-side validation and dynamic UI behavior",
      "Optimized MySQL queries and database indexes to improve data retrieval performance",
    ],
    results: [
      { value: "MVC", label: "clean layered architecture" },
      { value: "CRUD", label: "candidate & verification records" },
      { value: "Faster", label: "data retrieval via indexing" },
      { value: "Responsive", label: "Bootstrap UI on any device" },
    ],
    tech: ["ASP.NET MVC", "ASP.NET Core", "C#", "MySQL", "HTML", "CSS", "Bootstrap", "jQuery", "JavaScript"],
    architectureId: "fadv",
  },
];

export const additionalWork: { title: string; points: string[]; tech: string[] }[] = [];

export type SkillGroup = { name: string; icon: string; blurb: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { name: "Programming Languages", icon: "Code2", blurb: "Core languages", items: ["C#", "JavaScript"] },
  { name: "Frameworks & Technologies", icon: "Layers", blurb: "Microsoft web stack", items: ["ASP.NET MVC", "ASP.NET Core", "MVC Architecture"] },
  { name: "Frontend", icon: "Sparkles", blurb: "Responsive interfaces", items: ["HTML5", "CSS3", "jQuery", "Bootstrap", "Responsive Web Design", "Client-Side Validation"] },
  { name: "Backend", icon: "Server", blurb: "Server-side development", items: ["C#", "ASP.NET MVC", "ASP.NET Core", "Web Application Development", "CRUD / REST Operations"] },
  { name: "Databases", icon: "Database", blurb: "Data & performance", items: ["MySQL", "SQL Server", "Stored Procedures", "Functions", "Indexing", "Query Optimization"] },
  { name: "Tools & Version Control", icon: "GitBranch", blurb: "Day-to-day tooling", items: ["Visual Studio", "Visual Studio Code", "Git"] },
  { name: "Concepts & Methodologies", icon: "Workflow", blurb: "How I work", items: ["SDLC", "Agile", "Debugging", "Database Optimization", "CRUD Operations"] },
];

export const education = {
  degree: "B.Tech, Electronics & Communication Engineering",
  school: "JNTU College of Engineering, Anantapur",
  period: "2020 – 2024",
  gpa: "",
};

export const certifications = ["Embedded Systems and IoT Intern (EDGATE)"];

export const honors = ["Recognized as Future Skill Expert Trainer", "Academic project certified by IEEE"];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "architecture", label: "Architecture" },
  { id: "skills", label: "Skills" },
  { id: "impact", label: "Highlights" },
  { id: "assistant", label: "Ask Me" },
  { id: "contact", label: "Contact" },
];
