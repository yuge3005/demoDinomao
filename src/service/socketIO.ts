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
    console.log( "enter_room" )
    this.socket.send('42["enter_room",{"userid":' + UserDataService.userData.userid + ',"mac_addr":"' + macAddr + '"}]');
  }
}
