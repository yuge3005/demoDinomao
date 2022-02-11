import { Transform3D, Point, Rectangle } from '../../../basicUI/basic-ui.module';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryPipe'
})
export class CategoryPipe implements PipeTransform {

  transform( i: number, dragItemX: number ): string {
      let index: number = i-7;
      let pola = index * 20;
      pola += dragItemX / 160 * 20;
      return Transform3D.object3D( new Rectangle().init(0,0,300), new Rectangle().init(0, pola) );
  }

}
