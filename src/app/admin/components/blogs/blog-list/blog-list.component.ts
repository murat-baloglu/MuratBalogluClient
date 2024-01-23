import { Component, OnInit, Output } from '@angular/core';
import { BlogService } from '../../../../services/common/models/blog.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { BlogModel } from '../../../../contracts/models/blog-model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';
import { MatDialog } from '@angular/material/dialog';

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

  // addBlogImage(id: string): void {
  //   const dialogRef = this.dialog.open(BlogImageAddDialogComponent, {
  //     data: {name: this.name, animal: this.animal},
  //     data: id
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //      console.log(`Dialog result: ${result}`);
  //      console.log('The dialog was closed');
     
  //   });
  // }

  // @Output() fileUploadOptions: Partial<FileUploadOptions> = {
  //   controller: "blogs",
  //   action: "upload",
  //   explanation: "Blog kartı için bir adet resim seçiniz veya sürükleyip bırakınız.",
  //   accept: ".png, .jpg, jpeg, .gif",
  //   // multiple: false
  // };

  blogs: BlogModel[];

  // toggleDisabled() {
  //   this.isDisabled = !this.isDisabled
  // }

  getBlogs() {
    // this.spinnerService.show();
    this.blogService.getBlogs().subscribe({
      next: (data: BlogModel[]) => {
        // this.spinnerService.hide();

        // this.alertifyService.message("Blog listesi getirildi.", {
        //   dismissOthers: true,
        //   messageType: MessageType.Success,
        //   position: Position.TopRight
        // });
        this.blogs = data;
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        // this.spinnerService.hide();

        this.alertifyService.message(error.message, {
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
        this.alertifyService.message("Başarı ile silinmiştir.", {
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
    //this.createBlog();
    this.getBlogs();
    //this.deleteBlog("04408AF4-E58B-413F-CBC4-08DC0FE49A25");
    //this.updateBlog();
  }

}
