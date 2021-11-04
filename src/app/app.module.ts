/*
* @Description:
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-26 13:31:20
* @LastEditors: Wayne Yu
* @LastEditTime: 2021-11-04 10:53:18
*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BasicUiModule } from '../basicUI/basic-ui.module';
import { DinomaoGameModule } from '../service/dinomao-game.module';

import { AppComponent } from './app.component';
import { LoadingAndPoComponent } from '../siene/loading-and-po/loading-layer/loading-and-po.component';
import { DynamicLayerComponent } from '../siene/dynamic-layer/dynamic-layer.component';
import { FlyingCoinsComponent } from '../siene/flying-coins/flying-coins.component';
import { PageDirective } from '../siene/dynamic-layer/page.directive';
import { PopupLayerComponent } from '../siene/loading-and-po/popup-layer/popup-layer.component';
import { PopupDirective } from '../siene/loading-and-po/popup-layer/popup-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoadingAndPoComponent,
    DynamicLayerComponent,
    FlyingCoinsComponent,
    PageDirective,
    PopupLayerComponent,
    PopupDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BasicUiModule,
    DinomaoGameModule,
    ReactiveFormsModule
  ],
  entryComponents: [LoadingAndPoComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
