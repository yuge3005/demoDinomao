import { BitmapData } from './../../../basicUI/image/bitmap-data';
import { Trigger } from './../../../service/gameUILogic/Trigger';
import { GenericModalComponent } from './../generic-modal/generic-modal.component';
import { trace } from './../../../service/gameUILogic/trace';
import { HttpClient } from '@angular/common/http';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 10:45:10
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-15 11:59:51
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-generic-po',
  templateUrl: './generic-po.component.html',
  styleUrls: ['./generic-po.component.css']
})
export class GenericPoComponent extends GenericModalComponent{

  marginTop: number = 0;
  marginLeft: number = 0;
  
  poBg!: BitmapData;
  prizeBg!: BitmapData;
  coinItem!: BitmapData;
  buyBtn!: BitmapData;
  closeBtn!: BitmapData;

  constructor(public http: HttpClient) {
    super( http );

    let packagePath: string = Trigger.popupPackagePath;
    let fileName: string = packagePath.substr( 0, packagePath.length - 1 );
    let lastDash: number = fileName.lastIndexOf( "/" );
    fileName = fileName.substr( lastDash + 1 );
    this.textureUrl = packagePath + fileName + ".json";
  }

  initUI(){
    trace.log( this.textureJson );

    this.poBg = this.textureData.getTexture( "bg" );
    this.marginLeft = Math.floor( this.poBg.w * 0.5 );
    this.marginTop = Math.floor( this.poBg.h * 0.5 );

    this.prizeBg = this.textureData.getTexture( "bg_prize", 140, 447 );
    this.coinItem = this.textureData.getTexture( "icon_coin", 268, 882 );

    this.buyBtn = this.textureData.getTexture( "btn_Price", 180, 1000 );
    this.closeBtn = this.textureData.getTexture( "btn_close", 623, 210 );

    this.loaded = true;
  }

  ngOnDestroy(): void {
    
  }

  buyPo(){
    
  }

  closePo(){
    
  }
}
