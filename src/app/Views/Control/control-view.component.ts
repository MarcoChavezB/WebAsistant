import { Component } from '@angular/core';
import { CardGraphLineComponent } from '@components/Cards/card-graph-line/card-graph-line.component';
import { MapsComponent } from '@components/Sections/maps/maps.component';
import { AnguloCardComponent } from '@components/Cards/angulo-card/angulo-card.component';
import { CommonModule } from '@angular/common';
import { ControllerComponent } from '@components/Sections/controller/controller.component';
import {ToastrService} from "ngx-toastr";
import {DeviceService} from "@services/DeviceService/device.service";
import {AuthServiceService} from "@services/AuthService/auth-service.service";
import {environment} from "@environments/environments";
@Component({
  selector: 'app-Control',
  standalone: true,
  imports: [
    CommonModule,
    AnguloCardComponent,
    CardGraphLineComponent,
    MapsComponent,
    ControllerComponent
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

    eventSource: EventSource | null = null;

    ngOnInit(){
        this.loadingVideo();
        this.sseOpenConnection();
    }

    ngOnDestroy(){
        this.sseCloseConnection();
    }
    constructor(
        private toast: ToastrService,
        private deviceService: DeviceService,
        private authService: AuthServiceService
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
        this.toast.warning("El motor de tu dispositivo esta expuesto a temperaturas muy alta. Data: " + data[1], 'Alerta')
      }
    })
  }

  sseCloseConnection(){
    this.eventSource?.close();
  }
}
