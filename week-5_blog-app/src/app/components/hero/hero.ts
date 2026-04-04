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
  showLogin = false;
  showSignup = false;

  constructor(private router: Router) {}

  // onStartWriting() {
  //   if (this.isLoggedIn) {
  //     this.router.navigate(['/write']);
  //   } else {
  //     this.showLogin = true;
  //   }
  // }

  onLogin(event: any) {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn = true;
    this.showLogin = false;
    this.router.navigate(['/write']);
  }
}
