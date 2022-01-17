import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gifToPng'
})
export class GifPngPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if( value.indexOf(".gif") > 0 ){
      return value.replace( ".gif", ".png" );
    }
    return value;
  }
}
