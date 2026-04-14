import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements OnInit {
  profileImage = 'assets/images/profile.png';

  skills: string[] = ['ANGULAR', 'RXJS', 'NGRX', 'TYPESCRIPT', 'TAILWIND', 'NODEJS', 'EXPRESS', 'MONGODB', '+5 MORE'];

  ngOnInit(): void {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true
    });
  }
}