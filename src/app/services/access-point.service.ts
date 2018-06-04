import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';

@Injectable()

export class AccessPointService {
  // private static prepareCallbacks (customCallbacks) {
  //
  //   customCallbacks.onSuccess = getNormalized(customCallbacks.onSuccess);
  //   customCallbacks.onFail = getNormalized(customCallbacks.onFail);
  //
  //   return customCallbacks;
  //
  //   function getNormalized (thing) {
  //     return typeof thing === 'function' ? thing : someData => {};
  //   }
  // }

  private getHeaders () {
    return new HttpHeaders()
      .append('Content-type', 'application/json')
      .append('Access-Token', this.authService.getToken() || '');
  }

  public handleHttpError (err) {
    let self = this;

    if (err.status === 401) {
      self.authService.clearToken();
      return self.router.navigate(['sign-in']);
    } else {
      console.log(err);
    }
  }

  public getRequest (apiUrl, params) {
    let reqParams = new HttpParams();

    typeof params === 'object' && Object.keys(params).forEach(
      key => reqParams = reqParams.append(key, params[key] + '')
    );

    return this.httpClient.get(apiUrl, {
      headers: this.getHeaders(),
      params: reqParams
    });
  }

  public postRequest (apiUrl, data) {
    return this.httpClient.post(apiUrl, data, {
      headers: this.getHeaders()
    });
  }

  constructor (
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}
}
