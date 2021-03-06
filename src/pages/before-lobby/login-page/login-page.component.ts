import { GM, GamePlatform, GameLoginType, Trigger, trace, FacebookData, GameHttp, User, UserAddress, MainPage, WebPages, DailyBonus } from '../../../service/dinomao-game.module';
import { Component } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-03 15:23:53
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-24 12:04:52
 */

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent extends MainPage{

  constructor() {
    super();
  }

  ngOnInit() {
    this.loadDataFromServer();
  }

  loadDataFromServer(){
    GM.platForm = User.instance.getPlatformInfo();
    if( GM.platForm == GamePlatform.ANDROID || GM.platForm == GamePlatform.IOS )User.instance.userAccountInfoFromUrl();

    let loginType: string = User.instance.getAccountInfo( "login_type" );
    GM.loginType = loginType;

    if( loginType == GameLoginType.FACEBOOK && User.instance.getAccountInfo( "access_token") ){
      let obStr: string = "access_token=" + User.instance.getAccountInfo( "access_token");
      new GameHttp().loadData( "facebook_connect.php?platform=" + GM.platForm, this.getGameData.bind(this), "POST", obStr );
    }
    else if( loginType == GameLoginType.GUEST && User.instance.getAccountInfo( "token") ){
      let obStr: string = "token=" + User.instance.getAccountInfo( "token");
      new GameHttp().loadData( "guest_connect.php?platform=" + GM.platForm, this.getGameData.bind(this), "POST", obStr );
    }
    else if( loginType == GameLoginType.APPLE && User.instance.getAccountInfo( "access_token") ){
      let obStr: string = "access_token=" + User.instance.getAccountInfo( "access_token");
      new GameHttp().loadData( "apple_connect.php?platform=" + GM.platForm, this.getGameData.bind(this), "POST", obStr );
    }
    else{
      this.goLogin();
    }
  }

  goLogin(){
    var loadingPageUrl: string = GM.configs.fileServerUrl;
    if( GM.platForm == GamePlatform.ANDROID ) loadingPageUrl = "assets/login/";
    loadingPageUrl += "login_" + GM.platForm + "/login.html";
    if( GM.platForm == GamePlatform.ANDROID || GM.platForm == GamePlatform.IOS ) loadingPageUrl += "?id=" + localStorage.getItem( "id" );
    window.location.href = loadingPageUrl;
  }

  getGameData( resObj: any ){
    if( resObj ){
      var hasDataError: boolean = false;
      if( resObj.goods?.normal_goods_list ){
        GM.muchineList = resObj.goods.normal_goods_list;
        GM.categorys = resObj.goods.category;
        GM.ticketGoodslist = resObj.goods.redeem_goods_list;
      }
      else hasDataError = true;

      if( !hasDataError && resObj.user ){
        if( resObj.facebook_id ){
          resObj.user.headimg = FacebookData.getFacebookHeadImageUrlById( resObj.facebook_id, 80 );
          resObj.user.name = resObj.facebook.name;
          resObj.user.email = resObj.facebook.email;
        }
        else{
          resObj.user.email = resObj.user_info.email;
        }
        if( resObj.is_vip != null ){
          resObj.user.is_vip = resObj.is_vip;
          resObj.user.vipData = { startTime: resObj.vip_start_time, endTime: resObj.vip_end_time, level: resObj.vip_level };
        }
        if( resObj.is_new == true ){
          resObj.user.is_new = resObj.is_new;
          trace.report( "First Login" );
        }
        if( resObj.is_free == true ) resObj.user.is_free = resObj.is_free;
        FacebookData.getData( resObj.facebook );
        User.instance.getLoginData( resObj.user );
      }
      else hasDataError = true;

      if( !hasDataError && resObj.external_contents ){
        Trigger.extenalContentInit( resObj.external_contents );
      }
      else hasDataError = true;

      if( resObj.daily_bonus ){
        DailyBonus.getData( resObj.daily_bonus, resObj.collected_daily_bonus, resObj.days_in_a_row );
      }

      if( resObj.address ){
        UserAddress.getData( resObj.address );
      }

      if( resObj.log_exception ){
        console.error = trace.error;
      }

      if( hasDataError ) this.loadGameDataError( resObj );
      else{
        GM.interfaceString = User.instance.getInterfaceString();

        if( resObj.is_new == true ){
          Trigger.gotoPage( WebPages.START_UP );
        }
        else{
          Trigger.gotoPage( WebPages.LOBBY );
        }
      }
    }
  }

  loadGameDataError( gameData: any ){
    console.error( "load data error:" );
    trace.log( gameData );
    this.goLogin();
  }
}
