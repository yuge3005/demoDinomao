import { MainPage } from './../dynamic-layer/MainPage.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, MainPage {
  pageHeight: number = 0;
  constructor() { }

  ngOnInit() {
  }

  setHeight( height: number ){
    this.pageHeight = height;
    console.log( this.pageHeight );
  }
}
