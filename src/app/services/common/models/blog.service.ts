import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { BlogCreateModel } from '../../../contracts/models/blog-create-model';
import { Observable } from 'rxjs';
import { BlogModel } from '../../../contracts/models/blog-model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClientService: HttpClientService) { }

  createBlog(blogCreateModel: BlogCreateModel): Observable<any> {
    return this.httpClientService.post<any>({ controller: "blogs" }, blogCreateModel);
  }

  getBlogs(): Observable<BlogModel[]> {
    return this.httpClientService.get<BlogModel[]>({ controller: "blogs" });
  }

  deleteBlog(id: string): Observable<any> {
    return this.httpClientService.delete<any>({ controller: "blogs" }, id);
  }

  updateBlog(blogModel: BlogModel): Observable<any> {
    return this.httpClientService.put<any>({ controller: "blogs" }, blogModel);
  }

}