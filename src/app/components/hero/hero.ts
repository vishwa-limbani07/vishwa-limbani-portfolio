import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { SmoothScrollService } from '../../core/smooth-scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements OnInit, OnDestroy {
  // Rotating role line
  roles = ['Fullstack Developer', 'Angular Specialist', 'UI Architect', 'Product Builder'];
  roleIndex = 0;

  // Deck card rotation (0 = profile, 1 = stats, 2 = location)
  deckIndex = 0;

  // Live local time (Pune, IN)
  localTime = '';
  location = 'Gujarat, India';
  timezone = 'Asia/Kolkata';

  // What you're currently shipping
  currentlyBuilding = 'Enterprise platforms @ Banao Technologies';

  // Headline stats
  stats = [
    { value: '3+', label: 'Years' },
    { value: '20+', label: 'Projects' },
    { value: '15+', label: 'Tech' },
  ];

  // Tech marquee — duplicated in template for seamless scroll
  techStack = [
    'TYPESCRIPT', 'ANGULAR', 'REACT', 'NODE.JS', 'TAILWIND',
    'POSTGRESQL', 'GSAP', 'AWS', 'FIGMA', 'GIT',
  ];

  private roleInterval?: ReturnType<typeof setInterval>;
  private timeInterval?: ReturnType<typeof setInterval>;
  private deckInterval?: ReturnType<typeof setInterval>;
  private dragStartX = 0;
  private boundDragMove: ((e: MouseEvent | TouchEvent) => void) | null = null;
  private boundDragEnd: ((e: MouseEvent | TouchEvent) => void) | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private zone: NgZone,
    private smoothScroll: SmoothScrollService,
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.updateTime();
    this.timeInterval = setInterval(() => this.updateTime(), 30_000);

    this.roleInterval = setInterval(() => {
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
    }, 2600);

    this.startDeckAutoplay();
  }

  ngOnDestroy() {
    if (this.roleInterval) clearInterval(this.roleInterval);
    if (this.timeInterval) clearInterval(this.timeInterval);
    if (this.deckInterval) clearInterval(this.deckInterval);
  }

  private startDeckAutoplay() {
    if (this.deckInterval) clearInterval(this.deckInterval);
    this.zone.runOutsideAngular(() => {
      this.deckInterval = setInterval(() => {
        this.zone.run(() => {
          this.deckIndex = (this.deckIndex + 1) % 3;
        });
      }, 2500);
    });
  }

  onDeckDragStart(e: MouseEvent | TouchEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    this.dragStartX = this.getClientX(e);

    this.boundDragMove = (ev: MouseEvent | TouchEvent) => this.onDeckDragMove(ev);
    this.boundDragEnd = (ev: MouseEvent | TouchEvent) => this.onDeckDragEnd(ev);

    document.addEventListener('mousemove', this.boundDragMove as EventListener);
    document.addEventListener('mouseup', this.boundDragEnd as EventListener);
    document.addEventListener('touchmove', this.boundDragMove as EventListener, { passive: true });
    document.addEventListener('touchend', this.boundDragEnd as EventListener);
  }

  private onDeckDragMove(_e: MouseEvent | TouchEvent) {}

  private onDeckDragEnd(e: MouseEvent | TouchEvent) {
    const dx = this.getClientX(e) - this.dragStartX;
    const threshold = 40;

    if (Math.abs(dx) > threshold) {
      if (dx > 0) {
        this.deckIndex = (this.deckIndex + 1) % 3;
      } else {
        this.deckIndex = (this.deckIndex + 2) % 3;
      }
      this.startDeckAutoplay();
    }

    if (this.boundDragMove) {
      document.removeEventListener('mousemove', this.boundDragMove as EventListener);
      document.removeEventListener('touchmove', this.boundDragMove as EventListener);
    }
    if (this.boundDragEnd) {
      document.removeEventListener('mouseup', this.boundDragEnd as EventListener);
      document.removeEventListener('touchend', this.boundDragEnd as EventListener);
    }
    this.boundDragMove = null;
    this.boundDragEnd = null;
  }

  private getClientX(e: MouseEvent | TouchEvent): number {
    return 'touches' in e
      ? (e.touches[0]?.clientX ?? (e as TouchEvent).changedTouches[0]?.clientX ?? 0)
      : (e as MouseEvent).clientX;
  }

  private updateTime() {
    const now = new Date();
    this.localTime = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: this.timezone,
    });
  }

  scrollTo(section: string) {
    this.smoothScroll.scrollTo(section);
  }

  async downloadResume(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const response = await fetch('assets/resume/resume.pdf');
      if (!response.ok) throw new Error(`Resume not found (${response.status})`);

      const blob    = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Vishwa-Limbani-Resume.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (err) {
      console.error('Resume download failed:', err);
      window.open('assets/resume/resume.pdf', '_blank');
    }
  }
}
