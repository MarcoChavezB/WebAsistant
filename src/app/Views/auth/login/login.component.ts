import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {UserLogin} from "../../../Models/User";
import {UserServicesService} from "@services/UserServices/user-services.service";
import {GlobalLoadingComponent} from "../../../Components/GlobalLoading/global-loading.component";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import { AuthServiceService } from '@services/AuthService/auth-service.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GlobalLoadingComponent,
    NgIf,
    KeyValuePipe,
    NgForOf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    isSubmitting = false;
    backendErrors: any;
    backendErrorMessage: any;
    constructor(
        private router:Router,
        private userService: UserServicesService,
        private authService: AuthServiceService
    ){}
    register(){
        this.router.navigate(['/register'])
    }

    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    onSubmit(){
      this.isSubmitting = true;

      const user: UserLogin = {
        email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || ''
      }

      this.userService.login(user).subscribe(
        data => {
          this.authService.saveTokenResponse(data.jwt, data.data)
          this.router.navigate(['/dashboard'])
        },
        err => {
          this.isSubmitting = false;
          if (err.error.errors){
            this.backendErrors = err.error.errors
          }else if (!err.error.success){
            this.backendErrorMessage = err.error.message
          }
        }
      )
    }
}
