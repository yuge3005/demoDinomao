/*
 * @Description: the lobby
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-08 12:06:13
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-10 11:30:40
 */
import { UserDataService } from '../../../service/user-data.service';
import { MainPage } from '../../dynamic-layer/MainPage.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpRequest } from '../../../service/http-request';
import { MachineData } from 'src/service/machine-data';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, MainPage, OnDestroy {
  pageHeight: number = 0;
  emptyCallback: Function | null = null;

  machines: MachineData[] = [];
  constructor( private user: UserDataService ) { }

  ngOnInit() {
    let fblst = localStorage.getItem( "fblst_" + this.user.appId );
    if( !fblst ) window.location.href = "/login.html";
    else{
      let obStr: string = "access_token=" + fblst;
      new HttpRequest().loadData( "facebook_connect.php?platform=com", this.getMachineList.bind(this), "POST", obStr );
    }
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData(){}

  getMachineList( resObj: any ){
    if( resObj && resObj.machine_list ){
      this.machines = resObj.machine_list;
    }
    if( resObj && resObj.user ){
      if( resObj.facebook_id ) resObj.user.headimg = "https://graph.facebook.com/" + resObj.facebook_id + "/picture/?width=80&height=80";
      this.user.getLoginData( resObj.user );
    }
  }

  onProductItemClick( itemData: MachineData ){
    if( this.emptyCallback ) this.emptyCallback( "video", itemData );
  }

  ngOnDestroy(){
    this.emptyCallback = null;
  }
}
