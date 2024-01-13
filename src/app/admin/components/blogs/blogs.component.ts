import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BlogService } from '../../../services/common/models/blog.service';
import { BlogCreateModel } from '../../../contracts/models/blog-create-model';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BlogModel } from '../../../contracts/models/blog-model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {

  public Editor: any;
  public isBrowser = false;
  public model = {
    editorData: ''
  }

  constructor(@Inject(PLATFORM_ID) private platformId: object, private blogService: BlogService, private alertify: AlertifyService) {
    if (isPlatformBrowser(this.platformId)) {
      import('ckeditor5-custom-build/build/ckeditor').then(e => {
        this.Editor = e.default;
        this.isBrowser = true;
      });
    }
  }

  ngOnInit(): void {

    //this.createBlog();
    //this.getBlogs();
    //this.deleteBlog("04408AF4-E58B-413F-CBC4-08DC0FE49A25");
    //this.updateBlog();
  }

  //BlogCreateModel parametereden gonderilecek.
  createBlog() {
    const blogCreateModel: BlogCreateModel = new BlogCreateModel();
    blogCreateModel.title = "Title 14";
    blogCreateModel.context = "Context 14";

    this.blogService.createBlog(blogCreateModel).subscribe({
      next: (data: any) => {
        this.alertify.message("Başarı ile olusturulmustur.", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        this.alertify.message(error.message, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
        console.log(error.message);
      }
    });

  }

  getBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (data: BlogModel[]) => {
        this.alertify.message("Blog listesi getirildi.", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        this.alertify.message(error.message, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
        console.log(error.message);
      },
    });
  }

  deleteBlog(id: string) {
    this.blogService.deleteBlog(id).subscribe({
      next: (data: any) => {
        this.alertify.message("Başarı ile silinmiştir.", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        this.alertify.message(error.message, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
        console.log(error.message);
      }
    });
  }

  //BlogModel parametereden gonderilecek.
  updateBlog() {
    const blogModel: BlogModel = new BlogModel();
    blogModel.id = "954C61E2-82FC-4A9B-7AA4-08DC0FC9C2F2"
    blogModel.title = "Title 6";
    blogModel.context = "Context 6";

    this.blogService.updateBlog(blogModel).subscribe({
      next: (data: any) => {
        this.alertify.message("Başarı ile güncellenmiştir.", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        this.alertify.message(error.message, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
        console.log(error.message);
      }
    });
  }

}
