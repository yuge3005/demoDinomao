/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-12 14:29:29
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-30 15:39:34
 */
import { BitmapData } from './bitmap-data';
export class TextureData {
  file: string = "";
  frames: any;

  constructor(){}

  setFile( fileName: string, frames: Object ){
    this.file = fileName;
    this.frames = frames;
  }

  /**
   * @param {string} key
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @return {*}  {BitmapData}
   * @memberof TextureData
   * @description: Obtain the material according to its name and set its position. The default position is (0,0).
   * @ 根据名称，获取素材，并设定其坐标，默认位置为(0,0)。
   */
  getTexture( key: string, x: number = 0, y: number = 0 ): BitmapData{
    let item: BitmapData = JSON.parse( JSON.stringify( this.frames[key] ) );
    item.url = this.file;
    item.top = y;
    item.left = x;
    return item;
  }

  /**
   * @param {BitmapData} bitmap
   * @param {HTMLElement} htmlElement
   * @return {*}  {boolean}
   * @memberof TextureData
   * @description: Check whether the image object is the same as that of the htmlelement.
   * @ 检查图片对象是否和网页元素的相同。
   */
  compareBitmapAndHtmlElement( bitmap: BitmapData, htmlElement: HTMLElement ): boolean{
    if( htmlElement.style.top != bitmap.top + "px" ) return false;
    if( htmlElement.style.left != bitmap.left + "px" ) return false;
    if( htmlElement.style.width != bitmap.w + "px" ) return false;
    if( htmlElement.style.height != bitmap.h + "px" ) return false;
    return true;
  }
}
