/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-27 13:34:15
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-13 16:27:57
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TextureData } from '../image/texture-data';

@Component({
  template: ''
})
export class UIComponent implements OnInit {

  textureData!: TextureData;
  textureJson: any;
  textureUrl: string = "";

  constructor( protected http: HttpClient ) { }

  async ngOnInit() {
    this.textureJson = await this.http.get(this.textureUrl).toPromise();

    this.textureData = new TextureData();
    this.textureData.setFile( this.textureUrl.substr( 0, this.textureUrl.lastIndexOf( "/" ) + 1 ) + this.textureJson.file, this.textureJson.frames );

    this.initUI();
  }

  initUI(){
  }
}
