import { Point } from './point';
export class Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  constructor( x: number = 0, y: number = 0, width: number = 0, height: number = 0 ){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get left(): number{
    return this.x;
  }

  get right(): number{
    return this.x + this.width;
  }

  get top(): number{
    return this.y;
  }

  get bottom(): number{
    return this.y + this.height;
  }

  get bottomRight(): Point{
    return new Point( this.right, this.bottom );
  }

  get topLeft(): Point{
    return new Point( this.x, this.y );
  }

  get size(): Point{
    return new Point( this.width, this.height );
  }

  clone(): Rectangle{
    return new Rectangle( this.x, this.y, this.width, this.height );
  }

  contains( x: number, y: number ): boolean{
    return this.x <= x && this.right > x && this.y <= y && this.bottom > y;
  }

  containsPoint( pt: Point ): boolean{
    return this.contains( pt.x, pt.y );
  }

  containsRect( rect: Rectangle ): boolean{
    return this.x <= rect.x && this.y <= rect.y && this.bottom >= rect.bottom && this.right >= rect.right;
  }

  copyFrom( sourceRect: Rectangle ): void{
    this.x = sourceRect.x;
    this.y = sourceRect.y;
    this.width = sourceRect.width;
    this.height = sourceRect.height;
  }

  equals( toCompare: Rectangle ): boolean{
    return this.x === toCompare.x && this.y === toCompare.y && this.width === toCompare.width && this.height === toCompare.height;
  }

  inflate( dx: number, dy: number ): void{
    this.x -= dx;
    this.width += 2 * dx;
    this.y -= dy;
    this.height += 2 * dy;
  }

  inflatePoint( pt: Point ): void{
    this.inflate( pt.x, pt.y );
  }

  intersection( toInsert: Rectangle ): Rectangle{
    let newX: number = Math.max( this.x, toInsert.x );
    let newRight: number = Math.min( this.right, toInsert.right );
    let newWidth: number = newRight - newX;
    if( newWidth <= 0 ) return new Rectangle;
    let newY: number = Math.max( this.y, toInsert.y );
    let newBottom: number = Math.min( this.bottom, toInsert.bottom );
    let newHeight: number = newBottom - newY;
    if( newHeight <= 0 ) return new Rectangle;
    return new Rectangle( newX, newY, newWidth, newHeight );
  }

  intersects( toInsert: Rectangle ): boolean{
    return this.containsPoint( toInsert.topLeft ) || toInsert.containsPoint( this.topLeft );
  }

  isEmpty(): boolean{
    return this.width == 0 || this.height == 0;
  }

  offset( dx: number, dy: number ): void{
    this.x += dx;
    this.y += dy;
  }

  offsetPoint( pt: Point ): void{
    this.x += pt.x;
    this.y += pt.y;
  }

  setEmpty(): void{
    this.x = this.y = this.width = this.height = 0;
  }

  setTo( x: number = 0, y: number = 0, width: number = 0, height: number = 0 ): void{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  toString(): string{
    return "(x=" + this.x + ", y=" + this.y + ", w=" + this.width + ", h=" + this.height + ")";
  }

  union( toUnion: Rectangle ): Rectangle{
    if( toUnion.isEmpty() ) return this.clone();
    if( this.isEmpty() ) return toUnion.clone();
    let newX: number = Math.min( this.x, toUnion.x );
    let newY: number = Math.min( this.y, toUnion.y );
    let newRight: number = Math.max( this.right, toUnion.right );
    let newBotom: number = Math.max( this.bottom, toUnion.bottom );
    return new Rectangle( newX, newY, newRight - newX, newBotom - newY );
  }
}
