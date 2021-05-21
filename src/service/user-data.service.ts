import { UserData } from './user-data';
import { SocketIO } from './socketIO';
import { Injectable } from '@angular/core';
import { HttpRequest } from './http-request';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public loading: boolean = false;
  public loaded: boolean = false;

  public wsk!: SocketIO;
  public static userData: UserData;

  constructor() {
    this.loading = true;
    new HttpRequest().load( 'login?', this.getLoginData.bind(this) );
  }

  getLoginData( resObj: any ){
    if( resObj && resObj.data ){
      this.loaded = true;
      UserDataService.userData = resObj.data;
      this.wsk = SocketIO.instance;
    }
    console.log( resObj.data );
  }
}
