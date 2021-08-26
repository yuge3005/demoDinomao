import { UIFromParent, Point, BitmapData } from './../../../basicUI/basic-ui.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-25 16:44:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-25 17:14:48
 */
import { Component, Input, SimpleChanges } from '@angular/core';
import { DailyBonus } from 'src/service/user/DailyBonus';

@Component({
  selector: 'app-daily-item',
  templateUrl: './daily-item.component.html',
  styleUrls: ['./daily-item.component.css']
})
export class DailyItemComponent extends UIFromParent {

  dailyItemBg!: BitmapData;
  position: Point = new Point;

  @Input() itemData!: any;
  @Input() index: number = -1;

  constructor() {
    super();
  }

  initUI() {
    var iNumber: number = this.index + 1;
    this.dailyItemBg = this.textureData.getTexture( DailyBonus.instance.daysRow == iNumber ? "bg1" : "bg" );
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges( changes );

    if( changes.index ){
      var iNumber: number = this.index + 1;
      this.position = new Point().init( iNumber % 3 * 212 + 48, Math.floor( iNumber / 3 ) * 296 + 234 );
    }
  }
}
