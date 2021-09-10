/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-12 14:29:29
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-10 10:38:47
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

  getTexture( key: string, x: number = 0, y: number = 0 ){
    let item: BitmapData = JSON.parse( JSON.stringify( this.frames[key] ) );
    item.url = this.file;
    item.top = y;
    item.left = x;
    return item;
  }

  compareBitmapAndHtmlElement( bitmap: BitmapData, htmlElement: HTMLElement ): boolean{
    if( htmlElement.style.top != bitmap.top + "px" ) return false;
    if( htmlElement.style.left != bitmap.left + "px" ) return false;
    if( htmlElement.style.width != bitmap.w + "px" ) return false;
    if( htmlElement.style.height != bitmap.h + "px" ) return false;
    return true;
  }
}
