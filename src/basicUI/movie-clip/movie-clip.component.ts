import { trace } from './../../service/gameUILogic/trace';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-27 13:01:23
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-30 09:33:53
*/
import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Point } from './../geom/point';
import { MovieClipTexture } from './MovieClipTexture';

@Component({
  selector: 'app-movie-clip',
  templateUrl: './movie-clip.component.html',
  styleUrls: ['./movie-clip.component.css']
})
export class MovieClipComponent implements OnInit, OnChanges, OnDestroy {

  movieClipTexture!: MovieClipTexture;
  currentFrame: number = 0;
  @Input() movieClipData!: string;
  @Input() movieClipTextureUrl!: string;
  @Input() position: Point = new Point;
  @Input() playing: boolean = true;

  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;

  intervalId: any;

  @ViewChild('mc', {static: true}) mc!: ElementRef;

  constructor( protected http: HttpClient ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.position ){
      if( this.position ){
        this.x = this.position.x;
        this.y = this.position.y;
      }
    }
    if( changes.movieClipTextureUrl ){
      this.loadTexture();
    }
  }

  ngOnInit() {
  }

  async loadTexture(){
    let textJson: any = await this.http.get(this.movieClipTextureUrl).toPromise();
    this.movieClipTexture = textJson;
    trace.log( textJson )
    if( this.movieClipTexture.width ) this.width = this.movieClipTexture.width;
    if( this.movieClipTexture.height ) this.height = this.movieClipTexture.height;
    if( this.movieClipTexture.duration && this.movieClipTexture.frames && this.movieClipTexture.frames.length > 1 ) {
      this.intervalId = setInterval( this.enterFrame.bind(this), 33 * this.movieClipTexture.duration );
    }
  }

  ngOnDestroy(): void {
    clearInterval( this.intervalId );
  }

  bgTextureLoaded(){
    // alert("loaded")
  }

  enterFrame(){
    if( this.playing ){
      this.currentFrame = ++this.currentFrame % this.movieClipTexture.frames.length;
      let currentFrameData: any = this.movieClipTexture.frames[this.currentFrame];
      this.mc.nativeElement.scrollLeft = currentFrameData.x;
      this.mc.nativeElement.scrollTop = currentFrameData.y;
    }
  }
}