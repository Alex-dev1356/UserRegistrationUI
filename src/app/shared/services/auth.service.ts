import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { } //After registering the HttpClient service in the appConfig, we can now inject it into our AuthService. This allows us to use the HttpClient to make HTTP requests to our backend API for authentication-related operations such as user registration, login, etc.

  baseURL = 'https://localhost:5001/api'; // Base URL for the authentication API. This is the endpoint where our backend API is running and where we will send our HTTP requests for authentication operations.

}
