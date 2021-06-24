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
  constructor(public http: HttpClient, private user: UserDataService) {
    super(http);
    this.textureUrl = "assets/control_bar/control_bar.json";
  }

  initUI() {
    this.backToLobbyBtn = this.textureData.getTexture( "btn_return", 29, 133 );

    let obStr: string = "&uid=" + UserDataService.userData.id;
    obStr += "&network=" + this.user.getAccountInfo( "login_type");
    obStr += "&access_token=" + this.user.getAccountInfo( "access_token");
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
    SocketIO.instance.startMachin();
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

  }

  private getMachineData( resObj: any ){
    if( resObj && resObj.machine_info && resObj.machine_info.mac_addr ){
      this.data.mac_addr = resObj.machine_info.mac_addr;
      this.data.mac_id = resObj.machine_info.mac_id;
      SocketIO.instance.joinRoom( this.data.mac_addr, this.onRoomCmd );
    }
  }

  public backToLobby(){
    if( this.emptyCallback ) this.emptyCallback( "lobby" );
  }

  public onVideoToggle(){
    let videoFrame = document.getElementById("videoFrame") as HTMLIFrameElement;
    if( videoFrame.src == "https://direct.hermetix.io/video.html?stream=1" ) videoFrame.setAttribute( "src", "https://direct.hermetix.io/video.html?stream=2" );
    else videoFrame.setAttribute( "src", "https://direct.hermetix.io/video.html?stream=1" );
  }
}

