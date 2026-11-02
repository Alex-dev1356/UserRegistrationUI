import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  getUserProfile()
  {
    // const reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getToken()}); //This line creates an instance of HttpHeaders and sets the Authorization header with a Bearer token. The token is retrieved from the local storage using localStorage.getItem('token'). This header is used to authenticate the request to the backend API, allowing access to protected resources that require a valid token for authorization.

    // return this.http.get(environment.apiBaseUrl + '/userprofile',{headers: reqHeader}); //This method sends a GET request to the /user/profile endpoint of our backend API to retrieve the user's profile information. It uses the base URL defined in the environment configuration and appends the specific endpoint for fetching user profile data. The http.get method returns an Observable that we can subscribe to in order to handle the response from the server.

    //Implementing the AuthInterceptor to automatically add the Authorization header to all outgoing HTTP requests, eliminating the need to manually set the header for each request. This approach simplifies the code and ensures that all requests requiring authentication are properly handled by the interceptor.
    return this.http.get(environment.apiBaseUrl + '/userprofile'); //This method sends a GET request to the /user/profile endpoint of our backend API to retrieve the user's profile information. It uses the base URL defined in the environment configuration and appends the specific endpoint for fetching user profile data. The http.get method returns an Observable that we can subscribe to in order to handle the response from the server.
  }
}
