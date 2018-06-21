import { Injectable } from '@angular/core';
import {UserInfo} from '../shared/user-info';
import {HttpModule, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class UserInfoService {
 _baseUrl = 'http://localhost:3000';
  constructor(private http: Http) {
  }
  createUser(user: UserInfo) {
    console.log('User Name: ' + user.name);
    console.log('Address1: ' + user.address1);
    this.http.post(this._baseUrl + '/userInfo', user).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('error');
      }
    );
  }
  getUser(): Observable<UserInfo> {
    return this.http.get(this._baseUrl + '/userInfo')
      .map(res => {
        return res.json();
      });
  }
  // getUser() {
  //   let userInfo;
  //   this.http.get(this._baseUrl + '/userInfo').subscribe(
  //     res => {
  //        userInfo = res.json().map(user => {
  //         return new UserInfo(
  //               user.name,
  //               user.email,
  //               user.phone,
  //               user.address1,
  //               user.address2,
  //               user.city,
  //               user.country,
  //               user.province,
  //               user.postal
  //             );
  //       });
  //       console.log(userInfo);
  //     }
  //   );
  //   return userInfo;
  // }
}


// return res.json().map(user => {
//   return new UserInfo(
//     user.name,
//     user.email,
//     user.phone,
//     user.address1,
//     user.address2,
//     user.city,
//     user.country,
//     user.province,
//     user.postal
//   );
// });

