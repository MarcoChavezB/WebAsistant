import { Injectable } from '@angular/core';
import {environment} from "@environments/environments";
import { SensorDataResponse } from '@models/Sensor';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SensordataserviceService {

  constructor(private readonly http: HttpClient) { }

  getInclinacionData(deviceCode: string): Observable<SensorDataResponse> {
    return this.http.get<SensorDataResponse>(environment.inclinaciondata + deviceCode);
  }

  getGpsData(deviceCode: string): Observable<SensorDataResponse> {
    return this.http.get<SensorDataResponse>(environment.gpsdata + deviceCode);
  }

  getPesoData(deviceCode: string): Observable<SensorDataResponse> {
    return this.http.get<SensorDataResponse>(environment.pesodata + deviceCode);
  }

  getVelocidadData(deviceCode: string): Observable<SensorDataResponse> {
    return this.http.get<SensorDataResponse>(environment.velocidaddata + deviceCode);
  }

  getTemperaturaData(deviceCode: string): Observable<SensorDataResponse> {
    return this.http.get<SensorDataResponse>(environment.tempdata + deviceCode);
  }

}
