import { Injectable } from '@angular/core';
import {UserInfo} from '../shared/user-info';
import {HttpModule, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
@Injectable()
export class UserInfoService {
 _baseUrl = 'http://localhost:3000';
 isLoggedIn;
 private userInfo: UserInfo;
 private userInfoSubject = new BehaviorSubject(this.userInfo);

  constructor(private http: Http, private router: Router) {
    this.isLoggedIn = false;
  }

  getUserState() {
    return this.userInfoSubject;
  }

  addUser(user: UserInfo) {
    this.isLoggedIn = true;
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

  addUserPromise(user: UserInfo) {
    const promise = new Promise((resolve, reject) => {
      this.http.post(this._baseUrl + '/userInfo', user).toPromise()
      .then(res => {
        console.log(res.json());
        this.router.navigateByUrl('/catalog');
      });
    });
    return promise;
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

  getUser(): Observable<any> {
   return this.http.get(this._baseUrl + '/userInfo')
      .map(res => {
        return res.json();
      });
  }
  getUserBoolean(): Observable<boolean> {
    let state: boolean;
    this.getUser().map( res => {
      if (res) {
        state = true;
      } else {
        state = false;
      }
    });
    return Observable.of(state);
  }
}
