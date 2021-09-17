/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-07 16:38:38
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-16 18:00:50
*/
import { BitmapData, Application } from '../../basicUI/basic-ui.module';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericModalComponent, Trigger, Loading } from '../../service/dinomao-game.module';

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
      eval( "window.webkit.messageHandlers.appUpdate.postMessage(url)" )
    }
    else{
      window.location.href = url;
    }
    Loading.status = 1
  }
}
