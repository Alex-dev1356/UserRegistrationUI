import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { } //After registering the HttpClient service in the appConfig, we can now inject it into our AuthService. This allows us to use the HttpClient to make HTTP requests to our backend API for authentication-related operations such as user registration, login, etc.

  baseURL = 'https://localhost:7165/api'; // Base URL for the authentication API. This is the endpoint where our backend API is running and where we will send our HTTP requests for authentication operations.

  //Creating a POST request to the /signup endpoint of our backend API to register a new user. The userData parameter contains the information about the user that we want to register (e.g., full name, email, password, etc.). The http.post method sends the POST request to the specified URL with the provided user data and returns an Observable that we can subscribe to in order to handle the response from the server.
  createUser(fromData:any)//Creating a POST request to the /signup endpoint of our backend API to register a new user.
  {
    return this.http.post(this.baseURL+'/signup', fromData) //This is the URL of the endpoint where we want to send our POST request. It combines the baseURL with the specific endpoint for user registration (/signup). The fromData parameter contains the data that we want to send in the body of the POST request.
  }
}
