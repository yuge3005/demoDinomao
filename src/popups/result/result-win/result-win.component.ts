/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 10:21:17
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-31 15:33:31
 */
import { Component } from '@angular/core';
import { ResultComponent } from '../result.component';
import { BitmapData, SimpleMovieClip, StyleX } from 'resize-able-ui';
import { Trigger, TextData, WebPages } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-result-win',
  templateUrl: './result-win.component.html'
})
export class ResultWinComponent extends ResultComponent{

  photoFrame!: BitmapData;

  winText!: TextData;
  winString: string = "You win!";

  productImg: string = "";

  fireworks1!: SimpleMovieClip;
  fireworks2!: SimpleMovieClip;

  constructor() {
    super();
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

    this.fireworks1 = new SimpleMovieClip( "assets/common_popups/result/fireworks.png", "assets/common_popups/result/fireworks.json" );
    this.fireworks1.setPosition( 50, -50 );
    this.fireworks2 = new SimpleMovieClip( "assets/common_popups/result/fireworks.png", "assets/common_popups/result/fireworks.json" );
    this.fireworks2.scaleX = this.fireworks2.scaleY = 0.6;
    this.fireworks2.setPosition( 400, 0 );
    this.fireworks2.gotoAndPlay( 12 );

    this.styles.productStyle = StyleX.combine( StyleX.setItemRect(153,300,335,335), StyleX.borderRadius(40) );
  }

  protected getProcuctDataAndStartInterval( product: any ){
    super.getProcuctDataAndStartInterval( product );
    this.productImg = product.img;
  }

  gotoPrize(){
    this.closePo();
    Trigger.gotoPage( WebPages.PRIZE );
  }
}
