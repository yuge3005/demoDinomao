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
 * @LastEditTime: 2021-07-14 17:31:24
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
    // this.coinsBg1 = this.textureData.getTexture( "btn_coins_bg", 155, 20 );
    // this.coinsBg2 = this.textureData.getTexture( "btn_coins_bg", 415, 20 );

    this.loaded = true;
  }

  ngOnDestroy(): void {
    
  }
}
