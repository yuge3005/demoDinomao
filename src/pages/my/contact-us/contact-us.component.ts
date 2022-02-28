import { Application, StyleX, BitmapData, Rectangle, HttpRequest } from '../../../basicUI/basic-ui.module';
import { MainPage, Loading, TextData, User, Trigger, WebPages, GM } from '../../../service/dinomao-game.module';
import { Component } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-12 11:32:06
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-10 15:01:00
 */

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent extends MainPage {

  inputRect: Rectangle = new Rectangle().init( 5, 0, 518, 90 );
  userName: string = "";
  emailAddress: string = "";
  issueStr: string = "";

  emailText!: TextData;
  nameText!: TextData;

  areaRect: Rectangle = new Rectangle().init( 5, 5, 658, 350 );

  issueText!: TextData;
  otherText!: TextData;
  issueItemText!: TextData;

  issueList!: string[];
  radioBtn: BitmapData[] = [];

  constructor() {
    super();
    this.textureUrl = "assets/contact/contact.json";

    this.userName = User.instance.name ? User.instance.name : "";
    this.emailAddress = User.instance.email ? User.instance.email : "";
  }

  initUI() {
    Loading.status = 2;
    if( Application.system.isApp() ) Application.settings.enableResize = false;

    this.ui.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
    this.ui.title = this.textureData.getTexture( "CONTACT US", 265, 145 );
    this.ui.submitBtn = this.textureData.getTexture( "btn_send", 195, 895 );

    this.ui.inputBg1 = this.textureData.getTexture( "bg1", 150, 0 );
    this.ui.inputBg2 = this.textureData.getTexture( "bg1", 150, 100 );
    this.ui.textAreaBg = this.textureData.getTexture( "bg2", 0, 500 );

    this.emailText = this.textureJson.email;
    this.nameText = this.textureJson.name;

    this.issueText = this.textureJson.issue;
    this.otherText = this.textureJson.other;
    this.issueItemText = this.textureJson.issueItem;

    this.issueList = this.textureJson.issueList;
    for( let i: number = 0; i < this.issueList.length; i++ ){
      this.radioBtn[i] = this.textureData.getTexture( "btn_circular", 0, 10 );
    }

    this.styles.leftText = StyleX.setItemPosition( 40, 250 );
    this.styles.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
    this.styles.scrollBar = StyleX.combine( StyleX.scrollBar(), StyleX.setSize(750,0,true,false) );
  }

  ngOnDestroy(){
    if( Application.system.isApp() ) Application.settings.enableResize = true;
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }
  
  radioClick( index: number ){
    for( let i: number = 0; i < this.issueList.length; i++ ){
      let newRadioUI: BitmapData = this.textureData.getTexture( index == i ? "btn_circular1" : "btn_circular", 0, 10 );
      let newRadioRect: Rectangle = new Rectangle().init( newRadioUI.x, newRadioUI.y, newRadioUI.w, newRadioUI.h );
      let oldRadioRect: Rectangle = new Rectangle().init( this.radioBtn[i].x, this.radioBtn[i].y, this.radioBtn[i].w, this.radioBtn[i].h );
      if( newRadioRect.equals( oldRadioRect ) ) continue;
      this.radioBtn[i] = newRadioUI;
    }
    this.issueStr = this.issueList[index];
  }

  submit(){
    let exp: RegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    let emailStr = this.emailAddress;
    if( !exp.test( emailStr ) ){
      alert( "email not right" );
      return;
    }

    let nameStr = this.userName;
    let inputStr = this.issueStr;

    if (inputStr !== "" && emailStr !== "") {
      let ob: any = {
        "ticket": {
            "subject": inputStr.length > 40 ? inputStr.substring(0, 40) : inputStr,
            "comment": {
                "body": inputStr
            },
            "requester": {
                "name": "Dinomao." + nameStr,
                "email": emailStr
            },
            tags: [
                GM.platForm,
                "userid_" + User.instance.id
            ]
        }
      }
      let head: any = { "Accept": "application/json", "Content-Type": "application/json", "Authorization": "Basic YW55QGRvdXRvcmJpbmdvLmNvbTpCaW5nbzQ1NiE=" };
      new HttpRequest().loadData( "https://nextarcade1.zendesk.com/api/v2/tickets.json", null, "POST", JSON.stringify(ob), "", head );
    }
  }

  emailChange( str: string ){
    this.emailAddress = str;
  }

  nameChange( str: string ){
    this.userName = str;
  }

  mainTextChange( str: string ){
    this.issueStr = str;
  }
}
