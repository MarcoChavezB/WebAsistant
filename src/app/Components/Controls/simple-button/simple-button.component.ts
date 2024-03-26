import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-button',
  standalone: true,
  imports: [],
  templateUrl: './simple-button.component.html',
  styleUrl: './simple-button.component.css'
})
export class SimpleButtonComponent {
    @Input() icon: string = "bi bi-pie-chart-fill";
}
