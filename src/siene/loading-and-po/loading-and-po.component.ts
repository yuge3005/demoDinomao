/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-20 10:43:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-02 13:52:29
 */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-and-po',
  templateUrl: './loading-and-po.component.html',
  styleUrls: ['./loading-and-po.component.css']
})
export class LoadingAndPoComponent implements OnInit{
  @Input() mainHeight!: number;
  @Input() po!: Object | null;
  @Input() loading!: boolean;

  loadingBg: string = 'url(assets/loading_bg.jpg)';
  constructor() { }

  ngOnInit(){
  }
}
