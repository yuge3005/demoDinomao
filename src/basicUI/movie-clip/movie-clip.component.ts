/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-27 13:01:23
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-09 10:31:12
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

  get totalFrames(): number{
    if( this.movieClipTexture?.frames ) return this.movieClipTexture.frames.length;
    return 0;
  }

  @Input() movieClip!: MovieClip;

  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;

  matrix: string = "matrix(1,0,0,1,0,0)";

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
      if( this.movieClip.position ) this.resetPosition();
      this.movieClip.positionChange = this.resetPosition.bind( this );
      this.movieClip.setFrame = this.setCurrentFrame.bind( this );
      this.movieClip.setTransform = this.resetTransform.bind( this );
    }
  }

  ngOnInit() {
  }

  async loadTexture(){
    let textJson: any = await this.http.get(this.movieClipTextureUrl).toPromise();
    this.movieClipTexture = textJson;
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
    this.movieClip.positionChange = null;
    this.movieClip.setFrame = null;
    this.movieClip.setTransform = null;
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
    if( !this.movieClipTexture ) return;
    let currentFrameData: SimplePoint = this.movieClipTexture.frames[this.currentFrame];
    this.mc.nativeElement.scrollLeft = currentFrameData.x;
    this.mc.nativeElement.scrollTop = currentFrameData.y;
  }

  resetTransform(){
    let a: number = this.movieClip.rotation / 180 * Math.PI;
    let lenX: number = this.movieClip.scaleX;
    let lenY: number = this.movieClip.scaleY;
    this.matrix = "matrix(" + lenX * Math.cos(a) + "," + lenX *  Math.sin(a) + "," + -lenY * Math.sin(a) + "," + lenY * Math.cos(a) + ",0,0)";
  }
}