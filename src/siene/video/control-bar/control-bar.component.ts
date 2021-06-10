/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-10 16:30:24
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-10 18:12:59
 */
import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { UIFromParent } from '../../UIFromParent';
import { BitmapData } from './../../../basicUI/image/bitmap-data';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent extends UIFromParent implements OnDestroy, OnChanges{

  @Input() productImg: string = '';

  controlBg!: BitmapData;
  objectImgFrame!: BitmapData;
  addCoin!: BitmapData;

  private inited: boolean = false;

  constructor() {
    super();
  }

  initUI() {
    if( !this.textureData ){

    }

    this.controlBg = this.textureData.getTexture( "ingame_bottom_bg" );
    this.objectImgFrame = this.textureData.getTexture( "object_info", 32, 255 );
    this.addCoin = this.textureData.getTexture( "btn_charge", 35, 40 );

    this.inited = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.textureData && !this.inited ) this.initUI();
  }

  ngOnDestroy(): void {
  }
}
