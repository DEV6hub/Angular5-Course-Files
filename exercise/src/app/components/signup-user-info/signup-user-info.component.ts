import { Component, OnInit } from '@angular/core';
import { COUNTRIES, REGIONS } from '../../constants/static-data.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-user-info',
  templateUrl: './signup-user-info.component.html',
  styleUrls: ['./signup-user-info.component.css']
})
export class SignupUserInfoComponent implements OnInit {
  private states = REGIONS;
  private countries = COUNTRIES;

  selectedCountry = 'Select Option';
  selectedState = 'Select';

  contactIntro = 'Welcome to the club, where can we ship your shirts to? You can always provide this information at checkout';
  constructor(private router: Router) { }




  ngOnInit() {
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
    this.doLater();
  }

}
