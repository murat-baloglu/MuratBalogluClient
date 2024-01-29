import { Component, OnInit, Output } from '@angular/core';
import { BlogService } from '../../../../services/common/models/blog.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { BlogModel } from '../../../../contracts/models/blog-model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';
import { MatDialog } from '@angular/material/dialog';
import { BlogImageAddDialogComponent } from '../../../../dialogs/blog-image-add-dialog/blog-image-add-dialog.component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit {

  constructor(
    private blogService: BlogService,
    private alertifyService: AlertifyService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  addBlogImage(id: string): void {
    const dialogRef = this.dialog.open(BlogImageAddDialogComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      //Proje sonunda kullanilmazsa kaldir
    });
  }

  blogs: BlogModel[];

  getBlogs() {
    this.spinnerService.show();
    
    this.blogService.getBlogs().subscribe({
      next: (data: BlogModel[]) => {
        this.blogs = data;
        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.alertifyService.message(error.message, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      },
    });
  }

  deleteBlog(id: string) {
    this.blogService.deleteBlog(id).subscribe({
      next: (data: any) => {
        this.alertifyService.message("Başarı ile silinmiştir.", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        this.getBlogs();
      },
      error: (error: HttpErrorResponse) => {
        this.alertifyService.message(error.message, {
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
        this.alertifyService.message("Başarı ile güncellenmiştir.", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        this.alertifyService.message(error.message, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
        console.log(error.message);
      }
    });
  }

  ngOnInit(): void {
    this.getBlogs();
    //this.deleteBlog("04408AF4-E58B-413F-CBC4-08DC0FE49A25");
    //this.updateBlog();
  }

}
