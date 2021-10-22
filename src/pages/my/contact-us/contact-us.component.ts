import { BitmapData, Rectangle, Application } from '../../../basicUI/basic-ui.module';
import { MainPage, Loading, Trigger, WebPages, User, GM, TextData } from '../../../service/dinomao-game.module';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-12 11:32:06
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-22 15:50:40
 */

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent extends MainPage {
  backBtn!: BitmapData;
  title!: BitmapData;
  submitBtn!: BitmapData;

  formReportItems: FormGroup;

  emailText!: TextData;
  nameText!: TextData;
  inputBg1!: BitmapData;
  inputBg2!: BitmapData;
  textAreaBg!: BitmapData;

  issueText!: TextData;
  otherText!: TextData;
  issueItemText!: TextData;

  pageTop: number = 135;
  pageMiddle: number = 250;
  pageBottom: number = 480;
  pageOther: number = 400;
  pageTextAreaTop: number = 500;
  pageLineGap: number = 80;
  pageTextAreaHeight: number = 360;
  pageTextAreaScaleY: number = 1;

  issueList!: string[];
  radioBtn: BitmapData[] = [];
  
  constructor(public http: HttpClient, private formBuilder: FormBuilder) {
    super(http);
    this.textureUrl = "assets/contact/contact.json";

    this.formReportItems = this.formBuilder.group({
      emailAddress: User.instance.email ? User.instance.email: "",
      userName: User.instance.name
    });
  }

  initUI() {
    Loading.status = 2;

    this.backBtn = this.textureData.getTexture( "btn_return", 30, 0 );
    this.title = this.textureData.getTexture( "CONTACT US", 265, 10 );
    this.submitBtn = this.textureData.getTexture( "btn_send", 195, 385 );

    this.inputBg1 = this.textureData.getTexture( "bg1", 150, 0 );
    this.inputBg2 = this.textureData.getTexture( "bg1", 150, 100 );
    this.textAreaBg = this.textureData.getTexture( "bg2" );

    this.emailText = this.textureJson.email;
    this.nameText = this.textureJson.name;

    this.issueText = this.textureJson.issue;
    this.otherText = this.textureJson.other;
    this.issueItemText = this.textureJson.issueItem;

    this.issueList = this.textureJson.issueList;
    for( let i: number = 0; i < this.issueList.length; i++ ){
      this.radioBtn[i] = this.textureData.getTexture( "btn_circular", 0, 10 );
    }

    if( this.pageHeight < 1500 ){
      console.log( this.pageHeight )
      let change: number = ( 1500 - this.pageHeight ) / 500;
      this.pageTop -= Math.floor( 120 * change );
      this.pageMiddle -= Math.floor( 150 * change );
      this.pageBottom -= Math.floor( 180 * change );
      this.pageLineGap -= Math.floor( 25 * change );
      this.pageOther -= Math.floor( 125 * change );
      this.pageTextAreaTop -= Math.floor( 150 * change );

      let textAreaScaleChange: number = 0.4 * change;
      this.pageTextAreaScaleY -= textAreaScaleChange;
      this.pageTextAreaHeight -= Math.floor( 360 * textAreaScaleChange );
      this.submitBtn = this.textureData.getTexture( "btn_send", 195, 25 + this.pageTextAreaHeight );
    }

    if( Application.system.isApp() ) Application.settings.enableResize = false;
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

  listItemOffsetY( index: number ){
    return (index + 1) * this.pageLineGap;
  }

  submit(){
    let exp: RegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    let emailStr = this.formReportItems.value.emailAddress;
    if( !exp.test( emailStr ) ){
      alert( "email not right" );
      return;
    }

    let nameStr = this.formReportItems.value.userName;
    let inputText = document.getElementById( "inputTextArea" );
    let inputStr = (inputText as HTMLInputElement).value;

    if (inputStr !== "" && emailStr !== "") {
      var XHR = eval("window.XMLHttpRequest") ? new XMLHttpRequest() : eval("new ActiveXObject('Microsoft.XMLHTTP')");
      XHR.open("post", "https://gamesmartltd.zendesk.com/api/v2/tickets.json", true);
      XHR.setRequestHeader("Accept", "application/json");
      XHR.setRequestHeader("Content-Type", "application/json");
      XHR.setRequestHeader("Authorization", "Basic YW55QGRvdXRvcmJpbmdvLmNvbTpCaW5nbzQ1NiE=");
      XHR.send(JSON.stringify({
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
      }));
    }
  }

  onSubmit(){
    
  }

  textOnfocus(){
    let ta: HTMLTextAreaElement = document.getElementById( "inputTextArea" ) as HTMLTextAreaElement;
    if( ta?.value == "Text input" ) ta.value = "";
  }

  textOnblur(){
    let ta: HTMLTextAreaElement = document.getElementById( "inputTextArea" ) as HTMLTextAreaElement;
    if( ta?.value == "" ) ta.value = "Text input";
  }

  radioClick( index: number ){
    for( let i: number = 0; i < this.issueList.length; i++ ){
      let newRadioUI: BitmapData = this.textureData.getTexture( index == i ? "btn_circular1" : "btn_circular", 0, 10 );
      let newRadioRect: Rectangle = new Rectangle().init( newRadioUI.x, newRadioUI.y, newRadioUI.w, newRadioUI.h );
      let oldRadioRect: Rectangle = new Rectangle().init( this.radioBtn[i].x, this.radioBtn[i].y, this.radioBtn[i].w, this.radioBtn[i].h );
      if( newRadioRect.equals( oldRadioRect ) ) continue;
      this.radioBtn[i] = newRadioUI;
    }
    let ta: HTMLTextAreaElement = document.getElementById( "inputTextArea" ) as HTMLTextAreaElement;
    if( ta ) ta.value = this.issueList[index];
  }

  ngOnDestroy(){
    if( Application.system.isApp() ) Application.settings.enableResize = true;
  }
}
