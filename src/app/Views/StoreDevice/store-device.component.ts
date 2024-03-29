import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {GlobalLoadingComponent} from "../../Components/GlobalLoading/global-loading.component";

@Component({
  selector: 'app-StoreDevice',
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



    storeDeviceForm = new FormGroup({
      type: new FormControl('', [Validators.required, Validators.minLength(3)]),
      model: new FormControl('', [Validators.required, Validators.minLength(3)]),
      os: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    constructor(

    ) {
    }

    onSubmit(){

    }

}
