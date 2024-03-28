import { Component } from '@angular/core';
import { CardGraphLineComponent } from '../../Components/Cards/card-graph-line/card-graph-line.component';
import { MapsComponent } from '../../Components/Sections/maps/maps.component';
import { AnguloCardComponent } from '../../Components/Cards/angulo-card/angulo-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Control',
  standalone: true,
  imports: [
    CommonModule,
    AnguloCardComponent,
    CardGraphLineComponent,
    MapsComponent
  ],
  templateUrl: './control-view.component.html',
  styleUrl: './control-view.component.css'
})
export class ControlViewComponent {
    data: number[] = [65, 59, 80, 81, 56, 55, 40];
    labels: string[] = ['1', '2', '3', '4', '5', '5', '6'];
    fill: boolean = false;
    backColor: string = 'rgba(204, 241, 207, 0.4)'
    borderColor: string = '#2d9682';
    tension: number = 0.5;
    responsive: boolean = false;

    ngOnInit(){
        this.loadingVideo();
    }

    loading: boolean = true;
    loadingVideo(){
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 3000);
    }
}
