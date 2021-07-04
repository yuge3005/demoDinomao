import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  needLoading!: Function;
  constructor() { }

  loading( level: number ){
    if( this.needLoading ) this.needLoading( level );
  }
}
