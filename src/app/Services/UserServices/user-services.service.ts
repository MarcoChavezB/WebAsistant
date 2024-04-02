import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "@environments/environments";
import {
  LoginResponseInterface,
  UserData,
  UserLogin,
  UserRegister,
  UserUpdate,
  statusInterface,
  UserResponse,
  UserPasswordUpdate, RecoveryPassword
} from "@models/User";
import { Observable } from 'rxjs';
import { DeviceGet, DeviceGetResult } from '@models/Device';
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  private fetchUserDataURL = environment.fetchUserDataURL;
  private loginURL = environment.loginURL;
  private registerURL = environment.registerURL;
  private userUpdateURL = environment.userUpdateURL;
  private updatePasswordURL = environment.updatePasswordURL;
  private forgotPasswordURL = environment.forgotPasswordURL;

  constructor(
    private readonly http: HttpClient
  ) { }

  fetchUserData(): Observable<UserResponse>{
    return this.http.get<UserResponse>(this.fetchUserDataURL)
  }

  updateUser(data: UserUpdate): Observable<UserUpdate>{
    return this.http.put<UserUpdate>(this.userUpdateURL, data)
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

  getUserDevice(): Observable<DeviceGetResult>{
    return this.http.get<DeviceGetResult>(environment.getUserDevice)
  }

  updatePassword(data: UserPasswordUpdate): Observable<UserPasswordUpdate>{
    return this.http.put<UserPasswordUpdate>(this.updatePasswordURL, data)
  }

  passwordRecovery(data: RecoveryPassword){
    return this.http.post<RecoveryPassword>(this.forgotPasswordURL, data)
  }

}
