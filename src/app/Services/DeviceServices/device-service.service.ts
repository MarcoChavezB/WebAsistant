import { Injectable } from '@angular/core';
import {environment} from "@environments/environments";
import {HttpClient} from "@angular/common/http";
import {DeviceData, DeviceResult, DeviceStore, DevicesIndex} from "@models/Device";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeviceServiceService {
  private  getDeviceDataURL = environment.getDeviceDataURL;
  private storeDeviceURL = environment.storeDeviceURL;

  constructor(
    private http: HttpClient
  ) { }

  getDeviceData(deviceId: number): Observable<DeviceResult> {
    return this.http.get<DeviceResult>(this.getDeviceDataURL + deviceId);
  }

  storeDevice(device: DeviceStore): Observable<any> {
    return this.http.post<DeviceStore>(this.storeDeviceURL, device);
  }

  getDevicesIndex(): Observable<DevicesIndex> {
    return this.http.get<DevicesIndex>(environment.getDevicesIndex);
  }

}
