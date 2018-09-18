import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICategory } from './icategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategory[]>{
    return this.http.get<ICategory[]>('http://miltonespinoza.tk/wp-json/wp/v2/categories');
  }
}
