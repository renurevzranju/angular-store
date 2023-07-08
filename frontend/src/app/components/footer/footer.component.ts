import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  features = [
    {
      icon: "handpicked",
      title: "Handpicked Products",
      description: "Offer handpicked products for all purchases of $100 or more."
    },
    {
      icon: "handmade",
      title: "Handmade",
      description: "Assuring product quality is our top priority."
    },
    {
      icon: "organic",
      title: "Organic Food",
      description: "Any goods you purchase can be returned within three days."
    },
    {
      icon: "delivery",
      title: "Free home delivery",
      description: "We guarantee high-quality products that you can rely on."
    }
  ];
  today: number = Date.now();
}
