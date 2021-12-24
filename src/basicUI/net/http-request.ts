/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-24 10:43:16
 * @Description: http request
 * @ http请求
 */
export class HttpRequest {

    private callback: Function | null = null;
    private xhr!: XMLHttpRequest;
    private returnType: string = "json";
  
    /**
     * @param {string} url
     * @param {(Function | any)} callback
     * @param {string} [method="GET"] 'get' or 'post'
     * @param {*} data
     * @param {string} [returnType=""] 'json' or 'string', default is 'string'
     * @param {*} [requestHead=null] request head object
     * @memberof HttpRequest
     * @Description: 
     * @ 发起http请求，如果有回调函数，当http请求获得服务器数据时，将返回给回调函数。
     */
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
  
    private loaded( ev: ProgressEvent<XMLHttpRequestEventTarget> ){
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
      this.callback = null;
    }
  }