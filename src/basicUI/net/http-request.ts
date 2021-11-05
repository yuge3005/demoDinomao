/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-02 09:52:49
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-05 13:50:16
 */
export class HttpRequest {

    private callback!: Function;
    protected xhr!: XMLHttpRequest;
    protected returnType: string = "json";
  
    loadData( url: string, callback: Function | any, method: string = "GET", data: any, returnType: string = "", requestHead: any = null ){
      this.xhr = new XMLHttpRequest();
      this.xhr.open(method, url, true);
      this.xhr.addEventListener("load", this.loaded.bind( this ) );
  
      this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      if( requestHead ){
        for( let ob in requestHead ){
          this.xhr.setRequestHeader(ob, requestHead[ob]);
        }
      }
  
      this.callback = callback;
      if( returnType )this.returnType = returnType;
  
      this.xhr.send( data );
    }
  
    loaded( ev: ProgressEvent<XMLHttpRequestEventTarget> ){
      this.xhr.removeEventListener("load", this.loaded.bind( this ) );
      let str: string = this.xhr.response;

      if( !this.callback ) return;
      if( this.returnType == "json" ){
        try{
          this.callback( JSON.parse( str ) );
        }
        catch(e){
          this.callback( {} );
        }
      }
      else{
        this.callback( str );
      }
    }
  }