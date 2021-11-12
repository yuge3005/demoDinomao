import { BitmapData } from 'resize-able-ui/lib/basic-ui.module';
import { GenericModalComponent, ModalCommands, Trigger } from '../../service/dinomao-game.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-21 15:51:57
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 10:37:05
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-generic-popup',
  templateUrl: './generic-popup.component.html'
})
export class GenericPopupComponent extends GenericModalComponent {

  titleBg!: BitmapData;
  confirmBtn!: BitmapData;

  constructor() {
    super();
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
