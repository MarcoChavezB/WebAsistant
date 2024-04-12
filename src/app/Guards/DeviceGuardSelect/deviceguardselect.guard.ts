import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DeviceService } from '@services/DeviceService/device.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DeviceGuardSelect implements CanActivate {
  constructor(private deviceserv: DeviceService, private router: Router) {}
  deviceid : string = ''
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.deviceid = this.deviceserv.getStoredIdDevice()
      if(this.deviceid !== ''){
        this.router.navigate(['/dashboard'])
        return false;
      }
      return true;
  }
}
