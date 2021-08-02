import { GM, GamePlatform, GameLoginType, GoodsData, Trigger, trace, Loading, FacebookData, HttpRequest, User, FirebaseAnaliyticsService } from './../../../service/dinomao-game.module';
/*
* @Description: the lobby
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-06-08 12:06:13
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-02 15:40:59
*/
import { MainPage } from '../../dynamic-layer/MainPage.component';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, MainPage, OnDestroy {
  pageHeight: number = 0;
  emptyCallback: Function | null = null;

  machines: GoodsData[] = [];
  constructor( private analytics: FirebaseAnaliyticsService ) { }

  ngOnInit() {
    if( User.instance.gameDataLoaded ) this.getDataFromLocal();
    else this.loadDataFromServer();

    if( !this.analytics.inited ) this.analytics.analyticsInit();
  }

  loadDataFromServer(){
    GM.platForm = User.instance.getPlatformInfo();
    if( GM.platForm == GamePlatform.ANDROID || GM.platForm == GamePlatform.IOS )User.instance.userAccountInfoFromUrl();

    let loginType: string = User.instance.getAccountInfo( "login_type" );
    GM.loginType = loginType;

    if( loginType == GameLoginType.FACEBOOK && User.instance.getAccountInfo( "access_token") ){
      let obStr: string = "access_token=" + User.instance.getAccountInfo( "access_token");
      new HttpRequest().loadData( "facebook_connect.php?platform=" + GM.platForm, this.getGameData.bind(this), "POST", obStr );
    }
    else if( loginType == GameLoginType.GUEST && User.instance.getAccountInfo( "token") ){
      let obStr: string = "token=" + User.instance.getAccountInfo( "token");
      new HttpRequest().loadData( "guest_connect.php?platform=" + GM.platForm, this.getGameData.bind(this), "POST", obStr );
    }
    else if( loginType == GameLoginType.APPLE && User.instance.getAccountInfo( "access_token") ){
      let obStr: string = "access_token=" + User.instance.getAccountInfo( "access_token");
      new HttpRequest().loadData( "apple_connect.php?platform=" + GM.platForm, this.getGameData.bind(this), "POST", obStr );
    }
    else{
      this.goLogin();
    }
  }

  goLogin(){
    var loadingPageUrl: string = GM.configs.fileServerUrl + "login_" + GM.platForm + "/login.html";
    if( GM.platForm == GamePlatform.ANDROID || GM.platForm == GamePlatform.IOS ) loadingPageUrl += "?id=" + localStorage.getItem( "id" );
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
        User.instance.getLoginData( resObj.user );
      }
      else hasDataError = true;

      if( !hasDataError && resObj.external_contents ){
        Trigger.extenalContentInit( resObj.external_contents );
      }
      else hasDataError = true;

      if( hasDataError ) this.loadGameDataError( resObj );
      else{
        User.instance.gameDataLoaded = true;
        Loading.status = 1;
        GM.interfaceString = User.instance.getInterfaceString();
      }
    }
  }

  onProductItemClick( itemData: GoodsData ){
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
