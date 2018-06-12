import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { COUNTRIES, REGIONS } from '../../constants/static-data.constants';
import { SlidingPanelsService } from '../../core/sliding-panels.service';

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.css']
})
export class ShippingInfoComponent implements OnInit {

  private states = REGIONS;
  private countries = COUNTRIES;

  shippingInfoForm: FormGroup;

  selectedCountry = 'Select Option';
  selectedState = 'Select';

  constructor(private fb: FormBuilder, private slidingPanelsService: SlidingPanelsService) {
  } 

  ngOnInit() {
    this.shippingInfoForm = this.fb.group({
      name: [],
      email: [],
      phone: [],
      address1: [],
      address2: [],
      city: [],
      country: [],
      province: [],
      postal: []
    });
  }

  selectCountry(country) {
    this.selectedCountry = country;
    this.selectedState = 'Select';
  }

  selectState(state) {
    this.selectedState = state;
  }

  goToPayment(): void {
    this.slidingPanelsService.togglePaymentMethod(true);
  }

}
