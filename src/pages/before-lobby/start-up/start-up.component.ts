import { Rectangle, Point, BitmapData, Application, DragEntity } from '../../../basicUI/basic-ui.module';
import { MainPage, Loading, WebPages, Trigger } from '../../../service/dinomao-game.module';
import { Component, ViewChild, ElementRef } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-14 13:31:19
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-15 15:53:05
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


  getBtnUI( index: number ){
    if( this.tipPagesForShow[index] == this.tipPages[this.tipPages.length - 1] ) return this.startBtn;
    return this.nextBtn;
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

    this.dragElement = new DragEntity( this.startPageEntity.nativeElement, Application.settings.stageWidth );
    this.tipPagesForShow = this.dragElement.setDatas( this.tipPages, 1, 1, 0 );
  }

  onClick( pt: Point ){
    let clickOnButton: boolean = this.pointOnButton( pt );
    if( clickOnButton ){
      if( this.carouselCount < this.tipPages.length - 1 ){
        this.dragElement.move( 1, this.resetShowingIndex.bind( this ) );
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
    if( isNaN( state ) ){
      this.dragElement.dragEnd( this.resetShowingIndex.bind( this ) );
    }
    else{
      if( this.carouselCount == this.tipPages.length - 1 && state < 0 ) state = 0;
      if( this.carouselCount == 0 && state > 0 ) state = 0;
      this.dragElement.getState( state );
    }
  }

  resetShowingIndex(){
    this.carouselCount = this.dragElement.getNewIndexByOffsetIndex( this.dragElement.styleLeft < 0 ? 1 : -1 );
    this.tipPagesForShow = this.dragElement.resetCurrentIndex( this.carouselCount );
  }

  OnDestroy(){
    this.dragElement?.dispose();
  }
}
