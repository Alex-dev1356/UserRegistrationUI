import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {

  // constructor(public formBuilder: FormBuilder) { }

  public formBuilder = inject(FormBuilder);

  //Injecting the AuthService service into the LoginComponent using the inject function. This allows us to use the service in the component and access its methods and properties. The AuthService is responsible for handling authentication-related operations such as user registration and login, so we can use it to send login requests to the backend API when the user submits the login form.
  private service = inject(AuthService);

  //Injecting the Router Service into the LoginComponent using the inject function. This allows us to use the Router service in the component to navigate to different routes in the application. For example, after a successful login, we can use the Router service to redirect the user to the dashboard page or any other protected route that requires authentication.
  private router = inject(Router);

  //Injecting the ToasterService into the LoginComponent using the inject function. This allows us to use the Toaster service to display toast notifications in the component. We can use this service to show success messages, error messages, or any other relevant information to the user based on the outcome of the login process. For example, if the login is successful, we can show a success toast notification, and if there is an error during login (e.g., invalid credentials), we can show an error toast notification to inform the user about the issue.
  private toaster = inject(ToastrService);

  ngOnInit(): void {
    if (this.service.isLogIn()) {
      this.router.navigateByUrl('/dashboard'); //If the user is already logged in, we navigate them to the dashboard page. This ensures that authenticated users are redirected to the appropriate page without having to go through the login process again, improving the user experience and providing seamless access to protected resources or features within the application.
    }
  }

  isSubmitted: boolean = false;

  //Creating a group of form controls for the login form using the FormBuilder service. This allows us to easily manage and validate the form inputs for user login, such as email and password fields.
  form = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  hasDisplayableError(controlName: string) : Boolean {
    const control = this.form.get(controlName); 
    return Boolean(control?.invalid) && 
    (Boolean(control?.touched) || this.isSubmitted || Boolean(control?.dirty));
  }

  onSubmit() {
    this.isSubmitted = true; 
    if(this.form.valid) {
      this.service.signin(this.form.value).subscribe({
        next: (response: any) => {

          // OLD CODE Before using the authentication service
          // localStorage.setItem('token', response.token); //Storing the token in the local storage of the browser. This allows us to persist the user's authentication state across different pages and sessions. The token can be used for subsequent authenticated requests to the backend API, allowing the user to access protected resources without having to log in again until the token expires or is removed from local storage.

          // New Code After using the authentication service
          this.service.saveToken(response.token); //Using the AuthService to save the token in local storage. This encapsulates the logic for managing the token within the service, making it easier to maintain and reuse across different components of the application. By using the service, we can ensure that the token is consistently handled and stored in a secure manner, improving the overall security and maintainability of the application.

          //Redirecting to the dashboard page after successful login. This is done by setting the window.location.href property to the URL of the dashboard page. This will navigate the user to the dashboard page where they can access protected resources and features that require authentication.
          this.router.navigateByUrl('/dashboard'); //Using the Router service to navigate to the dashboard page after successful login. This is a more Angular way of handling navigation compared to setting window.location.href, as it allows for better control over the routing and navigation within the Angular application.
          
          // console.log(response);
        },
        error: err => {
          if(err.status === 400){
            this.toaster.error('Incorrect email or password. Please try again.', 'Login Failed'); //Using the Toaster service to display an error toast notification when the login attempt fails due to incorrect email or password. This provides feedback to the user about the reason for the login failure and encourages them to try again with the correct credentials.
          }
          else{
            this.toaster.error('An error occurred during login. Please try again later.', 'Login Failed'); //Using the Toaster service to display a generic error toast notification when there is an error during the login process that is not related to incorrect credentials. This provides feedback to the user about the issue and suggests trying again later, which can be helpful in cases where there might be server issues or other unexpected errors that prevent successful login.
            console.log('error during login:\n', err);
          }
        }
      })
    }
  }

}
