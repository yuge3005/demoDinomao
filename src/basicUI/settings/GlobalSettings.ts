/*
 * @Descripttion: setting items
 * @version:
 * @Author: Wayne Yu
 * @Date: 2021-06-03 09:58:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-04 09:43:51
 */
import { StageOrientationMode } from './StageOrientationMode';
import { StageScaleMode } from './StageScaleMode';

export class GlobalSettings {
  private _appWidth: number = 1080;
  private appWidthSet: boolean = false;
  public set appWidth( value: number ){
    if( this.appWidthSet ) throw new Error( "app width can only set once." );
    this._appWidth = value;
    this.appWidthSet = true;
  }

  private _appHeight: number = 1920;
  private appHeightSet: boolean = false;
  public set appHeight( value: number ){
    if( this.appHeightSet ) throw new Error( "app height can only set once." );
    this._appHeight = value;
    this.appHeightSet = true;
  }

  public stageWidth: number = 0;
  public stageHeight: number = 0;

  private _scale: number = 1;
  public get scale(): number{
    return this._scale;
  }

  /* default StageScaleMode.SHOW_ALL */
  public scaleMode: string = StageScaleMode.SHOW_ALL;
  /* default StageOrientationMode.PORTRAIT */
  public screenMode: string = StageOrientationMode.PORTRAIT;

  constructor() { }

  resize(){
    if( this.screenMode == StageOrientationMode.DEFAULT ){
      if( this.scaleMode == StageScaleMode.SHOW_ALL ){
        this._scale = Math.min( document.documentElement.clientWidth / this._appWidth, document.documentElement.clientHeight / this._appHeight );
        this.stageWidth = this._appHeight;
        this.stageHeight = this._appHeight;
      }
    }
    else if( this.screenMode == StageOrientationMode.PORTRAIT ){
      if( this.scaleMode == StageScaleMode.FIT_WIDTH ){
        this.stageWidth = Math.min( document.documentElement.clientWidth, document.documentElement.clientHeight );
        let tempHeight: number = Math.max( document.documentElement.clientWidth, document.documentElement.clientHeight );
        this._scale = this.stageWidth / this._appWidth;
        this.stageHeight = tempHeight / this._scale;
      }
    }
  }
}
