import { Component, HostListener } from '@angular/core';
import { ControllerServiceService } from '@services/ControllerService/controllerservice.service';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-controller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './controller.component.html',
  styleUrl: './controller.component.css',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms cubic-bezier(0.47, 0, 0.745, 0.715)', style({ transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.47, 0, 0.745, 0.715)', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class ControllerComponent {

  constructor(
    private readonly controllerser: ControllerServiceService
  ){ }

  disabled = false
  error = false

  control(cs: string){
    this.error = false
    this.controllerser.Controller(cs).subscribe(
      (data)=>{
        this.disabled = true
        setTimeout(() => {
          this.disabled = false
        }, 1000);
      },
      (err)=>{
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 5000);
      }
    )
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch(event.key) {
      case 'w':
        this.control('w');
        break;
      case 'a':
        this.control('a');
        break;
      case 's':
        this.control('s');
        break;
      case 'd':
        this.control('d');
        break;
      case 'e': 
        this.control('e');
        break;
      case 'q': 
        this.control('q');
        break;
      default:
        break;
    }
  }
}
