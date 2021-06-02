import { Rectangle } from './../../geom/rectangle';
import { UIFromParent } from './../UIFromParent';
import { TextureData } from '../../basicUI/image/texture-data';
import { BitmapData } from '../../basicUI/image/bitmap-data';
import { HttpClient } from '@angular/common/http';
import { UIComponent } from './../UIComponent';
import { MachineData } from 'src/service/machine-data';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent extends UIFromParent{

  @Input() itemData!: MachineData;
  @Input() index: number = 0;

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
  priceRect: Rectangle = new Rectangle( 65, 363, 150, 32 );
  nameRect: Rectangle = new Rectangle( 25, 321, 270, 32 );

  position: string = '';

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

    this.position = `
      left: ${this.index % 2 * 365 + 22}px;
      top: ${Math.floor(this.index/2) * 425 + 240}px;
    `
  }

  onItemClick( data: MachineData ){

  }
}
