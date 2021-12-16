import { MCSuper } from './MCSuper';
import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-16 16:00:01
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 16:14:41
 */
@Component({
    template: ''
  })
export class MCComponentSuper implements OnInit, OnChanges, OnDestroy{

    @Input() movieClip!: MCSuper;

    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {}

    ngOnDestroy(): void {
        if( this.movieClip ) this.movieClip.dispose();
    }
}
