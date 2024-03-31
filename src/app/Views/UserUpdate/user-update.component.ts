import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserServicesService} from "@services/UserServices/user-services.service";
import {UserData, UserResponse, UserUpdate} from "../../Models/User";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {GlobalLoaderComponent} from "@components/GlobalLoader/global-loader.component";
import {ConfirmationDialog} from "@components/GlobalConfirmation/confirmation-dialog/confirmation-dialog";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-UserUpdate',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    KeyValuePipe,
    GlobalLoaderComponent,
    ConfirmationDialog,
    NgForOf,
  ],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {

  isSubmitting = false;
  userData: UserData | undefined;
  backendValidatorErrors: any;
  showConfirmationDialog = false;
  showSecondaryDialog = false;
  dialogMessage = '¿Estás seguro de que deseas actualizar tus datos?';
  secondaryDialogMessage = 'Si actualizas tu email, se cerrará tu sesión y se te enviara nuevamente un email a tu nuevo correo donde deberás verificarlo nuevamente.' +
    'Asegúrate de tener acceso a tu nuevo correo antes de continuar.';


  constructor(
    private userService: UserServicesService,
    private toast: ToastrService
  ) {
  }

  ngOnInit() {
    this.getUserData();
  }

  userUpdateForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  getUserData(){
    this.isSubmitting = true;
    this.userService.fetchUserData().subscribe(
      data => {
        this.userData = data.data;
        this.userUpdateForm.controls['name'].setValue(this.userData.name);
        this.userUpdateForm.controls['email'].setValue(this.userData.email);
        this.isSubmitting = false;
      },
      err  =>{
        this.isSubmitting = false;
        if (err.status == 500){
          this.toast.error('Ha ocurrido un error interno. Nuestro equipo técnico ha sido notificado.', 'Error')
        }else if (err.status == 404){
          this.toast.error('No se pudo encontrar al usuario.', 'Errorsss')
        }
      });

  }

  showDialog() {
    if (this.userUpdateForm.value.email !== this.userData?.email) {
      this.showSecondaryDialog = true;
    }else {
      this.showConfirmationDialog = true;
    }
  }

  onSubmit(){
    this.isSubmitting = true;
    this.showConfirmationDialog = false;
    const formValues: UserUpdate = {
      name: this.userUpdateForm.value.name || '',
      email: this.userUpdateForm.value.email || '',
    }

    if (formValues.name === this.userData?.name && formValues.email === this.userData?.email){
      this.isSubmitting = false;
      this.backendValidatorErrors = null;
      this.toast.info('No se realizaron cambios', 'Actualización de datos');
      return;
    }else{
      this.userService.updateUser(formValues).subscribe(
        data => {
          this.isSubmitting = false;
          this.toast.success('Datos actualizados', 'Actualización de datos');
          this.getUserData();
        },
        err => {
          this.isSubmitting = false;
          if (err.status == 400 && err.error.errors){
            this.backendValidatorErrors = err.error.errors
          }else if(err.status == 500){
            this.toast.error('Ha ocurrido un error interno. Nuestro equipo técnico ha sido notificado.', 'Error')
          }else if (err.status == 404){
            this.toast.error('No se pudo encontrar al usuario.', 'Error')
          }
        }
      )
    }
  }

  closeDialog(){
    this.showConfirmationDialog = false;
    this.showSecondaryDialog = false;
  }

}
