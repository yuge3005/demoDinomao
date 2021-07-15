import { Trigger } from './../../../service/gameUILogic/Trigger';
import { GenericPoComponent } from './../generic-po/generic-po.component';
import { trace } from './../../../service/gameUILogic/trace';
import { GenericModalComponent } from './../generic-modal/generic-modal.component';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-14 11:16:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-15 10:04:48
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

    let componentFactory: any = this.componentFactoryResolver.resolveComponentFactory( GenericPoComponent );
    const viewContainerRef = this.appPages.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent<GenericModalComponent>( componentFactory );
    Trigger.currentPopup = this.componentRef.instance;
  }

  popupLoaded(){
    trace.log( "popupLayer loaded" );
    let popupLayer: any = document.getElementById( "popupLayer" );
    trace.log( popupLayer.className );
    popupLayer.className = "popupLayerZoomout";
  }

  popupClose(){
    
  }
}
