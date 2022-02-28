import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { TextureData } from '../img/texture-data';

/**
 * @class UIFromParent
 * @implements {OnInit}
 * @implements {OnChanges}
 * @implements {OnDestroy}
 * @description: Abstract component, must be extends.The parent of any instance of this class, have to be an instance of "UIComponent". and it has to be an input property "textureData" that comes from parent.
 * @抽象组件，必须继承。本类组件实例的父级容器，必须是一个"UIComponent"的组件实例;并且,本类有一个属性"textureData"，必须从父级容器传入。
 * @ In most cases, don't override "ngOnInit" and "ngOnChanges", just initailize the UI items in method "initUI".
 * @ 不要覆盖ngOnInit,ngOnChanges方法，可以在"initUI"中初始化组件UI
 */
@Component({
  template: ''
})
export class UIFromParent implements OnChanges, OnDestroy{

  /**
   * @type {TextureData}
   * @memberof UIFromParent
   * @description: Material texture object
   * @ 素材纹理对象
   */
  @Input()textureData!: TextureData;
  private inited: boolean = false;

  /**
   * @type {*}
   * @memberof UIFromParent
   * @description: It is used to assign a value to the [ngstyle] instruction and define the CSS style of the object
   * @ 用于给[ngStyle]指令赋值，定义物体的css样式
   */
  styles: any = {};

  /**
   * @type {*}
   * @memberof UIFromParent
   * @description: Display Objects according to assets
   * @ 根据素材图片，显示的物体
   */
  uiObjects: any = {};

  constructor() {}

  protected subUIinit(){
    if( !this.textureData ) return;
    this.initUI();
    this.inited = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.textureData && !this.inited ) this.subUIinit();
  }

  /**
   * @protected
   * @memberof UIFromParent
   * @description: Initialize the component UI, and the subclass needs to override
   * @ 初始化组件UI,子类需覆盖
   */
  protected initUI(){
  }

  ngOnDestroy(){
  }
}
