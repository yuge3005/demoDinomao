import { TextInput, StyleX } from 'resize-able-ui';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-08 11:39:56
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 14:50:21
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-address-edit-text-area',
  templateUrl: './address-edit-text-area.component.html',
  styleUrls: ['./address-edit-text-area.component.css']
})
export class AddressEditTextAreaComponent extends TextInput{

  redText: Object = {};

  constructor() { 
      super();
      this.multiline = "multiline";

      this.fontSize = 30;
      this.font = "FRABK_0";
      this.weight = "600";
  }

  ngOnInit(){
    super.ngOnInit();
    this.redText = StyleX.combine( StyleX.borderRadius(16,false), StyleX.backgroundColor("red"), StyleX.setSize(16,16) );
  }
}
