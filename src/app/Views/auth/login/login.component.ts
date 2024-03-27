import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    constructor(
        private router:Router
    ){}
    email: string = ''
    password: string = ''

    login(){
        console.log('login')
        this.router.navigate(['verify-code'])
    }
    register(){
        this.router.navigate(['/register'])
    }
}
