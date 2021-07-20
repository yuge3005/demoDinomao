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
 * @LastEditTime: 2021-07-20 12:15:48
 */
export class ExtenalContent {

    bank!: PopupVo;
    subscription!: PopupVo;
    
    triggers: {[key: string]: PopupVo[];} = {};
    featrueWant: {[key: string]: PopupVo;} = {};
    
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

        if( item.type === "popup" && item.triggers && item.triggers.featured ){ // lobby ads feature
            this.addFearue(  );
        }
        else{
            let folderName: string = artPath.replace(/.*\/(.*)\//, "$1");
            if (folderName === "" || folderName === "assets"){
                trace.log( "external content has no art" );
                return;
            }
            this.registTrigger( item.triggers, folderName, artPath, item.type, item.products, item.featrueId );
        }
    }

    getItemArtPath( artArr: any[] ): string{
        let path: string = "";
        if( artArr && artArr.length ){
            let enPath: any = artArr[0];
            if( enPath.file && enPath.file.file_id_html5 ){
                path = enPath.file.file_id_html5;
            }
        }
        return path;
    }
    
    registTrigger( trigger: any, folderName: string, path: string, type: string, products: ProductData[], featrueId: string ){
        if( type == "bank" ) this.bank = { type: type, art: path, products: products };
        if( type == "subscription" ) this.subscription = { type: type, art: path, products: products };
        if( type == "po" || type == "popup" ){
            let tr: { [key: string]: any } = trigger;
            let po: PopupVo = { type: type, art: path, products: products };
            for( let ob in tr ){
               if( tr[ob] ){
                   if( !this.triggers[ob] ) this.triggers[ob] = [];
                   this.triggers[ob].push( po );
                   if( featrueId ) this.featrueWant[featrueId] = po;
               }
            }
        }
    }

    public addFearue(){
        
    }
}
