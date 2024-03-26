import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-sensor',
  standalone: true,
  imports: [],
  templateUrl: './card-sensor.component.html',
  styleUrl: './card-sensor.component.css'
})
export class CardSensorComponent {
    @Input() sensorName: string = 'analog-1';
    @Input() sensorIcon: string = 'bi bi-activity';
    @Input() sensorValue: string = '0'
}
