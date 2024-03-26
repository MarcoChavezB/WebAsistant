import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    constructor(
    private router : Router
    ){}
    name : string = ''
    email: string = ''
    password: string = ''
    confirmPassword: string = ''
    login(){
        this.router.navigate([''])
    }
}
