import { Trigger } from './../../../service/gameUILogic/Trigger';
import { FeatureVo } from './../../../service/gameData/featrue-vo';
import { FirebaseAnaliyticsService } from './../../../service/firebase-analiytics.service';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-31 10:03:32
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-20 15:23:22
 */
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnDestroy {

  private timerId: any;
  public featureData: FeatureVo[] = [{art:"assets/banner/banner_01.png"}];

  carousel: string = "p0";
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
      }, 5000);
    }
  }

  loopFeature(){
    this.carouselCount++;
    this.carousel = "p" + ++this.carouselCount % this.featureData.length;
  }
}
