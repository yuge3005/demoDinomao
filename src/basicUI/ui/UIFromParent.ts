import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { TextureData } from '../image/texture-data';

@Component({
  template: ''
})
export class UIFromParent implements OnInit, OnChanges, OnDestroy{

  @Input()textureData!: TextureData;
  private inited: boolean = false;

  constructor() {}

  ngOnInit() {
    this.subUIinit();
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
