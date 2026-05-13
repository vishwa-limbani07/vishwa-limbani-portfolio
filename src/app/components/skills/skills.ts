import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  ElementRef
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
export class Skills implements OnInit, AfterViewInit, OnDestroy {

  private isBrowser: boolean;
  private dkObserver?: IntersectionObserver;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private host: ElementRef<HTMLElement>
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  skills: Skill[] = [
    { name: 'Angular',      category: 'Frontend', level: 95 },
    { name: 'TypeScript',   category: 'Language', level: 90 },
    { name: 'JavaScript',   category: 'Language', level: 95 },
    { name: 'Node.js',      category: 'Backend',  level: 85 },
    { name: 'RxJS',         category: 'State',    level: 90 },
    { name: 'NgRx',         category: 'State',    level: 85 },
    { name: 'HTML',         category: 'Frontend', level: 98 },
    { name: 'CSS',          category: 'Frontend', level: 95 },
    { name: 'Tailwind CSS', category: 'Frontend', level: 95 },
    { name: 'React',        category: 'Frontend', level: 75 },
    { name: 'C#',           category: 'Backend',  level: 80 },
    { name: '.NET',         category: 'Backend',  level: 80 },
    { name: 'Express.js',   category: 'Backend',  level: 85 },
    { name: 'MongoDB',      category: 'Database', level: 80 },
  ];

  /** Skills grouped by category, in first-seen order. */
  get skillCategories(): { name: string; skills: Skill[] }[] {
    const map = new Map<string, Skill[]>();
    for (const s of this.skills) {
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category)!.push(s);
    }
    return Array.from(map.entries()).map(([name, skills]) => ({ name, skills }));
  }

  // ── Devicon SVGs (used as mask-image so we can recolour via background) ──
  private readonly iconBase = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';
  private readonly iconMap: Record<string, string> = {
    'Angular':      'angularjs/angularjs-plain.svg',
    'TypeScript':   'typescript/typescript-plain.svg',
    'JavaScript':   'javascript/javascript-plain.svg',
    'Node.js':      'nodejs/nodejs-plain.svg',
    'HTML':         'html5/html5-plain.svg',
    'CSS':          'css3/css3-plain.svg',
    'Tailwind CSS': 'tailwindcss/tailwindcss-original.svg',
    'React':        'react/react-original.svg',
    'C#':           'csharp/csharp-plain.svg',
    '.NET':         'dotnetcore/dotnetcore-plain.svg',
    'Express.js':   'express/express-original.svg',
    'MongoDB':      'mongodb/mongodb-plain.svg',
  };

  skillIcon(name: string): string {
    return this.iconMap[name] ? this.iconBase + this.iconMap[name] : '';
  }

  iconMaskUrl(name: string): string {
    const url = this.skillIcon(name);
    return url ? `url("${url}")` : '';
  }

  /** Letter badge shown when no Devicon exists (RxJS, NgRx). */
  iconFallback(name: string): string {
    const map: Record<string, string> = { 'RxJS': 'Rx', 'NgRx': 'Ng' };
    return map[name] ?? name.slice(0, 2).toUpperCase();
  }

  /** Per-skill brand colour shown on hover. */
  brandColor(name: string): string {
    const map: Record<string, string> = {
      'Angular':      '#DD0031',
      'TypeScript':   '#3178C6',
      'JavaScript':   '#F7DF1E',
      'Node.js':      '#5FA04E',
      'HTML':         '#E34F26',
      'CSS':          '#1572B6',
      'Tailwind CSS': '#06B6D4',
      'React':        '#61DAFB',
      'C#':           '#9B4F96',
      '.NET':         '#512BD4',
      'Express.js':   '#E5E5E5',
      'MongoDB':      '#47A248',
      'RxJS':         '#E91E63',
      'NgRx':         '#BA2BD2',
    };
    return map[name] ?? '#FFFFFF';
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
      this.observeDarkGrid();
    }
  }

  /**
   * One-time entrance trigger for the dark grid.
   * Adds `.dk-animated` to the wrap exactly once when it first enters the
   * viewport, then disconnects. The class is added via raw classList (not
   * Angular binding) so change detection can never strip it, and we never
   * call .remove() — so the items can never disappear once they've appeared.
   */
  private observeDarkGrid(): void {
    const wrap = this.host.nativeElement.querySelector('.dk-wrap');
    if (!wrap) return;

    if (typeof IntersectionObserver === 'undefined') {
      wrap.classList.add('dk-animated');
      return;
    }

    this.dkObserver = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('dk-animated');
          obs.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0 });

    this.dkObserver.observe(wrap);
  }

  ngOnDestroy(): void {
    this.dkObserver?.disconnect();
  }
}
