import { Point } from '../geom/point';
export class DisplayObject {

    position: Point = new Point;

    /**
     * 位置变化时的回调函数
     */
    onPositionChange: Function | null = null;

    /**
     * @type {number}
     * @memberof MCSuper
     * @description: Indicates the x coordinate relative to parent.
     * @ 本地坐标的 x 坐标。
     */
    get x(): number{
        return this.position.x;
    }
    set x( value: number ){
        if( value != this.position.x ){
            this.position.x = value;
            if( this.onPositionChange ) this.onPositionChange();
        }
    }

    /**
     * @type {number}
     * @memberof MCSuper
     * @description: Indicates the y coordinate relative to parent.
     * @ 本地坐标的 y 坐标。
     */
    get y(): number{
        return this.position.y;
    }
    set y( value: number ){
        if( value != this.position.y ){
            this.position.y = value;
            if( this.onPositionChange ) this.onPositionChange();
        }
    }

    /**
     * @param {number} x
     * @param {number} y
     * @memberof MCSuper
     * @description: set position of the movieclip
     * @ 设定影片剪辑的位置坐标
     */
    setPosition( x: number, y: number ): void{};

    /**
     * 当缩放和旋转后，重新计算显示变化
     */
    protected transformChange(): void{}

    _scaleX: number = 1;
    set scaleX( value: number ){
        if( isNaN( value ) ) return;
        this._scaleX = value;
        this.transformChange();
    }
    /**
     * @type {number}
     * @memberof MCSuper
     * @description: Indicates the horizontal scale (percentage) of the object as applied from the registration point.
     * @ 表示从注册点开始应用的对象的水平缩放比例（百分比）。
     */
    get scaleX(): number{
        return this._scaleX;
    }
    
    _scaleY: number = 1;
    set scaleY( value: number ){
        if( isNaN( value ) ) return;
        this._scaleY = value;
        this.transformChange();
    }
    /**
     * @type {number}
     * @memberof MCSuper
     * @description: Indicates the vertical scale (percentage) of an object as applied from the registration point of the object.
     * @ 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。
     */
    get scaleY(): number{
        return this._scaleY;
    }

    _rotation: number = 0;
    set rotation( value: number ){
        if( isNaN( value ) ) return;
        this._rotation = value;
        this.transformChange();
    }
    /**
     * @type {number}
     * @memberof MCSuper
     * @description: Indicates the rotation of the DisplayObject instance, in degrees, from its original orientation.
     * @ 表示 DisplayObject 实例距其原始方向的旋转程度，以度为单位。
     */
    get rotation(): number{
        return this._rotation;
    }
}
