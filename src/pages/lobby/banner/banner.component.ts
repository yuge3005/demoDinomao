import { Rectangle, Point, Application, SoundManager, DragEntity, maskStyle } from '../../../basicUI/basic-ui.module';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-31 10:03:32
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-14 16:11:07
*/
import { FeatureVo, trace, Trigger, WebPages } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnDestroy {

  private timerId: any;
  featureData: FeatureVo[] = [];
  featureDataForShow: FeatureVo[] = [];

  showTouchBar: boolean = false;
  carouselCount: number = 0;

  activeIndexPosition: Rectangle = new Rectangle( 75, 240, 600, 15 );
  touchBarRect: Rectangle = new Rectangle( 0, 63, Application.settings.stageWidth, 212 );

  @ViewChild('bannerEntity', {static: true}) bannerEntity!: ElementRef;
  dragElement!: DragEntity;
  
  isMoving: boolean = false;
  tweenMask: string = '';
  changingArt: string = '';

  constructor() { }

  ngOnInit() {
    this.timerId = setInterval(() => {
      this.checkFeature();
    }, 200);

    this.dragElement = new DragEntity( this.bannerEntity.nativeElement, Application.settings.stageWidth );
    this.randomMask();
  }

  randomMask(){
    this.tweenMask = maskStyle( "assets/loading_ui/tween_mask" + Math.floor( Math.random() * 4 + 1 ) + ".gif" );
  }

  bennerClick(){
    let data: FeatureVo = this.featureData[this.carouselCount];
    if( data.behaviour ) this.clickBehaviour( data.behaviour, data.featured );
    SoundManager.play( "assets/sound/banner_click.mp3" );
  }

  private clickBehaviour( behaviour: string, featureId: string = "" ){
    switch( behaviour ){
      case "open_bank": 
        Trigger.gotoPage( WebPages.SHOP );
        break;
      case "open_subscription":
        Trigger.gotoPage( WebPages.SHOP, "vip" );
        trace.report( "banner click", "VIP" );
        break;
      case "open_po":
        this.openPoByFeatureId( featureId );
        trace.report( "banner click", "PO" );
        break;
      case "open_club":
        this.openPoByFeatureId( featureId );
        trace.report( "banner click", "CLUB" );
        break;
      case "open_category":
        Trigger.popupManager.openCategory( featureId );
        trace.report( "banner click", "NEW PRIZE" );
        break;
      case "open_invite":
        Trigger.gotoPage( WebPages.INVITE );
        break;
      default: 
        trace.log( "unexpect click_behaviour" );
        break;
    }
  }

  private openPoByFeatureId( featureId: string ){
    if( !featureId ){
      trace.log( "featureId unexist" );
      return;
    }
    Trigger.popupManager.openPoByFeatureId( featureId );
  }

  ngOnDestroy(){
    clearInterval( this.timerId );
    this.dragElement?.dispose();
  }

  private checkFeature(){
    if( Trigger.featureData && this.dragElement ){
      clearInterval( this.timerId );
      this.featureData = Trigger.featureData;
      if( this.featureData.length >= 2 ){
        this.featureDataForShow = this.dragElement.setDatas( this.featureData, 1, 1 );
        this.startLoop();
        this.showTouchBar = true;
      }
      else this.featureDataForShow = this.featureData;
    }
  }

  private startLoop(){
    if( this.featureData.length < 2 ) return;
    this.timerId = setInterval(() => {
      this.loopFeature();
    }, 4000);
  }

  private loopFeature(){
    this.changingArt = this.featureData[(this.carouselCount+1)%this.featureData.length]?.art;
    this.dragElement.move( 1, this.resetShowingIndex.bind( this ), 0.9 );
    this.isMoving = true;
    clearInterval( this.timerId );
  }

  dargStatusChange( state: number | Point ){
    if( state instanceof Point ){
      let endDrag: boolean = this.dragElement.dragEnd( this.resetShowingIndex.bind( this ), 0.3 );
      if( endDrag ) this.startLoop();
    }
    else{
      let startDrag: boolean = this.dragElement.getState(state);
      if( startDrag ) clearInterval( this.timerId );
    }
  }

  resetShowingIndex(){
    this.carouselCount = this.dragElement.getNewIndexByOffsetIndex( -Math.round( this.dragElement.scrollX / Application.settings.stageWidth ) );
    this.featureDataForShow = this.dragElement.resetCurrentIndex( this.carouselCount );
    if( this.isMoving ){
      this.isMoving = false;
      this.randomMask();
      this.startLoop();
    }
  }

  clickOnPoint( index: number ): void{
    if( this.dragElement.isSlipping ) return;
    clearInterval( this.timerId );
    this.changingArt = this.featureData[index]?.art;
    this.dragElement.move( index - this.carouselCount, this.resetShowingIndex.bind( this ), 0.9 );
    this.isMoving = true;
  }
}
