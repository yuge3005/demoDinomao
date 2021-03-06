/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-09 11:41:22
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-31 15:56:52
 */
import { Component } from '@angular/core';
import { BitmapData, StyleX } from 'resize-able-ui';
import { MainPage, Trigger, WebPages, Loading, GameHttp, GM } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-order-for-goods',
  templateUrl: './order-for-goods.component.html',
  styleUrls: ['./order-for-goods.component.css']
})
export class OrderForGoodsComponent extends MainPage {

  backBtn!: BitmapData;
  title!: BitmapData;
  shocked!: BitmapData;

  orderProgressList!: any[];
  orderCompleteList!: any[];

  compBtn!: BitmapData;
  compIcon!: BitmapData;
  progressBtn!: BitmapData;
  progressIcon!: BitmapData;

  showOnprogress: boolean = true;

  constructor() { 
    super();
    this.textureUrl = "assets/older_list/older_list.json";
  }

  initUI() {
    Loading.status = 1;

    this.backBtn = this.textureData.getTexture( "btn_return", 30, 45 );
    this.title = this.textureData.getTexture( "My orders", 240, 50 );
    this.shocked = this.textureData.getTexture( "shocked", 300, 700 );

    this.progressBtn = this.textureData.getTexture( "prograss1", 95, 217 );
    this.progressIcon = this.textureData.getTexture( "prograss", 95, 219 );
    this.compBtn = this.textureData.getTexture( "completed1", 390, 217 );
    this.compIcon = this.textureData.getTexture( "completed", 390, 220 );
    new GameHttp().loadData( "cmd.php?action=shop&" + GM.interfaceString, this.getRecordList.bind(this), "POST", "type=get_order_list" );

    this.styles.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

  getRecordList( data: any ){
    console.log( data );
    Loading.status = 2;
    this.orderProgressList = data.list;
    this.orderCompleteList = data.list;
  }

  changeList(){
    this.showOnprogress = !this.showOnprogress;
  }
}
