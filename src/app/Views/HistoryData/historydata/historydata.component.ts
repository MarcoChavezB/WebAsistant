import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertErrorComponent } from '@components/Alert/alert-error/alert-error.component';
import { SensordataserviceService } from '@services/SensorDataService/sensordataservice.service';
import { DeviceService } from '@services/DeviceService/device.service';
import { SensorData } from '@models/Sensor';
import { error } from 'console';
@Component({
  selector: 'app-historydata',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertErrorComponent],
  templateUrl: './historydata.component.html',
  styleUrl: './historydata.component.css'
})
export class HistorydataComponent {

  codedevice = ''
  datas: SensorData[] | null = null
  numpage = 1
  showLoading= false
  existdata = false
  constructor(
    private SensordataserviceService: SensordataserviceService,
    private DeviceService: DeviceService, 

  ){

  }

  ngOnInit(){
    this.codedevice = this.DeviceService.getStoredIdDevice()
    this.velodata()
  }
  selectedButtons: any = {
    vel: true,
    temp: false,
    peso: false,
    incli: false,
    gps: false,
  }  

  previouspage(){
    if(this.numpage === 1){

    } else if(this.selectedButtons.vel){
      this.numpage --
      this.velodata()
    } else if(this.selectedButtons.temp){
      this.numpage --
      this.tempdata()
    } else if(this.selectedButtons.peso){
      this.numpage --
      this.weightdata()
    } else if(this.selectedButtons.incli){
      this.numpage --
      this.inclidata()
    } else if(this.selectedButtons.gps){
      this.numpage --
      this.gpsdata()
    }
  }

  nextpage(){
    if(this.selectedButtons.vel){
      this.numpage ++
      this.velodata()
    } else if(this.selectedButtons.temp){
      this.numpage ++
      this.tempdata()
    } else if(this.selectedButtons.peso){
      this.numpage ++
      this.weightdata()
    } else if(this.selectedButtons.incli){
      this.numpage ++
      this.inclidata()
    } else if(this.selectedButtons.gps){
      this.numpage ++
      this.gpsdata()
    }
  }

  velodata(){
    this.resetselected()
    this.selectedButtons.vel = true


    this.existdata = false
    this.showLoading = true;
    this.SensordataserviceService.getVelocidadindexdata(this.codedevice, this.numpage).subscribe(
      data=>{
        if(data.data.length !== 0){
          this.datas = data.data
          this.showLoading = false;
          console.log(data.data)
          
        } else {
          this.showLoading = false;
          this.datas = []
          this.existdata = true
        }
      },
      error=>{
        this.showLoading = false;
        this.datas = []
        this.existdata = true
      }
    )
  }

  weightdata(){
    this.resetselected()

    this.selectedButtons.peso = true


    this.showLoading = true;
    this.existdata = false
    this.SensordataserviceService.getPesoindexdata(this.codedevice, this.numpage).subscribe(
      data=>{
        if(data.data.length !==  0){
          this.datas = data.data
          this.showLoading = false;
          
        } else {
          this.showLoading = false;
          this.datas = []
          this.existdata = true
        }

      },
      error=>{
        this.showLoading = false;
        this.datas = []
        this.existdata = true

      }
    )
  }

  inclidata() {
    this.resetselected()

    this.selectedButtons.incli = true

    this.showLoading = true;
    this.existdata = false
    this.SensordataserviceService.getIncliindexdata(this.codedevice, this.numpage).subscribe(
      data=>{
        if(data.data.length !==  0){
          this.datas = data.data
          this.showLoading = false;
          
        } else {
          this.showLoading = false;
          this.datas = []
          this.existdata = true
        }
      },
      error=>{
        this.showLoading = false;
        this.datas = []
        this.existdata = true

      }
    )
  }

  gpsdata(){
    this.resetselected()

    this.selectedButtons.gps = true

    this.showLoading = true;
    this.existdata = false
    this.SensordataserviceService.getGpsindexdata(this.codedevice, this.numpage).subscribe(
      data=>{
        if(data.data.length !==  0){
          this.datas = data.data
          this.showLoading = false;
          
        } else {
          this.showLoading = false;
          this.datas = []
          this.existdata = true
        }
      },
      error=>{
        this.showLoading = false;
        this.datas = []
        this.existdata = true

      }
    )
  }

  tempdata(){
    this.resetselected()

    this.selectedButtons.temp = true

    this.showLoading = true;
    this.existdata = false
    this.SensordataserviceService.getTempindexdata(this.codedevice, this.numpage).subscribe(
      data=>{
        if(data.data.length !==  0){
          this.datas = data.data
          this.showLoading = false;
          
        } else {
          this.showLoading = false;
          this.datas = []
          this.existdata = true
        }
      },
      error=>{
        this.showLoading = false;
        this.datas = []
        this.existdata = true

      }
    )
  }

  resetselected(){
    this.selectedButtons.vel = false
    this.selectedButtons.temp = false
    this.selectedButtons.peso = false
    this.selectedButtons.incli = false
    this.selectedButtons.gps = false

  }

}
