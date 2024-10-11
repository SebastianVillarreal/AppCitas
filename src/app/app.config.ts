import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }),
      SweetAlert2Module.forRoot()
    ),
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations()
  ]
};
