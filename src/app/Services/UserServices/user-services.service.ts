import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environments";
import {UserData, UserLogin, UserRegister, UserUpdate} from "../../Models/User";

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

  login(data: UserLogin){
    return this.http.post<UserUpdate>(this.loginURL, data)
  }

  register(data: UserRegister){
    return this.http.post(this.registerURL, data)
  }

}
