import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SmoothScrollService } from '../../core/smooth-scroll.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About implements AfterViewInit, OnDestroy {
  profileImage = 'assets/images/profile.png';
  timelineProgress = 0;
  orbTop = 0;
  activeExpIndex = 0;
  carouselIndex = 0;

  setActiveExp(i: number) {
    this.activeExpIndex = i;
  }
  nextCarousel() {
    this.carouselIndex = (this.carouselIndex + 1) % this.experiences.length;
  }
  prevCarousel() {
    this.carouselIndex =
      (this.carouselIndex - 1 + this.experiences.length) %
      this.experiences.length;
  }
  goCarousel(i: number) {
    this.carouselIndex = i;
  }

  private detachScroll: (() => void) | null = null;
  private readonly isBrowser: boolean;

  @ViewChild('timelineTrack') timelineTrack!: ElementRef;

  experiences = [
    {
      period: 'OCT 2025 – PRESENT',
      company: 'APC Global Cpk Systems',
      role: 'Senior Angular Developer',
      location: 'Melbourne, Australia',
      type: 'Remote',
      points: [
        { text: 'Owning the complete frontend lifecycle, from <strong>UI design to development to testing</strong>, as the sole frontend lead.' },
        { text: 'Upgraded a legacy dashboard from <strong>Angular 6 to Angular 21</strong>, migrating to modern component architecture and resolving third-party library conflicts blocking the update.' },
        { text: 'Optimized application <strong>performance and code quality</strong> through refactoring, lazy loading, and adopting Angular best practices.' },
        { text: 'Collaborating closely with the <strong>product team</strong> to translate business requirements into fully functional features.' },
        { text: 'Expanding into <strong>backend review</strong>, analyzing C#/.NET architecture, database views, and stored procedures to improve full-stack alignment.' }
      ],
      skills: ['Angular 21', 'TypeScript', 'RxJS', 'REST APIs', 'C#', '.NET', 'SQL', 'Syncfusion', 'Node.js', 'Express.js', 'MongoDB']
    },
    {
      period: 'SEP 2022 – OCT 2025',
      company: 'Techextensor',
      role: 'Front-End Developer',
      location: 'Ahmedabad, India',
      type: 'Full-time (On-site)',
      points: [
        { text: 'Developed a scalable <strong>low-code platform</strong> using Syncfusion and Form.io, with standardized reusable components for rapid app generation.' },
        { text: 'Built dynamic <strong>data analysis</strong> and customer-facing loan platforms with real-time validations and responsive UIs.' },
        { text: 'Integrated <strong>SQL procedures</strong> for efficient backend data handling and seamless frontend-backend communication.' },
        { text: 'Developed <strong>CRM and project management</strong> modules, enhancing workflow visibility and client interaction.' },
        { text: 'Conducted <strong>code reviews</strong> and followed Angular best practices in an <strong>Agile</strong> environment.' }
      ],
      skills: ['Angular', 'TypeScript', 'Syncfusion', 'Form.io', 'RxJS', 'REST APIs', 'SQL', 'Agile']
    },
    {
      period: 'JAN 2022 – JUN 2022',
      company: 'Codezee Solutions',
      role: 'Web Designer',
      location: 'Surat, India',
      type: 'Internship (On-site)',
      points: [
        { text: 'Converted <strong>Figma designs</strong> into responsive, cross-browser web pages using HTML, CSS, and JavaScript.' },
        { text: 'Utilized <strong>Bootstrap and Tailwind CSS</strong> to build modern, mobile-friendly UI components.' },
        { text: 'Focused on <strong>performance optimization</strong> and accessibility across devices.' }
      ],
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Tailwind CSS', 'Figma']
    }
  ];

  constructor(
    private ngZone: NgZone,
    private smoothScroll: SmoothScrollService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    // Subscribe to the global smooth-scroll loop instead of spinning up our
    // own Lenis instance — multiple Lenis owners produce jitter and duplicate
    // RAF loops.
    this.ngZone.runOutsideAngular(() => {
      this.detachScroll = this.smoothScroll.onScroll(() =>
        this.updateTimeline(),
      );
      this.updateTimeline();
    });
  }

  ngOnDestroy() {
    this.detachScroll?.();
  }

  scrollTo(section: string, event?: Event) {
    if (event) event.preventDefault();
    this.smoothScroll.scrollTo(section);
  }

  private updateTimeline() {
    if (!this.timelineTrack) return;

    const track = this.timelineTrack.nativeElement as HTMLElement;
    const rect = track.getBoundingClientRect();
    const trackHeight = rect.height;
    const viewportCenter = window.innerHeight / 2;
    const progressPx = viewportCenter - rect.top;
    const progress = Math.min(
      100,
      Math.max(0, (progressPx / trackHeight) * 100),
    );

    this.ngZone.run(() => {
      this.timelineProgress = progress;
      this.orbTop = Math.min(trackHeight, Math.max(0, progressPx));
    });
  }
}
