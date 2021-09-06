/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-04 10:57:48
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-06 17:28:31
 */
import { Application, UIFromParent, Rectangle, BitmapData } from '../../../basicUI/basic-ui.module';
import { ListItemComponent } from '../../../service/dinomao-game.module';
import { AfterViewInit, Component, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent extends ListItemComponent {

  productBg!: BitmapData;
  productImg: string = '';
  vipFlag!: BitmapData;
  coinIcon!: BitmapData;
  infoIcon!: BitmapData;

  textColor: number = 0;
  textSize: number = 32;
  textAlign: string = "left";
  itemPrice: number = 0;
  itemName: string = '';
  priceRect: Rectangle = new Rectangle().init( 65, 363, 150, 32 );
  nameRect: Rectangle = new Rectangle().init( 25, 321, 270, 32 );

  position: string = '';
  productId: string = '';

  constructor() {
    super();
  }

  initUI(){
    this.productBg = this.textureData.getTexture( "bg0", 0, 0 );
    this.vipFlag = this.textureData.getTexture( "VIP_Subscript", -9, -11 );
    this.coinIcon = this.textureData.getTexture( "icon_coin", 10, 355 );
    this.infoIcon = this.textureData.getTexture( "btn_info", 292, 355 );
    this.productImg = this.itemData.img;
    this.itemPrice = this.itemData.price;
    this.itemName = this.itemData.name;
    this.productId = "productItem" + this.itemData.good_id;

    this.position = `
      left: ${this.index % 2 * 365 + 22}px;
      top: ${Math.floor(this.index/2) * 425 + 25}px;
    `
  }

  onImgload(){
    this.itemData.imgLoaded = true;
  }
}
