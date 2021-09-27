/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-22 17:57:16
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-27 14:18:10
*/
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BitmapData, Point } from '../../basicUI/basic-ui.module';
import { GenericModalComponent, Purchase, Trigger, User } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-purchase-success',
  templateUrl: './purchase-success.component.html',
  styleUrls: ['./purchase-success.component.css']
})
export class PurchaseSuccessComponent extends GenericModalComponent{

  light!: BitmapData;
  collectBtn!: BitmapData;

  coins: number = 0;

  constructor(public http: HttpClient) {
    super( http );
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
      Trigger.fly( 10, new Point().init( 500, 850 ), new Point().init( 185, 50 ), new Point().init( 0, 1200 ), 0.3, 0.4, 0.8 );
      User.instance.coins = this.coins;
      this.closePo();
  }
}
