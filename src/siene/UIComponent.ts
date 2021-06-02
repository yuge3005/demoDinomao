import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TextureData } from '../basicUI/image/texture-data';

@Component({
  template: ''
})
export class UIComponent implements OnInit {

  textureData!: TextureData;
  textureJson: any;
  textureUrl: string = "";
  http: HttpClient;

  constructor( http: HttpClient ) {
    this.http = http;
  }

  async ngOnInit() {
    this.textureJson = await this.http.get(this.textureUrl).toPromise();
    console.log(this.textureUrl);
    console.log('initData 执行完成');

    this.textureData = new TextureData();
    this.textureData.setFile( this.textureUrl.substr( 0, this.textureUrl.lastIndexOf( "/" ) + 1 ) + this.textureJson.file, this.textureJson.frames );

    this.initUI();
  }

  initUI(){
  }
}
