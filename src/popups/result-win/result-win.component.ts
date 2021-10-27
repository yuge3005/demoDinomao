/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 10:21:17
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-27 10:38:13
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BitmapData, Application } from '../../basicUI/basic-ui.module';
import { GenericModalComponent, Trigger, TextData } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-result-win',
  templateUrl: './result-win.component.html',
  styleUrls: ['./result-win.component.css']
})
export class ResultWinComponent extends GenericModalComponent{

  okBtn!: BitmapData;
  coinIcon!: BitmapData;

  winText!: TextData;
  winString: string = "You win!";
  priceText!: TextData;
  price: number = 0;
  timeCountdownText!: TextData;
  timeCountdownNumber: number = 0;

  constructor(public http: HttpClient) {
    super( http );
  }

  initUI(){
    super.setPopupBg( "bg_Congratulations1" );

    this.okBtn = this.textureData.getTexture( "btn_play", 29, 824 );
    this.closeBtn = this.textureData.getTexture( "btn_prize", 321, 824 );
    this.coinIcon = this.textureData.getTexture( "coin", 229, 836 );

    this.priceText = this.textureJson.price;

    let products: any = Trigger.popupData.products;
    let product: any = products[0];

    this.price = product.price;
  }
}
