export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  images: string[];
  color: string;
  liveUrl: string;
  githubUrl: string;
  githubBackendUrl?: string;
  year?: string;
  role?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Nexus',
    description:
      'A full-featured project management system with Kanban boards, drag-and-drop task tracking, squad management, real-time search, and five interactive analytics charts, built to demonstrate modern frontend architecture and scalable UI patterns.',
    tech: ['React 18', 'Vite', 'TailwindCSS', 'Zustand', 'React Query', 'Recharts'],
    images: [
      '/assets/images/projects/nexus/nexus1.png',
      '/assets/images/projects/nexus/nexus2.png',
      '/assets/images/projects/nexus/nexus3.png',
      '/assets/images/projects/nexus/nexus4.png',
      '/assets/images/projects/nexus/nexus5.png',
    ],
    color: '#6366f1',
    liveUrl: 'https://projectnest-io.vercel.app/',
    githubUrl: 'https://github.com/vishwa-limbani07/pms-frontend',
    githubBackendUrl: 'https://github.com/vishwa-limbani07/pms-backend',
    year: '2025',
    role: 'Full-stack',
  },
  {
    id: 2,
    title: 'CollabBoard',
    description:
      'A real-time collaborative whiteboard where teams draw, sketch, and brainstorm together. Features live cursors, sticky notes, board persistence in MongoDB, undo/redo, zoom/pan, and one-click PNG export.',
    tech: ['Angular 17', 'NestJS', 'MongoDB', 'Socket.io', 'Canvas API', 'JWT'],
    images: [
      '/assets/images/projects/collabboard/collabboard_1.png',
      '/assets/images/projects/collabboard/collabboard_2.png',
      '/assets/images/projects/collabboard/collabboard_3.png',
      '/assets/images/projects/collabboard/collabboard_4.png',
    ],
    color: '#f59e0b',
    liveUrl: 'https://collabboard-chi.vercel.app/',
    githubUrl: 'https://github.com/vishwa-limbani07/collabboard',
    year: '2025',
    role: 'Full-stack',
  },
  {
    id: 3,
    title: 'Vizora',
    description:
      'A self-service analytics dashboard that turns raw CSV/JSON data into interactive charts. Features a visual chart builder, server-side aggregation, AI-powered natural language queries via Google Gemini, and a real-time live data feed over SSE.',
    tech: ['Angular 21', 'Node.js', 'Chart.js', 'Google Gemini AI', 'MongoDB', 'SSE'],
    images: [
      '/assets/images/projects/vizora/vizora_web_1.png',
      '/assets/images/projects/vizora/Vizora_web_2.png',
      '/assets/images/projects/vizora/Vizora_web_3.png',
      '/assets/images/projects/vizora/Vizora_web_4.png',
      '/assets/images/projects/vizora/Vizora_mobile_1.png',
    ],
    color: '#06b6d4',
    liveUrl: 'https://insighthub-cyan.vercel.app/',
    githubUrl: 'https://github.com/vishwa-limbani07/insighthub',
    year: '2025',
    role: 'Full-stack',
  },
  {
    id: 4,
    title: 'Portfolio',
    description:
      'This portfolio is a handcrafted developer showcase built with Angular 21, SSR, and Tailwind CSS. Features fluid clamp-based typography, scroll-triggered animations, a fully responsive layout, and smooth Lenis scrolling across all breakpoints.',
    tech: ['Angular 21', 'TailwindCSS', 'TypeScript', 'AOS', 'Lenis', 'SSR'],
    images: [
      '/assets/images/projects/portfolio/portfolio_1.png',
      '/assets/images/projects/portfolio/portfolio_2.png',
      '/assets/images/projects/portfolio/portfolio_3.png',
      '/assets/images/projects/portfolio/portfolio_4.png',
    ],
    color: '#10b981',
    liveUrl: 'https://vishwa-limbani.vercel.app',
    githubUrl: 'https://github.com/vishwa-limbani07/vishwa-limbani-portfolio',
    year: '2026',
    role: 'Frontend',
  },
  {
    id: 5,
    title: 'NexFlow',
    description:
      'A high-fidelity SaaS marketing website for an AI-powered workflow automation platform. Features GSAP scroll-triggered animations, a pinned multi-step "How It Works" section, interactive particle canvas with mouse-repel physics, custom cursor, animated stat counters, magnetic buttons, and a fully responsive floating pill navbar.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP 3', 'ScrollTrigger', 'Canvas API'],
    images: [
      '/assets/images/projects/nexflow/nexflow_1.png',
      '/assets/images/projects/nexflow/nexflow_2.png',
      '/assets/images/projects/nexflow/nexflow_3.png',
      '/assets/images/projects/nexflow/nexflow_4.png',
      '/assets/images/projects/nexflow/nexflow_5.png',
    ],
    color: '#f97316',
    liveUrl: 'https://nexflow-psi.vercel.app/',
    githubUrl: 'https://github.com/vishwa-limbani07/nexflow',
    year: '2025',
    role: 'Frontend',
  },
];
