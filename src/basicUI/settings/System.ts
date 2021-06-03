/*
 * @Description: system infomation
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-03 10:21:17
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-03 17:08:30
 */
export class System {

  private mobile!: RegExpMatchArray | null;

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
}
