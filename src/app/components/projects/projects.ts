import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [CommonModule,NgFor ],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  projects = [
    {
      name: 'Personal Portfolio',
      desc: 'A responsive portfolio website built with Angular and Tailwind CSS.',
      link: 'https://github.com/vishwalimbani/vishwa-limbani-portfolio',
      image: '/assets/projects/vishwa-limbani-portfolio.png',
    }]
}
