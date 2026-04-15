import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements AfterViewInit, OnDestroy {
  profileImage = 'assets/images/profile.png';
  timelineProgress = 0;
  orbTop = 0;
  private lenis: Lenis | null = null;
  private rafId: number | null = null;
  private isBrowser: boolean;

  @ViewChild('timelineTrack') timelineTrack!: ElementRef;

  experiences = [
    {
      period: 'OCT 2025 – PRESENT',
      company: 'APC Global Cpk Systems',
      role: 'Senior Angular Developer',
      location: 'Melbourne, Australia',
      type: 'Remote',
      points: [
        { text: 'Owning the complete frontend lifecycle — from <strong>UI design to development to testing</strong> — as the sole frontend lead.' },
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
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      // Initialize Lenis smooth scroll
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      // On every Lenis scroll frame, update the timeline
      this.lenis.on('scroll', () => {
        this.updateTimeline();
      });

      // Start the animation loop
      const raf = (time: number) => {
        this.lenis?.raf(time);
        this.rafId = requestAnimationFrame(raf);
      };
      this.rafId = requestAnimationFrame(raf);
    });
  }

  ngOnDestroy() {
    if (!this.isBrowser) return;

    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.lenis?.destroy();
  }

  private updateTimeline() {
    if (!this.timelineTrack) return;

    const track = this.timelineTrack.nativeElement as HTMLElement;
    const rect = track.getBoundingClientRect();
    const trackHeight = rect.height;
    const viewportCenter = window.innerHeight / 2;
    const progressPx = viewportCenter - rect.top;
    const progress = Math.min(100, Math.max(0, (progressPx / trackHeight) * 100));

    this.ngZone.run(() => {
      this.timelineProgress = progress;
      this.orbTop = Math.min(trackHeight, Math.max(0, progressPx));
    });
  }
}