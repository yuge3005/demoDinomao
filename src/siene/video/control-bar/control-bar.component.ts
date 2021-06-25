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
  chatIcon!: BitmapData;

  cameraBg!: BitmapData;
  cameraIcon!: BitmapData;

  occupiedBg!: BitmapData;
  occupiedIcon!: BitmapData;

  playBtnBg!: BitmapData;
  playBtnIcon!: BitmapData;

  canPlayNow: boolean = false;

  constructor() {
    super();
  }

  initUI() {
    this.controlBg = this.textureData.getTexture( "ingame_bottom_bg" );
    this.objectImgFrame = this.textureData.getTexture( "object_info", 32, 255 );
    this.addCoin = this.textureData.getTexture( "btn_charge", 35, 40 );

    this.cameraBg = this.textureData.getTexture( "btn_camera_bg", 592, 40 );
    this.cameraIcon = this.textureData.getTexture( "btn_camera", 0, -4 );

    this.chatIcon = this.textureData.getTexture( "btn_chat", 547, 330 );

    this.occupiedBg = this.textureData.getTexture( "btn_play_bg", 220, 80 );
    this.occupiedIcon = this.textureData.getTexture( "btn_occupied", 0, -3 );
    this.playBtnBg = this.textureData.getTexture( "btn_play_bg", 220, 80 );
    this.playBtnIcon = this.textureData.getTexture( "btn_play01", 0, -3 );
  }

  ngOnDestroy(): void {
  }

  toggle(): void{
    this.videoToggle.emit();
  }
}
