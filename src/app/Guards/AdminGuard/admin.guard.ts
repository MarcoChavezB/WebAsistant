import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserServicesService } from '@services/UserServices/user-services.service';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userservice: UserServicesService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.userservice.adminAuth().pipe(        
        map(() => true),
        catchError(() => {
          this.router.navigate(['/NotPermission']);
          return of(false);
        })
    );
  }
}
