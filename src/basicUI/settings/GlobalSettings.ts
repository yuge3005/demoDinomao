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