import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { User } from 'src/app/helpers/user';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userProfileJson: string = "";

  constructor(public sharedService: SharedService,
    private route: Router, public auth: AuthService,
    private userService: UserService){}

  ngOnInit(): void{
    this.auth.user$.subscribe((profile) => {
      if(profile){
        const response = profile;
        this.userProfileJson = JSON.stringify(response, null, 2);
        this.sharedService.setUserData(JSON.stringify(response, null, 2));
        let userData = {
          user_name: response?.name || "",
          email: response?.email || ""
        };
        this.checkForUser(userData);
      }
    });
  }

  checkForUser(user: User){
    this.userService.CheckUserExists(user.email).subscribe((response: any) => {
      if(!response){
        this.createUser(user);
      }
    });
  }

  createUser(user: User){
    this.userService.createUser(user).subscribe((response: User) => {
      this.sharedService.setUserData(JSON.stringify(response));
    });
  }

  navigateToProducts(category: string) {
    this.sharedService.categoryFilter = category;
    this.route.navigate(["products"]);
  }
}
