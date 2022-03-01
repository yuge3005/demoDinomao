/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-29 14:49:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 12:17:13
 */
import { Component } from '@angular/core';
import { StyleX } from 'resize-able-ui';
import { MainPage, Trigger, WebPages, Loading, GameHttp, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html'
})
export class LedgerComponent extends MainPage {

  private _showCoinList: boolean = true;
  get showCoinList(){
    return this._showCoinList;
  }

  coinsChangeList: any[] = [];
  ticketChangeList: any[] = [];
  
  constructor() {
    super();
    this.textureUrl = "assets/ledger/ledger.json";
  }

  initUI() {
    Loading.status = 1;

    this.ui.backBtn = this.textureData.getTexture( "btn_return", 30, 120 );

    this.ui.coinIcon = this.textureData.getTexture( "COINS RECORD1", 97, 199 );
    this.ui.ticketBtn = this.textureData.getTexture( "TICKETS RECORD1", 389, 196 );
    this.ui.coinBtn = this.textureData.getTexture( "COINS RECORD", 99, 196 );
    this.ui.ticketIcon = this.textureData.getTexture( "TICKETS RECORD", 383, 198 );

    let ob = "type=coins";
    new GameHttp().loadData( "cmd.php?action=get_bill" + GM.interfaceString + "&pageno=1&pagesize=80", this.getRecordList.bind(this), "POST", ob );

    this.styles.stretchingBg = StyleX.stretchingBg( "assets/bank/bank_bg.jpg" );
    this.styles.ledgerList = StyleX.combine( StyleX.borderRadius(28), StyleX.setItemPosition(10,265), StyleX.backgroundColor(0xFFD33F), StyleX.border(3,0xAD8321), StyleX.setSize(730,0,true,false) );
    this.styles.scrollBar = StyleX.combine( StyleX.scrollBar(), StyleX.setItemPosition(20,275), StyleX.setSize(720,0,true,false) );
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

  switchList( listType: number ){
    this._showCoinList = listType == 1;
  }

  getRecordList( data: any ){
    if( data && data.list )this.coinsChangeList = data.list;
    Loading.status = 2;

    let ob = "type=tickets";
    new GameHttp().loadData( "cmd.php?action=get_bill" + GM.interfaceString + "&pageno=1&pagesize=80", this.getTicketList.bind(this), "POST", ob );
  }

  getTicketList( data: any ){
    if( data && data.list )this.ticketChangeList = data.list;
  }
}
