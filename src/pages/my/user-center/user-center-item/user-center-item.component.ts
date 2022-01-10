/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-14 11:43:09
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 16:57:44
*/
import { Component } from '@angular/core';
import { BitmapData, Application, ListItem, StyleX } from 'resize-able-ui';
import { TextData } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-user-center-item',
  templateUrl: './user-center-item.component.html'
})
export class UserCenterItemComponent extends ListItem {

  itemBg!: BitmapData;
  arrow!: BitmapData;
  mainIcon!: BitmapData;

  tipText!: TextData;
  tipString: string = "";

  outLink: boolean = false;
  linkString: string = "";
  linkTarget: string = "_blank";

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

    if( this.itemData.link ){
      if( Application.system.isApp() ){
        this.itemData.link = "newtab:" + this.itemData.link;
      }
      else{
        this.outLink = true;
        this.linkString = this.itemData.link;
      }
    }

    this.styles.lightTextShadow = StyleX.textShadow( 2, 2, 4, 0x333333 );
  }

}
