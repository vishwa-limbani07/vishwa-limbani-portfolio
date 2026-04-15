
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About {

  profileImage = 'assets/images/profile.png';

  skills: string[] = [
    'ANGULAR',
    'RXJS',
    'NGRX',
    'TYPESCRIPT',
    'TAILWIND',
    'NODEJS',
    'EXPRESS',
    'MONGODB',
    '+5 MORE'
  ];
}

