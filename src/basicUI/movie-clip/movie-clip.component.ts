import { Point } from './../geom/point';
import { MovieClipTexture } from './MovieClipTexture';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-27 13:01:23
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-27 13:58:35
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-clip',
  templateUrl: './movie-clip.component.html',
  styleUrls: ['./movie-clip.component.css']
})
export class MovieClipComponent implements OnInit {

  @Input() movieClipTexture!: MovieClipTexture;
  @Input() movieClipData!: string;
  @Input() position!: Point;

  get x(): number{
    return this.position.x;
  }
  get y(): number{
    return this.position.y;
  }

  constructor() { }

  ngOnInit() {
  }

  bgTextureLoaded(){
    
  }
}
