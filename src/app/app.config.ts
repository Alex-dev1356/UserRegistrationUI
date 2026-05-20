import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient()//Invokes the provideHttpClient function to set up the necessary providers for making HTTP requests in the application. This allows components and services to inject HttpClient and use it to communicate with backend APIs or perform other HTTP operations. 
]
};
