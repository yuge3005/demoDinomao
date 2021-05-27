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
  textureJson: any;
  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.textureJson = await this.http.get("/assets/top_bar/top_bar.json").toPromise();
    console.log(this.textureJson);
    console.log('initData 执行完成');

    this.topbarTexture = new TextureData();
    this.topbarTexture.setFile( this.textureJson.file, this.textureJson.frames );
    this.topBarBg = this.topbarTexture.getTexture( "ingame_title_bg" );
  }
}
