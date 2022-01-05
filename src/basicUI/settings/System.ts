/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-27 16:55:49
 * @description: System related information provided by browser.
 * @ 浏览器提供的系统相关信息。
 * @ provid API: isApp, isMObile, rootUrl
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
   * @return booleen
   * @description: whether is mobile devices.
   * @ 是否是移动设备
   */
  public isMobile(): boolean {
    if( this.mobile === undefined ){
      this.mobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    }
    return this.mobile != null;
  }

  /**
   * @return {*}  {boolean}
   * @memberof System
   * @description: if page is load from local application
   * @ 是否为本地应用
   */
  public isApp(): boolean{
    if( this.fileIndex == null ){
      let url: string = window.location.href;
      this.fileIndex = url.indexOf( "file://" );
    }
    return this.fileIndex == 0;
  }

  /**
   * @readonly
   * @type {string}
   * @memberof System
   * @description: the root url
   * @ 根路径
   */
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
