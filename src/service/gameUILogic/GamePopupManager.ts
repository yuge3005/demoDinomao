import { PopupVo } from './../gameData/popup-vo';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-16 16:29:58
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-16 17:10:21
*/
import { InnerContent } from './InnerContent';
import { GoodsData } from '../gameData/goods-data';
import { Trigger } from './Trigger';
import { PopupVo } from '../gameData/popup-vo';
import { User } from '../user/User';
import { DailyBonus } from './../user/DailyBonus';
export class GamePopupManager {

    public waitingModals: PopupVo[] = [];

    constructor(){}

    private tryToshowFirstWaitingModal(){
        if( this.waitingModals.length == 0 ) return;
        if( !Trigger.hasPopup ) Trigger.showFirstWaitingModal();
        else if( Trigger.currentPopupState < 3 ) Trigger.closePopup();
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

    public enterLobby( enterLobbyPopups: PopupVo[] ): boolean{
        if( User.instance.isNew ) this.waitingModals.push( InnerContent.welcomeBonus );
        if( !DailyBonus.instance.hasDailyBonus ) this.waitingModals.push( InnerContent.dailyBonus );
        
        this.waitingModals = this.waitingModals.concat( enterLobbyPopups );
        let hasPopup: boolean = this.waitingModals.length > 0;
        this.tryToshowFirstWaitingModal();
        return hasPopup;
    }

    public backToLobby( backToLobbyPopups: PopupVo[] ): boolean{
        this.waitingModals = this.waitingModals.concat( backToLobbyPopups );
        let hasPopup: boolean = this.waitingModals.length > 0;
        this.tryToshowFirstWaitingModal();
        return hasPopup;
    }

    public ooc( oocPopups: PopupVo[] ){
        this.waitingModals = this.waitingModals.concat( oocPopups );
        let hasPopup: boolean = this.waitingModals.length > 0;
        this.tryToshowFirstWaitingModal();
        return hasPopup;
    }
}
