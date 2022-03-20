import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Point } from '../../geom/point';
import { Vector3D } from '../../geom/vector3D';
import { StyleX } from '../../tools/StyleX';
import { Transform3D } from '../../tools/Transform3D';

@Component({
  selector: 'app-cuboid',
  templateUrl: './cuboid.component.html'
})
export class CuboidComponent implements OnInit, OnChanges {

  surface: { sty: any, sty3d: string }[] = [];
  container: any;
  @Input() center!: Point;
  @Input() position!: Vector3D;
  @Input() rotate!: Vector3D;

  @Input() cuboidSize!: Vector3D;
  @Input() textures: (string|number)[] = [];
  @Input() texturesType: (string|number)[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( ( changes.center || changes.position || changes.rotate ) && this.center && this.position ){
      this.container = StyleX.combine( StyleX.setItemToPoint(this.center), Transform3D.container3D(this.position.w) );
      this.container.transform += ` translate3d(${this.position.x}px,${this.position.y}px,${this.position.z}px)`;
      if( this.rotate ){
        let rotateUnit: string = this.rotate.w ? 'rad' : 'deg';
        this.container.transform += ` rotateX(${this.rotate.x}${rotateUnit}) rotateY(${this.rotate.y}${rotateUnit}) rotateZ(${this.rotate.z}${rotateUnit})`;
      }
    }
    if( ( changes.cuboidSize || changes.textures || changes.texturesType ) && this.cuboidSize ){
      for( let i: number = 0; i < 6; i++ ){
        this.surface[i] = { sty: {}, sty3d: "" };
        let pt: Point = new Point;
        let face: Vector3D = new Vector3D;
        let len: number = 0;
        switch( i >> 1 ){
          case 0:
            pt.setTo( this.cuboidSize.x, this.cuboidSize.y );
            len = this.cuboidSize.z;
            break;
          case 1:
            pt.setTo( this.cuboidSize.x, this.cuboidSize.z );
            len = this.cuboidSize.y;
            face.setTo( 90, 0, 0 );
            break;
          case 2:
            pt.setTo( this.cuboidSize.z, this.cuboidSize.y );
            len = this.cuboidSize.x;
            face.setTo( 0, 90, 0 );
            break;
        }
        if( i % 2 == 1 ) len = -len;
        len *= 0.5;
        let texture: Object = {};
        if( this.textures[i] == undefined ) texture = StyleX.backgroundColor(0x000066);
        else if( typeof this.textures[i] == "number" ) texture = StyleX.backgroundColor(this.textures[i]);
        else if( typeof this.textures[i] == "string" ){
          texture = this.texturesType[i] ? StyleX.stretchingBg( "" + this.textures[i] ) : StyleX.spreadingBg( "" + this.textures[i] );
        }
        this.surface[i].sty = StyleX.combine( StyleX.anchorOffset(pt.x>>1,pt.y>>1), StyleX.setSize(pt.x,pt.y), texture );
        this.surface[i].sty3d = Transform3D.object3D( new Vector3D().init(0,0,len), face );
      }
    }
  }
}
