/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-23 15:22:50
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-27 17:23:58
*/
import { Component } from '@angular/core';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { TextData, Trigger, ModalCommands, ScrollListComponent, User, trace, FormartDatas } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-vip-level-list',
  templateUrl: './vip-level-list.component.html',
  styleUrls: ['./vip-level-list.component.css']
})
export class VipLevelListComponent extends ScrollListComponent {

  lightImg!: BitmapData;
  vip1!: BitmapData;
  vip2!: BitmapData;
  vip3!: BitmapData;

  textBg!: BitmapData;
  crown!: BitmapData;
  hand!: BitmapData;

  buyBtn!: BitmapData;

  titleText!: TextData; 
  tipText!: TextData;
  priceText!: TextData;
  vipLeftText!: TextData;
  titleString: string = "";
  tipString: string = "";
  priceString: string = "";

  products?: any[];
  product!: any;
  currentItem!: any[];
  vipLevel: number = 0;

  minY(): number{
    return - 1200 + this.listHeight;
  }
  
  isVip: boolean = false;
  vipTimeLeft: number = 0;
  vipTimeStr: string = "";
  timeIntervalId: any;
  vipEndTime!: Date;
  get showEndTime(): boolean{
    return this.vipTimeLeft > 0 && this.vipLevel == User.instance.vipData.level - 1;
  }

  constructor() {
    super();
  }

  initUI(){
    this.vip1 = this.textureData.getTexture( "vip1", 10, 80 );
    this.vip2 = this.textureData.getTexture( "vip2", 255, 80 );
    this.vip3 = this.textureData.getTexture( "vip3", 500, 80 );

    this.textBg = this.textureData.getTexture( "bg0", 0, 240 );
    this.buyBtn = this.textureData.getTexture( "btn_subscribe", 188, 1050 );
    this.vipStatChange();

    this.titleText = {rect:{x:45,y:265,w:640,h:65},color:0xFFFFFF,size:60,font:"arialbk",align:"left",stroke:3,strokeColor:0x6d98e7};
    this.tipText = {rect:{x:45,y:250,w:640,h:65},color:0xFFFFFF,size:45,font:"arialbk",align:"left",stroke:3,strokeColor:0x6d98e7};
    this.priceText = {rect:{x:45,y:910,w:646,h:102},color:0xFFE635,size:90,font:"FRAHV_0",align:"center",stroke:6,strokeColor:0xAC1200,bold:true};
    this.vipLeftText = {rect:{x:45,y:910,w:646,h:102},color:0xFFE635,size:50,font:"sys",align:"center",stroke:0,strokeColor:0xAC1200};
    this.products = Trigger.vipData;
    this.switchVip( this.vipLevel );

    User.instance.vipStatChange = this.vipStatChange.bind( this );
  }

  checkTime(){
    this.vipTimeLeft = Math.floor( ( this.vipEndTime.getTime() - new Date().getTime() ) / 1000 );
    this.vipTimeStr = FormartDatas.secondToHour( this.vipTimeLeft );
    if( this.vipTimeLeft < 0 ){
      clearInterval( this.timeIntervalId );
      User.instance.isVip = false;
      User.instance.vipData = null;
    }
  }

  vipStatChange(){
    if( User.instance.isVip ){
      let crownLeft: number;
      let vipData: any = User.instance.vipData;
      if( vipData.level == 1 ) crownLeft = 55;
      else if( vipData.level == 2 ) crownLeft = 300;
      else if( vipData.level == 3 ) crownLeft = 545;
      else{
        trace.log( "undefined vip level" );
        crownLeft = 300;
      }
      this.crown = this.textureData.getTexture( "crown", crownLeft, 0 );
      this.vipEndTime = FormartDatas.transformUTCStringToDate( User.instance.vipData.endTime );
      this.timeIntervalId = setInterval( this.checkTime.bind( this ), 1000 );
      this.checkTime();
      this.isVip = true;
    }
    else{
      this.vipEndTime = new Date();
      this.isVip = false;
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    clearInterval( this.timeIntervalId );
    User.instance.vipStatChange = null;
  }

  switchVip( vipLevel: number ){
    this.vipLevel = vipLevel;
    if( !this.products ) return;
    this.product = this.products[this.vipLevel];
    this.currentItem = this.product.items;
    this.priceString = "$ " + this.products[this.vipLevel].price + "/mo";
    this.lightImg = this.textureData.getTexture( "guang", -51 + 246 * vipLevel, 22 );
    this.hand = this.textureData.getTexture( "hand", 150 + 245 * vipLevel, 157 );
    for( let i: number = 0; i < this.currentItem.length; i++ ){
      if( this.currentItem[i].type == "item_subscription_name" ){
        this.titleString = "Benefits of " + this.currentItem[i].item_subscription_name + " VIP：";
      }
      if( this.currentItem[i].type == "item_subscription_des" ){
        this.tipString = this.currentItem[i].item_subscription_des;
        this.tipString = this.tipString.replace( /\<p\>/g, "" );
        this.tipString = this.tipString.replace( /\<\/p\>/g, "" );
        this.tipString = this.tipString.replace( /\*/g, "<br/>" );
        document.getElementsByClassName( "tipText" )[0].innerHTML = this.tipString;
      }
    }
  }

  buyVip(){
    Trigger.modalCommand( ModalCommands.BUY_VIP, this.product );
  }

  onItemClick( itemData: any ): boolean{
    let isClick: boolean = super.onItemClick( itemData );
    if( isClick ){
      switch( itemData ){
        case 0:
        case 1:
        case 2:
          this.switchVip( itemData );
          break;
        case "buyVip":
          Trigger.modalCommand( ModalCommands.BUY_VIP, this.product );
          break;
        default:
          alert( "wrong command in vip bank" )
          break;
      }
    }
    return isClick;
  }
}
