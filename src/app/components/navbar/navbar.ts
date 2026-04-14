import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  activeSection: string = 'home';
  isMenuOpen = false;

  sections = ['about', 'skills', 'projects', 'connect'];

  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    this.isMenuOpen = false;
  }
  isScrolled = false;
  lastScrollY = 0;
   @HostListener('window:scroll', [])
  onScroll() {
    const currentScrollY = window.scrollY;
 
    // Trigger glass effect once scrolled past 60px
    this.isScrolled = currentScrollY > 60;
 console.log('ScrollY:', currentScrollY, 'Scrolled:', this.isScrolled);
    this.lastScrollY = currentScrollY;
 
    // Active section tracking
    this.sections.forEach(section => {
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