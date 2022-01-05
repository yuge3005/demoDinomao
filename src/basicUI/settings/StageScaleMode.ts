/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-27 14:15:00
 * @description: The StageScaleMode class provides values for the Application.settings.scaleMode property.
 * @ 为Application.settings.scaleMode提供值。
 */
export class StageScaleMode {

  /**
   * @memberof StageScaleMode
   * @description: The size of the entire application is fixed, so that even if the size of the player window changes, it remains unchanged. If the player window is smaller than the content, it may do some trimming.
   * 整个应用程序的大小固定，因此，即使播放器窗口的大小更改，它也会保持不变。如果播放器窗口比内容小，则可能进行一些裁切。
   */
  public static NO_SCALE: string = "noScale";

  /**
   * @memberof StageScaleMode
   * @description: The entire application be visible in the specified area without trying to preserve the original aspect ratio. Distortion can occur, the application may be stretched or compressed.
   * @ 整个应用程序在指定区域中可见，但不尝试保持原始高宽比。可能会发生扭曲，应用程序可能会拉伸或压缩显示。
   */
  public static EXACT_FIT: string = "exactFit";

  /**
   * @memberof StageScaleMode
   * @description: The entire application is visible in the specified area without distortion while maintaining the application of the original aspect ratio. Applications may display border.
   * @ 整个应用程序在指定区域中可见，且不发生扭曲，同时保持应用程序的原始高宽比。应用程序的可能会显示边框。
   */
  public static SHOW_ALL: string = "showAll";

  /**
   * @memberof StageScaleMode
   * @description: Keep the original aspect ratio scaling application content, after scaling a narrow direction of application content to fill the viewport players on both sides in the other direction may exceed the viewport and the player is cut.
   * @ 保持原始宽高比缩放应用程序内容，缩放后应用程序内容的较窄方向填满播放器视口，另一个方向的两侧可能会超出播放器视口而被裁切。
   */
  public static NO_BORDER: string = "noBorder";

  /**
   * @static
   * @type {string}
   * @memberof StageScaleMode
   * @description: Keep the original aspect ratio scaling application content, after scaling application content in the horizontal and vertical directions to fill the viewport player, but only to keep the contents of the original application constant width, height may change.
   * @ 保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，但只保持应用程序内容的原始宽度不变，高度可能会改变。
   */
  public static FIT_WIDTH: string = "fitWidth";

  /**
   * @static
   * @type {string}
   * @memberof StageScaleMode
   * @description: Keep the original aspect ratio scaling application content, after scaling application content in the horizontal and vertical directions to fill the viewport player, but only to keep the contents of the original application constant height, width may change.
   * @ 保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，但只保持应用程序内容的原始高度不变，宽度可能会改变。
   */
  public static FIT_HEIGHT: string = "fitHeight";
}
