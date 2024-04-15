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

  keyActive: { [key: string]: boolean } = { 'w': false, 'a': false, 's': false, 'd': false };

  disabled = false
  error = false

  control(cs: string){
    console.log(cs)
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
        console.log(err)
        setTimeout(() => {
          this.error = false
        }, 5000);
      }
    )
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const controlKeys = ['w', 'a', 's', 'd'];
    if (controlKeys.includes(event.key.toLowerCase())) {
      if (!this.keyActive[event.key]) { 
        this.keyActive[event.key] = true; 
        this.control(event.key); 
        controlKeys.filter(k => k !== event.key).forEach(k => this.keyActive[k] = false); 
      }
    } else {
      this.control(event.key);  
    }
  }
checkDisabled(key: string): boolean {
  return Object.keys(this.keyActive).some(k => this.keyActive[k] && k !== key);
}

@HostListener('document:keyup', ['$event'])
handleKeyUp(event: KeyboardEvent) {
  if (this.keyActive[event.key]) { 
    this.keyActive[event.key] = false;
    this.control('x'); 
  }
}
}
