import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from '@services/AuthService/auth-service.service';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesauthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.isAuthenticated().pipe(
        map(e => {
          const isAuthenticated = !!e;
          if (isAuthenticated){
            this.router.navigate(['/dashboard']);
          }
          return !isAuthenticated;
        }
        ),
        catchError(() => {
          return of(false);
        })
      );
  }
}
