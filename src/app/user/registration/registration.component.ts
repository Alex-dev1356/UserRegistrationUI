import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

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

form = this.formBuilder.group({
  fullName: [''],
  email: [''],
  password: [''],
  confirmPassword:['']
});

onSubmit() {
  console.log(this.form.value);
}

}
