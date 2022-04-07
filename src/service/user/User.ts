/*
* @Description: user data service
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-27 17:33:42
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:21:37
*/
import { UserData } from '../gameData/dataTypes';
import { SocketIO } from '../net/socketIO';
import { trace } from '../gameUILogic/trace';
import { KeyValue } from '../../basicUI/basic-ui.module';
import { GM } from '../gameSetting/GM';
import { GamePlatform, GameLoginType } from '../gameData/gamedatas';

export class User {

  public wsk!: SocketIO;
  public userData!: UserData;

  public dataChange!: Function | null;
  public coinChange!: Function | null;
  public vipStatChange!: Function | null;
  public appId: string = '293048722427550';

  public loginData: any = null;

  public getAccountInfo( key: string ): string{
    if( !this.loginData ) this.tryToGetLocalData();
    return this.loginData[key];
  }

  public static instance = new User();

  constructor() {
  }

  getLoginData( resObj: any ){
    if( resObj ){
      this.userData = resObj;
      this.wsk = SocketIO.instance;
      this.wsk.user_Id = parseInt( this.userData.id );

      if( this.dataChange ) this.dataChange();
      if( this.coinChange ) this.coinChange( true );
      if( this.vipStatChange ) this.vipStatChange();
    }
    trace.log( resObj );
  }

  get coins(): number{
    if( this.userData ) return this.userData.coins;
    else return 0;
  }

  set coins( value: number ){
    if( !isNaN( value ) ) {
      this.userData.coins = value;
      if( this.coinChange ) this.coinChange();
    }
  }

  get score(): number{
    if( this.userData ) return this.userData.score;
    else return 0;
  }

  set score( value: number ){
    if( !isNaN( value ) ) {
      this.userData.score = value;
      if( this.dataChange ) this.dataChange();
    }
  }

  get headIcon(): string{
    if( this.userData ) return this.userData.headimg;
    else return "";
  }

  get isVip(): boolean{
    if( this.userData ) return this.userData.is_vip;
    else return false;
  }
  set isVip( value: boolean ){
    this.userData.is_vip = value;
  }

  get hasClub(): boolean{
    if( this.userData ) return this.userData.hasClub;
    else return false;
  }
  set hasClub( value: boolean ){
    this.userData.hasClub = value;
  }

  get isNew(): boolean{
    if( this.userData ) return this.userData.is_new;
    else return false;
  }

  get isFree(): boolean{
    if( this.userData ) return this.userData.is_free;
    else return false;
  }

  notFreeAnyMore(){
    this.userData.is_free = false;
  }

  get vipData(): any{
    if( this.userData ) return this.userData.vipData;
    return null;
  }
  set vipData( value: any ){
    this.userData.vipData = value;
    if( this.vipStatChange ) this.vipStatChange();
    if( this.dataChange ) this.dataChange();
  }

  get email(): string{
    return this.userData.email;
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
    return platform ? platform : GamePlatform.WEB;
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
    obStr += "&platform=" + GM.platForm;
    if( loginType == GameLoginType.FACEBOOK ) obStr += "&access_token=" + this.getAccountInfo( "access_token");
    else if( loginType == GameLoginType.APPLE ) obStr += "&access_token=" + this.getAccountInfo( "access_token");
    else if( loginType == GameLoginType.GUEST ) obStr += "&token=" + this.getAccountInfo( "token");
    return obStr;
  }

  get id(): string{
    return this.userData.id;
  }

  get name(): string{
    let name: string = this.userData.name;
    if( name ) return name;
    return "Guest";
  }
}
