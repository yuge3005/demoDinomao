import { BitmapData, UIComponent, StyleX } from 'resize-able-ui';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 14:54:26
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-31 16:05:20
 */
import { Component } from '@angular/core';
import { Trigger } from '../gameUILogic/Trigger';
import { UIData } from '../gameData/UIData';

@Component({
  template: ''
})
export class GenericModalComponent extends UIComponent{

  popupBg!: BitmapData;
  textureDetactive: string = "";

  private _loaded: boolean = false;
  public set loaded( value: boolean ){
    if( !this._loaded && value )Trigger.popupManager.popupLoad();
    this._loaded = value;
  }
  public get loaded(): boolean{
    return this._loaded;
  }

  closeBtn!: BitmapData;

  constructor() {
    super();
    this.textureUrl = Trigger.popupData.art;
  }

  closePo(){
    Trigger.popupManager.closePopup();
  }
  
  buildUI( uiData: UIData ): BitmapData{
    if( !uiData ) alert( "ui data missing" );
    return this.textureData.getTexture( uiData.name, uiData.x, uiData.y );
  }

  setPopupBg( bgAssetsName: string ){
    this.popupBg = this.textureData.getTexture( bgAssetsName );
    this.styles.popupOffset = StyleX.anchorOffset( Math.floor( this.popupBg.sourceW * 0.5 ), Math.floor( this.popupBg.sourceH * 0.5 ) );
    this.textureDetactive = this.popupBg.url;
  }

  bgTextureLoaded(){
    this.loaded = true;
  }
}
