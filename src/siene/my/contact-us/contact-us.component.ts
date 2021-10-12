import { BitmapData } from '../../../basicUI/basic-ui.module';
import { MainPage, Loading, Trigger, WebPages, User, GM } from '../../../service/dinomao-game.module';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-12 11:32:06
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-12 15:15:07
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

  emailAddress: string = "";
  userName: string = "";
  
  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/contact/contact.json";
  }

  initUI() {
    Loading.status = 2;

    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
    this.title = this.textureData.getTexture( "CONTACT US", 265, 147 );

    if( User.instance.email ) this.emailAddress = User.instance.email;
    this.userName = User.instance.name;
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

  submit(){
    let exp: RegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    let emailText = document.getElementById( "emailText" );
    let emailStr = (emailText as HTMLInputElement).value;
    let nameText = document.getElementById( "nameText" );
    let nameStr = (nameText as HTMLInputElement).value;
    let inputText = document.getElementById( "inputText" );
    let inputStr = (inputText as HTMLInputElement).value;
    if( !exp.test( emailStr ) ){
        alert( "email not right" );
        return;
    }

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
