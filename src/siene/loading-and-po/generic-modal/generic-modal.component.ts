import { trace } from './../../../service/gameUILogic/trace';
import { Trigger } from './../../../service/gameUILogic/Trigger';
import { HttpClient } from '@angular/common/http';
import { UIComponent } from './../../../basicUI/ui/UIComponent';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 14:54:26
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-14 15:56:00
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent extends UIComponent{

  constructor( public http: HttpClient ) {
    super(http);
  }

  initUI(){
    trace.log( this.textureJson );
  }
}
