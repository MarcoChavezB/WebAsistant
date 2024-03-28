import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {UserLogin} from "../../../Models/User";
import {UserServicesService} from "../../../Services/UserServices/user-services.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    isSubmitting = false;
    constructor(
        private router:Router,
        private userService: UserServicesService
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
          this.router.navigate(['/dashboard']);
        },
        err => {
          this.isSubmitting = false;
        }
      )
    }
}
