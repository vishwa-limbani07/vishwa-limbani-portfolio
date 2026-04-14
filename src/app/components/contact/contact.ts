import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements OnInit {
  email = 'limbanivishwa@gmail.com';
  linkedinUrl = 'https://linkedin.com/in/vishwa-limbani';
  resumeUrl = 'assets/docs/resume.pdf';
  currentYear = new Date().getFullYear();

  ngOnInit(): void {
    AOS.refresh();
  }
}