/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-10-18 15:06:13
 * @Description: Application infomation
 * @ 应用信息
 */
import { GlobalSettings } from './GlobalSettings';
import { System } from './System';
export class Application {

  private static _settings: GlobalSettings;

  /**
   * @readonly
   * @type {GlobalSettings}
   * @memberof Application
   * @Description: App settings, such as zoom mode, screen rotation mode, width and height.
   * @ 应用设置，如缩放模式，屏幕旋转模式，应用宽高
   */
  public static get settings(): GlobalSettings{
    if( !this._settings ) this._settings = new GlobalSettings;
    return this._settings;
  }

  private static _system: System;

  /**
   * @readonly
   * @static
   * @type {System}
   * @memberof Application
   * @Description: System related information provided by browser.
   * @ 浏览器提供的系统相关信息。
   * @ 提供如下API: isApp, isMObile, rootUrl
   */
  public static get system(): System{
    if( !this._system ) this._system = new System;
    return this._system;
  }

  private static originGameTime = new Date().getTime();

  /**
   * @static
   * @return {*} 
   * @memberof Application
   * @Description: Used to compute relative time.Returns the time interval from the application running to the current calling method.
   * @ 用于计算相对时间。返回从应用程序开始运行，到当前调用该方法时的时间间隔。
   */
  public static getTimer(){
    return new Date().getTime() - this.originGameTime;
  }

  constructor() { }
}
