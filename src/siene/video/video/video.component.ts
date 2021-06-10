import { MainPage } from './../../dynamic-layer/MainPage.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MachineData } from 'src/service/machine-data';
import { SocketIO } from 'src/service/socketIO';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, MainPage, OnDestroy {
  pageHeight: number = 0;
  emptyCallback: Function | null = null;

  streamUrl: string = "";
  data!: MachineData;

  private loadingStript!: HTMLScriptElement;
  private loadingScriptList: string[] = [];
  constructor() { }

  ngOnInit() {
    SocketIO.instance.joinRoom( this.data.mac_addr, this.onRoomCmd );
    this.loadingScriptList = [
      "https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/6.4.0/adapter.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js",
      "https://direct.hermetix.io/video.min.js",
      "https://direct.hermetix.io/streamingtest.min.js"
    ];
    this.loadSriptInList();
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
    console.log( "get video" );
    console.log( vd );
  }
}
