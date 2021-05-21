import { PageDirective } from './page.directive';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input, OnChanges, SimpleChanges, ComponentRef } from '@angular/core';
import { LobbyComponent } from '../lobby/lobby.component';
import { MainPage } from './MainPage.component';
import { VideoComponent } from '../video/video.component';

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

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.gotoPage( "lobby", null );
  }

  ngOnChanges( params: SimpleChanges ){
    this.pageHeight = params.mainHeight.currentValue;
    if( this.componentRef ) this.componentRef.instance.setHeight( this.pageHeight )
  }

  gotoPage( page: string, data: any ){
    console.log( page );
    console.log( data );
    let componentFactory: any = null;
    switch( page ){
      case "lobby": componentFactory = this.componentFactoryResolver.resolveComponentFactory(LobbyComponent);
        break;
      case "video": componentFactory = this.componentFactoryResolver.resolveComponentFactory(VideoComponent);
        break;
      default:
        break;
    }
    const viewContainerRef = this.appPages.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent<MainPage>( componentFactory );
    this.componentRef.instance.setHeight( this.pageHeight );
    this.componentRef.instance.emptyCallback = this.gotoPage;
  }
}
