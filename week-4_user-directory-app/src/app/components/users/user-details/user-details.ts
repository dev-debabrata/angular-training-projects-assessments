import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { User } from '../user.model';
import { UserService } from '../../../services/user.service';
import { Loader } from '../../loader/loader';
import { Error } from '../../error/error';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, Loader, Error],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  loading = signal(true);
  error = signal(false);

  users = signal<User | null>(null);

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserById(userId).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.users.set(res);
      },
      error: (err) => {
        this.error.set(true);
        this.loading.set(false);
        console.log(err);
      },
    });
  }
}

////////////////////  this one ChangeDetectorRef logic /////////////////

//   private cdr = inject(ChangeDetectorRef);

//   loading = true;
//   error = false;

//   users: User | null = null;

//   ngOnInit(): void {
//     const userId = Number(this.route.snapshot.paramMap.get('id'));

//     this.userService.getUserById(userId).subscribe({
//       next: (res) => {
//         this.loading = false;
//         this.users = res;
//         this.cdr.detectChanges();
//       },
//       error: (err) => {
//         this.error = true;
//         this.loading = false;
//         this.cdr.detectChanges();
//       },
//     });
//   }
// }

///// this one pipe and ovserble logic
// user$!: Observable<User | null>;

// ngOnInit(): void {
//   const userId = Number(this.route.snapshot.paramMap.get('id'));

//   this.user$ = this.userService.getUserById(userId).pipe(
//     delay(1000),
//     tap(() => {
//       this.loading = false;
//     }),
//     catchError(() => {
//       this.error = true;
//       this.loading = false;
//       return of(null);
//     }),
//   );
// }
