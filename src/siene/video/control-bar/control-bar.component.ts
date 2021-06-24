/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-10 16:30:24
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-10 18:12:59
 */
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MachineData } from 'src/service/machine-data';
import { UIFromParent } from '../../../basicUI/ui/UIFromParent';
import { BitmapData } from './../../../basicUI/image/bitmap-data';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent extends UIFromParent implements OnDestroy{

  @Input() productImg: string = '';

  @Output() videoToggle: EventEmitter<MachineData> = new EventEmitter<MachineData>();

  controlBg!: BitmapData;
  objectImgFrame!: BitmapData;
  addCoin!: BitmapData;
  cameraBg!: BitmapData;

  cameraIcon!: BitmapData;

  constructor() {
    super();
  }

  initUI() {
    this.controlBg = this.textureData.getTexture( "ingame_bottom_bg" );
    this.objectImgFrame = this.textureData.getTexture( "object_info", 32, 255 );
    this.addCoin = this.textureData.getTexture( "btn_charge", 35, 40 );

    this.cameraBg = this.textureData.getTexture( "btn_camera_bg", 592, 40 );
    this.cameraIcon = this.textureData.getTexture( "btn_camera", 0, -4 );
  }

  ngOnDestroy(): void {
  }

  toggle(): void{
    this.videoToggle.emit();
  }
}
