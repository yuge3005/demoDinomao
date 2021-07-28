import { GameLoginType } from './../../../service/gameData/GameLoginType';
import { GM } from './../../../service/gameSetting/GM';
import { Trigger } from './../../../service/gameUILogic/Trigger';
import { FacebookData } from '../../../service/user/FacebookData';
import { FirebaseAnaliyticsService } from './../../../service/firebase-analiytics.service';
/*
* @Description: the lobby
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-06-08 12:06:13
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-28 13:31:49
*/
import { UserDataService } from '../../../service/user/user-data.service';
import { MainPage } from '../../dynamic-layer/MainPage.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpRequest } from '../../../service/net/http-request';
import { MachineData } from '../../../service/gameData/machine-data';
import { trace } from '../../../service/gameUILogic/trace';
import { Loading } from 'src/service/gameUILogic/Loading';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, MainPage, OnDestroy {
  pageHeight: number = 0;
  emptyCallback: Function | null = null;

  machines: MachineData[] = [];
  constructor( private user: UserDataService, private analytics: FirebaseAnaliyticsService ) { }

  ngOnInit() {
    if( this.user.gameDataLoaded ) this.getDataFromLocal();
    else this.loadDataFromServer();

    if( !this.analytics.inited ) this.analytics.analyticsInit();
  }

  loadDataFromServer(){
    HttpRequest.platForm = this.user.getPlatformInfo();
    if( HttpRequest.platForm == "Android" || HttpRequest.platForm == "iOS" )this.user.userAccountInfoFromUrl();

    let loginType: string = this.user.getAccountInfo( "login_type" );
    HttpRequest.loginType = loginType;

    if( loginType == GameLoginType.FACEBOOK && this.user.getAccountInfo( "access_token") ){
      let obStr: string = "access_token=" + this.user.getAccountInfo( "access_token");
      new HttpRequest().loadData( "facebook_connect.php?platform=" + HttpRequest.platForm, this.getGameData.bind(this), "POST", obStr );
    }
    else if( loginType == GameLoginType.GUEST && this.user.getAccountInfo( "token") ){
      let obStr: string = "token=" + this.user.getAccountInfo( "token");
      new HttpRequest().loadData( "guest_connect.php?platform=" + HttpRequest.platForm, this.getGameData.bind(this), "POST", obStr );
    }
    else if( loginType == GameLoginType.APPLE && this.user.getAccountInfo( "access_token") ){
      let obStr: string = "access_token=" + this.user.getAccountInfo( "access_token");
      new HttpRequest().loadData( "apple_connect.php?platform=" + HttpRequest.platForm, this.getGameData.bind(this), "POST", obStr );
    }
    else{
      // localStorage.setItem( "user_account_info", "platform=Android&sid=fhjn46gdi6b2him8o30s9cc6o0&token=5c9d0364e04e97b0a6f857ec0bdf1885&login_type=guest" );
      // localStorage.setItem( "platform", "Android" ); 
      // localStorage.setItem( "id", "12" );
      this.goLogin();
    }
  }

  goLogin(){
    var loadingPageUrl: string = GM.configs.fileServerUrl + "login_" + HttpRequest.platForm + "/login.html";
    if( HttpRequest.platForm == "Android" || HttpRequest.platForm == "iOS" ) loadingPageUrl += "?id=" + localStorage.getItem( "id" );
    window.location.href = loadingPageUrl;
  }

  getDataFromLocal(){
    this.machines = GM.muchineList;
    setTimeout(() => {
      Loading.status = 1;
    }, 200);
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData(){}

  getGameData( resObj: any ){
    if( resObj ){
      var hasDataError: boolean = false;
      if( resObj.goods && resObj.goods.normal_goods_list ){
        GM.muchineList = resObj.goods.normal_goods_list;
        this.machines = GM.muchineList;
      }
      else hasDataError = true;

      if( !hasDataError && resObj.user ){
        if( resObj.facebook_id ) resObj.user.headimg = FacebookData.getFacebookHeadImageUrlById( resObj.facebook_id, 80 );
        if( resObj.is_vip != null ) resObj.user.is_vip = resObj.is_vip;
        FacebookData.getData( resObj.facebook );
        this.user.getLoginData( resObj.user );
      }
      else hasDataError = true;

      if( !hasDataError && resObj.external_contents ){
        Trigger.extenalContentInit( resObj.external_contents );
      }
      else hasDataError = true;

      if( hasDataError ) this.loadGameDataError( resObj );
      else{
        this.user.gameDataLoaded = true;
        Loading.status = 1;
      }

      HttpRequest.interfaceString = this.user.getInterfaceString();
    }
  }

  onProductItemClick( itemData: MachineData ){
    if( this.emptyCallback ) this.emptyCallback( "video", itemData );
  }

  ngOnDestroy(){
    this.emptyCallback = null;
  }

  loadGameDataError( gameData: any ){
    trace.log( "load data error:" );
    trace.log( gameData );
    // this.goLogin();
  }
}
