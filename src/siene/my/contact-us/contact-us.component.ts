import { trace } from '../../../service/gameUILogic/trace';
import { BitmapData } from '../../../basicUI/basic-ui.module';
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
 * @LastEditTime: 2021-10-13 16:35:55
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
  pageTextArea: number = 500;

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
    this.submitBtn = this.textureData.getTexture( "btn_send", 195, 380 );

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
      this.radioBtn[i] = this.textureJson.issueItem;
    }
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

  listItemOffsetY( index: number ){
    return (index + 1) * 80;
  }

  submit(){
    let exp: RegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    let emailStr = this.formReportItems.value.emailAddress;
    if( !exp.test( emailStr ) ){
      alert( "email not right" );
      return;
    }

    let nameStr = this.formReportItems.value.userName;
    let inputText = document.getElementById( "inputText" );
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
    if( ta.value == "Text input" ) ta.value = "";
  }

  textOnblur(){
    let ta: HTMLTextAreaElement = document.getElementById( "inputTextArea" ) as HTMLTextAreaElement;
    if( ta.value == "" ) ta.value = "Text input";
  }

  radioClick( index: number ){
    alert( index )
  }
}
