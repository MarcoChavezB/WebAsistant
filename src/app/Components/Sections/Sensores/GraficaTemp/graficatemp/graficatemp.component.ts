import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables, ChartType, ChartData, ChartOptions, ScatterDataPoint } from 'chart.js';
import { SensordataserviceService } from '@services/SensorDataService/sensordataservice.service';
import { EchoService } from '@services/Echo/echo.service';
import { DeviceService } from '@services/DeviceService/device.service';
import 'chartjs-adapter-date-fns';
interface DataPoint {
  fecha: Date;  
  valor: number;
}
@Component({
  selector: 'app-graficatemp',
  standalone: true,
  imports: [],
  templateUrl: './graficatemp.component.html',
  styleUrls: ['./graficatemp.component.css']
})
export class GraficatempComponent implements AfterViewInit {

  @ViewChild('myChart') myChartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;


  datostemp = [
    { fecha: new Date(), valor: 0},
    { fecha: new Date(), valor: 0},
    { fecha: new Date(), valor: 0},
    { fecha: new Date(), valor: 0},
    { fecha: new Date(), valor: 0},
  ]

  constructor(private sensorservice: SensordataserviceService, private EchoService: EchoService, private deviceservice: DeviceService){}

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    this.createChart();
  }

  ngOnInit(){
    this.tempdata()
    this.EchoService.listenToNewTempData((data) => {
      console.log('Datos del evento:', data);
      this.tempdata()
    });
  }

  tempdata(){
    this.sensorservice.getTemperaturaData(this.deviceservice.getStoredIdDevice()).subscribe(
      (data) => {
        if(data.data !== null){
          this.datostemp = data.data.map(d => ({
            fecha: this.parseDate(d.Datetime), 
            valor: Number(d.Valor)
          }));
          this.updateChartData();
        }else {
          console.error('La respuesta no tiene datos');
        }
      },
      (err) => {
        console.error('Error al obtener datos de temperatura:', err);
      }
    )
  }

  updateChartData() {
    if (this.chart) {
      this.chart.data.datasets.forEach((dataset) => {
        dataset.data = this.datostemp.map(d => ({ x: d.fecha, y: d.valor })) as unknown as ScatterDataPoint[];
      });
      this.chart.update();
    }
  }

  parseDate(dateStr: string): Date {
    return new Date(dateStr.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, "$2/$1/$3 $4:$5"));
  }
  
  createChart(): void {
    const ctx = this.myChartRef.nativeElement.getContext('2d');
    
    if (!ctx) return;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'darkred');
    gradient.addColorStop(1, 'darkblue');
    
    const data: ChartData = {
      datasets: [{
        label: 'Temperature Data Degrees Celsius',
        data: this.datostemp.map(d => ({ x: d.fecha, y: d.valor })) as unknown as ScatterDataPoint[],
        backgroundColor: 'white',
        borderWidth: 2, 
        pointRadius: 3, 
        pointBackgroundColor: 'white', 
        showLine: true, 
        borderColor: 'rgba(255, 99, 132, 1)',
      }]
    };
  
    const options: ChartOptions = {
      scales: {
        x: {
          type: 'time',
          time: {
            parser: 'dd/MM/yyyy HH:mm',
            tooltipFormat: 'dd MMM, yyyy HH:mm',
            unit: 'minute',
            displayFormats: {
              minute: 'HH:mm dd/MM/yyyy'
            }
          },
          position: 'bottom',
          ticks: {
            color: 'white',
            source: 'data', 
            autoSkip: false,
            maxRotation: 25, 
            minRotation: 25,
            autoSkipPadding: 20,
          },
          grid: {
            color: 'gray',
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: 'white'
          },
          grid: {
            color: 'gray',
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        }
      },
      backgroundColor: 'white'
    };
  
    this.chart = new Chart(ctx, {
      type: 'scatter',
      data: data,
      options: options
    });
  }
}
  