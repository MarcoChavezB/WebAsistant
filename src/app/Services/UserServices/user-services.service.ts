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
  UserPasswordUpdate, RecoveryPassword,
  usersindex,
  mensaje

} from "@models/User";
import { Observable } from 'rxjs';
import { DeviceGet, DeviceGetResult } from '../../Models/Device';
import { CodeInterface } from '../../Models/Code';
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

  verifyCode(userId: string, codigo: string): Observable<CodeInterface> {
    return this.http.post<CodeInterface>(environment.codeVerify, {userId, codigo})
  }

  sendEmailCode(userId: string): Observable<any> {
    return this.http.post<any>(environment.sendEmailCode + userId, {})
  }

  checkCodeAuth(userId: string): Observable<any> {
    return this.http.get<any>(environment.checkCodeAuth + userId)
  }

  updatePassword(data: UserPasswordUpdate): Observable<UserPasswordUpdate>{
    return this.http.put<UserPasswordUpdate>(this.updatePasswordURL, data)
  }

  passwordRecovery(data: RecoveryPassword){
    return this.http.post<RecoveryPassword>(this.forgotPasswordURL, data)
  }

  getusersindex(): Observable<usersindex> {
    return this.http.get<usersindex>(environment.getUsersIndex)
  }

  changeroleuser(iduser: number): Observable<mensaje> {
    return this.http.post<mensaje>(environment.changeroleuser + iduser, null)
  }
}
