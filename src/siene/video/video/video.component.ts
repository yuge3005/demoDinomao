import { GM } from '../../../service/gameSetting/GM';
import { FacebookData } from '../../../service/user/FacebookData';
import { MainPage } from './../../dynamic-layer/MainPage.component';
import { Component, OnDestroy } from '@angular/core';
import { MachineData } from 'src/service/gameData/machine-data';
import { SocketIO } from 'src/service/net/socketIO';
import { HttpClient } from '@angular/common/http';
import { UIComponent, Rectangle, BitmapData } from '../../../basicUI/basic-ui.module';
import { HttpRequest } from 'src/service/net/http-request';
import { UserDataService } from 'src/service/user/user-data.service';
import { Loading } from 'src/service/gameUILogic/Loading';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent extends UIComponent implements MainPage, OnDestroy {
  pageHeight: number = 0;
  emptyCallback: Function | null = null;

  streamUrl: string = "";
  data!: MachineData;

  backToLobbyBtn!: BitmapData;
  wyfiIcon!: BitmapData;

  playing: boolean = false;

  firstCmd: boolean = false;
  usersCount: number = 0;
  viewRect: Rectangle = new Rectangle().init( 647, 320, 79, 15 );
  textColor: number = 0xFFFFFF;
  textSize: number = 18;
  get usersCountText(): string{
    if( this.usersCount <= 1 ) return this.usersCount + " viewer";
    else return this.usersCount + " viewers";
  }

  userHeadIcon: string = "";

  videoUrl1!: string;
  videoUrl2!: string;

  constructor( public http: HttpClient, private user: UserDataService ) {
      super(http);
      this.textureUrl = "assets/control_bar/control_bar.json";
  }

  initUI() {
    this.backToLobbyBtn = this.textureData.getTexture( "btn_return", 29, 133 );
    this.wyfiIcon = this.textureData.getTexture( "icon_signal_04", 655, 150 );

    let obStr: string = HttpRequest.interfaceString;
    let dataObject: string = "json=" + JSON.stringify({"good_id":this.data.good_id});
    new HttpRequest().loadData( "cmd.php?action=get_machine" + obStr, this.getMachineData.bind(this), "POST", dataObject );

    this.videoUrl1 = GM.configs.fileServerUrl + "video.html?stream=1";
    this.videoUrl2 = GM.configs.fileServerUrl + "video.html?stream=2";
    let videoFrame = document.getElementById("videoFrame") as HTMLIFrameElement;
    videoFrame.setAttribute( "src", this.videoUrl1 );
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData( data: MachineData ){
    this.streamUrl = data.rtc_url1;
    this.data = data;
  }

  ngOnDestroy(): void {
    this.emptyCallback = null;
  }

  startMachine(){
    SocketIO.instance.startMachin( this.data.good_id );
  }

  private onRoomCmd( cmd: string, data: any ){
    if( cmd.indexOf( "move" ) < 0 ){
      console.log( "cmd:" + cmd )
      console.log( data )
    }
    if( !this.firstCmd ){
      this.firstCmd = true;
      Loading.status = 2;
    }
    switch(cmd){
      case "get_player_info": this.updatePlayerInfo( data ); break;
      case "update_room_info": this.updateRoomInfo( data ); break;
      case "resetGameState": this.resetGameState( data ); break;
      case "roomBarrage": break;
      case "room_chat_record": break;
      case "game_start_fail": this.startFail( data ); break;
      case "resultCallback": this.getResault( data ); break;
      default: break;
    }
  }

  private getMachineData( resObj: any ){
    if( resObj && resObj.machine_info && resObj.machine_info.mac_addr ){
      this.data.mac_addr = resObj.machine_info.mac_addr;
      this.data.mac_id = resObj.machine_info.mac_id;
      SocketIO.instance.joinRoom( this.data.mac_addr, this.onRoomCmd.bind(this) );
    }
    else alert( "no mathine on line" )
  }

  public backToLobby(){
    if( this.emptyCallback ) this.emptyCallback( "lobby" );
  }

  public onVideoToggle(){
    let videoFrame = document.getElementById("videoFrame") as HTMLIFrameElement;
    if( videoFrame.src == this.videoUrl1 ){
      videoFrame.setAttribute( "src", this.videoUrl2 );
      SocketIO.instance.controlSide( 2 );
    }
    else{
      videoFrame.setAttribute( "src", this.videoUrl1 );
      SocketIO.instance.controlSide( 1 );
    }
  }

  /***************************************************************************************/

  public playingUser: any = null;

  private updatePlayerInfo( data: any ){
    if( data.playerInfo ){
      this.playingUser = data;
      if( data.playerInfo.facebook_id ) this.userHeadIcon = FacebookData.getFacebookHeadImageUrlById( data.playerInfo.facebook_id, 60 );
      else this.userHeadIcon = data.playerInfo.headimg;
    }
    else this.playingUser = null;
  }

  private updateRoomInfo( data: any ){
    if( data ) this.usersCount = data.usersCount;
  }

  private resetGameState( data: any ){
    if( data.room_state == 0 ){ // no one playing
      this.playingUser = null;
      this.playing = false;
      this.userHeadIcon = "";
      this.wyfiIcon = this.textureData.getTexture( "icon_signal_04", 655, 150 );
    }
    else if( data.room_state == 1 ){
      if( data.userid == this.user.userData.id ){ // I am playing
        this.playing = true;
        this.userHeadIcon = this.user.headIcon;
        this.wyfiIcon = this.textureData.getTexture( "icon_signal_02", 655, 150 );
      }
      else{
        this.playing = false; // other's playing
        if( this.playingUser == null ) this.playingUser = { id: data.userid };
        this.wyfiIcon = this.textureData.getTexture( "icon_signal_03", 655, 150 );
      }
    }
  }

  public startFail( data: any ){
    if( data && data.errmsg ) alert( data.errmsg );
  }

  public getResault( data: any ){

  }
}

