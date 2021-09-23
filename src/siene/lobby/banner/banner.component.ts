/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-31 10:03:32
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-23 16:25:17
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FeatureVo, trace, Trigger, WebPages } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('carousel',[
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
      state('p10', style({left: '-7500px'})),
      state('p11', style({left: '-8250px'})),
      state('p12', style({left: '-9000px'})),
      state('p13', style({left: '-9750px'})),
      transition('* => *', [animate('0.3s ease-out')])
    ])
  ]
})
export class BannerComponent implements OnInit, OnDestroy {

  private timerId: any;
  public featureData: FeatureVo[] = [{art:"assets/banner/banner_01.png"}];

  carouselState: string = "p0";
  carouselCount: number = 0;

  constructor() { }

  ngOnInit() {
    this.timerId = setInterval(() => {
      this.checkFeature();
    }, 500);
  }

  bennerClick(){
    // this.analytics.logEvent( "ad_click" );
    this.carouselCount = this.carouselCount % this.featureData.length;
    let data: FeatureVo = this.featureData[this.carouselCount];
    if( data.behaviour ) this.clickBehaviour( data.behaviour, data.featured );
  }

  clickBehaviour( behaviour: string, featureId: string = "" ){
    switch( behaviour ){
      case "open_bank": 
        Trigger.popupManager.openBank();
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
      default: 
        trace.log( "unexpect click_behaviour" );
        break;
    }
  }

  ngOnDestroy(){
    clearInterval( this.timerId );
  }

  checkFeature(){
    if( Trigger.featureData ){
      this.featureData = Trigger.featureData;
      clearInterval( this.timerId );
      this.timerId = setInterval(() => {
        this.loopFeature();
      }, 4000);
    }
  }

  loopFeature(){
    this.carouselState = "p" + ++this.carouselCount % this.featureData.length;
  }
}
