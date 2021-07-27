import { GM } from '../gameSetting/GM';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-08 12:03:07
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-27 18:09:40
 */
export class HttpRequest {

  private callback!: Function;
  private xhr!: XMLHttpRequest;

  public static platForm: string = 'com';
  public static loginType: string;
  public static interfaceString: string;

  loadData( url: string, callback: Function | any, method: string = "GET", data: any ){
    this.xhr = new XMLHttpRequest();
    this.xhr.open(method, GM.configs.dataServerUrl + url, true);
    this.xhr.addEventListener("load", this.loaded.bind( this ) );

    this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    this.callback = callback;

    this.xhr.send( data );
  }

  loaded( ev: ProgressEvent<XMLHttpRequestEventTarget> ){
    this.xhr.removeEventListener("load", this.loaded.bind( this ) );
    let str: string = this.xhr.response;
    try{
      this.callback( JSON.parse( str ) );
    }
    catch(e){
      this.callback( {} );
    }
  }
}
