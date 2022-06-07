import { Point } from './point';

/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-24 11:40:31
 * @description: A Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its width and its height.
 * @ Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。
 */
export class Rectangle {
  
  /**
   * @type {number}
   * @memberof Rectangle
   * @description: The x coordinate of the top-left corner of the rectangle.
   * @ 矩形左上角的 x 坐标。
   */
  x: number = 0;

  /**
   * @type {number}
   * @memberof Rectangle
   * @description: The y coordinate of the top-left corner of the rectangle.
   * @ 矩形左上角的 y 坐标。
   */
  y: number = 0;

  /**
   * @type {number}
   * @memberof Rectangle
   * @description: The width of the rectangle, in pixels.
   * @ 矩形的宽度（以像素为单位）。
   */
  width: number = 0;

  /**
   * @type {number}
   * @memberof Rectangle
   * @description: The sum of the x and width properties.
   * @ 矩形的高度（以像素为单位）。
   */
  height: number = 0;
  constructor(){}

  /**
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @param {number} [width=0]
   * @param {number} [height=0]
   * @return {*} 
   * @memberof Rectangle
   * @description: Initialize a rectangle
   * @ 初始化矩形对象
   */
  init( x: number = 0, y: number = 0, width: number = 0, height: number = 0 ){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   * @readonly
   * @type {number}
   * @memberof Rectangle
   * @description: The x coordinate of the top-left corner of the rectangle.
   * @ 矩形左上角的 x 坐标。
   */
  get left(): number{
    return this.x;
  }

  /**
   * @readonly
   * @type {number}
   * @memberof Rectangle
   * @description: The sum of the x and width properties.
   * @ x 和 width 属性的和。
   */
  get right(): number{
    return this.x + this.width;
  }

  /**
   * @readonly
   * @type {number}
   * @memberof Rectangle
   * @description: The y coordinate of the top-left corner of the rectangle.
   * @ 矩形左上角的 y 坐标。
   */
  get top(): number{
    return this.y;
  }

  /**
   * @readonly
   * @type {number}
   * @memberof Rectangle
   * @description: The sum of the y and height properties.
   * @ y 和 height 属性的和。
   */
  get bottom(): number{
    return this.y + this.height;
  }

  /**
   * @readonly
   * @type {Point}
   * @memberof Rectangle
   * @description: The location of the Rectangle object's bottom-right corner, determined by the values of the right and bottom properties.
   * @ 由 right 和 bottom 属性的值确定的 Rectangle 对象的右下角的位置。
   */
  get bottomRight(): Point{
    return new Point().init( this.right, this.bottom );
  }

  /**
   * @readonly
   * @type {Point}
   * @memberof Rectangle
   * @description: The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point.
   * @ 由该点的 x 和 y 坐标确定的 Rectangle 对象左上角的位置。
   */
  get topLeft(): Point{
    return new Point().init( this.x, this.y );
  }

  /**
   * @readonly
   * @type {Point}
   * @memberof Rectangle
   * @description: The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
   * @ Rectangle 对象的大小，该对象表示为具有 width 和 height 属性的值的 Point 对象。
   */
  get size(): Point{
    return new Point().init( this.width, this.height );
  }

  /**
   * @return {*}  {Rectangle}
   * @memberof Rectangle
   * @description: Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
   * @ 返回一个新的 Rectangle 对象，其 x、y、width 和 height 属性的值与原始 Rectangle 对象的对应值相同。
   */
  clone(): Rectangle{
    return new Rectangle().init( this.x, this.y, this.width, this.height );
  }

  /**
   * @param {number} x
   * @param {number} y
   * @return {*}  {boolean}
   * @memberof Rectangle
   * @description: Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
   * @ 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
   */
  contains( x: number, y: number ): boolean{
    return this.x <= x && this.right > x && this.y <= y && this.bottom > y;
  }

  /**
   * @param {Point} pt
   * @return {*}  {boolean}
   * @memberof Rectangle
   * @description: Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
   * @ 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
   */
  containsPoint( pt: Point ): boolean{
    return this.contains( pt.x, pt.y );
  }

  /**
   * @param {Rectangle} rect
   * @return {*}  {boolean}
   * @memberof Rectangle
   * @description: Determines whether the Rectangle object specified by the rect parameter is contained within this Rectangle object.
   * @ 确定此 Rectangle 对象内是否包含由 rect 参数指定的 Rectangle 对象。
   */
  containsRect( rect: Rectangle ): boolean{
    return this.x <= rect.x && this.y <= rect.y && this.bottom >= rect.bottom && this.right >= rect.right;
  }

  /**
   * @param {Rectangle} sourceRect
   * @memberof Rectangle
   * @description: Copies all of rectangle data from the source Rectangle object into the calling Rectangle object.
   * @ 将源 Rectangle 对象中的所有矩形数据复制到调用方 Rectangle 对象中。
   */
  copyFrom( sourceRect: Rectangle ): void{
    this.x = sourceRect.x;
    this.y = sourceRect.y;
    this.width = sourceRect.width;
    this.height = sourceRect.height;
  }

  /**
   * @param {Rectangle} toCompare
   * @return {*}  {boolean}
   * @memberof Rectangle
   * @description: Determines whether the object specified in the toCompare parameter is equal to this Rectangle object.
   * @ 确定在 toCompare 参数中指定的对象是否等于此 Rectangle 对象。
   */
  equals( toCompare: Rectangle ): boolean{
    return this.x === toCompare.x && this.y === toCompare.y && this.width === toCompare.width && this.height === toCompare.height;
  }

  /**
   * @param {number} dx
   * @param {number} dy
   * @memberof Rectangle
   * @description: Increases the size of the Rectangle object by the specified amounts, in pixels.
   * @ 按指定量增加 Rectangle 对象的大小（以像素为单位）。
   */
  inflate( dx: number, dy: number ): void{
    this.x -= dx;
    this.width += 2 * dx;
    this.y -= dy;
    this.height += 2 * dy;
  }

  /**
   * @param {Point} pt
   * @memberof Rectangle
   * @description: Increases the size of the Rectangle object.
   * @ 增加 Rectangle 对象的大小。
   */
  inflatePoint( pt: Point ): void{
    this.inflate( pt.x, pt.y );
  }

  /**
   * @param {Rectangle} toInsert
   * @return {*}  {Rectangle}
   * @memberof Rectangle
   * @description: If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns the area of intersection as a Rectangle object.
   * @ 如果在 toIntersect 参数中指定的 Rectangle 对象与此 Rectangle 对象相交，则返回交集区域作为 Rectangle 对象。
   */
  intersection( toInsert: Rectangle ): Rectangle{
    let newX: number = Math.max( this.x, toInsert.x );
    let newRight: number = Math.min( this.right, toInsert.right );
    let newWidth: number = newRight - newX;
    if( newWidth <= 0 ) return new Rectangle;
    let newY: number = Math.max( this.y, toInsert.y );
    let newBottom: number = Math.min( this.bottom, toInsert.bottom );
    let newHeight: number = newBottom - newY;
    if( newHeight <= 0 ) return new Rectangle;
    return new Rectangle().init( newX, newY, newWidth, newHeight );
  }

  /**
   * @param {Rectangle} toInsert
   * @return {*}  {boolean}
   * @memberof Rectangle
   * @description: Determines whether the object specified in the toIntersect parameter intersects with this Rectangle object.
   * @ 确定在 toIntersect 参数中指定的对象是否与此 Rectangle 对象相交。
   */
  intersects( toInsert: Rectangle ): boolean{
    return !this.intersection( toInsert ).isEmpty();
  }

  /**
   * @return {*}  {boolean}
   * @memberof Rectangle
   * @description: Determines whether or not this Rectangle object is empty.
   * @ 确定此 Rectangle 对象是否为空。
   */
  isEmpty(): boolean{
    return this.width == 0 || this.height == 0;
  }

  /**
   * @param {number} dx
   * @param {number} dy
   * @memberof Rectangle
   * @description: Adjusts the location of the Rectangle object, as determined by its top-left corner, by the specified amounts.
   * @ 按指定量调整 Rectangle 对象的位置（由其左上角确定）。
   */
  offset( dx: number, dy: number ): void{
    this.x += dx;
    this.y += dy;
  }

  /**
   * @param {Point} pt
   * @memberof Rectangle
   * @description: Adjusts the location of the Rectangle object using a Point object as a parameter.
   * @ 将 Point 对象用作参数来调整 Rectangle 对象的位置。
   */
  offsetPoint( pt: Point ): void{
    this.x += pt.x;
    this.y += pt.y;
  }

  /**
   * @memberof Rectangle
   * @description: Sets all of the Rectangle object's properties to 0.
   * @ 将 Rectangle 对象的所有属性设置为 0。
   */
  setEmpty(): void{
    this.x = this.y = this.width = this.height = 0;
  }

  /**
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @param {number} [width=0]
   * @param {number} [height=0]
   * @memberof Rectangle
   * @description: Sets the members of Rectangle to the specified values
   * @ 将 Rectangle 的成员设置为指定值
   */
  setTo( x: number = 0, y: number = 0, width: number = 0, height: number = 0 ): void{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * @return {*}  {string}
   * @memberof Rectangle
   * @description: Builds and returns a string that lists the horizontal and vertical positions and the width and height of the Rectangle object.
   * @ 生成并返回一个字符串，该字符串列出 Rectangle 对象的水平位置和垂直位置以及高度和宽度。
   */
  toString(): string{
    return "(x=" + this.x + ", y=" + this.y + ", w=" + this.width + ", h=" + this.height + ")";
  }

  /**
   * @param {Rectangle} toUnion
   * @return {*}  {Rectangle}
   * @memberof Rectangle
   * @description: Adds two rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two rectangles.
   * @ 通过填充两个矩形之间的水平和垂直空间，将这两个矩形组合在一起以创建一个新的 Rectangle 对象。
   */
  union( toUnion: Rectangle ): Rectangle{
    if( toUnion.isEmpty() ) return this.clone();
    if( this.isEmpty() ) return toUnion.clone();
    let newX: number = Math.min( this.x, toUnion.x );
    let newY: number = Math.min( this.y, toUnion.y );
    let newRight: number = Math.max( this.right, toUnion.right );
    let newBotom: number = Math.max( this.bottom, toUnion.bottom );
    return new Rectangle().init( newX, newY, newRight - newX, newBotom - newY );
  }
}
