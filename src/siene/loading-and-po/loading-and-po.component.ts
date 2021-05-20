import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-and-po',
  templateUrl: './loading-and-po.component.html',
  styleUrls: ['./loading-and-po.component.css']
})
export class LoadingAndPoComponent implements OnInit{
  @Input() mainHeight: number | undefined;
  heightStr: string = "";
  constructor() { }

  ngOnInit(){
    this.heightStr = "height:" + this.mainHeight + "px";
  }

  get isLoading():boolean{
    return true;
  }
}
