import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environments";
import {UserData, UserLogin, UserRegister, UserUpdate, LoginResponseInterface} from "../../Models/User";
import { statusInterface } from '../../Models/User';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  private fetchUserDataURL = environment.fetchUserDataURL;
  private loginURL = environment.loginURL;
  private registerURL = environment.registerURL;

  constructor(
    private readonly http: HttpClient
  ) { }

  fetchUserData(){
    return this.http.get<UserData>(this.fetchUserDataURL)
  }

  updateUser(data: UserUpdate){
    return this.http.put<UserUpdate>(this.fetchUserDataURL, data)
  }

  login(data: UserLogin): Observable<LoginResponseInterface>{
    return this.http.post<LoginResponseInterface>(this.loginURL, data)
  }

  register(data: UserRegister){
    return this.http.post<UserRegister>(this.registerURL, data)
  }

  
  authenticate(): Observable<statusInterface> {
    return this.http.get<statusInterface>(environment.authenticateURL)
  }

  logoutuser(): Observable<statusInterface>{
    return this.http.get<statusInterface>(environment.logoutURL)
  }

  adminAuth(): Observable<any> {
    return this.http.get<any>(environment.urladminAuth)
  }
  
}
