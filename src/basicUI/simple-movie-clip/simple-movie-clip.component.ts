import { MCComponentSuper } from '../movie-clip/MCComponentSuper';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-27 13:01:23
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 16:42:22
*/
import { Component, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { HttpRequest } from '../net/http-request';
import { SimpleMovieClipTexture } from './SimpleMovieClipTexture';
import { SimpleMovieClip } from './SimpleMovieClip';
import { SimplePoint } from '../geom/SimplePoint';
import { LoadedUITextureDatas } from '../settings/LoadedUITextureDatas';

@Component({
  selector: 'app-simple-movie-clip',
  templateUrl: './simple-movie-clip.component.html',
  styleUrls: ['./simple-movie-clip.component.css']
})
export class SimpleMovieClipComponent extends MCComponentSuper{

  movieClipTexture!: SimpleMovieClipTexture;
  currentFrame: number = 0;
  movieClipTextureUrl!: string;
  get playing(): boolean{
    if( !this.movieClip ) return false;
    return this.movieClip.playing;
  }

  get totalFrames(): number{
    if( this.movieClipTexture?.frames ) return this.movieClipTexture.frames.length;
    return 0;
  }

  @Input() movieClip!: SimpleMovieClip;

  intervalId: any;

  constructor() { 
    super()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.movieClip ){
      if( this.movieClip.textruePic ){
        this.movieClipData = this.movieClip.textruePic;
      }
      if( this.movieClipTextureUrl != this.movieClip.textureJson ){
        this.movieClipTextureUrl = this.movieClip.textureJson;
        this.loadTexture();
      }
      if( this.movieClip.position ) this.resetPosition();
      this.movieClip.positionChange = this.resetPosition.bind( this );
      this.movieClip.setFrame = this.setCurrentFrame.bind( this );
      this.movieClip.setTransform = this.resetTransform.bind( this );
    }
  }

  loadTexture(){
    if( LoadedUITextureDatas.loadTexture[this.movieClipTextureUrl] ){
      this.movieClipTexture = LoadedUITextureDatas.loadTexture[this.movieClipTextureUrl];
      this.afterGetTexture();
    }
    else{
      new HttpRequest().loadData( this.movieClipTextureUrl, this.getTexture.bind( this ), "GET", "" );
    }
  }

  getTexture( data: any ){
    LoadedUITextureDatas.loadTexture[this.movieClipTextureUrl] = this.movieClipTexture = data;
    this.afterGetTexture();
  }

  afterGetTexture(){
    if( this.movieClipTexture.width ) this.width = this.movieClipTexture.width;
    if( this.movieClipTexture.height ) this.height = this.movieClipTexture.height;
    if( this.movieClipTexture.duration && this.movieClipTexture.frames?.length > 1 ) {
      let interval: number = 1;//set default duration
      let duration: number = this.movieClipTexture.duration;
      if( !isNaN( duration ) && duration > 0 ){
        interval = duration;
      }
      interval *= 33;
      this.intervalId = setInterval( this.enterFrame.bind(this), interval );
    }
  }

  ngOnDestroy(): void {
    clearInterval( this.intervalId );
    this.movieClip.dispose();
  }

  bgTextureLoaded(){
    if( this.movieClipData && this.movieClipTexture ) this.flush();
  }

  enterFrame(){
    if( this.playing ){
      this.currentFrame = ++this.currentFrame % this.movieClipTexture.frames.length;
      this.flush();
    }
  }

  setCurrentFrame( currentFrame: number ){
    if( currentFrame > 0 && Math.floor( currentFrame ) == currentFrame ){
      this.currentFrame = currentFrame - 1;
      this.flush();
    }
  }

  flush(){
    if( !this.movieClipTexture ) return;
    let currentFrameData: SimplePoint = this.movieClipTexture.frames[this.currentFrame];
    this.mc.nativeElement.scrollLeft = currentFrameData.x;
    this.mc.nativeElement.scrollTop = currentFrameData.y;
  }
}