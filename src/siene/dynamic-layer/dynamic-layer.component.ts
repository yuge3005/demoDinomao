/*
* @Description:
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-21 11:30:50
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:37:54
*/
import { HttpClient } from '@angular/common/http';
import { PageDirective } from './page.directive';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input, OnChanges, SimpleChanges, ComponentRef } from '@angular/core';
import { LoginPageComponent, LobbyComponent, VideoComponent, ShopComponent, UserCenterComponent, AboutUsComponent, SoundAndLogoutComponent, ContactUsComponent,
  StartUpComponent, VideoRecordComponent, RecordPlayBackComponent, LedgerComponent, AddressComponent, EditAddressComponent, OrderForGoodsComponent, PrizeComponent,
  LastWinPlayBackComponent } from '../../pages/game-page.module';
import { GM, trace, Loading, MainPage, Trigger, WebPages } from '../../service/dinomao-game.module';
import { Application } from 'resize-able-ui';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dynamic-layer',
  templateUrl: './dynamic-layer.component.html'
})
export class DynamicLayerComponent implements OnInit, OnChanges{
  @Input() mainHeight!: number;
  private pageHeight: number = 0;
  @ViewChild(PageDirective, { static: true }) appPages!: PageDirective;

  componentRef!: ComponentRef<MainPage>;

  private currentPage: string = "";

  hasHead: boolean = false;
  hasBotton: boolean = false;

  menuIndex: number = 0;

  constructor( private componentFactoryResolver: ComponentFactoryResolver, private http: HttpClient ) { }

  ngOnInit() {
    GM.configs = environment.gameConfig;
    this.gotoPage( WebPages.LOGIN, null );
    Trigger.gotoPage = this.gotoPage.bind( this );

    this.checkForceUpdate();
  }
  
  async checkForceUpdate(){
    if( Application.system.isApp() ){
      let versionInfo: any = await this.http.get( GM.configs.dataServerUrl + "mobile/status.htm" ).toPromise();
      let obj: any = Application.system.isIOS ? versionInfo.platform.iOS : versionInfo.platform.Android;
      if( obj.force_update && obj.app_version > GM.configs.version ){
        Trigger.popupManager.forceUpdate( obj.app_url );
      }
    }
  }

  ngOnChanges( params: SimpleChanges ){
    this.pageHeight = params.mainHeight.currentValue;
    if( this.componentRef ) this.componentRef.instance.setHeight( this.pageHeight )
  }

  gotoPage( page: string, data: any ){
    trace.log( page );
    trace.log( data );
    if( this.currentPage == page ){
      trace.log( "already in this page: " + page );
      return;
    }
    let componentFactory: any = null;
    switch( page ){
      case WebPages.LOGIN: componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoginPageComponent);
        break;
      case WebPages.LOBBY: componentFactory = this.componentFactoryResolver.resolveComponentFactory(LobbyComponent);
        break;
      case WebPages.VIDEO: componentFactory = this.componentFactoryResolver.resolveComponentFactory(VideoComponent);
        break;
      case WebPages.SHOP: componentFactory = this.componentFactoryResolver.resolveComponentFactory(ShopComponent);
        break;
      case WebPages.USER_CENTER: componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserCenterComponent);
        break;
      case WebPages.ABOUT_US: componentFactory = this.componentFactoryResolver.resolveComponentFactory(AboutUsComponent);
        break;
      case WebPages.SETTINGS: componentFactory = this.componentFactoryResolver.resolveComponentFactory(SoundAndLogoutComponent);
        break;
      case WebPages.INVITE: componentFactory = this.componentFactoryResolver.resolveComponentFactory(SoundAndLogoutComponent);
        break;
      case WebPages.CONTACT: componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContactUsComponent);
        break;
      case WebPages.START_UP: componentFactory = this.componentFactoryResolver.resolveComponentFactory(StartUpComponent);
        break;
      case WebPages.VIDEO_RECORD: componentFactory = this.componentFactoryResolver.resolveComponentFactory(VideoRecordComponent);
        break;
      case WebPages.RECORD_PLAY: componentFactory = this.componentFactoryResolver.resolveComponentFactory(RecordPlayBackComponent);
        break;
      case WebPages.LAST_WIN_PLAY: componentFactory = this.componentFactoryResolver.resolveComponentFactory(LastWinPlayBackComponent);
        break;
      case WebPages.LEDGER: componentFactory = this.componentFactoryResolver.resolveComponentFactory(LedgerComponent);
        break;
      case WebPages.ADDRESS: componentFactory = this.componentFactoryResolver.resolveComponentFactory(AddressComponent);
        break;
      case WebPages.EDIT_ADDRESS: componentFactory = this.componentFactoryResolver.resolveComponentFactory(EditAddressComponent);
        break;
      case WebPages.ORDER: componentFactory = this.componentFactoryResolver.resolveComponentFactory(OrderForGoodsComponent);
        break;
      case WebPages.PRIZE: componentFactory = this.componentFactoryResolver.resolveComponentFactory(PrizeComponent);
        break;
      default:
        alert( "page name error" );
        return;
    }

    Loading.status = 0;
    const viewContainerRef = this.appPages.viewContainerRef;
    viewContainerRef.clear();
    
    this.componentRef = viewContainerRef.createComponent<MainPage>( componentFactory );
    this.componentRef.instance.setHeight( this.pageHeight );
    if( data ) {
      try{
        this.componentRef.instance.setData( data );
      }
      catch( e ){ trace.log( "page set data error" ) }
    }
    this.currentPage = page;

    this.setPageHeadAndBotton( page );
  }

  setPageHeadAndBotton( page: string ){
    let ar: boolean[] = WebPages.pageHeadAndBotton( page );
    this.hasHead = ar[0];
    this.hasBotton = ar[1];
    if( this.hasBotton ) this.menuIndex = WebPages.pageMenuIndex( page );
  }
}
