/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 11:44:30
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-14 12:02:30
 */
export class Trigger {

    private static firstEnterLobby: boolean = false;

    public static triggerFunc: Function;

    private static enterLobbyVo: any[] = [{url: "http://127.0.0.1/first_po/" }];

    public static lobby(){
        if( !this.firstEnterLobby ){
            this.firstEnterLobby = true;
            //enter lobby
            if( this.triggerFunc ) this.triggerFunc( this.enterLobbyVo[0] );
        }
        else{
            //back to lobby
        }
    }
}
