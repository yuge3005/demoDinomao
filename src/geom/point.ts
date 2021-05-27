export class Point {
  x: number;
  y: number;
  constructor( x: number = 0, y: number = 0 ){
    this.x = x;
    this.y = y;
  }

  get length(): number{
    return Math.sqrt( Math.pow( this.x, 2 ) + Math.pow( this.y, 2 ) );
  }

  add( pt: Point ): Point{
    return new Point( this.x + pt.x, this.y + pt.y );
  }

  clone(): Point{
    return new Point( this.x, this.y );
  }

  copyFrom( sourcePoint: Point ): void{
    this.x = sourcePoint.x;
    this.y = sourcePoint.y;
  }

  static distance( pt1: Point, pt2: Point ): number{
    let dis: Point = pt1.subTract( pt2 );
    return dis.length;
  }

  equals( toCompare: Point ){
    return this.x === toCompare.x && this.y === toCompare.y;
  }

  offset( dx: number, dy: number ): void{
    this.x += dx;
    this.y += dy;
  }

  static polar( len: number, angle: number ): Point{
    return new Point( len * Math.cos( angle ), len * Math.sin( angle ) );
  }

  setTo( x: number, y: number ): void{
    this.x = x;
    this.y = y;
  }

  subTract( pt: Point ){
    return new Point( this.x - pt.x, this.y - pt.y );
  }

  toString(){
    return "(x=" + this.y + ", y=" + this.y + ")";
  }
}
