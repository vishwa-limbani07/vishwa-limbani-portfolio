import { AfterViewInit, Component, OnInit } from '@angular/core';
import { About } from '../../components/about/about';
import { Contact } from '../../components/contact/contact';
import { Footer } from '../../components/footer/footer';
import { Hero } from '../../components/hero/hero';
import { Navbar } from '../../components/navbar/navbar';
import { Projects } from '../../components/projects/projects';
import { Skills } from '../../components/skills/skills';
import * as AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-home',
  imports: [Navbar, Hero, About, Skills, Projects, Contact, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home implements OnInit, AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  private isDark = true;
  private readonly THEME_KEY = 'portfolio-theme';

 ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1000,
        once: true
      });
    }
  }
  
  init() {
    const saved = localStorage.getItem(this.THEME_KEY);
    this.isDark = saved ? JSON.parse(saved) : true;
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
  }

ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
     AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
});

      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }
    toggle() {
    this.isDark = !this.isDark;
    localStorage.setItem(this.THEME_KEY, JSON.stringify(this.isDark));
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
  }

  get isDarkMode(): boolean {
    return this.isDark;
  }
}