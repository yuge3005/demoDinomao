/*
 * @Description: system infomation
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-03 10:21:17
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-07 13:57:21
 */
export class System {

  private mobile!: RegExpMatchArray | null;
  private fileIndex: number | null = null;
  private rootUrlStr!: string;

  /**
   * must set by developer
   * @type {boolean}
   * @memberof System
   */
  public isIOS: boolean = false;

  constructor() { }

  /**
   * @method: whether is mobile devices.
   * @return booleen
   */
  public isMobile(): boolean {
    if( this.mobile === undefined ){
      this.mobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    }
    return this.mobile != null;
  }

  public isApp(): boolean{
    if( this.fileIndex == null ){
      let url: string = window.location.href;
      this.fileIndex = url.indexOf( "file://" );
    }
    return this.fileIndex == 0;
  }

  public get rootUrl(): string{
    if( !this.rootUrlStr ){
      let url: string = window.location.href;
      let qmIndex: number = url.indexOf( "?" );
      if( qmIndex >= 0 ) url = url.substr( 0, qmIndex );
      let lastChar: string = url.charAt( url.length - 1 );
      if( lastChar == "/" ){
        this.rootUrlStr = url;
      }
      else{
        let lastSlash: number = url.lastIndexOf( "/" );
        this.rootUrlStr = url.substr( 0, lastSlash + 1 );
      }
    }
    return this.rootUrlStr;
  }
}
