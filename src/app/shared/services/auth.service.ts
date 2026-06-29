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

  //Creating a POST request to the /signin endpoint of our backend API to log in a user. The loginData parameter contains the user's login credentials (e.g., email and password). Similar to the createUser method, this method sends a POST request to the specified URL with the provided login data and returns an Observable for handling the response.
  signin(formData: any){
    return this.http.post(this.baseURL+'/signin', formData) //This is the URL of the endpoint where we want to send our POST request for user login. It combines the baseURL with the specific endpoint for user login (/signin). The formData parameter contains the user's login credentials that we want to send in the body of the POST request.  
  }

  isLogIn(){
    return localStorage.getItem('token') != null ? true : false; //This method checks if the user is currently logged in by looking for a token in the local storage. If a token is found, it returns true, indicating that the user is logged in; otherwise, it returns false. This is a common way to manage user authentication state in web applications.
  }
}
