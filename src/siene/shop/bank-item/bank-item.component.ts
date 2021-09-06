import { UIFromParent, BitmapData } from '../../../basicUI/basic-ui.module';
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-bank-item',
  templateUrl: './bank-item.component.html',
  styleUrls: ['./bank-item.component.css']
})
export class BankItemComponent extends UIFromParent {

  bankItemBg!: BitmapData

  @Input() itemData: any;
  @Input() index: number = 0;

  @Output() itemClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  initUI(){
    this.bankItemBg = this.textureData.getTexture( "bg_coin" );
  }
}
