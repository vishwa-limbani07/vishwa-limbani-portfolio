import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  color: string;
  liveUrl: string;
  githubUrl: string;
  githubBackendUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects implements OnInit, AfterViewInit {

  projects: Project[] = [
    {
      id: 1,
      title: 'Nexus',
      description: 'A full-featured project management system with Kanban boards, drag-and-drop task tracking, squad management, real-time search, and five interactive analytics charts — built to demonstrate modern frontend architecture and scalable UI patterns.',
      tech: ['React 18', 'Vite', 'TailwindCSS', 'Zustand', 'React Query', 'Recharts'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80',
      color: '#f3f4f6',
      liveUrl: 'https://projectnest-io.vercel.app/',
      githubUrl: 'https://github.com/vishwa-limbani07/pms-frontend',
      githubBackendUrl: 'https://github.com/vishwa-limbani07/pms-backend'
    },
    {
      id: 2,
      title: 'CollabBoard',
      description: 'A real-time collaborative whiteboard where teams draw, sketch, and brainstorm together. Features live cursors, sticky notes, board persistence in MongoDB, undo/redo, zoom/pan, and one-click PNG export.',
      tech: ['Angular 17', 'NestJS', 'MongoDB', 'Socket.io', 'Canvas API', 'JWT'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
      color: '#ffffff',
      liveUrl: 'https://collabboard-chi.vercel.app/',
      githubUrl: 'https://github.com/vishwa-limbani07/collabboard'
    },
    {
      id: 3,
      title: 'Viroza',
      description: 'A self-service analytics dashboard that turns raw CSV/JSON data into interactive charts. Features a visual chart builder, server-side aggregation, AI-powered natural language queries via Google Gemini, and a real-time live data feed over SSE.',
      tech: ['Angular 21', 'Node.js', 'Chart.js', 'Google Gemini AI', 'MongoDB', 'SSE'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      color: '#f9fafb',
      liveUrl: 'https://insighthub-cyan.vercel.app/',
      githubUrl: 'https://github.com/vishwa-limbani07/insighthub'
    },
    {
      id: 4,
      title: 'Portfolio',
      description: 'This portfolio — a handcrafted developer showcase built with Angular 21, SSR, and Tailwind CSS. Features fluid clamp-based typography, scroll-triggered animations, a fully responsive layout, and smooth Lenis scrolling across all breakpoints.',
      tech: ['Angular 21', 'TailwindCSS', 'TypeScript', 'AOS', 'Lenis', 'SSR'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80',
      color: '#f3f4f6',
      liveUrl: 'https://vishwa-limbani.vercel.app',
      githubUrl: 'https://github.com/vishwa-limbani07/vishwa-limbani-portfolio'
    }
  ];

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngOnInit(): Promise<void> {
    if (this.isBrowser) {
      const AOS = (await import('aos')).default;
      AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });
    }
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.isBrowser) {
      const AOS = (await import('aos')).default;
      setTimeout(() => AOS.refresh(), 100);
    }
  }

  getIndex(i: number): string {
    return i < 9 ? '0' + (i + 1) : (i + 1).toString();
  }
}
