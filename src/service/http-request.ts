import { UserDataService } from "./user-data.service";

export class HttpRequest {

  private callback!: Function;
  private xhr!: XMLHttpRequest;

  public static serverUrl: string = "http://app.dinomao.com:9001/";
  public static defaultAccount: string = 'phone_123456';

  load( url: string, callback: Function | any, method: string = "GET" ){
    this.xhr = new XMLHttpRequest();
    this.xhr.open(method, HttpRequest.serverUrl + url + "account=" + HttpRequest.defaultAccount, true);
    this.xhr.addEventListener("load", this.loaded.bind( this ) );

    this.callback = callback;

    this.xhr.send(null);
  }

  loaded( ev: ProgressEvent<XMLHttpRequestEventTarget> ){
    this.xhr.removeEventListener("load", this.loaded.bind( this ) );
    let str: string = this.xhr.response;
    this.callback( JSON.parse( str ) );
  }
}
