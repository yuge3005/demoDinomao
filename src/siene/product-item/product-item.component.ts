import { UIFromParent } from './../UIFromParent';
import { TextureData } from './../../pagePart/image/texture-data';
import { BitmapData } from './../../pagePart/image/bitmap-data';
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

  position: string = '';

  constructor() {
    super();
  }

  initUI(){
    this.productBg = this.textureData.getTexture( "bg0", 0, 0 );
    this.vipFlag = this.textureData.getTexture( "VIP_Subscript", -9, -11 );
    this.productImg = this.itemData.img;

    this.position = `
      left: ${this.index % 2 * 365 + 22}px;
      top: ${Math.floor(this.index/2) * 425 + 240}px;
    `
  }

  onItemClick( data: MachineData ){

  }
}
