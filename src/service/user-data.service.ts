/*
 * @Description: user data service
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-27 17:33:42
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-16 10:25:43
 */
import { UserData } from './user-data';
import { SocketIO } from './socketIO';
import { Injectable } from '@angular/core';
import { trace } from './trace';
import { KeyValue } from './KeyValue';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public wsk!: SocketIO;
  public userData!: UserData;

  public dataChange!: Function | null;
  public appId: string = '293048722427550';

  public gameDataLoaded: boolean = false;

  public loginData: any = null;

  public getAccountInfo( key: string ): string{
    if( !this.loginData ) this.tryToGetLocalData();
    return this.loginData[key];
  }

  constructor() {
  }

  getLoginData( resObj: any ){
    if( resObj ){
      this.userData = resObj;
      this.wsk = SocketIO.instance;
      this.wsk.user_Id = parseInt( this.userData.id );

      if( this.dataChange ) this.dataChange();
    }
    trace.log( resObj );
  }

  get coins(): number{
    if( this.userData ) return this.userData.coins;
    else return 0;
  }

  get tickets(): number{
    if( this.userData ) return this.userData.play_tickets;
    else return 0;
  }

  get headIcon(): string{
    if( this.userData ) return this.userData.headimg;
    else return "";
  }

  tryToGetLocalData(){
    let userAccountInfo = localStorage.getItem('user_account_info');
    this.loginData = KeyValue.parse( userAccountInfo + "" );
  }

  public getPlatformInfo(){
    let platFormStrIndex: number = window.location.href.indexOf( "platform=" );
    if( platFormStrIndex >= 0 ){
      let strRequest: string = window.location.href.substr( platFormStrIndex );
      let arr: Array<string> = strRequest.split("&");
      arr.map( (k) => {
        if (k !== '') {
          let keyValue = k.split('=');
          localStorage.setItem( keyValue[0], keyValue[1] );
        }
      });
    }

    let platform = localStorage.getItem( "platform" );
    return platform ? platform : "com";
  }

  public userAccountInfoFromUrl(){
    let userAcountStrIndex: number = window.location.href.indexOf( "user_account_info=" );
    if( userAcountStrIndex >= 0 ){
      let strRequest: string = window.location.href.substr( userAcountStrIndex + "user_account_info=".length );
      localStorage.setItem( "user_account_info", strRequest );
    }
  }

  public getInterfaceString(): string{
    let obStr: string = "&uid=" + this.userData.id;
    let loginType: string = this.getAccountInfo( "login_type");
    obStr += "&network=" + loginType;
    if( loginType == "facebook" ) obStr += "&access_token=" + this.getAccountInfo( "access_token");
    else if( loginType == "Android" ) obStr += "&token=" + this.getAccountInfo( "token");
    return obStr;
  }
}
