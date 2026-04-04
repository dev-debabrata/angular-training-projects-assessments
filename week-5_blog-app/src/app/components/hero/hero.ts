import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  constructor(private router: Router) {}

  onStartWriting() {
    if (this.isLoggedIn) {
      this.router.navigate(['/write']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
