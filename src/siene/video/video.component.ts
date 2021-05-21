import { MainPage } from './../dynamic-layer/MainPage.component';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, MainPage, OnDestroy {
  pageHeight: number = 0;
  emptyCallback: Function | null = null;

  flashVars: string = "";
  constructor() { }

  ngOnInit() {
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData( data: any ){
    this.flashVars = "streamName=" + data;
    console.log( this );
  }

  ngOnDestroy(): void {
    this.emptyCallback = null;
  }
}
