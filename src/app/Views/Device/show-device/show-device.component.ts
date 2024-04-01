import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GlobalLoaderComponent} from "@components/GlobalLoader/global-loader.component";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {DeviceServiceService} from "../../../Services/DeviceServices/device-service.service";
import {ActivatedRoute} from "@angular/router";
import {DeviceData, DeviceResult} from "../../../Models/Device";

@Component({
  selector: 'app-show-device',
  standalone: true,
  imports: [
    FormsModule,
    GlobalLoaderComponent,
    KeyValuePipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './show-device.component.html',
  styleUrl: './show-device.component.css'
})
export class ShowDeviceComponent {

  deviceR: DeviceData | undefined;

  constructor(
    private deviceService: DeviceServiceService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.getDevice(params['id']);
    });
  }

  getDevice(id: number){
    this.deviceService.getDeviceData(id).subscribe((device) => {
      this.deviceR = device.device;
    },
      error => {
      alert("Something went wrong!")
      });
  }



}
