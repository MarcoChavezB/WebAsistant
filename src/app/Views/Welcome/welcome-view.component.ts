import { Component } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-Welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome-view.component.html',
  styleUrl: './welcome-view.component.css',
  animations: [
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(-80%)' }),
        animate('2s ease-in-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class WelcomeViewComponent {

}
