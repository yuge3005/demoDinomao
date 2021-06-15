/*
 * @Description: user data service
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-27 17:33:42
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-15 11:48:22
 */
import { UserData } from './user-data';
import { SocketIO } from './socketIO';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public wsk!: SocketIO;
  public static userData: UserData;

  public dataChange!: Function | null;
  public appId: string = '293048722427550';

  public gameDataLoaded: boolean = false;

  constructor() {
  }

  getLoginData( resObj: any ){
    if( resObj ){
      UserDataService.userData = resObj;
      this.wsk = SocketIO.instance;
      this.wsk.user_Id = UserDataService.userData.userid;

      if( this.dataChange ) this.dataChange();
    }
    console.log( resObj );
  }

  get coins(): number{
    if( UserDataService.userData ) return UserDataService.userData.coins;
    else return 0;
  }

  get tickets(): number{
    if( UserDataService.userData ) return UserDataService.userData.play_tickets;
    else return 0;
  }

  get headIcon(): string{
    if( UserDataService.userData ) return UserDataService.userData.headimg;
    else return "";
  }
}
