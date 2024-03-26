import { Component } from '@angular/core';
import { AsideNavbarComponent } from '../../Components/Sections/aside-navbar/aside-navbar.component';
import { HomeComponent } from '../../Views/Dashboard/home/home.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    AsideNavbarComponent,
    HomeComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
