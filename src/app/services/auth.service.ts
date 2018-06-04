import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private token: null;

  private static _setToken (token) {
    localStorage.setItem('access-token', token);
  }

  private static _getToken () {
    return localStorage.getItem('access-token');
  }

  private static _clearToken () {
    localStorage.removeItem('access-token');
  }

  public getToken () {
    return this.token;
  }

  public setToken (token) {
    this.token = token;
    AuthService._setToken(this.token);
    return this;
  }

  public clearToken () {
    AuthService._clearToken();
    return this.setToken(null);
  }

  constructor () {
    let
      self = this,
      savedToken = AuthService._getToken();

    if (savedToken) self.setToken(savedToken);
  }

}
