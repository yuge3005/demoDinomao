/**
 * @version:
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-27 10:34:32
 * @description: setting items, such as zoom mode, screen rotation mode, width and height.
 * @ 应用设置，如缩放模式，屏幕旋转模式，应用宽高
 */
import { StageOrientationMode } from './StageOrientationMode';
import { StageScaleMode } from './StageScaleMode';

export class GlobalSettings {
  private _appWidth: number = 1080;
  private appWidthSet: boolean = false;
  /**
   * @memberof GlobalSettings
   * @description: Application width, this property can only be set once during application initialization.
   * @ 应用宽度，该属性只能在应用初始化时设置一次。
   */
  public set appWidth( value: number ){
    if( this.appWidthSet ) console.error( "app width can only set once." );
    this._appWidth = value;
    this.appWidthSet = true;
  }

  private _appHeight: number = 1920;
  private appHeightSet: boolean = false;

  /**
   * @memberof GlobalSettings
   * @description: Application height, this property can only be set once during application initialization.
   * @ 应用高度，该属性只能在应用初始化时设置一次。
   */
  public set appHeight( value: number ){
    if( this.appHeightSet ) console.error( "app height can only set once." );
    this._appHeight = value;
    this.appHeightSet = true;
  }

  private _stageWidth: number = 0;
  /**
   * @readonly
   * @type {number}
   * @memberof GlobalSettings
   * @description: showing stage width
   * @ 实际舞台宽度
   */
  public get stageWidth(): number{
    return this._stageWidth;
  }

  private _stageHeight: number = 0;
  /**
   * @readonly
   * @type {number}
   * @memberof GlobalSettings
   * @description: showing stage height
   * @ 实际舞台高度
   */
  public get stageHeight(): number{
    return this._stageHeight;
  }

  private _scaleX: number = 1;
  /**
   * @readonly
   * @type {number}
   * @memberof GlobalSettings
   * @description: Horizontal scale
   * @ 水平显示比例
   */
  public get scaleX(): number{
    return this._scaleX;
  }

  private _scaleY: number = 1;
  /**
   * @readonly
   * @type {number}
   * @memberof GlobalSettings
   * @description: Vertical scale
   * @ 垂直显示比例
   */
  public get scaleY(): number{
    return this._scaleY;
  }

  private _rotated: boolean = false;
  /**
   * @readonly
   * @type {boolean}
   * @memberof GlobalSettings
   * @description: Is the stage rotated.
   * @ 舞台是否经过旋转。
   */
  public get rotated(): boolean{
    return this._rotated;
  }

  /**
   * @type {string}
   * @memberof GlobalSettings
   * @description: Stage scaling mode, whose values are enumerated by StageScaleMode.
   * @ 舞台缩放模式，其值由StageScaleMode枚举。
   * @default StageScaleMode.SHOW_ALL
   */
  public scaleMode: string = StageScaleMode.SHOW_ALL;

  /**
   * @type {string}
   * @memberof GlobalSettings
   * @description: Stage rotation mode whose value is enumerated by StageOrientationMode.
   * @ 舞台旋转模式，其值由StageOrientationMode枚举。
   * @default StageOrientationMode.PORTRAIT
   */
  public screenMode: string = StageOrientationMode.PORTRAIT;

  /**
   * @type {boolean}
   * @memberof GlobalSettings
   * @description: Does the current stage adapt to screen changes.
   * @ 当前舞台是否自适应屏幕变化。
   */
  public enableResize: boolean = true;

  constructor() { }

  private keepScale(){
    this._stageWidth = this._appWidth;
    this._stageHeight = this._appHeight;
  }

  private noScale(){
    this._scaleX = this._scaleY = 1;
    this.keepScale();
  }

  resize(){
    if( this.screenMode == StageOrientationMode.AUTO ) throw new Error( "we dont suport this screen mode" );
    if( this.scaleMode == StageScaleMode.FIT_HEIGHT ) throw new Error( "we dont suport this scale mode" );
    if( this.scaleMode == StageScaleMode.NO_SCALE ){//all kind of screen mode, stage no scale will be same.
      this.noScale();
      return;
    }

    if( this.screenMode == StageOrientationMode.DEFAULT ) this.orientationDefault();

    if( this._appWidth > this._appHeight && this.screenMode == StageOrientationMode.PORTRAIT ) throw new Error( "we dont suport such fake portrait" );
    if( this._appWidth < this._appHeight && this.screenMode == StageOrientationMode.LANDSPACE ) throw new Error( "we dont suport such fake landscape" );

    if( this.screenMode == StageOrientationMode.PORTRAIT ) this.orientationPortrait();
    else if( this.screenMode == StageOrientationMode.LANDSPACE ){

    }
  }

  orientationDefault(){
    if( this.scaleMode == StageScaleMode.SHOW_ALL ){
      this._scaleX = this._scaleY = Math.min( document.documentElement.clientWidth / this._appWidth, document.documentElement.clientHeight / this._appHeight );
      this.keepScale();
    }
    else if( this.scaleMode == StageScaleMode.NO_BORDER ){
      this._scaleX = this._scaleY = Math.max( document.documentElement.clientWidth / this._appWidth, document.documentElement.clientHeight / this._appHeight );
      this.keepScale();
    }
    else if( this.scaleMode == StageScaleMode.EXACT_FIT ){
      this._scaleX = document.documentElement.clientWidth / this._appWidth;
      this._scaleY = document.documentElement.clientHeight / this._appHeight;
      this.keepScale();
    }
    else if( this.scaleMode == StageScaleMode.FIT_WIDTH ){
      this._stageWidth = this._appWidth;
      this._scaleX = this._scaleY = document.documentElement.clientWidth / this._appWidth;
      this._stageHeight = document.documentElement.clientHeight / this._scaleY;
    }
  }

  orientationPortrait(){
    var len: number = Math.max( document.documentElement.clientWidth, document.documentElement.clientHeight );
    var wid: number = Math.min( document.documentElement.clientWidth, document.documentElement.clientHeight );
    if( this.scaleMode == StageScaleMode.SHOW_ALL ){
      this._scaleX = this._scaleY = Math.min( wid / this._appWidth, len / this._appHeight );
      this.keepScale();
    }
    else if( this.scaleMode == StageScaleMode.NO_BORDER ){
      this._scaleX = this._scaleY = Math.max( wid / this._appWidth, len / this._appHeight );
      this.keepScale();
    }
    else if( this.scaleMode == StageScaleMode.EXACT_FIT ){
      this._scaleX = wid / this._appWidth;
      this._scaleY = len / this._appHeight;
      this.keepScale();
    }
    else if( this.scaleMode == StageScaleMode.FIT_WIDTH ){
      this._stageWidth = this._appWidth;
      this._scaleX = this._scaleY = wid / this._appWidth;
      this._stageHeight = len / this._scaleY;
    }
    this._rotated = document.documentElement.clientHeight == wid;
  }
}
