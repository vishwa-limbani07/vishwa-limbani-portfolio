import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-minimal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-minimal.html',
  styleUrls: ['./footer-minimal.css']
})
export class FooterMinimal {
  currentYear = new Date().getFullYear();
  email       = 'limbanivishwa@gmail.com';
  linkedinUrl = 'https://linkedin.com/in/vishwa-limbani';
  githubUrl   = 'https://github.com/vishwa-limbani07';
}
