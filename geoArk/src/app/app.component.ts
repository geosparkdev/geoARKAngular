import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// export class AppComponent implements OnInit {
//   title = 'geoArk';



//   constructor(public router: Router) { }
    

//   async ngOnInit() {


//   }
// }





export class AppComponent implements OnInit {
  title = 'geoArk';
  isAuthenticated: boolean;
  constructor(public oktaAuth: OktaAuthService, public router: Router) {
    // // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  // constructor(public router: Router) {
    
  // }
  async ngOnInit() {
    // Get the authentication state for immediate use
   this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }
  login() {
    this.oktaAuth.loginRedirect('/profile');
  }
  async logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/login');
  }
}
