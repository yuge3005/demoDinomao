/*
 * @Descripttion: setting items
 * @version:
 * @Author: Wayne Yu
 * @Date: 2021-06-03 09:58:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-22 11:32:45
 */
import { StageOrientationMode } from './StageOrientationMode';
import { StageScaleMode } from './StageScaleMode';

export class GlobalSettings {
  private _appWidth: number = 1080;
  private appWidthSet: boolean = false;
  public set appWidth( value: number ){
    if( this.appWidthSet ) console.error( "app width can only set once." );
    this._appWidth = value;
    this.appWidthSet = true;
  }

  private _appHeight: number = 1920;
  private appHeightSet: boolean = false;
  public set appHeight( value: number ){
    if( this.appHeightSet ) console.error( "app height can only set once." );
    this._appHeight = value;
    this.appHeightSet = true;
  }

  private _stageWidth: number = 0;
  public get stageWidth(): number{
    return this._stageWidth;
  }
  private _stageHeight: number = 0;
  public get stageHeight(): number{
    return this._stageHeight;
  }

  private _scaleX: number = 1;
  public get scaleX(): number{
    return this._scaleX;
  }

  private _scaleY: number = 1;
  public get scaleY(): number{
    return this._scaleY;
  }

  public _rotated: boolean = false;
  public get rotated(): boolean{
    return this._rotated;
  }

  /* default StageScaleMode.SHOW_ALL */
  public scaleMode: string = StageScaleMode.SHOW_ALL;
  /* default StageOrientationMode.PORTRAIT */
  public screenMode: string = StageOrientationMode.PORTRAIT;

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
