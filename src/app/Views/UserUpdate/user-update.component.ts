import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserServicesService} from "@services/UserServices/user-services.service";
import {UserData, UserPasswordUpdate, UserResponse, UserUpdate} from "@models/User";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {GlobalLoaderComponent} from "@components/GlobalLoader/global-loader.component";
import {ConfirmationDialog} from "@components/GlobalConfirmation/confirmation-dialog/confirmation-dialog";
import {ToastrService} from "ngx-toastr";
import {AuthServiceService} from "@services/AuthService/auth-service.service";
import {Router} from "@angular/router";
import {GlobalModalComponent} from "@components/Modal/global-modal/global-modal.component";
import {beforeEach} from "node:test";

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
    GlobalModalComponent
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
  showUpdatePasswordModal = false;

  dialogMessage = '¿Estás seguro de que deseas actualizar tus datos?';
  secondaryDialogMessage = 'Si actualizas tu email, se cerrará tu sesión y se te enviara nuevamente un email a tu nuevo correo donde deberás verificarlo nuevamente.' +
    'Asegúrate de tener acceso a tu nuevo correo antes de continuar.';
  updatePasswordModalMessage = 'Al actualizar tu contraseña, se cerrará tu sesión y tendras que iniciar sesión nuevamente con tu nueva contraseña.';
  updatePasswordModalTitle = 'Actualizar contraseña';


  constructor(
    private userService: UserServicesService,
    private toast: ToastrService,
    private authService: AuthServiceService,
    private router: Router
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
          this.toast.error('No se pudo encontrar al usuario.', 'Error')
        }
      });

  }

  showDialog() {
    if (this.userUpdateForm.value.email !== this.userData?.email) {
      this.showUpdatePasswordModal = false;
      this.showSecondaryDialog = true;
    }else {
      this.showUpdatePasswordModal = false;
      this.showConfirmationDialog = true;
    }
  }

  onSubmit(){
    this.isSubmitting = true;
    this.showConfirmationDialog = false;
    this.showSecondaryDialog = false;
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
          if(formValues.email !== this.userData?.email){
            this.isSubmitting = false;
            this.toast.success('Datos actualizados', 'Actualización de datos');
            this.authService.logout();
            this.router.navigate(['']);
          }else {
            this.isSubmitting = false;
            this.toast.success('Datos actualizados', 'Actualización de datos');
            this.getUserData();
          }
        },
        err => {
          this.isSubmitting = false;
          if (err.status == 400 && err.error.errors){
            for (let error in err.error.errors){
              this.toast.error(err.error.errors[error], 'Error')
            }
          }else if(err.status == 500){
            this.toast.error('Ha ocurrido un error interno. Nuestro equipo técnico ha sido notificado.', 'Error')
          }else if (err.status == 404){
            this.toast.error('No se pudo encontrar al usuario.', 'Error')
          }
        }
      )
    }
  }

  updatePassword(){
    this.showConfirmationDialog = false;
    this.showSecondaryDialog = false;
    this.showUpdatePasswordModal = true;
  }

  updatePasswordForm = new FormGroup({
    old_password: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  submitPasswordUpdate(){
    this.isSubmitting = true;
    this.showUpdatePasswordModal = false;
    const formValues: UserPasswordUpdate = {
      old_password: this.updatePasswordForm.value.old_password || '',
      password: this.updatePasswordForm.value.password || '',
      password_confirmation: this.updatePasswordForm.value.password_confirmation || ''
    }
    this.userService.updatePassword(formValues).subscribe(
      data => {
        this.updatePasswordForm.reset();
        this.isSubmitting = false;
        this.toast.success('Contraseña actualizada', 'Actualización de contraseña');
        this.authService.logout();
        this.router.navigate(['']);
      },
      err => {
        this.isSubmitting = false;
        if (err.status == 400 && err.error.errors){
          this.updatePasswordForm.reset();
          for (let error in err.error.errors){
            this.toast.error(err.error.errors[error], 'Error')
          }
        }else if(err.status == 500){
          this.updatePasswordForm.reset();
          this.toast.error('Ha ocurrido un error interno. Nuestro equipo técnico ha sido notificado.', 'Error')
        }else if (err.status == 404){
          this.updatePasswordForm.reset();
          this.toast.error('No se pudo encontrar al usuario.', 'Error')
        }else if(err.error.status == "error"){
          this.updatePasswordForm.reset();
          this.toast.error("Contraseña incorrecta", "Error")
        }
      }
    )
  }

  closeDialog(){
    this.backendValidatorErrors = null;
    this.updatePasswordForm.reset();
    this.showConfirmationDialog = false;
    this.showSecondaryDialog = false;
    this.showUpdatePasswordModal = false;
  }

}
