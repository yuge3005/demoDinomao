/*
 * @Descripttion: setting items
 * @version:
 * @Author: Wayne Yu
 * @Date: 2021-06-03 09:58:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-03 17:22:58
 */
import { StageOrientationMode } from './StageOrientationMode';
import { StageScaleMode } from './StageScaleMode';

export class GlobalSettings {
  public appWidth: number = 1080;
  public appHeight: number = 1920;

  public scale: number = 1;

  /* default StageScaleMode.SHOW_ALL */
  public scaleMode: string = StageScaleMode.SHOW_ALL;
  /* default StageOrientationMode.PORTRAIT */
  public screenMode: string = StageOrientationMode.PORTRAIT;

  constructor() { }
}
