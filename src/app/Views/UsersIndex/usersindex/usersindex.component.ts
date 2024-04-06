import { Component } from '@angular/core';
import { GlobalLoaderComponent } from '@components/GlobalLoader/global-loader.component';
import { CommonModule } from '@angular/common';
import { UserData } from '@models/User';
import { UserServicesService } from '@services/UserServices/user-services.service';
import {ConfirmationDialog} from "@components/GlobalConfirmation/confirmation-dialog/confirmation-dialog";
import { AlertComponent } from '@components/Alert/alert/alert.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-usersindex',
  standalone: true,
  imports: [CommonModule, GlobalLoaderComponent, ConfirmationDialog, AlertComponent],
  templateUrl: './usersindex.component.html',
  styleUrl: './usersindex.component.css',
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
export class UsersindexComponent {

  constructor(
    private userservice: UserServicesService,
  ){}

  isSubmitting: boolean = false;
  empty: boolean = false
  users: UserData[] = []
  showConfirmationDialog = false;
  dialogMessage = '¿Estas segur@ de cambiar de role a este usuario?'
  userid: number = 0
  response = '' 
  alert = false

  ngOnInit(){
    this.getUsers()
  }

  abrirconfirm(userid: number){
    this.showConfirmationDialog = true;
    this.userid = userid
  }
  

  onSubmit(){
    this.showConfirmationDialog = false;
    this.isSubmitting = true
    this.userservice.changeroleuser(this.userid).subscribe(
      (data) => {
        this.alert = true
        this.response = data.mensaje
        this.isSubmitting = false
        this.userid = 0
        setTimeout(() => {
          this.alert = false;
          this.response = ''
          this.getUsers()
        }, 5000);
      },
      (err)=> {
        this.alert = true
        this.response = err.mensaje
        this.isSubmitting = false
        this.userid = 0
        setTimeout(() => {
          this.alert = false;
          this.response = ''
        }, 5000);

      }
    )

  }

  closeDialog(){
    this.showConfirmationDialog = false;
    this.userid = 0
  }

  getUsers(){
    this.isSubmitting = true;
    this.empty = false
    this.users = []
    this.userservice.getusersindex().subscribe(
      (data) => {
        this.isSubmitting = false;
        this.users = data.users
        if(this.users.length === 0){
          this.empty = true;
        }
      },
      (err) => {
        this.isSubmitting = false;
          if(err.status === 404){
              this.empty = true;
          }
      }
    )
  }

}
