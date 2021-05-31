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

  productBg!: BitmapData;
  productImg: string = '';
  vipFlag!: BitmapData;

  constructor() {
    super();
  }

  initUI(){
    this.productBg = this.textureData.getTexture( "bg0", 0, 0 );
    this.vipFlag = this.textureData.getTexture( "VIP_Subscript", 90, -2 );
    this.productImg = this.itemData.img;
  }

  onItemClick( data: MachineData ){

  }
}
