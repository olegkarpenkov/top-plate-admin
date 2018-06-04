import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessPointService } from '../../services/access-point.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in-route',
  templateUrl: './sign-in-route.component.html',
  styleUrls: ['./sign-in-route.component.scss']
})
export class SignInRouteComponent implements OnInit {

  public loginStr: any = '';

  public pswrdStr: any = '';

  public errorMessage: any = null;

  public isSubmitted: Boolean = false;

  public get isReadyToSubmit () {
    let self = this;
    return !!self.loginStr && !!self.pswrdStr;
  }

  public submit () {
    let self = this;

    self.isSubmitted = true;

    self.accessPointService.postRequest('sign-in', {
      login: self.loginStr,
      password: self.pswrdStr
    }).subscribe(
      res => {
        self.authService.setToken(res['access-token']);
        self.router.navigate(['home']);
      },
      err => {
        self.errorMessage = err.error.message;
        self.isSubmitted = false;
      }
    );
  }

  constructor (
    private accessPointService: AccessPointService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit () {}

}
