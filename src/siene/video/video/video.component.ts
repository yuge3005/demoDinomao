import { Trigger } from './../../../service/gameUILogic/Trigger';
import { trace } from './../../../service/gameUILogic/trace';
import { GM, Loading, FacebookData, GoodsData, SocketIO, HttpRequest, User, MainPage } from '../../../service/dinomao-game.module';
import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UIComponent, Rectangle, BitmapData } from '../../../basicUI/basic-ui.module';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent extends UIComponent implements MainPage, OnDestroy {
  pageHeight: number = 0;
  emptyCallback: Function | null = null;

  data!: GoodsData;

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

  public get iframeHeight(): number{
    return this.pageHeight -95 -430;
  }

  public get tvPositionY(): number{
    return Math.round( this.iframeHeight * 0.5 ) - 76;
  }

  videoLoading: boolean = false;

  constructor( public http: HttpClient ) {
      super(http);
      this.textureUrl = "assets/control_bar/control_bar.json";
  }

  initUI() {
    this.backToLobbyBtn = this.textureData.getTexture( "btn_return", 29, 133 );
    this.wyfiIcon = this.textureData.getTexture( "icon_signal_04", 655, 150 );

    let obStr: string = GM.interfaceString;
    let dataObject: string = "json=" + JSON.stringify({"good_id":this.data.good_id});
    new HttpRequest().loadData( "cmd.php?action=get_machine" + obStr, this.getMachineData.bind(this), "POST", dataObject );

    window.addEventListener('message', this.videoMessage.bind(this), false);

    this.videoLoading = true;
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData( data: GoodsData ){
    this.data = data;
  }

  ngOnDestroy(): void {
    this.emptyCallback = null;
    window.removeEventListener('message', this.videoMessage.bind(this), false );
  }

  videoMessage( e: MessageEvent ){
    let data: any = JSON.parse( e.data );
    if( data && data.value == "weLoaded" ){
      trace.log( "good" )
      setTimeout(() => {
        this.videoLoading = false;
      }, 800);
    }
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
      case "put_coins": Trigger.ooc(); break;
      default: break;
    }
  }

  private getMachineData( resObj: any ){
    if( resObj && resObj.machine_info && resObj.machine_info.mac_addr ){
      this.data.mac_addr = resObj.machine_info.mac_addr;
      this.data.mac_id = resObj.machine_info.mac_id;
      SocketIO.instance.joinRoom( this.data.mac_addr, this.onRoomCmd.bind(this) );

      this.videoUrl1 = GM.configs.fileServerUrl + "video.html?stream=" + resObj.machine_info.rtc_url1.substr( resObj.machine_info.rtc_url1.indexOf( "stream=" ) + 7 );
      this.videoUrl2 = GM.configs.fileServerUrl + "video.html?stream=" + resObj.machine_info.rtc_url2.substr( resObj.machine_info.rtc_url2.indexOf( "stream=" ) + 7 );
      let videoFrame = document.getElementById("videoFrame") as HTMLIFrameElement;
      videoFrame.setAttribute( "src", this.videoUrl1 );
    }
  }

  public backToLobby(){
    if( this.emptyCallback ) this.emptyCallback( "lobby" );
  }

  public onVideoToggle(){
    let videoFrame = document.getElementById("videoFrame") as HTMLIFrameElement;
    if( videoFrame.src == this.videoUrl1 ){
      videoFrame.setAttribute( "src", this.videoUrl2 );
      SocketIO.instance.controlSide( 2 );
      this.videoLoading = true;
    }
    else{
      videoFrame.setAttribute( "src", this.videoUrl1 );
      SocketIO.instance.controlSide( 1 );
      this.videoLoading = true;
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
      if( data.userid == User.instance.userData.id ){ // I am playing
        this.playing = true;
        this.userHeadIcon = User.instance.headIcon;
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
    if( data && data.errmsg ) trace.log( data.errmsg );
  }

  public getResault( data: any ){

  }
}

