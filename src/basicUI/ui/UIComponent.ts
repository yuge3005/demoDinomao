/*
* @Description:
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-27 13:34:15
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 10:40:51
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpRequest } from '../net/http-request';
import { TextureData } from '../img/texture-data';
import { LoadedUITextureDatas } from '../settings/LoadedUITextureDatas';

@Component({
  template: ''
})
export class UIComponent implements OnInit, OnDestroy{

  textureData!: TextureData;
  textureJson: any;
  textureUrl: string = "";

  constructor() { }

  ngOnInit() {
    if( LoadedUITextureDatas.loadTexture[this.textureUrl] ){
      this.textureJson = LoadedUITextureDatas.loadTexture[this.textureUrl];
      this.afterGetTexture();
    }
    else{
      new HttpRequest().loadData( this.textureUrl, this.getTexture.bind( this ), "GET", "" );
    }
  }

  getTexture( data: any ){
    LoadedUITextureDatas.loadTexture[this.textureUrl] = this.textureJson = data;
    this.afterGetTexture();
  }

  afterGetTexture(){
    this.textureData = new TextureData();
    this.textureData.setFile( this.textureUrl.substr( 0, this.textureUrl.lastIndexOf( "/" ) + 1 ) + this.textureJson.file, this.textureJson.frames );

    this.initUI();
  }

  initUI(){
  }

  ngOnDestroy(): void {
  }
}
