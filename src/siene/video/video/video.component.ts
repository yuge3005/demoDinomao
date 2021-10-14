import { GM, Loading, FacebookData, GoodsData, SocketIO, HttpRequest, User, MainPage, trace, Trigger, GamePlatform, WebPages } from '../../../service/dinomao-game.module';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application, UIComponent, Rectangle, BitmapData, SoundManager } from '../../../basicUI/basic-ui.module';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent extends MainPage {
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
  currentUrl!: string;

  public get iframeHeight(): number{
    return this.pageHeight -90 -430 + ( (Application.system.isApp() && Application.system.isIOS) ? 25 : 0 );
  }

  public get tvPositionY(): number{
    return Math.round( this.iframeHeight * 0.5 ) - 76;
  }

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

    SoundManager.play( "assets/sound/bgm0" + Math.floor( Math.random() * 3 + 1 ) + ".mp3", true );
  }

  setData( data: any = null ){
    this.data = data;
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.videoMessage.bind(this), false );

    SoundManager.play( "assets/sound/bgHall.mp3", true );
  }

  videoMessage( e: MessageEvent ){
    let data: any = JSON.parse( e.data );
    if( data?.value == "weLoaded" ){
      Loading.status = 1;
    }
    if( data?.value == "videoLoaded" ){
      Loading.status = 2;
    }
    if( data?.value == "noVideo" ){
      alert( "no video" );
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
    if( resObj?.machine_info?.mac_addr ){
      this.data.mac_addr = resObj.machine_info.mac_addr;
      this.data.mac_id = resObj.machine_info.mac_id;
      SocketIO.instance.joinRoom( this.data.mac_addr, this.onRoomCmd.bind(this) );

      this.videoUrl1 = resObj.machine_info.rtc_url1.substr( resObj.machine_info.rtc_url1.indexOf( "stream=" ) + 7 );
      this.videoUrl2 = resObj.machine_info.rtc_url2.substr( resObj.machine_info.rtc_url2.indexOf( "stream=" ) + 7 );
      this.reportStream( this.videoUrl1 );
    }
  }

  private reportStream( stream: string ){
    this.currentUrl = stream;
    if( GM.platForm == GamePlatform.ANDROID && Application.system.isMobile() ){
      eval( "androidLogger.video(stream)" );
    }
    else if( Application.system.isIOS ){
      eval( "window.webkit.messageHandlers.videoMessage.postMessage(stream)" );
    }
    else{
      eval( "document.getElementById('videoFrame').contentWindow.playVideo(" + stream + ")" );
    }
  }

  public backToLobby(){
    Trigger.gotoPage( WebPages.LOBBY );
  }

  public onVideoToggle(){
    if( this.currentUrl == this.videoUrl1 ){
      this.reportStream( this.videoUrl2 );
      SocketIO.instance.controlSide( 2 );
    }
    else{
      this.reportStream( this.videoUrl1 );
      SocketIO.instance.controlSide( 1 );
    }
    Loading.status = 1;
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
    if( data?.errmsg ) trace.log( data.errmsg );
  }

  public getResault( data: any ){

  }
}

