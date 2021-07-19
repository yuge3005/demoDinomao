import { Rectangle } from './../../basicUI/geom/rectangle';
import { BitmapData } from './../../basicUI/image/bitmap-data';
import { HttpClient } from '@angular/common/http';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-16 11:54:28
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-16 14:22:57
 */
import { Component } from '@angular/core';
import { GenericModalComponent } from 'src/siene/loading-and-po/popup-layer/generic-modal.component';

@Component({
  selector: 'app-vip-pass',
  templateUrl: './vip-pass.component.html',
  styleUrls: ['./vip-pass.component.css']
})
export class VipPassComponent extends GenericModalComponent {

  tokens!: BitmapData;
  free!: BitmapData;
  exchange!: BitmapData;
  shipment!: BitmapData;
  premium!: BitmapData;
  buyBtn!: BitmapData;

  priceRect!: Rectangle;

  constructor(public http: HttpClient) {
    super( http );
    this.textureUrl = "assets/vip_pass/vip_pass.json";
  }

  initUI(){
    super.setPopupBg( "bg" );

    this.popupBg = this.textureData.getTexture( "bg" );
    this.tokens = this.textureData.getTexture( "tokens", 72, 240 );
    this.free = this.textureData.getTexture( "free", 390, 242 );
    this.exchange = this.textureData.getTexture( "exchange", 8, 592 );
    this.shipment = this.textureData.getTexture( "shipment", 202, 610 );
    this.premium = this.textureData.getTexture( "premium", 464, 554 );
    this.closeBtn = this.textureData.getTexture( "btn_return", 24, 12 );
    this.buyBtn = this.textureData.getTexture( "btn_get vip", 180, 1065 );

    this.priceRect = new Rectangle( 70, 900, 600, 120 );
  }
}
