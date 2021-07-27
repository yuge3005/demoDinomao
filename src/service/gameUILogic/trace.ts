import { Application } from '../../basicUI/basic-ui.module';
import { HttpRequest } from '../net/http-request';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-16 10:05:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-27 12:00:14
 */
export class trace {
  public static log( str: any, type: any = "d" ){
    if( HttpRequest.platForm == "Android" && Application.system.isMobile() ){
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
}
