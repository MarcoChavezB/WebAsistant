import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Layouts/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            }
        ]
    }
];
