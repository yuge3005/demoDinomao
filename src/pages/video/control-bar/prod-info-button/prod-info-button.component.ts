import { ImageScaleButtonComponent } from '../../../../basicUI/basic-ui.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-21 11:42:08
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-22 15:32:30
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prod-info-button',
  templateUrl: './prod-info-button.component.html',
  styleUrls: ['./prod-info-button.component.css']
})
export class ProdInfoButtonComponent extends ImageScaleButtonComponent {

  @Input() productImg: string = "";

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
