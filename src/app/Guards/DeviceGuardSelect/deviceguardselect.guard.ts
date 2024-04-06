import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DeviceService } from '@services/DeviceService/device.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DeviceGuardSelect implements CanActivate {
  constructor(private deviceserv: DeviceService, private router: Router) {}
  deviceid : number = 0
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.deviceid = this.deviceserv.getStoredIdDevice()
      if(this.deviceid !== 0){
        this.router.navigate(['/dashboard'])
        return false;
      }
      return true;
  }
}
