import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/post-model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private api = 'https://dummyjson.com/posts';
  private http = inject(HttpClient);

  getPosts(): Observable<{ posts: Post[] }> {
    return this.http.get<{ posts: Post[] }>(this.api);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.api}/${id}`);
  }
  // private api = 'https://dummyjson.com/posts';
  // private http = inject(HttpClient);
  // private _selected = new BehaviorSubject<Post | null>(null);

  // getPosts(): Observable<Post[]> {
  //   return this.http.get<{ posts: Post[] }>(this.api).pipe(map((res) => res.posts));
  // }
  // getPosts(): Observable<Post[]> {
  //   return this.http.get<Post[]>(this.api);
  // }

  // getPostById(id: number): Observable<Post> {
  //   return this.http.get<Post>(`${this.api}/${id}`);
  // }
}

// https://dummyjson.com/posts
