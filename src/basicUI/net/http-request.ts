/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-02 09:52:49
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 09:56:20
 */
export class HttpRequest {

    private callback!: Function;
    protected xhr!: XMLHttpRequest;
  
    loadData( url: string, callback: Function | any, method: string = "GET", data: any ){
      this.xhr = new XMLHttpRequest();
      this.xhr.open(method, url, true);
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