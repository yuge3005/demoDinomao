import { MainPage } from './../dynamic-layer/MainPage.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, MainPage {
  @Input() data!: Object;
  pageHeight: number = 0;
  constructor() { }

  ngOnInit() {
  }

}
