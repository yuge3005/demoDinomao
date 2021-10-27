/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-10-26 13:04:43
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-27 13:21:50
*/
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultComponent } from '../result.component';
import { Trigger, TextData } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-result-failed',
  templateUrl: './result-failed.component.html'
})
export class ResultFailedComponent extends ResultComponent{

  scoreText!: TextData;
  score: number = 0;

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
    this.getProcuctDataAndStartInterval( product );
  }

  protected getProcuctDataAndStartInterval( product: any ){
    super.getProcuctDataAndStartInterval( product );
    this.score = product.score;
  }
}
