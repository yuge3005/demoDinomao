import { HttpClient } from '@angular/common/http';
import { UIComponent } from './../UIComponent';
import { BitmapData } from './../../pagePart/image/bitmap-data';
import { Component, Input } from '@angular/core';
import { MachineData } from 'src/service/machine-data';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends UIComponent{

  @Input() machines: MachineData[] = [];
  @Input() listHeight: number = 0;

  iconList: BitmapData[] = [];
  constructor(public http: HttpClient) {
    super(http);
    this.textureUrl = "/assets/product_list/product_list.json";
  }

  initUI(){
    this.iconList[0] = this.topbarTexture.getTexture( "entrance_bg", 0, -9 );
    this.iconList[1] = this.topbarTexture.getTexture( "btn_cool_guy", -105, -2 );
    this.iconList[2] = this.topbarTexture.getTexture( "btn_beginner", 90, -2 );
    this.iconList[3] = this.topbarTexture.getTexture( "btn_cuttie_garden", 285, -2 );
    this.iconList[4] = this.topbarTexture.getTexture( "btn_happy_life", 480, -2 );
    this.iconList[5] = this.topbarTexture.getTexture( "btn_beginner", 675, -2 );
  }

  onItemClick( es: Object ){
    // if( this.emptyCallback ) this.emptyCallback( "video", es );
  }
}
