import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '@services/UserServices/user-services.service';
import { Observable, map, catchError, of } from 'rxjs';
import { UserData } from '../../Models/User';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  constructor(
    private readonly router: Router,
    private readonly usersservice: UserServicesService
    ) {}

  saveTokenResponse(jwt: string, user: any) {
  if (typeof window !== 'undefined') {
    const userString = JSON.stringify(user);
    localStorage.setItem('user', userString);
    localStorage.setItem('access_token', jwt);
  }
}

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  getUser(): UserData | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString) as UserData;
    }
    return null;
  }
  

  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();
    if (!token) {
      return of(false); 
    }  
    return this.usersservice.authenticate().pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }
  
  resetAll(){
    if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      return this.usersservice.logoutuser().subscribe(
        (res: any) => {
          if (res.status == true) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            localStorage.removeItem('device_id');
          }
        }
      )
    }
    return false
  }

  getUserId(){
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user')
      if(user){
        const userParsed = JSON.parse(user as string)
        const userId = userParsed.id
        return userId
      }
      return null
    }
  }

}
