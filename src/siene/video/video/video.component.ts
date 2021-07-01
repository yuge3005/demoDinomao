import { trace } from './../../../service/trace';
import { MainPage } from './../../dynamic-layer/MainPage.component';
import { Component, OnDestroy } from '@angular/core';
import { MachineData } from 'src/service/machine-data';
import { SocketIO } from 'src/service/socketIO';
import { HttpClient } from '@angular/common/http';
import { UIComponent } from '../../../basicUI/ui/UIComponent';
import { BitmapData } from '../../../basicUI/image/bitmap-data';
import { HttpRequest } from 'src/service/http-request';
import { UserDataService } from 'src/service/user-data.service';

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

  playing: boolean = false;
  
  constructor(public http: HttpClient, private user: UserDataService) {
    super(http);
    this.textureUrl = "assets/control_bar/control_bar.json";
  }

  initUI() {
    this.backToLobbyBtn = this.textureData.getTexture( "btn_return", 29, 133 );

    let obStr: string = this.user.getInterfaceString();
    let dataObject: string = "json=" + JSON.stringify({"good_id":this.data.good_id});
    new HttpRequest().loadData( "cmd.php?action=get_machine" + obStr, this.getMachineData.bind(this), "POST", dataObject );
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

  onKeyDown(event: any){
    if (event.keyCode === 37) {
      event.preventDefault();
      SocketIO.instance.move( "left" );
    } else if (event.keyCode === 38) {
      event.preventDefault();
      SocketIO.instance.move( "back" );
    }
    else if (event.keyCode === 39) {
      event.preventDefault();
      SocketIO.instance.move( "right" );
    }
    else if (event.keyCode === 40) {
      event.preventDefault();
      SocketIO.instance.move( "front" );
    }
    else if (event.keyCode === 32) {
      event.preventDefault();
      SocketIO.instance.getWawa();
    }
  }

  onKeyUp(event: any){
    if (event.keyCode === 37) {
      event.preventDefault();
      SocketIO.instance.stop( "left" );
    } else if (event.keyCode === 38) {
      event.preventDefault();
      SocketIO.instance.stop( "back" );
    }
    else if (event.keyCode === 39) {
      event.preventDefault();
      SocketIO.instance.stop( "right" );
    }
    else if (event.keyCode === 40) {
      event.preventDefault();
      SocketIO.instance.stop( "front" );
    }
  }

  private onRoomCmd( cmd: string, data: any ){
    console.log( "cmd:" + cmd )
    console.log( data )
    switch(cmd){
      case "get_player_info": this.updatePlayerInfo( data ); break;
      case "update_room_info": this.updateRoomInfo( data ); break;
      case "resetGameState": this.resetGameState( data ); break;
      case "roomBarrage": break;
      case "room_chat_record": break;
      case "game_start_fail": this.startFail( data ); break;
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
    if( videoFrame.src == "https://direct.hermetix.io/video.html?stream=1" ) videoFrame.setAttribute( "src", "https://direct.hermetix.io/video.html?stream=2" );
    else videoFrame.setAttribute( "src", "https://direct.hermetix.io/video.html?stream=1" );
  }

  /***************************************************************************************/

  public playingUser: any = null;

  private updatePlayerInfo( data: any ){
    console.log( data );
    if( data.id ) this.playingUser = data;
    else this.playingUser = null;
  }

  private updateRoomInfo( data: any ){

  }

  private resetGameState( data: any ){
    if( data.userid = this.user.userData.id && data.room_state == 1 ){
      this.playing = true;
    }
    else this.playing = false;
  }

  public startFail( data: any ){
    if( data && data.errmsg ) alert( data.errmsg );
  }
}

