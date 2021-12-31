/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-29 14:49:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-31 15:32:55
 */
import { Component } from '@angular/core';
import { BitmapData, StyleX } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, GameHttp, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent extends MainPage {

  backBtn!: BitmapData;

  coinIcon!: BitmapData;
  ticketBtn!: BitmapData;
  coinBtn!: BitmapData;
  ticketIcon!: BitmapData;

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

    this.backBtn = this.textureData.getTexture( "btn_return", 30, 120 );

    this.coinIcon = this.textureData.getTexture( "COINS RECORD1", 97, 199 );
    this.ticketBtn = this.textureData.getTexture( "TICKETS RECORD1", 389, 196 );
    this.coinBtn = this.textureData.getTexture( "COINS RECORD", 99, 196 );
    this.ticketIcon = this.textureData.getTexture( "TICKETS RECORD", 383, 198 );

    let ob = "type=coins";
    new GameHttp().loadData( "cmd.php?action=get_bill" + GM.interfaceString + "&pageno=1&pagesize=80", this.getRecordList.bind(this), "POST", ob );

    this.styles.stretchingBg = StyleX.stretchingBg( "assets/bank/bank_bg.jpg" );
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
