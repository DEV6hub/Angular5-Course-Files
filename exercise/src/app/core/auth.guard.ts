import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserInfoService } from './user-info.service';
import 'rxjs/add/observable/of';

// Object.prototype.isEmpty = function() {
//   for (const key in this) {
//       if (this.hasOwnProperty(key)) {
//         return false;
//       }
//   }
//   return true;
// };

@Injectable()
export class AuthGuard implements CanActivate {
  response: any;
  constructor(
    private userInfo: UserInfoService,
    private router: Router
  ) {}
  isEmpty(myObject) {
    for (const key in myObject) {
        if (myObject.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      // if (this.userInfo.isLoggedIn) {
      //  return true;
      // } else {
      //   window.alert('You don\'t have permission to view this page.Please signup .');
      //   this.router.navigateByUrl('/home');
      //   return false;
      // }
      // this.userInfo.getUser().subscribe((res) => {
      //   this.response = res;
      //   console.log('response is:', res);
      //   if (this.response && Object.keys(this.response).length !== 0) {
      //     return true;
      //   } else {
      //     window.alert('You don\'t have permission to view this page');
      //     this.router.navigateByUrl('\home');
      //     return false;
      //   }
      // });

      return this.userInfo.getUserBoolean().map(e => {
        if (e) {
            return true;
        }
    });
    // .catch(err => {
    //     this.router.navigate(['/home']);
    //     return Observable.of(false);
    // });
     // return;
  }
}
