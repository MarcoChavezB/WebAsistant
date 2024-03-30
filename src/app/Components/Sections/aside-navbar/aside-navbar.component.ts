import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import { Router } from '@angular/router';
import { AuthServiceService } from '@services/AuthService/auth-service.service';
@Component({
  selector: 'app-aside-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './aside-navbar.component.html',
  styleUrl: './aside-navbar.component.css'
})
export class AsideNavbarComponent {

  constructor( 
    private authService: AuthServiceService,
    private router: Router,
    ) {}


  exit() {
    this.authService.logout()
    this.router.navigate(['/']);
  }


}
