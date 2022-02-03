import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {
    let isUserLoggedIn = localStorage.getItem('loggedInUser');
    if (isUserLoggedIn != null) {
        // this.router.navigate(['/dashboard']);
        return true
    } else {
      localStorage.removeItem('loggedInUser');
      this.router.navigate(['/login']);
      return false
    }
  }
}
