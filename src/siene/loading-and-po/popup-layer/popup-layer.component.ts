import { Trigger } from '../../../service/gameUILogic/Trigger';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-14 11:16:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-14 13:59:41
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupDirective } from './popup-directive.directive';

@Component({
  selector: 'app-popup-layer',
  templateUrl: './popup-layer.component.html',
  styleUrls: ['./popup-layer.component.css']
})
export class PopupLayerComponent implements OnInit {

  @ViewChild (PopupDirective, { static: true }) appPages!: PopupDirective;
  constructor() { }

  ngOnInit() {
    Trigger.triggerFunc = this.showPopup.bind(this)
  }

  showPopup( popupVo: any ){
    console.log( popupVo )
  }
}
