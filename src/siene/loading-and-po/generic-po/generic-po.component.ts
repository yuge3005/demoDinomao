import { Trigger } from './../../../service/gameUILogic/Trigger';
import { GenericModalComponent } from './../generic-modal/generic-modal.component';
import { trace } from './../../../service/gameUILogic/trace';
import { HttpClient } from '@angular/common/http';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 10:45:10
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-14 16:03:52
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-generic-po',
  templateUrl: './generic-po.component.html',
  styleUrls: ['./generic-po.component.css']
})
export class GenericPoComponent extends GenericModalComponent{

  constructor(public http: HttpClient) {
    super( http );

    let packagePath: string = Trigger.popupPackagePath;
    let fileName: string = packagePath.substr( 0, packagePath.length - 1 );
    trace.log( fileName );
    let lastDash: number = fileName.lastIndexOf( "/" );
    fileName = fileName.substr( lastDash + 1 );
    trace.log( fileName );
    this.textureUrl = packagePath + fileName + ".json";

    trace.log( this.textureUrl )
  }


  ngOnDestroy(): void {
    
  }
}
