import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

import { PostService } from '../../services/post-service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb implements OnInit {
  breadcrumbs: { label: string; url: string }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
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

    const tempBreadcrumbs: { label: string; url: string }[] = [{ label: 'Home', url: '/' }];

    let currentRoute = this.route.root;
    let url = '';

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;

      const routeURL = currentRoute.snapshot.url.map((s) => s.path).join('/');

      if (!routeURL) continue;

      url += `/${routeURL}`;

      const staticLabel = currentRoute.snapshot.data['breadcrumb'];

      if (staticLabel && staticLabel !== 'Home') {
        tempBreadcrumbs.push({
          label: staticLabel,
          url,
        });
      }

      const postId = currentRoute.snapshot.params['id'];

      if (postId) {
        this.postService.getPostById(+postId).subscribe((post) => {
          this.breadcrumbs = [
            ...tempBreadcrumbs,
            {
              label: post.title,
              url,
            },
          ];

          this.cdr.detectChanges();
        });

        return;
      }
    }

    this.breadcrumbs = tempBreadcrumbs;
    this.cdr.detectChanges();
  }
}

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
// import { filter } from 'rxjs';

// import { PostService } from '../../services/post-service';

// @Component({
//   selector: 'app-breadcrumb',
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: './breadcrumb.html',
//   styleUrl: './breadcrumb.css',
// })
// export class Breadcrumb {
//   breadcrumbs: { label: string; url: string }[] = [];

//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     private postService: PostService,
//   ) {
//     this.buildBreadcrumbs();

//     this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
//       this.buildBreadcrumbs();
//     });
//   }

//   private buildBreadcrumbs() {
//     if (this.router.url === '/') {
//       this.breadcrumbs = [];
//       return;
//     }

//     this.breadcrumbs = [{ label: 'Home', url: '/' }];
//     let currentRoute = this.route.root;
//     let url = '';

//     while (currentRoute.firstChild) {
//       currentRoute = currentRoute.firstChild;

//       const routeURL = currentRoute.snapshot.url.map((segment) => segment.path).join('/');

//       if (routeURL) {
//         url += `/${routeURL}`;

//         const label = currentRoute.snapshot.data['breadcrumb'] ?? routeURL;
//         // const label = isNaN(Number(routeURL)) ? routeURL : `Post ${routeURL}`;
//         // const label = currentRoute.snapshot.data['breadcrumb'];

//         if (label && label !== 'Home') {
//           this.breadcrumbs.push({ label, url });
//         }
//       }
//     }
//   }
// }

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
