import { GamePopupManager } from './GamePopupManager';
import { SoundManager } from '../../basicUI/basic-ui.module';
import { Purchase } from './Purchase';
import { PopupStatus } from './PopupStatus';
import { TriggerNames } from './TriggerNames';
import { PopupVo } from '../gameData/popup-vo';
import { FeatureVo } from '../gameData/featrue-vo';
import { ExtenalContent } from './ExtenalContent';
import { ModalCommands } from './ModalCommands';
import { GenericModalComponent } from "../ui/generic-modal.component";

/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 11:44:30
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-21 12:10:29
 */
export class Trigger {

    private static firstEnterLobby: boolean = false;

    public static extenalContent: ExtenalContent;

    public static popupPackagePath: string;
    public static currentPopup: GenericModalComponent | null;
    public static currentPopupState: number = 0;
    public static popupData: PopupVo;

    public static popupManager: GamePopupManager = new GamePopupManager;
    
    public static get hasPopup(): boolean{
        return this.currentPopup != null;
    }
    public static get laoded(): boolean{
        return this.currentPopupState == PopupStatus.LOADED;
    }

    public static get bankData(): any[]{
        return this.extenalContent.bank.products || [];
    }

    public static fly: Function;
    public static gotoPage: Function;
    public static categoryCallback: Function | null;

    public static lobby( lobbyCallback: Function ){
        let hasPopup: boolean;
        if( !this.firstEnterLobby ){
            this.firstEnterLobby = true;
            hasPopup = this.popupManager.enterLobby( this.extenalContent.getTrigger( TriggerNames.ENTER_LOBBY ) );
        }
        else{
            hasPopup = this.popupManager.backToLobby( this.extenalContent.getTrigger( TriggerNames.BACK_TO_LOBBY ) );
        }
        if( !hasPopup ) lobbyCallback();
        else this.popupManager.lobbyCallback = lobbyCallback;
    }

    public static ooc(){
        this.popupManager.ooc( this.extenalContent.getTrigger( TriggerNames.OUT_OF_COINS ) )
    }

    public static lobbySoundStart(){
        SoundManager.play( "assets/sound/bgHall.mp3", true );
        let sdm = SoundManager;
        eval( "document.appPause = sdm.musicPause" );
        eval( "document.appResume = sdm.musicResume" );
    }

    public static modalCommand( cmd: string, data: any = null ){
        switch( cmd ){
            case ModalCommands.BUY_PO:
                Purchase.buy( data );
                break;
            case ModalCommands.COLLECT_DAILY:
                break;
            case ModalCommands.BUY_BANK:
                Purchase.buy( data );
                break;
            case ModalCommands.BUY_VIP:
                Purchase.buy( data, 1 );
                break;
        }
    }

    public static extenalContentInit( extenalContentData: any ){
        this.extenalContent = new ExtenalContent( extenalContentData );
    }

    public static get featureData(): FeatureVo[] | null{
        if( this.extenalContent && this.extenalContent.features && this.extenalContent.features.length ) return this.extenalContent.features;
        else return null;
    }

    public static logout(){
        localStorage.removeItem( "user_account_info" );
        window.location.href = window.location.origin + window.location.pathname;
    }
}
