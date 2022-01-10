/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-03 17:37:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:35:18
 */
import { Component } from '@angular/core';
import { BitmapData } from 'resize-able-ui';
import { Trigger, GenericModalComponent } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-delete-address',
  templateUrl: './delete-address.component.html',
  styleUrls: ['./delete-address.component.css']
})
export class DeleteAddressComponent extends GenericModalComponent{

  confirmBtn!: BitmapData;
  protected confirmCallback: Function | null = null;

  constructor() { 
    super();
  }

  initUI(){
    super.setPopupBg( "bg_address" );

    this.closeBtn = this.textureData.getTexture( "btn_cancel", 328, 660 );
    this.confirmBtn = this.textureData.getTexture( "btn_okay", 36, 660 );

    let products: any = Trigger.popupData.products;
    let product: any = products[0];
    this.confirmCallback = product.callback;
  }

  confirmPo(){
    this.closePo();
    if( this.confirmCallback ) this.confirmCallback();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.confirmCallback = null;
  }
}
