import { Trigger } from './Trigger';
import { trace } from './trace';
import { GM } from './../gameSetting/GM';
import { ExternalData } from './../gameData/external-data';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-16 15:02:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-16 16:52:50
 */
export class ExtenalContent {
    
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

        if( item.type === "popup" && artPath.indexOf(".png") > 0 && item.triggers ){ // lobby ads feature
            
        }
        else if ( artPath.indexOf(".png") < 0 ) {
            let folderName: string = artPath.replace(/.*\/(.*)\//, "$1");
            let products = item.products;

            if (folderName === "" || folderName === "assets"){
                trace.log( "external content has no art" );
                return;
            }

            if (item.type === "bank"){
                if( products ) GM.bankProducts = products;
                else alert( "bank has no product" );
            }
            else if (item.type === "po") {

            } 
            else if (item.type === "popup") {
                // GlobelSettings[folderName] = item.triggers;
                // if(item.click_show_game_id) GlobelSettings[folderName].featured = item.click_show_game_id;
            }

            Trigger.registTrigger( item.triggers, folderName, artPath, item.type, item.products );
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
}
