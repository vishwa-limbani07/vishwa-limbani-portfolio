import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { SmoothScrollService } from '../../core/smooth-scroll.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  activeSection: string = 'home';
  isMenuOpen = false;

  sections = ['home', 'about', 'skills', 'projects', 'contact'];

  isScrolled = false;
  lastScrollY = 0;

  constructor(private smoothScroll: SmoothScrollService) {}

  scrollTo(section: string) {
    this.smoothScroll.scrollTo(section);
    this.isMenuOpen = false;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const currentScrollY = window.scrollY;

    this.isScrolled = currentScrollY > 60;
    this.lastScrollY = currentScrollY;

    this.sections.forEach((section) => {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = section;
        }
      }
    });
  }
}
