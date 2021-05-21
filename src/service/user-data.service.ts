import { Injectable } from '@angular/core';
import { HttpRequest } from './http-request';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public loading: boolean = false;
  public loaded: boolean = false;

  constructor() {
    this.loading = true;
    new HttpRequest().load( 'login?', this.getLoginData.bind(this) );
  }

  getLoginData( resObj: any ){
    if( resObj && resObj.data ){
      this.loaded = true;
    }
    console.log( resObj.data );
  }
}
