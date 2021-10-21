import { ImageScaleButtonComponent } from '../../../../basicUI/image-scale-button/image-scale-button.component';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-21 11:42:08
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-21 11:47:12
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-prod-info-button',
  templateUrl: './prod-info-button.component.html',
  styleUrls: ['./prod-info-button.component.css']
})
export class ProdInfoButtonComponent extends ImageScaleButtonComponent {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
