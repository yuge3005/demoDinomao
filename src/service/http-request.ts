/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-08 12:03:07
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-10 13:27:55
 */
export class HttpRequest {

  private callback!: Function;
  private xhr!: XMLHttpRequest;

  public static dataServerUrl: string = "https://apistaging.dinomao.com/";
  public static platForm: string = 'com';

  loadData( url: string, callback: Function | any, method: string = "GET", data: any ){
    this.xhr = new XMLHttpRequest();
    this.xhr.open(method, HttpRequest.dataServerUrl + url, true);
    this.xhr.addEventListener("load", this.loaded.bind( this ) );

    this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    this.callback = callback;

    this.xhr.send( data );
  }

  loaded( ev: ProgressEvent<XMLHttpRequestEventTarget> ){
    this.xhr.removeEventListener("load", this.loaded.bind( this ) );
    let str: string = this.xhr.response;
    this.callback( JSON.parse( str ) );
  }
}
