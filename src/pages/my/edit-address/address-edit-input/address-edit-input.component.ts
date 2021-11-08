import { ScrollInput } from '../../../../basicUI/basic-ui.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-08 10:53:35
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-08 11:04:52
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-address-edit-input',
  templateUrl: './address-edit-input.component.html',
  styleUrls: ['./address-edit-input.component.css']
})
export class AddressEditInputComponent extends ScrollInput{

  constructor() { 
      super();

      this.fontSize = 30;
      this.align = "center";
      this.font = "FRABK_0";
      this.weight = "600";
  }
}
