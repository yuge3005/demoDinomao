/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-27 13:34:15
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-22 16:03:57
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TextureData } from '../image/texture-data';
import { LoadedUITextureDatas } from '../settings/LoadedUITextureDatas';

@Component({
  template: ''
})
export class UIComponent implements OnInit, OnDestroy{

  textureData!: TextureData;
  textureJson: any;
  textureUrl: string = "";

  constructor( protected http: HttpClient ) { }

  async ngOnInit() {
    if( LoadedUITextureDatas.loadTexture[this.textureUrl] ) this.textureJson = LoadedUITextureDatas.loadTexture[this.textureUrl];
    else{ 
      this.textureJson = await this.http.get(this.textureUrl).toPromise();
      LoadedUITextureDatas.loadTexture[this.textureUrl] = this.textureJson;
    }

    this.textureData = new TextureData();
    this.textureData.setFile( this.textureUrl.substr( 0, this.textureUrl.lastIndexOf( "/" ) + 1 ) + this.textureJson.file, this.textureJson.frames );

    this.initUI();
  }

  initUI(){
  }

  ngOnDestroy(): void {
  }
}
