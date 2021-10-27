/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 10:21:17
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-27 13:21:19
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultComponent } from '../result.component';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { Trigger, TextData } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-result-win',
  templateUrl: './result-win.component.html',
  styleUrls: ['./result-win.component.css']
})
export class ResultWinComponent extends ResultComponent{

  photoFrame!: BitmapData;

  winText!: TextData;
  winString: string = "You win!";

  productImg: string = "";

  constructor(public http: HttpClient) {
    super( http );
  }

  initUI(){
    super.setPopupBg( "bg_Congratulations1" );

    this.okBtn = this.textureData.getTexture( "btn_play", 29, 824 );
    this.closeBtn = this.textureData.getTexture( "btn_prize", 321, 824 );
    this.coinIcon = this.textureData.getTexture( "coin", 229, 836 );
    this.photoFrame = this.textureData.getTexture( "Photo-frame", 303, 280 );

    this.winText = this.textureJson.win;
    this.timeCountdownText = this.textureJson.time;
    this.priceText = this.textureJson.price;

    let products: any = Trigger.popupData.products;
    let product: any = products[0];
    this.getProcuctDataAndStartInterval( product );
  }

  protected getProcuctDataAndStartInterval( product: any ){
    super.getProcuctDataAndStartInterval( product );
    this.productImg = product.img;
  }
}
