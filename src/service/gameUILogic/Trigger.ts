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
 * @LastEditTime: 2021-07-21 10:09:48
 */
export class Trigger {

    private static firstEnterLobby: boolean = false;

    private static extenalContent: ExtenalContent;

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

    public static extenalContentInit( extenalContentData: any ){
        this.extenalContent = new ExtenalContent( extenalContentData );
    }

    public static get featureData(): FeatureVo[] | null{
        if( this.extenalContent && this.extenalContent.features && this.extenalContent.features.length ) return this.extenalContent.features;
        else return null;
    }

    public static openBank(){
        
    }

    public static openSubscription(){
        
    }

    public static openPoByFeatureId( featureId: string ){
        
    }
}
