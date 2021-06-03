import { Application } from 'src/basicUI/settings/Application';
import { ResizeAble } from '../../../basicUI/ui/ResizeAble';
import { Point } from '../../../basicUI/geom/point';
import { HttpClient } from '@angular/common/http';
import { UIComponent } from '../../UIComponent';
import { BitmapData } from '../../../basicUI/image/bitmap-data';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MachineData } from 'src/service/machine-data';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends UIComponent{

  @Input() machines: MachineData[] = [];
  @Input() listHeight: number = 0;

  @ViewChild('pl', {static: true}) pl!: ElementRef;

  iconList: BitmapData[] = [];

  private draging: Point | null = null;
  private scrollYStart: number = 0;
  private _scrollY: number = 0;

  get scrollY(): number{
    return this._scrollY;
  }
  set scrollY( value: number ){
    let minY: number = - Math.ceil( this.machines.length / 2 ) * 425 + this.listHeight - 700;
    if( value < minY ) value = minY;
    if( value > 0 ) value = 0;
    this._scrollY = value;
  }
  constructor(public http: HttpClient) {
    super(http);
    this.textureUrl = "/assets/product_list/product_list.json";
  }

  initUI(){
    this.iconList[0] = this.textureData.getTexture( "entrance_bg", 0, -9 );
    this.iconList[1] = this.textureData.getTexture( "btn_cool_guy", -105, -2 );
    this.iconList[2] = this.textureData.getTexture( "btn_beginner", 90, -2 );
    this.iconList[3] = this.textureData.getTexture( "btn_cuttie_garden", 285, -2 );
    this.iconList[4] = this.textureData.getTexture( "btn_happy_life", 480, -2 );
    this.iconList[5] = this.textureData.getTexture( "btn_beginner", 675, -2 );

    if( Application.system.isMobile() ){

    }
    else{
      // this.pl.addEventListener()
    }
    // (mousedown)="onDrag($event)" (mousedown)="onDrag($event)" (mousemove)="onMove($event)" (mouseup)="stopDrag()"  (mouseout)="stopDrag()"
  }

  onItemClick( es: Object ){
    // if( this.emptyCallback ) this.emptyCallback( "video", es );
  }

  onDrag( event: MouseEvent ){
    event.preventDefault();
    this.draging = new Point( event.clientX, event.clientY );
    this.scrollYStart = this.scrollY;
    console.log( event );
  }

  onMove( event: MouseEvent ){
    event.preventDefault();
    console.log( event );
    if( this.draging ){

      this.scrollY = ( event.clientY - this.draging.y ) / ResizeAble.scale + this.scrollYStart;
    }
  }

  stopDrag(){
    this.draging = null;
  }
}
