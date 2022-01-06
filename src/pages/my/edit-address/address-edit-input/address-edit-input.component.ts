import { ScrollInput, StyleX } from '../../../../basicUI/basic-ui.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-08 10:53:35
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-06 11:32:08
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-address-edit-input',
  templateUrl: './address-edit-input.component.html',
  styleUrls: ['./address-edit-input.component.css']
})
export class AddressEditInputComponent extends ScrollInput{

  @Input() requred: boolean = true;
  redText: Object = {};

  constructor() { 
      super();

      this.fontSize = 30;
      this.align = "center";
      this.font = "FRABK_0";
      this.weight = "600";
  }

  ngOnInit(){
    super.ngOnInit();
    this.redText = StyleX.combine( StyleX.borderRadius(16,false), StyleX.backgroundColor("red"), StyleX.setSize(16,16) );
  }
}
