/* Horizontal and vertical screen display screen, can only be set under the current Native in the configuration file.
* A egret.OrientationMode class that specifies which display mode to use. The following are valid values: */
export class StageOrientationMode {

  /* Specifies that the stage is always landscape. */
  public static LANDSPACE: string = "landscape";

  /* Specifies that the stage is always portrait. */
  public static PORTRAIT: string = "portrait";

  /* Always follow the direction of application display screen, always guaranteed by the look down. */
  public static AUTO: string = "auto";

  /* Specifies that the stage is currently in the default orientation of the device (right-side up). */
  public static DEFAULT: string = "default";
}
