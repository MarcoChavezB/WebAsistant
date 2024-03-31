import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [],
  template: `
    <div class="confirmation-dialog">
      <h2>Confirmación</h2>
      <p> {{message}} </p>
      <div class="buttons">
        <button class="confirm-button" (click)="confirm()">Confirmar</button>
        <button class="cancel-button" (click)="cancel()">Cancelar</button>
      </div>
    </div>
  `,

  styles: [`
    .confirmation-dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 2em;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
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
