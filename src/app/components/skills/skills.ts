import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

interface Skill {
  name: string;
  category: string;
  level: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills implements OnInit {
  skills: Skill[] = [
    { name: 'Angular', category: 'Frontend', level: 95 },
    { name: 'Node.js', category: 'Backend', level: 85 },
    { name: 'TypeScript', category: 'Language', level: 90 },
    { name: 'RxJS', category: 'State', level: 90 },
    { name: 'NgRx', category: 'State', level: 85 },
    { name: 'JavaScript', category: 'Language', level: 95 },
    { name: 'HTML', category: 'Frontend', level: 98 },
    { name: 'CSS', category: 'Frontend', level: 95 },
    { name: 'C#', category: 'Backend', level: 80 },
    { name: '.NET', category: 'Backend', level: 80 },
    { name: 'Express.js', category: 'Backend', level: 85 },
    { name: 'React', category: 'Frontend', level: 75 },
    { name: 'Tailwind CSS', category: 'Frontend', level: 95 },
    { name: 'MongoDB', category: 'Database', level: 80 },
  ];

  // Duplicate for seamless loop
  get doubledSkills(): Skill[] {
    return [...this.skills, ...this.skills];
  }

  get doubledSkillsReversed(): Skill[] {
    return [...this.skills, ...this.skills].reverse();
  }

  ngOnInit(): void {
    AOS.refresh();
  }
}