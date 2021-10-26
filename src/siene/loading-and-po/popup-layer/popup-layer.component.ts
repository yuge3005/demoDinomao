import { Tween } from '../../../basicUI/basic-ui.module';
import { PurchaseSuccessComponent, LogoutComponent, ForceUpdateComponent, WelcomeComponent, GenericPopupComponent, GenericPoComponent, DailyBonusComponent, ProductInfoComponent, GetVipComponent } from '../../../popups/game-popups.module';
import { GenericModalComponent, PopupVo, Trigger, PopupVoType } from '../../../service/dinomao-game.module';
import { Component, OnInit, ViewChild, ComponentRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-14 11:16:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-26 13:04:16
*/
import { PopupDirective } from './popup-directive.directive';

@Component({
  selector: 'app-popup-layer',
  templateUrl: './popup-layer.component.html',
  styleUrls: ['./popup-layer.component.css']
})
export class PopupLayerComponent implements OnInit {

  @ViewChild (PopupDirective, { static: true }) appPages!: PopupDirective;

  componentRef!: ComponentRef<GenericModalComponent>;

  @ViewChild('carousel', {static: true}) carousel!: ElementRef;

  private _scale: number = 0;
  set scale( value: number ){
    this._scale = value;
    if( this.carousel ) this.carousel.nativeElement.style.transform ='scale(' + value + ')';
  }
  get scale(): number{
    return this._scale;
  }
  
  constructor( private componentFactoryResolver: ComponentFactoryResolver ) { }

  ngOnInit() {
    Trigger.popupManager.addPopupFunc = this.addPopup.bind(this);
    Trigger.popupManager.loadedPopupFunc = this.popupLoaded.bind(this);
    Trigger.popupManager.closePopupFunc = this.popupClose.bind(this);
    this.scale = 0.01;
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
      case PopupVoType.CLUB:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( GenericPoComponent );
        break;
      case PopupVoType.GET_VIP:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( GetVipComponent );
        break;
      case PopupVoType.RESULT_FAILED:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory( GetVipComponent );
        break;
      default:
        alert( "no such things" );
        break;
    }
    this.componentRef = viewContainerRef.createComponent<GenericModalComponent>( componentFactory );
    return this.componentRef.instance;
  }

  popupLoaded(){
    Tween.to( this, 0.35, { scale: 1 } );
  }

  popupClose(){
    Tween.to( this, 0.35, { scale: 0.01 }, 0, this.afterClose.bind( this ) );
  }

  afterClose(){
    const viewContainerRef = this.appPages.viewContainerRef;
    viewContainerRef.clear();
    Trigger.popupManager.popupClosed();
  }
}
