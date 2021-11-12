import { Rectangle, Point, BitmapData, Application, Tween, DragEntity } from '../../basicUI/basic-ui.module';
import { MainPage, Loading, WebPages, Trigger } from '../../service/dinomao-game.module';
import { Component, ViewChild, ElementRef } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-14 13:31:19
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-12 11:28:32
 */

@Component({
  selector: 'app-start-up',
  templateUrl: './start-up.component.html',
  styleUrls: ['./start-up.component.css']
})
export class StartUpComponent extends MainPage {

  tipPages!: BitmapData[];
  tipPagesForShow!: BitmapData[];
  nextBtn!: BitmapData;
  startBtn!: BitmapData;
  targetLeft: number = 0;
  carouselCount: number = 0;
  
  activeIndexPosition!: Rectangle;

  pageRect!: Rectangle;
  
  private lastLoopMoveStartTime: number = 0;
  private isDraging: boolean = false;

  getBtnUI( index: number ){
    if( index < this.tipPages.length - 1 ) return this.nextBtn;
    else return this.startBtn;
  }

  @ViewChild('startPageEntity', {static: true}) startPageEntity!: ElementRef;
  dragElement!: DragEntity;

  constructor() {
    super();
    this.textureUrl = "assets/start_up/start_up.json";
  }

  initUI() {
    Loading.status = 2;

    this.tipPages = [];
    this.tipPages[0] = this.textureData.getTexture( "bg1", 60, 406 );
    this.tipPages[1] = this.textureData.getTexture( "bg2", 92, 406 );
    this.tipPages[2] = this.textureData.getTexture( "bg3", 185, 406 );
    this.tipPages[3] = this.textureData.getTexture( "bg4", 10, 406 );
    this.nextBtn = this.textureData.getTexture( "btn_next", 184, 938 );
    this.startBtn = this.textureData.getTexture( "btn_start", 184, 938 );
    this.activeIndexPosition = new Rectangle().init( 75, this.pageHeight - 100, 600, 15 );
    this.pageRect = new Rectangle().init( 0, 0, Application.settings.stageWidth, this.pageHeight );

    this.dragElement = new DragEntity( this.startPageEntity.nativeElement );
    this.tipPagesForShow = this.dragElement.setDatas( this.tipPages, 1, 1, 0 );
  }

  onClick( pt: Point ){
    let clickOnButton: boolean = this.pointOnButton( pt );
    if( clickOnButton ){
      if( this.carouselCount < this.tipPages.length - 1 ){
        Tween.to( this.dragElement, 0.3, { styleLeft: -750 }, 0, this.resetShowingIndex.bind( this ) );
        this.lastLoopMoveStartTime = Application.getTimer();
      }
      else Trigger.gotoPage( WebPages.LOBBY );
    }
  }

  pointOnButton( pt: Point ): boolean{
    let ptRect: Rectangle = new Rectangle().init( 234, (this.pageHeight - 1124) * 0.5 + 938, 282, 98 );
    if( ptRect.containsPoint( pt ) ) return true;
    return false;
  }

  dargStatusChange( state: number ){
    if( !this.isDraging && state == 0 && Application.getTimer() - this.lastLoopMoveStartTime >= 300 ){
      this.isDraging = true;
    }
    if( isNaN( state ) ){
      if( this.isDraging ){
        if( Application.getTimer() - this.lastLoopMoveStartTime >= 300 ){
          if( Math.abs(this.dragElement.styleLeft) < Application.settings.stageWidth * 0.5 ){
            Tween.to( this.dragElement, 0.3, { styleLeft: 0 } );
            this.lastLoopMoveStartTime = Application.getTimer();
          }
          else{
            if( this.dragElement.styleLeft < 0 ){
              Tween.to( this.dragElement, 0.3, { styleLeft: -750 }, 0, this.resetShowingIndex.bind( this ) );
              this.lastLoopMoveStartTime = Application.getTimer();
            }
            else{
              Tween.to( this.dragElement, 0.3, { styleLeft: 750 }, 0, this.resetShowingIndex.bind( this ) );
              this.lastLoopMoveStartTime = Application.getTimer();
            }
          }
        }
      }
      this.isDraging = false;
    }
    if( this.isDraging ){
      if( this.carouselCount == this.tipPages.length - 1 && state < 0 ) state = 0;
      if( this.carouselCount == 0 && state > 0 ) state = 0;
      this.dragElement.styleLeft = state;
    }
  }

  resetShowingIndex(){
    if( this.dragElement.styleLeft < 0 ){
      this.carouselCount = ( this.carouselCount + 1 ) % this.tipPages.length;
      this.tipPagesForShow = this.dragElement.resetCurrentIndex( this.carouselCount );
    }
    else{
      this.carouselCount = ( this.carouselCount + this.tipPages.length - 1 ) % this.tipPages.length;
      this.tipPagesForShow = this.dragElement.resetCurrentIndex( this.carouselCount );
    }
  }

  OnDestroy(){
    Tween.kill( this.dragElement );
  }
}
