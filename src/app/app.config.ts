import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { authInterceptorProvider } from './Interceptors/Auth/auth.interceptor';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideToastr} from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideToastr({autoDismiss:  true, timeOut: 3500}),
    importProvidersFrom(HttpClientModule),
    authInterceptorProvider
]
};
