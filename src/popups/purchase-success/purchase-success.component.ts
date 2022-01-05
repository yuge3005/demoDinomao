/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-22 17:57:16
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:35:57
*/
import { Component } from '@angular/core';
import { BitmapData, Point } from '../../basicUI/basic-ui.module';
import { GenericModalComponent, Purchase, Trigger, User } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-purchase-success',
  templateUrl: './purchase-success.component.html'
})
export class PurchaseSuccessComponent extends GenericModalComponent{

  light!: BitmapData;
  collectBtn!: BitmapData;

  coins: number = 0;

  constructor() {
    super();
  }

  initUI(){
    let bgAssets: string = Purchase.isVip ? "bg1" : "bg";
    super.setPopupBg( bgAssets );

    this.light = this.textureData.getTexture( "quan", -137 >> 1, -336 >> 1 );
    this.collectBtn = this.textureData.getTexture( "btn_ok", 130, 365 );

    let products: any = Trigger.popupData.products;
    let product: any = products[0];
    this.coins = product.coins;
  }

  collect(){
      Trigger.fly( 10, new Point().init( 500, 850 ), new Point().init( 182-90, 50-90 ), new Point().init( 0, 700 ), 0.3, 0.36, 1 );
      User.instance.coins = this.coins;
      this.closePo();
  }
}
