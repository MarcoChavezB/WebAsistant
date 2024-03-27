import { Component, Input } from '@angular/core';
import { LineChartComponent } from '../../Graphs/line-chart/line-chart.component';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-card-graph-line',
  standalone: true,
  providers:[
    provideCharts(withDefaultRegisterables())
  ],
  imports: [
    BaseChartDirective,
    CommonModule,
  ],
  templateUrl: './card-graph-line.component.html',
  styleUrl: './card-graph-line.component.css'
})
export class CardGraphLineComponent {
  @Input() sensorName: string = 'analog-1';
    @Input() sensorIcon: string = 'bi bi-activity';
    @Input() sensorValue: number = 40;

    @Input() data: number[] = [];
    @Input() fill: boolean = false;
    @Input() labels: string[] = [];
    @Input() backgroundColor: string = '';
    @Input() borderColor: string ='';
    @Input() tension: number = 0;
    @Input() responsive: boolean = false;

    public lineChartData: ChartConfiguration<'line'>['data'] = {
        labels: [],
        datasets: [
            {
                data: [],
                label: '',
                fill: false,
                tension: 0,
                borderColor: '',
                backgroundColor: ''
            }
        ]
    };

    public lineChartOptions: ChartOptions<'line'> = {
        responsive: false
    };
    public lineChartLegend = false;

    constructor() {}

    ngOnInit() {
        this.lineChartData.labels = this.labels;
        this.lineChartData.datasets[0].data = this.data;
        this.lineChartData.datasets[0].label = this.sensorName;
        this.lineChartData.datasets[0].fill = this.fill;
        this.lineChartData.datasets[0].tension = this.tension;
        this.lineChartData.datasets[0].borderColor = this.borderColor;
        this.lineChartData.datasets[0].backgroundColor = this.backgroundColor;
        this.lineChartOptions.responsive = this.responsive;
    }
}
