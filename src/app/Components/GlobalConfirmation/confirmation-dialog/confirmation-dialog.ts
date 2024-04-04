import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [],
  template: `
    <div class="modal-backdrop">
      <div class="confirmation-dialog">
        <h2 class="text-gray-400">Confirmación</h2>
        <p class="text-gray-400"> {{message}} </p>
        <div class="buttons">
          <button class="confirm-button" (click)="confirm()">Confirmar</button>
          <button class="cancel-button" (click)="cancel()">Cancelar</button>
        </div>
      </div>
    </div>
  `,

  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;

      transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
      opacity: 1;
      visibility: visible;
    }

    .confirmation-dialog {
      padding: 2em;
      background-color: #19181d;
      border: 1px solid #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      width: 300px;
      text-align: center;
    }

    .confirmation-dialog h2 {
      margin-bottom: 1em;
    }

    .confirmation-dialog .buttons {
      display: flex;
      justify-content: space-around;
      margin-top: 2em;
    }

    .confirmation-dialog button {
      padding: 0.5em 1em;
      border: none;
      border-radius: 5px;
      color: white;
      cursor: pointer;
    }

    .confirmation-dialog .confirm-button {
      background-color: #007BFF;
    }

    .confirmation-dialog .cancel-button {
      background-color: #6c757d;
    }
  `]
})
export class ConfirmationDialog {

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  @Input() message: string = 'Default';

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }

}
