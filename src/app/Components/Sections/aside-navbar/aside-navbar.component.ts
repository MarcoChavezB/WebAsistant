import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from '@services/AuthService/auth-service.service';
import { GlobalLoaderComponent } from '@components/GlobalLoader/global-loader.component';
@Component({
  selector: 'app-aside-navbar',
  standalone: true,
  imports: [
    RouterLink, CommonModule, GlobalLoaderComponent
  ],
  templateUrl: './aside-navbar.component.html',
  styleUrl: './aside-navbar.component.css'
})
export class AsideNavbarComponent {

  loadinglogout = false
  role: number | null = null
  constructor( 
    private authService: AuthServiceService,
    private router: Router,
    ) {}


  ngOnInit(){
    this.role = this.authService.getRole()
  }
  exit() {
    this.loadinglogout = true
    this.authService.logout().then((result) => {
      if (result) {

      } else {
        this.loadinglogout = false
        alert('Hubo un error al cerrar sesión')
      }
    });
    this.router.navigate(['/']);
  }


}
