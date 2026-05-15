import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ─── EmailJS config ───────────────────────────────────────────────────────────
// 1. Sign up at https://emailjs.com (free)
// 2. Create a service (e.g. Gmail) → copy Service ID
// 3. Create an email template → copy Template ID
// 4. Go to Account → API Keys → copy Public Key
// Replace the three placeholder strings below with your real values.
const EMAILJS_SERVICE_ID  = 'service_wnhce05';
const EMAILJS_TEMPLATE_ID = 'template_c2yib6i';
const EMAILJS_PUBLIC_KEY  = 'cgHGqDumojSHBjyq1';

// Path to the resume file inside src/assets (Angular serves it from /assets/...)
// Update the extension if you upload a different file type (.pdf, .docx, etc.)
const RESUME_PATH     = 'assets/resume/resume.pdf';
const RESUME_FILENAME = 'Vishwa-Limbani-Resume.pdf';
// ─────────────────────────────────────────────────────────────────────────────

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements OnInit, AfterViewInit {
  private isBrowser: boolean;

  email       = 'limbanivishwa@gmail.com';
  linkedinUrl = 'https://linkedin.com/in/vishwa-limbani';
  githubUrl   = 'https://github.com/vishwa-limbani07';
  resumeUrl   = RESUME_PATH;
  currentYear = new Date().getFullYear();

  form: ContactForm = { name: '', email: '', message: '' };
  sending  = false;
  sent     = false;
  sendError = false;
  copied   = false;

  downloading   = false;
  downloaded    = false;
  downloadError = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
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
    }
  }

  async sendMessage(): Promise<void> {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.sending   = true;
    this.sent      = false;
    this.sendError = false;

    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    this.form.name,
          from_email:   this.form.email,
          message:      this.form.message,
          reply_to:     this.form.email
        },
        EMAILJS_PUBLIC_KEY
      );
      this.sent = true;
      this.form = { name: '', email: '', message: '' };
    } catch {
      this.sendError = true;
    } finally {
      this.sending = false;
    }
  }

  copyEmail(): void {
    if (!this.isBrowser) return;
    navigator.clipboard.writeText(this.email).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }

  async downloadResume(event: Event): Promise<void> {
    event.preventDefault();
    if (!this.isBrowser || this.downloading) return;

    this.downloading   = true;
    this.downloaded    = false;
    this.downloadError = false;

    try {
      const response = await fetch(this.resumeUrl);
      if (!response.ok) throw new Error(`Resume not found (${response.status})`);

      const blob    = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = RESUME_FILENAME;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

      this.downloaded = true;
      setTimeout(() => (this.downloaded = false), 2500);
    } catch {
      this.downloadError = true;
      setTimeout(() => (this.downloadError = false), 3000);
    } finally {
      this.downloading = false;
    }
  }
}
