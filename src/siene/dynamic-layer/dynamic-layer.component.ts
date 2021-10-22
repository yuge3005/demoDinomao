/*
* @Description:
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-21 11:30:50
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-22 15:28:28
*/
import { HttpClient } from '@angular/common/http';
import { PageDirective } from './page.directive';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input, OnChanges, SimpleChanges, ComponentRef } from '@angular/core';
import { LobbyComponent } from '../lobby/lobby/lobby.component';
import { VideoComponent } from '../../pages/video/video/video.component';
import { ShopComponent } from '../shop/shop/shop.component';
import { UserCenterComponent } from '../../pages/my/user-center/user-center.component';
import { AboutUsComponent } from '../../pages/my/about-us/about-us.component';
import { GM, trace, Loading, MainPage, Trigger, WebPages } from '../../service/dinomao-game.module';
import { Application } from '../../basicUI/basic-ui.module';
import { SoundAndLogoutComponent } from '../../pages/my/sound-and-logout/sound-and-logout.component';
import { ContactUsComponent } from '../../pages/my/contact-us/contact-us.component';
import { StartUpComponent } from '../../pages/start-up/start-up.component';
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

  constructor( private componentFactoryResolver: ComponentFactoryResolver, private http: HttpClient ) { }

  ngOnInit() {
    GM.configs = environment.gameConfig;
    this.gotoPage( WebPages.LOBBY, null );
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
      default:
        alert( "page name error" );
        return;
    }

    Loading.status = 0;
    const viewContainerRef = this.appPages.viewContainerRef;
    viewContainerRef.clear();
    
    this.componentRef = viewContainerRef.createComponent<MainPage>( componentFactory );
    this.componentRef.instance.setHeight( this.pageHeight );
    if( data ) this.componentRef.instance.setData( data );
    this.currentPage = page;
  }
}
