import { Point } from '../geom/point';
import { EgretMc } from './EgretMc';
import { ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-13 17:34:13
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-14 17:19:52
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-egret-mc',
  templateUrl: './egret-mc.component.html',
  styleUrls: ['./egret-mc.component.css']
})
export class EgretMcComponent implements OnInit, OnChanges, OnDestroy {

  movieClipData!: string;

  @Input() movieClip!: EgretMc;

  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  offsetX: number = 0;
  offsetY: number = 0;

  matrix: string = "matrix(1,0,0,1,0,0)";
  
  @ViewChild('mc', {static: true}) mc!: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.movieClip ){
      if( this.movieClip.textruePic ) this.movieClipData = this.movieClip.textruePic;
      if( this.movieClip.position ) this.resetPosition();
      this.movieClip.positionChange = this.resetPosition.bind( this );
      this.movieClip.setFrame = this.setCurrentFrame.bind( this );
      this.movieClip.setTransform = this.resetTransform.bind( this );
    }
  }

  ngOnDestroy(): void {
    this.movieClip.positionChange = null;
    this.movieClip.setFrame = null;
    this.movieClip.setTransform = null;
  }

  bgTextureLoaded(){
    if( this.movieClipData ) this.flush();
  }

  resetPosition(){
    let position: Point = this.movieClip.position;
    this.x = position.x;
    this.y = position.y;
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

  flush(){
    if( this.movieClip.currentFrame ) this.setCurrentFrame( this.movieClip.currentFrame );
  }

  resetTransform(){
    let a: number = this.movieClip.rotation / 180 * Math.PI;
    let lenX: number = this.movieClip.scaleX;
    let lenY: number = this.movieClip.scaleY;
    this.matrix = "matrix(" + lenX * Math.cos(a) + "," + lenX *  Math.sin(a) + "," + -lenY * Math.sin(a) + "," + lenY * Math.cos(a) + ",0,0)";
  }
}
