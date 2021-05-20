import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-and-po',
  templateUrl: './loading-and-po.component.html',
  styleUrls: ['./loading-and-po.component.css']
})
export class LoadingAndPoComponent implements OnInit{
  @Input() mainHeight: number | undefined;
  @Input() po: Object | null | undefined;
  @Input() loading: boolean | undefined;
  constructor() { }

  ngOnInit(){
  }

  get styleHeight(): string{
    return "height:" + this.mainHeight + "px;";
  }

  get isLoading(): string{
    return "display:" + ( this.loading ? "block" : "none" );
  }
}
