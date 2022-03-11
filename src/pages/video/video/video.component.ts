import { GM, Loading, FacebookData, GoodsData, SocketIO, GameHttp, User, MainPage, trace, Trigger, GamePlatform, WebPages } from '../../../service/dinomao-game.module';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application, Rectangle, StyleX } from '../../../basicUI/basic-ui.module';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html'
})
export class VideoComponent extends MainPage {
  data!: GoodsData;

  playing: boolean = false;
  playAtLeastOneTime: boolean = false;

  firstCmd: boolean = false;
  usersCount: number = 0;
  viewRect: Rectangle = new Rectangle().init( 0, 95, 83, 15 );
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

  private recordStartTimerStamp: number = 0;

  public get iframeHeight(): number{
    return this.pageHeight -520 + ( (Application.system.isApp() && Application.system.isIOS) ? 25 : 0 );
  }

  public get tvPositionY(): number{
    return Math.round( this.iframeHeight * 0.5 ) - 76;
  }

  private timeoutTimer: any;

  constructor( public http: HttpClient ) {
      super();
      this.textureUrl = "assets/video_ui/control_bar/control_bar.json";
  }

  initUI() {
    this.ui.backToLobbyBtn = this.textureData.getTexture( "btn_return", 29, 133 );

    let obStr: string = GM.interfaceString;
    let dataObject: string = "json=" + JSON.stringify({"good_id":this.data.good_id});
    new GameHttp().loadData( "cmd.php?action=get_machine" + obStr, this.getMachineData.bind(this), "POST", dataObject );

    window.addEventListener('message', this.videoMessage.bind(this), false);
    Trigger.game( true );

    let errorReporter = trace.error;
    eval( "document.getElementById('videoFrame').contentWindow.console.error = errorReporter" );

    this.timeoutTimer = setTimeout( this.timeoutReport.bind( this ), 12000 );

    this.sty.playingUser = StyleX.combine( StyleX.borderRadius(10), StyleX.setItemRect( 11, 20, 60, 60 ) );
    this.sty.videoFrameContainer = StyleX.setItemPosition( 0, 90 );
    this.sty.playerHead = StyleX.combine( StyleX.borderRadius(25), StyleX.setItemRect( 645, 130, 83, 133 ), StyleX.backgroundColor(0,0.7) );
  }

  timeoutReport(){
    clearTimeout( this.timeoutTimer );
    this.timeoutTimer = null;

    Loading.status = 2;
    Trigger.popupManager.showVideoError( "Oops! The live video can not be played, please try using another network(4G/5G/Wi-Fi)." );
    trace.report( "no video" );
  }

  setData( data: any = null ){
    this.data = data;
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.videoMessage.bind(this), false );
    Trigger.game( false );

    if( this.playing ) this.stopRecord();
    clearTimeout( this.timeoutTimer );

    if( !this.playAtLeastOneTime )trace.report( "LeaveRoomWithoutPlay", "" + this.data.mac_id );
  }

  videoMessage( e: MessageEvent ){
    let data: any = JSON.parse( e.data );
    if( data?.value == "weLoaded" ){
      Loading.status = 1;
    }
    if( data?.value == "videoLoaded" ){
      Loading.status = 2;

      clearTimeout( this.timeoutTimer );
      this.timeoutTimer = null;
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
      trace.log( "cmd:" + cmd )
      trace.log( data )
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

      trace.report( "enter machine", "" + this.data.mac_id );
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
    if( this.timeoutTimer ){
      clearTimeout( this.timeoutTimer );
      this.timeoutTimer = setTimeout( this.timeoutReport.bind( this ), 12000 );
    }
    Loading.status = 1;
  }

  /***************************************************************************************/

  public playingUser: any = null;

  private setUserHead( headUrl: string ): void{
    if( headUrl ) this.userHeadIcon = headUrl;
    else this.userHeadIcon = "assets/default_head.png";
  }

  private updatePlayerInfo( data: any ){
    if( data.playerInfo ){
      this.playingUser = data;
      if( data.playerInfo.facebook_id ) this.setUserHead( FacebookData.getFacebookHeadImageUrlById( data.playerInfo.facebook_id, 60 ) );
      else this.setUserHead( data.playerInfo.headimg );
    }
    else this.playingUser = null;
  }

  private updateRoomInfo( data: any ){
    if( data ) this.usersCount = data.usersCount;
  }

  private resetGameState( data: any ){
    if( data.room_state == 0 ){ // no one playing
      this.playingUser = null;
      if( this.playing ) this.stopRecord();
      this.playing = false;
      this.setUserHead( "" );
    }
    else if( data.room_state == 1 ){
      if( data.userid == User.instance.userData.id ){ // I am playing
        if( !this.playing ){
          this.startRecord();
          this.reduceCoins();
        }
        this.playing = true;
        this.playAtLeastOneTime = true;
        this.setUserHead( User.instance.headIcon );
      }
      else{
        if( this.playing ) this.stopRecord();
        this.playing = false; // other's playing
        if( this.playingUser == null ) this.playingUser = { id: data.userid };
      }
    }
  }

  public startFail( data: any ){
    if( data?.errmsg ) trace.log( data.errmsg );
  }

  public getResault( data: any ){
    if( data.result ){
      if( User.instance.isFree ) User.instance.notFreeAnyMore();
      Trigger.popupManager.showResultWin( this.data.img, this.data.price, this.startMachine.bind( this ) );
    }
    else{
      Trigger.popupManager.showResultFailed( data.score, this.data.isFree == "1" && User.instance.isFree ? 0 : this.data.price, this.startMachine.bind( this ) );
    }
    if( data.score ) User.instance.score += data.score;
  }

  private reduceCoins(){
    if( this.data.isFree == "1" && User.instance.isFree ) return;
    User.instance.coins -= this.data.price;
  }

  private recordUrl( start: boolean ){
    return "https://direct.skylynx.io/" + ( start ? "start/" : "stop/" ) + this.videoUrl1 + "/" + User.instance.userData.id + this.recordStartTimerStamp;
  }

  private get playUrl(){
    return "https://direct.skylynx.io/recording/" + User.instance.userData.id + this.recordStartTimerStamp + ".mp4";
  }

  startRecord(){
    this.recordStartTimerStamp = new Date().getTime();
    this.http.get( this.recordUrl( true ) ).toPromise();
  }

  stopRecord(){
    this.http.get( this.recordUrl( false ) ).toPromise();

    let dataObject: string = JSON.stringify({mac_addr:this.data.mac_addr,video_url:this.playUrl});
    new GameHttp().loadData( "apis/v1/user/videos?" + GM.interfaceString, this.afterRecord.bind(this), "POST", dataObject );
  }

  afterRecord( data: any ){
    if( data.code == 0 ) trace.log( "video record save success" );
  }
}

