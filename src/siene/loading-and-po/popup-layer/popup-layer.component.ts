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
 * @LastEditTime: 2021-07-14 15:47:01
*/
import { Component, OnInit, ViewChild, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { PopupDirective } from './popup-directive.directive';

@Component({
  selector: 'app-popup-layer',
  templateUrl: './popup-layer.component.html',
  styleUrls: ['./popup-layer.component.css']
})
export class PopupLayerComponent implements OnInit {

  private currentPoName!: string;
  private currentPopup!: GenericModalComponent;
  
  private waitingModals: any[] = [];

  @ViewChild (PopupDirective, { static: true }) appPages!: PopupDirective;

  componentRef!: ComponentRef<GenericModalComponent>;
  
  constructor( private componentFactoryResolver: ComponentFactoryResolver ) { }

  ngOnInit() {
    Trigger.triggerFunc = this.showPopup.bind(this)
  }

  showPopup( popupVo: any ){
    trace.log( popupVo )
    this.waitingModals.push( popupVo );
    this.showFirstWaitingModal();
  }

  showFirstWaitingModal(){
    if( this.currentPopup ) return;
    if( !this.waitingModals.length ) return;
    
    trace.log( "iii" )

    let popupData: any = this.waitingModals.shift();
    Trigger.popupPackagePath = popupData.url;

    let componentFactory: any = this.componentFactoryResolver.resolveComponentFactory( GenericPoComponent );
    const viewContainerRef = this.appPages.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent<GenericModalComponent>( componentFactory );
    this.currentPopup = this.componentRef.instance;
  }
}
