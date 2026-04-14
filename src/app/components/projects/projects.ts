import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

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
export class Projects implements OnInit {
  projects: Project[] = [
    {
      id: 1,
      title: 'TechAppForce',
      description: 'A developer-first low-code platform designed for speed, flexibility, and enterprise-grade scalability. Eliminate repetitive coding and bring ideas to life faster.',
      tech: ['Angular', 'TypeScript', 'REST APIs', 'Form.io', 'Syncfusion'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
      color: '#f3f4f6'
    },
    {
      id: 2,
      title: 'Bank Loan Portal',
      description: 'A customer-facing loan application portal designed to streamline loan requests and processing through an intuitive, responsive interface.',
      tech: ['Angular', 'TypeScript', 'RxJS', 'RESTful APIs', 'Microservices'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop',
      color: '#ffffff'
    },
    {
      id: 3,
      title: 'Phoenix',
      description: 'An all-in-one insurance claim investigation platform handling Medical, Accident, and other claim types with complex workflows.',
      tech: ['Angular 13', 'TypeScript', 'Syncfusion', 'RESTful APIs'],
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop',
      color: '#f9fafb'
    },
    {
      id: 4,
      title: 'Project Management & CRM',
      description: 'A web platform for managing client projects and relationships, enabling better visibility, communication, and tracking of deliverables.',
      tech: ['Angular', 'TypeScript', 'RESTful APIs', 'Git', 'Agile'],
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop',
      color: '#f3f4f6'
    },
    {
      id: 5,
      title: 'Data Analysis Platform',
      description: 'Dynamic data analysis tool built with real-time validations and responsive UIs for comprehensive business intelligence.',
      tech: ['Angular', 'TypeScript', 'SQL', 'Syncfusion', 'RxJS'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      color: '#ffffff'
    },
    {
      id: 6,
      title: 'Developer Portfolio',
      description: 'A high-performance, minimalist portfolio showcasing frontend engineering work with smooth animations and modern design.',
      tech: ['Angular', 'Tailwind CSS', 'TypeScript', 'AOS'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
      color: '#f9fafb'
    }
  ];

  getIndex(i: number): string {
    return '0' + (i + 1);
  }

  ngOnInit(): void {
    AOS.refresh();
  }
}