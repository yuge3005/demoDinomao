/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-27 16:16:41
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-27 16:28:53
 */
import { Component } from '@angular/core';
import { Trigger, GenericModalComponent } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-video-error',
  templateUrl: './video-error.component.html',
  styleUrls: ['./video-error.component.css']
})
export class VideoErrorComponent extends GenericModalComponent{
  
  tipString: string = "";

  constructor() { 
    super();
  }

  initUI(){
    super.setPopupBg( "bg_video" );

    this.closeBtn = this.textureData.getTexture( "btn_okay", 174, 640 );

    let products: any = Trigger.popupData.products;
    let product: any = products[0];

    this.tipString = product.errorStr;
  }
}
