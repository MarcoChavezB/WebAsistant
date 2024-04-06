import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import { CommonModule } from '@angular/common';
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

  @Output() exit = new EventEmitter<void>();

  loadinglogout = false
  role: number | null = null
  constructor(
    private authService: AuthServiceService,
    ) {}

  ngOnInit(){
    this.role = this.authService.getRole()
  }
  exitt() {
    this.exit.emit();
  }

}
