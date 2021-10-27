/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 16:42:45
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-27 18:02:14
 */
import { Component } from '@angular/core';
import { BitmapData, Application, ListItemComponent } from '../../../../basicUI/basic-ui.module';
import { TextData } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.css']
})
export class RecordItemComponent extends ListItemComponent {

  itemBg!: BitmapData;
  winIcon!: BitmapData;
  playBtn!: BitmapData;
  shareBtn!: BitmapData;

  isWin: boolean = false;

  constructor() { 
    super();
  }

  initUI(){
    this.itemBg = this.textureData.getTexture( "bg" );
    this.winIcon = this.textureData.getTexture( "won", 583, -5 );
    this.playBtn = this.textureData.getTexture( "btn_video", 526, 111 );
    this.shareBtn = this.textureData.getTexture( "btn_share", 622, 111 );

    this.isWin = this.itemData.result != "0";
  }

  play(){
  }

  share(){
  }
}
