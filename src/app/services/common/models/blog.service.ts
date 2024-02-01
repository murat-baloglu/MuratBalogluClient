import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { Observable } from 'rxjs';
import { BlogModel } from '../../../contracts/models/blog-model';
import { BlogAddModel } from '../../../contracts/models/blog-add-model';
import { BlogWithCardImageModel } from '../../../contracts/models/blog-with-card-image-model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClientService: HttpClientService) { }

  addBlog(blogAddModel: BlogAddModel): Observable<any> {
    return this.httpClientService.post<any>({ controller: "blogs" }, blogAddModel);
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

  getBlogsWithCardImage(): Observable<BlogWithCardImageModel[]> {
    return this.httpClientService.get<BlogWithCardImageModel[]>({ controller: "blogs", action: "getblogswithcardimage" });
  }

}