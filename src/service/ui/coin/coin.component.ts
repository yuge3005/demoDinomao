import { HttpClient } from '@angular/common/http';
import { MovieClipComponent } from '../../../basicUI/basic-ui.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-30 15:59:31
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-30 16:19:22
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent extends MovieClipComponent {

	constructor( protected http: HttpClient ) {
		super( http );
	}
}
