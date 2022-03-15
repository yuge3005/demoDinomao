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
}
