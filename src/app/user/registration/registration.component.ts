import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent {
// Injecting FormBuilder to create a reactive form for user registration
formBuilder = inject(FormBuilder);

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
      Validators.pattern(/(?=.*[a-zA-Z0-9 ])/) // At least one letter, number, or space
    ]],
    confirmPassword:['']
  },  
  {validators: this.passwordMatchValidator} // To apply the custom validator to the form group. This is called inter dependent validation, where the validation logic depends on the values of multiple form controls.
);

onSubmit() {
  console.log(this.form.value);
}

}
