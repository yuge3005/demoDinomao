/*
* @Description:
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-21 11:30:50
* @LastEditors: Wayne Yu
* @LastEditTime: 2021-09-02 14:49:11
*/
import { HttpClient } from '@angular/common/http';
import { PageDirective } from './page.directive';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input, OnChanges, SimpleChanges, ComponentRef } from '@angular/core';
import { LobbyComponent } from '../lobby/lobby/lobby.component';
import { VideoComponent } from '../video/video/video.component';
import { ShopComponent } from '../shop/shop/shop.component';
import { GM, trace, Loading, MainPage, Trigger, WebPages } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-dynamic-layer',
  templateUrl: './dynamic-layer.component.html',
  styleUrls: ['./dynamic-layer.component.css']
})
export class DynamicLayerComponent implements OnInit, OnChanges{
  @Input() mainHeight!: number;
  private pageHeight: number = 0;
  @ViewChild(PageDirective, { static: true }) appPages!: PageDirective;

  componentRef!: ComponentRef<MainPage>;

  private currentPage: string = "";

  constructor( private componentFactoryResolver: ComponentFactoryResolver, private http: HttpClient ) { }

  async ngOnInit() {
    let gameConfigObj: any = await this.http.get( "assets/gameConfig.json" ).toPromise();
    GM.configs = gameConfigObj;
    this.gotoPage( WebPages.LOBBY, null );
    Trigger.gotoPage = this.gotoPage.bind( this );
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
