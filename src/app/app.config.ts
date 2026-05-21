import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(),//Invokes the provideHttpClient function to set up the necessary providers for making HTTP requests in the application. This allows components and services to inject HttpClient and use it to communicate with backend APIs or perform other HTTP operations. 
  provideToastr() //Invokes the provideToastr function to set up the necessary providers for using the ngx-toastr library in the application. This allows components and services to inject ToastrService and use it to display toast notifications for various events such as success messages, error messages, etc.
]
};
