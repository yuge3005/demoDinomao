/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-09 16:34:24
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-09 17:28:57
 */
import { Component } from '@angular/core';
import { BitmapData } from '../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, GameHttp, GM } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-prize',
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.css']
})
export class PrizeComponent extends MainPage {

  showPrize: boolean = true;

  shocked!: BitmapData;
  addBtn!: BitmapData;

  allPrizeIcon!: BitmapData;
  allPrizeBtn!: BitmapData;
  packageIcon!: BitmapData;
  packageBtn!: BitmapData;

  prizeList!: any[];

  constructor() {
    super();
    this.textureUrl = "assets/prize/prize.json";
  }

  initUI() {
    Loading.status = 1;

    this.allPrizeIcon = this.textureData.getTexture( "all-active", 50, 60 );
    this.allPrizeBtn = this.textureData.getTexture( "all", 50, 60 );
    this.packageIcon = this.textureData.getTexture( "package-active", 450, 60 );
    this.packageBtn = this.textureData.getTexture( "package", 450, 60 );

    this.shocked = this.textureData.getTexture( "shocked", 300, 700 );
    new GameHttp().loadData( "cmd.php?action=shop&" + GM.interfaceString, this.getPrizeList.bind(this), "POST", "type=get_prize_list" );
  }

  addOrder(){
    this.showPrize = true;
  }

  switchPannel( showPrize: boolean ){
    this.showPrize = showPrize;
  }

  getPrizeList( data: any ){
    this.prizeList = data.list;
  }
}
