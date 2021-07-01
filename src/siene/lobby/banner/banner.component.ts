import { FirebaseAnaliyticsService } from './../../../service/firebase-analiytics.service';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-31 10:03:32
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-01 17:16:19
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor( private analytics: FirebaseAnaliyticsService ) { }

  ngOnInit() {
  }

  bennerClick(){
    this.analytics.logEvent( "ad_click" );
  }
}
