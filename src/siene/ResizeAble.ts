import { Component, OnInit } from '@angular/core';

@Component({
  template: ''
})
export class ResizeAble implements OnInit {

  public matrix: string = '';

  private wSet: number = 750;
  public hSet: number = 1625;

  private mobile!: RegExpMatchArray | null;
  private scale: number = 0;

  public static scale: number;

  constructor() { }

  ngOnInit(){
    window.addEventListener( "resize", this.onResize.bind(this) );
    this.onResize( null );
  }

  onResize( event: Event | null ){
    this.matrix = this.getMatrix( true, true );
  }

  isMobile(): boolean {
    if( this.mobile === undefined ){
      this.mobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    }
    return this.mobile != null;
  }

  getMatrix( withHeight: boolean = false, withMargin: boolean = false ): string{
    let matrix: string;
    if( this.isMobile() ){
      var landscape = document.documentElement.clientWidth > document.documentElement.clientHeight;
      if( landscape ){
        this.scale = document.documentElement.clientHeight / this.wSet;
        this.hSet = document.documentElement.clientWidth / this.scale;
        matrix = "matrix(0,-"+this.scale+","+this.scale+",0,0,0)";
      }
      else{
        this.scale = document.documentElement.clientWidth / this.wSet;
        this.hSet = document.documentElement.clientHeight / this.scale;
        matrix = "matrix("+this.scale+",0,0,"+this.scale+",0,0)";
      }
    }
    else{
      this.scale = Math.min( document.documentElement.clientWidth / this.wSet, document.documentElement.clientHeight / this.hSet );
      matrix = "matrix("+this.scale+",0,0,"+this.scale+",0,0)";
    }

    ResizeAble.scale = this.scale;
    return "transform: " + matrix + ";" + ( withHeight ? "height: " + this.hSet + "px;" : "" ) + ( withMargin ? "margin-top: " + (- 0.5 * this.hSet) + "px" : "" );
  }
}
