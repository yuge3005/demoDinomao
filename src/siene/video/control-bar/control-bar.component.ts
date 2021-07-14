import { SocketIO } from 'src/service/socketIO';
import { Rectangle } from './../../../basicUI/geom/rectangle';
import { ControlDirection } from './ControlDirection';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-10 16:30:24
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-14 09:36:09
 */
import { Component, EventEmitter, Input, OnDestroy, Output, SimpleChanges } from '@angular/core';
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
  @Input() occupied: boolean = true;
  @Input() playing: boolean = false;

  @Output() videoToggle: EventEmitter<MachineData> = new EventEmitter<MachineData>();
  @Output() startPlayDP: EventEmitter<MachineData> = new EventEmitter<MachineData>();

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

  clockShadow!: BitmapData;
  clockImg!: BitmapData;

  downBtnBg!: BitmapData;
  downBtn!: BitmapData;
  upBtnBg!: BitmapData;
  upBtn!: BitmapData;
  leftBtnBg!: BitmapData;
  leftBtn!: BitmapData;
  rightBtnBg!: BitmapData;
  rightBtn!: BitmapData;
  catchBtnBg!: BitmapData;
  catchBtn!: BitmapData;

  control_left: string = ControlDirection.LEFT;
  control_up: string = ControlDirection.UP;
  control_right: string = ControlDirection.RIGHT;
  control_down: string = ControlDirection.DOWN;

  timeRect: Rectangle = new Rectangle( 115, 56, 85, 96 );
  timeLeft: number = 0;
  timeTextColor: number = 0xFFFFFF;
  lastPlaying: boolean = false;
  timerId: any;

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

    this.clockShadow = this.textureData.getTexture( "icon_time_bg", 52, 56 );
    this.clockImg = this.textureData.getTexture( "icon_time", 22, 46 );

    this.leftBtnBg = this.textureData.getTexture( "btn_control_left_bg", 175, 155 );
    this.leftBtn = this.textureData.getTexture( "btn_control_left", 4, -4 );
    this.upBtnBg = this.textureData.getTexture( "btn_control_up_bg", 307, 60 );
    this.upBtn = this.textureData.getTexture( "btn_control_up", 0, -5 );
    this.rightBtnBg = this.textureData.getTexture( "btn_control_right_bg", 444, 155 );
    this.rightBtn = this.textureData.getTexture( "btn_control_right", -4, -4 );
    this.downBtnBg = this.textureData.getTexture( "btn_control_down_bg", 307, 260 );
    this.downBtn = this.textureData.getTexture( "btn_control_down", 0, -10 );
    this.catchBtnBg = this.textureData.getTexture( "btn_grab_bg", 518, 257 );
    this.catchBtn = this.textureData.getTexture( "btn_grab", 0, -5 );
  }

  ngOnDestroy(): void {
    clearInterval( this.timerId ); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if( !this.lastPlaying && this.playing ){
      this.timeLeft = 30;
      this.timerId = setInterval( this.timerTicker.bind(this), 990 );
    }
    this.lastPlaying = this.playing;
  }

  timerTicker(){
    this.timeLeft --;
    if( this.timeLeft <= 0 ) clearInterval( this.timerId ); 
  }

  toggle(): void{
    this.videoToggle.emit();
  }

  startPlay(){
    this.startPlayDP.emit();
  }

  catchDoll(){
    SocketIO.instance.getWawa();
    clearInterval( this.timerId ); 
  }

  controlStartMachine( direction: string ){
    SocketIO.instance.move( direction );
  }

  controlEndMachine( direction: string ){
    SocketIO.instance.stop( direction );
  }
}
