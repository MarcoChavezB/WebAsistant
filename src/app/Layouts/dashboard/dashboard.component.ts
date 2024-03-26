import { Component } from '@angular/core';
import { AsideNavbarComponent } from '../../Components/Sections/aside-navbar/aside-navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsideNavbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
