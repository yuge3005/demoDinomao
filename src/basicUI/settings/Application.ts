/*
 * @Description: Application infomation
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-03 10:00:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-03 17:24:18
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
  constructor() { }
}
