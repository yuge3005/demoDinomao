/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-14 11:43:09
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-14 13:53:06
*/
import { Component } from '@angular/core';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { ListItemComponent, TextData } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-user-center-item',
  templateUrl: './user-center-item.component.html',
  styleUrls: ['./user-center-item.component.css']
})
export class UserCenterItemComponent extends ListItemComponent {

  itemBg!: BitmapData;
  arrow!: BitmapData;
  mainIcon!: BitmapData;

  tipText!: TextData;
  tipString: string = "";

  constructor() { 
    super();
  }

  initUI(){
    this.itemBg = this.textureData.getTexture( "item_bg" );
    this.arrow = this.textureData.getTexture( "right", 648, 26 );

    this.mainIcon = this.textureData.getTexture( this.itemData.icon );
    this.mainIcon.left = 116 - this.mainIcon.w >> 1;
    this.mainIcon.top = 116 - this.mainIcon.h >> 1;

    this.tipText = {rect:{x:120,y:30,w:525,h:50},color:0xFFFFFF,size:35,font:"arial",align:"left",stroke:0,strokeColor:0,bold:false}
    this.tipString = this.itemData.tip;
  }

}
