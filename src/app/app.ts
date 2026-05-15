import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Home } from './pages/home/home';
import { SmoothScrollService } from './core/smooth-scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  protected readonly title = signal('vishwa-limbani-portfolio');

  @ViewChild('progressBar', { static: true })
  progressBar!: ElementRef<HTMLDivElement>;

  private readonly isBrowser: boolean;
  private detachScroll: (() => void) | null = null;

  constructor(
    private smoothScroll: SmoothScrollService,
    private zone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.smoothScroll.init();
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.zone.runOutsideAngular(() => {
      const bar = this.progressBar?.nativeElement;

      const update = () => {
        if (!bar) return;
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? window.scrollY / max : 0;
        bar.style.transform = `scaleX(${ratio})`;
      };

      this.detachScroll = this.smoothScroll.onScroll(update);
      update();
    });
  }

  ngOnDestroy(): void {
    this.detachScroll?.();
  }
}
