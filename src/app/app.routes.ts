import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Layouts/dashboard/dashboard.component';
import { HomeComponent } from './Views/Dashboard/home/home.component';
import { DetalleComponent } from './Components/Sections/Sensores/detalle/detalle.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
                children: [
                    {
                        path: '',
                        component: HomeComponent,
                        children: [
                            {
                                path: '',
                                component: DetalleComponent
                            }
                        ]
                    }
                ]   
            }
        ]
    }
];
