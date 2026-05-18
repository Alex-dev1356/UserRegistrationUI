import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipes/first-key.pipe';

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
  console.log(this.form.value);
}

hasDisplayableError(controlName: string) : Boolean {
  const control = this.form.get(controlName); // To get the form control by its name
  return Boolean(control?.invalid) && // To check if the control is invalid
  (Boolean(control?.touched) || this.isSubmitted); // To check if the control has been touched or the form has been submitted. This ensures that error messages are only displayed after the user has interacted with the form or attempted to submit it.
}

}
