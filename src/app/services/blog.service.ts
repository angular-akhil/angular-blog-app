import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogApi = 'http://localhost:3000/blog'; // Mock API
  private commentsApi = 'http://localhost:3000/comments'; // Mock API

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<any> {
    return this.http.get(this.blogApi);
  }

  getComments(blogId: number): Observable<any> {
    return this.http.get(`${this.commentsApi}?postId=${blogId}`);
  }
}
