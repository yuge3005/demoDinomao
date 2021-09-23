/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-22 17:57:16
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-23 11:02:25
*/
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BitmapData } from '../../basicUI/basic-ui.module';
import { GenericModalComponent } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-purchase-success',
  templateUrl: './purchase-success.component.html',
  styleUrls: ['./purchase-success.component.css']
})
export class PurchaseSuccessComponent extends GenericModalComponent{

  light!: BitmapData;

  constructor(public http: HttpClient) {
    super( http );
  }

  initUI(){
    super.setPopupBg( "bg" );

    this.light = this.textureData.getTexture( "quan", 570 - 707 >> 1, 364 - 700 >> 1 );
  }

}
