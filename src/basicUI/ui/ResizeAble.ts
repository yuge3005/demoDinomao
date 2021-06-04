/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-03 11:15:15
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-04 09:31:11
 */
import { Component, OnInit } from '@angular/core';
import { Application } from '../settings/Application';

@Component({
  template: ''
})
export class ResizeAble implements OnInit {

  public matrix: string = '';

  public hSet: number = 1625;
  constructor() { }

  ngOnInit(){
    window.addEventListener( "resize", this.onResize.bind(this) );
    this.onResize( null );
  }

  onResize( event: Event | null ){
    this.matrix = this.getMatrix( true, true );
  }

  getMatrix( withHeight: boolean = false, withMargin: boolean = false ): string{
    let matrix: string;
    Application.settings.resize();
    if( Application.system.isMobile() ){
      var landscape = document.documentElement.clientWidth > document.documentElement.clientHeight;
      if( landscape ){
        matrix = "matrix(0,-"+Application.settings.scale+","+Application.settings.scale+",0,0,0)";
      }
      else{
        matrix = "matrix("+Application.settings.scale+",0,0,"+Application.settings.scale+",0,0)";
      }
    }
    else{
      matrix = "matrix("+Application.settings.scale+",0,0,"+Application.settings.scale+",0,0)";
    }

    this.hSet = Application.settings.stageHeight;
    return "transform: " + matrix + ";" + ( withHeight ? "height: " + this.hSet + "px;" : "" ) + ( withMargin ? "margin-top: " + (- 0.5 * this.hSet) + "px" : "" );
  }
}
