import { MachineListData } from './MachineListData';
/*
 * @Description: the lobby
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-08 12:06:13
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-15 09:25:10
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
    if( this.user.gameDataLoaded ) this.getDataFromLocal();
    else this.loadDataFromServer();
  }

  loadDataFromServer(){
    let fblst: string | null = localStorage.getItem( "user_account_info" );

    let userAccountInfo = localStorage.getItem('user_account_info');
    let keys = (userAccountInfo && userAccountInfo.split('&')) || [];
    var data: any = {};
    keys.map((k) => {
        if (k !== '') {
            let keyValue = k.split('=');
            data[keyValue[0]] = keyValue[1];
        }
    });

    if( data["login_type"] == "facebook" && data["access_token"] ){
      let obStr: string = "access_token=" + data["access_token"];
      new HttpRequest().loadData( "facebook_connect.php?platform=" + HttpRequest.platForm, this.getGameData.bind(this), "POST", obStr );
    }
    else if( data["login_type"] == "guest" && data["token"] ){
      let obStr: string = "token=" + data["token"];
      new HttpRequest().loadData( "guest_connect.php?platform=" + HttpRequest.platForm, this.getGameData.bind(this), "POST", obStr );
    }
    else{
      window.location.href = "/login/login.html";
    }
  }

  getDataFromLocal(){
    this.machines = MachineListData.list;
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData(){}

  getGameData( resObj: any ){
    if( resObj ){
      var hasDataError: boolean = false;
      if( resObj.machine_list ){
        MachineListData.list = resObj.machine_list;
        this.machines = MachineListData.list;
      }
      else hasDataError = true;

      if( !hasDataError && resObj.user ){
        if( resObj.facebook_id ) resObj.user.headimg = "https://graph.facebook.com/" + resObj.facebook_id + "/picture/?width=80&height=80";
        this.user.getLoginData( resObj.user );
      }
      else hasDataError = true;

      if( hasDataError ) this.loadGameDataError( resObj );
      else this.user.gameDataLoaded = true;
    }
  }

  onProductItemClick( itemData: MachineData ){
    if( this.emptyCallback ) this.emptyCallback( "video", itemData );
  }

  ngOnDestroy(){
    this.emptyCallback = null;
  }

  loadGameDataError( gameData: any ){
    console.log( "load data error:" );
    console.log( gameData );
    window.location.href = "/login.html";
  }
}
