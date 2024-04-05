import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {UserRegister} from "@models/User";
import {UserServicesService} from "@services/UserServices/user-services.service";
import {KeyValuePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {GlobalLoaderComponent} from "@components/GlobalLoader/global-loader.component";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    KeyValuePipe,
    NgClass,
    GlobalLoaderComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    isSubmitting = false;
    backendErrors: any;
    constructor(
    private router : Router,
    private userService: UserServicesService,
    private toast: ToastrService
    ){}

    login(){
        this.router.navigate([''])
    }

    registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    onSubmit(){
      this.isSubmitting = true;
      const formValues: UserRegister = {
        name: this.registerForm.value.name || '',
        email: this.registerForm.value.email || '',
        password: this.registerForm.value.password || '',
        password_confirmation: this.registerForm.value.passwordConfirm || ''
      }
      this.userService.register(formValues).subscribe(
        data => {
          this.router.navigate(['']);
        },
        err => {
          this.isSubmitting = false;
          if (err.error.errors){
            for (let error in err.error.errors){
              this.toast.error(err.error.errors[error], 'Error')
            }
          }else if (err.status ==500){
            this.toast.error('Error en el servidor, intente de nuevo más tarde', 'Error')
          }
        }
      )
    }
}
