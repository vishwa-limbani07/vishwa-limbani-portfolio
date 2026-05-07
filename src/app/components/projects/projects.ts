
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
  liveUrl?: string;
  githubUrl?: string;
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
      title: 'TechAppForce',
      description: 'A developer-first low-code platform designed for speed, flexibility, and enterprise-grade scalability. Built complex dynamic forms, data grids, and multi-step workflows.',
      tech: ['Angular', 'TypeScript', 'REST APIs', 'Form.io', 'Syncfusion'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
      color: '#f3f4f6',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Bank Loan Portal',
      description: 'A customer-facing loan application portal designed to streamline loan requests and approvals with real-time validations, document uploads, and status tracking.',
      tech: ['Angular', 'TypeScript', 'RxJS', 'RESTful APIs'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
      color: '#ffffff',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Phoenix',
      description: 'Insurance claim investigation platform with complex workflows.',
      tech: ['Angular 13', 'TypeScript', 'Syncfusion'],
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
      color: '#f9fafb'
    },
    {
      id: 4,
      title: 'Project Management & CRM',
      description: 'Platform for managing projects and client relationships.',
      tech: ['Angular', 'TypeScript', 'REST APIs'],
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12',
      color: '#f3f4f6'
    },
    {
      id: 5,
      title: 'Data Analysis Platform',
      description: 'Dynamic tool with real-time validations and dashboards.',
      tech: ['Angular', 'SQL', 'RxJS'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      color: '#ffffff'
    },
    {
      id: 7,
      title: 'ProjectNest',
      description: 'A comprehensive project management system for teams to organize tasks, track progress, and collaborate efficiently.',
      tech: ['Angular', 'Node.js', 'MongoDB', 'Socket.io'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71',
      color: '#f3f4f6'
    },
    {
      id: 8,
      title: 'CollabBoard',
      description: 'An interactive whiteboard application allowing users to draw, add sticky notes, and share collaborative sessions in real-time.',
      tech: ['Angular', 'Canvas API', 'WebSockets', 'Fabric.js'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      color: '#ffffff'
    }
  ];

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngOnInit(): Promise<void> {
    if (this.isBrowser) {
      const AOS = (await import('aos')).default;
      AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out'
      });
    }
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.isBrowser) {
      const AOS = (await import('aos')).default;
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }

  getIndex(i: number): string {
    return i < 9 ? '0' + (i + 1) : (i + 1).toString();
  }
}
