import { MCSuper } from './MCSuper';
import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Point } from '../geom/point';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-16 16:00:01
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 17:08:59
 */
@Component({
    template: ''
  })
export class MCComponentSuper implements OnInit, OnChanges, OnDestroy{

    @Input() movieClip!: MCSuper;

    movieClipData!: string;

    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;

    matrix: string = "matrix(1,0,0,1,0,0)";

    @ViewChild('mc', {static: true}) mc!: ElementRef;

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {}

    ngOnDestroy(): void {
        if( this.movieClip ) this.movieClip.dispose();
    }

    resetPosition(){
        let position: Point = this.movieClip.position;
        this.x = position.x;
        this.y = position.y;
    }

    resetTransform(){
        let a: number = this.movieClip.rotation / 180 * Math.PI;
        let lenX: number = this.movieClip.scaleX;
        let lenY: number = this.movieClip.scaleY;
        this.matrix = "matrix(" + lenX * Math.cos(a) + "," + lenX *  Math.sin(a) + "," + -lenY * Math.sin(a) + "," + lenY * Math.cos(a) + ",0,0)";
    }

    setCurrentFrame( frame: number ){}
}
