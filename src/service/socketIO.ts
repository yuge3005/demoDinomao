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

  private cmdFuction!: Function;

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
    if( this.cmdFuction ){
      let evStr: string = ( ev.data as string ).replace( /\d+/, "" );
      if( evStr == "" ) return;
      try{
        let dataArr: any[] = JSON.parse( evStr );
        let cmd: string = dataArr[0];
        console.log( cmd );
        let data: any = dataArr[1];
        console.log( data );
      }
      catch(e){
        console.log(e)
      }

      // if( cmd == "appBarrage" ){

      // }
    }
  };

  onError(ev: Event ){
    console.log( 'websocket error', ev );
  };

  heartBeet(){
    this.socket.send( "2" );
  }

  joinRoom( macAddr: string, cmdCallback: Function ){
    this.macId = macAddr;
    this.cmdFuction = cmdCallback;
    console.log( '42["enter_room",{"userid":' + UserDataService.userData.userid + ',"mac_addr":"' + this.macId + '"}]' );
    this.socket.send('42["enter_room",{"userid":' + UserDataService.userData.userid + ',"mac_addr":"' + this.macId + '"}]');
  }

  startMachin(){
    console.log( '42["start_gameV2",{"userid":' + UserDataService.userData.userid + ',"mac_addr":"' + this.macId + '","good_id":688}]');
    this.socket.send('42["start_gameV2",{"userid":' + UserDataService.userData.userid + ',"mac_addr":"' + this.macId + '","good_id":688}]');
  }

  move( direction: string ){
    if( this.moving ) return;
    console.log( '42["move_' + direction + '",{"userid":' + UserDataService.userData.userid + ',"mac_addr":"' + this.macId + '","side":0}]' );
    this.moving = true;
    this.socket.send('42["move_' + direction + '",{"userid":' + UserDataService.userData.userid + ',"mac_addr":"' + this.macId + '","side":0}]');
  }

  stop( direction: string ){
    if( !this.moving ) return;
    console.log( '42["' + direction + '_stop",{"userid":' + UserDataService.userData.userid + ',"mac_addr":"' + this.macId + '"}]' );
    this.moving = false;
    this.socket.send('42["' + direction + '_stop",{"userid":' + UserDataService.userData.userid + ',"mac_addr":"' + this.macId + '"}]');
  }
}
