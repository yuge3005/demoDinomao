import { trace } from './trace';
import { HttpRequest } from "./http-request";

export class SocketIO {

  private socket!: WebSocket;

  private static _socket: SocketIO;

  public static get instance(): SocketIO{
    if( !this._socket ) this._socket = new SocketIO;
    return this._socket;
  }

  private macId: string = '';
  private intervalId: any;

  private moving: boolean = false;
  private direction: string = '';

  private cmdFuction!: Function;

  private _userID: number = 0;
  public set user_Id( value: number ){
    if( this._userID ) throw new Error( "user id can only set once" );
    this._userID = value;
  }

  constructor(){

    if( SocketIO._socket ){
      console.error( "singleton already initailized" );
      return;
    }

    let wsUrl: string = "wss://staging.dinomao.com:10000/";
    this.socket = new WebSocket(wsUrl + "socket.io/?EIO=3&transport=websocket");

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onCLose.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onerror = this.onError.bind(this);
  }

  onOpen(){
    trace.log( "onopen" );
    this.startHearbeat();
  }

  startHearbeat(){
    this.socket.send('42["login",{"userid":' + this._userID + '}]');
    setInterval( this.heartBeet.bind(this), 3000 );
  }

  onCLose(){
    trace.log( "onclose" );
  };

  onMessage(ev: MessageEvent){
    trace.log( ev.data );
    if( this.cmdFuction ){
      let evStr: string = ( ev.data as string ).replace( /\d+/, "" );
      if( evStr == "" ) return;
      try{
        let dataArr: any[] = JSON.parse( evStr );
        let cmd: string = dataArr[0];
        trace.log( cmd );
        let data: any = dataArr[1];
        trace.log( data );
      }
      catch(e){
        trace.log(e)
      }

      // if( cmd == "appBarrage" ){

      // }
    }
  };

  onError(ev: Event ){
    trace.log( 'websocket error', ev );
  };

  heartBeet(){
    this.socket.send( "2" );
  }

  joinRoom( macAddr: string, cmdCallback: Function ){
    this.macId = macAddr;
    this.cmdFuction = cmdCallback;
    trace.log( '42["enter_room",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '"}]' );
    this.socket.send('42["enter_room",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '"}]');
  }

  startMachin(){
    trace.log( '42["start_gameV2",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '","good_id":688}]');
    this.socket.send('42["start_gameV2",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '","good_id":688}]');
  }

  move( direction: string ){
    if( this.moving ) return;
    trace.log( '42["move_' + direction + '",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '","side":0}]' );
    this.moving = true;
    this.direction = direction;
    this.continueMove();
    this.intervalId = setInterval( this.continueMove.bind(this), 300 );
  }

  getWawa(){
    trace.log( '42["move_down",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '","power":88}]' );
    this.socket.send('42["move_down",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '","power":88}]');
  }

  stop( direction: string ){
    if( !this.moving ) return;
    trace.log( '42["' + direction + '_stop",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '"}]' );
    this.moving = false;
    clearInterval( this.intervalId );
    this.socket.send('42["' + direction + '_stop",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '"}]');
  }

  private continueMove(){
    this.socket.send('42["move_' + this.direction + '",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '","side":0}]');
  }
}
