/*
 * @Descripttion: setting items
 * @version:
 * @Author: Wayne Yu
 * @Date: 2021-06-03 09:58:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-03 18:06:07
 */
import { StageOrientationMode } from './StageOrientationMode';
import { StageScaleMode } from './StageScaleMode';

export class GlobalSettings {
  public appWidth: number = 1080;
  public appHeight: number = 1920;

  public stageWidth: number = 0;
  public stageHeight: number = 0;

  public scale: number = 1;

  /* default StageScaleMode.SHOW_ALL */
  public scaleMode: string = StageScaleMode.SHOW_ALL;
  /* default StageOrientationMode.PORTRAIT */
  public screenMode: string = StageOrientationMode.PORTRAIT;

  constructor() { }

  resize(){
    if( this.screenMode == StageOrientationMode.DEFAULT ){
      if( this.scaleMode == StageScaleMode.SHOW_ALL ){
        this.scale = Math.min( document.documentElement.clientWidth / this.appWidth, document.documentElement.clientHeight / this.appHeight );
        this.stageWidth = this.appHeight;
        this.stageHeight = this.appHeight;
      }
    }
    else if( this.screenMode == StageOrientationMode.PORTRAIT ){
      if( this.scaleMode == StageScaleMode.FIT_WIDTH ){
        this.stageWidth = Math.min( document.documentElement.clientWidth, document.documentElement.clientHeight );
        let tempHeight: number = Math.max( document.documentElement.clientWidth, document.documentElement.clientHeight );
        this.scale = this.stageWidth / this.appWidth;
        this.stageHeight = tempHeight / this.scale;
      }
    }
  }
}
