import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PROJECTS, Project } from './projects.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class Projects implements OnInit, OnDestroy {
  projects: Project[] = PROJECTS;
  activeIndex = signal(0);
  activeImageIndex = signal(0);
  progress = signal(0);
  isPaused = signal(false);

  private isBrowser: boolean;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private readonly DURATION = 6000;
  private readonly TICK = 50;
  private elapsed = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.startAutoplay();
    }
  }

  ngOnDestroy(): void {
    this.clearAutoplay();
  }

  get activeProject(): Project {
    return this.projects[this.activeIndex()];
  }

  selectProject(i: number): void {
    if (this.activeIndex() === i) return;
    this.activeIndex.set(i);
    this.activeImageIndex.set(0);
    this.resetTimer();
  }

  selectImage(i: number): void {
    this.activeImageIndex.set(i);
    this.resetTimer();
  }

  pause(): void {
    this.isPaused.set(true);
    this.clearAutoplay();
  }

  resume(): void {
    this.isPaused.set(false);
    this.startAutoplay();
  }

  private startAutoplay(): void {
    if (this.intervalId) return;
    this.elapsed = 0;
    this.progress.set(0);

    this.intervalId = setInterval(() => {
      this.elapsed += this.TICK;
      this.progress.set((this.elapsed / this.DURATION) * 100);

      if (this.elapsed >= this.DURATION) {
        this.elapsed = 0;
        this.progress.set(0);
        const next = (this.activeIndex() + 1) % this.projects.length;
        this.activeIndex.set(next);
        this.activeImageIndex.set(0);
      }
    }, this.TICK);
  }

  private clearAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private resetTimer(): void {
    this.elapsed = 0;
    this.progress.set(0);
    this.clearAutoplay();
    if (!this.isPaused()) {
      this.startAutoplay();
    }
  }

  getIndex(i: number): string {
    return i < 9 ? '0' + (i + 1) : i + 1 + '';
  }
}
