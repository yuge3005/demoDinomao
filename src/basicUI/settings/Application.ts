/*
 * @Description: Application infomation
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-03 10:00:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-18 15:06:13
 */
import { GlobalSettings } from './GlobalSettings';
import { System } from './System';
export class Application {

  private static _settings: GlobalSettings;

  public static get settings(): GlobalSettings{
    if( !this._settings ) this._settings = new GlobalSettings;
    return this._settings;
  }

  private static _system: System;

  public static get system(): System{
    if( !this._system ) this._system = new System;
    return this._system;
  }

  private static originGameTime = new Date().getTime();

  public static getTimer(){
    return new Date().getTime() - this.originGameTime;
  }

  constructor() { }
}
