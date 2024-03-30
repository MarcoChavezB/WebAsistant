import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor() { }
  storeIdDevice(id: number){
    localStorage.setItem('device_id', id.toString())
  }
  getStoredIdDevice(): number{
    const id = localStorage.getItem('device_id')
    if(id){
      return parseInt(id)
    }
    return 0
  }
}
