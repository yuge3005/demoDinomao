/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-31 11:40:50
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-06 16:50:04
 */
import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { TextureData } from '../img/texture-data';

@Component({
  template: ''
})
export class UIFromParent implements OnInit, OnChanges, OnDestroy{

  @Input()textureData!: TextureData;
  private inited: boolean = false;

  constructor() {}

  ngOnInit() {
    if( this.textureData && !this.inited )this.subUIinit();
  }

  subUIinit(){
    if( !this.textureData ) return;

    this.initUI();

    this.inited = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.textureData && !this.inited ) this.subUIinit();
  }

  initUI(){
  }

  ngOnDestroy(){
  }
}
