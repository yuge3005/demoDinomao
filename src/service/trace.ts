import { HttpRequest } from './http-request';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-16 10:05:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-16 10:43:36
 */
export class trace {
  public static log( str: any, type: any = "d" ){
    if( HttpRequest.platForm == "Android" ){
      try{
        eval( "androidLogger.log(" + str + ")" );
      }
      catch(e){}
    }
    else{
      console.log( str );
    }
  }
}
