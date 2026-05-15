import {
  Injectable,
  NgZone,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';

/**
 * Single global owner of Lenis smooth scroll.
 *
 * Why a service: Lenis must run on exactly one RAF loop attached to one element
 * (the window). Initializing it inside individual components produces duplicate
 * loops, jitter, and broken anchor scrolling.
 */
@Injectable({ providedIn: 'root' })
export class SmoothScrollService implements OnDestroy {
  private lenis: Lenis | null = null;
  private rafId: number | null = null;
  private readonly isBrowser: boolean;
  private prefersReduced = false;

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  init(): void {
    if (!this.isBrowser || this.lenis) return;

    this.prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (this.prefersReduced) {
      document.documentElement.classList.add('reduced-motion');
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        lerp: 0.09,
      });

      const raf = (time: number) => {
        this.lenis?.raf(time);
        this.rafId = requestAnimationFrame(raf);
      };
      this.rafId = requestAnimationFrame(raf);
    });
  }

  scrollTo(target: HTMLElement | string, offset = 0, duration = 1.4): void {
    if (!this.isBrowser) return;

    const el =
      typeof target === 'string' ? document.getElementById(target) : target;
    if (!el) return;

    if (this.lenis && !this.prefersReduced) {
      this.lenis.scrollTo(el, { offset, duration });
    } else {
      el.scrollIntoView({
        behavior: this.prefersReduced ? 'auto' : 'smooth',
      });
    }
  }

  onScroll(cb: () => void): () => void {
    if (!this.isBrowser) return () => {};

    if (this.lenis) {
      this.lenis.on('scroll', cb);
      return () => this.lenis?.off('scroll', cb);
    }
    window.addEventListener('scroll', cb, { passive: true });
    return () => window.removeEventListener('scroll', cb);
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.lenis?.destroy();
    this.lenis = null;
    this.rafId = null;
  }
}
