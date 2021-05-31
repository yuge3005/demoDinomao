import { Component, OnDestroy } from '@angular/core';
import { UIComponent } from './../../siene/UIComponent';
import { BitmapData } from '../image/bitmap-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent extends UIComponent{

  bottomBg!: BitmapData;
  home!: BitmapData;
  shop!: BitmapData;
  rank!: BitmapData;
  my!: BitmapData;

  constructor(public http: HttpClient) {
    super(http);
    this.textureUrl = "/assets/bottom_bar/bottom_bar.json";
   }

   initUI(){
    this.bottomBg = this.textureData.getTexture( "bottom_bg" );
    this.home = this.textureData.getTexture( "HOME", 30, 10 );
    this.shop = this.textureData.getTexture( "SHOP", 226, 10 );
    this.rank = this.textureData.getTexture( "RANK", 422, 10 );
    this.my = this.textureData.getTexture( "MY", 618, 10 );
  }
}
