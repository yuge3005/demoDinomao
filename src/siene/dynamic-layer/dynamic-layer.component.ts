import { GM } from '../../service/gameSetting/GM';
import { HttpClient } from '@angular/common/http';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-21 11:30:50
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-14 13:32:03
 */
import { PageDirective } from './page.directive';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input, OnChanges, SimpleChanges, ComponentRef } from '@angular/core';
import { LobbyComponent } from '../lobby/lobby/lobby.component';
import { MainPage } from './MainPage.component';
import { VideoComponent } from '../video/video/video.component';
import { trace } from '../../service/gameUILogic/trace';
import { Loading } from 'src/service/gameUILogic/Loading';

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

  constructor( private componentFactoryResolver: ComponentFactoryResolver, private http: HttpClient ) { }

  async ngOnInit() {
    let gameConfigObj: any = await this.http.get( "assets/gameConfig.json" ).toPromise();
    GM.configs = gameConfigObj;
    this.gotoPage( "lobby", null );
  }

  ngOnChanges( params: SimpleChanges ){
    this.pageHeight = params.mainHeight.currentValue;
    if( this.componentRef ) this.componentRef.instance.setHeight( this.pageHeight )
  }

  gotoPage( page: string, data: any ){
    trace.log( page );
    trace.log( data );
    let componentFactory: any = null;
    switch( page ){
      case "lobby": componentFactory = this.componentFactoryResolver.resolveComponentFactory(LobbyComponent);
        break;
      case "video": componentFactory = this.componentFactoryResolver.resolveComponentFactory(VideoComponent);
        break;
      default:
        break;
    }
    Loading.status = 0;
    const viewContainerRef = this.appPages.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent<MainPage>( componentFactory );
    this.componentRef.instance.setHeight( this.pageHeight );
    this.componentRef.instance.emptyCallback = this.gotoPage.bind( this );
    if( data ) this.componentRef.instance.setData( data );
  }
}
