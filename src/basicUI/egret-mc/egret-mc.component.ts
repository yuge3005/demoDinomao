import { EgretMc } from './EgretMc';
import { ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-13 17:34:13
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-14 10:09:32
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-egret-mc',
  templateUrl: './egret-mc.component.html',
  styleUrls: ['./egret-mc.component.css']
})
export class EgretMcComponent implements OnInit, OnChanges, OnDestroy {

  @Input() movieClip!: EgretMc;

  intervalId: any;
  
  @ViewChild('mc', {static: true}) mc!: ElementRef;

  constructor() { }

  ngOnInit() {
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

  ngOnDestroy(): void {
    clearInterval( this.intervalId );
    this.movieClip.positionChange = null;
    this.movieClip.setFrame = null;
    this.movieClip.setTransform = null;
  }
}
