/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-06-03 17:22:13
 * @description: The StageOrientation class defines constants enumerating the possible orientations of the stage and the device.
 * @ 定义枚举此舞台和设备的可能方向的常量。
 */
export class StageOrientationMode {

  /**
   * @memberof StageOrientationMode
   * @description: Applications remain horizontal screen mode, namely vertical screen, the screen from right to left.
   * @ 应用始终保持横屏模式，即竖屏看时，屏幕显示由右往左。
   */
  public static LANDSPACE: string = "landscape";

  /**
   * @memberof StageOrientationMode
   * @description: Applications remain portrait mode, namely horizontal screen look, the screen from left to right.
   * @ 应用始终保持竖屏模式，即横屏看时，屏幕由左往右看。
   */
  public static PORTRAIT: string = "portrait";

  /**
   * @memberof StageOrientationMode
   * @description: Always follow the direction of application display screen, always guaranteed by the look down.
   * @ 应用始终跟随屏幕的方向显示，始终保证由上往下看。
   */
  public static AUTO: string = "auto";

  /**
   * @memberof StageOrientationMode
   * @description: Specifies that the stage is currently in the default orientation of the device (right-side up).
   * @ 指定舞台当前位于设备的默认方向。
   */
  public static DEFAULT: string = "default";
}
