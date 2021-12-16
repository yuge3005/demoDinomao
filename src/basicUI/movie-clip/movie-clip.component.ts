import { MCComponentSuper } from './MCComponentSuper';
import { Point } from '../geom/point';
import { MovieClip } from './MovieClip';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-13 17:34:13
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 16:38:20
 */

@Component({
  selector: 'app-movie-clip',
  templateUrl: './movie-clip.component.html',
  styleUrls: ['./movie-clip.component.css']
})
export class MovieClipComponent extends MCComponentSuper{

  @Input() movieClip!: MovieClip;

  offsetX: number = 0;
  offsetY: number = 0;
  anchorOffsetX: number = 0;
  anchorOffsetY: number = 0;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.movieClip ){
      if( this.movieClip.textruePic ) this.movieClipData = this.movieClip.textruePic;

      this.resetPosition();
      this.resetAnchorOffset();
      this.resetTransform();
      if( this.movieClip.currentFrame ) this.setCurrentFrame( this.movieClip.currentFrame );

      this.movieClip.positionChange = this.resetPosition.bind( this );
      this.movieClip.setFrame = this.setCurrentFrame.bind( this );
      this.movieClip.setTransform = this.resetTransform.bind( this );
      this.movieClip.anchorOffsetChange = this.resetAnchorOffset.bind( this );
    }
  }

  bgTextureLoaded(){
    if( this.movieClipData && this.movieClip?.currentFrame ) this.setCurrentFrame( this.movieClip.currentFrame );
  }

  resetAnchorOffset(){
    let anchorOffset: Point = this.movieClip.anchorOffset;
    this.anchorOffsetX = anchorOffset.x;
    this.anchorOffsetY = anchorOffset.y;
  }

  setCurrentFrame( frame: number ){
    let frameInfo: any = this.movieClip.getFrameInfoByFrameIndex( frame - 1 );
    this.mc.nativeElement.scrollLeft = frameInfo.rect.x;
    this.mc.nativeElement.scrollTop = frameInfo.rect.y;
    this.width = frameInfo.rect.width;
    this.height = frameInfo.rect.height;
    this.offsetX = frameInfo.position.x;
    this.offsetY = frameInfo.position.y;
  }
}
