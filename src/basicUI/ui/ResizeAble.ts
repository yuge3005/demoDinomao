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
    Application.settings.appWidth = 750;
    Application.settings.appHeight = 1625;
    this.onResize( null );
  }

  onResize( event: Event | null ){
    this.matrix = this.getMatrix( true, true );
  }

  getMatrix( withHeight: boolean = false, withMargin: boolean = false ): string{
    let matrix: string;
    if( Application.system.isMobile() ){
      var landscape = document.documentElement.clientWidth > document.documentElement.clientHeight;
      if( landscape ){
        Application.settings.scale = document.documentElement.clientHeight / Application.settings.appWidth;
        this.hSet = document.documentElement.clientWidth / Application.settings.scale;
        matrix = "matrix(0,-"+Application.settings.scale+","+Application.settings.scale+",0,0,0)";
      }
      else{
        Application.settings.scale = document.documentElement.clientWidth /Application.settings.appWidth;
        this.hSet = document.documentElement.clientHeight / Application.settings.scale;
        matrix = "matrix("+Application.settings.scale+",0,0,"+Application.settings.scale+",0,0)";
      }
    }
    else{
      Application.settings.scale = Math.min( document.documentElement.clientWidth / Application.settings.appWidth, document.documentElement.clientHeight / Application.settings.appHeight );
      this.hSet = Application.settings.appHeight;
      matrix = "matrix("+Application.settings.scale+",0,0,"+Application.settings.scale+",0,0)";
    }

    return "transform: " + matrix + ";" + ( withHeight ? "height: " + this.hSet + "px;" : "" ) + ( withMargin ? "margin-top: " + (- 0.5 * this.hSet) + "px" : "" );
  }
}
