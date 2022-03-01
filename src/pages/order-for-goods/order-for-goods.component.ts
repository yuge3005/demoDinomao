/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-09 11:41:22
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:28:06
 */
import { Component } from '@angular/core';
import { BitmapData, StyleX } from '../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, GameHttp, GM, trace } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-order-for-goods',
  templateUrl: './order-for-goods.component.html',
  styleUrls: ['./order-for-goods.component.css']
})
export class OrderForGoodsComponent extends MainPage {

  orderProgressList!: any[];
  orderCompleteList!: any[];

  showOnprogress: boolean = true;

  constructor() { 
    super();
    this.textureUrl = "assets/older_list/older_list.json";
  }

  initUI() {
    Loading.status = 1;

    this.ui.backBtn = this.textureData.getTexture( "btn_return", 30, 45 );
    this.ui.title = this.textureData.getTexture( "My orders", 240, 50 );
    this.ui.shocked = this.textureData.getTexture( "shocked", 300, 700 );

    this.ui.progressBtn = this.textureData.getTexture( "prograss1", 95, 217 );
    this.ui.progressIcon = this.textureData.getTexture( "prograss", 95, 219 );
    this.ui.compBtn = this.textureData.getTexture( "completed1", 390, 217 );
    this.ui.compIcon = this.textureData.getTexture( "completed", 390, 220 );
    new GameHttp().loadData( "cmd.php?action=shop&" + GM.interfaceString, this.getRecordList.bind(this), "POST", "type=get_order_list" );

    this.styles.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
    this.styles.orderListContainer = StyleX.combine( StyleX.borderRadius(18), StyleX.setItemPosition(10,286), StyleX.backgroundColor(0xfdd53f) );
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

  getRecordList( data: any ){
    trace.log( data );
    Loading.status = 2;
    this.orderProgressList = data.list;
    this.orderCompleteList = data.list;
  }

  changeList(){
    this.showOnprogress = !this.showOnprogress;
  }
}
