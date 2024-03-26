import { Component } from '@angular/core';
import { SimpleButtonComponent } from '../../../Components/Controls/simple-button/simple-button.component';
import { CardSensorComponent } from '../../../Components/Cards/card-sensor/card-sensor.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SimpleButtonComponent,
    CardSensorComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
