import { trace } from './../../service/gameUILogic/trace';
import { HttpParams } from '@angular/common/http';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-27 13:34:15
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-23 10:09:37
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TextureData } from '../image/texture-data';

@Component({
  template: ''
})
export class UIComponent implements OnInit, OnDestroy{

  textureData!: TextureData;
  textureJson: any;
  textureUrl: string = "";

  xhr!: XMLHttpRequest;

  constructor( protected http: HttpClient ) { }

  ngOnInit() {
    // let param: any = new HttpParams().set( "Accept", "*/*" );
    // this.textureJson = await this.http.get(this.textureUrl, param).toPromise();

    // this.textureData = new TextureData();
    // this.textureData.setFile( this.textureUrl.substr( 0, this.textureUrl.lastIndexOf( "/" ) + 1 ) + this.textureJson.file, this.textureJson.frames );

    // this.initUI();

    this.xhr = new XMLHttpRequest();
    this.xhr.open("GET", this.textureUrl, true);
    this.xhr.addEventListener("load", this.assetsLoaded.bind( this ) );
    this.xhr.setRequestHeader("Accept", "*/*");
    this.xhr.send();
  }

  assetsLoaded( ev: ProgressEvent<XMLHttpRequestEventTarget> ){
    this.xhr.removeEventListener("load", this.assetsLoaded.bind( this ) );
    let str: string = this.xhr.response;
    try{
      this.textureJson = JSON.parse( str )
      this.textureData = new TextureData();
      this.textureData.setFile( this.textureUrl.substr( 0, this.textureUrl.lastIndexOf( "/" ) + 1 ) + this.textureJson.file, this.textureJson.frames );
      this.initUI();
    }
    catch(e){
      trace.log( "popup assets missing" );
    }
  }

  initUI(){
  }

  ngOnDestroy(): void {
  }
}
