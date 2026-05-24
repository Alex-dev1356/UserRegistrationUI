import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  // constructor(public formBuilder: FormBuilder) { }

  formBuilder = inject(FormBuilder);

  //Creating a group of form controls for the login form using the FormBuilder service. This allows us to easily manage and validate the form inputs for user login, such as email and password fields.
  form = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

}
