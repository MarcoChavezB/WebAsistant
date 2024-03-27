import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserServicesService} from "../../Services/UserServices/user-services.service";

@Component({
  selector: 'app-UserUpdate',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {

  isSubmitting = false;
  userData: any;

  constructor(
    private userService: UserServicesService
  ) {
  }

  ngOnInit() {
  }

  userUpdateForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  getUserData(){
    this.userService.fetchUserData().subscribe(
      data => {
        this.userData = data;
      });
  }

}
