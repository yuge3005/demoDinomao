/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 11:44:30
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-14 11:48:09
 */
export class Trigger {

    private static firstEnterLobby: boolean = false;

    public static lobby(){
        if( !this.firstEnterLobby ){
            this.firstEnterLobby = true;
            //enter lobby
        }
        else{
            //back to lobby
        }
    }
}
