import { Injectable } from '@angular/core';
import {environment} from "@environments/environments";
import { SensorDataResponse } from '@models/Sensor';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { SensorDataIndexPagination } from '@models/Sensor';
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


  // index pagination 

  getTempindexdata(deviceCodee: string, numm: number): Observable<SensorDataIndexPagination> {
    return this.http.post<SensorDataIndexPagination>(environment.tempindexdata, {deviceCode: deviceCodee, num: numm})
  }

  getPesoindexdata(deviceCodee: string, numm: number): Observable<SensorDataIndexPagination> {
    return this.http.post<SensorDataIndexPagination>(environment.pesoindexdata, {deviceCode: deviceCodee, num: numm})
  }

  getIncliindexdata(deviceCodee: string, numm: number): Observable<SensorDataIndexPagination> {
    return this.http.post<SensorDataIndexPagination>(environment.inclinacionindexdata, {deviceCode: deviceCodee, num: numm})
  }

  getGpsindexdata(deviceCodee: string, numm: number): Observable<SensorDataIndexPagination> {
    return this.http.post<SensorDataIndexPagination>(environment.gpsindexdata, {deviceCode: deviceCodee, num: numm})
  }

  getVelocidadindexdata(deviceCodee: string, numm: number): Observable<SensorDataIndexPagination> {
    return this.http.post<SensorDataIndexPagination>(environment.velocidadindexdata, {deviceCode: deviceCodee, num: numm})
  }

}
