import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';

export const routes: Routes = [
    //Adding a route for user registration. The path 'user' will load the UserComponent, and it has a child route 'signup' that will load the RegistrationComponent when the user navigates to '/user/signup'.
    {path:'', component:UserComponent,//removing the user path so that we can use directly the children paths for login and registratio. So insted of URL/user/signup we can use URL/signup and instead of URL/user/login we can use URL/login
        children: [
            {path: 'signup', component: RegistrationComponent}, // This child route will load the RegistrationComponent when the user navigates to '/user/signup'.
            {path: 'signin', component: LoginComponent} // This child route will load the LoginComponent when the user navigates to '/user/login'.
        ]
    }
];
