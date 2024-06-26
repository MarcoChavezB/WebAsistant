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
import { DeviceGet } from '@models/Device';
import { CommonModule } from '@angular/common';
import { DevicestoreComponent } from '@components/DeviceStore/devicestore/devicestore.component';
import { DeviceRowUserComponent } from '@components/Cards/device-row-user/device-row-user/device-row-user.component';
import { DeviceService } from '@services/DeviceService/device.service';
import { DeviceServiceService } from '@services/DeviceServices/device-service.service';
import { error } from 'console';
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
    GlobalModalComponent,
    DeviceRowUserComponent,
    CommonModule,
    DevicestoreComponent,
  ],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {

  isSubmitting = false;
  userData: UserData | undefined;

  showConfirmationDialog = false;
  showSecondaryDialog = false;
  showUpdatePasswordModal = false;

  editProfile = false;

  dialogMessage = '¿Estás seguro de que deseas actualizar tus datos?';
  secondaryDialogMessage = 'Si actualizas tu email, se cerrará tu sesión y se te enviara nuevamente un email a tu nuevo correo donde deberás verificarlo nuevamente.' +
    'Asegúrate de tener acceso a tu nuevo correo antes de continuar.';
  updatePasswordModalMessage = 'Al actualizar tu contraseña, se cerrará tu sesión y tendras que iniciar sesión nuevamente con tu nueva contraseña.';
  updatePasswordModalTitle = 'Actualizar contraseña';


  constructor(
    private userService: UserServicesService,
    private toast: ToastrService,
    private authService: AuthServiceService,
    private router: Router,
    private deviceserv: DeviceService,
    private devicesService:DeviceServiceService, 

  ) {
  }

  registrar = false
  devices: DeviceGet[] = []
  emptyDevices = false
  deviceselect = ''
  confirmdelete = false
  selectDevice(id: string){
    this.deviceserv.storeIdDevice(id)
    this.updatedeviceselect()
  }

  updatedeviceselect(){
    this.deviceselect = this.deviceserv.getStoredIdDevice()
  }


  success(){
    this.getDevices()
  }

  getDevices(){
    this.devices = []
    this.emptyDevices = false
      this.userService.getUserDevice().subscribe(
          (data) => {
              this.devices = data.data
          },
          (err) => {
              if(err.status === 404){
                  this.emptyDevices = true;
              }
          }
      )
  }

  ngOnInit() {
    this.getUserData();
    this.getDevices();
    this.deviceselect = this.deviceserv.getStoredIdDevice()
  }

  unlink(device: string){
    if(device === this.deviceserv.getStoredIdDevice()){
      alert('Primero selecciona otro dispositivo para desvicular')
    } else {
      const code: object = {
        device_code: device
      }
      const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este dispositivo?');
      if (confirmacion) {
        this.devicesService.unsynkDeviceUser(code).subscribe(
          data=>{
            alert('Dispositivo desvinculado exitosamente')
            this.getDevices()          
          },
          error=>{
            if(error.status === 404){
              alert('Dispositivo no encontrado')
            }
          }
        )
      } else {
  
      }
    }
    
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
      this.editProfile = false;
      this.isSubmitting = false;
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
            this.editProfile = false;
            this.isSubmitting = false;
            this.toast.success('Datos actualizados', 'Actualización de datos');
            this.getUserData();
          }
        },
        err => {
          this.isSubmitting = false;
          if (err.error.errors){
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
    if (this.updatePasswordForm.invalid){
      this.toast.error('Campos invalidos', 'Error');
    }else {
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
              this.toast.error(err.error.errors[error], 'Change password error')
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
  }

  closeDialog(){
    this.updatePasswordForm.reset();
    this.showConfirmationDialog = false;
    this.showSecondaryDialog = false;
    this.showUpdatePasswordModal = false;
  }

}
