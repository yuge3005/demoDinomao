import { trace } from './../../../service/trace';
import { MainPage } from './../../dynamic-layer/MainPage.component';
import { Component, OnDestroy } from '@angular/core';
import { MachineData } from 'src/service/machine-data';
import { SocketIO } from 'src/service/socketIO';
import { HttpClient } from '@angular/common/http';
import { UIComponent } from '../../UIComponent';
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

  private loadingStript!: HTMLScriptElement;
  private loadingScriptList: string[] = [];

  turnCameraBtn!: BitmapData;
  constructor(public http: HttpClient, private user: UserDataService) {
    super(http);
    this.textureUrl = "assets/control_bar/control_bar.json";
  }

  initUI() {
    this.loadingScriptList = [
      "https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/6.4.0/adapter.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js",
      "https://direct.hermetix.io/video.min.js",
      "https://direct.hermetix.io/streamingtest.min.js"
    ];
    this.loadSriptInList();

    this.turnCameraBtn = this.textureData.getTexture( "btn_return", 29, 133 );

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

  private loadSingleScript( src: string ) {
    var s: HTMLScriptElement = document.createElement('script');
    s.async = false;
    s.src = src;
    s.addEventListener('load', this.scriptLoaded.bind( this ), false);
    document.body.appendChild(s);
    this.loadingStript = s;
  };

  private scriptLoaded(){
    const s = this.loadingStript;
    // if( s && s.parentNode ) s.parentNode.removeChild(s);
    s.removeEventListener('load', this.scriptLoaded.bind( this ), false);
    this.loadSriptInList();
  }

  private loadSriptInList(){
    let scriptUrl: string = this.loadingScriptList.shift() || "";
    if( scriptUrl ) this.loadSingleScript( scriptUrl );
    else setTimeout( this.getVideo.bind(this), 200 );
  }

  private getVideo(){
    let vd: HTMLVideoElement = document.getElementsByTagName( "video" )[0];
    if( vd ) this.setVideoStyle( vd );
    else setTimeout( this.getVideo.bind(this), 200 );
  }

  private setVideoStyle( vd: HTMLVideoElement ){
    trace.log( "get video" );
    trace.log( vd );
  }

  private getMachineData( resObj: any ){
    if( resObj && resObj.machine_info && resObj.machine_info.mac_addr ){
      this.data.mac_addr = resObj.machine_info.mac_addr;
      this.data.mac_id = resObj.machine_info.mac_id;
      SocketIO.instance.joinRoom( this.data.mac_addr, this.onRoomCmd );
    }
  }
}

