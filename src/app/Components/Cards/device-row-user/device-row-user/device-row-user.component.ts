import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-device-row-user',
  standalone: true,
  imports: [],
  templateUrl: './device-row-user.component.html',
  styleUrl: './device-row-user.component.css'
})
export class DeviceRowUserComponent {
  @Input() reference: string = '#######';
  @Output() clickemit = new EventEmitter<void>();
  @Output() clickemit2 = new EventEmitter<void>();


  clickk(){
    this.clickemit.emit()
  }

  clickk2(){
    this.clickemit2.emit()
  }

}
