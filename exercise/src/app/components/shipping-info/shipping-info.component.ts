import { Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { COUNTRIES, REGIONS } from '../../constants/static-data.constants';
import { SlidingPanelsService } from '../../core/sliding-panels.service';
import { UserInfo } from '../../shared/user-info';
import { UserInfoService } from '../../core/user-info.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.css']
})
export class ShippingInfoComponent implements OnInit {

  private states = REGIONS;
  private countries = COUNTRIES;
  @ViewChild('f') form: any;
  model: UserInfo = new UserInfo();
  selectedCountry = 'Select Option';
  selectedState = 'Select';

  constructor(private slidingPanelsService: SlidingPanelsService, private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.userInfoService.getUser().subscribe(res => {
      this.model = res;
      console.log(this.model);
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
    if (this.form.valid) {
    this.slidingPanelsService.togglePaymentMethod(true);
    }
  }

}
