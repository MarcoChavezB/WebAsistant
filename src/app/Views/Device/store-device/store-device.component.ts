import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {GlobalLoadingComponent} from "../../../Components/GlobalLoading/global-loading.component";
import {DeviceServiceService} from "@services/DeviceServices/device-service.service";
import {DeviceStore} from "../../../Models/Device";
import {Router} from "@angular/router";

@Component({
  selector: 'app-store-device',
  standalone: true,
  imports: [
    KeyValuePipe,
    ReactiveFormsModule,
    GlobalLoadingComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './store-device.component.html',
  styleUrl: './store-device.component.css'
})
export class StoreDeviceComponent {

   isSubmitting = false;
   backendErrors: any;
   ngOnInit(){

    }



    storeDeviceForm = new FormGroup({
      type: new FormControl('', [Validators.required, Validators.minLength(3)]),
      model: new FormControl('', [Validators.required, Validators.minLength(3)]),
      os: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    constructor(
      private deviceService: DeviceServiceService,
      private router: Router
    ) {
    }

    onSubmit(){
      this.isSubmitting = true;
      const formValues:  DeviceStore = {
        type: this.storeDeviceForm.value.type || '',
        model: this.storeDeviceForm.value.model || '',
        os: this.storeDeviceForm.value.os || ''
      }

      this.deviceService.storeDevice(formValues).subscribe(
        data => {
          this.isSubmitting = false;
          console.log(data);
          //this.router.navigate(['/dashboard/employee/device/data/']);
        },
        err => {
          this.isSubmitting = false;
          if (err.error.errors){
            this.backendErrors = err.error.errors
          }
        }
      )
    }

}
