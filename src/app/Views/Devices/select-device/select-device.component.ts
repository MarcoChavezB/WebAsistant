import { Component } from '@angular/core';
import { DeviceRowComponent } from '@components/Cards/device-row/device-row.component';
import { UserServicesService } from '@services/UserServices/user-services.service';
import { DeviceGet } from '../../../Models/Device';
import { CommonModule } from '@angular/common';
import { DeviceService } from '@services/DeviceService/device.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '@services/AuthService/auth-service.service';
import { GlobalLoaderComponent } from '@components/GlobalLoader/global-loader.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DevicestoreComponent } from '@components/DeviceStore/devicestore/devicestore.component';
@Component({
  selector: 'app-select-device',
  standalone: true,
  imports: [
    CommonModule,
    DeviceRowComponent,
    GlobalLoaderComponent,
    DevicestoreComponent
  ],
  templateUrl: './select-device.component.html',
  styleUrl: './select-device.component.css',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms cubic-bezier(0.4, 0.2, 0.1, 0)', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.4, 0.2, 0.1, 0)', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class SelectDeviceComponent {

    registrar = false
    devices: DeviceGet[] = []
    emptyDevices: boolean = false
    loadinglogout = false
    constructor(
        private readonly userService: UserServicesService,
        private readonly deviceService: DeviceService,
        private readonly authService: AuthServiceService,
        private router: Router
    ){}

    ngOnInit(){
        this.getDevices()
    }

    selectDevice(code: string){
        this.deviceService.storeIdDevice(code)
        this.router.navigate(['/dashboard'])
    }

    close(){
        this.registrar = false
    }

    success(){
        this.registrar = false
        this.getDevices()
    }

    vincular(){
        this.registrar = true
    }
    
    getDevices(){
        this.devices = []
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

    logout() {
        this.loadinglogout = true
        this.authService.logout().then((result) => {
          if (result) {
    
          } else {
            this.loadinglogout = false
            alert('Hubo un error al cerrar sesión')
          }
        });
        this.router.navigate(['/']);
      }

}
