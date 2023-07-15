import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  /**
   * @constructor
   * @param {SharedService} sharedService To display the Cart Count
   * @param {AuthService} auth to login and logout using Auth0
   * @param {Document} doc Get the current location URL
  */
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    public sharedService: SharedService
  ) {}

  /**
   * Login using Auth0 Service
   * @returns void
   */
  loginWithRedirect(): void {
    this.auth.loginWithRedirect({ appState: { target: '/home' } });
  }

  /**
   * Logout of the application
   * Clear the local storage
   * @returns void
   */
  logout(): void {
    localStorage.clear();
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }
}
