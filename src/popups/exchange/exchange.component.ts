/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-11 10:38:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-11 10:48:21
 */
import { Component } from '@angular/core';
import { BitmapData } from '../../basicUI/basic-ui.module';
import { GenericModalComponent, Trigger, TextData } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent  extends GenericModalComponent{

  okBtn!: BitmapData;

  tipText!: TextData;
  tipString: string = "";

  constructor() {
    super();
  }

  initUI(){
    super.setPopupBg( "bg_exchange" );

    this.okBtn = this.textureData.getTexture( "btn_okay", 36, 660 );
    this.closeBtn = this.textureData.getTexture( "btn_cancel", 328, 660 );

    // this.tipText = this.textureJson.tipText;
    // this.tipString = "Do you want to log out?";
  }

  exchangeToTicket(){
    
  }
}
