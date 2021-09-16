/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-16 16:29:58
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-16 17:45:57
*/
import { InnerContent } from './InnerContent';
import { GoodsData } from '../gameData/goods-data';
import { Trigger } from './Trigger';
import { PopupVo } from '../gameData/popup-vo';
import { User } from '../user/User';
import { DailyBonus } from '../user/DailyBonus';
import { PopupStatus } from './PopupStatus';
export class GamePopupManager {

    public waitingModals: PopupVo[] = [];
    private firstPopupClose: boolean = false;

    public lobbyCallback: Function | null = null;

    public addPopupFunc: Function | null = null;
    public loadedPopupFunc: Function | null = null;
    public closePopupFunc: Function | null = null;

    constructor(){}

    private tryToshowFirstWaitingModal(){
        if( this.waitingModals.length == 0 ) return;
        if( !Trigger.hasPopup ) this.showFirstWaitingModal();
        else if( Trigger.currentPopupState < 3 ) this.closePopup();
    }

    public openBank(){
        let vo: PopupVo = Trigger.extenalContent.bank;
        this.waitingModals.unshift( vo );
        this.tryToshowFirstWaitingModal();
    }

    public openSubscription(){
        let vo: PopupVo = Trigger.extenalContent.subscription;
        this.waitingModals.unshift( vo );
        this.tryToshowFirstWaitingModal();
    }

    public openPoByFeatureId( featureId: string ){
        let vo: PopupVo = Trigger.extenalContent.featureWant[featureId];
        this.waitingModals.unshift( vo );
        this.tryToshowFirstWaitingModal();
    }

    public showDailyBonus(){
        this.waitingModals.unshift( InnerContent.dailyBonus );
        this.tryToshowFirstWaitingModal();
    }

    public openCategory( featureId: string ){
        if( Trigger.categoryCallback ) Trigger.categoryCallback( featureId );
    }

    public forceUpdate( url: string ){
        this.waitingModals.unshift( InnerContent.forceUpdate( url ) );
    }

    public showProductInfo( product: GoodsData ){
        this.waitingModals.unshift( InnerContent.productInfo( product ) );
        this.tryToshowFirstWaitingModal();
    }

    private showPopups( popups: PopupVo[] ): boolean{
        this.waitingModals = this.waitingModals.concat( popups );
        let hasPopup: boolean = this.waitingModals.length > 0;
        this.tryToshowFirstWaitingModal();
        return hasPopup;
    }

    public enterLobby( enterLobbyPopups: PopupVo[] ): boolean{
        if( User.instance.isNew ) this.waitingModals.push( InnerContent.welcomeBonus );
        if( !DailyBonus.instance.hasDailyBonus ) this.waitingModals.push( InnerContent.dailyBonus );
        
        return this.showPopups(enterLobbyPopups);
    }

    public backToLobby( backToLobbyPopups: PopupVo[] ): boolean{
        return this.showPopups(backToLobbyPopups);
    }

    public ooc( oocPopups: PopupVo[] ){
        return this.showPopups(oocPopups);
    }

    public showFirstWaitingModal(){
        if( Trigger.currentPopup ) throw new Error( "wrong popup status" );
        if( this.addPopupFunc && this.waitingModals.length ){
            let vo: PopupVo | undefined = this.waitingModals.shift();
            if( vo ){
                Trigger.currentPopup = this.addPopupFunc( vo );
                Trigger.currentPopupState = PopupStatus.LOADING;
            }
            else throw new Error( "unexpect popup vo data" );
        }
    }

    public popupClosed(){
        Trigger.currentPopup = null;
        Trigger.currentPopupState = PopupStatus.NO_POPUP;

        if( this.waitingModals.length ) setTimeout(() => {
            this.tryToshowFirstWaitingModal();
        }, 30 ); 
    }

    public popupLoad(){
        Trigger.currentPopupState = PopupStatus.LOADED;
        if( this.loadedPopupFunc ) this.loadedPopupFunc();
        if( this.lobbyCallback ){
            this.lobbyCallback();
            this.lobbyCallback = null;
        }
    }

    public closePopup(){
        Trigger.currentPopupState = PopupStatus.CLOSING;
        if( this.closePopupFunc ) this.closePopupFunc();
        if( !this.firstPopupClose ){
            this.firstPopupClose = true;
            Trigger.lobbySoundStart();
        }
    }
}
