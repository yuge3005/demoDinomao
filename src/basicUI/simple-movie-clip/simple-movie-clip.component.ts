import { MCComponentSuper } from '../movie-clip/MCComponentSuper';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-27 13:01:23
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 18:01:03
*/
import { Component, Input, SimpleChanges } from '@angular/core';
import { SimpleMovieClip } from './SimpleMovieClip';
import { SimplePoint } from '../geom/SimplePoint';

@Component({
  selector: 'app-simple-movie-clip',
  templateUrl: './simple-movie-clip.component.html',
  styleUrls: ['./simple-movie-clip.component.css']
})
export class SimpleMovieClipComponent extends MCComponentSuper{

  movieClipTextureUrl!: string;
  get playing(): boolean{
    if( !this.movieClip ) return false;
    return this.movieClip.playing;
  }

  @Input() movieClip!: SimpleMovieClip;

  intervalId: any;

  constructor() { 
    super()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.movieClip ){
      if( this.movieClip.textruePic ) this.movieClipData = this.movieClip.textruePic;

      this.resetPosition();
      this.resetTransform();

      this.movieClip.positionChange = this.resetPosition.bind( this );
      this.movieClip.setFrame = this.setCurrentFrame.bind( this );
      this.movieClip.setTransform = this.resetTransform.bind( this );
    }
  }

  ngOnDestroy(): void {
    clearInterval( this.intervalId );
    this.movieClip.dispose();
  }

  bgTextureLoaded(){
    if( this.movieClipData && this.movieClip?.currentFrame ) this.setCurrentFrame( this.movieClip.currentFrame );
  }

  setCurrentFrame( frame: number ){
    if( !this.movieClip ) return;
    let framePoint: SimplePoint = this.movieClip.getFrameInfoByFrameIndex(frame-1);
    this.mc.nativeElement.scrollLeft = framePoint.x;
    this.mc.nativeElement.scrollTop = framePoint.y;
  }
}