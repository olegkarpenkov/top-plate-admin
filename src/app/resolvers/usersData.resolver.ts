import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AccessPointService } from '../services/access-point.service';

@Injectable()
export class UsersDataResolver implements Resolve<any> {

  constructor (
    private accessPointService: AccessPointService,
    private router: Router
  ) {}

  resolve (routeSnapshot: ActivatedRouteSnapshot) {
    let self = this;
    return new Promise((resolve, reject) => {
      self.accessPointService.getRequest('/get-users-data', {})
        .subscribe(
          data => {
            resolve(data);
          },
          err => self.accessPointService.handleHttpError(err)
        );
    });
  }
}
