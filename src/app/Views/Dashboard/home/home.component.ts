import { Component } from '@angular/core';
import { SimpleButtonComponent } from '../../../Components/Controls/simple-button/simple-button.component';
import { RowComponent } from '../../../Components/Sections/Table/row/row.component';
import { HeaderComponent } from '../../../Components/Sections/Table/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SimpleButtonComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
