import { UIData } from './../../../service/gameData/UIData';
import { BitmapData } from './../../../basicUI/image/bitmap-data';
import { Trigger } from './../../../service/gameUILogic/Trigger';
import { HttpClient } from '@angular/common/http';
import { UIComponent } from './../../../basicUI/ui/UIComponent';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 14:54:26
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-16 13:20:43
 */
import { Component } from '@angular/core';

@Component({
  template: ''
})
export class GenericModalComponent extends UIComponent{

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
}
