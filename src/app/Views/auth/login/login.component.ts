import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {RecoveryPassword, UserLogin} from "@models/User";
import {UserServicesService} from "@services/UserServices/user-services.service";
import {GlobalLoaderComponent} from "@components/GlobalLoader/global-loader.component";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import { AuthServiceService } from '@services/AuthService/auth-service.service';
import { DeviceService } from '@services/DeviceService/device.service';
import { ToastrService } from 'ngx-toastr';
import {GlobalModalComponent} from "@components/Modal/global-modal/global-modal.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GlobalLoaderComponent,
    NgIf,
    KeyValuePipe,
    NgForOf,
    GlobalModalComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    isSubmitting = false;
    backendErrors: any;
    backendErrorMessage: any;
    public notfound = false;
    public error = false;
    public passwordVerify = false;
    modalTitle = 'Recuperar contraseña';
    modalMessage = 'Asegúrate de tener acceso a tu correo electrónico para recuperar tu contraseña';
    showModal = false;

    constructor(
        private router:Router,
        private userService: UserServicesService,
        private authService: AuthServiceService,
        private deviceService: DeviceService,
        private toast: ToastrService
    ){}
    register(){
        this.router.navigate(['/register'])
    }

    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    onSubmit(){
      this.notfound = false;
      this.error = false;
      this.passwordVerify = false;
      this.isSubmitting = true;

      const user: UserLogin = {
        email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || ''
      }

      this.userService.login(user).subscribe(
        data => {
          this.authService.saveTokenResponse(data.jwt, data.data)
          this.checkSelectDevice()
        },
        err => {
          this.isSubmitting = false;

          if (err.error.errors){
            this.backendErrors = err.error.errors
          }else if (!err.error.success){
            this.backendErrorMessage = err.error.message
          }
          
          if (err.status == 404){
            this.notfound = true;
          } else if(err.status == 401) {
            this.passwordVerify = true;
          }else if(err.status == 403) {
            alert('Aun no verificas tu email en tu correo electrónico')
          } else {
            this.error = true
          }
          
        }
      )
    }

    checkSelectDevice(){
        let device = this.deviceService.getStoredIdDevice()
        if (device == 0){
            this.router.navigate(['/select-device'])
        } else{
            this.router.navigate(['/dashboard'])
        }
    }

    recoveryPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
    });

  submitPasswordRecovery(){
      if (this.recoveryPasswordForm.invalid){
        this.toast.error('Campos invalidos', 'Error')
        this.recoveryPasswordForm.reset();
      }else {
        this.isSubmitting = true;
        this.showModal = false;
        const formValues: RecoveryPassword = {
          email: this.recoveryPasswordForm.value.email || ''
        }
        this.userService.passwordRecovery(formValues).subscribe(
          data => {
            this.isSubmitting = false;
            this.recoveryPasswordForm.reset();
            this.toast.success('Revisa tu correo electrónico para recuperar tu contraseña', 'Éxito')
          },
          err => {
            this.recoveryPasswordForm.reset();
            this.isSubmitting = false;
            if (err.error.errors){
              for (let error in err.error.errors){
                this.toast.error(err.error.errors[error], 'Recover password error')
              }
            }else if (err.status == 500){
              this.toast.error('Error en el servidor, intente de nuevo más tarde', 'Error')
            }
          }
        )
      }
    }

    closeModal(){
        this.showModal = false;
        this.recoveryPasswordForm.reset();
    }
}
