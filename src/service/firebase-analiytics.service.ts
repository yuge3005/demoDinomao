/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-01 16:47:56
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-01 17:13:56
 */
import { Injectable } from '@angular/core';

declare var firebase:any;

@Injectable({
  providedIn: 'root'
})
export class FirebaseAnaliyticsService {

  firebaseConfig: Object = {
    apiKey: "AIzaSyDQHur-IYOTJhIkwQnvqGapgaA2U4Nx7q4",
    authDomain: "dinomao-ios-1536724073255.firebaseapp.com",
    databaseURL: "https://dinomao-ios-1536724073255.firebaseio.com",
    projectId: "dinomao-ios-1536724073255",
    storageBucket: "dinomao-ios-1536724073255.appspot.com",
    messagingSenderId: "493599140751",
    appId: "1:493599140751:web:9eddb54dd18f4c4c9539fa",
    measurementId: "G-Y2T3B9Y5QL"
  };

  protected analytics: any;
  public inited: boolean = false;

  constructor() { }
  
  analyticsInit(){
    firebase.initializeApp(this.firebaseConfig);
    this.analytics = firebase.analytics();

    this.inited = true;
  }

  logEvent( event: string, param: any = null ){
    if( param ) this.analytics.logEvent( event, param );
    else this.analytics.logEvent( event );
  }
}
