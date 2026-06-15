import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    //Setting the Default URL to the user registration page. When the application is accessed without any specific route, it will redirect to the 'user' path, which will load the UserComponent and its child routes for registration and login.
    {path: '', redirectTo: '/signin', pathMatch: 'full'}, //This route will redirect the user to the '/signin' path when they access the root URL of the application. The pathMatch: 'full' property ensures that the redirection only occurs when the entire URL matches the empty string (i.e., the root URL).

    //Adding a route for user registration. The path 'user' will load the UserComponent, and it has a child route 'signup' that will load the RegistrationComponent when the user navigates to '/user/signup'.
    {path:'', component:UserComponent,//removing the user path so that we can use directly the children paths for login and registratio. So insted of URL/user/signup we can use URL/signup and instead of URL/user/login we can use URL/login
        children: [
            {path: 'signup', component: RegistrationComponent}, // This child route will load the RegistrationComponent when the user navigates to '/user/signup'.
            {path: 'signin', component: LoginComponent} // This child route will load the LoginComponent when the user navigates to '/user/login'.
        ]
    },
    {path:'dashboard', component: DashboardComponent}
];
