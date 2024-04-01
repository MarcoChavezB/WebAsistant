import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {GlobalLoaderComponent} from "@components/GlobalLoader/global-loader.component";
import {DeviceServiceService} from "@services/DeviceServices/device-service.service";
import {DeviceStore} from "../../../Models/Device";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-store-device',
  standalone: true,
  imports: [
    KeyValuePipe,
    ReactiveFormsModule,
    GlobalLoaderComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './store-device.component.html',
  styleUrl: './store-device.component.css'
})
export class StoreDeviceComponent {

   isSubmitting = false;
   backendErrors: any;
   deviceId: number | undefined;

   ngOnInit(){

    }

    storeDeviceForm = new FormGroup({
      type: new FormControl('', [Validators.required, Validators.minLength(3)]),
      model: new FormControl('', [Validators.required, Validators.minLength(3)]),
      os: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    constructor(
      private deviceService: DeviceServiceService,
      private router: Router,
      private toast: ToastrService
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
          this.toast.success('Dispositivo registrado correctamente', 'Éxito')
          this.isSubmitting = false;
          this.deviceId = data.device.id;
          this.router.navigate(['/dashboard/employee/device/data/' + this.deviceId]);
        },
        err => {
          this.isSubmitting = false;
          if (err.error.errors){
            this.backendErrors = err.error.errors
          }else  if(err.status == 500){
            this.toast.error('Error en el servidor, intente de nuevo más tarde', 'Error')
          }
        }
      )
    }

}
