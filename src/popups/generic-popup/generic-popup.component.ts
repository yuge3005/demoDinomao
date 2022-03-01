import { BitmapData } from '../../basicUI/basic-ui.module';
import { GenericModalComponent, ModalCommands, Trigger } from '../../service/dinomao-game.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-21 15:51:57
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:21:51
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-generic-popup',
  templateUrl: './generic-popup.component.html'
})
export class GenericPopupComponent extends GenericModalComponent {

  constructor() {
    super();
  }

  initUI(){
    super.setPopupBg( "bg" );

    if( this.textureJson.title ) this.ui.titleBg = this.buildUI( this.textureJson.title );

    if( this.textureJson.confirm )this.ui.confirmBtn = this.buildUI( this.textureJson.confirm );
    this.ui.closeBtn = this.buildUI( this.textureJson.closeBtn );
  }

  ngOnDestroy(): void {
  }

  confirmPo(){
    Trigger.modalCommand( ModalCommands.POPUP_CONFIRM );
  }
}
