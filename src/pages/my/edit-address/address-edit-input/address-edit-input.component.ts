import { ScrollInput } from '../../../../basicUI/basic-ui.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-08 10:53:35
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:24:41
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-address-edit-input',
  templateUrl: './address-edit-input.component.html',
  styleUrls: ['./address-edit-input.component.css']
})
export class AddressEditInputComponent extends ScrollInput{

  @Input() requred: boolean = true;

  constructor() { 
      super();

      this.fontSize = 30;
      this.align = "center";
      this.font = "FRABK_0";
      this.weight = "600";
  }
}
