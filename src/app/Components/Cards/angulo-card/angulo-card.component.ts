import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-angulo-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './angulo-card.component.html',
  styleUrl: './angulo-card.component.css'
})
export class AnguloCardComponent {
    @Input() sensorIcon: string = 'bi bi-compass';
    @Input() sensorName: string = 'angulo';
    @Input() sensorValue: number = 0
}
