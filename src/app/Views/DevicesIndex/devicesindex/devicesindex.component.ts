import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Usuario {
  id: number;
  campo1: string;
  campo2: string;
  campo3: string;
  campo4: string;
  campo5: string;
}

@Component({
  selector: 'app-devicesindex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devicesindex.component.html',
  styleUrl: './devicesindex.component.css'
})
export class DevicesindexComponent {

  usuarios: Usuario[] = [

    { id: 1, campo1: 'Valorlirnjiondrjgiowdhngqiowhngiopwuhseogjwedropjgpweoijgpwrjfiowrjgosdfijvweodpnjgnopsdjfgoprijfgoermgremjngioenrfoiqnwrognrkgnorejngoisenrgn 1', campo2: 'Valor 2', campo3: 'Valor 3', campo4: 'Valor 4', campo5: 'Valor 5' },
    { id: 2, campo1: 'Valor 1', campo2: 'Valor 2', campo3: 'Valor 3', campo4: 'Valor 4', campo5: 'Valor 5' },
    { id: 3, campo1: 'Valor 1', campo2: 'Valor 2', campo3: 'Valor 3', campo4: 'Valor 4', campo5: 'Valor 5' },
    { id: 4, campo1: 'Valor 1', campo2: 'Valor 2', campo3: 'Valor 3', campo4: 'Valor 4', campo5: 'Valor 5' },
    { id: 5, campo1: 'Valor 1', campo2: 'Valor 2', campo3: 'Valor 3', campo4: 'Valor 4', campo5: 'Valor 5' },

  ];

}
