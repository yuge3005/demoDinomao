import { UserDataService } from './../../service/user-data.service';
import { MainPage } from './../dynamic-layer/MainPage.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpRequest } from './../../service/http-request';
import { MachineData } from 'src/service/machine-data';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, MainPage {
  pageHeight: number = 0;
  emptyCallback: Function | null = null;

  machines: MachineData[] = [];
  constructor( private user: UserDataService ) { }

  ngOnInit() {
    new HttpRequest().load( "get_room_list?version_time=20180515&", this.getMachineList.bind(this) );
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  getMachineList( resObj: any ){
    if( resObj && resObj.data ){
      console.log( resObj )
      this.machines = resObj.data;
    }
  }

  onItemClick( es: string ){
    if( this.emptyCallback ) this.emptyCallback( "video", es );
  }

  OnDestroy(){
    this.emptyCallback = null;
  }
}
