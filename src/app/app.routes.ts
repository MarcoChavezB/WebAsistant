import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Views/auth/login/login.component';
import { RegisterComponent } from './Views/auth/register/register.component';
import { DashboardComponent } from './Layouts/dashboard/dashboard.component';
import {WelcomeViewComponent} from "./Views/Welcome/welcome-view.component";
import {ControlViewComponent} from "./Views/Control/control-view.component";
import {UserUpdateComponent} from "./Views/UserUpdate/user-update.component";
import { SelectDeviceComponent } from './Views/Devices/select-device/select-device.component';
import { NotfoundComponent } from './Views/Notfound/notfound/notfound.component';
import { NotpermissionComponent } from './Views/Notpermission/notpermission/notpermission.component';
import { AuthGuard } from './Guards/AuthGuard/auth.guard';
import { DesauthGuard } from './Guards/DesauthGuard/desauth.guard';
import { AdminGuard } from './Guards/AdminGuard/admin.guard';
import { DevicesindexComponent } from './Views/DevicesIndex/devicesindex/devicesindex.component';
import { UsersindexComponent } from './Views/UsersIndex/usersindex/usersindex.component';
import { DeviceGuard } from './Guards/DeviceGuard/device-guard.guard';
import { DeviceGuardSelect } from './Guards/DeviceGuardSelect/deviceguardselect.guard';
import { HistorydataComponent } from './Views/HistoryData/historydata/historydata.component';
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
        path: 'select-device',
        component: SelectDeviceComponent,
        canActivate: [AuthGuard, DeviceGuardSelect]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard, DeviceGuard],
        children: [
            {
                path: '',
                component: WelcomeViewComponent
            },
            {
                path: 'control',
                component: ControlViewComponent
            },{
                path: 'historydata',
                component: HistorydataComponent
            },
            {
                path: 'my/info',
                component: UserUpdateComponent
            },{
                path: '',
                canActivate: [AdminGuard],
                children:[
                    {
                        path: 'employee/devicesindex',
                        component: DevicesindexComponent
                    },{
                        path: 'employee/usersindex',
                        component: UsersindexComponent
                    }
                ]
            }
        ]
    },
    {
        path: 'NotPermission',
        component: NotpermissionComponent
    },
    {
        path: 'NotFound',
        component: NotfoundComponent
    },
    {
        path: '**',
        component: NotfoundComponent
    },
];
