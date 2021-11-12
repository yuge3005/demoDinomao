import { HttpRequest } from 'resize-able-ui/lib/basic-ui.module';
import { GM } from '../gameSetting/GM';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-08 12:03:07
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 10:11:34
 */
export class GameHttp extends HttpRequest {

  constructor(){
    super();
  }

  loadData( url: string, callback: Function | any, method: string = "GET", data: any ){
    super.loadData( GM.configs.dataServerUrl + url, callback, method, data );
  }
}
