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
