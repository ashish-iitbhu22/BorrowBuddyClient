import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, of, catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  constructor(private authService: AuthService,
    private userService:UserService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('Guard is activated');

    return this.authService.getProfile().pipe(
      map((profile:any) => {
        if (profile && profile.phone) {
          this.userService.setProfile(profile);
          return true;
        } else {
          this.router.navigate(['/login/signIn']);
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error occurred:', error);
        this.router.navigate(['/login/signIn']);
        return of(false);
      })
    );
  }
}
