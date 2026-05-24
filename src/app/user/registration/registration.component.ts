import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipes/first-key.pipe';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent {
// Injecting FormBuilder to create a reactive form for user registration
formBuilder = inject(FormBuilder);

// Injecting the AuthService to perform user registration operations such as sending the registration data to the backend API. This allows us to use the methods defined in the AuthService to handle user registration logic, such as making HTTP requests to the server and processing responses.
private service = inject(AuthService);

// Injecting the ToastrService to display toast notifications for various events such as success messages, error messages, etc. This allows us to use the methods provided by the ToastrService to show notifications to the user based on the outcome of their actions (e.g., successful registration, registration errors, etc.).
private toastr = inject(ToastrService); 

// A boolean variable to track whether the form has been submitted or not. This can be used to conditionally display error messages only after the user has attempted to submit the form. 
isSubmitted: boolean = false;

// Custom validator to check if the password and confirm password fields match
passwordMatchValidator: ValidatorFn = (control: AbstractControl) : null => {
  const password = control.get('password') //To access the password field in the form
  const confirmPassword = control.get('confirmPassword') //To access the confirm password field in the form

  if(password && confirmPassword && password.value !== confirmPassword.value) // If both fields exist and their values do not match 
  {
    confirmPassword?.setErrors({ passwordMismatch: true }) // If the passwords do not match, set an error on the confirm password field
  }
  else
  {
    confirmPassword?.setErrors(null) // If the passwords match, clear any existing errors on the confirm password field
  }

  return null
}

form = this.formBuilder.group({
    fullName: ['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['',[
      Validators.required, 
      Validators.minLength(6),
      Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/) // At least one letter, number, or special character without space
    ]],
    confirmPassword:['']
  },  
  {validators: this.passwordMatchValidator} // To apply the custom validator to the form group. This is called inter dependent validation, where the validation logic depends on the values of multiple form controls.
);

onSubmit() {
  this.isSubmitted = true; // Set the isSubmitted flag to true when the form is submitted

  // Check if the form is valid before proceeding with form submission logic. This ensures that the form data is only processed if all validation rules are satisfied.
  if(this.form.valid)
    {
      // Proceed with form submission logic (e.g., send data to the server, display success message, etc.)
      console.log(this.form.value);

      //Invoking the createUser method of the AuthService to send the registration data to the backend API. The form.value contains the values of all form controls, which will be sent as the request body in the POST request to the server for user registration.
      this.service.createUser(this.form.value)
      .subscribe({
        next: (response: any) => {

          if(response.succeeded)// If the registration was successful, then reset the form and set the isSubmitted flag back to false. This allows the user to see a success message and also allows them to submit the form again if they want to register another user.
          {
            console.log('User registered successfully!');
            this.form.reset();
            this.isSubmitted = false;
            this.toastr.success('User registered successfully!', 'Registration Successful'); // Display a success toast notification to the user using the ToastrService. This provides feedback to the user that their registration was successful.
          }

          console.log('response:', response);
        },// Handle successful registration response (e.g., display success message, navigate to login page, etc.)
        error: err => {
          if(err.error){
            err.error.forEach((x: any) => {
              switch(x.code){
                //We do this because the backend API returns an error code of "DuplicateEmail" when the email provided by the user is already taken. By checking for this specific error code, we can display a more user-friendly and specific error message to the user, informing them that the email they entered is already in use and prompting them to choose a different email address for registration.
                case 'DuplicateEmail':
                  this.toastr.error('Email is already taken. Please choose a different email.', 'Registration Failed');
                  break;
                
                //We do this because the backend API returns an error code of "DuplicateUserName" when the username provided by the user is already taken. By checking for this specific error code, we can display a more user-friendly and specific error message to the user, informing them that the username they entered is already in use and prompting them to choose a different username for registration.
                case 'DuplicateUserName':
                  this.toastr.error('Username is already taken. Please choose a different username.', 'Registration Failed');
                  break;

                //This displays a generic error message to the user if the registration fails for any other reason. By providing a default case in the switch statement, we can ensure that the user receives feedback about the failure of their registration attempt, even if the specific error code is not recognized or handled explicitly. This helps improve the user experience by informing them that something went wrong and encourages them to contact the developer for further assistance.
                default:
                  this.toastr.error('Contact the developer', 'Registration Failed'); 
                  console.log(x);
                  break;
              }});
          }
          else{
            console.log('error:', err)// Handle registration error response (e.g., display error message, log error, etc.)
          }
        }
      });
    }

  console.log(this.form.value);
}


hasDisplayableError(controlName: string) : Boolean {
  const control = this.form.get(controlName); // To get the form control by its name
  return Boolean(control?.invalid) && // To check if the control is invalid
  (Boolean(control?.touched) || this.isSubmitted || Boolean(control?.dirty)); // To check if the control has been touched or the form has been submitted. This ensures that error messages are only displayed after the user has interacted with the form or attempted to submit it.
}

}
