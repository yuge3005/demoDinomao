import { trace } from './../../../service/gameUILogic/trace';
import { Trigger } from './../../../service/gameUILogic/Trigger';
import { FeatureVo } from './../../../service/gameData/featrue-vo';
import { FirebaseAnaliyticsService } from './../../../service/firebase-analiytics.service';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-31 10:03:32
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-20 17:38:15
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
      transition('p0 => p1', [animate('0.3s')]),
      transition('p1 => p2', [animate('0.3s')]),
      transition('p2 => p3', [animate('0.3s')]),
      transition('p3 => p4', [animate('0.3s')]),
      transition('p4 => p5', [animate('0.3s')]),
      transition('p5 => p6', [animate('0.3s')]),
      transition('p6 => p7', [animate('0.3s')]),
      transition('p7 => p8', [animate('0.3s')]),
      transition('p8 => p9', [animate('0.3s')]),
      transition('p9 => p0', [animate('0.3s')])
    ])
  ]
})
export class BannerComponent implements OnInit, OnDestroy {

  private timerId: any;
  public featureData: FeatureVo[] = [{art:"assets/banner/banner_01.png"}];

  carouselState: string = "p0";
  carouselCount: number = 0;

  constructor( private analytics: FirebaseAnaliyticsService ) { }

  ngOnInit() {
    this.timerId = setInterval(() => {
      this.checkFeature();
    }, 500);
  }

  bennerClick(){
    this.analytics.logEvent( "ad_click" );
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
