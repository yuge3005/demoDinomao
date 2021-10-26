/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-26 13:04:43
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-26 13:08:08
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BitmapData } from '../../basicUI/basic-ui.module';
import { GenericModalComponent, Trigger, WebPages } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-result-failed',
  templateUrl: './result-failed.component.html',
  styleUrls: ['./result-failed.component.css']
})
export class ResultFailedComponent extends GenericModalComponent{

  okBtn!: BitmapData;

  constructor(public http: HttpClient) {
    super( http );
  }

  initUI(){
    super.setPopupBg( "bg_soclose" );

    this.okBtn = this.textureData.getTexture( "btn_retry now", 174, 645 );
    this.closeBtn = this.textureData.getTexture( "btn_leave", 560, 110 );
  }

  retry(){
    this.closePo();
  }
}
