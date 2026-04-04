import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/write']);
  }

  // onLogin() {
  //   console.log('Login:', this.email, this.password);
  // }
}
