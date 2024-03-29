import { Component } from '@angular/core';
import { DeviceRowComponent } from '../../../Components/Cards/device-row/device-row.component';

@Component({
  selector: 'app-select-device',
  standalone: true,
  imports: [
    DeviceRowComponent
  ],
  templateUrl: './select-device.component.html',
  styleUrl: './select-device.component.css'
})
export class SelectDeviceComponent {

}
