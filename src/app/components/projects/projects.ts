
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
      description: 'Insurance claim investigation platform with complex multi-step workflows, role-based access, dynamic dashboards, and automated reporting for enterprise teams.',
      tech: ['Angular 13', 'TypeScript', 'Syncfusion', 'RxJS'],
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
      color: '#f9fafb',
      liveUrl: '#',
      githubUrl: '#'
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
