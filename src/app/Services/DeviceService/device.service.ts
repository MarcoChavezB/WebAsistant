import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor() { }
  
  storeIdDevice(code: string){
    localStorage.setItem('device_id', code)
  }
  getStoredIdDevice(): string{
    const id = localStorage.getItem('device_id')
    if(id){
      return id
    }
    return ''
  }
}
