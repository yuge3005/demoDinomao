import { Point } from '../geom/point';
import { Vector3D } from '../geom/vector3D';
/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2022-2-9 09:44:07
 * @description: CSS style for 3D.
 * @ 提供3D场景的css。
 * @example in component: "this.myCss = Transform3D.container3D( 250, 'center' );", and in template: "<div [ngStyle]='myCss'>"
 * @example in component: "this.obj3D = Transform3D.object3D( new Point().init( 30, 20 ) );", and in template: "<div [style.transform]='obj3D'>"
 */
export class Transform3D {

    /**
     * @static
     * @param {number} camera distance of the camera
     * @param {(Point | string)} perspective can be a Point, or string in 'topLeft', 'center', 'bottomRight'.
     * @param {boolean} [is3D=true]
     * @param {Point} [size] size of the container
     * @memberof Transform3D
     * @description: 3D scene setting, camera distance, perspective, etc
     * @ 3d场景设定，摄像机距离，透视点位置等
     */
    public static container3D( camera: number, perspective: Point | string = 'topLeft', is3D: boolean = true, size?: Point  ): Object{
        let cameraDistance: string = "perspective(" + camera + "px)";
        let obj: any = { '-webkit-transform': cameraDistance, 'transform': cameraDistance };
        let perspectiveString: string = '';
        if( typeof perspective == 'string' ){
            if( perspective == "topLeft" ){
                perspectiveString = "0% 0%";
            }
            else if( perspective == "center" ){
                perspectiveString = "50% 50%";
            }
            else if( perspective == "bottomRight" ){
                perspectiveString = "100% 100%";
            }
        }
        else if( perspective instanceof Point ){
            perspectiveString = perspective.x + "px " + perspective.y + "px";
        }
        if( !perspectiveString ) perspectiveString = "50% 50%";
        obj["perspective-origin"] = perspectiveString;
        obj["-webkit-perspective-origin"] = perspectiveString;
        if( is3D ){
            obj["transform-style"] = "preserve-3d";
            obj["-webkit-transform-style"] = "preserve-3d";
        }
        if( size ){
            obj.width = size.x + 'px';
            obj.height = size.y + 'px';
        }
        return obj;
    }

    /**
     * @static
     * @param {(Point | Vector3D | null)} [translate=null]
     * @param {(number | Vector3D)} [rotate=0]
     * @param {Point} [scale]
     * @param {boolean} [rotateRad=false]
     * @return {*}  {string}
     * @memberof Transform3D
     * @discription 3D object in the 3D scene, can set its translate, rotate, scale
     * 3D场景中的物体，可设置其位移，旋转，缩放比例
     */
    public static object3D( translate: Point | Vector3D | null = null, rotate: number | Vector3D = 0, scale?: Point, rotateRad: boolean = false ): string{
        let objstr: string = '';
        let rotateUnit: string = rotateRad ? 'rad' : 'deg';
        if( rotate && rotate instanceof Vector3D ){
            if( rotate.x ) objstr += ` rotateX(${rotate.x}${rotateUnit})`;
            if( rotate.y ) objstr += ` rotateY(${rotate.y}${rotateUnit})`;
            if( rotate.z ) objstr += ` rotateZ(${rotate.z}${rotateUnit})`;
        }
        else if( typeof rotate == 'number' ){
            objstr += ` rotate(${rotate}${rotateUnit})`;
        }
        if( translate ){
            if( translate.x )objstr += ` translateX(${translate.x}px)`;
            if( translate.y )objstr += ` translateY(${translate.y}px)`;
            if( translate instanceof Vector3D && translate.z ) objstr += ` translateZ(${translate.z}px)`;
        }
        if( scale ){
            if( scale.x != 1 ) objstr += ` scaleX(${scale.x})`;
            if( scale.y != 1 ) objstr += ` scaleY(${scale.y})`;
        }
        return objstr;
    }
}
