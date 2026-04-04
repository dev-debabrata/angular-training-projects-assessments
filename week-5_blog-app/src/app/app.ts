import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { Footer } from './components/footer/footer';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Breadcrumb, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  router = inject(Router);
  route = inject(ActivatedRoute);

  hideLayout = false;

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let current = this.route.firstChild;
          while (current?.firstChild) {
            current = current.firstChild;
          }
          return current?.snapshot.data['hideLayout'] ?? false;
        }),
      )
      .subscribe((value) => {
        this.hideLayout = value;
      });
  }
}
