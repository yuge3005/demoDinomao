/**
* @version: 1.0
* @Author: Wayne Yu
* @LastEditTime: 2022-3-15 15:40:31
* @description: The Vector3D class represents a point or a location in the three-dimensional space using the Cartesian coordinates x, y, and z.
* @ Vector3D 类使用笛卡尔坐标 x、y 和 z 表示三维空间中的点或位置。
*/
export class Vector3D {
    /**
     * @type {number}
     * @memberof Vector3D
     * @description: The first element of a Vector3D object, such as the x coordinate of a point in the three-dimensional space.
     * @ Vector3D 对象中的第一个元素，例如，三维空间中某个点的 x 坐标。
     */
    x: number = 0;

    /**
     * @type {number}
     * @memberof Vector3D
     * @description: The second element of a Vector3D object, such as the y coordinate of a point in the three-dimensional space.
     * @ Vector3D 对象中的第二个元素，例如，三维空间中某个点的 y 坐标。
     */
    y: number = 0;

    /**
     * @type {number}
     * @memberof Vector3D
     * @description: The third element of a Vector3D object, such as the z coordinate of a point in three-dimensional space.
     * @ Vector3D 对象中的第三个元素，例如，三维空间中某个点的 z 坐标。
     */
    z: number = 0;

    /**
     * @type {number}
     * @memberof Vector3D
     * @description: The fourth element of a Vector3D object (in addition to the x, y, and z properties) can hold data such as the angle of rotation.
     * @ Vector3D 对象的第四个元素（除了 x、y 和 z 属性之外）可以容纳数据，例如旋转角度。
     */
    w: number = 0;

  constructor(){}

    /**
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {number} [z=0]
     * @param {number} [w=0]
     * @return {*} 
     * @memberof Vector3D
     * @description: initialize a Vector3D position
     * @ 初始化点坐标
     */
    init( x: number = 0, y: number = 0, z: number = 0, w: number = 0 ){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }

    /**
     * @readonly
     * @type {number}
     * @memberof Vector3D
     * @description: The length, magnitude, of the current Vector3D object from the origin (0,0,0) to the object's x, y, and z coordinates.
     * @ 当前 Vector3D 对象的长度（大小），即从原点 (0,0,0) 到该对象的 x、y 和 z 坐标的距离。
     */
    get length(): number{
        return Math.sqrt( this.lengthSquared );
    }

    /**
     * @readonly
     * @type {number}
     * @memberof Vector3D
     * @description: The square of the length of the current Vector3D object, calculated using the x, y, and z properties.
     * @ 当前 Vector3D 对象长度的平方，它是使用 x、y 和 z 属性计算出来的。
     */
    get lengthSquared(): number{
        return Math.pow( this.x, 2 ) + Math.pow( this.y, 2 ) + Math.pow( this.z, 2 );
    }

    /**
     * @param {Vector3D} vt
     * @return {*}  {Vector3D}
     * @memberof Vector3D
     * @description: Adds the value of the x, y, and z elements of the current Vector3D object to the values of the x, y, and z elements of another Vector3D object.
     * @ 将当前 Vector3D 对象的 x、y 和 z 元素的值与另一个 Vector3D 对象的 x、y 和 z 元素的值相加。
     */
    add( vt: Vector3D ): Vector3D{
        return new Vector3D().init( this.x + vt.x, this.y + vt.y, this.z + vt.z );
    }
	
    angleBetween(){

    }

    /**
     * @return {*}  {Vector3D}
     * @memberof Vector3D
     * @description: Returns a new Vector3D object that is an exact copy of the current Vector3D object.
     * @ 返回一个新 Vector3D 对象，它是与当前 Vector3D 对象完全相同的副本。
     */
    clone(): Vector3D{
        return new Vector3D().init( this.x, this.y, this.z, this.w );
    }

    /**
     * @param {Vector3D} sourceVector3D
     * @memberof Vector3D
     * @description: Copies all of vector data from the source Vector3D object into the calling Vector3D object.
     * @ 将源 Vector3D 对象中的所有矢量数据复制到调用方 Vector3D 对象中。
     */
    copyFrom( sourceVector3D: Vector3D ): void{
        this.x = sourceVector3D.x;
        this.y = sourceVector3D.y;
        this.z = sourceVector3D.z;
        this.w = sourceVector3D.w;
    }
	
    crossProduct(){}
    decrementBy(){}

    /**
     * @static
     * @param {Vector3D} vt1
     * @param {Vector3D} vt2
     * @return {*}  {number}
     * @memberof Vector3D
     * @description: [static] Returns the distance between two Vector3D objects.
     * @ [静态] 返回两个 Vector3D 对象之间的距离。
     */
    static distance( vt1: Vector3D, vt2: Vector3D ): number{
        let dis: Vector3D = vt1.subtract( vt2 );
        return dis.length;
    }

    dotProduct(){}

    /**
     * @param {Vector3D} toCompare
     * @param {boolean} allFour
     * @return {*}  {boolean} 
     * @memberof Vector3D
     * @description: Determines whether two Vector3D objects are equal by comparing the x, y, and z elements of the current Vector3D object with a specified Vector3D object.
     * @ 通过将当前 Vector3D 对象的 x、y 和 z 元素与指定的 Vector3D 对象的 x、y 和 z 元素进行比较，确定这两个对象是否相等。
     */
    equals( toCompare: Vector3D, allFour: boolean = false ): boolean{
        return this.x === toCompare.x && this.y === toCompare.y && this.z === toCompare.z && ( allFour ? this.w === toCompare.w : true );
    }

    incrementBy(a:Vector3D):void{}
    nearEquals(toCompare:Vector3D, tolerance:number, allFour:boolean = false):boolean{return false}
    negate():void{}

    /**
     * @return {*}  {number} 
     * @memberof Vector3D
     * @description: Converts a Vector3D object to a unit vector by dividing the first three elements (x, y, z) by the length of the vector.
     * @ 通过将最前面的三个元素（x、y、z）除以矢量的长度可将 Vector3D 对象转换为单位矢量。
     */
    normalize(): number{
        let len: number = this.length;
        let scale: number = 1 / len;
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
        return len;
    }

    /**
     * @memberof Vector3D
     * @description: Divides the value of the x, y, and z properties of the current Vector3D object by the value of its w property.
     * @ 将当前 Vector3D 对象的 x、y 和 z 属性的值除以其 w 属性的值。
     */
    project(): void{
        if( !this.w ) return;
        this.x /= this.w;
        this.y /= this.w;
        this.z /= this.w;
    }

    /**
     * @param {number} s 
     * @memberof Vector3D
     * @description: Scales the current Vector3D object by a scalar, a magnitude.
     * @ 按标量（大小）缩放当前的 Vector3D 对象。
     */
    scaleBy(s: number): void{
        this.x *= s;
        this.y *= s;
        this.z *= s;
    }

    /**
     * @param {number} xa 
     * @param {number} ya 
     * @param {number} za 
     * @memberof Vector3D
     * @description: Sets the members of Vector3D to the specified values.
     * @ 
     */
    setTo( xa: number, ya: number, za: number ): void{
        this.x = xa;
        this.y = ya;
        this.z = za;
    }

    /**
     * @param {Vector3D} vt
     * @return {*}  {Vector3D} 
     * @memberof Vector3D
     * @description: Subtracts the value of the x, y, and z elements of the current Vector3D object from the values of the x, y, and z elements of another Vector3D object.
     * @ 
     */
    subtract( vt: Vector3D ): Vector3D{
        return new Vector3D().init( this.x - vt.x, this.y - vt.y, this.z - vt.z );
    }
}
