import {
  AfterViewInit,
  Component,
  OnInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { About } from '../../components/about/about';
import { Contact } from '../../components/contact/contact';
import { FooterMinimal } from '../../components/footer-minimal/footer-minimal';
import { Navbar } from '../../components/navbar/navbar';
import { Projects } from '../../components/projects/projects';
import { Skills } from '../../components/skills/skills';
import { HeroComponent } from '../../components/hero/hero';
import { RevealDirective } from '../../core/reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Navbar, HeroComponent, About, Skills, Projects,
    Contact,
    FooterMinimal, RevealDirective
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, AfterViewInit {

  private isDark = true;
  private readonly THEME_KEY = 'portfolio-theme';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngOnInit(): Promise<void> {
    if (this.isBrowser) {
      this.initTheme();

      // ✅ Dynamic import (SSR safe)
      const AOS = (await import('aos')).default;

      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
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

  // ✅ Theme initialization
  private initTheme(): void {
    const saved = localStorage.getItem(this.THEME_KEY);
    this.isDark = saved ? JSON.parse(saved) : true;

    document.documentElement.setAttribute(
      'data-theme',
      this.isDark ? 'dark' : 'light'
    );
  }

  // ✅ Toggle theme
  toggle(): void {
    this.isDark = !this.isDark;

    localStorage.setItem(this.THEME_KEY, JSON.stringify(this.isDark));

    document.documentElement.setAttribute(
      'data-theme',
      this.isDark ? 'dark' : 'light'
    );
  }

  get isDarkMode(): boolean {
    return this.isDark;
  }
}

