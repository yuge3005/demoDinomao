/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-04 16:02:21
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-05 10:31:20
 */
import { Component, Input } from '@angular/core';
import { ScrollListComponent, BitmapData, Rectangle } from '../../../../basicUI/basic-ui.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Trigger, WebPages, User, GM, TextData } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-contact-scroll',
  templateUrl: './contact-scroll.component.html',
  styleUrls: ['./contact-scroll.component.css']
})
export class ContactScrollComponent extends ScrollListComponent {

  @Input() textureJson: any;

  minY(): number{
    return - 1524 + this.listHeight;
  }

  backBtn!: BitmapData;
  title!: BitmapData;
  submitBtn!: BitmapData;

  formReportItems: FormGroup;
  inputRect: Rectangle = new Rectangle().init( 5, 0, 518, 90 );

  emailText!: TextData;
  nameText!: TextData;
  inputBg1!: BitmapData;
  inputBg2!: BitmapData;
  textAreaBg!: BitmapData;

  issueText!: TextData;
  otherText!: TextData;
  issueItemText!: TextData;

  issueList!: string[];
  radioBtn: BitmapData[] = [];

  constructor(private formBuilder: FormBuilder) {
    super();

    this.formReportItems = this.formBuilder.group({
      emailAddress: User.instance.email ? User.instance.email: "",
      userName: User.instance.name
    });
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

  onSubmit(){}

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
}
