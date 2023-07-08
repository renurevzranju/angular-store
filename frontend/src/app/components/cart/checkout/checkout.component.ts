import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent{
  panelOpenState: boolean = false;
  billingForm: FormGroup;
  countries: String[] = ["Australia", "Canada", "China", "India", "Morocco", "Saudi Arabia", "United Kingdom (UK)", "United States (US)"];
  paymentMode: string = "cod";

  constructor(private fb: FormBuilder) {
    let emailRegex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let phoneRegex: RegExp = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    this.billingForm = fb.group({
      email: ["", [Validators.required, Validators.pattern(emailRegex)]],
      firstName: [null, Validators.required],
      lastName: [null],
      phoneNo: [null, Validators.required, Validators.pattern(phoneRegex)],
      country: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      address: [null, Validators.required],
      zip: [null, Validators.required],
      validate: '',
    });
  }

  onSubmit() {
    alert('Thanks for submitting! Data: ');
  }
}
