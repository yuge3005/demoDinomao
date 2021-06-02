import { Component, Input, OnInit } from '@angular/core';
import { TextureData } from '../basicUI/image/texture-data';

@Component({
  template: ''
})
export class UIFromParent implements OnInit {

  @Input()textureData!: TextureData

  constructor() {}

  ngOnInit() {
    this.initUI();
  }

  initUI(){
  }
}
