import { ImageScaleButtonComponent, StyleX } from '../../../../basicUI/basic-ui.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-21 11:42:08
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-31 16:56:50
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prod-info-button',
  templateUrl: './prod-info-button.component.html',
  styleUrls: ['./prod-info-button.component.css']
})
export class ProdInfoButtonComponent extends ImageScaleButtonComponent {

  @Input() productImg: string = "";
  productImgStyle: Object = {};

  constructor() { 
    super();
  }

  ngOnInit(){
    this.productImgStyle = StyleX.combine( StyleX.borderRadius(30), StyleX.setItemRect( 3, 2, 165, 165 ) );
  }
}
