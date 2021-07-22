import { BitmapData } from './../../../basicUI/image/bitmap-data';
import { ModalCommands } from './../../../service/gameUILogic/ModalCommands';
import { HttpClient } from '@angular/common/http';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-21 15:51:57
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-22 11:58:10
 */
import { Component, OnInit } from '@angular/core';
import { Trigger } from 'src/service/gameUILogic/Trigger';
import { GenericModalComponent } from '../popup-layer/generic-modal.component';

@Component({
  selector: 'app-generic-popup',
  templateUrl: './generic-popup.component.html',
  styleUrls: ['./generic-popup.component.css']
})
export class GenericPopupComponent extends GenericModalComponent {

  titleBg!: BitmapData;
  confirmBtn!: BitmapData;

  constructor(public http: HttpClient) {
    super( http );

    this.textureUrl = Trigger.popupPackagePath;
  }

  initUI(){
    super.setPopupBg( "bg" );

    /*if( this.textureJson.title ) this.prizeBg = this.buildUI( this.textureJson.title );
    if( this.textureJson.coinIcon ) this.coinItem = this.buildUI( this.textureJson.coinIcon );

    this.buyBtn = this.buildUI( this.textureJson.buyBtn );
    this.closeBtn = this.buildUI( this.textureJson.closeBtn );

    // let product: any = Trigger.popupData.product;

    this.priceText = this.textureJson.price;
    this.priceNumberText = "$3.99"// + product["price"];//Number(product["items"][0].after_discount_coins);

    this.coinText = this.textureJson.coins;
    this.coinNumberText = "180"// + product["price"];//Number(product["items"][0].after_discount_coins);*/
  }

  ngOnDestroy(): void {
    
  }

  confirmPo(){
    Trigger.modalCommand( ModalCommands.POPUP_CONFIRM );
  }
}
