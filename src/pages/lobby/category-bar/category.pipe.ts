import { Transform3D, Vector3D } from 'resize-able-ui';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryPipe'
})
export class CategoryPipe implements PipeTransform {

  transform( i: number, dragItemX: number ): string {
      let index: number = i-7;
      let pola = index * 20;
      pola += dragItemX / 160 * 20;
      return Transform3D.object3D( new Vector3D().init(0,0,300), new Vector3D().init(0, pola) );
  }

}
