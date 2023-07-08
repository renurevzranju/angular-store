import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public sharedService: SharedService, private route: Router){}
  navigateToProducts(category: string) {
    this.sharedService.categoryFilter = category;
    this.route.navigate(["products"]);
  }
}
