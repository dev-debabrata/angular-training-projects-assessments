import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { catchError, delay, of, tap } from 'rxjs';

import { UserService } from '../../services/user.service';
import { Loader } from '../loader/loader';
import { Error } from '../error/error';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [Loader, Error, CommonModule, RouterModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);

  loading = true;
  error = false;

  users$ = of<User[]>([]);

  ngOnInit(): void {
    this.users$ = this.userService.getUsers().pipe(
      delay(1000),
      tap(() => {
        this.loading = false;
      }),
      catchError(() => {
        this.error = true;
        this.loading = false;
        return of([]);
      }),
    );
  }

  viewDetails(id: number): void {
    this.router.navigate(['/user', id]);
  }
}
