import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceData } from '@models/Device';
import { DeviceServiceService } from '@services/DeviceServices/device-service.service';
import { GlobalLoaderComponent } from '@components/GlobalLoader/global-loader.component';

@Component({
  selector: 'app-devicesindex',
  standalone: true,
  imports: [CommonModule, GlobalLoaderComponent],
  templateUrl: './devicesindex.component.html',
  styleUrl: './devicesindex.component.css'
})
export class DevicesindexComponent {
  constructor(
    private deviceService: DeviceServiceService,
  ){}

  isSubmitting: boolean = false;
  empty: boolean = false
  devices: DeviceData[] = []


  ngOnInit(){
    this.getDevices()
  }
  

  getDevices(){
    this.isSubmitting = true;
    this.empty = false
    this.deviceService.getDevicesIndex().subscribe(
      (data) => {
        this.isSubmitting = false;
        this.devices = data.devices
        if(this.devices.length === 0){
          this.empty = true;
        }
      },
      (err) => {
        this.isSubmitting = false;
          if(err.status === 404){
              this.empty = true;
          }
      }
    )
  }

}
