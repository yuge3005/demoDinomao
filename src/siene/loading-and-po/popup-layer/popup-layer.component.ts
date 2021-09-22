import { PurchaseSuccessComponent } from '../../../popups/purchase-success/purchase-success.component';
import { LogoutComponent } from '../../../popups/Logout/Logout.component';
import { ForceUpdateComponent } from '../../../popups/force-update/force-update.component';
import { WelcomeComponent } from '../../../popups/welcome/welcome.component';
import { GenericPopupComponent } from '../../../popups/generic-popup/generic-popup.component';
import { GenericModalComponent, PopupVo, Trigger, PopupVoType } from '../../../service/dinomao-game.module';
import { VipPassComponent } from '../../../popups/vip-pass/vip-pass.component';
import { GenericPoComponent } from '../../../popups/generic-po/generic-po.component';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-14 11:16:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-22 17:56:54
*/
import { Component, OnInit, ViewChild, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { PopupDirective } from './popup-directive.directive';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DailyBonusComponent } from '../../../popups/daily-bonus/daily-bonus.component';
import { ProductInfoComponent } from '../../../popups/product-info/product-info.component';

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
    Trigger.popupManager.addPopupFunc = this.addPopup.bind(this)
    Trigger.popupManager.loadedPopupFunc = this.popupLoaded.bind(this)
    Trigger.popupManager.closePopupFunc = this.popupClose.bind(this)
  }

  addPopup( popupVo: PopupVo ): GenericModalComponent{
    Trigger.popupData = popupVo;

    const viewContainerRef = this.appPages.viewContainerRef;
    viewContainerRef.clear();
    
    let componentFactory: any;
    switch( popupVo.type ){
      case PopupVoType.PO:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( GenericPoComponent );
        break;
      case PopupVoType.POPUP:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( GenericPopupComponent );
        break;
      case PopupVoType.SUBSCRIPTION:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( VipPassComponent );
        break;
      case PopupVoType.WELCOME:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( WelcomeComponent );
        break;
      case PopupVoType.DAILY:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( DailyBonusComponent );
        break;
      case PopupVoType.FORCE_UPDATE:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( ForceUpdateComponent );
        break;
      case PopupVoType.PRODUCT_INFO:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( ProductInfoComponent );
        break;
      case PopupVoType.LOGOUT: 
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( LogoutComponent );
        break;
      case PopupVoType.PURCHASE_SUCCESS:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( PurchaseSuccessComponent );
        break;
      default:
        alert( "no such things" );
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
      Trigger.popupManager.popupClosed();
    }, 360);
  }
}
