import { Component } from '@angular/core';
import { AsideNavbarComponent } from '../../Components/Sections/aside-navbar/aside-navbar.component';
import { HomeComponent } from '../../Views/Dashboard/home/home.component';
import { RouterOutlet } from '@angular/router';
import { DeviceService } from '@services/DeviceService/device.service';
import { GlobalLoaderComponent } from '@components/GlobalLoader/global-loader.component';
import { AuthServiceService } from '@services/AuthService/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    AsideNavbarComponent,
    HomeComponent,
    GlobalLoaderComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    loadinglogout = false

    constructor(
        private readonly deviceService: DeviceService,
        private readonly authService: AuthServiceService,
        private readonly router: Router
    ){}
    ngOnInit(){
        
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
