import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { User } from 'src/app/models/user';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userProfileJson: string = "";

  /**
   * @constructor
   * @param {SharedService} sharedService To track the category to filter the products
   * @param {AuthService} auth Get the Logged User Information.
   * @param {Router} route Route to the products page based on the category
   * @param {UserService} userService API Interaction to persist the user data
   */
  constructor(public sharedService: SharedService,
    private route: Router, public auth: AuthService,
    private userService: UserService) { }

  /**
   * @ngOnInit
   * Gets the Logged in users information
   * Checks if the user exists in the database and creates if it does exist
   * @returns void Returns nothing
   */
  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      if (profile) {
        const response = profile;
        this.userProfileJson = JSON.stringify(response, null, 2);
        const userData = {
          user_name: response?.name || "",
          email: response?.email || ""
        };
        this.checkForUser(userData);
      }
    });
  }

  /**
   * Calls the API to checks if the user exists in the database
   * @returns void Returns nothing
   */
  checkForUser(user: User): void {
    this.userService.CheckUserExists(user.email).subscribe((response: any) => {
      localStorage.setItem('user', response.id);
      if (!response) {
        this.createUser(user);
      }
    });
  }

  /**
   * Calls the API to create a new record for logged in user
   * Stores the user ID in localStorage
   * @returns void Returns nothing
   */
  createUser(user: User): void {
    this.userService.createUser(user).subscribe((response: User) => {
      localStorage.setItem('user', (response.id as number).toString());
    });
  }

  /**
   * Stores the category in shared service and navigates to the products page
   * @returns void Returns nothing
   */
  navigateToProducts(category: string): void {
    this.sharedService.categoryFilter = category;
    this.route.navigate(["products"]);
  }
}
