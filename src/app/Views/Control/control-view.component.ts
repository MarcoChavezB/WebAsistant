import { Component } from '@angular/core';
import { MapsComponent } from '@components/Sections/maps/maps.component';
import { CommonModule } from '@angular/common';
import { ControllerComponent } from '@components/Sections/controller/controller.component';
import {ToastrService} from "ngx-toastr";
import {DeviceService} from "@services/DeviceService/device.service";
import {AuthServiceService} from "@services/AuthService/auth-service.service";
import {environment} from "@environments/environments";
import { GraficatempComponent } from '@components/Sections/Sensores/GraficaTemp/graficatemp/graficatemp.component';
import { GradicaVelocidadComponent } from '@components/Sections/Sensores/GraficaVelocidad/gradica-velocidad/gradica-velocidad.component';
import { EchoService } from '@services/Echo/echo.service';
import { SensordataserviceService } from '@services/SensorDataService/sensordataservice.service';
@Component({
  selector: 'app-Control',
  standalone: true,
  imports: [
    CommonModule,
    MapsComponent,
    ControllerComponent,
    GraficatempComponent,
    GradicaVelocidadComponent,
  ],
  templateUrl: './control-view.component.html',
  styleUrl: './control-view.component.css'
})
export class ControlViewComponent {
    peso = '';
    grados = '';
    eventSource: EventSource | null = null;

    ngOnInit(){
        this.loadingVideo();
        this.sseOpenConnection();
        this.inclidata()
        this.pesodata()
        this.EchoService.listenToNewIncliData((data) => {
          console.log('Datos del evento:', data);
          this.inclidata()
        });

        this.EchoService.listenToNewPesoData((data) => {
          console.log('Datos del evento:', data);
          this.pesodata()
        });
    }
  
    inclidata(){
      this.sensorservice.getInclinacionData(this.deviceService.getStoredIdDevice()).subscribe(
        (data) => {
          if(data.data !== null){
           this.grados = data.data[0].Valor
          }else {
            console.error('La respuesta no tiene datos');
          }
        },
        (err) => {
          console.error('Error al obtener datos de inclinacion:', err);
        }
      )
    }

    pesodata(){
      this.sensorservice.getPesoData(this.deviceService.getStoredIdDevice()).subscribe(
        (data) => {
          if(data.data !== null){
            this.peso = data.data[0].Valor
          }else {
            console.error('La respuesta no tiene datos');
          }
        },
        (err) => {
          console.error('Error al obtener datos de peso:', err);
        }
      )
    }
  
  
    ngOnDestroy(){
        this.sseCloseConnection();
    }
    constructor(
        private toast: ToastrService,
        private deviceService: DeviceService,
        private authService: AuthServiceService,
        private EchoService: EchoService,
        private sensorservice:SensordataserviceService
    ) {
    }

    loading: boolean = true;
    loadingVideo(){
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 3000);
    }

    devCode = this.deviceService.getStoredIdDevice();
    userId = this.authService.getUserId();
  sseOpenConnection(){
    this.eventSource = new EventSource(environment.sse + this.devCode + '/' + this.userId);

    this.eventSource.addEventListener('notification', (e) => {
      const data = JSON.parse(e.data);
      if (data[0] == this.deviceService.getStoredIdDevice() ){
        console.log(e.data)
        this.toast.warning("Tu dispositivo esta expuesto a una temperatura muy alta: " + data[1], 'Notificación')
      }
    })
  }

  sseCloseConnection(){
    this.eventSource?.close();
  }
}
