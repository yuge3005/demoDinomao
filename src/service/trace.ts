import { HttpRequest } from './http-request';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-16 10:05:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-16 17:06:54
 */
export class trace {
  public static log( str: any, type: any = "d" ){
    if( HttpRequest.platForm == "Android" ){
      try{
        if( typeof str === "string" ){
          window.location.href = "js://webview?log=" + str;
          eval( "androidLogger.log(str)" );
        }
        else{
          window.location.href = "js://webview?log=" + JSON.stringify(str);
          eval( "androidLogger.log(JSON.stringify(str))" );
        }
      }
      catch(e){
        console.log( str );
        console.log( "console.error" );
        window.location.href = "js://webview?log=console.error";
      }
    }
    else{
      console.log( str );
    }
  }
}
