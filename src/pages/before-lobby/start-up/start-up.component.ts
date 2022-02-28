import { Rectangle, Point, BitmapData, Application, DragEntity, StyleX } from '../../../basicUI/basic-ui.module';
import { MainPage, Loading, WebPages, Trigger } from '../../../service/dinomao-game.module';
import { Component, ViewChild, ElementRef } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-14 13:31:19
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-06 13:58:00
 */
@Component({
  selector: 'app-start-up',
  templateUrl: './start-up.component.html'
})
export class StartUpComponent extends MainPage {

  tipPages!: BitmapData[];
  tipPagesForShow!: BitmapData[];
  targetLeft: number = 0;
  carouselCount: number = 0;
  
  activeIndexPosition!: Rectangle;

  pageRect!: Rectangle;

  getBtnUI( index: number ){
    if( this.tipPagesForShow[index] == this.tipPages[this.tipPages.length - 1] ) return this.ui.startBtn;
    return this.ui.nextBtn;
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
    this.ui.nextBtn = this.textureData.getTexture( "btn_next", 184, 938 );
    this.ui.startBtn = this.textureData.getTexture( "btn_start", 184, 938 );
    this.activeIndexPosition = new Rectangle().init( 75, this.pageHeight - 100, 600, 15 );
    this.pageRect = new Rectangle().init( 0, 0, Application.settings.stageWidth, this.pageHeight );

    this.dragElement = new DragEntity( this.startPageEntity.nativeElement, Application.settings.stageWidth );
    this.tipPagesForShow = this.dragElement.setDatas( this.tipPages, 1, 1, 0 );

    this.styles.stretchingBg = StyleX.stretchingBg( "assets/start_up/bg.png" );
    this.styles.startPageEntity = StyleX.combine( StyleX.setSize(650,1124), StyleX.anchorOffset(325,562), StyleX.center() );
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

  dargStatusChange( state: number | Point ){
    if( state instanceof Point ){
      this.dragElement.dragEnd( this.resetShowingIndex.bind( this ) );
    }
    else{
      if( this.carouselCount == this.tipPages.length - 1 && state < 0 ) state = 0;
      if( this.carouselCount == 0 && state > 0 ) state = 0;
      this.dragElement.getState( state );
    }
  }

  resetShowingIndex(){
    this.carouselCount = this.dragElement.getNewIndexByOffsetIndex( this.dragElement.scrollX < 0 ? 1 : -1 );
    this.tipPagesForShow = this.dragElement.resetCurrentIndex( this.carouselCount );
  }

  ngOnDestroy(){
    this.dragElement?.dispose();
  }
}
