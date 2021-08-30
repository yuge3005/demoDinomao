/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-27 13:01:23
* @LastEditors: Wayne Yu
* @LastEditTime: 2021-08-30 12:02:46
*/
import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieClipTexture } from './MovieClipTexture';
import { MovieClip } from './MovieClip';
import { Point } from '../geom/point';
import { SimplePoint } from '../geom/SimplePoint';

@Component({
  selector: 'app-movie-clip',
  templateUrl: './movie-clip.component.html',
  styleUrls: ['./movie-clip.component.css']
})
export class MovieClipComponent implements OnInit, OnChanges, OnDestroy {

  movieClipTexture!: MovieClipTexture;
  currentFrame: number = 0;
  movieClipData!: string;
  movieClipTextureUrl!: string;
  get playing(): boolean{
    if( !this.movieClip ) return false;
    return this.movieClip.playing;
  }

  @Input() movieClip!: MovieClip;

  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;

  intervalId: any;

  @ViewChild('mc', {static: true}) mc!: ElementRef;

  constructor( protected http: HttpClient ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.movieClip ){
      if( this.movieClip.textruePic ){
        this.movieClipData = this.movieClip.textruePic;
      }
      if( this.movieClipTextureUrl != this.movieClip.textureJson ){
        this.movieClipTextureUrl = this.movieClip.textureJson;
        this.loadTexture();
      }
      this.movieClip.positionChange = this.resetPosition.bind( this );
      this.movieClip.setFrame = this.setCurrentFrame.bind( this );
    }
  }

  ngOnInit() {
  }

  async loadTexture(){
    let textJson: any = await this.http.get(this.movieClipTextureUrl).toPromise();
    this.movieClipTexture = textJson;
    if( this.movieClipTexture.width ) this.width = this.movieClipTexture.width;
    if( this.movieClipTexture.height ) this.height = this.movieClipTexture.height;
    if( this.movieClipTexture.duration && this.movieClipTexture.frames && this.movieClipTexture.frames.length > 1 ) {
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
    this.movieClip.positionChange = null;
    this.movieClip.setFrame = null;
  }

  bgTextureLoaded(){
    // alert("loaded")
  }

  enterFrame(){
    if( this.playing ){
      this.currentFrame = ++this.currentFrame % this.movieClipTexture.frames.length;
      this.flush();
    }
  }

  resetPosition(){
    let position: Point = this.movieClip.position;
    this.x = position.x;
    this.y = position.y;
  }

  setCurrentFrame( currentFrame: number ){
    if( currentFrame > 0 && Math.floor( currentFrame ) == currentFrame ){
      this.currentFrame = currentFrame - 1;
      this.flush();
    }
  }

  flush(){
    let currentFrameData: SimplePoint = this.movieClipTexture.frames[this.currentFrame];
    this.mc.nativeElement.scrollLeft = currentFrameData.x;
    this.mc.nativeElement.scrollTop = currentFrameData.y;
  }
}