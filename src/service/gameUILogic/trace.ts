import { GameHttp } from '../net/game-http';
import { User } from '../user/User';
import { GamePlatform } from '../gameData/GamePlatform';
import { Application } from '../../basicUI/basic-ui.module';
import { GM } from '../gameSetting/GM';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-16 10:05:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:19:25
 */
export class trace {
  public static log( str: any ){
    if( GM.platForm == GamePlatform.ANDROID && Application.system.isMobile() ){
      this.tryReport( "androidLogger.log", str, true );
    }
    else if( Application.system.isIOS ){
      this.tryReport( "window.webkit.messageHandlers.iosTrace.postMessage", str );
    }
    else{}
  }

  public static report( str: string, extraStr: string = "" ){
    let reportStr: string = str + "_" + User.instance.id;
    if( extraStr ) reportStr += "_" + extraStr;
    if( GM.platForm == GamePlatform.ANDROID && Application.system.isMobile() ){
      this.tryReport( "androidLogger.report", reportStr, true );
    }
    else if( Application.system.isIOS ){
      this.tryReport( "window.webkit.messageHandlers.report.postMessage", reportStr );
    }
    else{}
  }

  public static tryReport( targetStr: string, reportObject: any, mustBeString: boolean = false ): void{
    try{
      if( mustBeString && typeof reportObject != "string" ) reportObject = JSON.stringify(reportObject);
      else reportObject = "'" + reportObject + "'";
      eval( targetStr + "(" + reportObject + ")" );
    }
    catch(e){
      console.log( reportObject );
    }
  }

  public static share( str: string ){
    if( GM.platForm == GamePlatform.ANDROID && Application.system.isMobile() ){
      this.tryReport( "androidLogger.share", str, true );
    }
    else if( Application.system.isIOS ){
      this.tryReport( "window.webkit.messageHandlers.share.postMessage", str );
    }
    else{}
  }

  public static error( str: string ){
    if( User.instance?.id ){
      let errorObj: string = JSON.stringify({user_id:User.instance.id,message:str});
      new GameHttp().loadData( "apis/v1/log/exception?" + GM.interfaceString, null, "POST", errorObj );
    }
    else setTimeout( trace.error, 500, str );
  }

  public static back(){
    if( confirm( "do you want to exit this APP?" ) ) trace.tryReport( "androidLogger.exitApp", "", true );
  }
}
