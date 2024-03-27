import { Component, Input,} from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
@Component({
  selector: 'app-line-chart',
    providers: [
        provideCharts(withDefaultRegisterables())
    ],
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {
    
    @Input() data: any[] = [];
    @Input() fill: boolean = false;
    @Input() labels: string[] = [];
    @Input() color: string = '';
    @Input() backgroundColor: string = '';
    @Input() borderColor: string = '';
    @Input() tension: number = 0;
    @Input() responsive: boolean = false;

    public lineChartData: ChartConfiguration<'line'>['data'] = {
        labels: this.labels,
        datasets: [
        {
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: this.fill,
            tension: this.tension,
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor
        }
        ]
    };

    public lineChartOptions: ChartOptions<'line'> = {
        responsive: this.responsive
    };
    public lineChartLegend = false;
}
