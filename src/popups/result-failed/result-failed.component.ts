/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-26 13:04:43
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-26 15:51:19
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BitmapData, Application } from '../../basicUI/basic-ui.module';
import { GenericModalComponent, Trigger, TextData } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-result-failed',
  templateUrl: './result-failed.component.html',
  styleUrls: ['./result-failed.component.css']
})
export class ResultFailedComponent extends GenericModalComponent{

  okBtn!: BitmapData;
  coinIcon!: BitmapData;

  scoreText!: TextData;
  score: number = 0;
  priceText!: TextData;
  price: number = 0;
  timeCountdownText!: TextData;
  timeCountdownNumber: number = 0;

  private startTime: number = 0;
  intervalId: any;

  constructor(public http: HttpClient) {
    super( http );
  }

  initUI(){
    super.setPopupBg( "bg_soclose" );

    this.okBtn = this.textureData.getTexture( "btn_retry", 29, 824 );
    this.closeBtn = this.textureData.getTexture( "btn_leave", 321, 824 );
    this.coinIcon = this.textureData.getTexture( "coin", 229, 836 );

    this.scoreText = this.textureJson.score;
    this.timeCountdownText = this.textureJson.time;
    this.priceText = this.textureJson.price;

    let products: any = Trigger.popupData.products;
    let product: any = products[0];
    this.score = product.score;
    this.startTime = product.time;
    this.price = product.price;

    this.intervalId = setInterval( this.countdown.bind(this), 990 );
    this.countdown();
  }

  retry(){
    this.closePo();
  }

  countdown(){
    let t: number = Math.round( ( this.startTime - Application.getTimer() ) * 0.001 ) + 10;
    if( this.timeCountdownNumber == 0 && t < 0 ){
      clearInterval( this.intervalId );
      this.closePo();
    }
    else this.timeCountdownNumber = t;
  }

  ngOnDestroy(){
    clearInterval( this.intervalId );
  }
}
