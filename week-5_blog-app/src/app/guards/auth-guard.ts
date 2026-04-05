import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    return true;
  } else {
    alert('Authentication required to access the Editor.');
    // alert('Please login first!');
    router.navigate(['/login']);
    return false;
  }

  // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // if (isLoggedIn) {
  //   return true;
  // } else {
  //   alert('Please login first!');
  //   return false;
  // }
};
