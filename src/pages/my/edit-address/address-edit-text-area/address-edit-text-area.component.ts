import { ScrollInput } from 'resize-able-ui';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-08 11:39:56
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-08 11:45:15
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-address-edit-text-area',
  templateUrl: './address-edit-text-area.component.html',
  styleUrls: ['./address-edit-text-area.component.css']
})
export class AddressEditTextAreaComponent extends ScrollInput{

  constructor() { 
      super();
      this.multiline = "multiline";

      this.fontSize = 30;
      this.font = "FRABK_0";
      this.weight = "600";
  }
}
