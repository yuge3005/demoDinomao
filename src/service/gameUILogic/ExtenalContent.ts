import { PopupVoType } from './../gameData/popup-vo-type';
import { FeatureVo } from './../gameData/featrue-vo';
import { PopupVo } from './../gameData/popup-vo';
import { ProductData } from './../gameData/product-data';
import { trace } from './trace';
import { ExternalData } from './../gameData/external-data';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-16 15:02:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-16 11:52:21
 */
export class ExtenalContent {

    bank!: PopupVo;
    subscription!: PopupVo;
    
    triggers: {[key: string]: PopupVo[];} = {};
    featureWant: {[key: string]: PopupVo;} = {};
    features: FeatureVo[] = [];
    
    constructor( data: any ){
        let list = data.list;

        if ( list && list.length > 0 ) {
            for ( let i = 0; i < list.length; i++ ) {
                this.getContent( list[i] );
            }
        }
    }

    private getContent( item: ExternalData ){
        if( !item || !item.type ) alert( "external content data error" );

        let artPath: string = this.getItemArtPath( item.art );
        if( !artPath ){
            trace.log( "external content has no art" );
            return;
        }

        if( item.type === PopupVoType.POPUP && item.triggers && item.triggers.featured ){ // lobby ads feature
            if( artPath.indexOf( ".png" ) < 0 && artPath.indexOf( ".jpg" ) < 0 ){
                trace.log( "feature has no art" );
                return;
            }
            this.addFearue( item.triggers, artPath );
        }
        else if( item.type === PopupVoType.PO || item.type === PopupVoType.POPUP || item.type === PopupVoType.SUBSCRIPTION ){
            let folderName: string = artPath.replace(/.*\/(.*)\//, "$1");
            if (folderName === "" || folderName === "assets"){
                trace.log( "external content has no art" );
                return;
            }
            this.registTrigger( item.triggers, folderName, artPath, item.type, item.products, item.feature_id );
        }
    }

    getItemArtPath( artArr: any[] ): string{
        let path: string = "";
        if( artArr && artArr.length ){
            let enPath: any = artArr[0];
            if( enPath.file && enPath.file.file_id_canvas ){
                path = enPath.file.file_id_canvas;
            }
        }
        return path;
    }
    
    registTrigger( trigger: any, folderName: string, path: string, type: string, products: ProductData[], featureId: string ){
        if( type == PopupVoType.BANK ) this.bank = { type: type, art: path, products: products };
        if( type == PopupVoType.SUBSCRIPTION ) this.subscription = { type: type, art: path + folderName + ".json", products: products };
        if( type == PopupVoType.PO || type == PopupVoType.POPUP ){
            let tr: { [key: string]: any } = trigger;
            let po: PopupVo = { type: type, art: path + folderName + ".json", products: products };
            for( let ob in tr ){
                if( tr[ob] ){
                    if( !this.triggers[ob] ) this.triggers[ob] = [];
                    this.triggers[ob].push( po );
                    if( featureId ) this.featureWant[featureId] = po;
                }
            }
        }
    }

    public addFearue( trigger: any, path: string ){
        this.features.push( { art: path, behaviour: trigger.click_behaviour, featured: trigger.featured } );
    }

    public getTrigger( triggerName: string ): PopupVo[]{
        let triggerVo: PopupVo[] = this.triggers[triggerName];
        if( triggerVo ) return triggerVo;
        return [];
    }
}
