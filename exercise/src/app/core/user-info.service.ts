import { Injectable } from '@angular/core';
import {UserInfo} from '../shared/user-info';
import {HttpModule, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class UserInfoService {
 _baseUrl = 'http://localhost:3000';
 private userInfo: UserInfo;
 private userInfoSubject = new BehaviorSubject(this.userInfo);

  constructor(private http: Http) {
  }

  getUserState() {
    return this.userInfoSubject;
  }

  addUser(user: UserInfo) {
    this.http.post(this._baseUrl + '/userInfo', user).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('error', err);
      }
    );
    this.userInfoSubject.next(user);
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
}
