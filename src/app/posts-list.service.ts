import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IPost } from './ipost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsListService {

  constructor(private http: HttpClient) { }

  getPostCategories(): Observable<IPost[]>{
    return this.http.get<IPost[]>('http://senorcoders.com/wp-json/wp/v2/posts?categories=2');
  }
}
