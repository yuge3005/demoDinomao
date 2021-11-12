/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-04 16:02:21
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-08 09:59:23
 */
import { Component, Input } from '@angular/core';
import { ScrollList, BitmapData, Rectangle, HttpRequest } from 'resize-able-ui';
import { Trigger, WebPages, User, GM, TextData } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-contact-scroll',
  templateUrl: './contact-scroll.component.html',
  styleUrls: ['./contact-scroll.component.css']
})
export class ContactScrollComponent extends ScrollList {

  @Input() textureJson: any;

  minY(): number{
    return - 1524 + this.listHeight;
  }

  backBtn!: BitmapData;
  title!: BitmapData;
  submitBtn!: BitmapData;

  inputRect: Rectangle = new Rectangle().init( 5, 0, 518, 90 );
  userName: string = "";
  emailAddress: string = "";
  issueStr: string = "";

  emailText!: TextData;
  nameText!: TextData;
  inputBg1!: BitmapData;
  inputBg2!: BitmapData;
  textAreaBg!: BitmapData;

  areaRect: Rectangle = new Rectangle().init( 5, 5, 658, 350 );

  issueText!: TextData;
  otherText!: TextData;
  issueItemText!: TextData;

  issueList!: string[];
  radioBtn: BitmapData[] = [];

  constructor() {
    super();

    this.userName = User.instance.name ? User.instance.name : "";
    this.emailAddress = User.instance.email ? User.instance.email : "";
  }

  onWheel( event: WheelEvent ){
    if( Trigger.hasPopup ) return;
    super.onWheel( event );
  }

  initUI() {
    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
    this.title = this.textureData.getTexture( "CONTACT US", 265, 145 );
    this.submitBtn = this.textureData.getTexture( "btn_send", 195, 895 );

    this.inputBg1 = this.textureData.getTexture( "bg1", 150, 0 );
    this.inputBg2 = this.textureData.getTexture( "bg1", 150, 100 );
    this.textAreaBg = this.textureData.getTexture( "bg2", 0, 500 );

    this.emailText = this.textureJson.email;
    this.nameText = this.textureJson.name;

    this.issueText = this.textureJson.issue;
    this.otherText = this.textureJson.other;
    this.issueItemText = this.textureJson.issueItem;

    this.issueList = this.textureJson.issueList;
    for( let i: number = 0; i < this.issueList.length; i++ ){
      this.radioBtn[i] = this.textureData.getTexture( "btn_circular", 0, 10 );
    }
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
      new HttpRequest().loadData( "https://gamesmartltd.zendesk.com/api/v2/tickets.json", null, "POST", JSON.stringify(ob), "", head );
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
