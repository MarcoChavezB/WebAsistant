import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Views/auth/login/login.component';
import { RegisterComponent } from './Views/auth/register/register.component';
import { CodeVerifyComponent } from './Views/auth/veirfy-code/veirfy-code.component';
import { DashboardComponent } from './Layouts/dashboard/dashboard.component';
import {WelcomeViewComponent} from "./Views/Welcome/welcome-view.component";
import {ControlViewComponent} from "./Views/Control/control-view.component";
import {UserUpdateComponent} from "./Views/UserUpdate/user-update.component";
import {StoreDeviceComponent} from "./Views/Device/store-device/store-device.component";
import {ShowDeviceComponent} from "./Views/Device/show-device/show-device.component";
import { SelectDeviceComponent } from './Views/Devices/select-device/select-device.component';
import { NotfoundComponent } from './Views/Notfound/notfound/notfound.component';
import { NotpermissionComponent } from './Views/Notpermission/notpermission/notpermission.component';
import { AuthGuard } from './Guards/AuthGuard/auth.guard';
import { DesauthGuard } from './Guards/DesauthGuard/desauth.guard';
import { DevicesindexComponent } from './Views/DevicesIndex/devicesindex/devicesindex.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        canActivate: [DesauthGuard],
        children: [
            {
                path: '',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            }

        ]
    },
    {
        path: 'verify-code',
        component: CodeVerifyComponent
    },
    {
        path: 'select-device',
        component: SelectDeviceComponent
    },
    {
        path: 'NotPermission',
        component: NotpermissionComponent
    },
    {
        path: 'NotFound',
        component: NotfoundComponent
    },{
        path: 'devicesindex',
        component: DevicesindexComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: WelcomeViewComponent
            },
            {
                path: 'control',
                component: ControlViewComponent
            },
          {
            path: 'my/info',
            component: UserUpdateComponent
          },
            {
                path: 'employee/store/device',
                component: StoreDeviceComponent
            },
          {
            path: 'employee/device/data/:id',
            component: ShowDeviceComponent,
          }
        ]
    }
];
