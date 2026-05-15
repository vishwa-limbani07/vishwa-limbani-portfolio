import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Drop-in scroll reveal — adds `.reveal` baseline (hidden state) and `.reveal-in`
 * when the element enters the viewport. Animations are defined globally in
 * styles.css. Respects prefers-reduced-motion.
 *
 * Usage:
 *   <div appReveal>...</div>
 *   <div appReveal="up" [revealDelay]="120">...</div>
 *
 * Variants: 'up' (default) | 'fade' | 'left' | 'right' | 'zoom'
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input('appReveal') variant: 'up' | 'fade' | 'left' | 'right' | 'zoom' | '' =
    'up';
  @Input() revealDelay = 0;
  @Input() revealOnce = true;
  @Input() revealMargin = '0px 0px -8% 0px';

  private observer?: IntersectionObserver;
  private readonly isBrowser: boolean;

  constructor(
    private host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    const node = this.host.nativeElement;
    const v = this.variant || 'up';

    node.classList.add('reveal', `reveal--${v}`);
    if (this.revealDelay) {
      node.style.setProperty('--reveal-delay', `${this.revealDelay}ms`);
    }

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      node.classList.add('reveal-in');
      return;
    }

    // If the element is already past the viewport top (page restored at a
    // mid-scroll position), reveal immediately — IntersectionObserver only
    // fires when an element enters from below, never retroactively.
    const rect = node.getBoundingClientRect();
    if (rect.bottom <= window.innerHeight && rect.top < 0) {
      node.classList.add('reveal-in');
      return;
    }
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Already partially in view at mount — reveal without animation delay.
      requestAnimationFrame(() => node.classList.add('reveal-in'));
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            if (this.revealOnce) this.observer?.unobserve(entry.target);
          } else if (!this.revealOnce) {
            entry.target.classList.remove('reveal-in');
          }
        }
      },
      { rootMargin: this.revealMargin, threshold: 0.08 },
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
