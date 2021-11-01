/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-29 14:49:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-01 10:35:59
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, HttpRequest, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent extends MainPage {

  backBtn!: BitmapData;
  title!: BitmapData;

  coinIcon!: BitmapData;
  ticketBtn!: BitmapData;
  coinBtn!: BitmapData;
  ticketIcon!: BitmapData;

  private _showCoinList: boolean = true;
  get showCoinList(){
    return this._showCoinList;
  }
  
  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/ledger/ledger.json";
  }

  initUI() {
    Loading.status = 2;

    this.backBtn = this.textureData.getTexture( "btn_return", 30, 120 );
    this.title = this.textureData.getTexture( "ledger", 290, 135 );

    this.coinIcon = this.textureData.getTexture( "COINS RECORD1", 97, 199 );
    this.ticketBtn = this.textureData.getTexture( "TICKETS RECORD1", 389, 196 );
    this.coinBtn = this.textureData.getTexture( "COINS RECORD", 99, 196 );
    this.ticketIcon = this.textureData.getTexture( "TICKETS RECORD", 383, 198 );

    let ob = "type=coins"
    new HttpRequest().loadData( "cmd.php?action=get_bill" + GM.interfaceString + "&pageno=1&pagesize=20", this.getRecordList.bind(this), "POST", ob );
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

  switchList( listType: number ){
    this._showCoinList = listType == 1;
  }

  getRecordList( data: any ){
    console.log( data );
  }
}
