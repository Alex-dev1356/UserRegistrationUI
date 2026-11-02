import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); //Injects the AuthService into the interceptor function. This allows the interceptor to access the authentication-related methods and properties provided by the AuthService, such as retrieving the authentication token or checking the user's login status.

  //Checking if the user is already logged in or not by checking the presence of the token in local storage. If the token is present, it means the user is logged in, and we can proceed to add the Authorization header to the request.
  if (authService.isLogIn()) {
   const clonedReq = req.clone({ //Cloning the original request to create a new request object that can be modified without affecting the original request. This is necessary because the HttpRequest object is immutable, and we cannot directly modify it. By cloning the request, we can create a new request with the desired modifications, such as adding headers or changing the URL.
      headers: req.headers.set('Authorization', 'Bearer ' + authService.getToken()) //Adding the Authorization header to the cloned request. The header is set to 'Bearer ' followed by the authentication token retrieved from the AuthService. This allows the backend API to recognize the user as authenticated and authorize access to protected resources based on the provided token.
    });
    return next(clonedReq); //Passing the modified cloned request to the next handler in the HTTP request pipeline. This allows the request to continue its journey through any other interceptors or eventually reach the backend API for processing.
  }
  else
    return next(req);
}; //All Http reqquests will go through this interceptor.

