import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-device-row-user',
  standalone: true,
  imports: [],
  templateUrl: './device-row-user.component.html',
  styleUrl: './device-row-user.component.css'
})
export class DeviceRowUserComponent {
  @Input() reference: string = '#######';
}
