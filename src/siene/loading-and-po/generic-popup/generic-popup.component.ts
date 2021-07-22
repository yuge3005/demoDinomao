import { BitmapData } from './../../../basicUI/image/bitmap-data';
import { ModalCommands } from './../../../service/gameUILogic/ModalCommands';
import { HttpClient } from '@angular/common/http';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-21 15:51:57
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-22 14:21:27
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

    if( this.textureJson.title ) this.titleBg = this.buildUI( this.textureJson.title );

    if( this.textureJson.confirm )this.confirmBtn = this.buildUI( this.textureJson.confirm );
    this.closeBtn = this.buildUI( this.textureJson.closeBtn );
  }

  ngOnDestroy(): void {
    
  }

  confirmPo(){
    Trigger.modalCommand( ModalCommands.POPUP_CONFIRM );
  }
}
