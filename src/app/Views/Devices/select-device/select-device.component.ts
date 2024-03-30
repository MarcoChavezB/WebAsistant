import { Component } from '@angular/core';
import { DeviceRowComponent } from '../../../Components/Cards/device-row/device-row.component';
import { UserServicesService } from '@services/UserServices/user-services.service';
import { DeviceGet } from '../../../Models/Device';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-device',
  standalone: true,
  imports: [    
    CommonModule,
    DeviceRowComponent
  ],
  templateUrl: './select-device.component.html',
  styleUrl: './select-device.component.css'
})
export class SelectDeviceComponent {

    devices: DeviceGet[] = [
        {
            "id": 2,
            "code": "102938",
            "user_id": 22,
            "created_at": "2024-03-29T22:07:09.000000Z",
            "updated_at": "2024-03-29T22:07:09.000000Z"
        },
        {
            "id": 2,
            "code": "102938",
            "user_id": 22,
            "created_at": "2024-03-29T22:07:09.000000Z",
            "updated_at": "2024-03-29T22:07:09.000000Z"
        },
        {
            "id": 2,
            "code": "102938",
            "user_id": 22,
            "created_at": "2024-03-29T22:07:09.000000Z",
            "updated_at": "2024-03-29T22:07:09.000000Z"
        },
        {
            "id": 2,
            "code": "102938",
            "user_id": 22,
            "created_at": "2024-03-29T22:07:09.000000Z",
            "updated_at": "2024-03-29T22:07:09.000000Z"
        },
        {
            "id": 2,
            "code": "102938",
            "user_id": 22,
            "created_at": "2024-03-29T22:07:09.000000Z",
            "updated_at": "2024-03-29T22:07:09.000000Z"
        },
        {
            "id": 2,
            "code": "102938",
            "user_id": 22,
            "created_at": "2024-03-29T22:07:09.000000Z",
            "updated_at": "2024-03-29T22:07:09.000000Z"
        },
        {
            "id": 2,
            "code": "102938",
            "user_id": 22,
            "created_at": "2024-03-29T22:07:09.000000Z",
            "updated_at": "2024-03-29T22:07:09.000000Z"
        },
        {
            "id": 2,
            "code": "102938",
            "user_id": 22,
            "created_at": "2024-03-29T22:07:09.000000Z",
            "updated_at": "2024-03-29T22:07:09.000000Z"
        },
        {
            "id": 2,
            "code": "102938",
            "user_id": 22,
            "created_at": "2024-03-29T22:07:09.000000Z",
            "updated_at": "2024-03-29T22:07:09.000000Z"
        },
        {
            "id": 2,
            "code": "102938",
            "user_id": 22,
            "created_at": "2024-03-29T22:07:09.000000Z",
            "updated_at": "2024-03-29T22:07:09.000000Z"
        },
        {
            "id": 2,
            "code": "102938",
            "user_id": 22,
            "created_at": "2024-03-29T22:07:09.000000Z",
            "updated_at": "2024-03-29T22:07:09.000000Z"
        },
        {
            "id": 2,
            "code": "102938",
            "user_id": 22,
            "created_at": "2024-03-29T22:07:09.000000Z",
            "updated_at": "2024-03-29T22:07:09.000000Z"
        },

    ]

    constructor(
        private readonly userService: UserServicesService
    ){}

    ngOnInit(){
        this.getDevices()
    }

    getDevices(){
        this.userService.getUserDevice().subscribe(
            (data) => {
                this.devices = data.data
            }
        )
    }

}
