import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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

  loading = signal(true);
  error = signal(false);
  users = signal<User[]>([]);

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users.set(res);
        this.loading.set(false);
        this.error.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/user', id]);
  }
}

////////////////////  this one ChangeDetectorRef logic //////////////
// private cdr = inject(ChangeDetectorRef);

//   loading = true;
//   error = false;

//   users: User[] = [];

//   ngOnInit(): void {
//     this.userService.getUsers().subscribe({
//       next: (res) => {
//         this.loading = false;
//         this.users = res;

//         this.error = false;
//         this.cdr.detectChanges();
//         console.log(this.users);
//       },
//       error: (err) => {
//         this.error = true;
//         this.loading = false;
//         this.cdr.detectChanges();
//         console.log(err);
//       },
//     });
//   }

///// this one pipe and ovserble logic
// users$ = of<User[]>([]);

//  ngOnInit(): void {
//     this.users$ = this.userService.getUsers().pipe(
//       delay(1000),
//       tap(() => {
//         this.loading = false;
//       }),
//       catchError(() => {
//         this.error = true;
//         this.loading = false;
//         return of([]);
//       }),
//     );
//   }
