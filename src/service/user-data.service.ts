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

  public dataChange!: Function | null;

  constructor() {
    this.loading = true;
    new HttpRequest().load( 'login?', this.getLoginData.bind(this) );
  }

  getLoginData( resObj: any ){
    if( resObj && resObj.data ){
      this.loaded = true;
      UserDataService.userData = resObj.data;
      this.wsk = SocketIO.instance;

      if( this.dataChange ) this.dataChange();
    }
    console.log( resObj.data );
  }

  get coins(): number{
    if( UserDataService.userData ) return UserDataService.userData.coins;
    else return 0;
  }

  get tickets(): number{
    if( UserDataService.userData ) return UserDataService.userData.play_tickets;
    else return 0;
  }
}
