import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PostList } from './pages/posts/post-list/post-list';
import { About } from './pages/about/about';
import { authGuard } from './guards/auth-guard';
import { NotFound } from './components/not-found/not-found';
import { LoginPage } from './pages/auth/login-page/login-page';
import { SignupPage } from './pages/auth/signup-page/signup-page';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },

  {
    path: 'login',
    component: LoginPage,
    data: { hideLayout: true },
  },

  {
    path: 'signup',
    component: SignupPage,
    data: { hideLayout: true },
  },
  { path: 'posts', component: PostList, data: { breadcrumb: 'Posts' } },

  {
    path: 'posts',
    data: { breadcrumb: 'Posts' },
    children: [
      {
        path: '',
        component: PostList,
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/posts/post-detail/post-detail').then((m) => m.PostDetail),
        data: { breadcrumb: 'Post Details' },
      },
    ],
  },
  // {
  //   path: 'posts/:id',
  //   loadComponent: () => import('./pages/posts/post-detail/post-detail').then((m) => m.PostDetail),
  //   data: { breadcrumb: 'Post Details' },
  // },
  { path: 'about', component: About, data: { breadcrumb: 'About' } },
  {
    path: 'write',
    loadComponent: () => import('./pages/write/write').then((m) => m.Write),
    canActivate: [authGuard],
    data: { breadcrumb: 'Write' },
  },
  { path: 'contact', component: Contact, data: { breadcrumb: 'Contact' } },
  { path: '**', component: NotFound, data: { hideLayout: true, hideBreadcrumb: true } },
];
