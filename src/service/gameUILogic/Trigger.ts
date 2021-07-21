import { TriggerNames } from './TriggerNames';
import { PopupVo } from './../gameData/popup-vo';
import { FeatureVo } from './../gameData/featrue-vo';
import { ProductData } from './../gameData/product-data';
import { ExtenalContent } from './ExtenalContent';
import { ModalCommands } from './ModalCommands';
import { GenericModalComponent } from "src/siene/loading-and-po/popup-layer/generic-modal.component";

/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 11:44:30
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-21 12:08:32
 */
export class Trigger {

    private static firstEnterLobby: boolean = false;

    private static extenalContent: ExtenalContent;

    private static waitingModals: PopupVo[] = [];

    public static addPopupFunc: Function;
    public static loadedPopupFunc: Function;
    public static closePopupFunc: Function;

    private static enterLobbyVo: any[] = [{url: "http://127.0.0.1/first_po/" }];

    public static popupPackagePath: string;
    public static currentPopup: GenericModalComponent | null;
    public static currentPopupState: number = 0;
    public static popupData: any;
    
    public static get hasPopup(): boolean{
        return this.currentPopup != null;
    }
    public static laoded: boolean = false;

    public static lobby(){
        if( !this.firstEnterLobby ){
            this.firstEnterLobby = true;
            //enter lobby
            this.waitingModals = this.waitingModals.concat( this.extenalContent.triggers[TriggerNames.ENTER_LOBBY] );
            this.tryToshowFirstWaitingModal();
        }
        else{
            //back to lobby
        }
    }

    private static tryToshowFirstWaitingModal(){
        if( !this.hasPopup ) this.showFirstWaitingModal();
        else if( this.currentPopupState < 3 ) this.closePopup();
    }

    private static showFirstWaitingModal(){
        if( this.currentPopup ) throw new Error( "wrong popup status" );
        if( this.addPopupFunc && this.waitingModals.length ){
            let vo: PopupVo | undefined = this.waitingModals.shift();
            if( vo ){
                this.currentPopup = this.addPopupFunc( vo );
                this.currentPopupState = 1;
            }
            else throw new Error( "unepect popup vo data" );
        }
    }

    public static popupLoad(){
        if( this.loadedPopupFunc ) this.loadedPopupFunc();
    }

    public static closePopup(){
        if( this.closePopupFunc ) this.closePopupFunc();
    }

    public static popupClosed(){
        this.currentPopup = null;
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

    public static extenalContentInit( extenalContentData: any ){
        this.extenalContent = new ExtenalContent( extenalContentData );
    }

    public static get featureData(): FeatureVo[] | null{
        if( this.extenalContent && this.extenalContent.features && this.extenalContent.features.length ) return this.extenalContent.features;
        else return null;
    }

    public static openBank(){
        let vo: PopupVo = this.extenalContent.bank;
        this.waitingModals.unshift( vo );
        this.tryToshowFirstWaitingModal();
    }

    public static openSubscription(){
        let vo: PopupVo = this.extenalContent.subscription;
        this.waitingModals.unshift( vo );
        this.tryToshowFirstWaitingModal();
    }

    public static openPoByFeatureId( featureId: string ){
        let vo: PopupVo = this.extenalContent.featureWant[featureId];
        this.waitingModals.unshift( vo );
        this.tryToshowFirstWaitingModal();
    }
}
