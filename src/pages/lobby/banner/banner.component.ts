import { Rectangle, Application, Tween, SoundManager, DragEntity } from '../../../basicUI/basic-ui.module';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-31 10:03:32
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-11 18:01:03
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

  targetLeft: number = 0;
  carouselCount: number = 0;
  carouselState: number = 0;

  activeIndexPosition: Rectangle = new Rectangle().init( 75, 240, 600, 15 );
  activeIndex: number = 0;

  touchBarRect: Rectangle = new Rectangle().init( 0, 63, Application.settings.stageWidth, 212 );

  private lastLoopMoveStartTime: number = 0;
  private bannerDraging: boolean = false;

  @ViewChild('bannerEntity', {static: true}) bannerEntity!: ElementRef;
  private lastDragState: number = 0;
  dragElement!: DragEntity;

  constructor() { }

  ngOnInit() {
    this.timerId = setInterval(() => {
      this.checkFeature();
    }, 200);

    this.dragElement = new DragEntity( this.bannerEntity.nativeElement );
  }

  bennerClick(){
    this.carouselCount = this.carouselCount % this.featureData.length;
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
        break;
      case "open_po":
      case "open_club":
        if( !featureId ){
          trace.log( "featureId unexist" );
          return;
        }
        Trigger.popupManager.openPoByFeatureId( featureId );
        break;
      case "open_category":
        Trigger.popupManager.openCategory( featureId );
        break;
      case "open_invite":
        Trigger.gotoPage( WebPages.INVITE );
        break;
      default: 
        trace.log( "unexpect click_behaviour" );
        break;
    }
  }

  ngOnDestroy(){
    clearInterval( this.timerId );
    Tween.kill( this.dragElement );
  }

  private checkFeature(){
    if( Trigger.featureData && this.dragElement ){
      clearInterval( this.timerId );
      this.featureData = Trigger.featureData;
      if( this.featureData.length >= 2 ){
        this.featureDataForShow = this.dragElement.setDatas( this.featureData, 1, 1 );
        // this.startLoop();
        this.showTouchBar = true;
      }
      else this.featureDataForShow = this.featureData;
    }
  }

  private startLoop(){
    this.timerId = setInterval(() => {
      this.loopFeature();
    }, 4000);
  }

  private loopFeature(){
    this.ifAfterLastToFirst();
    this.carouselCount++;
    this.activeIndex = this.carouselCount % this.featureData.length;
    this.setCarouselState( this.carouselCount );
  }

  private ifAfterLastToFirst(){
    if( this.carouselCount == this.featureData.length ){
      this.carouselCount = 0;
      this.setCarouselState( 0, true );
    }
    if( this.carouselCount < 0 ){
      this.carouselCount += this.featureData.length;
      this.setCarouselState( this.carouselCount, true );
    }
  }

  setCarouselState(value: number, updateImmediately: boolean = false){
    this.carouselState = value % ( this.featureData.length + 1 );
    let targetLeft = - Application.settings.stageWidth * this.carouselState;
    if( targetLeft != this.targetLeft ) {
      this.targetLeft = targetLeft;
      if( updateImmediately ) this.dragElement.styleLeft = targetLeft;
      else{
        Tween.to( this.dragElement, 0.3, { styleLeft: targetLeft } );
        this.lastLoopMoveStartTime = Application.getTimer();
      }
    }
  }

  dargStatusChange( state: number ){
    if( !this.bannerDraging && state == 0 && Application.getTimer() - this.lastLoopMoveStartTime >= 300 ){
      clearInterval( this.timerId );
      this.bannerDraging = true;
      this.ifAfterLastToFirst();
    }
    if( isNaN( state ) ){
      if( this.bannerDraging ){
        this.startLoop();
        if( Math.abs(this.lastDragState) < Application.settings.stageWidth * 0.5 ){
          this.setCarouselState( this.carouselState );
        }
        else{
          if( this.lastDragState < 0 ){
            this.loopFeature();
          }
          else{
            this.carouselCount -= 1;
            this.activeIndex = ( this.carouselCount + this.featureData.length ) % this.featureData.length;
            this.setCarouselState( this.carouselCount );
          }
        }
      }
      this.bannerDraging = false;
    }
    if( this.bannerDraging ){
      let activeIndex = this.carouselCount % this.featureData.length;
      this.targetLeft = state - Application.settings.stageWidth * activeIndex;
      this.dragElement.styleLeft = this.targetLeft;
      this.lastDragState = state;
    }
  }
}
