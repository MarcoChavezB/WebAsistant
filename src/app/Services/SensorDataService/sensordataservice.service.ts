import { Injectable } from '@angular/core';
import {environment} from "@environments/environments";
import { SensorData } from '@models/Sensor';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SensordataserviceService {

  constructor(private readonly http: HttpClient) { }

  getInclinacionData(deviceCode: string): Observable<SensorData> {
    return this.http.get<SensorData>(environment.inclinaciondata + deviceCode);
  }

  getGpsData(deviceCode: string): Observable<SensorData> {
    return this.http.get<SensorData>(environment.gpsdata + deviceCode);
  }

  getPesoData(deviceCode: string): Observable<SensorData> {
    return this.http.get<SensorData>(environment.pesodata + deviceCode);
  }

  getVelocidadData(deviceCode: string): Observable<SensorData> {
    return this.http.get<SensorData>(environment.velocidaddata + deviceCode);
  }

  getTemperaturaData(deviceCode: string): Observable<SensorData> {
    return this.http.get<SensorData>(environment.tempdata + deviceCode);
  }

}
