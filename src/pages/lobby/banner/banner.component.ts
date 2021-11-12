import { Rectangle, Application, Tween, SoundManager, DragEntity } from '../../../basicUI/basic-ui.module';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-31 10:03:32
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-12 10:10:27
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

  touchBarRect: Rectangle = new Rectangle().init( 0, 63, Application.settings.stageWidth, 212 );

  private lastLoopMoveStartTime: number = 0;
  private bannerDraging: boolean = false;

  @ViewChild('bannerEntity', {static: true}) bannerEntity!: ElementRef;
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
        this.startLoop();
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
    Tween.to( this.dragElement, 0.3, { styleLeft: -750 }, 0, this.resetShowingIndex.bind( this ) );
    this.lastLoopMoveStartTime = Application.getTimer();
  }

  dargStatusChange( state: number ){
    if( !this.bannerDraging && state == 0 && Application.getTimer() - this.lastLoopMoveStartTime >= 300 ){
      clearInterval( this.timerId );
      this.bannerDraging = true;
    }
    if( isNaN( state ) ){
      if( this.bannerDraging ){
        this.startLoop();
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
      this.bannerDraging = false;
    }
    if( this.bannerDraging ){
      this.dragElement.styleLeft = state;
    }
  }

  resetShowingIndex(){
    if( this.dragElement.styleLeft < 0 ){
      this.carouselCount = ( this.carouselCount + 1 ) % this.featureData.length;
      this.featureDataForShow = this.dragElement.resetCurrentIndex( this.carouselCount );
    }
    else{
      this.carouselCount = ( this.carouselCount + this.featureData.length - 1 ) % this.featureData.length;
      this.featureDataForShow = this.dragElement.resetCurrentIndex( this.carouselCount );
    }
  }
}
