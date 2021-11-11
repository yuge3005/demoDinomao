/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-11 10:38:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-11 12:02:10
 */
import { Component } from '@angular/core';
import { BitmapData } from '../../basicUI/basic-ui.module';
import { GenericModalComponent, Trigger, TextData } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent extends GenericModalComponent{

  okBtn!: BitmapData;
  ticketIcon!: BitmapData;

  tipText!: TextData;
  tipString: string = "";

  protected confirmCallback: Function | null = null;

  constructor() {
    super();
  }

  initUI(){
    super.setPopupBg( "bg_exchange" );

    this.okBtn = this.textureData.getTexture( "btn_okay", 36, 660 );
    this.closeBtn = this.textureData.getTexture( "btn_cancel", 328, 660 );
    this.ticketIcon = this.textureData.getTexture( "icon_ticket", 400, 490 );

    let products: any = Trigger.popupData.products;
    let product: any = products[0];

    this.tipText = this.textureJson.tipText;
    this.tipString = "prize to " + product.exchange;

    this.confirmCallback = product.callback;
  }

  exchangeToTicket(){
    this.closePo();
    if( this.confirmCallback ) this.confirmCallback();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.confirmCallback = null;
  }
}
