import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import {environment} from "@environments/environments";

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerServiceService {


  constructor(
    private readonly http: HttpClient
  ) { }

  Controller(nm: string): Observable<any> {
    const headers = new HttpHeaders({
      'Auth': 'ijoiOOIJ87y87ygG6767780PÃ±Ã±fdxwAHMG'
    });

    return this.http.post<any>(environment.Controller + nm, null, { headers: headers });
  }
}
