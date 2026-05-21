# AuthECClient

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.25.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## To Activate Standalone Component by default when creating a component in the terminal
Go to angular.json -> find "@schematics/angular:component" -> then Add "standalone": true
"@schematics/angular:component": {
          "inlineStyle": true,
          "style": "scss",
          "skipTests": true,
          "standalone": true
        }

## To add Bootstrap navigate to getbootstrap.com and get the CDN Link then paste it inside the index.html within the <head> tag 
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

## To Add Google Fonts navigate to https://fonts.google.com/specimen/Inter then click on Get Font then Click on Get embeded code then paste it on the index.html inside the <head> tag
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">


## About Validation Function 
ValidatorFn
A function that receives a control and synchronously returns a map of validation errors if present, otherwise null.

interface ValidatorFn {
  (control: AbstractControl<any, any>): ValidationErrors;
}

ValidationErrors
@paramcontrolAbstractControl<any, any>
@returnsValidationErrors

## Creating a new Pipe to Display one error message at a time
ng g p shared/pipes/firstKey

## Adding and registering ngx-toastr to show the notification once the user is successfully registered
In the terminal paste the command => npm i ngx-toastr --force and install its another dependency => npm install @angular/animations