import { Point } from '../geom/point';
/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2022-2-9 09:44:07
 * @description: CSS style for 3D.
 * @ 提供3D场景的css。
 * @example in component: "this.myCss = Transform3D.container3D( 250, 'center' );", and in template: "<div [ngStyle]='myCss'>"
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
    public static container3D( camera: number, perspective: Point | string, is3D: boolean = true, size?: Point  ): Object{
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
}
