import { UserDataService } from './../../service/user-data.service';
import { UIComponent } from './../../siene/UIComponent';
import { BitmapData } from './../../service/bitmap-data';
import { TextureData } from './../../service/texture-data';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent extends UIComponent {

  topBarBg!: BitmapData;
  coinsBg1!: BitmapData;
  coinsBg2!: BitmapData;
  headMask!: BitmapData;
  vipIcon!: BitmapData;
  letter!: BitmapData;
  coin!: BitmapData;
  ticket!: BitmapData;

  constructor(public http: HttpClient, private user: UserDataService) {
    super(http);

    this.textureUrl = "/assets/top_bar/top_bar.json";
  }

  initUI(){
    this.topBarBg = this.topbarTexture.getTexture( "ingame_title_bg" );
    this.coinsBg1 = this.topbarTexture.getTexture( "btn_coins_bg", 155, 20 );
    this.coinsBg2 = this.topbarTexture.getTexture( "btn_coins_bg", 415, 20 );
    this.headMask = this.topbarTexture.getTexture( "lobby_04", 12, 10 );
    this.vipIcon = this.topbarTexture.getTexture( "icon_vip", 66, 52 );
    this.letter = this.topbarTexture.getTexture( "btn_letter", 640, 10 );
    this.coin = this.topbarTexture.getTexture( "icon_coin", 158, 23 );
    this.ticket = this.topbarTexture.getTexture( "icon_ticket", 404, 21 );
  }
}
