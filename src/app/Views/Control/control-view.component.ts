import { Component } from '@angular/core';
import { CardGraphLineComponent } from '../../Components/Cards/card-graph-line/card-graph-line.component';
import { MapsComponent } from '../../Components/Sections/maps/maps.component';

@Component({
  selector: 'app-Control',
  standalone: true,
  imports: [
    CardGraphLineComponent,
    MapsComponent
  ],
  templateUrl: './control-view.component.html',
  styleUrl: './control-view.component.css'
})
export class ControlViewComponent {
    data: number[] = [65, 59, 80, 81, 56, 55, 40];
    labels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    fill: boolean = false;
    backColor: string = 'rgba(204, 241, 207, 0.4)'
    borderColor: string = '#2d9682';
    tension: number = 0.5;
    responsive: boolean = false;
}
