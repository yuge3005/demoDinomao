/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-10-22 15:38:38
 * @description: Abstract component, must be extends.This component is used to adapt the size of the screen, which can be accessed through Application.settings.appWidth, and Application.settings.appHeight to set the design size of the application, and through Application.settings.screenMode,Application.settings.scalemode to set the zoom mode and screen rotation mode.
 * @ In the component template, you need to use "[attr. Style] ='matrix'" to adaptive.don't override "ngOnInit" and "ngOnChanges".
 * @ 抽象组件，必须继承。该组件用于自适应屏幕的尺寸，可通过Application.settings.appWidth,和Application.settings.appHeight来设定应用的设计尺寸,并通过Application.settings.screenMode,Application.settings.scaleMode来设置缩放模式和屏幕旋转模式.
 * @ 在组件模板中，需使用"[attr.style]='matrix'"来实现自适应,不要覆盖ngOnInit,ngOnChanges方法。
 * @example in template: "<div [attr.style]='matrix'>"
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Application } from '../settings/Application';

@Component({
  template: ''
})
export class ResizeAble implements OnInit, OnDestroy {

  /**
   * @type {string}
   * @memberof ResizeAble
   * @description: this property is for settiing to [attr.style] and adaptive.
   * @ 此属性用来设置组件模板中的[attr.style],从而或者自适应。
   */
  public matrix: string = '';

  /**
   * @type {number}
   * @memberof ResizeAble
   * @description: app current height after adaptive.
   * @ 当前应用自适应后高度
   */
  public hSet: number = 1625;
  constructor() { }

  ngOnInit(){
    window.addEventListener( "resize", this.onResize.bind(this) );
    this.onResize( null );
  }

  ngOnDestroy(){
    window.removeEventListener( "resize", this.onResize.bind(this) );
  }

  onResize( event: Event | null ){
    if( !Application.settings.enableResize ) return;
    this.matrix = this.getMatrix( true, true );
  }

  getMatrix( withHeight: boolean = false, withMargin: boolean = false ): string{
    let matrix: string;
    Application.settings.resize();
    if( Application.system.isMobile() && Application.settings.rotated ){
      matrix = "matrix(0,"+Application.settings.scaleX+",-"+Application.settings.scaleY+",0,0,0)";
    }
    else{
      matrix = "matrix("+Application.settings.scaleX+",0,0,"+Application.settings.scaleY+",0,0)";
    }

    this.hSet = Application.settings.stageHeight;
    return "transform: " + matrix + ";" + ( withHeight ? "height: " + this.hSet + "px;" : "" ) + ( withMargin ? "margin-top: " + (- 0.5 * this.hSet) + "px" : "" );
  }
}
