import { Component } from '@angular/core';
import { DeviceRowComponent } from '@components/Cards/device-row/device-row.component';
import { UserServicesService } from '@services/UserServices/user-services.service';
import { DeviceGet } from '../../../Models/Device';
import { CommonModule } from '@angular/common';
import { DeviceService } from '@services/DeviceService/device.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-device',
  standalone: true,
  imports: [
    CommonModule,
    DeviceRowComponent
  ],
  templateUrl: './select-device.component.html',
  styleUrl: './select-device.component.css'
})
export class SelectDeviceComponent {

    devices: DeviceGet[] = []
    emptyDevices: boolean = false
    constructor(
        private readonly userService: UserServicesService,
        private readonly deviceService: DeviceService,
        private router: Router
    ){}

    ngOnInit(){
        this.getDevices()
    }

    selectDevice(id: number){
        this.deviceService.storeIdDevice(id)
        this.router.navigate(['/dashboard'])
    }


    getDevices(){
        this.userService.getUserDevice().subscribe(
            (data) => {
                this.devices = data.data
            },
            (err) => {
                if(err.status === 404){
                    this.emptyDevices = true;
                }
            }
        )
    }

}
