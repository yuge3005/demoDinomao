import { SocketIO, ControlDirection, Trigger, GoodsData, User, WebPages, Purchase, trace } from '../../../service/dinomao-game.module';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-10 16:30:24
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:30:02
 */
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { UIFromParent, Rectangle, StyleX } from 'resize-able-ui';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent extends UIFromParent{

  @Input() productData!: GoodsData;
  @Input() occupied: boolean = true;
  @Input() playing: boolean = false;

  @Output() videoToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() startPlayDP: EventEmitter<any> = new EventEmitter<any>();

  control_left: string = ControlDirection.LEFT;
  control_up: string = ControlDirection.UP;
  control_right: string = ControlDirection.RIGHT;
  control_down: string = ControlDirection.DOWN;

  timeRect: Rectangle = new Rectangle( 115, 56, 85, 96 );
  timeLeft: number = 0;
  timeTextColor: number = 0xFFFFFF;
  lastPlaying: boolean = false;
  timerId: any;

  isFree: boolean = false;

  constructor() {
    super();
  }

  initUI() {
    this.ui.controlBg = this.textureData.getTexture( "ingame_bottom_bg" );
    this.ui.objectImgFrame = this.textureData.getTexture( "object_info", 32, 255 );
    this.ui.addCoin = this.textureData.getTexture( "btn_charge", 35, 40 );

    this.ui.cameraBg = this.textureData.getTexture( "btn_camera_bg", 590, 40 );
    this.ui.cameraIcon = this.textureData.getTexture( "btn_camera", 0, -4 );

    this.ui.historyBg = this.textureData.getTexture( "btn_camera_bg", 590, 305 );
    this.ui.historyBtn = this.textureData.getTexture( "btn_history"  );
    this.ui.coinIcon = this.textureData.getTexture( "coin", 90, 166 );

    this.ui.occupiedBg = this.textureData.getTexture( "btn_play_bg", 220, 80 );
    this.ui.occupiedIcon = this.textureData.getTexture( "btn_occupied", 0, -3 );
    this.ui.playBtnBg = this.textureData.getTexture( "btn_play_bg", 220, 80 );
    this.ui.playBtnIcon = this.textureData.getTexture( "btn_play01", 19, 16 );

    this.ui.clockShadow = this.textureData.getTexture( "icon_time_bg", 52, 56 );
    this.ui.clockImg = this.textureData.getTexture( "icon_time", 22, 46 );

    this.ui.leftBtnBg = this.textureData.getTexture( "btn_control_left_bg", 175, 155 );
    this.ui.leftBtn = this.textureData.getTexture( "btn_control_left", 4, -4 );
    this.ui.upBtnBg = this.textureData.getTexture( "btn_control_up_bg", 307, 60 );
    this.ui.upBtn = this.textureData.getTexture( "btn_control_up", 0, -5 );
    this.ui.rightBtnBg = this.textureData.getTexture( "btn_control_right_bg", 444, 155 );
    this.ui.rightBtn = this.textureData.getTexture( "btn_control_right", -4, -4 );
    this.ui.downBtnBg = this.textureData.getTexture( "btn_control_down_bg", 307, 260 );
    this.ui.downBtn = this.textureData.getTexture( "btn_control_down", 0, -10 );
    this.ui.catchBtnBg = this.textureData.getTexture( "btn_grab_bg", 518, 257 );
    this.ui.catchBtn = this.textureData.getTexture( "btn_grab", 0, -5 );

    this.isFree = this.productData.isFree == "1" && User.instance.isFree;

    this.sty.productImgStyle = StyleX.combine( StyleX.borderRadius(30), StyleX.setItemRect( 3, 2, 165, 165 ) );
    this.sty.productImgSize = StyleX.setSize( 165, 165 );
  }

  ngOnDestroy(): void {
    clearInterval( this.timerId ); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if( !this.lastPlaying && this.playing ){
      this.timeLeft = 40;
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
    if( this.productData.isVIP == "1" && !User.instance.isVip ){
      Trigger.popupManager.showGetVip();
      return;
    }
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

  showProductInfo(){
    Trigger.popupManager.showProductInfo( this.productData );
  }

  showOocPo(){
    Trigger.ooc();
    Purchase.poPurchaseSource = "add";
  }

  showHistory(){
    Trigger.gotoPage( WebPages.LAST_WIN_PLAY, this.productData );
    trace.report( "game replay" );
  }
}
