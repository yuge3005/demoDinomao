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
 * @LastEditTime: 2021-07-16 13:40:58
*/
import { Component, OnInit, ViewChild, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { PopupDirective } from './popup-directive.directive';

@Component({
  selector: 'app-popup-layer',
  templateUrl: './popup-layer.component.html',
  styleUrls: ['./popup-layer.component.css']
})
export class PopupLayerComponent implements OnInit {
  
  private waitingModals: any[] = [];

  @ViewChild (PopupDirective, { static: true }) appPages!: PopupDirective;

  componentRef!: ComponentRef<GenericModalComponent>;
  
  constructor( private componentFactoryResolver: ComponentFactoryResolver ) { }

  ngOnInit() {
    Trigger.addPopupFunc = this.addPopup.bind(this)
    Trigger.loadedPopupFunc = this.popupLoaded.bind(this)
    Trigger.closePopupFunc = this.popupClose.bind(this)
  }

  addPopup( popupVo: any ){
    trace.log( popupVo )
    this.waitingModals.push( popupVo );
    this.showFirstWaitingModal();
  }

  showFirstWaitingModal(){
    if( !this.waitingModals.length ) return;

    let popupData: any = this.waitingModals.shift();
    Trigger.popupPackagePath = popupData.url;
    Trigger.hasPopup = true;
    Trigger.laoded = false;

    const viewContainerRef = this.appPages.viewContainerRef;
    viewContainerRef.clear();
    
    let componentFactory: any = this.componentFactoryResolver.resolveComponentFactory( VipPassComponent );
    this.componentRef = viewContainerRef.createComponent<GenericModalComponent>( componentFactory );
    Trigger.currentPopup = this.componentRef.instance;
  }

  popupLoaded(){
    let popupLayer: any = document.getElementById( "popupLayer" );
    popupLayer.className = "popupLayerZoomout";
    Trigger.laoded = true;
  }

  popupClose(){
    let popupLayer: any = document.getElementById( "popupLayer" );
    popupLayer.className = "popupLayerZoomin";

    setTimeout(() => {
      // let componentFactory: any = this.componentFactoryResolver.resolveComponentFactory( GenericPoComponent );
      const viewContainerRef = this.appPages.viewContainerRef;
      viewContainerRef.clear();
      Trigger.popupClosed();
    }, 400);
  }
}
