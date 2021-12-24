/**
* @version: 1.0
* @Author: Wayne Yu
* @LastEditTime: 2021-12-23 17:40:31
* @Description: The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
* @ Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
*/
export class Point {

  /**
   * @type {number}
   * @memberof Point
   * @Description: The horizontal coordinate of the point.
   * @ 该点的水平坐标。
   */
  x: number = 0;

  /**
   * @type {number}
   * @memberof Point
   * @Description: The vertical coordinate of the point.
   * @ 该点的垂直坐标。
   */
  y: number = 0;
  constructor(){}

  /**
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @return {*} 
   * @memberof Point
   * @Description: initialize a point position
   * @ 初始化点坐标
   */
  init( x: number = 0, y: number = 0 ){
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * @readonly
   * @type {number}
   * @memberof Point
   * @Description: The length of the line segment from (0,0) to this point.
   * @ 从 (0,0) 到此点的线段长度。
   */
  get length(): number{
    return Math.sqrt( Math.pow( this.x, 2 ) + Math.pow( this.y, 2 ) );
  }

  /**
   * @param {Point} pt
   * @return {*}  {Point}
   * @memberof Point
   * @Description: Adds the coordinates of another point to the coordinates of this point to create a new point.
   * @ 将另一个点的坐标添加到此点的坐标以创建一个新点。
   */
  add( pt: Point ): Point{
    return new Point().init( this.x + pt.x, this.y + pt.y );
  }

  /**
   * @return {*}  {Point}
   * @memberof Point
   * @Description: Creates a copy of this Point object.
   * @ 创建此 Point 对象的副本。
   */
  clone(): Point{
    return new Point().init( this.x, this.y );
  }

  /**
   * @param {Point} sourcePoint
   * @memberof Point
   * @Description: Copies all of the point data from the source Point object into the calling Point object.
   * @ 将源 Point 对象中的所有点数据复制到调用方 Point 对象中。
   */
  copyFrom( sourcePoint: Point ): void{
    this.x = sourcePoint.x;
    this.y = sourcePoint.y;
  }

  /**
   * @static
   * @param {Point} pt1
   * @param {Point} pt2
   * @return {*}  {number}
   * @memberof Point
   * @Description: [static] Returns the distance between pt1 and pt2.
   * @ [静态] 返回 pt1 和 pt2 之间的距离。
   */
  static distance( pt1: Point, pt2: Point ): number{
    let dis: Point = pt1.subTract( pt2 );
    return dis.length;
  }

  /**
   * @param {Point} toCompare
   * @return {*} 
   * @memberof Point
   * @Description: Determines whether two points are equal.
   * @ 确定两个点是否相同。
   */
  equals( toCompare: Point ){
    return this.x === toCompare.x && this.y === toCompare.y;
  }

  /**
   * @static
   * @param {Point} pt1
   * @param {Point} pt2
   * @param {number} f
   * @return {*}  {Point}
   * @memberof Point
   * @Description: [static] Determines a point between two specified points.
   * @ [静态] 确定两个指定点之间的点。
   */
  static interpolate( pt1: Point, pt2: Point, f: number ): Point{
    let pt: Point = new Point;
    pt.x = pt1.x * f + pt2.x * (1-f);
    pt.y = pt1.y * f + pt2.y * (1-f);
    return pt;
  }

  /**
   * @param {number} thickness
   * @memberof Point
   * @Description: Scales the line segment between (0,0) and the current point to a set length.
   * @ 将 (0,0) 和当前点之间的线段缩放为设定的长度。
   */
  normalize( thickness: number ): void{
    let scale: number = thickness / this.length;
    this.x *= scale;
    this.y *= scale;
  }

  /**
   * @param {number} dx
   * @param {number} dy
   * @memberof Point
   * @Description: Offsets the Point object by the specified amount.
   * @ 按指定量偏移 Point 对象。
   */
  offset( dx: number, dy: number ): void{
    this.x += dx;
    this.y += dy;
  }

  /**
   * @static
   * @param {number} len
   * @param {number} angle
   * @return {*}  {Point}
   * @memberof Point
   * @Description: [static] Converts a pair of polar coordinates to a Cartesian point coordinate.
   * @ [静态] 将一对极坐标转换为笛卡尔点坐标。
   */
  static polar( len: number, angle: number ): Point{
    return new Point().init( len * Math.cos( angle ), len * Math.sin( angle ) );
  }

  /**
   * @param {number} x
   * @param {number} y
   * @memberof Point
   * @Description: Sets the members of Point to the specified values
   * @ 将 Point 的成员设置为指定值
   */
  setTo( x: number, y: number ): void{
    this.x = x;
    this.y = y;
  }

  /**
   * @param {Point} pt
   * @return {*} 
   * @memberof Point
   * @Description: Subtracts the coordinates of another point from the coordinates of this point to create a new point.
   * @ 从此点的坐标中减去另一个点的坐标以创建一个新点。
   */
  subTract( pt: Point ){
    return new Point().init( this.x - pt.x, this.y - pt.y );
  }

  /**
   * @return {*} 
   * @memberof Point
   * @Description: Returns a string that contains the values of the x and y coordinates.
   * @ 返回包含 x 和 y 坐标的值的字符串。
   */
  toString(){
    return "(x=" + this.x + ", y=" + this.y + ")";
  }
}
