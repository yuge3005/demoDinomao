import { stringify } from "@angular/compiler/src/util";
import { HttpRequest } from "./http-request";
import { UserDataService } from "./user-data.service";

export class SocketIO {

  private socket!: WebSocket;

  private static _socket: SocketIO;

  public static get instance(): SocketIO{
    if( !this._socket ) this._socket = new SocketIO;
    return this._socket;
  }

  private macId: string = '';

  private moving: boolean = false;

  constructor(){

    if( SocketIO._socket ){
      console.error( "singleton already initailized" );
      return;
    }

    let httpUrl: string = HttpRequest.serverUrl;
    let wsUrl: string = httpUrl.replace( ":9001", ":10000" );
    wsUrl = wsUrl.replace( "http", "ws" )
    this.socket = new WebSocket(wsUrl + "socket.io/?EIO=3&transport=websocket");

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onCLose.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onerror = this.onError.bind(this);
  }

  onOpen(){
    console.log( "onopen" );
    this.startHearbeat();
  }

  startHearbeat(){
    this.socket.send('42["login",{"userid":' + UserDataService.userData.userid + '}]');
    setInterval( this.heartBeet.bind(this), 3000 );
  }

  onCLose(){
    console.log( "onclose" );
  };

  onMessage(ev: MessageEvent){
    console.log( ev.data );
    console.log( ev );
  };

  onError(ev: Event ){
    console.log( 'websocket error', ev );
  };

  heartBeet(){
    this.socket.send( "2" );
  }

  joinRoom( macAddr: string ){
    this.macId = macAddr;
    console.log( "enter_room: " + this.macId );
    this.socket.send('42["enter_room",{"userid":' + UserDataService.userData.userid + ',"mac_addr":"' + this.macId + '"}]');
  }

  startMachin(){
    console.log( "start_gameV2: " + this.macId );
    this.socket.send('42["start_gameV2",{"userid' + UserDataService.userData.userid + ',"mac_addr":"' + this.macId + '","good_id":743}]');
  }

  move( direction: string ){
    if( this.moving ) return;
    console.log( "move_" + direction + ": " + this.macId );
    this.moving = true;
    this.socket.send('42["move_' + direction + '",{"userid' + UserDataService.userData.userid + ',"mac_addr":"' + this.macId + '","side":0}]');
  }

  stop( direction: string ){
    if( !this.moving ) return;
    console.log( direction + "_stop: " + this.macId );
    this.moving = false;
    this.socket.send('42["' + direction + '_stop",{"userid' + UserDataService.userData.userid + ',"mac_addr":"' + this.macId + '"}]');
  }
}
