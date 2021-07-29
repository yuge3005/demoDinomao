import { GenericPopupComponent } from './../generic-popup/generic-popup.component';
import { PopupVo, Trigger } from './../../../service/dinomao-game.module';
import { VipPassComponent } from './../../../popups/vip-pass/vip-pass.component';
import { GenericPoComponent } from './../generic-po/generic-po.component';
import { GenericModalComponent } from './generic-modal.component';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-14 11:16:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-29 17:05:53
*/
import { Component, OnInit, ViewChild, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { PopupDirective } from './popup-directive.directive';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-popup-layer',
  templateUrl: './popup-layer.component.html',
  styleUrls: ['./popup-layer.component.css'],
  animations: [
    trigger('carousel',[
      state('in', style({transform:'scale(0.01)'})),
      state('out', style({transform:'scale(1)'})),
      transition('in => out', [animate('0.35s ease-out')]),
      transition('out => in', [animate('0.35s ease-out')])
    ])
  ]
})
export class PopupLayerComponent implements OnInit {

  @ViewChild (PopupDirective, { static: true }) appPages!: PopupDirective;

  componentRef!: ComponentRef<GenericModalComponent>;
  carouselState: string = "in";
  
  constructor( private componentFactoryResolver: ComponentFactoryResolver ) { }

  ngOnInit() {
    Trigger.addPopupFunc = this.addPopup.bind(this)
    Trigger.loadedPopupFunc = this.popupLoaded.bind(this)
    Trigger.closePopupFunc = this.popupClose.bind(this)
  }

  addPopup( popupVo: PopupVo ): GenericModalComponent{
    Trigger.popupData = popupVo;

    const viewContainerRef = this.appPages.viewContainerRef;
    viewContainerRef.clear();
    
    let componentFactory: any;
    switch( popupVo.type ){
      case "po":
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( GenericPoComponent );
        break;
      case "popup":
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( GenericPopupComponent );
        break;
      case "subscription":
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( VipPassComponent );
        break;
    }
    this.componentRef = viewContainerRef.createComponent<GenericModalComponent>( componentFactory );
    return this.componentRef.instance;
  }

  popupLoaded(){
    this.carouselState = "out";
  }

  popupClose(){
    this.carouselState = "in";

    setTimeout(() => {
      const viewContainerRef = this.appPages.viewContainerRef;
      viewContainerRef.clear();
      Trigger.popupClosed();
    }, 360);
  }
}
