import { Rectangle, Application } from '../../../basicUI/basic-ui.module';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-31 10:03:32
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-15 11:23:22
*/
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FeatureVo, trace, Trigger, WebPages } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('carousel',[
      state('pp', style({left: '0px'})),
      state('p0', style({left: '0px'})),
      state('p1', style({left: '-750px'})),
      state('p2', style({left: '-1500px'})),
      state('p3', style({left: '-2250px'})),
      state('p4', style({left: '-3000px'})),
      state('p5', style({left: '-3750px'})),
      state('p6', style({left: '-4500px'})),
      state('p7', style({left: '-5250px'})),
      state('p8', style({left: '-6000px'})),
      state('p9', style({left: '-6750px'})),
      state('p0s', style({left: '0px'})),
      state('p1s', style({left: '-750px'})),
      state('p2s', style({left: '-1500px'})),
      state('p3s', style({left: '-2250px'})),
      state('p4s', style({left: '-3000px'})),
      state('p5s', style({left: '-3750px'})),
      state('p6s', style({left: '-4500px'})),
      state('p7s', style({left: '-5250px'})),
      state('p8s', style({left: '-6000px'})),
      state('p9s', style({left: '-6750px'})),
      transition('* => pp', [animate('0s ease-out')]),
      transition('* => *', [animate('0.3s ease-out')])
    ])
  ]
})
export class BannerComponent implements OnInit, OnDestroy {

  private timerId: any;
  private tweenId: any;
  featureData: FeatureVo[] = [];
  featureDataForShow: FeatureVo[] = [];

  showTouchBar: boolean = false;

  carouselState: string = "p0";
  carouselCount: number = 0;

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
    clearInterval( this.tweenId );
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
    if( this.carouselCount == this.featureData.length ){
      this.carouselCount = 0;
      this.carouselState = "pp";
    }
    else{
      this.carouselCount++;
      this.activeIndex = this.carouselCount % this.featureData.length;
      let carouselStatus: number = this.carouselCount % ( this.featureData.length + 1 );
      this.carouselState = "p" + carouselStatus;
      this.lastLoopMoveStartTime = new Date().getTime();
    }
  }

  dargStatusChange( state: number ){
    if( !this.bannerDraging && state == 0 && new Date().getTime() - this.lastLoopMoveStartTime >= 320 ){
      clearInterval( this.timerId );
      this.bannerDraging = true;
      if( this.carouselCount == this.featureData.length ){
        this.carouselCount = 0;
        this.carouselState = "pp";
      }
    }
    if( isNaN( state ) ){
      if( this.bannerDraging ){
        this.startLoop();
        if( Math.abs(this.lastDragState) < Application.settings.stageWidth * 0.5 ){
          if( this.carouselState.indexOf("s")>=0 ) this.carouselState = this.carouselState.substr( 0, this.carouselState.length - 1 );
          else this.carouselState = this.carouselState + "s";
        }
        else{
          if( this.lastDragState < 0 ){
            this.loopFeature();
          }
          else{
            console.log( this.carouselCount )
            this.carouselCount -= 2;
            console.log( this.carouselCount )
            if( this.carouselCount <= -1 ) this.carouselCount += this.featureData.length;
            console.log( this.carouselCount )
            this.loopFeature();
          }
        }
      }
      this.bannerDraging = false;
    }
    if( this.bannerDraging ){
      let activeIndex = this.carouselCount % this.featureData.length;
      this.bannerEntity.nativeElement.style.left = state -750 * activeIndex + "px";
      this.lastDragState = state;
    }
  }
}
