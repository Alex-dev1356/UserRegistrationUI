import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

//With this authGuard function, we'll be preventing unauthenticated access, such as when a user tries to access the dashboard without being logged in. Let's apply this authGuad to all the routes that we want to prevent from unauthenticated access. This will ensure that only authenticated users can access those routes, enhancing the security of our application and protecting sensitive information from unauthorized users. By implementing this authGuard, we can enforce authentication checks and redirect unauthenticated users to the appropriate login or sign-in page, improving the overall user experience and maintaining the integrity of our application's access control.
export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService); //Injecting the AuthService to access its methods and properties for authentication-related operations.

  const router = inject(Router); //Injecting the Router to navigate the user to different routes based on their authentication status.

  if(authService.isLogIn())
  {
    return true;
  }
  else
  {
  router.navigateByUrl('/signin'); //If the user is not logged in, we navigate them to the sign-in page. This ensures that unauthenticated users are redirected to the appropriate login page, allowing them to authenticate themselves before accessing protected routes or resources within the application.
  return false;
  }
};
  