import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb {
  breadcrumbs: { label: string; url: string }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.buildBreadcrumbs();

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.buildBreadcrumbs();
    });
  }

  private buildBreadcrumbs() {
    if (this.router.url === '/') {
      this.breadcrumbs = [];
      return;
    }

    this.breadcrumbs = [{ label: 'Home', url: '/' }];
    let currentRoute = this.route.root;
    let url = '';

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;

      const routeURL = currentRoute.snapshot.url.map((segment) => segment.path).join('/');

      if (routeURL) {
        url += `/${routeURL}`;

        const label = currentRoute.snapshot.data['breadcrumb'] ?? routeURL;
        // const label = isNaN(Number(routeURL)) ? routeURL : `Post ${routeURL}`;
        // const label = currentRoute.snapshot.data['breadcrumb'];

        if (label && label !== 'Home') {
          this.breadcrumbs.push({ label, url });
        }
      }
    }
  }
}

// breadcrumbs: { label: string; url: string }[] = [];

// constructor(
//   private router: Router,
//   private route: ActivatedRoute,
// ) {
//   this.router.events
//     .pipe(filter((event) => event instanceof NavigationEnd))
//     .subscribe(() => this.buildBreadcrumbs());
// }

// private buildBreadcrumbs() {
//   this.breadcrumbs = [];
//   let currentRoute = this.route.root;
//   let url = '';

//   while (currentRoute.children.length > 0) {
//     const child = currentRoute.children[0];
//     const routeURL = child.snapshot.url.map((segment) => segment.path).join('/');
//     if (routeURL) {
//       url += `/${routeURL}`;
//       // Convert dynamic ids to readable labels (optional)
//       const label = isNaN(Number(routeURL)) ? routeURL : `Post ${routeURL}`;
//       this.breadcrumbs.push({ label, url });
//     }
//     currentRoute = child;
//   }
// }
