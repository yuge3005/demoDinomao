import { UIData } from '../../../service/gameData/UIData';
import { BitmapData } from '../../../basicUI/image/bitmap-data';
import { Trigger } from '../../../service/gameUILogic/Trigger';
import { HttpClient } from '@angular/common/http';
import { UIComponent } from '../../../basicUI/ui/UIComponent';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 14:54:26
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-23 10:45:23
 */
import { Component } from '@angular/core';

@Component({
  template: ''
})
export class GenericModalComponent extends UIComponent{

  marginTop: number = 0;
  marginLeft: number = 0;

  popupBg!: BitmapData;
  textureDetactive: string = "";

  private _loaded: boolean = false;
  public set loaded( value: boolean ){
    if( !this._loaded && value )Trigger.popupLoad();
    this._loaded = value;
  }
  public get loaded(): boolean{
    return this._loaded;
  }

  closeBtn!: BitmapData;

  constructor( public http: HttpClient ) {
    super(http);
  }

  closePo(){
    Trigger.closePopup();
  }
  
  buildUI( uiData: UIData ): BitmapData{
    if( !uiData ) alert( "ui data missing" );
    return this.textureData.getTexture( uiData.name, uiData.x, uiData.y );
  }

  setPopupBg( bgAssetsName: string ){
    this.popupBg = this.textureData.getTexture( bgAssetsName );
    this.marginLeft = Math.floor( this.popupBg.w * 0.5 );
    this.marginTop = Math.floor( this.popupBg.h * 0.5 );

    this.textureDetactive = this.popupBg.url;
  }

  bgTextureLoaded(){
    this.loaded = true;
  }
}
