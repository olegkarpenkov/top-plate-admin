import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AccessPointService } from '../services/access-point.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (
    private router: Router,
    private authService: AuthService,
    private accessPointService: AccessPointService
  ) {}

  canActivate(): Promise<boolean> {

    let
      self = this,
      checkAuthUrl = 'check-authorization';

    return new Promise((resolve) => {
      self.accessPointService.postRequest(checkAuthUrl, {})
        .subscribe(
          isSuccess => resolve(true),
          err => {
            console.log(err);
            self.authService.clearToken();
            self.router.navigate(['sign-in']);
            resolve(false);
          }
        );
    });
  }
}
