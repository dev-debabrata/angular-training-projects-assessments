import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PostList } from './pages/posts/post-list/post-list';
import { About } from './pages/about/about';
import { authGuard } from './guards/auth-guard';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'posts', component: PostList, data: { breadcrumb: 'Posts' } },
  {
    path: 'posts/:id',
    loadComponent: () => import('./pages/posts/post-detail/post-detail').then((m) => m.PostDetail),
    data: { breadcrumb: 'Post Details' },
  },
  { path: 'about', component: About, data: { breadcrumb: 'About' } },
  {
    path: 'write',
    loadComponent: () => import('./pages/write/write').then((m) => m.Write),
    canActivate: [authGuard],
    data: { breadcrumb: 'Write' },
  },
  { path: '**', component: NotFound },
];
