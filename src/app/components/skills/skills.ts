import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
  standalone: true,
})
export class Skills {
  skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'Angular',
    'React',
    'Node.js',
    'Express.js',
    'MongoDB',
    'Git',
    'GitHub',
    'Tailwind CSS',
    'Bootstrap',
    'Figma',
  ];
}
