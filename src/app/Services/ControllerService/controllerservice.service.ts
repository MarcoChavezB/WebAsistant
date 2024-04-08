import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "@environments/environments";

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerServiceService {


  constructor(
    private readonly http: HttpClient
  ) { }

  Controller(nm: string): Observable<any>{
    return this.http.post<any>(environment.Controller + nm, null)
  }

}
