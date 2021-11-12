import { User } from '../user/User';
import { GamePlatform } from '../gameData/GamePlatform';
import { Application } from 'resize-able-ui';
import { GM } from '../gameSetting/GM';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-16 10:05:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-04 11:11:28
 */
export class trace {
  public static log( str: any, type: any = "d" ){
    if( GM.platForm == GamePlatform.ANDROID && Application.system.isMobile() ){
      try{
        if( typeof str === "string" ){
          eval( "androidLogger.log(str)" );
        }
        else{
          eval( "androidLogger.log(JSON.stringify(str))" );
        }
      }
      catch(e){
        console.log( str );
      }
    }
    else if( Application.system.isIOS ){
      eval( "window.webkit.messageHandlers.iosTrace.postMessage(str)" );
    }
    else{
      console.log( str );
    }
  }

  public static report( str: string, extraStr: string = "" ){
    if( GM.platForm == GamePlatform.ANDROID && Application.system.isMobile() ){
      try{
        let reportStr: string = str + "_" + User.instance.id;
        if( extraStr ) reportStr += "_" + extraStr;
        eval( "androidLogger.report(reportStr)" );
      }
      catch(e){
        console.log( str );
      }
    }
    else if( Application.system.isIOS ){
      try{
        let reportStr: string = str + "_" + User.instance.id;
        if( extraStr ) reportStr += "_" + extraStr;
        eval( "window.webkit.messageHandlers.report.postMessage(reportStr)" );
      }
      catch(e){
        console.log( str );
      }
    }
    else{}
  }

  public static share( str: string ){
    if( GM.platForm == GamePlatform.ANDROID && Application.system.isMobile() ){
      try{
        if( typeof str === "string" ){
          eval( "androidLogger.share(str)" );
        }
        else{
          eval( "androidLogger.share(JSON.stringify(str))" );
        }
      }
      catch(e){
        console.log( str );
      }
    }
    else if( Application.system.isIOS ){
      eval( "window.webkit.messageHandlers.share.postMessage(str)" );
    }
    else{
      console.log( str );
    }
  }
}
