import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, ElementRef, ViewChild,  } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { Router } from '@angular/router';
import { AlertConfirmationComponent } from '../../../Components/Alert/alert-confirmation/alert-confirmation.component';



@Component({
  selector: 'app-code-verify',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  animations:[
    trigger('shake', [
      transition('* => *', [ 
        animate('1s', keyframes([
          style({ transform: 'translateX(0)' }),
          style({ transform: 'translateX(-5px)' }), 
          style({ transform: 'translateX(5px)' }), 
          style({ transform: 'translateX(-7px)' }),
          style({ transform: 'translateX(7px)' }), 
          style({ transform: 'translateX(-10px)' }),
          style({ transform: 'translateX(0)' }),
        ]))
      ])
    ])
  ],
  templateUrl: './veirfy-code.component.html',
  styleUrl: './veirfy-code.component.css',
})
export class CodeVerifyComponent {
  constructor(
    // private readonly DataSVuser: UserServiceService,
    // private readonly AuthService: AuthServiceService,
    private readonly router: Router
  ) { }

  code = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: ""
  };
  hasError: boolean = false;
  diableButtonEmail: boolean = false;
  success: boolean = false;
  disabledSumbitButton: boolean = false;
  codigo: string = "";
  userId: string = "";
  loadingResend: boolean = false
  loadingVerify: boolean = false

  
  @ViewChild('code1') code1: ElementRef | undefined;
  @ViewChild('code2') code2: ElementRef | undefined;
  @ViewChild('code3') code3: ElementRef | undefined;
  @ViewChild('code4') code4: ElementRef | undefined;
  @ViewChild('code5') code5: ElementRef | undefined;
  @ViewChild('code6') code6: ElementRef | undefined;



  message: string = 'Usuario no existe';
  mostrarAlerta: boolean = false;

  cambiarFoco(inputNumber: number) {
    if (inputNumber >= 1 && inputNumber <= 6) {
      const currentInputKey = `code${inputNumber}` as keyof CodeVerifyComponent;
      const currentInputElement = this[currentInputKey] as ElementRef<HTMLInputElement>;
  
      let nextInputNumber: number;
  
      if (currentInputElement && currentInputElement.nativeElement.value.length > 0) {
        nextInputNumber = inputNumber + 1;
      } else {
        nextInputNumber = inputNumber - 1;
      }
  
      const nextInputKey = `code${nextInputNumber}` as keyof CodeVerifyComponent;
      const nextInputElement = this[nextInputKey] as ElementRef<HTMLInputElement>;
  
      if (nextInputElement) {
        nextInputElement.nativeElement.focus();
      }
    }
  }

//   verifyCode() {
//     this.showAlert("Verificando codigo");
//     this.hasError = false;
//     this.loadingVerify = true;
//     this.codigo = Object.values(this.code).join("");
//     // this.userId = this.AuthService.getUserId();

//     this.DataSVuser.verifyCode(this.userId, this.codigo).subscribe(
//       (res) => {
//         this.success = true;
//         this.showAlert(res.mensaje);
//         this.diableButtonEmail = false;
//         this.disabledSumbitButton = true;
//         this.hasError = false;
//         setTimeout(() => {
//           this.router.navigate(['dashboard']);
//         }, 1000);
//       },
//       (error) => {
//         this.resetInputs()
//         this.loadingVerify=false
//         this.hasError = true;
//         if (error.error && error.error.mensaje) {
//           this.showAlert(error.error.mensaje);
//         } 
//         if (error.error && error.error.error) {
//             const validatorErrors = error.error.error;
//             if (validatorErrors.codigo) {
//               this.showAlert(validatorErrors.codigo[0]); 
//             } else if (validatorErrors.userId) {
//               this.showAlert(validatorErrors.userId[0]); 
//             } 
//         } 
//       }
//     );
//   }
  
//   resendEmail() {
    
//     const lastSentTime = localStorage.getItem('lastSentTime');
//     const currentTime = new Date().getTime();
  
//     if (!lastSentTime || (currentTime - parseInt(lastSentTime, 10) >= 50000)) {
//       this.loadingResend=true
//       this.DataSVuser.sendEmailCode(this.AuthService.getUserId()).subscribe(
//         res => {
//           localStorage.setItem('resendCode', 'true');
//           localStorage.setItem('lastSentTime', currentTime.toString());
//           this.showAlert("Codigo enviado");
//           this.loadingResend=false
//         },
//         error => {
//           this.showAlert(error.error.mensaje);
//         }
//       );
//     } else {
//       const timeLeft = 50 - Math.floor((currentTime - parseInt(lastSentTime, 10)) / 1000);
//       this.showAlert(`Espera ${timeLeft} segundos antes de volver a enviar el código.`);
//     }
//   }
  

  showAlert(message: string ){
    this.message = message;
    this.mostrarAlerta = true;
    setTimeout(() => {
      this.mostrarAlerta = false;
    }
    , 3000);
  }

  resetInputs(){
    this.code = {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: ""
    }
  }
}