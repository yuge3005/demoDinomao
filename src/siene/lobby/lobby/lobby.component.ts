import { FirebaseAnaliyticsService } from './../../../service/firebase-analiytics.service';
import { MachineListData } from './MachineListData';
/*
* @Description: the lobby
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-06-08 12:06:13
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-02 10:54:34
*/
import { UserDataService } from '../../../service/user-data.service';
import { MainPage } from '../../dynamic-layer/MainPage.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpRequest } from '../../../service/http-request';
import { MachineData } from './../../../service/machine-data';
import { trace } from './../../../service/trace';

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
    if( HttpRequest.platForm == "Android" )this.user.userAccountInfoFromUrl();

    let loginType: string = this.user.getAccountInfo( "login_type" );

    if( loginType == "facebook" && this.user.getAccountInfo( "access_token") ){
      let obStr: string = "access_token=" + this.user.getAccountInfo( "access_token");
      new HttpRequest().loadData( "facebook_connect.php?platform=" + HttpRequest.platForm, this.getGameData.bind(this), "POST", obStr );
    }
    else if( loginType == "guest" && this.user.getAccountInfo( "token") ){
      let obStr: string = "token=" + this.user.getAccountInfo( "token");
      new HttpRequest().loadData( "guest_connect.php?platform=" + HttpRequest.platForm, this.getGameData.bind(this), "POST", obStr );
    }
    else{
      // localStorage.setItem( "user_account_info", "platform=Android&sid=fhjn46gdi6b2him8o30s9cc6o0&token=5c9d0364e04e97b0a6f857ec0bdf1885&login_type=guest" );
      // localStorage.setItem( "platform", "Android" ); 
      // localStorage.setItem( "id", "12" );
      this.goLogin();
    }
  }

  goLogin(){
    window.location.href = "https://staging.dinomao.com/login_" + HttpRequest.platForm + "/login.html" + ( HttpRequest.platForm == "Android" ? "?id=" + localStorage.getItem( "id" ) : "" );
  }

  getDataFromLocal(){
    this.machines = MachineListData.list;
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData(){}

  getGameData( resObj: any ){
    if( resObj ){
      var hasDataError: boolean = false;
      if( resObj.goods && resObj.goods.normal_goods_list ){
        MachineListData.list = resObj.goods.normal_goods_list;
        this.machines = MachineListData.list;
      }
      else hasDataError = true;

      if( !hasDataError && resObj.user ){
        if( resObj.facebook_id ) resObj.user.headimg = "https://graph.facebook.com/" + resObj.facebook_id + "/picture/?width=80&height=80";
        if( resObj.is_vip != null ) resObj.user.is_vip = resObj.is_vip;
        this.user.getLoginData( resObj.user );
      }
      else hasDataError = true;

      if( hasDataError ) this.loadGameDataError( resObj );
      else this.user.gameDataLoaded = true;
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
