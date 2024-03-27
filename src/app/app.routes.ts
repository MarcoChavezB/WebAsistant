import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Views/auth/login/login.component';
import { RegisterComponent } from './Views/auth/register/register.component';
import { CodeVerifyComponent } from './Views/auth/veirfy-code/veirfy-code.component';
import { DashboardComponent } from './Layouts/dashboard/dashboard.component';
import { HomeComponent } from './Views/Dashboard/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'verify-code',
                component: CodeVerifyComponent
            }
        ]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            }
        ]
    }
];
