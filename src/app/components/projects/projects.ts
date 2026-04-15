
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
      description: 'A developer-first low-code platform designed for speed, flexibility, and enterprise-grade scalability.',
      tech: ['Angular', 'TypeScript', 'REST APIs', 'Form.io', 'Syncfusion'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      color: '#f3f4f6'
    },
    {
      id: 2,
      title: 'Bank Loan Portal',
      description: 'A customer-facing loan application portal designed to streamline loan requests.',
      tech: ['Angular', 'TypeScript', 'RxJS', 'RESTful APIs'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
      color: '#ffffff'
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
      id: 6,
      title: 'Developer Portfolio',
      description: 'Modern portfolio with animations and smooth UI.',
      tech: ['Angular', 'Tailwind', 'AOS'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      color: '#f9fafb'
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

