import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeviceServiceService } from '@services/DeviceServices/device-service.service';
import { GlobalLoaderComponent } from '@components/GlobalLoader/global-loader.component';
@Component({
  selector: 'app-devicestore',
  standalone: true,
  imports: [CommonModule,GlobalLoaderComponent, FormsModule],
  templateUrl: './devicestore.component.html',
  styleUrl: './devicestore.component.css'
})
export class DevicestoreComponent {

  @Output() success = new EventEmitter<void>();
  @Output() closee = new EventEmitter<void>();

  constructor(
    private readonly deviceservice: DeviceServiceService,
  ){}
  disablebutton = false
  mostrarloading = false
  mostrarmsg = false
  msg = ''
  code = ''
  close(){
    this.closee.emit()
  }
  colorDiv: string = 'rgba(0, 0, 0, 0.5)';
  colorOriginal: string = this.colorDiv;

  vincular(){
    this.disablebutton = true
    this.mostrarloading = true
    this.mostrarmsg = false
    this.msg = ''
    const code: object = {
      device_code: this.code
    }
    this.deviceservice.synkDeviceUser(code).subscribe(
      (data)=>{
        this.disablebutton = false
        this.mostrarloading = false
        this.colorDiv = 'bg-green-500'; 
        setTimeout(() => {
            this.success.emit()
        }, 1000);
      },
      (err)=>{
        this.mostrarloading = false
        this.mostrarmsg = true
        this.disablebutton = false

        if(err.error.message){
          this.msg = err.error.message
        }
        this.msg = err.error.errors.device_code[0]

      }
    )

  
  }

}

