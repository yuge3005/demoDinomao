import { ModalCommands } from './ModalCommands';
import { GenericModalComponent } from "src/siene/loading-and-po/generic-modal/generic-modal.component";

/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 11:44:30
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-16 11:31:09
 */
export class Trigger {

    private static firstEnterLobby: boolean = false;

    public static addPopupFunc: Function;
    public static loadedPopupFunc: Function;
    public static closePopupFunc: Function;

    private static enterLobbyVo: any[] = [{url: "http://127.0.0.1/first_po/" }];

    public static popupPackagePath: string;
    public static currentPopup: GenericModalComponent;
    public static popupData: any;
    
    public static hasPopup: boolean = false;
    public static laoded: boolean = false;

    public static lobby(){
        if( !this.firstEnterLobby ){
            this.firstEnterLobby = true;
            //enter lobby
            if( this.addPopupFunc ) this.addPopupFunc( this.enterLobbyVo[0] );
        }
        else{
            //back to lobby
        }
    }

    public static popupLoad(){
        if( this.loadedPopupFunc ) this.loadedPopupFunc();
    }

    public static closePopup(){
        if( this.closePopupFunc ) this.closePopupFunc();
    }

    public static popupClosed(){
        this.hasPopup = false;
    }

    public static modalCommand( cmd: string, data: any = null ){
        switch( cmd ){
            case ModalCommands.BUY_PO:
                break;
            case ModalCommands.COLLECT_DAILY:
                break;
            case ModalCommands.BUY_BANK:
                break;
        }
    }
}
