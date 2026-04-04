import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css',
})
export class SignupPage {
  name = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  onSignup() {
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/write']);
  }

  // onSignup() {
  //   console.log('Signup:', this.name, this.email, this.password);
  // }
}
