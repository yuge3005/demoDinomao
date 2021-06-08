/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-04 10:57:48
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-08 12:02:52
 */
import { Rectangle } from '../../../basicUI/geom/rectangle';
import { UIFromParent } from '../../UIFromParent';
import { BitmapData } from '../../../basicUI/image/bitmap-data';
import { MachineData } from 'src/service/machine-data';
import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent extends UIFromParent implements AfterViewInit{

  @Input() itemData!: MachineData;
  @Input() index: number = 0;

  private pd!: HTMLElement | null;

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
    this.productId = "productItem" + this.itemData.mac_id;

    this.position = `
      left: ${this.index % 2 * 365 + 22}px;
      top: ${Math.floor(this.index/2) * 425 + 25}px;
    `
  }

  ngAfterViewInit(){
    this.pd = document.getElementById( this.productId + "" );
  }

  onItemClick(){
    if( this.pd ) console.log( this.pd.style.display = "none" )
  }
}
