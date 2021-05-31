import { Component, Input, OnInit } from '@angular/core';
import { MachineData } from 'src/service/machine-data';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() machines: MachineData[] = [];
  @Input() listHeight: number = 0;
  constructor() { }

  ngOnInit() {
  }

  onItemClick( es: Object ){
    // if( this.emptyCallback ) this.emptyCallback( "video", es );
  }
}
