import { Component, inject, ViewChild } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { trigger, style, animate, transition, query } from '@angular/animations';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RegistrationComponent, 
    RouterOutlet],
  templateUrl: './user.component.html',
  styles: ``,
  animations: [
    //defining the animation
    trigger('routerFadeIn', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0 }),
          animate('1s ease-in-out', style({ opacity: 1 }))
        ],
        { optional: true })
      ])
    ])
  ]
})
export class UserComponent {

  private context = inject(ChildrenOutletContexts);

  // This method returns the URL of the current route being displayed in the router outlet. It uses the ChildrenOutletContexts service to access the context of the primary outlet and retrieves the URL from the route information. This URL can be used to trigger animations based on route changes, allowing for dynamic transitions between different views or components in the application when navigating through routes. By using this method in conjunction with Angular's animation system, you can create smooth and visually appealing transitions between different pages or sections of your application as users navigate through it.
  getRouteUrl() {
    return this.context.getContext('primary')?.route?.url;
  }
}
