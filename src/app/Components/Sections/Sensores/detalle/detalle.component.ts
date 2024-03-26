import { Component } from '@angular/core';
import { HeaderComponent } from '../../Table/header/header.component';
import { RowComponent } from '../../Table/row/row.component';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [
    HeaderComponent,
    RowComponent
  ],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {

}
