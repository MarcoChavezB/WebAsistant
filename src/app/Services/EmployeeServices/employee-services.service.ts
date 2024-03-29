import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environments";
import {DeviceStore} from "../../Models/Device";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeServicesService {

  private storeDeviceURL = environment.storeDeviceURL;

  constructor(
    private http: HttpClient
  ) { }

  storeDevice(data: DeviceStore){
    return this.http.post<DeviceStore>(this.storeDeviceURL, data);
  }
}
