import { ControlDirection } from '../gameData/ControlDirection';
import { GM } from '../gameSetting/GM';
import { trace } from '../gameUILogic/trace';

export class SocketIO {

  private socket!: WebSocket;

  private static _socket: SocketIO;

  public static get instance(): SocketIO{
    if( !this._socket ) this._socket = new SocketIO;
    return this._socket;
  }

  private macId: string = '';
  private intervalId: any;
  private vwSide: number = 0;

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

    this.socket = new WebSocket(GM.configs.wsUrl + "socket.io/?EIO=3&transport=websocket");

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
    alert( "connection closed, back to lobby" );
    trace.report( "connect error" );
    window.location.reload();
  };

  onMessage(ev: MessageEvent){
    if( typeof( ev.data ) != "string" ){
      trace.log( "not string" );
      trace.log( ev.data );
      return;
    }
    if( this.cmdFuction ){
      let evStr: string = ev.data as string;
      let objStartIndex: number = evStr.indexOf( "[" );
      if( objStartIndex >= 0 ) evStr = evStr.substring( objStartIndex );
      else return;
      try{
        let dataArr: any[] = JSON.parse( evStr );
        let cmd: string = dataArr[0];
        let data: any = dataArr[1];
        this.cmdFuction( cmd, data )
      }
      catch(e){
        console.error(e)
      }
    }
  };

  onError(ev: Event ){
    trace.log( 'websocket error' );
  };

  heartBeet(){
    this.socket.send( "2" );
  }

  joinRoom( macAddr: string, cmdCallback: Function ){
    this.macId = macAddr;
    this.cmdFuction = cmdCallback;
    this.vwSide = 1;
    trace.log( '42["enter_room",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '"}]' );
    this.socket.send('42["enter_room",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '"}]');
  }

  controlSide( side: number ){
    this.vwSide = side;
  }

  startMachin( goodId: number ){
    trace.log( '42["start_gameV2",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '","good_id":' + goodId + '}]');
    this.socket.send('42["start_gameV2",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '","good_id":' + goodId + '}]');
  }

  move( direction: string ){
    if( this.moving ) return;
    this.moving = true;
    this.direction = direction;
    this.continueMove();
    this.intervalId = setInterval( this.continueMove.bind(this), 200 );
  }

  getWawa(){
    this.socket.send('42["move_down",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '","power":88}]');
  }

  stop( direction: string ){
    if( !this.moving ) return;
    this.moving = false;
    clearInterval( this.intervalId );
    this.socket.send('42["' + direction + '_stop",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '"}]');
  }

  private continueMove(){
    let direction = this.direct2( this.direction, this.vwSide );
    this.socket.send('42["move_' + direction + '",{"userid":' + this._userID + ',"mac_addr":"' + this.macId + '","side":' + this.vwSide + '}]');
  }

  private direct2( str: string, direct: number = 1 ): string{
    if( direct == 2 ){
        let newStr: string = "";
        switch(str){
            case ControlDirection.LEFT: newStr = ControlDirection.DOWN;
                break;
            case ControlDirection.UP: newStr = ControlDirection.LEFT;
                break;
            case ControlDirection.RIGHT: newStr = ControlDirection.UP;
                break;
            case ControlDirection.DOWN: newStr = ControlDirection.RIGHT;
                break;
        }
        return newStr;
    }
    else return str;
  }
}
