import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResService {

  constructor(private http: HttpClient) { }

  getRes( url: string ): any{
    return this.http.get(url);
  }
}
