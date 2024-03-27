import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

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

}
