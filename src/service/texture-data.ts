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
    let item: BitmapData = this.frames[key];
    item.url = this.file;
    item.top = y;
    item.left = x;
    return item;
  }
}
