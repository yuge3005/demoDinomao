/*
 * @Description: The StageScaleMode class provides values for the Application.settings.scaleMode property.
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-03 11:44:03
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-03 17:06:17
 */
export class StageScaleMode {

  /* Specifies that the size of the application be fixed, so that it remains unchanged even as the size of the player window changes. */
  public static NO_SCALE: string = "noScale";

  /** Specifies that the entire application be visible in the specified area without trying to preserve the original aspect ratio. */
  public static EXACT_FIT: string = "exactFit";

  /* Specifies that the entire application be visible in the specified area without distortion while maintaining the original aspect ratio of the application. */
  public static SHOW_ALL: string = "showAll";

  /* Specifies that the entire application fill the specified area, without distortion but possibly with some cropping, while maintaining the original aspect ratio of the application. */
  public static NO_BORDER: string = "noBorder";

  /* Specifies that the entire application fill the specified area, some part of the application will keep the length-width ratio on the basic of width. */
  public static FIT_WIDTH: string = "fitWidth";

  /* Specifies that the entire application fill the specified area, some part of the application will keep the length-width ratio on the basic of height. */
  public static FIT_HEIGHT: string = "fitHeight";
}
