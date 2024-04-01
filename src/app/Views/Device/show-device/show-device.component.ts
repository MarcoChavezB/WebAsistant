import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GlobalLoaderComponent} from "@components/GlobalLoader/global-loader.component";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {DeviceServiceService} from "@services/DeviceServices/device-service.service";
import {ActivatedRoute, Router} from "@angular/router";
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

  isSubmitting = false;
  deviceR: DeviceData | undefined;

  constructor(
    private deviceService: DeviceServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.getDevice(params['id']);
    });
  }

  getDevice(id: number){
    this.isSubmitting = true;
    this.deviceService.getDeviceData(id).subscribe((device) => {
      this.isSubmitting = false;
      this.deviceR = device.device;
    },
      err => {
      this.isSubmitting = false;
      if (err.status == 404){
        this.router.navigate(['/dashboard/404']);
      }
      });
  }



}
