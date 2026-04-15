import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

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
export class Skills implements OnInit, AfterViewInit {

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

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
    { name: 'MongoDB', category: 'Database', level: 80 }
  ];

  // Duplicate for seamless loop
  get doubledSkills(): Skill[] {
    return [...this.skills, ...this.skills];
  }

  get doubledSkillsReversed(): Skill[] {
    return [...this.skills, ...this.skills].reverse();
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
}

