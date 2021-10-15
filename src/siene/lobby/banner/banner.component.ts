import { Rectangle, Application } from '../../../basicUI/basic-ui.module';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-31 10:03:32
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-15 14:04:44
*/
import { FeatureVo, trace, Trigger, WebPages } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnDestroy {

  private timerId: any;
  private tweenId: any;
  private tweenTimerCount: number = 0;
  featureData: FeatureVo[] = [];
  featureDataForShow: FeatureVo[] = [];

  showTouchBar: boolean = false;

  targetLeft: number = 0;
  carouselCount: number = 0;
  carouselState: number = 0;

  activeIndexPosition: Rectangle = new Rectangle().init( 75, 240, 600, 15 );
  activeIndex: number = 0;

  touchBarRect: Rectangle = new Rectangle().init( 0, 63, 750, 212 );

  private lastLoopMoveStartTime: number = 0;
  private bannerDraging: boolean = false;

  @ViewChild('bannerEntity', {static: true}) bannerEntity!: ElementRef;
  private lastDragState: number = 0;

  constructor() { }

  ngOnInit() {
    this.timerId = setInterval(() => {
      this.checkFeature();
    }, 200);
  }

  bennerClick(){
    this.carouselCount = this.carouselCount % this.featureData.length;
    let data: FeatureVo = this.featureData[this.carouselCount];
    if( data.behaviour ) this.clickBehaviour( data.behaviour, data.featured );
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
    clearTimeout( this.tweenId );
  }

  private checkFeature(){
    if( Trigger.featureData ){
      clearInterval( this.timerId );
      this.featureData = Trigger.featureData;
      if( this.featureData.length >= 2 ){
        this.featureDataForShow = this.featureData.concat()
        this.featureDataForShow.push( this.featureData[0] );
        this.featureDataForShow.unshift( this.featureData[this.featureData.length-1] );
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
  }

  setCarouselState(value: number, updateImmediately: boolean = false){
    this.carouselState = value % ( this.featureData.length + 1 );
    let targetLeft = -750 * this.carouselState;
    if( targetLeft != this.targetLeft ) {
      this.targetLeft = targetLeft;
      if( updateImmediately ) this.bannerEntity.nativeElement.style.left = targetLeft + "px";
      else{
        this.tweenTimerCount = Math.floor( 400 / 33 );
        this.tweenId = setTimeout( this.tweenInterval.bind(this), 33 );
        this.lastLoopMoveStartTime = new Date().getTime();
      }
    }
  }

  tweenInterval(){
    let targetLeft: number = Number( this.bannerEntity.nativeElement.style.left.replace( "px", "" ) );
    targetLeft += ( this.targetLeft - targetLeft ) / this.tweenTimerCount;
    this.bannerEntity.nativeElement.style.left = Math.floor( targetLeft ) + "px";
    this.tweenId = setTimeout( this.tweenInterval.bind(this), 33 );

    this.tweenTimerCount--;
    if( this.tweenTimerCount <= 0 ){
      this.bannerEntity.nativeElement.style.left = this.targetLeft + "px";
    }
  }

  dargStatusChange( state: number ){
    if( !this.bannerDraging && state == 0 && new Date().getTime() - this.lastLoopMoveStartTime >= 400 ){
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
            if( this.carouselCount < 0 ) this.carouselCount += this.featureData.length;
            this.activeIndex = this.carouselCount % this.featureData.length;
            this.setCarouselState( this.carouselCount );
          }
        }
      }
      this.bannerDraging = false;
    }
    if( this.bannerDraging ){
      let activeIndex = this.carouselCount % this.featureData.length;
      this.targetLeft = state -750 * activeIndex;
      this.bannerEntity.nativeElement.style.left = this.targetLeft + "px";
      this.lastDragState = state;
    }
  }
}
