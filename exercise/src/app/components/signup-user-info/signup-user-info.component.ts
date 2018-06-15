import { Component, OnInit } from '@angular/core';
import { COUNTRIES, REGIONS } from '../../constants/static-data.constants';
import { Router } from '@angular/router';
import { UserInfo } from '../../shared/user-info';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { UserInfoService } from '../../core/user-info.service';


@Component({
  selector: 'app-signup-user-info',
  templateUrl: './signup-user-info.component.html',
  styleUrls: ['./signup-user-info.component.css']
})
export class SignupUserInfoComponent implements OnInit {
  userInfoForm: FormGroup;
  userInfo = new UserInfo();
  private states = REGIONS;
  private countries = COUNTRIES;
  selectedCountry = 'Select Option';
  selectedState = 'Select';

  contactIntro = 'Welcome to the club, where can we ship your shirts to? You can always provide this information at checkout';
  constructor(private router: Router, private fb: FormBuilder, private userInfoService: UserInfoService) { }




  ngOnInit() {
    this.userInfoForm = this.fb.group({
      name: new FormControl(this.userInfo.name, [Validators.required]),
      phone: new FormControl(this.userInfo.phone, [Validators.required]),
      address1: new FormControl(this.userInfo.address1, [Validators.required]),
      address2: new FormControl(this.userInfo.address2, [Validators.required]),
      city: new FormControl(this.userInfo.city, [Validators.required]),
      country: new FormControl(this.userInfo.country, [Validators.required]),
      province: new FormControl(this.userInfo.province, [Validators.required]),
      postal: new FormControl(this.userInfo.postal, [Validators.required]),
    });
  }

  selectCountry(country) {
    this.selectedCountry = country;
    this.selectedState = 'Select';
  }

  selectState(state) {
    this.selectedState = state;
  }

  doLater() {
    this.router.navigateByUrl('/catalog');
  }

  save() {
    if (this.userInfoForm.valid) {
      this.userInfo = this.userInfoForm.value;
      this.userInfoService.createUser(this.userInfo);
      this.router.navigateByUrl('/catalog');
     }
  }

}
