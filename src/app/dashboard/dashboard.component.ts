import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {

  private router = inject(Router);

onLogout() {
  localStorage.removeItem('token'); // To remove the token from local storage, effectively logging the user out of the application. This is a common practice in web applications to clear the user's authentication token when they choose to log out, ensuring that they can no longer access protected resources or perform authenticated actions until they log in again.

  this.router.navigateByUrl('/signin'); // To navigate the user back to the sign-in page after logging out. This allows the user to easily log in again if they wish to access protected resources or features that require authentication. By redirecting to the sign-in page, it provides a clear path for the user to re-authenticate and regain access to the application after logging out.
}

}
