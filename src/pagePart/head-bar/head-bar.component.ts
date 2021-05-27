import { BitmapData } from './../../service/bitmap-data';
import { TextureData } from './../../service/texture-data';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent implements OnInit {

  topbarTexture!: TextureData;
  topBarBg!: BitmapData;
  coinsBg1!: BitmapData;
  coinsBg2!: BitmapData;
  headMask!: BitmapData;
  vipIcon!: BitmapData;
  textureJson: any;
  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.textureJson = await this.http.get("/assets/top_bar/top_bar.json").toPromise();
    console.log(this.textureJson);
    console.log('initData 执行完成');

    this.topbarTexture = new TextureData();
    this.topbarTexture.setFile( "/assets/top_bar/" + this.textureJson.file, this.textureJson.frames );
    this.topBarBg = this.topbarTexture.getTexture( "ingame_title_bg" );
    this.coinsBg1 = this.topbarTexture.getTexture( "btn_coins_bg", 155, 20 );
    this.coinsBg2 = this.topbarTexture.getTexture( "btn_coins_bg", 415, 20 );
    this.headMask = this.topbarTexture.getTexture( "lobby_04", 12, 10 );
    this.vipIcon = this.topbarTexture.getTexture( "icon_vip", 66, 52 );
  }
}
