import { GenericPopupComponent } from './../generic-popup/generic-popup.component';
import { PopupVo } from './../../../service/gameData/popup-vo';
import { VipPassComponent } from './../../../popups/vip-pass/vip-pass.component';
import { Trigger } from './../../../service/gameUILogic/Trigger';
import { GenericPoComponent } from './../generic-po/generic-po.component';
import { trace } from './../../../service/gameUILogic/trace';
import { GenericModalComponent } from './generic-modal.component';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-14 11:16:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-21 15:52:11
*/
import { Component, OnInit, ViewChild, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { PopupDirective } from './popup-directive.directive';

@Component({
  selector: 'app-popup-layer',
  templateUrl: './popup-layer.component.html',
  styleUrls: ['./popup-layer.component.css']
})
export class PopupLayerComponent implements OnInit {

  @ViewChild (PopupDirective, { static: true }) appPages!: PopupDirective;

  componentRef!: ComponentRef<GenericModalComponent>;
  
  constructor( private componentFactoryResolver: ComponentFactoryResolver ) { }

  ngOnInit() {
    Trigger.addPopupFunc = this.addPopup.bind(this)
    Trigger.loadedPopupFunc = this.popupLoaded.bind(this)
    Trigger.closePopupFunc = this.popupClose.bind(this)
  }

  addPopup( popupVo: PopupVo ): GenericModalComponent{
    Trigger.popupPackagePath = popupVo.art;

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
    let popupLayer: any = document.getElementById( "popupLayer" );
    popupLayer.className = "popupLayerZoomout";
  }

  popupClose(){
    let popupLayer: any = document.getElementById( "popupLayer" );
    popupLayer.className = "popupLayerZoomin";

    setTimeout(() => {
      const viewContainerRef = this.appPages.viewContainerRef;
      viewContainerRef.clear();
      Trigger.popupClosed();
    }, 400);
  }
}
