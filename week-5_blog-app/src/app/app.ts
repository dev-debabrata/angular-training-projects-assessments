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
  hideBreadcrumb = false;

  constructor() {
    if (performance.navigation.type === 1) {
      this.router.navigate(['/']);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let current = this.route.firstChild;

        while (current?.firstChild) {
          current = current.firstChild;
        }

        this.hideLayout = current?.snapshot.data['hideLayout'] ?? false;
        this.hideBreadcrumb = current?.snapshot.data['hideBreadcrumb'] ?? false;
      }
    });

    ////////////////////////////

    // const nav = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    // if (nav?.type === 'reload') {
    //   this.router.navigateByUrl('/');
    // }

    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     window.scrollTo({
    //       top: 0,
    //       behavior: 'instant',
    //     });

    //     let current = this.route.firstChild;

    //     while (current?.firstChild) {
    //       current = current.firstChild;
    //     }

    //     this.hideLayout = current?.snapshot.data['hideLayout'] ?? false;
    //   }
    // });

    ////////////////////////////////

    // if (window.performance.getEntriesByType('navigation')[0]?.type === 'reload') {
    //   this.router.navigate(['/']);
    // }

    // this.router.events
    //   .pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     map(() => {
    //       let current = this.route.firstChild;
    //       while (current?.firstChild) {
    //         current = current.firstChild;
    //       }
    //       return current?.snapshot.data['hideLayout'] ?? false;
    //     }),
    //   )
    //   .subscribe((value) => {
    //     this.hideLayout = value;
    //   });
  }
}
