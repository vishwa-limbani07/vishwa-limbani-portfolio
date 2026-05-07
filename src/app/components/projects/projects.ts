import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  images: string[];
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
export class Projects implements OnInit, AfterViewInit, OnDestroy {

  projects: Project[] = [
    {
      id: 1,
      title: 'Nexus',
      description: 'A full-featured project management system with Kanban boards, drag-and-drop task tracking, squad management, real-time search, and five interactive analytics charts — built to demonstrate modern frontend architecture and scalable UI patterns.',
      tech: ['React 18', 'Vite', 'TailwindCSS', 'Zustand', 'React Query', 'Recharts'],
      images: [
        '/assets/images/projects/nexus/nexus_1.png',
        '/assets/images/projects/nexus/nexus_2.png',
        '/assets/images/projects/nexus/nexus_3.png',
        '/assets/images/projects/nexus/nexus_4.png',
      ],
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
      images: [
        '/assets/images/projects/collabboard/collabboard_1.png',
        '/assets/images/projects/collabboard/collabboard_2.png',
        '/assets/images/projects/collabboard/collabboard_3.png',
        '/assets/images/projects/collabboard/collabboard_4.png',
      ],
      color: '#ffffff',
      liveUrl: 'https://collabboard-chi.vercel.app/',
      githubUrl: 'https://github.com/vishwa-limbani07/collabboard'
    },
    {
      id: 3,
      title: 'Viroza',
      description: 'A self-service analytics dashboard that turns raw CSV/JSON data into interactive charts. Features a visual chart builder, server-side aggregation, AI-powered natural language queries via Google Gemini, and a real-time live data feed over SSE.',
      tech: ['Angular 21', 'Node.js', 'Chart.js', 'Google Gemini AI', 'MongoDB', 'SSE'],
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      ],
      color: '#f9fafb',
      liveUrl: 'https://insighthub-cyan.vercel.app/',
      githubUrl: 'https://github.com/vishwa-limbani07/insighthub'
    },
    {
      id: 4,
      title: 'Portfolio',
      description: 'This portfolio — a handcrafted developer showcase built with Angular 21, SSR, and Tailwind CSS. Features fluid clamp-based typography, scroll-triggered animations, a fully responsive layout, and smooth Lenis scrolling across all breakpoints.',
      tech: ['Angular 21', 'TailwindCSS', 'TypeScript', 'AOS', 'Lenis', 'SSR'],
      images: [
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80',
      ],
      color: '#f3f4f6',
      liveUrl: 'https://vishwa-limbani.vercel.app',
      githubUrl: 'https://github.com/vishwa-limbani07/vishwa-limbani-portfolio'
    }
  ];

  activeIndices: number[] = [];
  progressPercents: number[] = [];

  private intervals: ReturnType<typeof setInterval>[] = [];
  private readonly DURATION = 3000;
  private readonly TICK = 50;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngOnInit(): Promise<void> {
    this.activeIndices = this.projects.map(() => 0);
    this.progressPercents = this.projects.map(() => 0);
    if (this.isBrowser) {
      const AOS = (await import('aos')).default;
      AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });
    }
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.isBrowser) {
      const AOS = (await import('aos')).default;
      setTimeout(() => AOS.refresh(), 100);
      this.startAllAutoPlay();
    }
  }

  ngOnDestroy(): void {
    this.intervals.forEach(id => clearInterval(id));
  }

  setActiveImage(pi: number, ii: number): void {
    this.activeIndices[pi] = ii;
    this.pauseAutoPlay(pi);
    this.resumeAutoPlay(pi);
  }

  onImageMouseEnter(pi: number): void {
    this.pauseAutoPlay(pi);
  }

  onImageMouseMove(event: MouseEvent): void {
    const wrap = event.currentTarget as HTMLElement;
    const rect = wrap.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
    const activeImg = wrap.querySelector<HTMLElement>('.project-img--active');
    if (activeImg) {
      activeImg.style.transform = `scale(1.07) translate(${x}px, ${y}px)`;
    }
  }

  onImageMouseLeave(event: MouseEvent, pi: number): void {
    const wrap = event.currentTarget as HTMLElement;
    wrap.querySelectorAll<HTMLElement>('.project-img').forEach(img => {
      img.style.transform = '';
    });
    this.resumeAutoPlay(pi);
  }

  pauseAutoPlay(pi: number): void {
    clearInterval(this.intervals[pi]);
    this.progressPercents[pi] = 0;
  }

  resumeAutoPlay(pi: number): void {
    const project = this.projects[pi];
    if (project.images.length <= 1) return;

    let elapsed = 0;
    this.progressPercents[pi] = 0;

    this.intervals[pi] = setInterval(() => {
      elapsed += this.TICK;
      this.progressPercents[pi] = Math.min((elapsed / this.DURATION) * 100, 100);

      if (elapsed >= this.DURATION) {
        elapsed = 0;
        this.progressPercents[pi] = 0;
        this.activeIndices[pi] = (this.activeIndices[pi] + 1) % project.images.length;
      }
    }, this.TICK);
  }

  private startAllAutoPlay(): void {
    this.projects.forEach((_, i) => this.resumeAutoPlay(i));
  }

  getIndex(i: number): string {
    return i < 9 ? '0' + (i + 1) : (i + 1).toString();
  }
}
