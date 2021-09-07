import { Application } from './../../basicUI/settings/Application';
import { Trigger } from 'src/service/dinomao-game.module';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-07 16:38:38
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-07 16:58:07
*/
import { BitmapData } from './../../basicUI/image/bitmap-data';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericModalComponent } from './../../service/ui/generic-modal.component';

@Component({
  selector: 'app-force-update',
  templateUrl: './force-update.component.html',
  styleUrls: ['./force-update.component.css']
})
export class ForceUpdateComponent extends GenericModalComponent {

  title!: BitmapData;
  updateBtn!: BitmapData;

  constructor(public http: HttpClient) {
    super( http );
  }

  initUI(){
    super.setPopupBg( "bg" );

    this.title = this.textureData.getTexture( "version", 123, 195 );
    this.updateBtn = this.textureData.getTexture( "btn_update", 200, 767 );
  }

  update(){
    let products: any = Trigger.popupData.products;
    let product: any = products[0]
    let url: string = product.url;
    if( Application.system.isIOS ){
      eval( "window.webkit.messageHandlers.iosTrace.postMessage(url)" )
    }
    else{
      window.location.href = url;
    }
  }
}
